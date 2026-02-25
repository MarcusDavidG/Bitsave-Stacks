;; Deposit limits for risk management
(define-data-var min-deposit uint u1000000) ;; 1 STX
(define-data-var max-deposit uint u100000000000) ;; 100,000 STX
(define-data-var max-total-deposits uint u1000000000000) ;; 1M STX

(define-read-only (validate-deposit (amount uint))
  (and 
    (>= amount (var-get min-deposit))
    (<= amount (var-get max-deposit))))
