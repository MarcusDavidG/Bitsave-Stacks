;; Staking contract
;; Advanced staking features
(define-data-var staking-enabled bool true)
(define-map staking-pools uint {name: (string-ascii 50), apy: uint})
(define-map user-staking-pool principal uint)
(define-data-var flexible-staking-apy uint u5)
(define-data-var locked-30-apy uint u8)
(define-data-var locked-90-apy uint u12)
