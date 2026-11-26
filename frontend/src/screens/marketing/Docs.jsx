import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MarketingLayout, { Container } from './MarketingLayout.jsx'
import { useDocumentTitle } from '../../data/useDocumentTitle.js'
import { useHosted } from '../../data/serverMode.js'

const SECTIONS = [
  { id: 'quick-start', label: 'Quick start' },
  { id: 'your-sheet', label: 'Connect your Google Sheet' },
  { id: 'sign-in', label: 'Adding Google Sign-In' },
  { id: 'family-sharing', label: 'Sharing with family' },
  { id: 'ai', label: 'AI features' },
  { id: 'metal-rates', label: 'Gold & silver rates' },
  { id: 'deploying', label: 'Deploying' },
]

function CodeBlock({ label, children }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(children)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <figure className="doc-code">
      <figcaption className="doc-code-bar">
        <span>{label}</span>
        <button type="button" className="doc-copy-btn" onClick={copy} aria-label={`Copy ${label}`}>
          {copied ? 'Copied' : 'Copy'}
        </button>
      </figcaption>
      <pre><code>{children}</code></pre>
      <span className="visually-hidden" aria-live="polite">{copied ? `${label} copied to clipboard` : ''}</span>
    </figure>
  )
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="doc-section">
      <h2>{title}</h2>
      {children}
    </section>
  )
}

export default function Docs() {
  useDocumentTitle('Documentation — Kosh')
  const hosted = useHosted()
  const [activeId, setActiveId] = useState(SECTIONS[0].id)
  const [mobileTocOpen, setMobileTocOpen] = useState(false)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const obs = new IntersectionObserver(
      entries => {
        const hit = entries.find(e => e.isIntersecting)
        if (hit) setActiveId(hit.target.id)
      },
      { rootMargin: '-18% 0px -65% 0px' },
    )
    SECTIONS.forEach(s => {
      const el = document.getElementById(s.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <MarketingLayout>
      <section className="page-head" style={{ paddingBottom: 16 }}>
        <Container>
          <span className="mkt-label">Documentation</span>
          <h1 className="mkt-h1" style={{ marginTop: 10 }}>Self-hosting Kosh</h1>
          <p className="mkt-lead" style={{ marginTop: 14 }}>
            Runs on infrastructure you control — your own Google account, spreadsheet, and server. The{' '}
            <a
              href="https://github.com/serdire/kosh/blob/master/docs/SELF_HOSTING.md"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: 3 }}
            >
              full reference guide
            </a>{' '}
            on GitHub documents every tab schema and environment variable.
          </p>
          {hosted && (
            <p style={{ fontSize: '0.9rem', color: 'var(--ink-2)', marginTop: 12 }}>
              Prefer managed hosting? <Link to="/pricing" style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: 3 }}>Hosted Kosh</Link> runs the same app while keeping your ledger in your Drive.
            </p>
          )}
        </Container>
      </section>

      <Container>
        <div className="docs-layout">
          <aside className="docs-sidebar">
            <div className="docs-sidebar-title">On this page</div>
            <nav aria-label="Documentation sections">
              <ul className="docs-toc">
                {SECTIONS.map(s => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className={activeId === s.id ? 'is-active' : undefined}>
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div>
            <div className="docs-mobile-toc">
              <button
                type="button"
                className="mkt-btn"
                aria-expanded={mobileTocOpen}
                aria-controls="docs-mobile-list"
                onClick={() => setMobileTocOpen(o => !o)}
                style={{ width: '100%', justifyContent: 'space-between' }}
              >
                <span>Jump to section</span>
                <span>{mobileTocOpen ? 'Hide' : 'Show'}</span>
              </button>
              {mobileTocOpen && (
                <ul id="docs-mobile-list" className="docs-toc" style={{ marginTop: 8, padding: 10, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--r)' }}>
                  {SECTIONS.map(s => (
                    <li key={s.id}>
                      <a href={`#${s.id}`} onClick={() => setMobileTocOpen(false)}>{s.label}</a>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="docs-article">
              <Section id="quick-start" title="Quick start">
                <p>
                  Local dev mode needs nothing beyond the repository itself — it serves sample data and skips auth so you can evaluate the full UI in under a minute.
                </p>
                <CodeBlock label="terminal">{`git clone https://github.com/serdire/kosh.git
cd kosh
make install   # first time only — Go + npm dependencies
make dev       # Go API on :8080, Vite on :5173`}</CodeBlock>
                <p>
                  Open <strong>localhost:5173</strong>. Mutations in dev mode are no-ops and never modify a real spreadsheet.
                </p>
              </Section>

              <Section id="your-sheet" title="Connect your Google Sheet">
                <p>This step turns Kosh from a demo into your live family ledger.</p>
                <ol style={{ paddingLeft: 20, margin: '12px 0 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <li>Create a spreadsheet in Google Sheets — Kosh creates the required tabs and headers automatically on first run against an empty sheet.</li>
                  <li>In <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer">Google Cloud Console</a>, enable the Sheets API and create a service account with Editor access. Save its JSON key as <code>backend/credentials.json</code>.</li>
                  <li>Share your spreadsheet with the service account email address.</li>
                  <li>Set <code>SPREADSHEET_ID</code> in <code>backend/.env</code> (the ID in the sheet URL) and run <code>make dev</code> again. A <code>Connected to Google Sheets</code> log confirms the connection.</li>
                </ol>
              </Section>

              <Section id="sign-in" title="Adding Google Sign-In">
                <p>
                  For any internet-facing deployment, restrict access to invited Google accounts for yourself and your household:
                </p>
                <CodeBlock label="backend/.env">{`GOOGLE_CLIENT_ID=xxxxxxxxxx.apps.googleusercontent.com
SESSION_SECRET=$(openssl rand -base64 32)
ALLOWED_EMAILS=you@gmail.com,partner@gmail.com`}</CodeBlock>
                <p>
                  Leave these unset when running locally on a trusted machine. Whenever sign-in is active, the login page can also expose a read-only demo mode.
                </p>
              </Section>

              <Section id="family-sharing" title="Sharing with family">
                <p>
                  Give parents or a spouse a read-only family report unlocked via a 6-digit authenticator code instead of a Google account or SMS OTP:
                </p>
                <CodeBlock label="backend/.env">{'SHARE_ENCRYPTION_KEY=$(openssl rand -hex 32)'}</CodeBlock>
                <p>
                  A share icon appears in the top bar. Add a member, scan the one-time QR code into their authenticator app in person, and send their private link. Access expires every 24 hours and can be revoked anytime.
                </p>
              </Section>

              <Section id="ai" title="AI features">
                <p>
                  Optional document parsing and tax recommendations are powered by <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer">Anthropic's Claude API</a> and read only your own figures:
                </p>
                <CodeBlock label="backend/.env">{'ANTHROPIC_API_KEY=sk-ant-...'}</CodeBlock>
                <p>Without this key, both features stay hidden and the rest of Kosh works normally.</p>
              </Section>

              <Section id="metal-rates" title="Gold & silver rates">
                <p>
                  Gold and silver holdings automatically value against the latest <a href="https://ibjarates.com" target="_blank" rel="noopener noreferrer">IBJA</a> 999 purity rate per gram (excluding GST and making charges), refreshed hourly. Only the public rate table is fetched. To use manual <code>today_price</code> values instead:
                </p>
                <CodeBlock label="backend/.env">{'LIVE_METAL_RATES=false'}</CodeBlock>
              </Section>

              <Section id="deploying" title="Deploying">
                <p>
                  Kosh builds into a single Docker image containing both the Go API binary and static frontend assets, ready for Cloud Run, Fly.io, Render, or any VPS:
                </p>
                <CodeBlock label="shell">{`docker build -t kosh .
docker run -p 8080:8080 \\
  -e SPREADSHEET_ID=your_spreadsheet_id \\
  -e GOOGLE_CREDENTIALS_B64=$(base64 -i backend/credentials.json) \\
  kosh`}</CodeBlock>
              </Section>
            </div>
          </div>
        </div>
      </Container>
    </MarketingLayout>
  )
}
