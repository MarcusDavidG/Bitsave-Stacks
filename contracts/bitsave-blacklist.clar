;; Blacklist for security
(define-map blacklist principal bool)
(define-read-only (is-blacklisted (user principal))
  (default-to false (map-get? blacklist user)))
