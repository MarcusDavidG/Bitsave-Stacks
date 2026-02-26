;; BitSave Time-Based Rewards
;; Additional rewards based on lock duration

(define-constant TIME-BONUS-THRESHOLD-1 u1440) ;; 10 days
(define-constant TIME-BONUS-THRESHOLD-2 u4320) ;; 30 days  
(define-constant TIME-BONUS-THRESHOLD-3 u12960) ;; 90 days

(define-constant TIME-BONUS-RATE-1 u150) ;; 1.5% bonus
(define-constant TIME-BONUS-RATE-2 u300) ;; 3% bonus
(define-constant TIME-BONUS-RATE-3 u500) ;; 5% bonus

(define-read-only (get-time-bonus-rate (lock-period uint))
  (if (>= lock-period TIME-BONUS-THRESHOLD-3)
    TIME-BONUS-RATE-3
    (if (>= lock-period TIME-BONUS-THRESHOLD-2)
      TIME-BONUS-RATE-2
      (if (>= lock-period TIME-BONUS-THRESHOLD-1)
        TIME-BONUS-RATE-1
        u0))))

(define-read-only (calculate-time-bonus (base-reward uint) (lock-period uint))
  (let ((bonus-rate (get-time-bonus-rate lock-period)))
    (/ (* base-reward bonus-rate) u10000)))
