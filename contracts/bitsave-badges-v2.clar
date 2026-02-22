;; Badge V2 with advanced features
(define-constant BADGE_COMBO_BONUS u20)
(define-map badge-combinations uint (list 10 uint))
(define-map badge-power-level uint uint)
(define-map badge-evolution uint uint)
(define-data-var evolution-enabled bool true)
(define-map badge-fusion (tuple (badge1 uint) (badge2 uint)) uint)
(define-map seasonal-badges uint {season: (string-ascii 20), year: uint})
