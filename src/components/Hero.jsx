import { useEffect, useState } from "react"
import { profile } from "../data"

const lines = [
  "building in public, one commit at a time.",
  "turning ideas into tools people actually use.",
  "I build for myself first. Then I realize everyone else needs it too.",
  "CS @ Fisk · 4.0 · Spring 2025 →",
]

export default function Hero() {
  const [lineIdx, setLineIdx] = useState(0)
  const [displayed, setDisplayed] = useState("")
  const [phase, setPhase] = useState("typing") // typing | pause | erasing

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
    <section id="top" className="max-w-5xl mx-auto px-6" style={{ paddingTop: "5rem", paddingBottom: "6rem" }}>
      <div className="max-w-2xl">
        {/* Eyebrow */}
        <p className="mono text-xs mb-6 tracking-wider uppercase"
          style={{ color: "var(--accent)" }}>
          Available for internships · Summer 2026
        </p>

        {/* Name */}
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

        {/* Tagline */}
        <p style={{
          fontSize: "1.2rem",
          color: "var(--muted)",
          marginBottom: "2rem",
          maxWidth: "520px",
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

        {/* CTA links */}
        <div className="flex flex-wrap gap-3">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            style={{
              padding: "10px 20px",
              backgroundColor: "var(--terminal-bg)",
              color: "var(--terminal-text)",
              borderRadius: "6px",
              fontSize: "0.88rem",
              fontWeight: 500,
              textDecoration: "none",
              transition: "opacity 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.8"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            GitHub ↗
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            style={{
              padding: "10px 20px",
              border: "1px solid var(--border)",
              color: "var(--text)",
              borderRadius: "6px",
              fontSize: "0.88rem",
              fontWeight: 500,
              textDecoration: "none",
              transition: "border-color 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "var(--accent)"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
          >
            LinkedIn ↗
          </a>
          <a
            href="/resume.pdf"
            download
            style={{
              padding: "10px 20px",
              backgroundColor: "var(--accent)",
              color: "#fff",
              borderRadius: "6px",
              fontSize: "0.88rem",
              fontWeight: 500,
              textDecoration: "none",
              transition: "background-color 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = "var(--accent-dark)"}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = "var(--accent)"}
          >
            Resume ↓
          </a>
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  )
}
