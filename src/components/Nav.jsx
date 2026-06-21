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

const SnowflakeIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1" />
    <path d="M12 5.5 9.8 7.7M12 5.5l2.2 2.2M12 18.5l-2.2-2.2M12 18.5l2.2-2.2" />
    <path d="M5.5 12 7.7 9.8M5.5 12l2.2 2.2M18.5 12l-2.2-2.2M18.5 12l-2.2 2.2" />
  </svg>
)

/* LifePeek — a distinct frost portal in the nav, set apart from the plain
   text links. Routes into the LifePeek Command Deck. */
function LifePeekPortal() {
  return (
    <Link
      to="/lifepeek"
      className="lifepeek-portal"
      style={{
        display: "flex", alignItems: "center", gap: 6,
        fontFamily: "JetBrains Mono, monospace", fontSize: "0.74rem", fontWeight: 600,
        letterSpacing: "0.08em", textDecoration: "none",
        color: "#3B9CD9", padding: "5px 12px", borderRadius: "20px",
        border: "1px solid rgba(80,170,225,0.4)",
        background: "rgba(120,195,240,0.08)",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = "rgba(120,195,240,0.18)"
        e.currentTarget.style.borderColor = "rgba(80,170,225,0.8)"
        e.currentTarget.style.boxShadow = "0 0 18px rgba(90,180,235,0.25)"
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = "rgba(120,195,240,0.08)"
        e.currentTarget.style.borderColor = "rgba(80,170,225,0.4)"
        e.currentTarget.style.boxShadow = "none"
      }}
    >
      <SnowflakeIcon />
      LifePeek
    </Link>
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
              <LifePeekPortal />
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
