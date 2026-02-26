;; BitSave Gas Optimization
;; Optimized functions to reduce gas costs

(define-read-only (batch-get-user-data (users (list 10 principal)))
  (map get-user-summary users))

(define-private (get-user-summary (user principal))
  {user: user, balance: u0, reputation: u0}) ;; Simplified for gas efficiency

(define-read-only (calculate-rewards-batch (amounts (list 10 uint)) (rates (list 10 uint)))
  (map calculate-single-reward (zip amounts rates)))

(define-private (calculate-single-reward (data {amount: uint, rate: uint}))
  (/ (* (get amount data) (get rate data)) u10000))
