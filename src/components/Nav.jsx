import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useTheme } from "../ThemeContext"

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
)

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
)

function LifePeekLocked() {
  const [show, setShow] = useState(false)

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => setShow(s => !s)}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        style={{
          background: "none", border: "none", cursor: "not-allowed",
          fontFamily: "Geist, sans-serif", fontSize: "0.875rem", fontWeight: 500,
          color: "var(--muted)", padding: 0,
          display: "flex", alignItems: "center", gap: 5,
          transition: "color 0.15s",
          opacity: 0.6,
        }}
      >
        LifePeek
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      </button>

      {show && (
        <div style={{
          position: "absolute", top: "calc(100% + 10px)", left: "50%",
          transform: "translateX(-50%)",
          background: "var(--nav-bg)", border: "1px solid var(--border)",
          borderRadius: 8, padding: "7px 12px",
          whiteSpace: "nowrap", zIndex: 100,
          boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
          pointerEvents: "none",
        }}>
          <p style={{
            fontFamily: "JetBrains Mono, monospace", fontSize: "0.7rem",
            color: "var(--muted)", letterSpacing: "0.06em", margin: 0,
          }}>
            🚧 still under construction
          </p>
          {/* Arrow */}
          <div style={{
            position: "absolute", top: -5, left: "50%", transform: "translateX(-50%)",
            width: 8, height: 8,
            background: "var(--nav-bg)", border: "1px solid var(--border)",
            borderRight: "none", borderBottom: "none",
            rotate: "45deg",
          }} />
        </div>
      )}
    </div>
  )
}

export default function Nav() {
  const navRef = useRef(null)
  const { dark, toggle } = useTheme()
  const links = ["About", "Skills", "Projects", "Education", "Experience", "Contact"]

  const handleClick = (e, id) => {
    e.preventDefault()
    const target = document.getElementById(id)
    if (!target) return
    const navHeight = navRef.current ? navRef.current.offsetHeight : 64
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight
    window.scrollTo({ top, behavior: "smooth" })
  }

  return (
    <nav ref={navRef} style={{ borderBottom: "1px solid var(--border)" }}
      className="sticky top-0 z-50 backdrop-blur-sm">
      <div style={{ backgroundColor: "var(--nav-bg)" }}
        className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#top" className="mono text-sm font-medium" style={{ color: "var(--text)" }}
          onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }) }}>
          <span style={{ color: "var(--accent)" }}>~/</span>dominion
        </a>

        <div className="flex items-center gap-7">
          <ul className="flex gap-7 list-none">
            {links.map(l => (
              <li key={l}>
                <a
                  href={`#${l.toLowerCase()}`}
                  onClick={e => handleClick(e, l.toLowerCase())}
                  className="text-sm font-medium transition-colors duration-150"
                  style={{ color: "var(--muted)", fontFamily: "Geist, sans-serif", textDecoration: "none" }}
                  onMouseEnter={e => e.target.style.color = "var(--text)"}
                  onMouseLeave={e => e.target.style.color = "var(--muted)"}
                >
                  {l}
                </a>
              </li>
            ))}
            <li style={{ position: "relative" }}>
              <LifePeekLocked />
            </li>
          </ul>

          <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            style={{
              background: "none",
              border: "1px solid var(--border)",
              borderRadius: "6px",
              padding: "5px 8px",
              cursor: "pointer",
              color: "var(--muted)",
              display: "flex",
              alignItems: "center",
              transition: "border-color 0.15s, color 0.15s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "var(--accent)"
              e.currentTarget.style.color = "var(--accent)"
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "var(--border)"
              e.currentTarget.style.color = "var(--muted)"
            }}
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
    </nav>
  )
}
