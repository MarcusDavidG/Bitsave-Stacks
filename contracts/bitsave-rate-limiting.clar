;; BitSave Rate Limiting
;; Prevents spam and abuse by limiting transaction frequency

(define-map user-last-action principal uint)
(define-constant RATE-LIMIT-BLOCKS u10) ;; 10 blocks between actions

(define-read-only (check-rate-limit (user principal))
  (let ((last-action (default-to u0 (map-get? user-last-action user))))
    (>= (- block-height last-action) RATE-LIMIT-BLOCKS)))

(define-public (update-rate-limit (user principal))
  (begin
    (map-set user-last-action user block-height)
    (ok true)))
