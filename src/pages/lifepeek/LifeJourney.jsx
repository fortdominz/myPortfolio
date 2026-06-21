import { useRef, useState, useEffect, useLayoutEffect, useCallback } from "react"
import { Link } from "react-router-dom"
import { lifejourney } from "../../data"
import { SpaceBackground } from "./cosmic"

/* ── Life Journey · scroll-driven cosmic roadmap ─────────────────────────────
   Space + moon theme: a live, interactive starfield (parallax to the cursor,
   twinkle, shooting stars, a glowing moon, drifting nebula). The trail is a
   winding "snake" path on desktop and a clean single column on mobile. A
   glowing driver rides the path as you scroll; the checkpoint it reaches
   auto-opens. Click → a detail modal (prev/next). Phases group the eras, a
   desktop mini-map jumps anywhere, ongoing programs show a live badge. ───── */

const MONO = "'JetBrains Mono', monospace"
const SERIF = "'Fraunces', Georgia, serif"
const SANS = "'Geist', system-ui, sans-serif"

const MOON = "#CFE0FF"
const LIGHT = "#EAF1FF"
const MUT = "rgba(188,205,236,0.74)"
const DIM = "rgba(150,172,210,0.5)"
const LIVE = "#7EE0BE"

const TYPE_HUE = { milestone: "#8FB8FF", program: "#A9A6FF", experience: "#86E0C0", future: "#9FB0D8" }

const PLAYHEAD = 0.42
const PAD_TOP = 90
const PAD_BOT = 220
const GAP = 26
const N = lifejourney.length

const realms = [
  { to: "/lifepeek/life-journey",   label: "Life Journey" },
  { to: "/lifepeek/open-world",     label: "Open World" },
  { to: "/lifepeek/touching-grass", label: "Touching Grass" },
]

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v))

function lengthAtY(path, targetY, total) {
  let lo = 0, hi = total
  for (let k = 0; k < 22; k++) {
    const mid = (lo + hi) / 2
    if (path.getPointAtLength(mid).y < targetY) lo = mid
    else hi = mid
  }
  return (lo + hi) / 2
}

function useMedia(query) {
  const [match, setMatch] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setMatch(mq.matches)
    on()
    mq.addEventListener("change", on)
    return () => mq.removeEventListener("change", on)
  }, [query])
  return match
}

function buildPath(pts) {
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y}`
  for (let i = 1; i < pts.length; i++) {
    const midY = (pts[i - 1].y + pts[i].y) / 2
    d += ` C ${pts[i - 1].x.toFixed(1)} ${midY}, ${pts[i].x.toFixed(1)} ${midY}, ${pts[i].x.toFixed(1)} ${pts[i].y}`
  }
  return d
}

// Always a snake with cards alternating left/right of the curve. The swing and
// card width scale with the viewport; on small screens cards just get narrower
// (never all on one side). Root has overflowX:hidden so tiny screens never scroll.
function geometry(W, SEG) {
  const centerX = W / 2
  const A = clamp(W * 0.12, 42, 165)
  const cardW = clamp(centerX - A - GAP - 8, 96, 420)
  const pts = [], cards = []
  for (let i = 0; i < N; i++) {
    pts.push({ x: centerX + A * (i % 2 ? 1 : -1), y: PAD_TOP + i * SEG })
    cards.push({ side: i % 2 ? "right" : "left", cardW })
  }
  return { pts, cards, d: buildPath(pts), labelX: centerX, labelCenter: true }
}

/* ── Live cosmic background ── */
/* SpaceBackground is now the shared living-sky from ./cosmic */

export default function LifeJourney() {
  const containerRef = useRef(null)
  const nodeRefs = useRef([])
  const [driverY, setDriverY] = useState(0)
  const [active, setActive] = useState(0)
  const [openId, setOpenId] = useState(null)

  const wide = useMedia("(min-width: 1024px)")
  const reduced = useMedia("(prefers-reduced-motion: reduce)")
  const motion = a => (reduced ? "none" : a)

  useEffect(() => {
    document.title = "Life Journey — LifePeek · Dominion Eze"
    return () => { document.title = "Dominion Eze — AI Engineer & System Architect" }
  }, [])

  const registerNode = useCallback((i, el) => { nodeRefs.current[i] = el }, [])

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const cont = containerRef.current
      if (!cont) return
      const rect = cont.getBoundingClientRect()
      const playhead = window.innerHeight * PLAYHEAD
      setDriverY(clamp(playhead - rect.top, 0, rect.height))
      let best = 0, bd = Infinity
      nodeRefs.current.forEach((el, i) => {
        if (!el) return
        const r = el.getBoundingClientRect()
        const c = r.top + r.height / 2
        const d = Math.abs(c - playhead)
        if (d < bd) { bd = d; best = i }
      })
      setActive(best)
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const focusCheckpoint = i => {
    const el = nodeRefs.current[i]
    if (el) el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" })
  }

  const openIndex = openId == null ? -1 : lifejourney.findIndex(x => x.id === openId)
  const navModal = dir => {
    const ni = openIndex + dir
    if (ni >= 0 && ni < lifejourney.length) setOpenId(lifejourney[ni].id)
  }

  const stats = [
    { v: lifejourney.length, l: "Checkpoints" },
    { v: lifejourney.filter(x => x.type === "program").length, l: "Programs & fellowships" },
    { v: lifejourney.filter(x => x.ongoing).length, l: "Active right now" },
    { v: "4.0", l: "GPA" },
  ]

  return (
    <div style={{ minHeight: "100vh", position: "relative", color: LIGHT, fontFamily: SANS, overflowX: "hidden" }}>
      <SpaceBackground reduced={reduced} theme="aurora" />

      {wide && <MiniMap active={active} onJump={focusCheckpoint} />}

      <div style={{ position: "relative", zIndex: 1 }}>
        <nav style={{
          position: "sticky", top: 0, zIndex: 50,
          background: "rgba(6,11,28,0.66)", backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(180,200,255,0.1)",
          padding: "0 22px", height: 54, display: "flex", alignItems: "center",
          justifyContent: "space-between", gap: 16,
        }}>
          <Link to="/lifepeek" style={{ fontFamily: MONO, fontSize: 11, color: MOON, opacity: 0.85, textDecoration: "none", letterSpacing: "0.1em", display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}>← ☾ LifePeek</Link>
          <div style={{ display: "flex", gap: 18, overflow: "hidden" }}>
            {realms.map(r => {
              const on = r.to === "/lifepeek/life-journey"
              return (
                <Link key={r.to} to={r.to} style={{
                  fontFamily: MONO, fontSize: "0.66rem", letterSpacing: "0.06em", textTransform: "uppercase",
                  color: on ? LIGHT : MUT, textDecoration: "none", whiteSpace: "nowrap",
                  borderBottom: on ? "1px solid rgba(190,220,255,0.8)" : "1px solid transparent", paddingBottom: 3,
                }}>{r.label}</Link>
              )
            })}
          </div>
          <span style={{ fontFamily: MONO, fontSize: 10, color: DIM, letterSpacing: "0.08em", whiteSpace: "nowrap" }}>{active + 1} / {N}</span>
        </nav>

        <header style={{ maxWidth: 760, margin: "0 auto", padding: "58px 24px 22px" }}>
          <p style={{ fontFamily: MONO, fontSize: 10, color: MOON, letterSpacing: "0.24em", textTransform: "uppercase", marginBottom: 14 }}>☾ Life Journey</p>
          <h1 style={{ fontFamily: SERIF, fontSize: "clamp(2rem, 5vw, 3.4rem)", fontWeight: 700, color: LIGHT, lineHeight: 1.08, marginBottom: 16 }}>
            Lagos to here, one<br />checkpoint at a time.
          </h1>
          <p style={{ fontSize: "0.94rem", color: MUT, lineHeight: 1.7, maxWidth: 480 }}>
            Every program, milestone, and turning point that built who I am. Follow the trail down —
            the marker rides the path and each checkpoint opens as you reach it. Tap any one for the full story.
          </p>
        </header>

        <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px 34px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(128px, 1fr))", gap: 12 }}>
          {stats.map(s => (
            <div key={s.l} style={{ background: "rgba(140,170,255,0.05)", border: "1px solid rgba(170,195,255,0.14)", borderRadius: 10, padding: "12px 14px" }}>
              <div style={{ fontFamily: SERIF, fontSize: "1.7rem", fontWeight: 700, color: LIGHT, lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontFamily: MONO, fontSize: 9, color: MUT, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 6 }}>{s.l}</div>
            </div>
          ))}
        </div>

        <Roadmap
          containerRef={containerRef} registerNode={registerNode}
          driverY={driverY} active={active} reduced={reduced} motion={motion}
          onOpen={setOpenId}
        />
      </div>

      {openIndex >= 0 && (
        <DetailModal item={lifejourney[openIndex]} index={openIndex} total={N} reduced={reduced} onClose={() => setOpenId(null)} onNav={navModal} />
      )}

      <style>{`
        @keyframes lj-nebula { 0%,100% { opacity: 0.7; transform: translate(0,0); } 50% { opacity: 1; transform: translate(2%,-1%); } }
        @keyframes lj-moon { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes lj-pulse { 0% { opacity: 0.7; transform: translate(-50%,-50%) scale(0.6); } 100% { opacity: 0; transform: translate(-50%,-50%) scale(1.8); } }
        @keyframes lj-live { 0%,100% { opacity: 1; } 50% { opacity: 0.35; } }
        @keyframes lj-fade { 0% { opacity: 0; } 100% { opacity: 1; } }
        @keyframes lj-pop { 0% { opacity: 0; transform: translateY(14px) scale(0.97); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>
    </div>
  )
}

function Roadmap({ containerRef, registerNode, driverY, active, reduced, motion, onOpen }) {
  const pathRef = useRef(null)
  const totalLenRef = useRef(0)
  const [W, setW] = useState(0)
  const [totalLen, setTotalLen] = useState(0)
  const [pt, setPt] = useState({ x: 0, y: 0, len: 0 })

  const SEG = 340
  const TOTAL_H = PAD_TOP + (N - 1) * SEG + PAD_BOT
  const geo = W > 0 ? geometry(W, SEG) : null

  useLayoutEffect(() => {
    const m = () => { if (containerRef.current) setW(containerRef.current.clientWidth) }
    m()
    window.addEventListener("resize", m)
    return () => window.removeEventListener("resize", m)
  }, [containerRef])

  useEffect(() => {
    if (pathRef.current && W > 0) {
      const L = pathRef.current.getTotalLength()
      totalLenRef.current = L
      setTotalLen(L)
    }
  }, [W])

  useEffect(() => {
    const path = pathRef.current, total = totalLenRef.current
    if (path && total > 0) {
      const len = lengthAtY(path, driverY, total)
      const p = path.getPointAtLength(len)
      setPt({ x: p.x, y: p.y, len })
    }
  }, [driverY, totalLen])

  return (
    <div ref={containerRef} style={{ position: "relative", maxWidth: 980, margin: "0 auto", height: TOTAL_H }}>
      {geo && (
        <>
          <svg width={W} height={TOTAL_H} viewBox={`0 0 ${W} ${TOTAL_H}`} style={{ position: "absolute", left: 0, top: 0, overflow: "visible", pointerEvents: "none" }}>
            <path d={geo.d} stroke="rgba(165,190,255,0.16)" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path ref={pathRef} d={geo.d} stroke="#BFD2FF" strokeWidth="2.5" fill="none" strokeLinecap="round"
              strokeDasharray={totalLen} strokeDashoffset={Math.max(0, totalLen - pt.len)}
              style={{ filter: "drop-shadow(0 0 6px rgba(170,200,255,0.8))" }} />
          </svg>

          {lifejourney.map((item, i) => {
            if (i !== 0 && lifejourney[i - 1].phase === item.phase) return null
            return (
              <div key={`ph-${i}`} style={{
                position: "absolute", top: geo.pts[i].y - 56,
                left: geo.labelX,
                transform: geo.labelCenter ? "translateX(-50%)" : "none",
                fontFamily: MONO, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase",
                color: MOON, opacity: 0.85, whiteSpace: "nowrap",
              }}>◇ {item.phase}</div>
            )
          })}

          {/* Driver */}
          <div style={{ position: "absolute", left: pt.x, top: pt.y, transform: "translate(-50%,-50%)", zIndex: 5, pointerEvents: "none" }}>
            <div style={{ position: "absolute", left: "50%", top: "50%", width: 32, height: 32, transform: "translate(-50%,-50%)", borderRadius: "50%", border: "1px solid rgba(195,218,255,0.5)", animation: motion("lj-pulse 1.8s ease-out infinite") }} />
            <div style={{ width: 16, height: 16, borderRadius: "50%", background: LIGHT, boxShadow: "0 0 18px 5px rgba(170,205,255,0.85)" }} />
          </div>

          {lifejourney.map((item, i) => (
            <Checkpoint key={item.id} item={item} index={i} active={active === i}
              pt={geo.pts[i]} layout={geo.cards[i]} registerNode={registerNode} reduced={reduced} onClick={() => onOpen(item.id)} />
          ))}
        </>
      )}
    </div>
  )
}

function LiveBadge({ reduced }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontFamily: MONO, fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: LIVE, padding: "2px 8px", borderRadius: 20, background: "rgba(126,224,190,0.1)", border: "1px solid rgba(126,224,190,0.35)" }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: LIVE, animation: reduced ? "none" : "lj-live 1.4s ease-in-out infinite" }} />
      Active now
    </span>
  )
}

function MiniMap({ active, onJump }) {
  const [hover, setHover] = useState(-1)
  return (
    <div style={{ position: "fixed", right: 20, top: "50%", transform: "translateY(-50%)", zIndex: 40, display: "flex", flexDirection: "column" }}>
      {lifejourney.map((item, i) => {
        const on = active === i
        const newPhase = i > 0 && lifejourney[i - 1].phase !== item.phase
        return (
          <div key={item.id} style={{ marginTop: newPhase ? 14 : 0, display: "flex", justifyContent: "flex-end" }}>
            <button onClick={() => onJump(i)} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(-1)} aria-label={item.title}
              style={{ position: "relative", background: "none", border: "none", cursor: "pointer", padding: "6px 4px", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
              {hover === i && (
                <span style={{ position: "absolute", right: "calc(100% + 8px)", whiteSpace: "nowrap", background: "rgba(10,18,38,0.96)", border: "1px solid rgba(190,215,255,0.3)", borderRadius: 7, padding: "5px 10px", fontFamily: MONO, fontSize: 10, color: LIGHT, letterSpacing: "0.04em", boxShadow: "0 8px 24px rgba(0,0,0,0.45)" }}>
                  {item.title} · <span style={{ color: DIM }}>{item.date}</span>
                </span>
              )}
              <span style={{ width: on ? 12 : 8, height: on ? 12 : 8, borderRadius: "50%", background: on ? LIGHT : item.ongoing ? "rgba(126,224,190,0.55)" : "rgba(150,180,250,0.3)", border: on ? "none" : "1px solid rgba(170,195,255,0.3)", boxShadow: on ? "0 0 12px rgba(170,205,255,0.9)" : "none", transition: "all 0.25s" }} />
            </button>
          </div>
        )
      })}
    </div>
  )
}

function Checkpoint({ item, index, active, pt, layout, registerNode, reduced, onClick }) {
  const hue = item.color || TYPE_HUE[item.type] || MOON
  const future = item.type === "future"
  const left = layout.side === "left"

  const cardStyle = left
    ? { right: `calc(100% - ${pt.x - GAP}px)`, width: layout.cardW }
    : { left: pt.x + GAP, width: layout.cardW }

  // connector from the node to the card edge
  const connector = left
    ? { left: pt.x - GAP, width: GAP }
    : { left: pt.x, width: GAP }

  return (
    <>
      <div ref={el => registerNode(index, el)} style={{
        position: "absolute", left: pt.x, top: pt.y, transform: "translate(-50%,-50%)", zIndex: 3,
        width: active ? 18 : 13, height: active ? 18 : 13, borderRadius: "50%",
        background: future ? "transparent" : active ? LIGHT : item.ongoing ? "rgba(126,224,190,0.6)" : "rgba(150,185,250,0.45)",
        border: future ? "2px dashed rgba(170,200,245,0.6)" : "2px solid rgba(165,200,255,0.65)",
        boxShadow: active ? "0 0 18px rgba(170,205,255,0.85)" : "none",
        transition: "all 0.3s cubic-bezier(0.2,0.8,0.2,1)",
      }} />

      <div style={{ position: "absolute", top: pt.y, left: connector.left, width: connector.width, height: 1, background: "rgba(170,200,255,0.3)", zIndex: 2 }} />

      <button onClick={onClick} style={{
        position: "absolute", top: pt.y - 26, ...cardStyle, textAlign: "left", cursor: "pointer", display: "block",
        background: active ? "rgba(140,175,255,0.1)" : "rgba(9,16,34,0.62)",
        border: `1px solid ${active ? "rgba(190,215,255,0.6)" : "rgba(170,195,255,0.15)"}`,
        borderRadius: 14, padding: "14px 18px", backdropFilter: "blur(10px)",
        boxShadow: active ? "0 14px 50px rgba(8,16,44,0.55), 0 0 40px rgba(120,160,255,0.08)" : "0 6px 20px rgba(0,0,0,0.28)",
        transition: "background 0.35s, border-color 0.35s, box-shadow 0.35s", zIndex: active ? 4 : 3,
      }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(190,215,255,0.55)" }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = active ? "rgba(190,215,255,0.6)" : "rgba(170,195,255,0.15)" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
          <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: hue, padding: "2px 8px", borderRadius: 4, background: `${hue}1A`, border: `1px solid ${hue}40` }}>{item.tag}</span>
          <span style={{ fontFamily: MONO, fontSize: 10, color: DIM, letterSpacing: "0.1em" }}>{item.date}</span>
          {item.ongoing && <LiveBadge reduced={reduced} />}
        </div>
        <h3 style={{ fontFamily: SERIF, fontSize: "1.1rem", fontWeight: 600, color: future ? MUT : LIGHT, lineHeight: 1.25, fontStyle: future ? "italic" : "normal" }}>{item.title}</h3>
        <div style={{ maxHeight: active ? 360 : 0, opacity: active ? 1 : 0, overflow: "hidden", transition: "max-height 0.5s cubic-bezier(0.2,0.8,0.2,1), opacity 0.4s ease, margin-top 0.4s ease", marginTop: active ? 11 : 0 }}>
          <p style={{ fontSize: "0.84rem", color: MUT, lineHeight: 1.65, fontFamily: SANS, marginBottom: item.points?.length ? 11 : 0 }}>{item.summary}</p>
          {item.points?.length > 0 && (
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
              {item.points.map((p, k) => (
                <li key={k} style={{ display: "flex", gap: 8, fontSize: "0.78rem", color: "rgba(202,216,242,0.82)", fontFamily: SANS, lineHeight: 1.5 }}><span style={{ color: hue, flexShrink: 0 }}>◆</span>{p}</li>
              ))}
            </ul>
          )}
          <span style={{ fontFamily: MONO, fontSize: 10, color: hue, letterSpacing: "0.08em" }}>Read the full story →</span>
        </div>
        {!active && <p style={{ fontFamily: MONO, fontSize: 9, color: DIM, letterSpacing: "0.1em", marginTop: 8 }}>▸ tap to read more</p>}
      </button>
    </>
  )
}

function DetailModal({ item, index, total, reduced, onClose, onNav }) {
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = e => {
      if (e.key === "Escape") onClose()
      else if (e.key === "ArrowLeft") onNav(-1)
      else if (e.key === "ArrowRight") onNav(1)
    }
    window.addEventListener("keydown", onKey)
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey) }
  }, [onClose, onNav])

  const hue = item.color || TYPE_HUE[item.type] || MOON
  const navBtn = (dir, label) => {
    const disabled = dir < 0 ? index === 0 : index === total - 1
    return (
      <button onClick={() => !disabled && onNav(dir)} disabled={disabled} style={{
        fontFamily: MONO, fontSize: "0.72rem", letterSpacing: "0.06em", color: disabled ? DIM : LIGHT, cursor: disabled ? "default" : "pointer",
        background: "none", border: "1px solid " + (disabled ? "rgba(170,195,255,0.12)" : "rgba(190,215,255,0.3)"), borderRadius: 8, padding: "8px 13px", opacity: disabled ? 0.5 : 1,
      }}>{label}</button>
    )
  }

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, background: "rgba(3,7,18,0.64)", backdropFilter: "blur(6px)", animation: reduced ? "none" : "lj-fade 0.25s ease both" }}>
      <div key={item.id} onClick={e => e.stopPropagation()} style={{ position: "relative", width: "min(620px, 94vw)", maxHeight: "86vh", overflowY: "auto", background: "rgba(9,16,34,0.97)", border: "1px solid rgba(190,215,255,0.3)", borderRadius: 16, padding: "30px 32px", backdropFilter: "blur(24px)", boxShadow: "0 40px 100px rgba(0,0,0,0.62), 0 0 60px rgba(120,160,255,0.1)", animation: reduced ? "none" : "lj-pop 0.35s cubic-bezier(0.2,0.8,0.2,1) both" }}>
        <span style={{ position: "absolute", top: 6, right: 26, fontFamily: SERIF, fontSize: "5.5rem", fontWeight: 700, color: "rgba(190,215,255,0.06)", lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>{String(index + 1).padStart(2, "0")}</span>
        <button onClick={onClose} style={{ position: "absolute", top: 18, right: 18, zIndex: 2, background: "none", border: "1px solid rgba(180,210,255,0.32)", borderRadius: 8, color: MOON, width: 32, height: 32, cursor: "pointer", fontSize: "1.1rem", lineHeight: 1 }}>×</button>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
          <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: hue, padding: "3px 9px", borderRadius: 4, background: `${hue}1A`, border: `1px solid ${hue}40` }}>{item.tag}</span>
          <span style={{ fontFamily: MONO, fontSize: 10, color: DIM, letterSpacing: "0.1em" }}>{item.date}</span>
          {item.ongoing && <LiveBadge reduced={reduced} />}
        </div>
        <h2 style={{ fontFamily: SERIF, fontSize: "1.8rem", fontWeight: 700, color: LIGHT, lineHeight: 1.15, marginBottom: 18, maxWidth: "84%" }}>{item.title}</h2>
        {(item.detail || item.summary).split("\n\n").map((para, i) => (
          <p key={i} style={{ fontSize: "0.92rem", color: "rgba(208,222,245,0.82)", lineHeight: 1.75, fontFamily: SANS, marginBottom: 14 }}>{para}</p>
        ))}
        {item.points?.length > 0 && (
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 9, margin: "18px 0 4px", paddingTop: 18, borderTop: "1px solid rgba(180,210,255,0.12)" }}>
            {item.points.map((p, k) => (
              <li key={k} style={{ display: "flex", gap: 11, fontSize: "0.86rem", color: "rgba(208,222,245,0.9)", fontFamily: SANS, lineHeight: 1.55 }}><span style={{ color: hue, flexShrink: 0 }}>◆</span>{p}</li>
            ))}
          </ul>
        )}
        {item.links?.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 20 }}>
            {item.links.map(l => (
              <a key={l.href} href={l.href} target="_blank" rel="noreferrer" style={{ fontFamily: MONO, fontSize: "0.72rem", letterSpacing: "0.06em", color: LIGHT, textDecoration: "none", padding: "8px 14px", borderRadius: 8, background: "rgba(150,185,255,0.1)", border: "1px solid rgba(190,215,255,0.35)" }}>{l.label} ↗</a>
            ))}
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginTop: 24, paddingTop: 18, borderTop: "1px solid rgba(180,210,255,0.12)" }}>
          {navBtn(-1, "‹ Previous")}
          <span style={{ fontFamily: MONO, fontSize: 10, color: DIM, letterSpacing: "0.1em" }}>{index + 1} / {total}</span>
          {navBtn(1, "Next ›")}
        </div>
      </div>
    </div>
  )
}
