;; BitSave Event System
;; Comprehensive event logging for all protocol actions

(define-constant EVENT-DEPOSIT "deposit")
(define-constant EVENT-WITHDRAW "withdraw")
(define-constant EVENT-BADGE-MINT "badge-mint")
(define-constant EVENT-GOAL-SET "goal-set")
(define-constant EVENT-GOAL-COMPLETE "goal-complete")
(define-constant EVENT-STREAK-UPDATE "streak-update")

(define-map event-log uint {
  event-type: (string-ascii 32),
  user: principal,
  amount: uint,
  block-height: uint,
  metadata: (string-ascii 256)
})

(define-data-var event-counter uint u0)

(define-private (log-event (event-type (string-ascii 32)) (user principal) (amount uint) (metadata (string-ascii 256)))
  (let ((event-id (+ (var-get event-counter) u1)))
    (map-set event-log event-id {
      event-type: event-type,
      user: user,
      amount: amount,
      block-height: block-height,
      metadata: metadata
    })
    (var-set event-counter event-id)
    (print {
      event: event-type,
      user: user,
      amount: amount,
      block: block-height,
      id: event-id,
      metadata: metadata
    })
    event-id))

(define-public (log-deposit-event (user principal) (amount uint) (lock-period uint))
  (ok (log-event EVENT-DEPOSIT user amount (concat "lock-period:" (int-to-ascii lock-period)))))

(define-public (log-withdraw-event (user principal) (amount uint) (reward uint))
  (ok (log-event EVENT-WITHDRAW user amount (concat "reward:" (int-to-ascii reward)))))

(define-public (log-badge-mint-event (user principal) (badge-id uint) (badge-type (string-ascii 32)))
  (ok (log-event EVENT-BADGE-MINT user badge-id badge-type)))

(define-read-only (get-event (event-id uint))
  (map-get? event-log event-id))

(define-read-only (get-event-count)
  (var-get event-counter))
