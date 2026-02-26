;; BitSave Emergency Controls
;; Emergency pause and admin controls for the protocol

(define-data-var contract-paused bool false)
(define-data-var emergency-admin principal tx-sender)

(define-constant ERR-CONTRACT-PAUSED (err u2001))
(define-constant ERR-NOT-EMERGENCY-ADMIN (err u2002))

(define-read-only (is-contract-paused)
  (var-get contract-paused))

(define-read-only (get-emergency-admin)
  (var-get emergency-admin))

(define-public (emergency-pause)
  (begin
    (asserts! (is-eq tx-sender (var-get emergency-admin)) ERR-NOT-EMERGENCY-ADMIN)
    (var-set contract-paused true)
    (print {event: "emergency-pause", admin: tx-sender, block: block-height})
    (ok true)))

(define-public (emergency-unpause)
  (begin
    (asserts! (is-eq tx-sender (var-get emergency-admin)) ERR-NOT-EMERGENCY-ADMIN)
    (var-set contract-paused false)
    (print {event: "emergency-unpause", admin: tx-sender, block: block-height})
    (ok true)))

(define-public (transfer-emergency-admin (new-admin principal))
  (begin
    (asserts! (is-eq tx-sender (var-get emergency-admin)) ERR-NOT-EMERGENCY-ADMIN)
    (var-set emergency-admin new-admin)
    (print {event: "admin-transfer", old-admin: tx-sender, new-admin: new-admin})
    (ok true)))
