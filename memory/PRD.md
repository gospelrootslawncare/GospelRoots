# Gospel Roots Lawn Care — PRD

## Original Problem Statement
Modern, professional, responsive website for Gospel Roots Lawn Care. Tagline: "Serving with Faith. Committed to Quality." Owners: Lucas & Matthew. Premium landscaping aesthetic with subtle Christian themes (cross + roots logo). Forest green / dark green / white / black / earthy brown palette.

## Architecture
- **Frontend**: React 19 + CRA + craco, Tailwind, shadcn/ui, lucide-react, sonner, framer-motion available.
- **Backend**: FastAPI + Motor (MongoDB) at /api prefix.
- **DB**: MongoDB collections: `quote_requests`, `status_checks`.

## Pages / Sections (single-page anchored)
- Sticky Navbar with mobile menu
- Hero (background lawn image, dual CTAs)
- About (Lucas & Matthew)
- Services (8 service cards incl. Pressure Washing — Coming Soon)
- Why Choose Us (6 items w/ icons)
- Gallery (interactive Before/After slider)
- Testimonials (4 cards)
- FAQ (shadcn Accordion)
- Contact (form -> POST /api/quotes, clickable phone/email/socials)
- Footer (sitemap, social, scripture)

## Backend Endpoints
- `GET  /api/` health
- `POST /api/quotes` create quote request
- `GET  /api/quotes` list quote requests (admin)
- `GET/POST /api/status` status check

## Implemented (2026-06-22)
- Full marketing site with custom branding, scroll-reveal animations, mobile responsive.
- Before/After comparison slider component.
- Quote request DB persistence.
- SEO meta tags, scripture footer line, custom favicon-ready logo.
- Compatibility shim in craco.config.js for webpack-dev-server v5.

## Backlog (P1/P2)
- P1: Email notifications on quote submission (Resend/SendGrid integration)
- P1: Simple admin page to view incoming quote requests
- P2: Replace gallery placeholders with real customer photos
- P2: Service area map / coverage check
- P2: Google reviews integration
- P2: Booking/scheduling integration


## Iteration 2 (2026-06-22)
- Replaced contact placeholders with real info: (903) 424-5931, gospelrootslawncare@gmail.com, Gilmer, TX. Removed social media icons.
- Admin auth (Bearer JWT in localStorage, bcrypt hashed password, brute-force lockout, 12h access token).
- Admin inbox page at /admin (auth-protected) and /admin/login. Lists/views/deletes quote requests.
- Resend email notification on every new quote (non-blocking via asyncio.to_thread). Sender: onboarding@resend.dev (Resend test sender). Recipient: gospelrootslawncare@gmail.com.
- Testing agent iteration_2: 13/13 backend, 21/21 frontend — all green.

## Iteration 4 (2026-06-22)
- **Service simplified to ONE flat-rate offering**: "All-in-One Yard Care" at $30/visit (mowing + edging + weed eating). Old per-service cards removed.
- **Twilio SMS** notification on every new quote (to (903) 424-5931). From: +18559160233.
- **Resend customer auto-reply** email on every new quote. Will only deliver successfully once a domain is verified at resend.com/domains and SENDER_EMAIL is updated. Failures are non-blocking.
- **Smart contact form**: preferred_date, preferred_window, referral_source fields persisted.
- **/plans page** with single-plan card + weekly/bi-weekly/one-time frequency cards.
- **/referrals page** with referral form (free mow incentive).
- **Meet the Team** section (Lucas & Matthew bios, no photos).
- **Equipment** section showcasing tools.
- **Google Reviews placeholder** (REACT_APP_GOOGLE_PLACE_ID switches it on later).
- **LocalBusiness JSON-LD schema** in index.html for SEO.
- **Admin inbox extended**: notes (autosaved on blur) + follow-up date (autosaved on change). Customer-supplied preferred date/window/referral source surfaced in detail panel.
- Testing iter_4: 17/17 backend + 37/37 frontend — all green.

## Pending Production Tasks
- Verify a domain at resend.com/domains and set SENDER_EMAIL to a branded address (currently onboarding@resend.dev). Without this, customer auto-replies fail in Resend test mode.
- Create Google Business Profile, set REACT_APP_GOOGLE_PLACE_ID in /app/frontend/.env to enable real reviews widget.
