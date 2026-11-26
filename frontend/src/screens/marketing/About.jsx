import { Link } from 'react-router-dom'
import MarketingLayout, { Container } from './MarketingLayout.jsx'
import { useDocumentTitle } from '../../data/useDocumentTitle.js'

const FACTS = [
  { k: 'Data store', v: 'Your own Google Sheet' },
  { k: 'License', v: 'AGPL-3.0 open source' },
  { k: 'Metal rates', v: 'IBJA 999 hourly feed' },
  { k: 'AI integration', v: 'Optional (bring your key)' },
]

export default function About() {
  useDocumentTitle('About — Kosh')
  return (
    <MarketingLayout>
      <section className="page-head" style={{ paddingBottom: 16 }}>
        <Container>
          <span className="mkt-label">About</span>
          <h1 className="mkt-h1" style={{ marginTop: 10, maxInlineSize: '18ch' }}>
            A calm ledger, not a consumer product.
          </h1>
        </Container>
      </section>

      <Container>
        <div className="about-grid">
          <aside className="about-facts">
            {FACTS.map(f => (
              <div key={f.k} className="about-fact">
                <div style={{ fontSize: '0.78rem', color: 'var(--ink-3)', marginBottom: 4 }}>{f.k}</div>
                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--ink)' }}>{f.v}</div>
              </div>
            ))}
          </aside>

          <article className="about-essay">
            <p>
              Kosh started as a spreadsheet — the same workbook most Indian households already keep, tracking fixed deposits in one tab, mutual funds in another, and a running calculation of whether the new or old tax regime saves money this year. It became an application when maintaining formulas across tabs every quarter grew brittle.
            </p>
            <p>
              It was built for managing real family finances — investments, insurance coverage, loans, and annual tax planning — in one composed space instead of five disconnected portals, and released openly because the problem is common across households.
            </p>

            <h2>Why a Google Sheet instead of a database</h2>
            <p>
              Most finance tools require trusting an external company with bank balances, insurance cover, and net worth in exchange for charts. Kosh removes that custody tradeoff by reading and writing directly to a Google Sheet you own. When self-hosted, only you, Google (as your spreadsheet host), and optionally Anthropic (if you configure an AI key) ever touch your numbers.
            </p>
            <p>
              Because there is no multi-tenant database scaling behind your portfolio, Kosh stays maintainable without forcing a business model built around locking in your history.
            </p>

            <h2>What Kosh aims to stay</h2>
            <p>
              Kosh does not try to replace bank-linked expense auto-categorizers. Its focus is long-horizon household clarity: what your family holds, what it is worth today, what you owe, and how to plan taxes before March 31.
            </p>
          </article>
        </div>
      </Container>

      <section className="mkt-section mkt-section--surface">
        <Container>
          <div className="cta-band">
            <div>
              <h2 className="mkt-h2">Inspect the source or launch your own copy.</h2>
              <p>Read the self-hosting guide or browse the repository on GitHub.</p>
            </div>
            <div className="cta-band-actions">
              <Link to="/docs" className="mkt-btn mkt-btn--inverted">Read self-host guide</Link>
              <a
                href="https://github.com/serdire/kosh"
                target="_blank"
                rel="noopener noreferrer"
                className="mkt-btn mkt-btn--ghost-light"
              >
                View source on GitHub
              </a>
            </div>
          </div>
        </Container>
      </section>
    </MarketingLayout>
  )
}
