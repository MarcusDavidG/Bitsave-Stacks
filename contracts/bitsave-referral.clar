;; Referral system for user growth
(define-map referrals principal principal)
(define-map referral-count principal uint)
(define-constant REFERRAL_BONUS u50) ;; 0.5% bonus

(define-public (register-referral (referrer principal))
  (begin
    (asserts! (is-none (map-get? referrals tx-sender)) (err u400))
    (map-set referrals tx-sender referrer)
    (map-set referral-count referrer 
      (+ (default-to u0 (map-get? referral-count referrer)) u1))
    (ok true)))
