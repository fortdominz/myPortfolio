import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { lifepeek } from "../data"

// ── Constants ─────────────────────────────────────────────────────────────────

const BG        = "#06080D"
const SURFACE   = "rgba(255,255,255,0.038)"
const SURFACE_H = "rgba(255,255,255,0.072)"
const BORDER    = "rgba(255,255,255,0.075)"
const TEXT      = "#E6EDF3"
const MUTED     = "rgba(255,255,255,0.42)"
const MONO      = "'JetBrains Mono', monospace"
const SERIF     = "'Fraunces', Georgia, serif"
const SANS      = "'Geist', system-ui, sans-serif"

// ── Hooks ─────────────────────────────────────────────────────────────────────

function useGridCols() {
  const [cols, setCols] = useState(4)
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      setCols(w < 560 ? 1 : w < 900 ? 2 : 4)
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])
  return cols
}

function useClock() {
  const [time, setTime] = useState("")
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-US", { hour12: false }))
    tick()
    const t = setInterval(tick, 1000)
    return () => clearInterval(t)
  }, [])
  return time
}

function useInView(ref) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold: 0.08 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return inView
}

// ── Tile wrapper ──────────────────────────────────────────────────────────────

function Tile({ tile, children, accent, delay = 0, cols = 4 }) {
  const ref     = useRef(null)
  const inView  = useInView(ref)
  const [hov, setHov] = useState(false)
  const span = Math.min(tile.colSpan, cols)

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        gridColumn: `span ${span}`,
        background:   hov ? SURFACE_H : SURFACE,
        border:       `1px solid ${hov ? (accent + "66") : BORDER}`,
        borderRadius: 18,
        padding:      "26px 28px",
        transition:   "all 0.22s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        boxShadow:    hov ? `0 0 28px ${accent}28` : "none",
        transform:    hov  ? "translateY(-4px) scale(1.012)" :
                      inView ? "translateY(0) scale(1)"       :
                               "translateY(32px) scale(0.97)",
        opacity:      inView ? 1 : 0,
        transitionDelay: `${delay}ms`,
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle corner glow on hover */}
      {hov && (
        <div style={{
          position: "absolute", inset: 0, borderRadius: 18, pointerEvents: "none",
          background: `radial-gradient(ellipse at 0% 0%, ${accent}12 0%, transparent 60%)`,
        }} />
      )}
      {children}
    </div>
  )
}

// ── Tile types ────────────────────────────────────────────────────────────────

function HeroTile({ tile, cols = 4 }) {
  const [hov, setHov] = useState(false)
  const span = Math.min(tile.colSpan, cols)

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ gridColumn: `span ${span}`, position: "relative", borderRadius: 22, padding: 2 }}
    >
      {/* Spinning conic gradient border */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: 22, overflow: "hidden", zIndex: 0,
      }}>
        <div style={{
          position: "absolute",
          inset: "-80%",
          background: "conic-gradient(from 0deg, #2563EB, #06B6D4, #8B5CF6, #F59E0B, #10B981, #2563EB)",
          animation: "lp-spin 7s linear infinite",
          opacity: hov ? 0.95 : 0.7,
          transition: "opacity 0.4s ease",
        }} />
      </div>

      {/* Inner content */}
      <div style={{
        position: "relative", zIndex: 1,
        background: "#0A0D14",
        borderRadius: 20,
        padding: "52px 48px",
        minHeight: 240,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}>
        {/* Dot grid overlay */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: 20, pointerEvents: "none",
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 70% 90% at 30% 50%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 90% at 30% 50%, black, transparent)",
        }} />

        <span style={{ fontFamily: MONO, fontSize: 11, color: MUTED, letterSpacing: "0.2em", marginBottom: 20 }}>
          // {tile.tag}
        </span>

        <h1 style={{
          fontFamily: SERIF,
          fontSize: "clamp(2.8rem, 5vw, 5rem)",
          fontWeight: 700,
          color: TEXT,
          lineHeight: 1.05,
          letterSpacing: "-0.02em",
          marginBottom: 20,
        }}>
          {tile.title}
        </h1>

        <p style={{
          fontFamily: SANS, fontSize: "1.08rem", color: MUTED,
          maxWidth: 580, lineHeight: 1.75,
        }}>
          {tile.body}
        </p>
      </div>
    </div>
  )
}

function StatTile({ tile, delay, cols }) {
  return (
    <Tile tile={tile} accent={tile.color} delay={delay} cols={cols}>
      <span style={{ fontFamily: MONO, fontSize: 10, color: tile.color, letterSpacing: "0.18em", textTransform: "uppercase" }}>
        {tile.label}
      </span>
      <div style={{
        fontFamily: SERIF,
        fontSize: "clamp(2.4rem, 4vw, 3.4rem)",
        fontWeight: 700,
        color: tile.color,
        lineHeight: 1.1,
        marginTop: 10,
        marginBottom: 8,
        letterSpacing: "-0.02em",
      }}>
        {tile.value}
      </div>
      <span style={{ fontFamily: SANS, fontSize: "0.8rem", color: MUTED }}>
        {tile.sub}
      </span>
    </Tile>
  )
}

function StoryTile({ tile, delay, cols }) {
  return (
    <Tile tile={tile} accent={tile.color} delay={delay} cols={cols}>
      <span style={{ fontFamily: MONO, fontSize: 10, color: tile.color, letterSpacing: "0.18em", textTransform: "uppercase" }}>
        // {tile.tag}
      </span>
      <h3 style={{
        fontFamily: SERIF, fontSize: "1.3rem", fontWeight: 600,
        color: TEXT, marginTop: 14, marginBottom: 12, lineHeight: 1.2,
      }}>
        {tile.title}
      </h3>
      <p style={{ fontFamily: SANS, fontSize: "0.88rem", color: MUTED, lineHeight: 1.72 }}>
        {tile.body}
      </p>
    </Tile>
  )
}

function ProgramTile({ tile, delay, cols }) {
  const badgeColors = {
    Active:    { bg: "rgba(16,185,129,0.15)", text: "#10B981" },
    Completed: { bg: "rgba(107,114,128,0.2)", text: "#9CA3AF" },
  }
  const badge = badgeColors[tile.badge] || badgeColors.Active

  return (
    <Tile tile={tile} accent={tile.color} delay={delay} cols={cols}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 12 }}>
        <span style={{ fontFamily: MONO, fontSize: 10, color: tile.color, letterSpacing: "0.18em", textTransform: "uppercase" }}>
          {tile.org}
        </span>
        <span style={{
          fontFamily: MONO, fontSize: 9, letterSpacing: "0.12em",
          padding: "2px 8px", borderRadius: 4,
          background: badge.bg, color: badge.text,
          flexShrink: 0,
        }}>
          {tile.badge}
        </span>
      </div>
      <h3 style={{
        fontFamily: SERIF, fontSize: "1.15rem", fontWeight: 600,
        color: TEXT, marginBottom: 10, lineHeight: 1.2,
      }}>
        {tile.title}
      </h3>
      <p style={{ fontFamily: SANS, fontSize: "0.83rem", color: MUTED, lineHeight: 1.68, marginBottom: 14 }}>
        {tile.body}
      </p>
      <span style={{ fontFamily: MONO, fontSize: 9, color: "rgba(255,255,255,0.2)", letterSpacing: "0.12em" }}>
        {tile.period}
      </span>
    </Tile>
  )
}

function HobbyTile({ tile, delay, cols }) {
  return (
    <Tile tile={tile} accent={tile.color} delay={delay} cols={cols}>
      <div style={{
        fontSize: "2.2rem", lineHeight: 1,
        marginBottom: 14,
      }}>
        {tile.emoji}
      </div>
      <h3 style={{
        fontFamily: SERIF, fontSize: "1.15rem", fontWeight: 600,
        color: TEXT, marginBottom: 10, lineHeight: 1.2,
      }}>
        {tile.title}
      </h3>
      <p style={{ fontFamily: SANS, fontSize: "0.83rem", color: MUTED, lineHeight: 1.68 }}>
        {tile.body}
      </p>
    </Tile>
  )
}

function QuoteTile({ tile, delay, cols }) {
  return (
    <Tile tile={tile} accent={tile.color} delay={delay} cols={cols}>
      <div style={{
        fontFamily: SERIF, fontSize: "clamp(1.05rem, 2vw, 1.25rem)",
        fontStyle: "italic", fontWeight: 400,
        color: TEXT, lineHeight: 1.7,
        marginBottom: 20,
      }}>
        {tile.text}
      </div>
      <span style={{ fontFamily: MONO, fontSize: 11, color: tile.color, letterSpacing: "0.1em" }}>
        {tile.author}
      </span>
    </Tile>
  )
}

// ── Tile router ───────────────────────────────────────────────────────────────

function BentoTile({ tile, delay, cols }) {
  if (tile.type === "hero")    return <HeroTile    tile={tile} cols={cols} />
  if (tile.type === "stat")    return <StatTile    tile={tile} delay={delay} cols={cols} />
  if (tile.type === "story")   return <StoryTile   tile={tile} delay={delay} cols={cols} />
  if (tile.type === "program") return <ProgramTile tile={tile} delay={delay} cols={cols} />
  if (tile.type === "hobby")   return <HobbyTile   tile={tile} delay={delay} cols={cols} />
  if (tile.type === "quote")   return <QuoteTile   tile={tile} delay={delay} cols={cols} />
  return null
}

// ── Nav ───────────────────────────────────────────────────────────────────────

function LifePeekNav() {
  const clock = useClock()
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 50,
      background: "rgba(6,8,13,0.85)", backdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      padding: "14px 40px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <Link
          to="/"
          style={{
            fontFamily: MONO, fontSize: 12, color: MUTED,
            textDecoration: "none", letterSpacing: "0.1em",
            transition: "color 0.15s",
          }}
          onMouseEnter={e => e.currentTarget.style.color = TEXT}
          onMouseLeave={e => e.currentTarget.style.color = MUTED}
        >
          ← portfolio
        </Link>
        <span style={{ fontFamily: MONO, fontSize: 12, color: "rgba(255,255,255,0.15)" }}>|</span>
        <span style={{ fontFamily: MONO, fontSize: 12, color: "#2563EB", letterSpacing: "0.15em" }}>
          // lifepeek
        </span>
      </div>
      <span style={{ fontFamily: MONO, fontSize: 11, color: "rgba(255,255,255,0.2)", letterSpacing: "0.12em" }}>
        {clock}
      </span>
    </nav>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function LifePeek() {
  const cols = useGridCols()

  useEffect(() => {
    document.title = "LifePeek — Dominion Eze"
    document.documentElement.setAttribute("data-theme", "dark")
    return () => document.title = "Dominion Eze — AI Engineer & System Architect"
  }, [])

  return (
    <div style={{ minHeight: "100vh", background: BG, color: TEXT, fontFamily: SANS }}>

      {/* Keyframes */}
      <style>{`
        @keyframes lp-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes lp-pulse {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1;   }
        }
      `}</style>

      {/* Grain texture */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 9998, pointerEvents: "none",
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
        backgroundSize: "200px 200px",
        opacity: 0.025,
      }} />

      <LifePeekNav />

      {/* Header */}
      <header style={{
        maxWidth: 1100, margin: "0 auto",
        padding: cols === 1 ? "40px 20px 24px" : "56px 40px 32px",
      }}>
        <p style={{ fontFamily: MONO, fontSize: 11, color: MUTED, letterSpacing: "0.2em", marginBottom: 14 }}>
          // dominion.world · a window into the rest of me
        </p>
        <h2 style={{
          fontFamily: SERIF, fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
          fontWeight: 600, color: TEXT, letterSpacing: "-0.02em",
          maxWidth: 600, lineHeight: 1.2,
        }}>
          Beyond the code.
          <span style={{ color: MUTED, fontWeight: 400 }}> This is who I actually am.</span>
        </h2>
      </header>

      {/* Bento Grid */}
      <main style={{
        maxWidth: 1100, margin: "0 auto",
        padding: cols === 1 ? "0 20px 60px" : "0 40px 80px",
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: cols === 1 ? 12 : 14,
        gridAutoFlow: "dense",
      }}>
        {lifepeek.map((tile, i) => (
          <BentoTile key={tile.id} tile={tile} cols={cols} delay={tile.type === "hero" ? 0 : (i % cols) * 60} />
        ))}
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: "24px 40px",
        maxWidth: 1100, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{ fontFamily: MONO, fontSize: 11, color: "rgba(255,255,255,0.18)", letterSpacing: "0.12em" }}>
          // content updated as life happens
        </span>
        <Link
          to="/"
          style={{
            fontFamily: MONO, fontSize: 11, color: "#2563EB",
            textDecoration: "none", letterSpacing: "0.1em",
            transition: "opacity 0.15s",
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.7"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >
          ← back to portfolio
        </Link>
      </footer>
    </div>
  )
}
