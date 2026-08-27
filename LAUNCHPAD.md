# Billably Launchpad

Marketing and waitlist site for Billably — AI-powered legal operations for founders.

Live: https://billably.ai (Cloudflare Workers) | billably.io → redirects to billably.ai

---

## What it does

Single-page marketing site with three rotating feature previews and a waitlist signup form.

**Feature carousel** (auto-rotates every 7 seconds, `embla-carousel-autoplay`):
- **Bill Analysis** — flags inflated time entries, surfaces savings opportunities, generates pushback language
- **Compliance Timeline** — personalized roadmap of upcoming legal deadlines with cost estimates and counsel connections
- **Counsel Marketplace** — vetted firm recommendations matched to company stage and matter type

**Waitlist form** — collects name, email, company, website, and stage (pre-seed / seed / Series A+ / bootstrapped). Submissions are written to `identity.waitlist_signups` in the Cloud SQL `billably` database via the `billably-waitlist-api` Cloud Run service.

---

## Architecture

| Layer | What |
|---|---|
| Frontend | Vite + React + shadcn/ui, static build in `dist/` |
| API | `api/` — minimal Express + pg service, deployed to Cloud Run (`billably-waitlist-api`) |
| Database | `identity.waitlist_signups` in Cloud SQL (`billably-prod`, `us-west1`) |
| Email | Resend — confirmation to signup + internal notification to kalpana@billably.io and jose@billably.io |
| Hosting | Cloudflare Workers (static assets via `wrangler.toml`), custom domain billably.ai; auto-deploys on push to main |

**API service URL**: `https://billably-waitlist-api-179064079261.us-west1.run.app`

The frontend reads `VITE_WAITLIST_API_URL` at build time (set in `.env.local` locally, or as a build env var on the hosting platform).

---

## Local dev

```bash
# Set the API URL
echo "VITE_WAITLIST_API_URL=https://billably-waitlist-api-179064079261.us-west1.run.app" > .env.local

# Run
./run.sh   # or: npm run dev
```

---

## Bot protection

Two layers, no user friction:

- **Honeypot field** (`_trap`) — hidden input in the form. If filled (bots do this), the server silently returns 200 and discards the submission.
- **Rate limiting** — max 3 submissions per IP per minute in the API. Returns 429 if exceeded.

---

## Email

On every new signup the API sends two emails via Resend:

1. **Confirmation** to the person who signed up — from `hello@billably.ai`
2. **Internal notification** to `kalpana@billably.io` and `jose@billably.io` with full signup details

Duplicate signups (same email) are silently ignored — no DB insert, no email.

Relevant env vars on the Cloud Run service:
- `RESEND_API_KEY` — Resend API key
- `FROM_EMAIL` — sender address (default: `Billably <hello@billably.ai>`)

---

## DNS / Hosting

| Domain | Where |
|---|---|
| `billably.ai` | Cloudflare Workers (`billably-launchpad` worker, `wrangler.toml` serves `dist/`) |
| `billably.io` | GoDaddy permanent 301 → https://billably.ai |

**DNS**: Cloudflare is the authoritative nameserver for billably.ai (nameservers changed from GoDaddy to Cloudflare). GoDaddy remains the registrar.

**Deploying**: push to `main` — Cloudflare builds and deploys automatically. No Docker, no manual steps.

```bash
# To deploy manually from the API directory:
gcloud run deploy billably-waitlist-api --source . --region us-west1 \
  --update-env-vars "FROM_EMAIL=Billably <hello@billably.ai>,RESEND_API_KEY=..."
```

`hello@billably.ai` is a Google Workspace User Alias Domain — delivers to the billably.io inbox.

---

## TODOs

- [x] **Verify Resend delivery** — confirmed end-to-end: confirmation sent to signup, internal notification to kalpana + jose.
- [x] **Rebuild + redeploy frontend** — honeypot field live in production bundle.
- [x] **Verify billably.io 301** — confirmed redirect to billably.ai.
