;; Tiered reward system based on deposit amount and duration
(define-constant TIER-1-THRESHOLD u10000000000) ;; 10k STX
(define-constant TIER-2-THRESHOLD u50000000000) ;; 50k STX
(define-constant TIER-3-THRESHOLD u100000000000) ;; 100k STX

(define-read-only (get-tier-multiplier (amount uint))
  (if (>= amount TIER-3-THRESHOLD) u150
  (if (>= amount TIER-2-THRESHOLD) u125
  (if (>= amount TIER-1-THRESHOLD) u110
  u100))))
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
