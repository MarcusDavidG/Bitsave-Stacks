;; Whitelist for early access
(define-map whitelist principal bool)
(define-read-only (is-whitelisted (user principal))
  (default-to false (map-get? whitelist user)))
<!-- update 1 -->
<!-- update 2 -->
<!-- update 3 -->
<!-- update 4 -->
