;; Enhanced event logging
(define-map event-log uint {
  event-type: (string-ascii 20),
  user: principal,
  amount: uint,
  timestamp: uint
})

(define-data-var event-counter uint u0)

(define-private (log-event (event-type (string-ascii 20)) (amount uint))
  (let ((counter (var-get event-counter)))
    (map-set event-log counter {
      event-type: event-type,
      user: tx-sender,
      amount: amount,
      timestamp: block-height
    })
    (var-set event-counter (+ counter u1))))
