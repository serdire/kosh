import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useHosted } from '../../data/serverMode.js'
import './marketing.css'

const NAV = [
  { to: '/features', label: 'Features' },
  { to: '/pricing', label: 'Pricing', hostedOnly: true },
  { to: '/about', label: 'About' },
  { to: '/docs', label: 'Docs' },
]

// Centered max-width wrapper reused across marketing sections.
export function Container({ children, style, className = '' }) {
  return (
    <div className={'mkt-container ' + className} style={style}>
      {children}
    </div>
  )
}

export default function MarketingLayout({ children }) {
  const { pathname } = useLocation()
  const hosted = useHosted()
  const headerRef = useRef(null)
  const innerRef = useRef(null)
  const menuRef = useRef(null)
  const [isWide, setIsWide] = useState(true)
  const [measuring, setMeasuring] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const isWideRef = useRef(true)
  const lastHeaderWidth = useRef(0)

  const links = NAV.filter(n => !n.hostedOnly || hosted)

  // Measure whether the inline nav row fits; collapse to native popover when narrow.
  useLayoutEffect(() => {
    const header = headerRef.current
    const inner = innerRef.current
    const menu = menuRef.current
    if (!header || !inner || !menu || typeof ResizeObserver === 'undefined') return

    const supportsPopover = typeof HTMLElement !== 'undefined' && Object.hasOwn(HTMLElement.prototype, 'popover')

    const syncLayout = () => {
      const wasOpen = supportsPopover ? menu.matches(':popover-open') : menuOpen
      if (supportsPopover && wasOpen) menu.hidePopover()

      setMeasuring(true)
      header.classList.add('is-measuring', 'is-wide')
      menu.removeAttribute('popover')

      const fits = inner.scrollWidth <= inner.clientWidth + 1
      isWideRef.current = fits
      setIsWide(fits)

      if (!fits) {
        header.classList.remove('is-wide')
        if (supportsPopover) {
          menu.setAttribute('popover', 'auto')
          if (wasOpen) menu.showPopover()
        }
      } else {
        setMenuOpen(false)
      }

      requestAnimationFrame(() => {
        header.classList.remove('is-measuring')
        setMeasuring(false)
      })
    }

    syncLayout()

    const ro = new ResizeObserver(entries => {
      const w = entries[0]?.contentRect?.width ?? 0
      if (isWideRef.current || w > lastHeaderWidth.current) {
        syncLayout()
      }
      lastHeaderWidth.current = w
    })
    ro.observe(header)
    ro.observe(menu)
    return () => ro.disconnect()
  }, [links.length, hosted])

  useEffect(() => {
    const menu = menuRef.current
    if (!menu) return
    const onToggle = e => setMenuOpen(e.newState === 'open')
    menu.addEventListener('toggle', onToggle)
    return () => menu.removeEventListener('toggle', onToggle)
  }, [])

  // Close mobile menu when navigating between routes.
  useEffect(() => {
    const menu = menuRef.current
    if (menu && typeof menu.hidePopover === 'function' && menu.matches(':popover-open')) {
      menu.hidePopover()
    }
    setMenuOpen(false)
  }, [pathname])

  const handleMenuClick = () => {
    const supportsPopover = typeof HTMLElement !== 'undefined' && Object.hasOwn(HTMLElement.prototype, 'popover')
    if (!supportsPopover) setMenuOpen(o => !o)
  }

  const headerCls =
    'site-header' +
    (isWide ? ' is-wide' : '') +
    (measuring ? ' is-measuring' : '') +
    (!isWide && menuOpen ? ' is-open' : '')

  return (
    <div className="mkt-shell">
      <a href="#main-content" className="skip-link">Skip to content</a>

      <header ref={headerRef} className={headerCls}>
        <div ref={innerRef} className="header-inner">
          <Link to="/" className="site-brand">
            <span className="site-brand-glyph" aria-hidden="true">क</span>
            <span className="site-brand-word">Kosh</span>
          </Link>

          <nav className="site-nav" aria-label="Primary">
            <button
              className="menu-button"
              type="button"
              {...{ popovertarget: 'site-menu', popovertargetaction: 'toggle' }}
              aria-controls="site-menu"
              aria-expanded={!isWide ? menuOpen : undefined}
              onClick={handleMenuClick}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
              <span>Menu</span>
            </button>

            <ul ref={menuRef} id="site-menu" className="site-menu">
              {links.map(n => {
                const active = pathname.startsWith(n.to)
                return (
                  <li key={n.to}>
                    <Link to={n.to} aria-current={active ? 'page' : undefined}>
                      {n.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="header-actions">
            <Link to="/app" className="mkt-btn mkt-btn--primary mkt-btn--sm">
              Sign in
            </Link>
          </div>
        </div>
      </header>

      <main id="main-content" tabIndex={-1} className="mkt-main">{children}</main>

      <footer className="site-footer">
        <div className="footer-inner">
          <Link to="/" className="site-brand">
            <span className="site-brand-glyph" aria-hidden="true">क</span>
            <span className="site-brand-word">Kosh</span>
          </Link>
          <div className="footer-links">
            <Link to="/app">Open demo</Link>
            <a href="https://github.com/serdire/kosh" target="_blank" rel="noopener noreferrer">
              Source on GitHub (AGPL-3.0)
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
