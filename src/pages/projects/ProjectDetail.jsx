import { useParams, Link, useNavigate, Navigate } from "react-router-dom"
import { projects } from "../../data"
import Nav from "../../components/Nav"
import TerminalDemo from "../../components/TerminalDemo"
import MusicTasteMatchMockup from "../../components/mockups/MusicTasteMatchMockup"
import GateKeepMockup from "../../components/mockups/GateKeepMockup"
import DayKeepMockup from "../../components/mockups/DayKeepMockup"
import GameNightMockup from "../../components/mockups/GameNightMockup"

const CUSTOM_MOCKUPS = {
  musictastematch: MusicTasteMatchMockup,
  gatekeep: GateKeepMockup,
  daykeep: DayKeepMockup,
  "game-night": GameNightMockup,
}

const STACK_ICONS = {
  "Python": "🐍",
  "FastAPI": "⚡",
  "React": "⚛",
  "Vite": "⚡",
  "SQLite": "🗄",
  "InsightFace": "👁",
  "Gemini AI": "✦",
  "Gemini GenAI API": "✦",
  "Spotify API": "🎵",
  "Pytest": "🧪",
  "OOP": "📦",
  "JSON": "{ }",
  "CLI": ">_",
  "HTML": "</>",
  "CSS": "🎨",
  "JavaScript": "JS",
  "Bootstrap": "B",
  "Tkinter": "🖼",
  "Turtle Graphics": "🐢",
  "REST APIs": "🔌",
  "Twilio": "📱",
}

function LaptopFrame({ children, heroColor }) {
  return (
    <div style={{ width: "100%", maxWidth: "560px", margin: "0 auto" }}>
      <span style={{ display: "block", width: 6, height: 6, borderRadius: "50%", background: "#C8C8C8", margin: "5px auto" }} />
      <div style={{ borderRadius: "10px 10px 0 0", border: "3px solid #C8C8C8", padding: 5, background: "#E0E0E0", overflow: "hidden" }}>
        <div style={{ borderRadius: 6, overflow: "hidden" }}>{children}</div>
      </div>
      <div style={{ height: 14, background: "#C8C8C8", borderRadius: "0 0 3px 3px", margin: "0 -3px" }} />
      <div style={{ height: 6, background: "#B4B4B4", borderRadius: "0 0 8px 8px", margin: "0 18px" }} />
    </div>
  )
}

function TerminalHero({ project }) {
  return (
    <LaptopFrame>
      <div style={{ background: "var(--terminal-bg)", minHeight: 200 }}>
        <div style={{ display: "flex", gap: 5, padding: "10px 14px 6px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c, i) => (
            <div key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: c }} />
          ))}
          <span style={{ fontSize: "0.65rem", color: "var(--terminal-muted)", fontFamily: "JetBrains Mono, monospace", marginLeft: 8 }}>
            {project.id}
          </span>
        </div>
        {project.terminal ? (
          <TerminalDemo script={project.terminal} />
        ) : (
          <div style={{ padding: "20px 14px", fontFamily: "JetBrains Mono, monospace", fontSize: "0.78rem", color: "var(--terminal-green)" }}>
            <span>$ {project.id}</span>
            <br />
            <span style={{ color: "var(--terminal-muted)" }}>// terminal demo coming soon</span>
          </div>
        )}
      </div>
    </LaptopFrame>
  )
}

function ProjectTickerRail({ currentId }) {
  const navigate = useNavigate()
  const complete = projects.filter(p => p.status !== "planned")

  return (
    <div style={{ borderTop: "1px solid var(--border)", marginTop: "4rem", paddingTop: "1.5rem", paddingBottom: "2rem", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <p style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: "0.68rem",
          color: "var(--muted)",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          marginBottom: "14px",
        }}>
          All projects
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {complete.map(p => {
            const isCurrent = p.id === currentId
            return (
              <button
                key={p.id}
                onClick={() => navigate(`/projects/${p.id}`)}
                style={{
                  padding: "6px 16px",
                  borderRadius: "20px",
                  border: `1px solid ${isCurrent ? "var(--accent)" : "var(--border)"}`,
                  background: isCurrent ? "var(--accent)" : "transparent",
                  color: isCurrent ? "#fff" : "var(--muted)",
                  fontSize: "0.82rem",
                  fontWeight: isCurrent ? 600 : 400,
                  fontFamily: "Geist, sans-serif",
                  cursor: isCurrent ? "default" : "pointer",
                  transition: "border-color 0.18s, background 0.18s, color 0.18s",
                }}
                onMouseEnter={e => { if (!isCurrent) { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--text)" } }}
                onMouseLeave={e => { if (!isCurrent) { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--muted)" } }}
              >
                {p.shortName || p.name}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default function ProjectDetail() {
  const { id } = useParams()
  const project = projects.find(p => p.id === id)

  if (!project || project.status === "planned") return <Navigate to="/" replace />

  const CustomMockup = CUSTOM_MOCKUPS[id]
  const liveUrl = project.live || project.app || project.link || project.demo

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg)" }}>
      <Nav />

      <main style={{ maxWidth: "900px", margin: "0 auto", paddingBottom: "2rem" }}>

        {/* Top bar */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem 1.5rem",
          borderBottom: "1px solid var(--border)",
        }}>
          <Link to="/" style={{
            display: "flex", alignItems: "center", gap: "6px",
            fontSize: "0.85rem", color: "var(--muted)", textDecoration: "none",
            transition: "color 0.15s",
          }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--text)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M5 12l7-7M5 12l7 7" />
            </svg>
            Projects
          </Link>
          <div style={{ display: "flex", gap: "8px" }}>
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" style={{
                display: "flex", alignItems: "center", gap: "5px",
                fontSize: "0.78rem", padding: "5px 12px",
                border: "1px solid var(--border)", borderRadius: "6px",
                color: "var(--muted)", textDecoration: "none",
                transition: "border-color 0.15s, color 0.15s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--text)" }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--muted)" }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                GitHub
              </a>
            )}
            {liveUrl && (
              <a href={liveUrl} target="_blank" rel="noreferrer" style={{
                display: "flex", alignItems: "center", gap: "5px",
                fontSize: "0.78rem", padding: "5px 12px",
                border: "1px solid var(--border)", borderRadius: "6px",
                color: "var(--muted)", textDecoration: "none",
                transition: "border-color 0.15s, color 0.15s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--text)" }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--muted)" }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
                {project.live ? "Live app" : project.demo ? "Demo" : "View"}
              </a>
            )}
          </div>
        </div>

        {/* Hero */}
        <div style={{
          background: project.heroColor || "var(--surface)",
          padding: "2rem 1.5rem 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}>
          <p style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "0.68rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "rgba(0,0,0,0.4)",
            marginBottom: "10px",
          }}>
            Personal project · {project.id === "game-night" ? "2025" : project.stack.includes("Gemini GenAI API") || project.stack.includes("Gemini AI") ? "2025" : "2025"}
          </p>
          <h1 style={{
            fontFamily: "Fraunces, serif",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 600,
            color: "#111",
            marginBottom: "6px",
            lineHeight: 1.15,
          }}>
            {project.shortName || project.name}
          </h1>
          <p style={{ fontSize: "1rem", color: "rgba(0,0,0,0.5)", marginBottom: "18px", maxWidth: 480 }}>
            {project.tagline}
          </p>

          {/* Status + stack badges */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center", marginBottom: "24px" }}>
            {project.live && (
              <span style={{ fontSize: "0.72rem", padding: "3px 10px", borderRadius: "20px", fontWeight: 600, background: "rgba(16,185,129,.15)", color: "#059669", border: "0.5px solid rgba(16,185,129,.3)" }}>
                Live
              </span>
            )}
            {project.stack.slice(0, 4).map(s => (
              <span key={s} style={{ fontSize: "0.72rem", padding: "3px 10px", borderRadius: "20px", background: "rgba(0,0,0,0.07)", color: "rgba(0,0,0,0.5)", border: "0.5px solid rgba(0,0,0,0.12)" }}>
                {s}
              </span>
            ))}
          </div>

          {/* Mockup */}
          <div style={{ width: "100%" }}>
            {CustomMockup ? <CustomMockup /> : <TerminalHero project={project} />}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "2rem 1.5rem 0" }}>

          {/* Highlights */}
          {project.highlights && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "2rem" }}>
              {project.highlights.map((h, i) => (
                <div key={i} style={{
                  padding: "14px 18px",
                  background: "var(--surface)",
                  borderRadius: "10px",
                  border: "1px solid var(--border)",
                }}>
                  <span style={{ display: "block", fontFamily: "Fraunces, serif", fontSize: "1.6rem", fontWeight: 600, color: "var(--text)", marginBottom: "3px" }}>
                    {h.value}
                  </span>
                  <span style={{ fontSize: "0.82rem", color: "var(--muted)" }}>{h.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Overview */}
          {project.overview && (
            <div style={{ marginBottom: "2rem" }}>
              <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "10px" }}>
                Overview
              </p>
              <p style={{ fontSize: "0.97rem", color: "var(--muted)", lineHeight: 1.75 }}>
                {project.overview}
              </p>
            </div>
          )}

          {/* How it works */}
          {project.howItWorks && (
            <div style={{ marginBottom: "2rem" }}>
              <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "10px" }}>
                How it works
              </p>
              <div>
                {project.howItWorks.map((step, i) => (
                  <div key={i} style={{
                    display: "flex", gap: "16px", padding: "10px 0",
                    borderBottom: i < project.howItWorks.length - 1 ? "1px solid var(--border)" : "none",
                  }}>
                    <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.7rem", color: "var(--muted)", width: "22px", flexShrink: 0, paddingTop: "2px" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text)", marginBottom: "3px", fontFamily: "Fraunces, serif" }}>
                        {step.title}
                      </p>
                      <p style={{ fontSize: "0.88rem", color: "var(--muted)", lineHeight: 1.65 }}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stack */}
          <div style={{ marginBottom: "2rem" }}>
            <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "10px" }}>
              Stack
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {project.stack.map(s => (
                <span key={s} style={{
                  display: "flex", alignItems: "center", gap: "7px",
                  padding: "7px 14px",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  fontSize: "0.88rem",
                  color: "var(--muted)",
                  fontFamily: "Geist, sans-serif",
                }}>
                  {s}
                </span>
              ))}
            </div>
          </div>

        </div>
      </main>

      {/* Project ticker rail */}
      <ProjectTickerRail currentId={id} />
    </div>
  )
}
