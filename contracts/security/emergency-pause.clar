;; Emergency Pause Module
;; Circuit breaker for emergency situations

(define-data-var emergency-paused bool false)
(define-data-var pause-reason (string-ascii 256) "")

(define-public (emergency-pause (reason (string-ascii 256)))
  (begin
    (asserts! (is-contract-caller (var-get contract-owner)) (err u401))
    (var-set emergency-paused true)
    (var-set pause-reason reason)
    (ok true)))

(define-public (emergency-unpause)
  (begin
    (asserts! (is-contract-caller (var-get contract-owner)) (err u401))
    (var-set emergency-paused false)
    (var-set pause-reason "")
    (ok true)))

(define-read-only (is-paused)
  (var-get emergency-paused))
