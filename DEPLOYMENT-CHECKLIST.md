# KTI Corporate Website — Deployment and UAT Checklist

## Before publication

- [ ] KTI reviews all written claims, spelling, Managing Director listing and Arabic/English company name.
- [ ] Confirm address: Office M-36, Plot No. 134, Mussafah Industrial City, P.O. Box 114043, Abu Dhabi, UAE.
- [ ] Confirm main phone: +971 2 557 5560 (some historical paperwork lists a different number).
- [ ] Confirm `info@kti.ae` receives mail from outside KTI.
- [ ] Obtain KTI sign-off on Privacy Notice and Website Terms.
- [ ] Confirm whether approved logos can be shown; default is hidden.
- [ ] Confirm actual KTI ERP production/staging hostname and custom domain mapping for `starlink.kti.ae`.

## Build and visual review

- [x] Local static-source smoke tests pass.
- [x] Desktop and mobile layout rendered in a headless Chromium preview; no page JavaScript errors and no horizontal overflow at 1440px and 390px.
- [x] Mobile menu opens and closes in local preview.
- [ ] Confirm all three Starlink buttons work on the actual Odoo deployment (external destination not confirmed here).
- [ ] Inspect all page sections across Chrome, Edge, Safari and mobile devices.
- [ ] Verify exact company/brand text on the public KTI-approved proof.
- [ ] Check form opens an email client and sends test message to info@kti.ae from real user devices.
- [ ] Confirm privacy/terms final approved content.

## EasyPanel and DNS

- [ ] Deploy from a dedicated GitHub repository with Dockerfile source.
- [ ] App health check `/healthz` returns `ok`.
- [ ] HTTP port 80 configured as target.
- [ ] DNS A/CNAME target matches actual EasyPanel public IP.
- [ ] Both `kti.ae` and `www.kti.ae` have valid HTTPS certificates.
- [ ] HTTPS redirect and canonical URL behavior correct.
- [ ] Existing Microsoft 365 MX/TXT/CNAME/DKIM/DMARC records preserved.
- [ ] Starlink DNS independently maps to the correct Odoo infrastructure.
- [ ] Verify Odoo ERP production access unaffected by public-site deployment.

## Odoo security: mandatory

- [ ] Employee accounts are **KTI office staff only**, with internal roles matched to business need.
- [ ] Inspectors, freelancers, vendors, and clients have **portal-only** accounts.
- [ ] Client A cannot read Client B's RFIs, inspection reports, timesheets or invoices.
- [ ] Inspector A cannot access Inspector B's job assignments or payments.
- [ ] Portal routes reject unauthenticated users and unauthorized groups.
- [ ] Portal password reset, invitations, session expiry and logout tested.
- [ ] No ERP API tokens, credentials or secrets stored in frontend files.

## Operational notes

- [ ] Configure GitHub branch protection and reviewer approval before auto-deploys.
- [ ] Keep previous web server config and DNS rollback values until verified.
- [ ] Document release commit, EasyPanel service name and rollback procedure.
- [ ] Confirm website updates do not deploy or alter the Odoo 19 custom TPI/NDT addons.
