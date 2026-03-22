;; Rate Limiter Module
;; Prevents spam and abuse

(define-map user-actions principal {last-action: uint, count: uint})
(define-constant MAX-ACTIONS-PER-BLOCK u5)

(define-public (check-rate-limit (user principal))
  (let ((current-block block-height)
        (user-data (default-to {last-action: u0, count: u0} (map-get? user-actions user))))
    (if (is-eq (get last-action user-data) current-block)
        (begin
          (asserts! (< (get count user-data) MAX-ACTIONS-PER-BLOCK) (err u429))
          (map-set user-actions user {last-action: current-block, count: (+ (get count user-data) u1)})
          (ok true))
        (begin
          (map-set user-actions user {last-action: current-block, count: u1})
          (ok true)))))
