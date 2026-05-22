import { useRef, useState, useEffect } from "react"
import { useTokens, useInView, PageShell, PageHeader, MONO, SERIF, SANS } from "./shared"
import { lifejourney } from "../../data"

// ── Type → color fallback ──────────────────────────────────────────────────
const TYPE_COLOR = {
  milestone:  "#2563EB",
  program:    "#8B5CF6",
  experience: "#EF4444",
  future:     null,
}

// ── Single milestone dot + card ───────────────────────────────────────────
function MilestoneStop({ item, index, tok }) {
  const ref    = useRef(null)
  const inView = useInView(ref, 0.1)
  const [hov, setHov] = useState(false)

  const above  = index % 2 === 0
  const color  = item.color || TYPE_COLOR[item.type] || tok.muted
  const future = item.type === "future"

  const cardStyle = {
    position: "absolute",
    [above ? "bottom" : "top"]: 32,
    left: "50%",
    transform: `translateX(-50%) ${inView ? "translateY(0)" : above ? "translateY(-20px)" : "translateY(20px)"}`,
    opacity:   inView ? 1 : 0,
    transition: `opacity 0.5s ease ${index * 60}ms, transform 0.5s ease ${index * 60}ms`,
    width: 180,
    background:   hov ? tok.surfaceH : tok.surface,
    border:       `1px solid ${hov ? color + "88" : tok.border}`,
    borderRadius: 12,
    padding:      "14px 16px",
    boxShadow:    hov ? `0 0 20px ${color}22` : tok.cardShadow,
    cursor:       "default",
    pointerEvents: "auto",
  }

  return (
    <div
      ref={ref}
      style={{
        position:      "relative",
        display:       "flex",
        flexDirection: "column",
        alignItems:    "center",
        minWidth:      200,
        flexShrink:    0,
        height:        "100%",
      }}
    >
      {/* Connector line vertical */}
      <div style={{
        position:   "absolute",
        left:       "50%",
        transform:  "translateX(-50%)",
        width:      1,
        top:        above ? "50%" : 0,
        bottom:     above ? 0 : "50%",
        background: `linear-gradient(to ${above ? "bottom" : "top"}, ${color}88, transparent)`,
        opacity:    inView ? 1 : 0,
        transition: `opacity 0.4s ease ${index * 60}ms`,
      }} />

      {/* Dot */}
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          position:   "absolute",
          top:        "50%",
          left:       "50%",
          transform:  "translate(-50%, -50%)",
          width:      future ? 14 : 12,
          height:     future ? 14 : 12,
          borderRadius: "50%",
          background:   future ? "transparent" : color,
          border:       future ? `2px dashed ${tok.muted}` : `3px solid ${tok.bg}`,
          boxShadow:    future ? "none" : `0 0 0 2px ${color}`,
          zIndex:       2,
          transition:   "transform 0.2s",
          ...(hov && !future ? { transform: "translate(-50%, -50%) scale(1.35)" } : {}),
        }}
      />

      {/* Card */}
      <div
        style={cardStyle}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
          <span style={{
            fontFamily:    MONO, fontSize: 8,
            color:         color, letterSpacing: "0.14em",
            textTransform: "uppercase",
            opacity:       future ? 0.5 : 1,
          }}>
            {item.tag}
          </span>
        </div>

        <p style={{
          fontFamily:    SERIF, fontSize: "0.9rem", fontWeight: 600,
          color:         future ? tok.muted : tok.text,
          lineHeight:    1.25, marginBottom: 8,
          fontStyle:     future ? "italic" : "normal",
        }}>
          {item.title}
        </p>

        <span style={{
          fontFamily: MONO, fontSize: 8,
          color:      tok.dim, letterSpacing: "0.1em",
        }}>
          {item.date}
        </span>

        {future && (
          <div style={{
            marginTop: 8,
            fontFamily: MONO, fontSize: 8,
            color:      tok.dim, letterSpacing: "0.12em",
          }}>
            · · · incoming
          </div>
        )}
      </div>
    </div>
  )
}

// ── Timeline track ────────────────────────────────────────────────────────
function HorizontalTimeline({ tok }) {
  const trackRef = useRef(null)
  const isDown   = useRef(false)
  const startX   = useRef(0)
  const scrollL  = useRef(0)

  // wheel → horizontal scroll
  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const onWheel = e => {
      e.preventDefault()
      el.scrollLeft += e.deltaY
    }
    el.addEventListener("wheel", onWheel, { passive: false })
    return () => el.removeEventListener("wheel", onWheel)
  }, [])

  const onMouseDown = e => {
    isDown.current  = true
    startX.current  = e.pageX - trackRef.current.offsetLeft
    scrollL.current = trackRef.current.scrollLeft
    trackRef.current.style.cursor = "grabbing"
  }
  const onMouseLeave = () => {
    isDown.current = false
    if (trackRef.current) trackRef.current.style.cursor = "grab"
  }
  const onMouseUp = () => {
    isDown.current = false
    if (trackRef.current) trackRef.current.style.cursor = "grab"
  }
  const onMouseMove = e => {
    if (!isDown.current) return
    e.preventDefault()
    const x    = e.pageX - trackRef.current.offsetLeft
    const walk = (x - startX.current) * 1.2
    trackRef.current.scrollLeft = scrollL.current - walk
  }

  return (
    <div style={{
      position:   "relative",
      width:      "100%",
      userSelect: "none",
    }}>
      {/* Fade edges */}
      <div style={{
        position:   "absolute", left: 0, top: 0, bottom: 0, width: 80, zIndex: 2,
        background: `linear-gradient(to right, ${tok.bg}, transparent)`,
        pointerEvents: "none",
      }} />
      <div style={{
        position:   "absolute", right: 0, top: 0, bottom: 0, width: 80, zIndex: 2,
        background: `linear-gradient(to left, ${tok.bg}, transparent)`,
        pointerEvents: "none",
      }} />

      {/* Track */}
      <div
        ref={trackRef}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        style={{
          display:        "flex",
          alignItems:     "center",
          overflowX:      "auto",
          overflowY:      "hidden",
          scrollbarWidth: "none",
          cursor:         "grab",
          height:         340,
          padding:        "0 80px",
          position:       "relative",
        }}
      >
        {/* Hide scrollbar webkit */}
        <style>{`::-webkit-scrollbar { display: none; }`}</style>

        {/* Horizontal center line */}
        <div style={{
          position:   "absolute",
          left:       80, right: 80,
          top:        "50%", transform: "translateY(-50%)",
          height:     1,
          background: tok.lineColor,
        }} />

        {/* Milestones */}
        {lifejourney.map((item, i) => (
          <MilestoneStop key={item.id} item={item} index={i} tok={tok} />
        ))}
      </div>

      {/* Hint */}
      <p style={{
        textAlign:  "center", marginTop: 16,
        fontFamily: MONO, fontSize: 9,
        color:      tok.dim, letterSpacing: "0.14em",
      }}>
        ← drag or scroll to explore →
      </p>
    </div>
  )
}

// ── Count stat strip ──────────────────────────────────────────────────────
function StatStrip({ tok }) {
  const counts = {
    Programs:    lifejourney.filter(m => m.type === "program").length,
    Milestones:  lifejourney.filter(m => m.type === "milestone").length,
    Experiences: lifejourney.filter(m => m.type === "experience").length,
  }

  return (
    <div style={{
      display: "flex", gap: 32, flexWrap: "wrap",
      padding: "0 40px 52px",
      maxWidth: 1100, margin: "0 auto",
    }}>
      {Object.entries(counts).map(([label, count]) => (
        <div key={label}>
          <span style={{ fontFamily: SERIF, fontSize: "2rem", fontWeight: 700, color: tok.text }}>
            {count}
          </span>
          <span style={{
            fontFamily: MONO, fontSize: 9,
            color: tok.muted, letterSpacing: "0.14em", textTransform: "uppercase",
            display: "block", marginTop: 2,
          }}>
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}

// ── Legend ────────────────────────────────────────────────────────────────
function Legend({ tok }) {
  const types = [
    { label: "Milestone",  color: "#2563EB" },
    { label: "Program",    color: "#8B5CF6" },
    { label: "Experience", color: "#EF4444" },
    { label: "Future",     color: tok.muted, dashed: true },
  ]

  return (
    <div style={{
      maxWidth: 1100, margin: "0 auto",
      padding: "0 40px 28px",
      display: "flex", gap: 24, flexWrap: "wrap",
    }}>
      {types.map(t => (
        <div key={t.label} style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <div style={{
            width: 8, height: 8, borderRadius: "50%",
            background:  t.dashed ? "transparent" : t.color,
            border:      t.dashed ? `2px dashed ${t.color}` : `2px solid ${tok.bg}`,
            boxShadow:   t.dashed ? "none" : `0 0 0 2px ${t.color}`,
            flexShrink: 0,
          }} />
          <span style={{ fontFamily: MONO, fontSize: 9, color: tok.muted, letterSpacing: "0.1em" }}>
            {t.label}
          </span>
        </div>
      ))}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────
export default function LifeJourney() {
  const tok = useTokens()

  return (
    <PageShell tok={tok} title="Life Journey">
      <PageHeader
        tok={tok}
        label="life-journey"
        title="The Timeline"
        subtitle="Every program, milestone, and moment that built who I am. Drag to explore."
        accent="#2563EB"
      />

      <StatStrip tok={tok} />
      <Legend tok={tok} />

      <div style={{
        maxWidth: "100%",
        padding:  "0 0 80px",
        overflow: "hidden",
      }}>
        <HorizontalTimeline tok={tok} />
      </div>
    </PageShell>
  )
}
