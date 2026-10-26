# KTI Corporate Website — Production Deployment Package

**Project:** Korean Techno Inspection Middle East Co. LLC (KTI)  
**Public website:** `https://kti.ae`  
**Separate Odoo 19 access:** `https://starlink.kti.ae`  
**Stack:** Responsive semantic HTML, CSS, plain JavaScript, production Nginx Docker container.  
**Build dependencies:** None. Node.js is not required by this project.

This repository is a fully authored corporate website. It is not an Odoo addon, and publishing this site does not modify or deploy the KTI ERP. There is no customer information, database or login logic inside the public website.

## What is included

- Full-screen oil-and-gas-themed responsive homepage with animated refinery artwork.
- KTI logo and Arabic company identity.
- About KTI, TPI/NDT services, vendor surveillance, QA/QC audits, field expediting, industries, workflow, Managing Director Ahmad Raad, contact details and RFQ enquiry composer.
- **Real clickable login buttons** (links to Odoo host) for internal office employees, external clients and external inspectors.
- Uploaded ADNOC, Emirates, ISO/SGS and Made in the Emirates marks stored safely under `pending-credentials/` (excluded from the Docker image); **not displayed by default pending approval**.
- SEO metadata, accessible navigation, mobile menu, robots/sitemap, privacy and terms starter pages.
- Dockerfile, Nginx config, GitHub Actions smoke check and offline tests.

## Quick preview

Open a terminal at the repository root:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser. For Windows, `py -m http.server 8000` also works. Do **not** double-click `index.html` directly, because production URLs use `/assets/` absolute paths.

Run the source checks:

```bash
python3 tests/smoke.py
```

## Push to GitHub

Create an **independent** repository, for example `kti-corporate-website`, under the appropriate BetaEdge/KTI GitHub organization or account. Do **not** add the website to the existing `kti-odoo19` addon repository.

Inside the extracted website directory:

```bash
git init
git add .
git commit -m "Initial KTI corporate website"
git branch -M main
git remote add origin https://github.com/YOUR_ORG/kti-corporate-website.git
git push -u origin main
```

Replace `YOUR_ORG` with your actual GitHub account or organization. For a repository that already exists, use its existing remote instead of adding a second one. A **private repo** is recommended until KTI approves content and branding.

## EasyPanel: GitHub → Dockerfile deployment

1. Open EasyPanel on the server hosting your public websites.
2. Create a new project or use an appropriate dedicated KTI public website project, then add an **App** service named `kti-website`.
3. Select GitHub repository source and authorize the repository connection. Set branch `main`.
4. Set **Build method = Dockerfile**, Dockerfile path `./Dockerfile`, Docker build context `.`.
5. Set **container HTTP port = 80**. You do not need Node.js, `npm install`, or an npm start command.
6. Deploy the service. Check that `/healthz` returns `ok` and that the container is healthy.
7. In service Domains, attach `kti.ae` and `www.kti.ae`. EasyPanel/Traefik will terminate HTTPS and provide the certificate as configured in your EasyPanel installation.
8. Point the relevant DNS **A** records at your actual EasyPanel public server IPv4. If `www` is a CNAME, point it to `kti.ae`, following your authoritative DNS provider's rules. Preserve all unrelated DNS records.
9. Verify `https://kti.ae`, `https://www.kti.ae`, all image assets, form mailto behavior and all links from desktop and mobile networks.
10. Enable GitHub automatic redeployment only after branch protection and change approval are set.

**DNS WARNING:** Existing `kti.ae` DNS records may point at the current website provider (previously listed as `5.195.192.104`). Do not assume that address is your EasyPanel IP and do not change the live A/CNAME records before the new app and certificate are verified. **Never remove Microsoft 365 MX, SPF, autodiscover, DKIM or DMARC records while moving the website.**

## Starlink Odoo 19 login integration

The site uses `config.js`:

```js
portalBase: 'https://starlink.kti.ae'
```

- Employees: `https://starlink.kti.ae/web/login?redirect=%2Fweb`
- Clients: `https://starlink.kti.ae/web/login?redirect=%2Fmy`
- Inspectors: `https://starlink.kti.ae/web/login?redirect=%2Fmy`

**Why clients and inspectors use the same initial login page:** Their secure landing experiences are determined by their Odoo portal account, actual groups and portal controller routes. Distinct deep links should be switched on only once verified in the KTI ERP. This website does not create logins, grant access or provide authentication.

Before launch:

1. Configure `starlink.kti.ae` as a custom domain on your actual Odoo 19 environment (Odoo.sh, dedicated Odoo host or reverse proxy as appropriate).
2. Verify DNS resolves to the correct Odoo destination. Do **not** point Starlink to the EasyPanel static website service.
3. Verify HTTPS and direct access to `/web/login`.
4. Test an office employee internal account, a client portal-only account and an inspector portal-only account.
5. Confirm portal users never receive internal Odoo user groups and cannot access `/web` backend screens or other companies' data.
6. Test login/logout, invitation/password reset and landing navigation.
7. Only after implementing custom role landing pages, update `script.js` route definitions with verified paths.

## Contact form behavior and future Odoo lead capture

The contact form has **no server-side receiver yet**. It validates form fields and opens the visitor's configured email app with a composed message addressed to `info@kti.ae`. It intentionally does not claim an enquiry has been received until the visitor actually sends the email. This can be used immediately without SMTP secrets.

For direct backend delivery in a future iteration, implement a secure Odoo controller or separate server-side lead intake endpoint with CSRF protection, abuse controls/rate limits, validation and mail/CRM queue tracking. Never expose Odoo API keys or SMTP passwords in `config.js` or public client code.

## Logo permissions — very important

The `pending-credentials/` folder includes KTI-supplied third-party marks and is excluded from the public Docker image. `config.js` has `publishCredentialLogos: false`; keep it false until KTI confirms all active certifications/ICV approvals, certificate expiry dates, ownership, trademark usage rights and approved website wording. The historic inspection accreditation scope we located showed an expiry date of December 2023; a current renewal needs independent confirmation. Consult `CREDENTIAL-APPROVAL.md`.

## Editing text and design

- `index.html`: site content and sections.
- `styles.css`: palette, layout, breakpoints, typography, animations.
- `script.js`: mobile menu, scrolling, portals, enquiry behavior, credential display.
- `config.js`: public website settings, Odoo host and credential visibility.
- `assets/brand/`: KTI identity/preview.
- `assets/visuals/`: original vector industrial artwork (not stock images).
- `privacy.html` and `terms.html`: **drafts for KTI legal approval**, not finalized policy documents.

### Regarding the requested Motion / UI UX Pro Max CLIs

The user-suggested `npm install motion && npx motion-ai` and `npm install -g ui-ux-pro-max-cli` are **not required** to build or deploy this zero-build website. The current version uses lightweight native browser CSS animations and IntersectionObserver. Optional third-party animation/design tools can be evaluated in a separate development branch; do not run unreviewed global npm CLIs on the production server.

## Go-live acceptance criteria

Refer to `DEPLOYMENT-CHECKLIST.md` for the detailed release gates and any remaining manual KTI approvals.
