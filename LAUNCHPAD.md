# Billably Launchpad

Marketing and waitlist site for Billably — AI-powered legal operations for founders.

Live: TBD (currently localhost only)

---

## What it does

Single-page marketing site with three rotating feature previews and a waitlist signup form.

**Feature carousel** (auto-rotates every 4 seconds):
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
| Email | Resend — confirmation email on new signup (see TODOs) |

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

## TODOs

- [ ] **Fix Resend** — confirmation email is implemented (`api/index.js`) but not delivering. Likely cause: `onboarding@resend.dev` sender only delivers to the Resend account owner's email. Fix: verify `billably.io` in Resend (Settings → Domains), then set `FROM_EMAIL=Billably <hello@billably.io>` in the Cloud Run env and redeploy the API.
- [ ] **Deploy to billably.io** — host the static build on Netlify (or equivalent). Connect GitHub repo, set `VITE_WAITLIST_API_URL` as a build env var, add `billably.io` as the custom domain, update DNS at registrar.
- [ ] **Redirect billably.ai → billably.io** — either add `billably.ai` as a domain alias in Netlify with a 301 redirect, or configure a URL redirect at the billably.ai registrar directly.
