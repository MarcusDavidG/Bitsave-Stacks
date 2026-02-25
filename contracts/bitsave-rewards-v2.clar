;; Enhanced rewards calculation v2
(define-read-only (calculate-rewards-v2 (amount uint) (duration uint))
  (/ (* amount duration u100) u10000))
