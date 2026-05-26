;; Blacklist for security
(define-map blacklist principal bool)
(define-read-only (is-blacklisted (user principal))
  (default-to false (map-get? blacklist user)))
<!-- update 1 -->
<!-- update 2 -->
<!-- update 3 -->
<!-- update 4 -->
