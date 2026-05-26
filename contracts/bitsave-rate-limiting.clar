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
