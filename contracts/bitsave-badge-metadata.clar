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
