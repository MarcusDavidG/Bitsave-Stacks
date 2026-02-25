;; Gas optimization utilities
(define-private (batch-process (items (list 100 uint)))
  (fold process-item items u0))

(define-private (process-item (item uint) (acc uint))
  (+ acc item))

(define-read-only (estimate-gas (operation (string-ascii 20)))
  (if (is-eq operation "deposit") u5000
    (if (is-eq operation "withdraw") u7000 u3000)))
