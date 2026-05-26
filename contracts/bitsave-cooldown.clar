;; Withdrawal cooldown mechanism
(define-constant COOLDOWN_PERIOD u144) ;; 1 day
(define-map last-withdrawal principal uint)

(define-read-only (get-cooldown-remaining (user principal))
  (let ((last-time (default-to u0 (map-get? last-withdrawal user))))
    (if (> (+ last-time COOLDOWN_PERIOD) block-height)
      (ok (- (+ last-time COOLDOWN_PERIOD) block-height))
      (ok u0))))
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
