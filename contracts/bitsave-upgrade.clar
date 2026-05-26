;; -----------------------------------------------------------
;; BitSave Upgrade Manager
;; Author: Marcus David
;; Description: Manages contract upgrades and migrations
;; -----------------------------------------------------------

(define-data-var admin principal tx-sender)
(define-data-var upgrade-enabled bool false)
(define-data-var new-contract-address (optional principal) none)

;; Error codes
(define-constant ERR_NOT_AUTHORIZED (err u200))
(define-constant ERR_UPGRADE_NOT_ENABLED (err u201))
(define-constant ERR_NO_NEW_CONTRACT (err u202))

;; -----------------------------------------------------------
;; Admin Functions
;; -----------------------------------------------------------

(define-public (enable-upgrade (new-contract principal))
  (begin
    (asserts! (is-eq tx-sender (var-get admin)) ERR_NOT_AUTHORIZED)
    (var-set upgrade-enabled true)
    (var-set new-contract-address (some new-contract))
    (ok true)
  )
)

(define-public (disable-upgrade)
  (begin
    (asserts! (is-eq tx-sender (var-get admin)) ERR_NOT_AUTHORIZED)
    (var-set upgrade-enabled false)
    (var-set new-contract-address none)
    (ok true)
  )
)

(define-public (transfer-admin (new-admin principal))
  (begin
    (asserts! (is-eq tx-sender (var-get admin)) ERR_NOT_AUTHORIZED)
    (var-set admin new-admin)
    (ok true)
  )
)

;; -----------------------------------------------------------
;; Read-only Functions
;; -----------------------------------------------------------

(define-read-only (is-upgrade-enabled)
  (ok (var-get upgrade-enabled))
)

(define-read-only (get-new-contract-address)
  (ok (var-get new-contract-address))
)

(define-read-only (get-admin)
  (ok (var-get admin))
)
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
