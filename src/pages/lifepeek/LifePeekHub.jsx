import { useRef, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useTokens, useInView, PageShell, MONO, SERIF, SANS } from "./shared"
import { lifepeek } from "../../data"

// ── Tile renderers ────────────────────────────────────────────────────────────

function HeroTile({ tile, tok, span }) {
  const ref    = useRef(null)
  const inView = useInView(ref)

  return (
    <div
      ref={ref}
      style={{
        gridColumn: `span ${span}`,
        background: `linear-gradient(135deg, ${tok.surface}, ${tok.surfaceH})`,
        border: `1px solid ${tok.border}`,
        borderRadius: 20,
        padding: "36px 40px",
        position: "relative",
        overflow: "hidden",
        opacity:   inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      {/* Rainbow top border */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: "linear-gradient(to right, #2563EB, #8B5CF6, #06B6D4, #10B981, #F59E0B)",
      }} />

      <p style={{
        fontFamily: MONO, fontSize: 10, color: tok.muted,
        letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16,
      }}>
        // {tile.tag}
      </p>
      <h2 style={{
        fontFamily: SERIF, fontSize: "clamp(2rem, 4vw, 3rem)",
        fontWeight: 800, color: tok.text, letterSpacing: "-0.025em",
        lineHeight: 1.08, marginBottom: 16,
      }}>
        {tile.title}
      </h2>
      <p style={{
        fontFamily: SANS, fontSize: "0.9rem", color: tok.muted,
        lineHeight: 1.7, maxWidth: 560,
      }}>
        {tile.body}
      </p>
    </div>
  )
}

function StatTile({ tile, tok, span, delay }) {
  const ref    = useRef(null)
  const inView = useInView(ref)
  const [hov, setHov] = useState(false)

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        gridColumn:   `span ${span}`,
        background:   hov ? tok.surfaceH : tok.surface,
        border:       `1px solid ${hov ? tile.color + "66" : tok.border}`,
        borderRadius: 16,
        padding:      "28px 26px",
        opacity:      inView ? 1 : 0,
        transform:    inView ? "translateY(0)" : "translateY(24px)",
        transition:   `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms, background 0.2s, border-color 0.2s`,
        boxShadow:    hov ? `0 0 20px ${tile.color}22` : tok.cardShadow,
      }}
    >
      <p style={{
        fontFamily: MONO, fontSize: 9, color: tile.color,
        letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 10,
      }}>
        {tile.label}
      </p>
      <p style={{
        fontFamily: SERIF, fontSize: "clamp(2.4rem, 5vw, 3.4rem)",
        fontWeight: 800, color: tile.color, lineHeight: 1, marginBottom: 8,
      }}>
        {tile.value}
      </p>
      <p style={{ fontFamily: SANS, fontSize: "0.8rem", color: tok.muted }}>
        {tile.sub}
      </p>
    </div>
  )
}

function StoryTile({ tile, tok, span, delay }) {
  const ref    = useRef(null)
  const inView = useInView(ref)
  const [hov, setHov] = useState(false)

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        gridColumn:   `span ${span}`,
        background:   hov ? tok.surfaceH : tok.surface,
        border:       `1px solid ${hov ? tile.color + "55" : tok.border}`,
        borderRadius: 16,
        padding:      "28px 28px",
        position:     "relative",
        overflow:     "hidden",
        opacity:      inView ? 1 : 0,
        transform:    inView ? "translateY(0)" : "translateY(24px)",
        transition:   `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms, background 0.2s, border-color 0.2s`,
        boxShadow:    hov ? `0 0 24px ${tile.color}18` : tok.cardShadow,
      }}
    >
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: 3,
        background: tile.color, borderRadius: "16px 0 0 16px",
        opacity: hov ? 1 : 0.6, transition: "opacity 0.2s",
      }} />
      <p style={{
        fontFamily: MONO, fontSize: 9, color: tile.color,
        letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 14,
      }}>
        // {tile.tag}
      </p>
      <h3 style={{
        fontFamily: SERIF, fontSize: "1.15rem", fontWeight: 700,
        color: tok.text, lineHeight: 1.2, marginBottom: 12,
      }}>
        {tile.title}
      </h3>
      <p style={{
        fontFamily: SANS, fontSize: "0.84rem",
        color: tok.muted, lineHeight: 1.72,
      }}>
        {tile.body}
      </p>
    </div>
  )
}

function ProgramTile({ tile, tok, span, delay }) {
  const ref    = useRef(null)
  const inView = useInView(ref)
  const [hov, setHov] = useState(false)

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        gridColumn:   `span ${span}`,
        background:   hov ? tok.surfaceH : tok.surface,
        border:       `1px solid ${hov ? tile.color + "66" : tok.border}`,
        borderRadius: 16,
        padding:      "24px 24px 22px",
        opacity:      inView ? 1 : 0,
        transform:    inView ? "translateY(0)" : "translateY(24px)",
        transition:   `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms, background 0.2s, border-color 0.2s`,
        boxShadow:    hov ? `0 0 20px ${tile.color}22` : tok.cardShadow,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <span style={{
          fontFamily: MONO, fontSize: 9, color: tile.color,
          letterSpacing: "0.18em", textTransform: "uppercase",
        }}>
          {tile.org}
        </span>
        <span style={{
          fontFamily: MONO, fontSize: 8,
          background: tile.color + "20",
          color: tile.color,
          padding: "3px 8px", borderRadius: 4,
          letterSpacing: "0.1em",
        }}>
          {tile.badge}
        </span>
      </div>
      <h3 style={{
        fontFamily: SERIF, fontSize: "1.05rem", fontWeight: 700,
        color: tok.text, marginBottom: 10, lineHeight: 1.25,
      }}>
        {tile.title}
      </h3>
      <p style={{
        fontFamily: SANS, fontSize: "0.82rem",
        color: tok.muted, lineHeight: 1.65, marginBottom: 14,
      }}>
        {tile.body}
      </p>
      <p style={{ fontFamily: MONO, fontSize: 9, color: tok.dim || tok.muted, letterSpacing: "0.1em" }}>
        {tile.period}
      </p>
    </div>
  )
}

function QuoteTile({ tile, tok, span, delay }) {
  const ref    = useRef(null)
  const inView = useInView(ref)

  return (
    <div
      ref={ref}
      style={{
        gridColumn:   `span ${span}`,
        background:   tok.surface,
        border:       `1px solid ${tok.border}`,
        borderRadius: 16,
        padding:      "28px 28px",
        opacity:      inView ? 1 : 0,
        transform:    inView ? "translateY(0)" : "translateY(24px)",
        transition:   `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
      }}
    >
      <p style={{
        fontFamily: SERIF, fontSize: "1rem", fontWeight: 400,
        color: tok.muted, lineHeight: 1.75, marginBottom: 14,
        fontStyle: "italic",
      }}>
        {tile.text}
      </p>
      <p style={{ fontFamily: MONO, fontSize: 9, color: tile.color, letterSpacing: "0.1em" }}>
        {tile.author}
      </p>
    </div>
  )
}

function HobbyTile({ tile, tok, span, delay }) {
  const ref    = useRef(null)
  const inView = useInView(ref)
  const [hov, setHov] = useState(false)

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        gridColumn:   `span ${span}`,
        background:   hov ? tok.surfaceH : tok.surface,
        border:       `1px solid ${hov ? tile.color + "55" : tok.border}`,
        borderRadius: 16,
        padding:      "24px 24px",
        opacity:      inView ? 1 : 0,
        transform:    inView ? "translateY(0)" : "translateY(24px)",
        transition:   `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms, background 0.2s`,
        boxShadow:    hov ? `0 0 16px ${tile.color}18` : tok.cardShadow,
      }}
    >
      <div style={{ fontSize: "1.8rem", marginBottom: 12 }}>{tile.emoji}</div>
      <h3 style={{
        fontFamily: SERIF, fontSize: "1rem", fontWeight: 700,
        color: tok.text, marginBottom: 8,
      }}>
        {tile.title}
      </h3>
      <p style={{ fontFamily: SANS, fontSize: "0.82rem", color: tok.muted, lineHeight: 1.65 }}>
        {tile.body}
      </p>
    </div>
  )
}

// ── Section nav cards (link to sub-pages) ─────────────────────────────────────

const NAV_CARDS = [
  { to: "/lifepeek/life-journey",   label: "Life Journey",   sub: "The full timeline",           accent: "#2563EB", icon: "◈" },
  { to: "/lifepeek/open-world",     label: "Open World",     sub: "Programs & fellowships feed", accent: "#06B6D4", icon: "⬡" },
  { to: "/lifepeek/touching-grass", label: "Touching Grass", sub: "Outings & hobbies feed",      accent: "#10B981", icon: "❋" },
]

function SectionNavCard({ card, tok }) {
  const [hov, setHov] = useState(false)

  return (
    <Link
      to={card.to}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        textDecoration: "none",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "space-between",
        gap:            16,
        background:     hov ? tok.surfaceH : tok.surface,
        border:         `1px solid ${hov ? card.accent + "77" : tok.border}`,
        borderRadius:   12,
        padding:        "16px 20px",
        boxShadow:      hov ? `0 0 20px ${card.accent}22` : "none",
        transform:      hov ? "translateY(-2px)" : "translateY(0)",
        transition:     "all 0.2s ease",
        flex:           1,
      }}
    >
      <div>
        <p style={{
          fontFamily: MONO, fontSize: 9, color: card.accent,
          letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 5,
        }}>
          {card.icon} {card.label}
        </p>
        <p style={{ fontFamily: SANS, fontSize: "0.8rem", color: tok.muted }}>
          {card.sub}
        </p>
      </div>
      <span style={{
        fontFamily: MONO, fontSize: 11,
        color: hov ? card.accent : tok.muted,
        transition: "color 0.2s",
        flexShrink: 0,
      }}>
        →
      </span>
    </Link>
  )
}

// ── Tile dispatcher ───────────────────────────────────────────────────────────

function Tile({ tile, tok, cols, i }) {
  const span = Math.min(tile.colSpan, cols)
  const delay = (i % cols) * 60

  switch (tile.type) {
    case "hero":     return <HeroTile    tile={tile} tok={tok} span={span} delay={delay} />
    case "stat":     return <StatTile    tile={tile} tok={tok} span={span} delay={delay} />
    case "story":    return <StoryTile   tile={tile} tok={tok} span={span} delay={delay} />
    case "program":  return <ProgramTile tile={tile} tok={tok} span={span} delay={delay} />
    case "quote":    return <QuoteTile   tile={tile} tok={tok} span={span} delay={delay} />
    case "hobby":    return <HobbyTile   tile={tile} tok={tok} span={span} delay={delay} />
    default:         return null
  }
}

function useGridCols() {
  const [cols, setCols] = useState(4)
  useEffect(() => {
    const update = () => setCols(window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 4)
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])
  return cols
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function LifePeekHub() {
  const tok  = useTokens()
  const cols = useGridCols()

  return (
    <PageShell tok={tok} title="LifePeek">

      {/* ── Hero header ──────────────────────────────────────────────────── */}
      <header style={{ maxWidth: 1100, margin: "0 auto", padding: "52px 40px 16px" }}>
        <p style={{
          fontFamily: MONO, fontSize: 10, color: tok.muted,
          letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 14,
        }}>
          // dominion.world · a window into the rest of me
        </p>
        <h1 style={{
          fontFamily: SERIF, fontSize: "clamp(2rem, 4vw, 3.2rem)",
          fontWeight: 700, color: tok.text,
          letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 12,
        }}>
          Beyond the code.
          <span style={{ color: tok.muted, fontWeight: 400 }}> This is who I actually am.</span>
        </h1>
        <p style={{
          fontFamily: SANS, fontSize: "0.92rem", color: tok.muted,
          maxWidth: 480, lineHeight: 1.65, marginBottom: 36,
        }}>
          Programs I'm in. Places I go. Things I build for fun. The full picture — not just the resume.
        </p>

        {/* Sub-page nav strip */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {NAV_CARDS.map(card => (
            <SectionNavCard key={card.to} card={card} tok={tok} />
          ))}
        </div>
      </header>

      {/* ── Divider ─────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1100, margin: "32px auto 0", padding: "0 40px" }}>
        <div style={{ height: 1, background: tok.lineColor }} />
      </div>

      {/* ── Bento grid ──────────────────────────────────────────────────── */}
      <main style={{
        maxWidth: 1100, margin: "0 auto",
        padding: "36px 40px 80px",
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: 14,
        alignItems: "start",
      }}>
        {lifepeek.map((tile, i) => (
          <Tile key={tile.id} tile={tile} tok={tok} cols={cols} i={i} />
        ))}
      </main>

    </PageShell>
  )
}
