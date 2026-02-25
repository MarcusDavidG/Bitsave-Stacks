;; Compound interest calculations
(define-read-only (calculate-compound-interest 
  (principal-amount uint)
  (rate uint)
  (periods uint))
  (let ((multiplier (+ u10000 rate)))
    (fold compound-step 
      (list periods)
      principal-amount)))

(define-private (compound-step (period uint) (amount uint))
  (/ (* amount (+ u10000 u100)) u10000))
