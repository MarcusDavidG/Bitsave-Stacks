;; Treasury contract
;; Treasury management
(define-data-var treasury-balance uint u0)
(define-map revenue-streams (string-ascii 30) uint)
(define-map expense-categories (string-ascii 30) uint)
(define-data-var protocol-fee uint u1)
(define-data-var withdrawal-fee uint u0)
(define-data-var performance-fee uint u10)
(define-map fee-distribution (string-ascii 30) uint)
(define-data-var treasury-reserve-ratio uint u20)
(define-map treasury-allocations (string-ascii 30) uint)
(define-map grant-proposals uint {amount: uint, recipient: principal})
