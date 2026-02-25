;; Time-weighted reward multipliers
(define-map time-multipliers uint uint)

(map-set time-multipliers u144 u10000) ;; 1 day: 1x
(map-set time-multipliers u1008 u11000) ;; 1 week: 1.1x
(map-set time-multipliers u4320 u12000) ;; 1 month: 1.2x
(map-set time-multipliers u52560 u15000) ;; 1 year: 1.5x
