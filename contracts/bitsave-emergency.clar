;; Emergency withdrawal with penalty
(define-constant EMERGENCY_PENALTY u2000) ;; 20% penalty

(define-public (emergency-withdraw)
  (let ((savings (unwrap! (get-savings tx-sender) (err u404))))
    (let ((amount (get amount savings))
          (penalty (/ (* amount EMERGENCY_PENALTY) u10000))
          (net-amount (- amount penalty)))
      (try! (as-contract (stx-transfer? net-amount tx-sender tx-sender)))
      (ok net-amount))))
