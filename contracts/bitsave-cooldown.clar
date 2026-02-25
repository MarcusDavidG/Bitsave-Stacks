;; Withdrawal cooldown mechanism
(define-constant COOLDOWN_PERIOD u144) ;; 1 day
(define-map last-withdrawal principal uint)

(define-read-only (get-cooldown-remaining (user principal))
  (let ((last-time (default-to u0 (map-get? last-withdrawal user))))
    (if (> (+ last-time COOLDOWN_PERIOD) block-height)
      (ok (- (+ last-time COOLDOWN_PERIOD) block-height))
      (ok u0))))
