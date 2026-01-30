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
    claimed: bool,
    goal-amount: uint,
    goal-description: (string-utf8 100)
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
(define-data-var max-deposit-per-user uint u100000000000) ;; 100,000 STX max per user
(define-data-var withdrawal-cooldown uint u144) ;; 1 day cooldown between withdrawals

;; Time-based reward multipliers (basis points: 10000 = 1x)
(define-map time-multipliers
  { min-blocks: uint }
  { multiplier: uint }
)

;; Deposit history tracking
(define-map deposit-history
  { user: principal, deposit-id: uint }
  {
    amount: uint,
    timestamp: uint,
    lock-period: uint,
    goal-amount: uint,
    status: (string-ascii 20)
  }
)

(define-map user-deposit-count
  { user: principal }
  { count: uint }
)

;; Track last withdrawal timestamp for cooldown
(define-map last-withdrawal
  { user: principal }
  { block-height: uint }
)

;; Error codes
(define-constant ERR_NO_AMOUNT (err u100))
(define-constant ERR_ALREADY_DEPOSITED (err u101))
(define-constant ERR_ALREADY_WITHDRAWN (err u102))
(define-constant ERR_LOCK_ACTIVE (err u103))
(define-constant ERR_NO_DEPOSIT (err u104))
(define-constant ERR_NOT_AUTHORIZED (err u105))
(define-constant ERR_CONTRACT_PAUSED (err u106))
(define-constant ERR_BELOW_MINIMUM (err u107))
(define-constant ERR_EXCEEDS_MAXIMUM (err u108))
(define-constant ERR_WITHDRAWAL_COOLDOWN (err u109))

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

;; Get time-based multiplier for lock duration
(define-private (get-time-multiplier (lock-blocks uint))
  (let
    (
      ;; Default multipliers: 1 month=1x, 6 months=1.2x, 1 year=1.5x, 2 years=2x
      (multiplier-1m u10000)   ;; 4320 blocks (~1 month)
      (multiplier-6m u12000)   ;; 25920 blocks (~6 months) 
      (multiplier-1y u15000)   ;; 52560 blocks (~1 year)
      (multiplier-2y u20000)   ;; 105120 blocks (~2 years)
    )
    (if (>= lock-blocks u105120)
      multiplier-2y
      (if (>= lock-blocks u52560)
        multiplier-1y
        (if (>= lock-blocks u25920)
          multiplier-6m
          multiplier-1m
        )
      )
    )
  )
)

;; -----------------------------------------------------------
;; Core Contract Functions
;; -----------------------------------------------------------

(define-public (deposit (amount uint) (lock-period uint))
  (deposit-with-goal amount lock-period u0 u"")
)

(define-public (deposit-with-goal (amount uint) (lock-period uint) (goal-amount uint) (goal-description (string-utf8 100)))
  (let
    (
      (existing (map-get? savings { user: tx-sender }))
    )
    (begin
      (asserts! (is-contract-active) ERR_CONTRACT_PAUSED)
      (asserts! (> amount u0) ERR_NO_AMOUNT)
      (asserts! (>= amount (var-get minimum-deposit)) ERR_BELOW_MINIMUM)
      (asserts! (<= amount (var-get max-deposit-per-user)) ERR_EXCEEDS_MAXIMUM)
      (asserts! (is-none existing) ERR_ALREADY_DEPOSITED)
      (let ((unlock (+ stacks-block-height lock-period)))
        (try! (stx-transfer? amount tx-sender (as-contract tx-sender)))
        
        ;; Record deposit history
        (let
          (
            (current-count (get count (default-to { count: u0 } (map-get? user-deposit-count { user: tx-sender }))))
            (new-count (+ current-count u1))
          )
          (map-set user-deposit-count { user: tx-sender } { count: new-count })
          (map-set deposit-history
            { user: tx-sender, deposit-id: new-count }
            {
              amount: amount,
              timestamp: stacks-block-height,
              lock-period: lock-period,
              goal-amount: goal-amount,
              status: "active"
            }
          )
        )
        
        (map-set savings
          { user: tx-sender }
          {
            amount: amount,
            unlock-height: unlock,
            claimed: false,
            goal-amount: goal-amount,
            goal-description: goal-description
          }
        )
        (ok (tuple (amount amount) (unlock-block unlock) (goal goal-amount)))
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
        (last-withdrawal-block (get block-height (default-to { block-height: u0 } (map-get? last-withdrawal { user: tx-sender }))))
        (cooldown-remaining (if (> (+ last-withdrawal-block (var-get withdrawal-cooldown)) stacks-block-height)
          (- (+ last-withdrawal-block (var-get withdrawal-cooldown)) stacks-block-height)
          u0))
      )
      (begin
        (asserts! (not claimed) ERR_ALREADY_WITHDRAWN)
        (asserts! (is-eq cooldown-remaining u0) ERR_WITHDRAWAL_COOLDOWN)
        (let
          (
            (rate (var-get reward-rate))
            (lock-duration (- unlock stacks-block-height))
            (compound-periods (/ lock-duration (/ u144 (var-get compound-frequency)))) ;; Approximate periods
            (base-reward (calculate-compound-reward amount compound-periods))
            (time-multiplier (get-time-multiplier lock-duration))
            (multiplied-reward (/ (* base-reward time-multiplier) u10000))
            (penalty-rate (var-get early-withdrawal-penalty))
            (penalty-amount (if is-early (/ (* amount penalty-rate) u100) u0))
            (final-amount (if is-early (- amount penalty-amount) amount))
            (final-reward (if is-early 0 (to-int multiplied-reward)))
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
          (let
            (
              (current-count (get count (default-to { count: u0 } (map-get? user-deposit-count { user: tx-sender }))))
            )
            ;; Update deposit history status
            (map-set deposit-history
              { user: tx-sender, deposit-id: current-count }
              {
                amount: amount,
                timestamp: (get timestamp (default-to 
                  { amount: u0, timestamp: u0, lock-period: u0, goal-amount: u0, status: "unknown" }
                  (map-get? deposit-history { user: tx-sender, deposit-id: current-count })
                )),
                lock-period: (- unlock stacks-block-height),
                goal-amount: (get goal-amount user-data),
                status: (if is-early "withdrawn-early" "withdrawn-mature")
              }
            )
          )
          
          (map-set savings { user: tx-sender } { 
            amount: u0, 
            unlock-height: unlock, 
            claimed: true,
            goal-amount: (get goal-amount user-data),
            goal-description: (get goal-description user-data)
          })
          (try! (as-contract (stx-transfer? final-amount tx-sender tx-sender)))
          
          ;; Update last withdrawal timestamp
          (map-set last-withdrawal { user: tx-sender } { block-height: stacks-block-height })
          
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

(define-public (set-max-deposit-per-user (new-max uint))
  (begin
    (asserts! (is-admin tx-sender) ERR_NOT_AUTHORIZED)
    (asserts! (> new-max u0) ERR_NO_AMOUNT)
    (var-set max-deposit-per-user new-max)
    (ok new-max)
  )
)

(define-public (set-time-multiplier (min-blocks uint) (multiplier uint))
  (begin
    (asserts! (is-admin tx-sender) ERR_NOT_AUTHORIZED)
    (asserts! (> multiplier u0) ERR_NO_AMOUNT)
    (map-set time-multipliers { min-blocks: min-blocks } { multiplier: multiplier })
    (ok true)
  )
)

(define-public (set-withdrawal-cooldown (new-cooldown uint))
  (begin
    (asserts! (is-admin tx-sender) ERR_NOT_AUTHORIZED)
    (var-set withdrawal-cooldown new-cooldown)
    (ok new-cooldown)
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

(define-read-only (get-max-deposit-per-user)
  (ok (var-get max-deposit-per-user))
)

(define-read-only (get-savings-goal (user principal))
  (match (map-get? savings { user: user })
    savings-data (ok (tuple 
      (goal-amount (get goal-amount savings-data))
      (goal-description (get goal-description savings-data))
      (current-amount (get amount savings-data))
      (progress-percent (if (> (get goal-amount savings-data) u0)
        (/ (* (get amount savings-data) u100) (get goal-amount savings-data))
        u0))
    ))
    (ok none)
  )
)

;; Batch operations for efficiency
(define-public (batch-get-savings (users (list 10 principal)))
  (ok (map get-single-savings users))
)

(define-private (get-single-savings (user principal))
  (tuple 
    (user user)
    (savings (map-get? savings { user: user }))
    (reputation (get points (default-to { points: 0 } (map-get? reputation { user: user }))))
  )
)

(define-read-only (get-deposit-history (user principal) (limit uint))
  (let
    (
      (total-count (get count (default-to { count: u0 } (map-get? user-deposit-count { user: user }))))
      (start-id (if (> total-count limit) (- total-count limit) u1))
    )
    (ok (tuple
      (total-deposits total-count)
      (history (get-deposit-range user start-id total-count))
    ))
  )
)

(define-private (get-deposit-range (user principal) (start-id uint) (end-id uint))
  (if (<= start-id end-id)
    (let
      (
        (current-deposit (map-get? deposit-history { user: user, deposit-id: start-id }))
      )
      (unwrap-panic (as-max-len? 
        (append 
          (get-deposit-range user (+ start-id u1) end-id)
          (list current-deposit)
        ) 
        u50
      ))
    )
    (list)
  )
)

(define-read-only (get-withdrawal-cooldown-remaining (user principal))
  (let
    (
      (last-withdrawal-block (get block-height (default-to { block-height: u0 } (map-get? last-withdrawal { user: user }))))
      (cooldown-end (+ last-withdrawal-block (var-get withdrawal-cooldown)))
    )
    (ok (if (> cooldown-end stacks-block-height)
      (- cooldown-end stacks-block-height)
      u0))
  )
)
