const express = require('express')
const { Pool } = require('pg')

const app = express()
app.use(express.json())

// CORS — allow the launchpad origin (set ALLOWED_ORIGIN in Cloud Run env)
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '*'
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN)
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.sendStatus(204)
  next()
})

// DB — same pattern as billably-web: TCP locally, Unix socket on Cloud Run
const dbHost = process.env.DB_HOST || '127.0.0.1'
const isUnixSocket = dbHost.startsWith('/')

const pool = new Pool({
  host: dbHost,
  ...(isUnixSocket ? {} : { port: parseInt(process.env.DB_PORT || '5432') }),
  database: process.env.DB_NAME || 'billably',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
})

const RESEND_API_KEY = process.env.RESEND_API_KEY || ''
const FROM_EMAIL = process.env.FROM_EMAIL || 'Billably <onboarding@resend.dev>'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

app.post('/waitlist', async (req, res) => {
  const { name, email, company, website, stage } = req.body ?? {}

  if (!name?.trim() || !email?.trim() || !company?.trim() || !stage) {
    return res.status(400).json({ error: 'Missing required fields' })
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' })
  }

  const cleanEmail = email.trim().toLowerCase()
  const cleanName = name.trim()

  const client = await pool.connect()
  try {
    const result = await client.query(
      `INSERT INTO identity.waitlist_signups (name, email, company, website, stage)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (email) DO NOTHING
       RETURNING signup_id`,
      [cleanName, cleanEmail, company.trim(), website?.trim() || null, stage]
    )

    // Only send confirmation email for new signups
    if (result.rowCount > 0 && RESEND_API_KEY) {
      try {
        const emailRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: FROM_EMAIL,
            to: cleanEmail,
            subject: "You're on the Billably waitlist",
            html: `
              <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 24px; color: #1a1a2e;">
                <p style="font-size: 22px; font-weight: 700; margin: 0 0 8px;">billably</p>
                <p style="font-size: 16px; font-weight: 600; margin: 0 0 20px; color: #1a1a2e;">You're on the list, ${cleanName}.</p>
                <p style="font-size: 15px; color: #555; line-height: 1.6; margin: 0 0 20px;">
                  Thanks for signing up for early access to Billably — AI-powered legal operations for founders.
                  We'll reach out as we open up spots.
                </p>
                <p style="font-size: 15px; color: #555; line-height: 1.6; margin: 0;">
                  — The Billably team
                </p>
              </div>
            `,
          }),
        })
        if (!emailRes.ok) {
          const body = await emailRes.text()
          console.error('Resend error:', emailRes.status, body)
        } else {
          console.log('Confirmation email sent to', cleanEmail)
        }
      } catch (err) {
        console.error('Resend fetch error:', err)
      }
    }

    return res.json({ ok: true })
  } catch (err) {
    console.error('Waitlist insert error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  } finally {
    client.release()
  }
})

app.get('/health', (_req, res) => res.json({ ok: true }))

const PORT = parseInt(process.env.PORT || '8080')
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Waitlist API listening on port ${PORT}`)
})
