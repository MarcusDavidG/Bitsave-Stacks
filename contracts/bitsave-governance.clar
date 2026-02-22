;; Governance contract
;; DAO governance system
(define-data-var governance-enabled bool false)
(define-data-var proposal-threshold uint u1000)
(define-data-var voting-period uint u1440)
(define-data-var quorum-percentage uint u20)
(define-map proposals uint {title: (string-ascii 100), proposer: principal})
(define-map proposal-votes uint {yes: uint, no: uint, abstain: uint})
