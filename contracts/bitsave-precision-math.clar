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
