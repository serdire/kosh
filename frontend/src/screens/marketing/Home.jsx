import { useState } from 'react'
import { Link } from 'react-router-dom'
import MarketingLayout, { Container } from './MarketingLayout.jsx'
import { useDocumentTitle } from '../../data/useDocumentTitle.js'
import { useHosted } from '../../data/serverMode.js'

const BASE = import.meta.env.BASE_URL

const VIEWS = [
  {
    id: 'net-worth',
    label: 'Net worth',
    tag: 'Overview',
    img: `${BASE}screenshots/dashboard.webp`,
    alt: 'Kosh dashboard showing total household net worth, 12-month history trend, asset allocation bar, and per-member breakdown',
    caption: 'Assets minus liabilities across every family member, tracked against a 12-month trajectory.',
  },
  {
    id: 'holdings',
    label: 'Holdings',
    tag: '6 asset classes',
    img: `${BASE}screenshots/investments.webp`,
    alt: 'Kosh investments screen showing mutual funds, stocks, fixed deposits, NPS, insurance, and gold holdings',
    caption: 'Mutual funds, stocks, gold, silver, FD/RD, and NPS with live gain calculations in one ledger.',
  },
  {
    id: 'tax',
    label: 'Tax planner',
    tag: 'FY comparison',
    img: `${BASE}screenshots/tax.webp`,
    alt: 'Kosh tax planning view comparing old and new regimes, advance tax dates, and recommendations',
    caption: 'Old vs. new regime math, advance tax schedules, and editable Budget tax slabs.',
  },
  {
    id: 'export',
    label: 'CA report',
    tag: 'PDF + Excel',
    img: `${BASE}screenshots/export.webp`,
    alt: 'Kosh export dialog with checkboxes for report sections and PDF or Excel output',
    caption: 'Select specific sections to hand your accountant a structured PDF or Excel workbook.',
  },
  {
    id: 'share',
    label: 'Family share',
    tag: 'Phone TOTP',
    img: `${BASE}screenshots/sharing.webp`,
    alt: 'Kosh family sharing modal listing members with private links and authenticator unlock controls',
    caption: 'Read-only links for parents or a spouse unlocked with an authenticator app — zero passwords.',
  },
]

const PILLARS = [
  {
    idx: '01',
    title: 'Your Google Sheet is the source of truth',
    body: 'Kosh reads and writes tabs directly inside a Google Sheet in your own Drive. Open it anytime, inspect formulas, export it, or leave with your data intact.',
  },
  {
    idx: '02',
    title: 'Live IBJA bullion valuation built in',
    body: 'Gold and silver holdings automatically reprice against the latest IBJA 999 purity benchmark rate every hour — no manual spreadsheet lookups.',
  },
  {
    idx: '03',
    title: 'Budget-proof tax planning per family member',
    body: 'Compare old vs. new regimes per person, inspect income slab splits across parents, and update tax slabs directly as data when Union Budgets change.',
  },
  {
    idx: '04',
    title: 'Optional AI without handing over your ledger',
    body: 'Drop in an FD certificate or policy PDF to pre-fill fields, or generate tax notes grounded in your actual holdings — completely disabled unless you opt in.',
  },
]

const ROLES = [
  {
    id: 'owner',
    title: 'Household owner',
    summary: 'Consolidate accounts across banks, brokers, and bullion into one sheet you control.',
    headline: 'One calm ledger instead of twelve logins.',
    points: [
      'Filter instantly between whole-family totals and any individual member.',
      'Track upcoming SIP debits, insurance renewals, and loan EMIs 30 days ahead.',
      'Upload statement PDFs to extract holding details and review every row before saving.',
    ],
  },
  {
    id: 'parents',
    title: 'Parents & spouse',
    summary: 'Give relatives read-only clarity without managing Google accounts or passwords.',
    headline: 'Readable on any phone, unlocked with a 6-digit code.',
    points: [
      'Each family member gets a private link bound to their own authenticator app QR.',
      'No SMS OTP provider sits between your server and your household numbers.',
      'Revoke or reset any shared link in one click and see when it was last opened.',
    ],
  },
  {
    id: 'ca',
    title: 'Your accountant',
    summary: 'Skip messy screen-shares and send clean schedules ready for filing season.',
    headline: 'Structured PDF and Excel exports on demand.',
    points: [
      'Pick exact sections to include: investments, income, loans, insurance, or net worth.',
      'Separate member views expose 80C, 80CCD(1B), and interest maturity schedules cleanly.',
      'Matches the underlying Google Sheet tabs line for line so numbers reconcile fast.',
    ],
  },
]

const SHEET_TABS = ['Mutual_Funds', 'Stocks', 'Fixed_Deposits', 'Gold_Silver', 'NPS', 'Insurance', 'Loans', 'Income']

export default function Home() {
  useDocumentTitle('Kosh — Family Wealth')
  const hosted = useHosted()
  const [activeView, setActiveView] = useState(0)
  const [activeRole, setActiveRole] = useState(0)

  const currentView = VIEWS[activeView]
  const currentRole = ROLES[activeRole]

  const onTabKeyDown = (e, count, index, setter) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      setter((index + 1) % count)
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      setter((index - 1 + count) % count)
    }
  }

  return (
    <MarketingLayout>
      {/* Hero + Interactive Product Workbench */}
      <section className="hero-band">
        <Container>
          <div className="hero-shell">
            <div className="hero-copy">
              <span className="mkt-label">Family wealth ledger</span>
              <h1 className="mkt-h1">Your household's wealth, kept in a Google Sheet you own.</h1>
              <p className="mkt-lead">
                Mutual funds, stocks, gold, fixed deposits, insurance, and tax planning in one composed workspace — without storing your net worth on someone else's database.
              </p>

              <div className="hero-actions">
                <Link to="/app" className="mkt-btn mkt-btn--primary">
                  Open live demo
                </Link>
                <Link to="/features" className="mkt-btn">
                  Explore capabilities
                </Link>
              </div>

              <div className="hero-facts">
                <div>
                  <div className="hero-fact-k">Storage</div>
                  <div className="hero-fact-v">Your Google Sheet</div>
                </div>
                <div>
                  <div className="hero-fact-k">Bullion pricing</div>
                  <div className="hero-fact-v">IBJA 999 hourly</div>
                </div>
                <div>
                  <div className="hero-fact-k">Source code</div>
                  <div className="hero-fact-v">AGPL-3.0 open</div>
                </div>
              </div>
            </div>

            <div className="workbench">
              <div className="workbench-bar">
                <div className="workbench-tabs" role="tablist" aria-label="Product views">
                  {VIEWS.map((v, i) => (
                    <button
                      key={v.id}
                      id={`wb-tab-${v.id}`}
                      role="tab"
                      type="button"
                      className="workbench-tab"
                      aria-selected={activeView === i}
                      aria-controls="wb-panel"
                      onClick={() => setActiveView(i)}
                      onKeyDown={e => onTabKeyDown(e, VIEWS.length, i, setActiveView)}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>

              <div id="wb-panel" role="tabpanel" aria-labelledby={`wb-tab-${currentView.id}`}>
                <div className="workbench-frame">
                  <img
                    src={currentView.img}
                    alt={currentView.alt}
                    width="2800"
                    height="1800"
                    loading="eager"
                  />
                </div>
                <div className="workbench-foot">
                  <p className="workbench-cap">{currentView.caption}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
                    <span className="workbench-tag">{currentView.tag}</span>
                    <Link to="/features" style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent)', whiteSpace: 'nowrap' }}>
                      All screens
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Architecture & Ownership Thesis */}
      <section className="mkt-section">
        <Container>
          <div className="split-thesis">
            <div className="sticky-aside">
              <span className="mkt-label">Architecture</span>
              <h2 className="mkt-h2">Built around ownership, not lock-in.</h2>
              <p className="mkt-lead">
                Most wealth trackers trade convenience for custody of your data. Kosh works directly against standard tabs in your Google Sheet so your records remain portable forever.
              </p>

              <div className="sheet-map">
                <div className="sheet-map-title">Tabs created in your spreadsheet</div>
                <div className="sheet-tabs">
                  {SHEET_TABS.map(tab => (
                    <span key={tab} className="sheet-tab-chip">{tab}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="ledger-list">
              {PILLARS.map(item => (
                <div key={item.idx} className="ledger-item">
                  <div className="ledger-idx">{item.idx}</div>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Household Role Workflow */}
      <section className="mkt-section mkt-section--surface">
        <Container>
          <span className="mkt-label">Household workflows</span>
          <h2 className="mkt-h2" style={{ marginTop: 8 }}>Designed for everyone who relies on the numbers.</h2>

          <div className="role-grid">
            <div className="role-buttons" role="tablist" aria-label="Household roles">
              {ROLES.map((role, i) => (
                <button
                  key={role.id}
                  id={`role-tab-${role.id}`}
                  role="tab"
                  type="button"
                  className="role-btn"
                  aria-selected={activeRole === i}
                  aria-controls="role-panel"
                  onClick={() => setActiveRole(i)}
                  onKeyDown={e => onTabKeyDown(e, ROLES.length, i, setActiveRole)}
                >
                  <span className="role-btn-title">{role.title}</span>
                  <span className="role-btn-sub">{role.summary}</span>
                </button>
              ))}
            </div>

            <div id="role-panel" role="tabpanel" aria-labelledby={`role-tab-${currentRole.id}`} className="role-panel">
              <h3 className="mkt-h2" style={{ fontSize: 'clamp(1.25rem, 1.05rem + 0.9vw, 1.75rem)' }}>
                {currentRole.headline}
              </h3>
              <ul className="role-panel-points">
                {currentRole.points.map(pt => (
                  <li key={pt}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ marginTop: 3, flexShrink: 0 }}>
                      <path d="M5 12l4.5 4.5L19 7" />
                    </svg>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Closing CTA Band */}
      <section className="mkt-section">
        <Container>
          <div className="cta-band">
            <div>
              <h2 className="mkt-h2">Inspect the demo in seconds, or run your own instance.</h2>
              <p>
                {hosted
                  ? 'Try the pre-loaded family ledger immediately, start a 14-day hosted trial, or self-host on your own Google Cloud project for free.'
                  : 'Explore the full read-only sample ledger right in your browser, or self-host Kosh against your own Google Sheet in minutes.'}
              </p>
            </div>
            <div className="cta-band-actions">
              <Link to="/app" className="mkt-btn mkt-btn--inverted">
                Try the live demo
              </Link>
              <Link to={hosted ? '/pricing' : '/docs'} className="mkt-btn mkt-btn--ghost-light">
                {hosted ? 'Compare hosted vs self-hosted' : 'Read self-host guide'}
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </MarketingLayout>
  )
}
