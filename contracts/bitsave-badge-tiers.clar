;; Multi-tier badge system
(define-constant BRONZE_TIER u1)
(define-constant SILVER_TIER u2)
(define-constant GOLD_TIER u3)
(define-constant PLATINUM_TIER u4)
(define-constant DIAMOND_TIER u5)

(define-map badge-tiers uint (string-ascii 20))

(map-set badge-tiers BRONZE_TIER "Bronze Saver")
(map-set badge-tiers SILVER_TIER "Silver Saver")
(map-set badge-tiers GOLD_TIER "Gold Saver")
(map-set badge-tiers PLATINUM_TIER "Platinum Saver")
(map-set badge-tiers DIAMOND_TIER "Diamond Saver")
