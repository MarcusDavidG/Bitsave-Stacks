;; BitSave Utility Functions
;; Helper functions for common operations

(use-trait sip-010-trait .sip-010-trait.sip-010-trait)

(define-read-only (blocks-to-days (blocks uint))
  (/ blocks u144))

(define-read-only (days-to-blocks (days uint))
  (* days u144))

(define-read-only (calculate-basic-reward (amount uint) (rate uint))
  (/ (* amount rate) u10000))

(define-read-only (is-valid-principal (address principal))
  (not (is-eq address 'SP000000000000000000002Q6VF78)))
