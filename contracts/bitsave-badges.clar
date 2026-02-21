;; -----------------------------------------------------------
;; BitSave Badges: Achievement NFT System
;; Author: Marcus David
;; Description: SIP-009 compliant NFT badges awarded to BitSave users
;;              for reaching reputation milestones.
;; -----------------------------------------------------------

;; SIP-009 NFT Trait Definition
;; This contract implements the standard NFT interface
(define-trait nft-trait
  (
    ;; Last token ID, limited to uint range
    (get-last-token-id () (response uint uint))

    ;; URI for metadata associated with the token
    (get-token-uri (uint) (response (optional (string-utf8 256)) uint))

    ;; Owner of a given token identifier
    (get-owner (uint) (response (optional principal) uint))

    ;; Transfer from the sender to a new principal
    (transfer (uint principal principal) (response bool uint))
  )
)

;; -----------------------------------------------------------
;; Constants & Error Codes
;; -----------------------------------------------------------

(define-constant ERR_UNAUTHORIZED (err u105))
(define-constant ERR_NOT_OWNER (err u106))
(define-constant ERR_NOT_FOUND (err u107))

;; Badge tier thresholds
(define-constant BRONZE_THRESHOLD u100)
(define-constant SILVER_THRESHOLD u500)

;; -----------------------------------------------------------
;; Data Variables
;; -----------------------------------------------------------

;; Contract version
(define-data-var contract-version uint u101) ;; Version 1.0.1

;; Admin principal (deployer by default)
(define-data-var admin principal tx-sender)

;; Authorized minter (only this principal can mint badges)
;; Default is admin, but should be set to BitSave contract
(define-data-var authorized-minter principal tx-sender)

;; Counter for next token ID
(define-data-var next-token-id uint u1)

;; -----------------------------------------------------------
;; Data Maps
;; -----------------------------------------------------------

;; NFT definition
(define-non-fungible-token bitsave-badge uint)

;; Token metadata storage (token-id -> metadata URI)
(define-map token-metadata uint (string-utf8 256))

;; -----------------------------------------------------------
;; Private Helper Functions
;; -----------------------------------------------------------

;; Check if caller is admin
(define-private (is-admin (caller principal))
  (is-eq caller (var-get admin))
)

;; Check if caller is authorized minter
(define-private (is-authorized-minter (caller principal))
  (is-eq caller (var-get authorized-minter))
)

;; -----------------------------------------------------------
;; Admin Functions
;; -----------------------------------------------------------

;; Set the authorized minter (only admin can call)
;; This should be set to the BitSave contract address
(define-public (set-authorized-minter (minter principal))
  (begin
    (asserts! (is-admin tx-sender) ERR_UNAUTHORIZED)
    (var-set authorized-minter minter)
    (ok minter)
  )
)

;; Transfer admin role to a new principal (only current admin)
(define-public (transfer-admin (new-admin principal))
  (begin
    (asserts! (is-admin tx-sender) ERR_UNAUTHORIZED)
    (var-set admin new-admin)
    (ok new-admin)
  )
)

;; -----------------------------------------------------------
;; Minting Function
;; -----------------------------------------------------------

;; Mint a new badge (only authorized minter can call)
;; @param recipient: principal who will receive the badge
;; @param metadata: UTF-8 string containing badge metadata (e.g., JSON)
(define-public (mint (recipient principal) (metadata (string-utf8 256)))
  (let
    (
      (token-id (var-get next-token-id))
    )
    (begin
      ;; Only authorized minter (BitSave contract) can mint
      (asserts! (is-authorized-minter tx-sender) ERR_UNAUTHORIZED)
      
      ;; Mint the NFT to recipient
      (try! (nft-mint? bitsave-badge token-id recipient))
      
      ;; Store metadata
      (map-set token-metadata token-id metadata)
      
      ;; Increment token ID counter
      (var-set next-token-id (+ token-id u1))
      
      (ok token-id)
    )
  )
)

;; -----------------------------------------------------------
;; SIP-009 Standard Functions
;; -----------------------------------------------------------

;; Get the last token ID
(define-read-only (get-last-token-id)
  (ok (- (var-get next-token-id) u1))
)

;; Get token URI (metadata)
(define-read-only (get-token-uri (token-id uint))
  (ok (map-get? token-metadata token-id))
)

;; Get owner of a token
(define-read-only (get-owner (token-id uint))
  (ok (nft-get-owner? bitsave-badge token-id))
)

;; Transfer token to another principal (only owner can transfer)
(define-public (transfer (token-id uint) (sender principal) (recipient principal))
  (begin
    ;; Verify sender is the actual owner
    (asserts! (is-eq sender tx-sender) ERR_UNAUTHORIZED)
    (asserts! (is-eq (some sender) (nft-get-owner? bitsave-badge token-id)) ERR_NOT_OWNER)
    
    ;; Transfer the NFT
    (nft-transfer? bitsave-badge token-id sender recipient)
  )
)

;; -----------------------------------------------------------
;; Additional Functions
;; -----------------------------------------------------------

;; Burn a badge (only owner can burn)
(define-public (burn (token-id uint))
  (let
    (
      (owner (unwrap! (nft-get-owner? bitsave-badge token-id) ERR_NOT_FOUND))
    )
    (begin
      ;; Only owner can burn their badge
      (asserts! (is-eq tx-sender owner) ERR_NOT_OWNER)
      
      ;; Burn the NFT
      (try! (nft-burn? bitsave-badge token-id owner))
      
      ;; Remove metadata
      (map-delete token-metadata token-id)
      
      (ok true)
    )
  )
)

;; -----------------------------------------------------------
;; Read-Only Helper Functions
;; -----------------------------------------------------------

;; Get the next token ID that will be minted
(define-read-only (get-next-token-id)
  (ok (var-get next-token-id))
)

;; Get the current authorized minter
(define-read-only (get-authorized-minter)
  (ok (var-get authorized-minter))
)

;; Get the current admin
(define-read-only (get-admin)
  (ok (var-get admin))
)

;; Get contract version
(define-read-only (get-version)
  (ok (var-get contract-version))
)
(define-constant GOLD_THRESHOLD u1000)
(define-constant PLATINUM_THRESHOLD u5000)
(define-constant DIAMOND_THRESHOLD u10000)
;; Time-based badge thresholds
(define-constant STREAK_30_DAYS u30)
(define-constant STREAK_90_DAYS u90)
(define-constant STREAK_180_DAYS u180)
(define-constant STREAK_365_DAYS u365)
;; Deposit milestone thresholds
(define-constant DEPOSIT_1K u1000000000)
(define-constant DEPOSIT_10K u10000000000)
(define-constant DEPOSIT_100K u100000000000)
(define-constant DEPOSIT_1M u1000000000000)
(define-constant EARLY_ADOPTER_BLOCK u1000)
;; Referral badge thresholds
(define-constant REFERRAL_1 u1)
(define-constant REFERRAL_5 u5)
(define-constant REFERRAL_10 u10)
