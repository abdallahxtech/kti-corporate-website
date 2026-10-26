# Approval Gate — Partner and Certification Logos

## Why the website hides all third-party program marks by default

A supplied image alone does not prove a current agreement, endorsement, certification, brand permission or compliance status. Certification and national program marks have rules governing where and how they may be displayed.

**Pending KTI approval:**

| Supplied graphic | Evidence required before activating |
| --- | --- |
| ADNOC In-Country Value Certified | Current ICV certificate number, issuer, certificate dates, program/logo usage permission and exact approved wording. |
| SGS ISO 9001 | Current company certificate, scope, issuing body, expiry, and SGS trademark/mark usage authorization. |
| SGS ISO 14001 | Same: currently valid certificate, scope and logo permission. |
| SGS ISO 45001 | Same: currently valid certificate, scope and logo permission. |
| Made in the Emirates | Evidence of KTI program membership/eligibility and written rules permitting that mark for the services/company. |
| Emirates graphic | Identity and permitted use of supplied graphic; avoid presenting it as an official endorsement. |

An old public accreditation scope has a stated expiry date of **05 December 2023** (ENAS NAI 078). A current directory entry may still say Active, but that is not enough to prove current expiry/re-issuance. Validate with MOIAT/ENAS and KTI's actual certificate before using accreditation claims.

## Release control

1. Obtain written approval from KTI management and the relevant brand/certification owner, as applicable.
2. Keep the proof and expiry date in KTI's controlled document register.
3. Remove obsolete or unapproved images from the `approvedCredentials` list in `config.js`.
4. Copy approved images to `assets/credentials/`; leave all other supplied marks in `pending-credentials/`. Then set `publishCredentialLogos: true` only when **every displayed entry** has been reviewed.
5. Display accurate captions and trademark statements, without describing all marks as KTI 'partners' unless an actual partnership exists.
6. Establish a renewal/expiry check and promptly unpublish any logo upon lapse.
