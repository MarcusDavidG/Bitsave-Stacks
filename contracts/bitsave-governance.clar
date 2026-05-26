;; Governance contract
;; DAO governance system
(define-data-var governance-enabled bool false)
(define-data-var proposal-threshold uint u1000)
(define-data-var voting-period uint u1440)
(define-data-var quorum-percentage uint u20)
(define-map proposals uint {title: (string-ascii 100), proposer: principal})
(define-map proposal-votes uint {yes: uint, no: uint, abstain: uint})
(define-map user-votes {proposal: uint, user: principal} bool)
(define-map proposal-status uint (string-ascii 20))
(define-data-var next-proposal-id uint u1)
(define-map voting-power principal uint)
(define-map delegated-votes principal principal)
(define-map proposal-execution-time uint uint)
(define-data-var timelock-period uint u144)
(define-map proposal-category uint (string-ascii 30))
(define-map emergency-proposals uint bool)
(define-data-var emergency-quorum uint u10)
(define-map proposal-discussion-url uint (string-utf8 256))
(define-map multi-choice-proposals uint (list 5 (string-ascii 50)))
(define-map weighted-voting-enabled uint bool)
;; Governance voting system
;; Governance voting system
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
