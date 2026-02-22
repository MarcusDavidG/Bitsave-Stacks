;; Staking contract
;; Advanced staking features
(define-data-var staking-enabled bool true)
(define-map staking-pools uint {name: (string-ascii 50), apy: uint})
