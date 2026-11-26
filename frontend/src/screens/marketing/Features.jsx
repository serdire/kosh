import { Link } from 'react-router-dom'
import MarketingLayout, { Container } from './MarketingLayout.jsx'
import { useDocumentTitle } from '../../data/useDocumentTitle.js'

const BASE = import.meta.env.BASE_URL

const MAJOR = [
  {
    id: 'net-worth',
    kicker: 'Net worth',
    title: 'One number that actually means something',
    body: 'Total assets minus loans, tracked over time, broken down by asset class and by family member. No more adding up a dozen apps in your head before you know where you stand.',
    specs: ['Whole-family & per-member filters', '12-month historical balance chart', 'Assets vs. liabilities breakdown'],
    img: `${BASE}screenshots/dashboard.webp`,
    alt: 'Kosh dashboard with total net worth, a 12-month trend chart, asset allocation, and per-member breakdown',
  },
  {
    id: 'investments',
    kicker: 'Investments',
    title: 'Mutual funds, stocks, gold, FDs, and NPS in one ledger',
    body: 'Every holding in one place with invested vs. current value and gain at a glance — instead of five different apps and a spreadsheet nobody keeps up to date.',
    specs: ['Inline editable holdings rows', 'Hourly IBJA 999 gold & silver rates', 'Maturity tracking for FD / RD'],
    img: `${BASE}screenshots/investments.webp`,
    alt: 'Kosh investments tab showing a mutual fund holdings table with invested, current value, and gain columns',
  },
  {
    id: 'tax-planning',
    kicker: 'Tax planning',
    title: 'A real tax advisor for the year ahead, not just last year\'s numbers',
    body: 'Compare old vs. new regime instantly, see what is maturing this financial year, and review fact-grounded tax-saving ideas against your actual holdings. Tax slabs themselves live as editable data so Budget updates never wait on a release.',
    specs: ['Old vs. new regime comparison', 'Advance tax schedule & slab simulator', 'Budget-updatable slab config'],
    img: `${BASE}screenshots/tax.webp`,
    alt: 'Kosh tax tab showing regime comparison, tax payable, advance tax schedule, and AI tax-saving recommendations',
  },
  {
    id: 'ca-reports',
    kicker: 'For your CA',
    title: 'A proper report, not a screen-share',
    body: 'Pick the sections you want — investments, insurance, loans, income, or a net worth summary — and download a clean PDF or Excel file shaped for handing straight to an accountant.',
    specs: ['Selectable report sections', 'Clean PDF summary export', 'Multi-tab Excel (.xlsx) workbook'],
    img: `${BASE}screenshots/export.webp`,
    alt: 'Kosh export dialog with checkboxes for each report section and a PDF/Excel format toggle',
  },
  {
    id: 'family-sharing',
    kicker: 'Family sharing',
    title: 'Let your parents see where things stand without sharing passwords',
    body: 'Give each family member their own private link to a read-only family report. They unlock it with a 6-digit code from an authenticator app on their phone — no password to remember, no Google account, and no SMS provider seeing your numbers.',
    specs: ['Per-member TOTP authenticator QR', '24-hour unlock window', 'One-click revoke & access log'],
    img: `${BASE}screenshots/sharing.webp`,
    alt: 'Kosh family sharing dialog listing family members with their access status, last-opened time, and revoke/reset controls',
  },
]

const MINOR = [
  {
    title: 'SIPs & bills, on schedule',
    body: 'Every active SIP, EMI, and insurance premium with its next due date in one unified calendar.',
  },
  {
    title: 'Income tracking',
    body: 'Payslip-by-payslip gross, net, and deductions feeding directly into tax calculations.',
  },
  {
    title: 'Built for a family',
    body: 'Track holdings per member or household and see how shifting investments across tax slabs helps.',
  },
  {
    title: 'AI-assisted document upload',
    body: 'Drop in an FD certificate, insurance policy, or NPS statement — review extracted fields before saving.',
  },
  {
    title: 'Your Google Sheet is the database',
    body: 'No third-party server holds your financial data. Self-host it directly on your own account.',
  },
  {
    title: 'Works properly on your phone',
    body: 'The sidebar collapses to a bottom tab bar and modals go full-width on narrow screens.',
  },
]

export default function Features() {
  useDocumentTitle('Features — Kosh')
  return (
    <MarketingLayout>
      <section className="page-head">
        <Container>
          <span className="mkt-label">Capabilities</span>
          <h1 className="mkt-h1" style={{ marginTop: 10, maxInlineSize: '20ch' }}>
            Everything a family's finances actually need.
          </h1>
          <p className="mkt-lead" style={{ marginTop: 16 }}>
            Not a budgeting app bolted onto a bank feed — a calm ledger you fill in and fully own, built around how Indian households track investments and tax.
          </p>

          <nav className="jump-bar" aria-label="Feature sections">
            {MAJOR.map(f => (
              <a key={f.id} href={`#${f.id}`} className="jump-chip">{f.kicker}</a>
            ))}
            <a href="#more" className="jump-chip">More capabilities</a>
          </nav>
        </Container>
      </section>

      <Container>
        <div className="feature-showcase">
          {MAJOR.map(f => (
            <article key={f.id} id={f.id} className="feature-band">
              <div className="feature-band-copy">
                <span className="mkt-label">{f.kicker}</span>
                <h2 className="mkt-h2" style={{ fontSize: 'clamp(1.35rem, 1.1rem + 1vw, 1.85rem)' }}>
                  {f.title}
                </h2>
                <p style={{ fontSize: '0.94rem', color: 'var(--ink-2)', lineHeight: 1.7 }}>{f.body}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '8px 0 0', display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {f.specs.map(spec => (
                    <li key={spec} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.84rem', fontWeight: 600, color: 'var(--ink)' }}>
                      <span style={{ width: 6, height: 6, borderRadius: 99, background: 'var(--accent)', flexShrink: 0 }} aria-hidden="true" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="feature-band-media">
                <img src={f.img} alt={f.alt} width="2800" height="1800" loading="lazy" />
              </div>
            </article>
          ))}
        </div>
      </Container>

      <section id="more" className="mkt-section mkt-section--surface">
        <Container>
          <span className="mkt-label">Supporting details</span>
          <h2 className="mkt-h2" style={{ marginTop: 8, marginBottom: 28 }}>Designed down to the daily workflow.</h2>
          <div className="cap-grid-2">
            {MINOR.map(m => (
              <div key={m.title} className="cap-row">
                <h3 className="mkt-h3" style={{ marginBottom: 6 }}>{m.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--ink-2)', lineHeight: 1.65 }}>{m.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="mkt-section">
        <Container>
          <div className="cta-band">
            <div>
              <h2 className="mkt-h2">See it with sample data, or connect your own Sheet.</h2>
              <p>Try every screen right now in demo mode without creating an account.</p>
            </div>
            <div className="cta-band-actions">
              <Link to="/app" className="mkt-btn mkt-btn--inverted">Open live demo</Link>
              <Link to="/docs" className="mkt-btn mkt-btn--ghost-light">Self-host guide</Link>
            </div>
          </div>
        </Container>
      </section>
    </MarketingLayout>
  )
}
