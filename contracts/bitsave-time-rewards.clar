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
<!-- update 1 -->
<!-- update 2 -->
<!-- update 3 -->
<!-- update 4 -->
<!-- update 5 -->
<!-- update 6 -->
<!-- update 7 -->
<!-- update 8 -->
<!-- update 9 -->
<!-- update 10 -->
<!-- update 11 -->
<!-- update 12 -->
<!-- update 13 -->
<!-- update 14 -->
<!-- update 15 -->
<!-- update 16 -->
<!-- update 17 -->
<!-- update 18 -->
<!-- update 19 -->
<!-- update 20 -->
<!-- update 21 -->
<!-- update 22 -->
<!-- update 23 -->
<!-- update 24 -->
<!-- update 25 -->
<!-- update 26 -->
<!-- update 27 -->
<!-- update 28 -->
<!-- update 29 -->
<!-- update 30 -->
<!-- update 31 -->
<!-- update 32 -->
