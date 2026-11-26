import { useState } from 'react'
import { Link } from 'react-router-dom'
import MarketingLayout, { Container } from './MarketingLayout.jsx'
import { useDocumentTitle } from '../../data/useDocumentTitle.js'
import { PRICING, HOSTED_APP_URL } from '../../data/pricing.js'

const inr = n => '₹' + n.toLocaleString('en-IN')

const HOSTED = [
  `Up to ${PRICING.maxPeople} household members, each with separate Google sign-in`,
  'Data stays in a Google Sheet inside your own Drive, never our database',
  'Read-only family sharing links unlocked with phone authenticator codes',
  `AI quotas included: ${PRICING.quotas.ask} Ask Kosh queries, ${PRICING.quotas.parse} document scans, ${PRICING.quotas.tax} tax runs monthly`,
  'Automatic updates, backups, and security maintenance',
]

const SELF = [
  'Identical codebase deployed on your own Google Cloud project',
  'Free and open source under AGPL-3.0',
  'Bring your own Anthropic API key for optional AI features',
  'Full control over upgrades, environment variables, and hosting',
]

const FAQ = [
  [
    'Where is my financial data stored?',
    'In a Google Sheet created inside your own Google Drive. Kosh servers store only your household roster, subscription status, monthly AI quota counters, and an encrypted reference to open that sheet.',
  ],
  [
    'What happens when I use the AI features?',
    'Only the figures or document needed for that request are sent to Anthropic Claude. Nothing is transmitted unless you explicitly trigger a scan, question, or tax recommendation.',
  ],
  [
    'What can Kosh access in my Google Drive?',
    'Only the files Kosh itself creates via Google\'s drive.file scope. Existing files and folders in your Drive remain completely inaccessible.',
  ],
  [
    'What happens if I stop paying?',
    'Your household enters read-only mode so you can still view and export everything, and the Google Sheet in your Drive remains yours.',
  ],
  [
    'Can I move to self-hosting later?',
    'Yes. Point a self-hosted deployment at the exact same Google Sheet ID at any time with zero migration steps.',
  ],
  [
    'Does the trial require a card?',
    `No. You get ${PRICING.trialDays} days of the full household plan before entering payment details.`,
  ],
  [
    'How do cancellations work?',
    'Cancel from the Plan modal inside the app at any time; access continues until the end of your current billing period.',
  ],
]

function CheckItem({ children }) {
  return (
    <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.9rem', color: 'var(--ink-2)', lineHeight: 1.6 }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ marginTop: 4, flexShrink: 0 }}>
        <path d="M5 12l4.5 4.5L19 7" />
      </svg>
      <span>{children}</span>
    </li>
  )
}

export default function Pricing() {
  useDocumentTitle('Pricing — Kosh')
  const [openFaq, setOpenFaq] = useState(0)
  const external = HOSTED_APP_URL.startsWith('http')

  return (
    <MarketingLayout>
      <section className="page-head">
        <Container>
          <span className="mkt-label">Pricing</span>
          <h1 className="mkt-h1" style={{ marginTop: 10, maxInlineSize: '20ch' }}>
            One plan for the whole family. Or self-host free.
          </h1>
          <p className="mkt-lead" style={{ marginTop: 14 }}>
            Either way, your holdings, income, and tax figures live inside a Google Sheet you own.
          </p>
        </Container>
      </section>

      <Container style={{ paddingBottom: 64 }}>
        <div className="pricing-pair">
          <div className="plan-panel plan-panel--featured">
            <span className="mkt-label">Hosted household</span>
            <div className="plan-fig">
              {inr(PRICING.monthly)}
              <span style={{ fontFamily: 'var(--sans)', fontSize: '0.95rem', fontWeight: 600, color: 'var(--ink-3)' }}> / month</span>
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--ink-2)', marginBottom: 22 }}>
              Or {inr(PRICING.annual)}/year · {PRICING.trialDays}-day free trial without a card
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
              {HOSTED.map(item => <CheckItem key={item}>{item}</CheckItem>)}
            </ul>
            {external ? (
              <a href={HOSTED_APP_URL} className="mkt-btn mkt-btn--primary" style={{ width: '100%' }}>
                Start {PRICING.trialDays}-day trial
              </a>
            ) : (
              <Link to={HOSTED_APP_URL} className="mkt-btn mkt-btn--primary" style={{ width: '100%' }}>
                Start {PRICING.trialDays}-day trial
              </Link>
            )}
          </div>

          <div className="plan-panel">
            <span className="mkt-label" style={{ color: 'var(--ink-3)' }}>Self-hosted</span>
            <div className="plan-fig">Free</div>
            <p style={{ fontSize: '0.86rem', color: 'var(--ink-2)', marginBottom: 22 }}>
              Open-source AGPL-3.0 single Docker deployment
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
              {SELF.map(item => <CheckItem key={item}>{item}</CheckItem>)}
            </ul>
            <Link to="/docs" className="mkt-btn" style={{ width: '100%' }}>
              Read self-hosting guide
            </Link>
          </div>
        </div>
        <p style={{ fontSize: '0.82rem', color: 'var(--ink-3)', marginTop: 16 }}>
          Hosted pricing in Indian rupees, payable via UPI, card, or netbanking.
        </p>
      </Container>

      <section className="mkt-section mkt-section--surface">
        <Container className="mkt-container--narrow">
          <span className="mkt-label">Questions</span>
          <h2 className="mkt-h2" style={{ marginTop: 8, marginBottom: 24 }}>Common questions on custody and billing</h2>
          <div className="faq-list">
            {FAQ.map(([q, a], idx) => {
              const open = openFaq === idx
              return (
                <div key={q} className="faq-item">
                  <button
                    type="button"
                    className="faq-trigger"
                    aria-expanded={open}
                    aria-controls={`faq-panel-${idx}`}
                    onClick={() => setOpenFaq(open ? -1 : idx)}
                  >
                    <span>{q}</span>
                    <span aria-hidden="true" style={{ fontFamily: 'var(--mono)', color: 'var(--ink-3)', fontSize: '1.1rem' }}>
                      {open ? '−' : '+'}
                    </span>
                  </button>
                  <div id={`faq-panel-${idx}`} hidden={!open} className="faq-answer">
                    {a}
                  </div>
                </div>
              )
            })}
          </div>
        </Container>
      </section>
    </MarketingLayout>
  )
}
