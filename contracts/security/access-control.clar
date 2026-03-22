;; Access Control Module
;; Provides role-based access control for BitSave

(define-constant ERR-NOT-AUTHORIZED (err u401))
(define-constant ERR-INVALID-ROLE (err u402))

(define-map roles principal uint)
(define-constant ADMIN-ROLE u1)
(define-constant MODERATOR-ROLE u2)

(define-public (grant-role (user principal) (role uint))
  (begin
    (asserts! (is-eq tx-sender (var-get contract-owner)) ERR-NOT-AUTHORIZED)
    (map-set roles user role)
    (ok true)))

(define-read-only (has-role (user principal) (role uint))
  (is-eq (default-to u0 (map-get? roles user)) role))
