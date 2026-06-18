import { useEffect, useRef, useState } from "react"
import { profile } from "../data"

const lines = [
  "building in public, one commit at a time.",
  "turning ideas into tools people actually use.",
  "I build for myself first. Then I realize everyone else needs it too.",
  "CS @ Fisk · 4.0 · graduating May/Dec. 2028",
]

function ResumeDownloadBtn() {
  const [phase, setPhase] = useState("idle") // idle | dropping | done

  const handleClick = () => {
    if (phase !== "idle") return
    setPhase("dropping")
    setTimeout(() => {
      const a = document.createElement("a")
      a.href = "/resume.pdf"
      a.download = "Dominion_Eze_Resume.pdf"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      setPhase("done")
      setTimeout(() => setPhase("idle"), 1800)
    }, 750)
  }

  return (
    <button
      onClick={handleClick}
      title="Download resume"
      style={{
        position: "relative",
        width: "40px",
        height: "40px",
        borderRadius: "6px",
        border: "1px solid var(--border)",
        backgroundColor: "transparent",
        color: "var(--text)",
        cursor: phase === "idle" ? "pointer" : "default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        transition: "border-color 0.15s",
        flexShrink: 0,
      }}
      onMouseEnter={e => { if (phase === "idle") e.currentTarget.style.borderColor = "var(--accent)" }}
      onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
    >
      {phase === "idle" && (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
      )}
      {phase === "dropping" && (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ animation: "deliverDrop 0.75s ease-in forwards" }}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
        </svg>
      )}
      {phase === "done" && (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--terminal-green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          style={{ animation: "deliverCheck 0.3s ease-out forwards" }}>
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      )}
    </button>
  )
}

export default function Hero() {
  const [lineIdx, setLineIdx] = useState(0)
  const [displayed, setDisplayed] = useState("")
  const [phase, setPhase] = useState("typing")
  const headshotRef = useRef(null)
  const dotGridRef  = useRef(null)

  function handleMouseMove(e) {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - left - width  / 2) / (width  / 2)
    const y = (e.clientY - top  - height / 2) / (height / 2)
    if (headshotRef.current)
      headshotRef.current.style.transform = `translate(${x * 8}px, ${y * 6}px)`
    if (dotGridRef.current)
      dotGridRef.current.style.transform = `translate(${-x * 4}px, ${-y * 3}px) scale(1.04)`
  }

  function handleMouseLeave() {
    if (headshotRef.current) headshotRef.current.style.transform = ""
    if (dotGridRef.current)  dotGridRef.current.style.transform  = ""
  }

  useEffect(() => {
    const target = lines[lineIdx]
    let timeout

    if (phase === "typing") {
      if (displayed.length < target.length) {
        timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 45)
      } else {
        timeout = setTimeout(() => setPhase("pause"), 2200)
      }
    } else if (phase === "pause") {
      timeout = setTimeout(() => setPhase("erasing"), 200)
    } else if (phase === "erasing") {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 22)
      } else {
        setLineIdx((lineIdx + 1) % lines.length)
        setPhase("typing")
      }
    }

    return () => clearTimeout(timeout)
  }, [displayed, phase, lineIdx])

  return (
    <section id="top"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ paddingTop: "5rem", paddingBottom: "6rem", paddingLeft: "1.5rem", paddingRight: "1.5rem", position: "relative" }}>

      {/* Dot grid background — shifts slightly opposite the cursor */}
      <div ref={dotGridRef} style={{
        position: "absolute",
        inset: "-8px",
        backgroundImage: "radial-gradient(circle, var(--border) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        opacity: 0.6,
        pointerEvents: "none",
        maskImage: "radial-gradient(ellipse 80% 100% at 60% 50%, black 30%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 100% at 60% 50%, black 30%, transparent 100%)",
        transition: "transform 0.18s ease-out",
        willChange: "transform",
      }} />

      {/* Two-column layout */}
      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "48px" }}>

        {/* Left — text */}
        <div style={{ flex: 1, maxWidth: "560px" }}>
          <p className="mono text-xs mb-6 tracking-wider uppercase" style={{ color: "var(--accent)" }}>
            Available for internships · Summer 2026
          </p>

          <h1 style={{
            fontSize: "clamp(2.8rem, 6vw, 5rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "var(--text)",
            marginBottom: "1.25rem",
            fontFamily: "Fraunces, serif",
          }}>
            Dominion Eze
          </h1>

          <p style={{
            fontSize: "1.2rem",
            color: "var(--muted)",
            marginBottom: "2rem",
            maxWidth: "480px",
            lineHeight: 1.6,
            fontFamily: "Geist, sans-serif",
            fontWeight: 400,
          }}>
            {profile.tagline}
          </p>

          {/* Terminal typing line */}
          <div style={{
            backgroundColor: "var(--terminal-bg)",
            borderRadius: "8px",
            padding: "12px 18px",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "2.5rem",
            minWidth: "340px",
          }}>
            <span style={{ color: "var(--terminal-green)", fontFamily: "JetBrains Mono, monospace", fontSize: "0.82rem" }}>
              ~/dominion
            </span>
            <span style={{ color: "var(--terminal-muted)", fontFamily: "JetBrains Mono, monospace", fontSize: "0.82rem" }}>
              $
            </span>
            <span style={{ color: "var(--terminal-text)", fontFamily: "JetBrains Mono, monospace", fontSize: "0.82rem" }}>
              {displayed}
              <span style={{
                display: "inline-block",
                width: "2px",
                height: "0.9em",
                backgroundColor: "var(--accent)",
                marginLeft: "2px",
                verticalAlign: "middle",
                animation: "blink 1s step-end infinite",
              }} />
            </span>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3" style={{ alignItems: "center" }}>
            <a href={profile.github} target="_blank" rel="noreferrer"
              style={{ padding: "10px 20px", backgroundColor: "var(--terminal-bg)", color: "var(--terminal-text)", borderRadius: "6px", fontSize: "0.88rem", fontWeight: 500, textDecoration: "none", transition: "opacity 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.8"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
              GitHub ↗
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer"
              style={{ padding: "10px 20px", border: "1px solid var(--border)", color: "var(--text)", borderRadius: "6px", fontSize: "0.88rem", fontWeight: 500, textDecoration: "none", transition: "border-color 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "var(--accent)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}>
              LinkedIn ↗
            </a>

            {/* Resume: view in new tab */}
            <a href="/resume.pdf" target="_blank" rel="noreferrer"
              style={{ padding: "10px 20px", backgroundColor: "var(--accent)", color: "#fff", borderRadius: "6px", fontSize: "0.88rem", fontWeight: 500, textDecoration: "none", transition: "background-color 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = "var(--accent-dark)"}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = "var(--accent)"}>
              View Resume
            </a>

            {/* Download button with delivery animation */}
            <ResumeDownloadBtn />
          </div>
        </div>

        {/* Right — headshot — follows cursor */}
        <div ref={headshotRef} style={{
          flexShrink: 0,
          position: "relative",
          transition: "transform 0.18s ease-out",
          willChange: "transform",
        }}>
          <div style={{
            width: "220px",
            height: "220px",
            borderRadius: "50%",
            padding: "4px",
            background: "linear-gradient(135deg, var(--accent), transparent 60%)",
            boxShadow: "0 0 40px rgba(37,99,235,0.18)",
          }}>
            <img
              src="/headshot.jpg"
              alt="Dominion Eze"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
                objectPosition: "center top",
                display: "block",
              }}
            />
          </div>
          {/* Glow ring */}
          <div style={{
            position: "absolute",
            inset: "-8px",
            borderRadius: "50%",
            border: "1px solid var(--accent)",
            opacity: 0.25,
            pointerEvents: "none",
          }} />
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes deliverDrop {
          0%   { opacity: 1; transform: translateY(0) scale(1); }
          40%  { opacity: 1; transform: translateY(6px) scale(0.95); }
          80%  { opacity: 0.2; transform: translateY(22px) scale(0.85); }
          100% { opacity: 0; transform: translateY(30px) scale(0.8); }
        }
        @keyframes deliverCheck {
          0%   { opacity: 0; transform: scale(0.5); }
          60%  { opacity: 1; transform: scale(1.15); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </section>
  )
}
