import { useState, useEffect, useRef, useCallback } from "react"
import { useNavigate } from "react-router-dom"

/* ── The LifePeek Command Deck. A full-screen, sealed orbital interface that
   serves as the LifePeek hub (route: /lifepeek). Frost / blizzard theme:
   glacial blue depths, drifting snow, aurora light. Your headshot is the
   core; the three LifePeek realms orbit it. Click a node to enter that
   realm; Release (or Esc) returns to the portfolio. ────────────────────── */

const IconJourney = ({ c }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="5" cy="19" r="2" /><circle cx="19" cy="5" r="2" />
    <path d="M7 18.5C12 17 11 9 16 6.5" />
  </svg>
)
const IconWorld = ({ c }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18" />
  </svg>
)
const IconGrass = ({ c }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 21v-7" /><path d="M12 14c0-3 2-5 5-5 0 3-2 5-5 5Z" /><path d="M12 16c0-3-2-5-5-5 0 3 2 5 5 5Z" />
  </svg>
)

const NODES = [
  { k: "life-journey",   label: "Life Journey",   desc: "The timeline",          route: "/lifepeek/life-journey",   Icon: IconJourney },
  { k: "open-world",     label: "Open World",     desc: "Programs & experiences", route: "/lifepeek/open-world",     Icon: IconWorld },
  { k: "touching-grass", label: "Touching Grass", desc: "Off the keyboard",       route: "/lifepeek/touching-grass", Icon: IconGrass },
]
const STEP = 360 / NODES.length

const ICE = "#BBDCFF"
const LIGHT = "#EAF4FF"

export default function CommandDeck() {
  const navigate = useNavigate()
  const canvasRef = useRef(null)
  const animRef = useRef(null)
  const [mounted, setMounted] = useState(false)
  const [leaving, setLeaving] = useState(null)   // route being entered, for a brief exit fade
  const [R, setR] = useState(250)

  const computeR = useCallback(() => {
    const r = Math.min(window.innerWidth * 0.30, window.innerHeight * 0.32, 290)
    setR(Math.max(150, r))
  }, [])

  useEffect(() => {
    computeR()
    window.addEventListener("resize", computeR)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const t = setTimeout(() => setMounted(true), 60)
    return () => {
      clearTimeout(t)
      window.removeEventListener("resize", computeR)
      document.body.style.overflow = prev
    }
  }, [computeR])

  const exit = useCallback(() => navigate("/"), [navigate])
  const enter = useCallback((route) => {
    setLeaving(route)
    setTimeout(() => navigate(route), 260)
  }, [navigate])

  useEffect(() => {
    const onKey = e => { if (e.key === "Escape") exit() }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [exit])

  // Blizzard
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    let W, H
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight }
    resize()
    window.addEventListener("resize", resize)
    const make = (init) => ({
      x: Math.random() * W,
      y: init ? Math.random() * H : -12,
      r: Math.random() * 2.4 + 0.5,
      sp: Math.random() * 1.3 + 0.4,
      sway: Math.random() * 0.9 + 0.2,
      ph: Math.random() * Math.PI * 2,
      op: Math.random() * 0.55 + 0.25,
    })
    const flakes = Array.from({ length: 170 }, () => make(true))
    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      for (let i = 0; i < flakes.length; i++) {
        const f = flakes[i]
        f.y += f.sp; f.ph += 0.02
        f.x += Math.sin(f.ph) * f.sway * 0.7 + 0.55
        if (f.y > H + 12 || f.x > W + 12) flakes[i] = make(false)
        ctx.beginPath()
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(228,242,255,${f.op})`
        ctx.fill()
      }
      animRef.current = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener("resize", resize) }
  }, [])

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1,
      background: "radial-gradient(ellipse 110% 95% at 50% 38%, #0C2A44 0%, #0A2138 38%, #061626 68%, #03101C 100%)",
      fontFamily: "'JetBrains Mono', monospace",
      overflow: "hidden",
      animation: leaving ? "cd-void-out 0.26s ease forwards" : "cd-void-in 0.6s ease both",
    }}>
      {/* Aurora */}
      <div style={{
        position: "absolute", top: "-10%", left: "-20%", right: "-20%", height: "55%",
        background: "radial-gradient(ellipse 60% 80% at 30% 20%, rgba(90,200,230,0.14) 0%, transparent 60%), radial-gradient(ellipse 50% 70% at 75% 10%, rgba(120,160,255,0.12) 0%, transparent 60%)",
        filter: "blur(20px)", pointerEvents: "none", animation: "cd-aurora 14s ease-in-out infinite",
      }} />

      {/* Blizzard */}
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0 }} />

      {/* Central glacial glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(circle 40% at 50% 44%, rgba(150,210,255,0.12) 0%, transparent 62%)",
        animation: "cd-breathe 6s ease-in-out infinite",
      }} />

      {/* Frost vignette */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 70% 72% at 50% 48%, transparent 40%, rgba(160,205,250,0.06) 72%, rgba(8,24,40,0.78) 100%)",
        animation: "cd-fade 1s ease both",
      }} />

      {/* HUD frame */}
      <Bracket pos={{ top: 18, left: 18 }} bw="2px 0 0 2px" />
      <Bracket pos={{ top: 18, right: 18 }} bw="2px 2px 0 0" />
      <Bracket pos={{ bottom: 18, left: 18 }} bw="0 0 2px 2px" />
      <Bracket pos={{ bottom: 18, right: 18 }} bw="0 2px 2px 0" />
      <div style={{
        position: "absolute", inset: 14, border: `1px solid rgba(180,220,255,0.10)`,
        pointerEvents: "none", animation: "cd-fade 0.7s ease both",
      }} />

      {/* Readouts */}
      <div style={{
        position: "absolute", top: 26, left: 52, fontSize: "0.62rem", letterSpacing: "0.28em",
        color: ICE, opacity: 0.75, textTransform: "uppercase", animation: "cd-readout 0.8s ease both",
      }}>❄ LifePeek</div>
      <div style={{
        position: "absolute", top: 26, right: 52, fontSize: "0.62rem", letterSpacing: "0.16em",
        color: ICE, opacity: 0.5, textTransform: "uppercase", whiteSpace: "nowrap",
        animation: "cd-readout 0.8s 0.1s ease both",
      }}>Lagos → Nashville</div>

      {/* ── Orbital field ── */}
      <div style={{ position: "absolute", inset: 0 }}>
        {/* Orbit ring */}
        <div style={{
          position: "absolute", left: "50%", top: "44%",
          width: R * 2, height: R * 2, transform: "translate(-50%,-50%)",
          borderRadius: "50%", border: `1px solid rgba(180,220,255,0.12)`,
          opacity: mounted ? 1 : 0, transition: "opacity 0.8s ease 0.2s", pointerEvents: "none",
        }} />

        {/* Connectors */}
        {NODES.map((s, i) => {
          const ang = -90 + i * STEP
          return (
            <div key={`c-${s.k}`} style={{
              position: "absolute", left: "50%", top: "44%", height: 1, width: R,
              transformOrigin: "0 50%",
              transform: `rotate(${ang}deg) scaleX(${mounted ? 1 : 0})`,
              transition: `transform 0.6s cubic-bezier(0.2,0.8,0.2,1) ${0.15 + i * 0.07}s`,
              background: `linear-gradient(90deg, rgba(180,220,255,0.30), rgba(180,220,255,0))`,
              pointerEvents: "none",
            }} />
          )
        })}

        {/* Core */}
        <div style={{
          position: "absolute", left: "50%", top: "44%", transform: "translate(-50%,-50%)",
          width: 132, height: 132, borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: mounted ? 1 : 0, scale: mounted ? "1" : "0.4",
          transition: "opacity 0.6s ease, scale 0.6s cubic-bezier(0.2,0.8,0.2,1)",
        }}>
          <div style={{
            position: "absolute", inset: -10, borderRadius: "50%",
            border: `1px solid rgba(190,225,255,0.32)`, animation: "cd-spin 18s linear infinite",
            borderTopColor: "rgba(200,235,255,0.8)", borderRightColor: "rgba(190,225,255,0.05)",
          }} />
          <div style={{
            position: "absolute", inset: -22, borderRadius: "50%",
            border: `1px dashed rgba(190,225,255,0.16)`, animation: "cd-spin-rev 30s linear infinite",
          }} />
          <div style={{
            width: 116, height: 116, borderRadius: "50%", overflow: "hidden",
            border: `2px solid rgba(205,232,255,0.6)`,
            boxShadow: "0 0 34px rgba(150,205,255,0.35), inset 0 0 20px rgba(0,0,0,0.45)",
            background: "#0A1C2C",
          }}>
            <img src="/headshot.jpg" alt="Dominion Eze"
              style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(0.3) brightness(1.02) contrast(1.03)" }} />
          </div>
        </div>

        {/* Nodes */}
        {NODES.map((s, i) => {
          const ang = (-90 + i * STEP) * Math.PI / 180
          const x = Math.cos(ang) * R
          const y = Math.sin(ang) * R
          const Icon = s.Icon
          return (
            <button key={s.k}
              onClick={() => enter(s.route)}
              title={`Enter ${s.label}`}
              style={{
                position: "absolute", left: "50%", top: "44%",
                transform: `translate(-50%,-50%) translate(${mounted ? x : 0}px, ${mounted ? y : 0}px)`,
                transition: `transform 0.6s cubic-bezier(0.2,0.8,0.2,1) ${0.15 + i * 0.07}s, opacity 0.5s ease ${0.15 + i * 0.07}s, border-color 0.25s, background 0.25s, box-shadow 0.25s`,
                opacity: mounted ? 1 : 0,
                display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                width: 150, padding: "16px 14px", borderRadius: 14,
                background: "rgba(10,28,44,0.72)", border: `1px solid rgba(180,220,255,0.32)`,
                color: ICE, cursor: "pointer", backdropFilter: "blur(8px)", textAlign: "center",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "rgba(205,232,255,0.85)"
                e.currentTarget.style.background = "rgba(190,225,255,0.14)"
                e.currentTarget.style.boxShadow = "0 0 30px rgba(150,205,255,0.3)"
                e.currentTarget.style.transform = `translate(-50%,-50%) translate(${x}px, ${y}px) scale(1.05)`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(180,220,255,0.32)"
                e.currentTarget.style.background = "rgba(10,28,44,0.72)"
                e.currentTarget.style.boxShadow = "none"
                e.currentTarget.style.transform = `translate(-50%,-50%) translate(${x}px, ${y}px) scale(1)`
              }}
            >
              <span style={{
                width: 42, height: 42, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                border: "1px solid rgba(190,225,255,0.3)", background: "rgba(150,205,255,0.06)",
              }}><Icon c={LIGHT} /></span>
              <span style={{ fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", color: LIGHT }}>{s.label}</span>
              <span style={{ fontSize: "0.68rem", color: "rgba(186,210,238,0.7)", fontFamily: "Geist, sans-serif", letterSpacing: "0.02em" }}>{s.desc}</span>
            </button>
          )
        })}
      </div>

      {/* Exit */}
      <button onClick={exit} title="Back to the portfolio" style={{
        position: "absolute", bottom: "2rem", right: "2rem", zIndex: 5,
        display: "flex", alignItems: "center", gap: 8,
        padding: "9px 16px 9px 14px",
        clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
        border: "1px solid rgba(200,218,252,0.4)", background: "rgba(190,225,255,0.1)",
        color: LIGHT, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", fontWeight: 600,
        letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", backdropFilter: "blur(8px)",
        boxShadow: "0 0 22px rgba(160,205,255,0.18)", animation: "cd-readout 0.8s 0.3s ease both",
      }}>
        <span style={{ fontSize: "0.9rem", lineHeight: 1 }}>←</span> Release
      </button>

      <style>{`
        @keyframes cd-void-in { 0% { opacity: 0; } 100% { opacity: 1; } }
        @keyframes cd-void-out { 0% { opacity: 1; } 100% { opacity: 0; } }
        @keyframes cd-fade { 0% { opacity: 0; } 100% { opacity: 1; } }
        @keyframes cd-readout { 0% { opacity: 0; transform: translateY(-6px); letter-spacing: 0.5em; } 100% { opacity: 0.75; } }
        @keyframes cd-breathe { 0%,100% { opacity: 0.7; } 50% { opacity: 1; } }
        @keyframes cd-aurora { 0%,100% { opacity: 0.6; transform: translateX(0); } 50% { opacity: 1; transform: translateX(4%); } }
        @keyframes cd-spin { 0% { transform: rotate(0); } 100% { transform: rotate(360deg); } }
        @keyframes cd-spin-rev { 0% { transform: rotate(0); } 100% { transform: rotate(-360deg); } }
      `}</style>
    </div>
  )
}

function Bracket({ pos, bw }) {
  return (
    <div style={{
      position: "absolute", width: 24, height: 24, borderStyle: "solid",
      borderColor: "rgba(205,232,255,0.55)", borderWidth: bw,
      animation: "cd-fade 0.6s ease both", pointerEvents: "none", ...pos,
    }} />
  )
}
