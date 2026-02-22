;; Social features
(define-map user-profiles principal {username: (string-ascii 30), bio: (string-utf8 256)})
(define-map user-followers {follower: principal, following: principal} bool)
(define-map follower-count principal uint)
