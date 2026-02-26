;; Tiered reward system based on deposit amount and duration
(define-constant TIER-1-THRESHOLD u10000000000) ;; 10k STX
(define-constant TIER-2-THRESHOLD u50000000000) ;; 50k STX
(define-constant TIER-3-THRESHOLD u100000000000) ;; 100k STX

(define-read-only (get-tier-multiplier (amount uint))
  (if (>= amount TIER-3-THRESHOLD) u150
  (if (>= amount TIER-2-THRESHOLD) u125
  (if (>= amount TIER-1-THRESHOLD) u110
  u100))))
