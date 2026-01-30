;; -----------------------------------------------------------
;; BitSave: Bitcoin-powered STX savings vault
;; Author: Marcus David
;; Description: Users can lock STX for a chosen duration and earn reputation points.
;; -----------------------------------------------------------

(define-data-var admin principal tx-sender)
(define-data-var contract-paused bool false)

;; Each user's savings info
(define-map savings
  { user: principal }
  {
    amount: uint,
    unlock-height: uint,
    claimed: bool
  }
)

;; Reputation points for loyal savers
(define-map reputation
  { user: principal }
  {
    points: int
  }
)

;; Annual reward rate (e.g. 10 = 10%)
(define-data-var reward-rate uint u10)
(define-data-var compound-frequency uint u12) ;; Monthly compounding by default
(define-data-var minimum-deposit uint u1000000) ;; 1 STX minimum (in microSTX)
(define-data-var early-withdrawal-penalty uint u20) ;; 20% penalty for early withdrawal

;; Error codes
(define-constant ERR_NO_AMOUNT (err u100))
(define-constant ERR_ALREADY_DEPOSITED (err u101))
(define-constant ERR_ALREADY_WITHDRAWN (err u102))
(define-constant ERR_LOCK_ACTIVE (err u103))
(define-constant ERR_NO_DEPOSIT (err u104))
(define-constant ERR_NOT_AUTHORIZED (err u105))
(define-constant ERR_CONTRACT_PAUSED (err u106))
(define-constant ERR_BELOW_MINIMUM (err u107))

;; -----------------------------------------------------------
;; Utility Functions
;; -----------------------------------------------------------

(define-private (is-admin (sender principal))
  (is-eq sender (var-get admin))
)

(define-private (is-contract-active)
  (not (var-get contract-paused))
)

;; Calculate compound interest: A = P(1 + r/n)^(nt)
;; Simplified for blockchain: approximate compound interest
(define-private (calculate-compound-reward (principal uint) (periods uint))
  (let
    (
      (rate (var-get reward-rate))
      (frequency (var-get compound-frequency))
      (period-rate (/ rate frequency))
    )
    (if (is-eq periods u0)
      u0
      ;; Simple approximation: principal * rate * periods / (100 * frequency)
      (/ (* (* principal period-rate) periods) (* u100 frequency))
    )
  )
)

;; -----------------------------------------------------------
;; Core Contract Functions
;; -----------------------------------------------------------

(define-public (deposit (amount uint) (lock-period uint))
  (let
    (
      (existing (map-get? savings { user: tx-sender }))
    )
    (begin
      (asserts! (is-contract-active) ERR_CONTRACT_PAUSED)
      (asserts! (> amount u0) ERR_NO_AMOUNT)
      (asserts! (>= amount (var-get minimum-deposit)) ERR_BELOW_MINIMUM)
      (asserts! (is-none existing) ERR_ALREADY_DEPOSITED)
      (let ((unlock (+ stacks-block-height lock-period)))
        (try! (stx-transfer? amount tx-sender (as-contract tx-sender)))
        (map-set savings
          { user: tx-sender }
          {
            amount: amount,
            unlock-height: unlock,
            claimed: false
          }
        )
        (ok (tuple (amount amount) (unlock-block unlock)))
      )
    )
  )
)

(define-public (withdraw)
  (match (map-get? savings { user: tx-sender })
    user-data
    (let
      (
        (unlock (get unlock-height user-data))
        (amount (get amount user-data))
        (claimed (get claimed user-data))
        (is-early (< stacks-block-height unlock))
      )
      (begin
        (asserts! (not claimed) ERR_ALREADY_WITHDRAWN)
        (let
          (
            (rate (var-get reward-rate))
            (lock-duration (- unlock stacks-block-height))
            (compound-periods (/ lock-duration (/ u144 (var-get compound-frequency)))) ;; Approximate periods
            (base-reward (to-int (calculate-compound-reward amount compound-periods)))
            (penalty-rate (var-get early-withdrawal-penalty))
            (penalty-amount (if is-early (/ (* amount penalty-rate) u100) u0))
            (final-amount (if is-early (- amount penalty-amount) amount))
            (final-reward (if is-early 0 base-reward))
            (current-points (default-to 0 (get points (map-get? reputation { user: tx-sender }))))
          )
          ;; Update reputation points (no points for early withdrawal)
          (map-set reputation
            { user: tx-sender }
            { points: (+ final-reward current-points) }
          )
          
          ;; Auto-mint badge if user reaches reputation threshold (1000 points)
          ;; This rewards loyal savers with an on-chain achievement NFT
          (if (and (not is-early) (>= (get-user-rep tx-sender) u1000))
            (let
              (
                ;; Create badge metadata with user's achievement tier
                (badge-metadata u"{\"name\":\"Loyal Saver\",\"tier\":\"gold\",\"threshold\":1000}")
              )
              ;; Attempt to mint badge (ignore errors if badge contract not set up)
              (match (contract-call? .bitsave-badges mint tx-sender badge-metadata)
                success true
                error true
              )
            )
            true
          )
          
          ;; Mark savings as claimed and transfer STX back to user
          (map-set savings { user: tx-sender } { amount: u0, unlock-height: unlock, claimed: true })
          (try! (as-contract (stx-transfer? final-amount tx-sender tx-sender)))
          (ok (tuple (withdrawn final-amount) (earned-points final-reward) (penalty penalty-amount) (early-withdrawal is-early)))
        )
      )
    )
    ERR_NO_DEPOSIT
  )
)

(define-public (set-reward-rate (new-rate uint))
  (begin
    (asserts! (is-admin tx-sender) ERR_NOT_AUTHORIZED)
    (var-set reward-rate new-rate)
    (ok new-rate)
  )
)

(define-public (pause-contract)
  (begin
    (asserts! (is-admin tx-sender) ERR_NOT_AUTHORIZED)
    (var-set contract-paused true)
    (ok true)
  )
)

(define-public (unpause-contract)
  (begin
    (asserts! (is-admin tx-sender) ERR_NOT_AUTHORIZED)
    (var-set contract-paused false)
    (ok true)
  )
)

(define-public (set-compound-frequency (new-frequency uint))
  (begin
    (asserts! (is-admin tx-sender) ERR_NOT_AUTHORIZED)
    (asserts! (> new-frequency u0) ERR_NO_AMOUNT)
    (var-set compound-frequency new-frequency)
    (ok new-frequency)
  )
)

(define-public (set-minimum-deposit (new-minimum uint))
  (begin
    (asserts! (is-admin tx-sender) ERR_NOT_AUTHORIZED)
    (asserts! (> new-minimum u0) ERR_NO_AMOUNT)
    (var-set minimum-deposit new-minimum)
    (ok new-minimum)
  )
)

(define-public (set-early-withdrawal-penalty (new-penalty uint))
  (begin
    (asserts! (is-admin tx-sender) ERR_NOT_AUTHORIZED)
    (asserts! (<= new-penalty u100) ERR_NO_AMOUNT) ;; Max 100% penalty
    (var-set early-withdrawal-penalty new-penalty)
    (ok new-penalty)
  )
)

(define-read-only (get-savings (user principal))
  (ok (map-get? savings { user: user }))
)

(define-read-only (get-reputation (user principal))
  (match (map-get? reputation { user: user })
    rep-data (ok (get points rep-data))
    (ok 0)
  )
)

;; Helper function to get user reputation points as uint
;; Used for badge threshold checks
(define-private (get-user-rep (user principal))
  (match (map-get? reputation { user: user })
    rep-data (to-uint (get points rep-data))
    u0
  )
)

(define-read-only (get-reward-rate)
  (ok (var-get reward-rate))
)

(define-read-only (is-paused)
  (ok (var-get contract-paused))
)

(define-read-only (get-compound-frequency)
  (ok (var-get compound-frequency))
)

(define-read-only (get-minimum-deposit)
  (ok (var-get minimum-deposit))
)

(define-read-only (get-early-withdrawal-penalty)
  (ok (var-get early-withdrawal-penalty))
)
