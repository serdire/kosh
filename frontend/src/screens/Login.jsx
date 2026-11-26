import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import '../screens/marketing/marketing.css'

export default function Login({ clientId, demoAvailable, onDemo, onLogin, hosted, devLogin }) {
  const btnRef = useRef(null)
  const [error, setError] = useState(null)
  const [busy, setBusy] = useState(false)
  const [demoBusy, setDemoBusy] = useState(false)
  const [devEmail, setDevEmail] = useState('')

  // hosteddev builds only: sign in with any email, no Google.
  const handleDevLogin = async e => {
    e.preventDefault()
    setBusy(true)
    setError(null)
    try {
      const res = await fetch('/api/dev/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: devEmail }),
      })
      if (res.ok) onLogin(await res.json())
      else setError(await res.text())
    } finally {
      setBusy(false)
    }
  }

  const handleDemo = async () => {
    setDemoBusy(true)
    setError(null)
    try {
      await onDemo()
    } catch {
      setError('Could not start the demo. Is the backend running?')
      setDemoBusy(false)
    }
  }

  useEffect(() => {
    if (devLogin) return
    let mounted = true

    const init = () => {
      if (!mounted || !btnRef.current) return
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: async ({ credential }) => {
          if (!mounted) return
          setBusy(true)
          setError(null)
          try {
            const res = await fetch('/api/auth/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ credential }),
            })
            if (res.ok) {
              const user = await res.json()
              onLogin(user)
            } else {
              setError(await res.text())
            }
          } catch {
            setError('Could not reach the server. Is the backend running?')
          } finally {
            setBusy(false)
          }
        },
      })
      window.google.accounts.id.renderButton(btnRef.current, {
        theme: 'outline',
        size: 'large',
        text: 'signin_with',
        shape: 'rectangular',
        logo_alignment: 'left',
      })
    }

    // Google GSI loads async — poll until ready.
    if (window.google?.accounts) {
      init()
    } else {
      const iv = setInterval(() => {
        if (window.google?.accounts) { clearInterval(iv); init() }
      }, 80)
      return () => { mounted = false; clearInterval(iv) }
    }
    return () => { mounted = false }
  }, [clientId, onLogin, devLogin])

  return (
    <div className="auth-page">
      <div className="auth-shell">
        <div className="auth-aside">
          <Link to="/" className="site-brand" style={{ alignSelf: 'flex-start' }}>
            <span className="site-brand-glyph" aria-hidden="true">क</span>
            <span className="site-brand-word">Kosh</span>
          </Link>
          <h1 className="mkt-h2">Your household ledger, stored in your own Google Sheet.</h1>
          <p className="mkt-lead">
            Track mutual funds, stocks, FDs, bullion, insurance, and tax planning without handing your financial history to a third-party database.
          </p>
          <ul className="auth-list">
            <li>Reads and writes directly to a Google Sheet in your Drive</li>
            <li>Live IBJA 999 gold and silver valuation refreshed hourly</li>
            <li>Read-only family links protected by phone authenticator codes</li>
          </ul>
          <div>
            <Link to="/" style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--accent)', textDecoration: 'underline', textUnderlineOffset: 3 }}>
              Back to overview
            </Link>
          </div>
        </div>

        <div className="auth-card">
          <div style={{ marginBottom: 22 }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 6 }}>
              {hosted ? 'Open your household' : 'Sign in to Kosh'}
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--ink-2)', lineHeight: 1.6 }}>
              {hosted
                ? 'Sign in with Google to open your household or start a 14-day free trial without a card.'
                : 'Sign in with your invited Google account to continue.'}
            </p>
          </div>

          {devLogin ? (
            <form onSubmit={handleDevLogin} style={{ display: 'flex', gap: 8 }}>
              <input
                className="input"
                type="email"
                required
                placeholder="any@email (dev build)"
                value={devEmail}
                onChange={e => setDevEmail(e.target.value)}
                aria-label="Dev sign-in email"
              />
              <button className="btn primary" disabled={busy}>Sign in</button>
            </form>
          ) : busy ? (
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--accent)', padding: '10px 0' }}>
              Verifying credentials…
            </div>
          ) : (
            <div ref={btnRef} style={{ display: 'flex', justifyContent: 'flex-start' }} />
          )}

          {error && (
            <div role="alert" style={{
              marginTop: 18, padding: '12px 14px',
              background: 'var(--neg-soft)', color: 'var(--neg)',
              borderRadius: 'var(--r-xs)', fontSize: '0.84rem', lineHeight: 1.5,
            }}>
              {error}
            </div>
          )}

          {demoAvailable && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0' }}>
                <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ink-3)' }}>or explore first</span>
                <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
              </div>
              <button
                type="button"
                onClick={handleDemo}
                disabled={demoBusy}
                className="mkt-btn"
                style={{ width: '100%' }}
              >
                {demoBusy ? 'Loading sample ledger…' : 'Open read-only demo'}
              </button>
              <p style={{ marginTop: 10, fontSize: '0.8rem', color: 'var(--ink-3)', lineHeight: 1.5 }}>
                Uses sample household figures with zero sign-in or setup.
              </p>
            </>
          )}

          <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, fontSize: '0.8rem', color: 'var(--ink-3)' }}>
            <span>Open source under AGPL-3.0</span>
            <a href="https://github.com/serdire/kosh" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', fontWeight: 600 }}>
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
