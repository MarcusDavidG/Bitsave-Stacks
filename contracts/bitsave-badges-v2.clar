;; Badge V2 with advanced features
(define-constant BADGE_COMBO_BONUS u20)
(define-map badge-combinations uint (list 10 uint))
(define-map badge-power-level uint uint)
(define-map badge-evolution uint uint)
(define-data-var evolution-enabled bool true)
(define-map badge-fusion (tuple (badge1 uint) (badge2 uint)) uint)
(define-map seasonal-badges uint {season: (string-ascii 20), year: uint})
(define-map limited-edition-badges uint uint)
(define-data-var max-limited-supply uint u100)
(define-map badge-expiry uint uint)
(define-map renewable-badges uint bool)
(define-map badge-achievements uint (list 5 (string-ascii 50)))
(define-map badge-perks uint (string-utf8 256))
(define-map user-badge-slots principal uint)
(define-data-var default-badge-slots uint u5)
(define-map badge-display-order principal (list 10 uint))
(define-map badge-showcase principal (list 3 uint))
(define-map badge-collection-bonus principal uint)
(define-data-var collection-milestone-1 uint u5)
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
<!-- update 35 -->
<!-- update 36 -->
<!-- update 37 -->
<!-- update 38 -->
<!-- update 39 -->
