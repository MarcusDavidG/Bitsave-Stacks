;; BitSave Badge Metadata
;; Enhanced metadata structure for achievement badges

(define-map badge-metadata uint {
  name: (string-ascii 64),
  description: (string-ascii 256),
  tier: (string-ascii 16),
  threshold: uint,
  rarity: (string-ascii 16),
  image-uri: (string-ascii 256)
})

(define-read-only (get-badge-info (token-id uint))
  (map-get? badge-metadata token-id))

(define-public (set-badge-metadata (token-id uint) (metadata {name: (string-ascii 64), description: (string-ascii 256), tier: (string-ascii 16), threshold: uint, rarity: (string-ascii 16), image-uri: (string-ascii 256)}))
  (begin
    (map-set badge-metadata token-id metadata)
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
