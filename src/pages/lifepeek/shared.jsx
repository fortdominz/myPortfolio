import { useEffect, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useTheme } from "../../ThemeContext"

// ── Fonts ─────────────────────────────────────────────────────────────────────
export const MONO  = "'JetBrains Mono', monospace"
export const SERIF = "'Fraunces', Georgia, serif"
export const SANS  = "'Geist', system-ui, sans-serif"

// ── Theme tokens ──────────────────────────────────────────────────────────────
export function useTokens() {
  const { dark, toggle } = useTheme()
  const tok = {
    dark,
    toggle,
    bg:         dark ? "#06080D"                  : "var(--bg)",
    surface:    dark ? "rgba(255,255,255,0.038)"  : "rgba(0,0,0,0.030)",
    surfaceH:   dark ? "rgba(255,255,255,0.072)"  : "rgba(0,0,0,0.055)",
    border:     dark ? "rgba(255,255,255,0.075)"  : "rgba(0,0,0,0.09)",
    borderH:    dark ? "rgba(255,255,255,0.20)"   : "rgba(0,0,0,0.18)",
    text:       dark ? "#E6EDF3"                  : "var(--text)",
    muted:      dark ? "rgba(255,255,255,0.40)"   : "var(--muted)",
    dim:        dark ? "rgba(255,255,255,0.14)"   : "rgba(0,0,0,0.18)",
    heroBg:     dark ? "#0A0D14"                  : "var(--bg)",
    lineColor:  dark ? "rgba(255,255,255,0.10)"   : "rgba(0,0,0,0.12)",
    cardShadow: dark ? "none"                     : "0 2px 12px rgba(0,0,0,0.07)",
  }
  return tok
}

// ── Hooks ─────────────────────────────────────────────────────────────────────
export function useClock() {
  const [time, setTime] = useState("")
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-US", { hour12: false }))
    tick()
    const t = setInterval(tick, 1000)
    return () => clearInterval(t)
  }, [])
  return time
}

export function useInView(ref, threshold = 0.07) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return inView
}

// ── Shared nav ────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { to: "/lifepeek/life-journey",   label: "Life Journey"   },
  { to: "/lifepeek/open-world",     label: "Open World"     },
  { to: "/lifepeek/touching-grass", label: "Touching Grass" },
]

export function LifePeekNav({ tok }) {
  const clock    = useClock()
  const location = useLocation()

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 50,
      backgroundColor: tok.dark ? "rgba(6,8,13,0.9)" : "var(--nav-bg)",
      backdropFilter: "blur(14px)",
      borderBottom: `1px solid ${tok.border}`,
      padding: "0 40px", height: 54,
      display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24,
    }}>

      {/* Left: back + brand */}
      <div style={{ display: "flex", alignItems: "center", gap: 18, flexShrink: 0 }}>
        <Link
          to="/lifepeek"
          style={{ fontFamily: MONO, fontSize: 11, color: tok.muted,
            textDecoration: "none", letterSpacing: "0.1em", transition: "color 0.15s" }}
          onMouseEnter={e => e.currentTarget.style.color = tok.text}
          onMouseLeave={e => e.currentTarget.style.color = tok.muted}
        >
          ← lifepeek
        </Link>
        <span style={{ color: tok.dim, fontFamily: MONO, fontSize: 11 }}>|</span>
        <Link
          to="/"
          style={{ fontFamily: MONO, fontSize: 11, color: tok.dim,
            textDecoration: "none", letterSpacing: "0.08em", transition: "color 0.15s" }}
          onMouseEnter={e => e.currentTarget.style.color = tok.muted}
          onMouseLeave={e => e.currentTarget.style.color = tok.dim}
        >
          portfolio
        </Link>
      </div>

      {/* Center: section links */}
      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        {NAV_LINKS.map(link => {
          const active = location.pathname === link.to
          return (
            <Link
              key={link.to}
              to={link.to}
              style={{
                fontFamily: SANS, fontSize: "0.82rem", fontWeight: active ? 600 : 400,
                color: active ? "var(--accent)" : tok.muted,
                textDecoration: "none", transition: "color 0.15s",
                borderBottom: active ? "1px solid var(--accent)" : "1px solid transparent",
                paddingBottom: 2,
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.color = tok.text }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.color = tok.muted }}
            >
              {link.label}
            </Link>
          )
        })}
      </div>

      {/* Right: clock + theme */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
        <span style={{ fontFamily: MONO, fontSize: 10, color: tok.dim, letterSpacing: "0.1em" }}>
          {clock}
        </span>
        <button
          onClick={tok.toggle}
          style={{
            background: "none", border: `1px solid ${tok.border}`,
            borderRadius: 6, padding: "4px 8px", cursor: "pointer",
            color: tok.muted, fontFamily: MONO, fontSize: 10, letterSpacing: "0.08em",
            transition: "border-color 0.15s, color 0.15s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = "var(--accent)"
            e.currentTarget.style.color = "var(--accent)"
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = tok.border
            e.currentTarget.style.color = tok.muted
          }}
        >
          {tok.dark ? "light" : "dark"}
        </button>
      </div>
    </nav>
  )
}

// ── Page shell ────────────────────────────────────────────────────────────────
export function PageShell({ tok, children, title }) {
  useEffect(() => {
    document.title = title
      ? `${title} — LifePeek · Dominion Eze`
      : "LifePeek — Dominion Eze"
    return () => { document.title = "Dominion Eze — AI Engineer & System Architect" }
  }, [title])

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: tok.bg,
      color: tok.text,
      fontFamily: SANS,
      transition: "background-color 0.25s ease, color 0.25s ease",
    }}>
      <style>{`
        @keyframes lp-spin { to { transform: rotate(360deg); } }
      `}</style>

      {/* Grain */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 9998, pointerEvents: "none",
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
        backgroundSize: "200px 200px",
        opacity: tok.dark ? 0.025 : 0.018,
      }} />

      <LifePeekNav tok={tok} />
      {children}
    </div>
  )
}

// ── Post card (shared by Open World + Touching Grass) ─────────────────────────
export function PostCard({ post, accentColor, tok, delay = 0 }) {
  const ref    = useRef(null)
  const inView = useInView(ref)
  const [hov, setHov]   = useState(false)

  const hasImages = post.images && post.images.length > 0
  const meta      = post.program || post.location || ""

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background:   hov ? tok.surfaceH : tok.surface,
        border:       `1px solid ${hov ? accentColor + "66" : tok.border}`,
        borderRadius: 16,
        overflow:     "hidden",
        boxShadow:    hov
          ? `0 0 24px ${accentColor}22, ${tok.cardShadow}`
          : tok.cardShadow,
        transform:    hov ? "translateY(-4px)" :
                      inView ? "translateY(0)" : "translateY(28px)",
        opacity:      inView ? 1 : 0,
        transition:   `all 0.25s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms`,
      }}
    >
      {hasImages ? (
        <div style={{
          width: "100%",
          aspectRatio: post.images.length === 1 ? "16/9" : "4/3",
          display: "grid",
          gridTemplateColumns: post.images.length >= 2 ? "1fr 1fr" : "1fr",
          gap: 2, background: tok.border,
        }}>
          {post.images.slice(0, 4).map((src, i) => (
            <img key={i} src={src} alt="" style={{
              width: "100%", height: "100%", objectFit: "cover", display: "block",
              gridColumn: post.images.length === 3 && i === 0 ? "span 2" : "auto",
            }} />
          ))}
        </div>
      ) : (
        <div style={{ height: 6, background: `linear-gradient(to right, ${accentColor}, ${accentColor}44)` }} />
      )}

      <div style={{ padding: "20px 22px 22px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
          <span style={{ fontFamily: MONO, fontSize: 9, color: accentColor,
            letterSpacing: "0.14em", textTransform: "uppercase" }}>{meta}</span>
          <span style={{ fontFamily: MONO, fontSize: 9, color: tok.dim }}>·</span>
          <span style={{ fontFamily: MONO, fontSize: 9, color: tok.muted, letterSpacing: "0.1em" }}>{post.date}</span>
        </div>

        <h3 style={{ fontFamily: SERIF, fontSize: "1.15rem", fontWeight: 600,
          color: tok.text, marginBottom: 10, lineHeight: 1.25 }}>
          {post.title}
        </h3>
        <p style={{ fontFamily: SANS, fontSize: "0.86rem", color: tok.muted,
          lineHeight: 1.72, marginBottom: 16 }}>
          {post.body}
        </p>

        {post.tags?.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {post.tags.map(tag => (
              <span key={tag} style={{
                fontFamily: MONO, fontSize: 9, padding: "3px 8px", borderRadius: 4,
                background: accentColor + "15", color: accentColor, letterSpacing: "0.1em",
              }}>#{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Empty state ───────────────────────────────────────────────────────────────
export function EmptyState({ tok, icon, message, sub }) {
  return (
    <div style={{
      textAlign: "center", padding: "80px 20px",
      border: `1px dashed ${tok.border}`, borderRadius: 16,
    }}>
      <div style={{ fontSize: "2.4rem", marginBottom: 16 }}>{icon}</div>
      <p style={{ fontFamily: SERIF, fontSize: "1.15rem", color: tok.muted, marginBottom: 10 }}>{message}</p>
      <p style={{ fontFamily: MONO, fontSize: 10, color: tok.dim, letterSpacing: "0.12em" }}>{sub}</p>
    </div>
  )
}

// ── Section page header ───────────────────────────────────────────────────────
export function PageHeader({ tok, label, title, subtitle, accent }) {
  const ref    = useRef(null)
  const inView = useInView(ref)

  return (
    <header
      ref={ref}
      style={{
        maxWidth: 1100, margin: "0 auto", padding: "52px 40px 44px",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      <p style={{ fontFamily: MONO, fontSize: 10, color: accent || "var(--accent)",
        letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>
        // {label}
      </p>
      <h1 style={{
        fontFamily: SERIF, fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
        fontWeight: 700, color: tok.text, letterSpacing: "-0.02em",
        lineHeight: 1.1, marginBottom: 14,
      }}>
        {title}
      </h1>
      {subtitle && (
        <p style={{ fontFamily: SANS, fontSize: "0.92rem", color: tok.muted,
          maxWidth: 500, lineHeight: 1.65 }}>
          {subtitle}
        </p>
      )}
    </header>
  )
}
