;; Streak tracking for consistent savers
(define-map user-streaks principal {
  current-streak: uint,
  longest-streak: uint,
  last-deposit: uint
})

(define-read-only (get-streak (user principal))
  (default-to {current-streak: u0, longest-streak: u0, last-deposit: u0}
    (map-get? user-streaks user)))
