;; BitSave Streak Tracking
;; Track consecutive deposit streaks for bonus rewards

(define-map user-streaks principal {
  current-streak: uint,
  longest-streak: uint,
  last-deposit-block: uint,
  streak-bonus-earned: uint
})

(define-constant STREAK-WINDOW u1440) ;; 10 days in blocks
(define-constant STREAK-BONUS-RATE u50) ;; 0.5% bonus per streak level

(define-read-only (get-user-streak (user principal))
  (default-to {current-streak: u0, longest-streak: u0, last-deposit-block: u0, streak-bonus-earned: u0}
    (map-get? user-streaks user)))

(define-public (update-streak (user principal))
  (let ((current-data (get-user-streak user))
        (last-deposit (get last-deposit-block current-data))
        (current-streak (get current-streak current-data))
        (blocks-since-last (- block-height last-deposit)))
    (if (<= blocks-since-last STREAK-WINDOW)
      ;; Continue streak
      (let ((new-streak (+ current-streak u1)))
        (map-set user-streaks user {
          current-streak: new-streak,
          longest-streak: (max new-streak (get longest-streak current-data)),
          last-deposit-block: block-height,
          streak-bonus-earned: (get streak-bonus-earned current-data)
        })
        (ok new-streak))
      ;; Reset streak
      (begin
        (map-set user-streaks user {
          current-streak: u1,
          longest-streak: (get longest-streak current-data),
          last-deposit-block: block-height,
          streak-bonus-earned: (get streak-bonus-earned current-data)
        })
        (ok u1)))))

(define-read-only (calculate-streak-bonus (base-reward uint) (streak uint))
  (/ (* base-reward (* streak STREAK-BONUS-RATE)) u10000))
