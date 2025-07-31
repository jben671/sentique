(define-constant ERR-UNAUTHORIZED (err u100))
(define-constant ERR-NOT-FOUND (err u101))

(define-data-var admin principal tx-sender)

(define-map verified-authorities
  ((authority principal))
  (
    (verified bool)
    (entity-type (string-ascii 32))
    (grade (string-ascii 10))
    (verified-at uint)
  )
)

;; Admin-only check
(define-private (is-admin (sender principal))
  (is-eq sender (var-get admin))
)

;; Register a new authority
(define-public (register-authority (authority principal) (entity-type (string-ascii 32)) (grade (string-ascii 10)))
  (begin
    (if (not (is-admin tx-sender))
      ERR-UNAUTHORIZED
      (begin
        (map-set verified-authorities
          { authority: authority }
          {
            verified: true,
            entity-type: entity-type,
            grade: grade,
            verified-at: block-height
          }
        )
        (ok true)
      )
    )
  )
)

;; Revoke an authority
(define-public (revoke-authority (authority principal))
  (begin
    (if (not (is-admin tx-sender))
      ERR-UNAUTHORIZED
      (begin
        (map-delete verified-authorities { authority: authority })
        (ok true)
      )
    )
  )
)

;; Transfer admin rights
(define-public (transfer-admin (new-admin principal))
  (begin
    (if (not (is-admin tx-sender))
      ERR-UNAUTHORIZED
      (begin
        (var-set admin new-admin)
        (ok true)
      )
    )
  )
)

;; Check if authority is verified
(define-read-only (is-verified (authority principal))
  (match (map-get? verified-authorities { authority: authority })
    entry (ok (get verified entry))
    none (ok false)
  )
)

;; Get authority type
(define-read-only (get-entity-type (authority principal))
  (match (map-get? verified-authorities { authority: authority })
    entry (ok (get entity-type entry))
    none ERR-NOT-FOUND
  )
)

;; Get authority grade
(define-read-only (get-grade (authority principal))
  (match (map-get? verified-authorities { authority: authority })
    entry (ok (get grade entry))
    none ERR-NOT-FOUND
  )
)

;; Update authority grade
(define-public (update-grade (authority principal) (new-grade (string-ascii 10)))
  (begin
    (if (not (is-admin tx-sender))
      ERR-UNAUTHORIZED
      (match (map-get? verified-authorities { authority: authority })
        entry
          (begin
            (map-set verified-authorities
              { authority: authority }
              {
                verified: (get verified entry),
                entity-type: (get entity-type entry),
                grade: new-grade,
                verified-at: (get verified-at entry)
              }
            )
            (ok true)
          )
        none ERR-NOT-FOUND
      )
    )
  )
)
