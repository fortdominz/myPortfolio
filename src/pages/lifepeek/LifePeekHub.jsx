import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useTokens, useClock, useInView, PageShell, MONO, SERIF, SANS } from "./shared"

const CARDS = [
  {
    to:       "/lifepeek/life-journey",
    label:    "// life-journey",
    title:    "Life Journey",
    sub:      "The full timeline — programs, milestones, and what's next.",
    accent:   "#2563EB",
    icon:     "◈",
    stat:     "11 milestones",
  },
  {
    to:       "/lifepeek/open-world",
    label:    "// open-world",
    title:    "Open World",
    sub:      "Programs, fellowships, accelerators. Every room I've been let into.",
    accent:   "#06B6D4",
    icon:     "⬡",
    stat:     "1 post",
  },
  {
    to:       "/lifepeek/touching-grass",
    label:    "// touching-grass",
    title:    "Touching Grass",
    sub:      "Outside the screen. Outings, hobbies, and the city I'm learning.",
    accent:   "#10B981",
    icon:     "❋",
    stat:     "1 post",
  },
]

function HubCard({ card, tok, delay }) {
  const ref    = useRef(null)
  const inView = useInView(ref)
  const [hov, setHov] = useState(false)

  return (
    <Link
      ref={ref}
      to={card.to}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        textDecoration: "none",
        display:        "block",
        background:     hov ? tok.surfaceH : tok.surface,
        border:         `1px solid ${hov ? card.accent + "88" : tok.border}`,
        borderRadius:   20,
        padding:        "36px 32px 32px",
        position:       "relative",
        overflow:       "hidden",
        boxShadow:      hov
          ? `0 0 40px ${card.accent}28, ${tok.cardShadow}`
          : tok.cardShadow,
        transform:      hov ? "translateY(-6px)" :
                        inView ? "translateY(0)" : "translateY(32px)",
        opacity:        inView ? 1 : 0,
        transition:     `all 0.3s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms`,
      }}
    >
      {/* Top accent bar */}
      <div style={{
        position:   "absolute",
        top:        0, left: 0, right: 0,
        height:     3,
        background: `linear-gradient(to right, ${card.accent}, ${card.accent}44)`,
        opacity:    hov ? 1 : 0.55,
        transition: "opacity 0.3s",
      }} />

      {/* Big background icon */}
      <div style={{
        position:   "absolute",
        bottom:     -10, right: 20,
        fontSize:   "8rem",
        color:      card.accent + "0D",
        fontFamily: MONO,
        lineHeight: 1,
        userSelect: "none",
        transition: "color 0.3s",
        ...(hov ? { color: card.accent + "18" } : {}),
      }}>
        {card.icon}
      </div>

      {/* Label */}
      <p style={{
        fontFamily:    MONO, fontSize: 9,
        color:         card.accent, letterSpacing: "0.18em",
        textTransform: "uppercase", marginBottom: 20,
      }}>
        {card.label}
      </p>

      {/* Title */}
      <h2 style={{
        fontFamily:  SERIF, fontSize: "clamp(1.7rem, 3vw, 2.2rem)",
        fontWeight:  700, color: tok.text,
        letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 14,
      }}>
        {card.title}
      </h2>

      {/* Sub */}
      <p style={{
        fontFamily: SANS, fontSize: "0.88rem",
        color: tok.muted, lineHeight: 1.65,
        maxWidth: 280, marginBottom: 28,
      }}>
        {card.sub}
      </p>

      {/* Footer row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{
          fontFamily: MONO, fontSize: 9,
          color:      tok.dim, letterSpacing: "0.12em",
        }}>
          {card.stat}
        </span>
        <span style={{
          fontFamily:  MONO, fontSize: 10,
          color:       hov ? card.accent : tok.muted,
          letterSpacing: "0.08em",
          transition: "color 0.2s",
        }}>
          enter →
        </span>
      </div>
    </Link>
  )
}

export default function LifePeekHub() {
  const tok   = useTokens()
  const clock = useClock()

  return (
    <PageShell tok={tok} title="LifePeek">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section style={{
        maxWidth: 1100, margin: "0 auto",
        padding: "72px 40px 56px",
      }}>
        <p style={{
          fontFamily:    MONO, fontSize: 10,
          color:         "var(--accent)", letterSpacing: "0.22em",
          textTransform: "uppercase", marginBottom: 20,
        }}>
          // lifepeek
        </p>

        <h1 style={{
          fontFamily:   SERIF,
          fontSize:     "clamp(3rem, 6vw, 5.2rem)",
          fontWeight:   800,
          color:        tok.text,
          letterSpacing: "-0.03em",
          lineHeight:   1.0,
          marginBottom: 22,
        }}>
          The life<br />
          <span style={{ color: "var(--accent)" }}>behind</span> the code.
        </h1>

        <p style={{
          fontFamily: SANS, fontSize: "1rem",
          color: tok.muted, maxWidth: 480,
          lineHeight: 1.7, marginBottom: 0,
        }}>
          Not just a portfolio — a record. The programs, the moments, the places,
          and the person building all of it.
        </p>
      </section>

      {/* Divider */}
      <div style={{
        maxWidth: 1100, margin: "0 auto", padding: "0 40px",
      }}>
        <div style={{ height: 1, background: tok.lineColor }} />
      </div>

      {/* ── Cards grid ──────────────────────────────────────────────────── */}
      <section style={{
        maxWidth: 1100, margin: "0 auto",
        padding: "52px 40px 80px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: 20,
      }}>
        {CARDS.map((card, i) => (
          <HubCard key={card.to} card={card} tok={tok} delay={i * 80} />
        ))}
      </section>

      {/* ── Footer note ─────────────────────────────────────────────────── */}
      <div style={{
        maxWidth: 1100, margin: "0 auto",
        padding: "0 40px 60px",
        display: "flex", alignItems: "center", gap: 12,
      }}>
        <span style={{ fontFamily: MONO, fontSize: 9, color: tok.dim, letterSpacing: "0.12em" }}>
          {clock}
        </span>
        <span style={{ color: tok.dim, fontFamily: MONO, fontSize: 9 }}>·</span>
        <span style={{ fontFamily: MONO, fontSize: 9, color: tok.dim, letterSpacing: "0.1em" }}>
          phase-1 · static content · phase-2 adds live posting
        </span>
      </div>
    </PageShell>
  )
}
