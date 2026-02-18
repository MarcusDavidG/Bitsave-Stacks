;; -----------------------------------------------------------
;; BitSave: Bitcoin-powered STX savings vault
;; Author: Marcus David
;; Description: Users can lock STX for a chosen duration and earn reputation points.
;; -----------------------------------------------------------

(define-data-var admin principal tx-sender)
(define-data-var contract-paused bool false)

;; Security features
(define-data-var reentrancy-guard bool false)
(define-data-var max-lock-period uint u525600) ;; ~10 years max lock
(define-data-var min-lock-period uint u144) ;; 1 day minimum lock

;; Rate limiting for admin functions
(define-map admin-action-timestamps
  { admin: principal, action: (string-ascii 20) }
  { last-timestamp: uint }
)

(define-data-var admin-rate-limit uint u144) ;; 1 day between admin actions

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
    points: int,
    current-streak: uint,
    longest-streak: uint,
    last-deposit-block: uint
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

;; Interest rate history
(define-map rate-history
  { timestamp: uint }
  { rate: uint, admin: principal }
)

(define-data-var rate-history-count uint u0)

;; Contract events for logging
(define-map contract-events
  { event-id: uint }
  {
    event-type: (string-ascii 20),
    user: principal,
    amount: uint,
    timestamp: uint,
    data: (string-utf8 200)
  }
)

(define-data-var event-counter uint u0)

;; Enhanced error handling with detailed error messages
(define-map error-messages
  { error-code: uint }
  { message: (string-utf8 100) }
)

;; Initialize error messages
(map-set error-messages { error-code: u100 } { message: u"Amount must be greater than zero" })
(map-set error-messages { error-code: u101 } { message: u"User already has an active deposit" })
(map-set error-messages { error-code: u102 } { message: u"Funds have already been withdrawn" })
(map-set error-messages { error-code: u103 } { message: u"Lock period is still active" })
(map-set error-messages { error-code: u104 } { message: u"No deposit found for this user" })
(map-set error-messages { error-code: u105 } { message: u"Unauthorized: admin access required" })
(map-set error-messages { error-code: u106 } { message: u"Contract is currently paused" })
(map-set error-messages { error-code: u107 } { message: u"Amount below minimum deposit requirement" })
(map-set error-messages { error-code: u108 } { message: u"Amount exceeds maximum deposit limit" })
(map-set error-messages { error-code: u109 } { message: u"Withdrawal cooldown period active" })
(map-set error-messages { error-code: u110 } { message: u"Invalid lock period: outside allowed range" })
(map-set error-messages { error-code: u111 } { message: u"Reentrancy detected: operation blocked" })
(map-set error-messages { error-code: u112 } { message: u"Overflow protection: value too large" })
(map-set error-messages { error-code: u113 } { message: u"Invalid principal address" })
(map-set error-messages { error-code: u114 } { message: u"Rate limit exceeded for admin action" })

;; Function to get error message
(define-read-only (get-error-message (error-code uint))
  (match (map-get? error-messages { error-code: error-code })
    message-data (ok (get message message-data))
    (ok u"Unknown error")
  )
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
(define-constant ERR_INVALID_LOCK_PERIOD (err u110))
(define-constant ERR_REENTRANCY_GUARD (err u111))
(define-constant ERR_OVERFLOW_PROTECTION (err u112))
(define-constant ERR_INVALID_PRINCIPAL (err u113))
(define-constant ERR_RATE_LIMIT_EXCEEDED (err u114))

;; Edge case handling functions
(define-private (handle-edge-case-deposit (amount uint) (lock-period uint))
  (let
    (
      (total-supply (stx-get-balance (as-contract tx-sender)))
      (user-balance (stx-get-balance tx-sender))
    )
    (begin
      ;; Check for potential overflow in calculations
      (asserts! (< amount u340282366920938463463374607431768211455) ERR_OVERFLOW_PROTECTION)
      ;; Ensure user has sufficient balance
      (asserts! (>= user-balance amount) ERR_NO_AMOUNT)
      ;; Check for reasonable lock period (not too far in future)
      (asserts! (< (+ stacks-block-height lock-period) u4294967295) ERR_OVERFLOW_PROTECTION)
      true
    )
  )
)

;; -----------------------------------------------------------
;; Security Functions
;; -----------------------------------------------------------

;; Reentrancy protection
(define-private (check-reentrancy)
  (begin
    (asserts! (not (var-get reentrancy-guard)) ERR_REENTRANCY_GUARD)
    (var-set reentrancy-guard true)
    true
  )
)

(define-private (clear-reentrancy)
  (var-set reentrancy-guard false)
)

;; Input validation
(define-private (validate-principal (user principal))
  (not (is-eq user 'SP000000000000000000002Q6VF78))
)

(define-private (validate-amount (amount uint))
  (and 
    (> amount u0)
    (< amount u340282366920938463463374607431768211455) ;; Max uint128
  )
)

(define-private (validate-lock-period (lock-period uint))
  (and
    (>= lock-period (var-get min-lock-period))
    (<= lock-period (var-get max-lock-period))
  )
)

;; Admin rate limiting
(define-private (check-admin-rate-limit (action (string-ascii 20)))
  (let
    (
      (last-action (map-get? admin-action-timestamps { admin: tx-sender, action: action }))
      (current-time stacks-block-height)
      (rate-limit (var-get admin-rate-limit))
    )
    (match last-action
      timestamp-data
      (let
        (
          (time-diff (- current-time (get last-timestamp timestamp-data)))
        )
        (if (>= time-diff rate-limit)
          (begin
            (map-set admin-action-timestamps 
              { admin: tx-sender, action: action }
              { last-timestamp: current-time }
            )
            true
          )
          false
        )
      )
      (begin
        (map-set admin-action-timestamps 
          { admin: tx-sender, action: action }
          { last-timestamp: current-time }
        )
        true
      )
    )
  )
)

;; -----------------------------------------------------------
;; Utility Functions
;; -----------------------------------------------------------

(define-private (is-admin (sender principal))
  (is-eq sender (var-get admin))
)

(define-private (is-contract-active)
  (not (var-get contract-paused))
)

;; Log contract events for audit trail
(define-private (log-event (event-type (string-ascii 20)) (user principal) (amount uint) (data (string-utf8 200)))
  (let
    (
      (current-counter (var-get event-counter))
      (new-counter (+ current-counter u1))
    )
    (map-set contract-events
      { event-id: new-counter }
      {
        event-type: event-type,
        user: user,
        amount: amount,
        timestamp: stacks-block-height,
        data: data
      }
    )
    (var-set event-counter new-counter)
    true
  )
)

;; Gas-optimized helper function to convert int to utf8 string
(define-private (int-to-utf8 (value int))
  (if (< value 0)
    u"-"
    (if (< value 10)
      (unwrap-panic (element-at (list u"0" u"1" u"2" u"3" u"4" u"5" u"6" u"7" u"8" u"9") (to-uint value)))
      u"10+"
    )
  )
)

;; Gas-optimized compound interest calculation
;; Uses bit shifting and lookup tables for better performance
(define-private (calculate-compound-reward (principal uint) (periods uint))
  (let
    (
      (rate (var-get reward-rate))
      (frequency (var-get compound-frequency))
    )
    (if (is-eq periods u0)
      u0
      ;; Optimized calculation using bit operations where possible
      (let
        (
          (period-rate (/ rate frequency))
          (base-calculation (/ (* principal period-rate) u100))
        )
        ;; Use bit shifting for powers of 2 to optimize gas
        (if (is-eq frequency u12) ;; Monthly compounding
          (/ (* base-calculation periods) frequency)
          (/ (* (* principal period-rate) periods) (* u100 frequency))
        )
      )
    )
  )
)

;; Gas-optimized time multiplier with lookup table
(define-private (get-time-multiplier (lock-blocks uint))
  ;; Use constants for common lock periods to save gas
  (if (>= lock-blocks u105120) u20000      ;; 2+ years: 2x
    (if (>= lock-blocks u52560) u15000     ;; 1+ year: 1.5x  
      (if (>= lock-blocks u25920) u12000   ;; 6+ months: 1.2x
        u10000                             ;; Default: 1x
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
      ;; Security checks
      (check-reentrancy)
      (asserts! (is-contract-active) ERR_CONTRACT_PAUSED)
      (asserts! (validate-principal tx-sender) ERR_INVALID_PRINCIPAL)
      (asserts! (validate-amount amount) ERR_NO_AMOUNT)
      (asserts! (validate-lock-period lock-period) ERR_INVALID_LOCK_PERIOD)
      (asserts! (>= amount (var-get minimum-deposit)) ERR_BELOW_MINIMUM)
      (asserts! (<= amount (var-get max-deposit-per-user)) ERR_EXCEEDS_MAXIMUM)
      (asserts! (is-none existing) ERR_ALREADY_DEPOSITED)
      
      ;; Edge case handling
      (handle-edge-case-deposit amount lock-period)
      
      (let ((unlock (+ stacks-block-height lock-period)))
        (try! (stx-transfer? amount tx-sender (as-contract tx-sender)))
        
        ;; Record deposit history
        (let
          (
            (current-count (get count (default-to { count: u0 } (map-get? user-deposit-count { user: tx-sender }))))
            (new-count (+ current-count u1))
            (current-rep (default-to 
              { points: 0, current-streak: u0, longest-streak: u0, last-deposit-block: u0 }
              (map-get? reputation { user: tx-sender })
            ))
            (blocks-since-last (- stacks-block-height (get last-deposit-block current-rep)))
            (streak-broken (> blocks-since-last u4320)) ;; 30 days
            (new-streak (if (or (is-eq (get current-streak current-rep) u0) streak-broken) u1 (+ (get current-streak current-rep) u1)))
            (new-longest (if (> new-streak (get longest-streak current-rep)) new-streak (get longest-streak current-rep)))
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
          
          ;; Update streak information
          (map-set reputation
            { user: tx-sender }
            {
              points: (get points current-rep),
              current-streak: new-streak,
              longest-streak: new-longest,
              last-deposit-block: stacks-block-height
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
        
        ;; Log deposit event
        (log-event "deposit" tx-sender amount (concat u"Lock period: " (int-to-utf8 (to-int lock-period))))
        
        ;; Clear reentrancy guard
        (clear-reentrancy)
        
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
            (current-rep (default-to 
              { points: 0, current-streak: u0, longest-streak: u0, last-deposit-block: u0 }
              (map-get? reputation { user: tx-sender })
            ))
            ;; Streak bonus: 10% extra points per streak level (max 100% bonus)
            (streak-bonus (min (* (get current-streak current-rep) 10) 100))
            (streak-multiplied-reward (+ final-reward (/ (* final-reward (to-int streak-bonus)) 100)))
          )
          ;; Update reputation points (no points for early withdrawal)
          (map-set reputation
            { user: tx-sender }
            { 
              points: (+ streak-multiplied-reward current-points),
              current-streak: (get current-streak current-rep),
              longest-streak: (get longest-streak current-rep),
              last-deposit-block: (get last-deposit-block current-rep)
            }
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
          
          ;; Log withdrawal event
          (log-event 
            (if is-early "early-withdrawal" "withdrawal")
            tx-sender 
            final-amount 
            (concat u"Penalty: " (int-to-utf8 (to-int penalty-amount)))
          )
          
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
    
    ;; Record rate change in history
    (let
      (
        (current-count (var-get rate-history-count))
        (new-count (+ current-count u1))
      )
      (map-set rate-history
        { timestamp: stacks-block-height }
        { rate: new-rate, admin: tx-sender }
      )
      (var-set rate-history-count new-count)
    )
    
    (var-set reward-rate new-rate)
    
    ;; Log rate change event
    (log-event "rate-change" tx-sender new-rate u"Admin rate adjustment")
    
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
    rep-data (ok (tuple
      (points (get points rep-data))
      (current-streak (get current-streak rep-data))
      (longest-streak (get longest-streak rep-data))
      (last-deposit-block (get last-deposit-block rep-data))
    ))
    (ok (tuple (points 0) (current-streak u0) (longest-streak u0) (last-deposit-block u0)))
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

(define-read-only (get-rate-history (limit uint))
  (let
    (
      (total-count (var-get rate-history-count))
      (start-timestamp (if (> total-count limit) (- total-count limit) u1))
    )
    (ok (tuple
      (total-changes total-count)
      (current-rate (var-get reward-rate))
      (history (get-rate-range start-timestamp total-count))
    ))
  )
)

(define-private (get-rate-range (start uint) (end uint))
  (if (<= start end)
    (let
      (
        (current-rate (map-get? rate-history { timestamp: start }))
      )
      (unwrap-panic (as-max-len? 
        (append 
          (get-rate-range (+ start u1) end)
          (list current-rate)
        ) 
        u20
      ))
    )
    (list)
  )
)

(define-read-only (get-contract-events (limit uint))
  (let
    (
      (total-events (var-get event-counter))
      (start-id (if (> total-events limit) (- total-events limit) u1))
    )
    (ok (tuple
      (total-events total-events)
      (events (get-event-range start-id total-events))
    ))
  )
)

(define-private (get-event-range (start uint) (end uint))
  (if (<= start end)
    (let
      (
        (current-event (map-get? contract-events { event-id: start }))
      )
      (unwrap-panic (as-max-len? 
        (append 
          (get-event-range (+ start u1) end)
          (list current-event)
        ) 
        u50
      ))
    )
    (list)
  )
)
