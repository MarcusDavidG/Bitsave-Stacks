;; BitSave Badge Rarity System
;; Implements rarity tiers for achievement badges

(define-constant RARITY-COMMON "Common")
(define-constant RARITY-UNCOMMON "Uncommon") 
(define-constant RARITY-RARE "Rare")
(define-constant RARITY-EPIC "Epic")
(define-constant RARITY-LEGENDARY "Legendary")

(define-map badge-rarity-config (string-ascii 32) {
  max-supply: uint,
  current-supply: uint,
  mint-cost: uint,
  special-requirements: bool
})

(define-read-only (get-badge-rarity-by-supply (current-supply uint))
  (if (<= current-supply u10)
    RARITY-LEGENDARY
    (if (<= current-supply u50)
      RARITY-EPIC
      (if (<= current-supply u200)
        RARITY-RARE
        (if (<= current-supply u1000)
          RARITY-UNCOMMON
          RARITY-COMMON)))))

(define-read-only (get-rarity-multiplier (rarity (string-ascii 16)))
  (if (is-eq rarity RARITY-LEGENDARY)
    u1000 ;; 10x multiplier
    (if (is-eq rarity RARITY-EPIC)
      u500  ;; 5x multiplier
      (if (is-eq rarity RARITY-RARE)
        u300 ;; 3x multiplier
        (if (is-eq rarity RARITY-UNCOMMON)
          u150 ;; 1.5x multiplier
          u100))))) ;; 1x multiplier for common

(define-public (initialize-badge-rarity (badge-type (string-ascii 32)) (max-supply uint) (mint-cost uint))
  (begin
    (map-set badge-rarity-config badge-type {
      max-supply: max-supply,
      current-supply: u0,
      mint-cost: mint-cost,
      special-requirements: false
    })
    (ok true)))
