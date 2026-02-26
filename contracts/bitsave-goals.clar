;; BitSave Goals System
;; Personal savings goals and milestone tracking

(define-map user-goals principal {
  target-amount: uint,
  target-date: uint,
  current-progress: uint,
  goal-type: (string-ascii 32),
  created-at: uint,
  completed: bool
})

(define-map goal-milestones principal (list 10 uint))

(define-read-only (get-user-goal (user principal))
  (map-get? user-goals user))

(define-public (set-savings-goal (target-amount uint) (target-blocks uint) (goal-type (string-ascii 32)))
  (begin
    (asserts! (> target-amount u0) (err u4001))
    (asserts! (> target-blocks block-height) (err u4002))
    (map-set user-goals tx-sender {
      target-amount: target-amount,
      target-date: target-blocks,
      current-progress: u0,
      goal-type: goal-type,
      created-at: block-height,
      completed: false
    })
    (print {event: "goal-set", user: tx-sender, target: target-amount, type: goal-type})
    (ok true)))

(define-public (update-goal-progress (user principal) (new-amount uint))
  (match (map-get? user-goals user)
    goal-data
    (let ((updated-goal (merge goal-data {current-progress: new-amount})))
      (map-set user-goals user updated-goal)
      (if (>= new-amount (get target-amount goal-data))
        (begin
          (map-set user-goals user (merge updated-goal {completed: true}))
          (print {event: "goal-completed", user: user, amount: new-amount})
          (ok true))
        (ok true)))
    (err u4003))) ;; Goal not found

(define-read-only (calculate-goal-progress-percentage (user principal))
  (match (map-get? user-goals user)
    goal-data
    (let ((progress (get current-progress goal-data))
          (target (get target-amount goal-data)))
      (if (> target u0)
        (ok (/ (* progress u100) target))
        (ok u0)))
    (err u4003)))
