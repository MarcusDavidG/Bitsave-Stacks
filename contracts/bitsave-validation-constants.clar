;; BitSave Validation Constants
;; Centralized validation constants for the BitSave protocol

(define-constant MIN-DEPOSIT-AMOUNT u1000000) ;; 1 STX minimum
(define-constant MAX-DEPOSIT-AMOUNT u100000000000) ;; 100k STX maximum  
(define-constant MIN-LOCK-BLOCKS u144) ;; ~1 day minimum
(define-constant MAX-LOCK-BLOCKS u52560) ;; ~1 year maximum
(define-constant REPUTATION-MULTIPLIER u10) ;; 10 points per STX
