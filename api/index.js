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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

app.post('/waitlist', async (req, res) => {
  const { name, email, company, website, stage } = req.body ?? {}

  if (!name?.trim() || !email?.trim() || !company?.trim() || !stage) {
    return res.status(400).json({ error: 'Missing required fields' })
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' })
  }

  const client = await pool.connect()
  try {
    await client.query(
      `INSERT INTO identity.waitlist_signups (name, email, company, website, stage)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (email) DO NOTHING`,
      [name.trim(), email.trim().toLowerCase(), company.trim(), website?.trim() || null, stage]
    )
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
