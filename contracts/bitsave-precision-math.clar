;; BitSave Precision Math
;; High-precision mathematical operations for reward calculations

(define-constant PRECISION u1000000) ;; 6 decimal places
(define-constant ERR-PRECISION-OVERFLOW (err u3001))

(define-read-only (multiply-with-precision (a uint) (b uint))
  (let ((result (* a b)))
    (if (< result a) ;; Check for overflow
      ERR-PRECISION-OVERFLOW
      (ok (/ result PRECISION)))))

(define-read-only (divide-with-precision (a uint) (b uint))
  (if (is-eq b u0)
    (err u3002) ;; Division by zero
    (ok (/ (* a PRECISION) b))))

(define-read-only (calculate-compound-reward (principal uint) (rate uint) (periods uint))
  (let ((rate-plus-one (+ PRECISION rate)))
    (fold compound-step (list periods) principal)))

(define-private (compound-step (period uint) (amount uint))
  (unwrap-panic (multiply-with-precision amount (+ PRECISION u100)))) ;; 1% per period
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
<!-- update 33 -->
<!-- update 34 -->
<!-- update 35 -->
