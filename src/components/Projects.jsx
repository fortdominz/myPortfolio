import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { projects } from "../data"
import TerminalDemo from "./TerminalDemo"
import FadeIn from "./FadeIn"

const statusConfig = {
  complete: { label: "Complete",    color: "#3A9A60", bg: "rgba(126,212,153,0.12)"  },
  planned:  { label: "Planned",     color: "#B87820", bg: "rgba(255,184,100,0.12)"  },
  wip:      { label: "In Progress", color: "#2563EB", bg: "rgba(37,99,235,0.10)"    },
}

const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
)

const ChevronIcon = ({ open }) => (
  <svg
    width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    style={{ transition: "transform 0.25s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
  >
    <polyline points="6 9 12 15 18 9"/>
  </svg>
)

function ProjectCard({ project }) {
  const [expanded, setExpanded] = useState(false)
  const navigate = useNavigate()
  const s = statusConfig[project.status]
  const isLocked = project.status === "planned"

  return (
    <div
      onClick={() => !isLocked && navigate(`/projects/${project.id}`)}
      style={{
        border: "1px solid var(--border)",
        borderRadius: "10px",
        overflow: "hidden",
        backgroundColor: isLocked ? "var(--locked-bg)" : "var(--bg)",
        transition: "box-shadow 0.22s, border-color 0.22s, transform 0.22s",
        cursor: isLocked ? "default" : "pointer",
        opacity: isLocked ? 0.85 : 1,
      }}
      onMouseEnter={e => {
        if (!isLocked) {
          e.currentTarget.style.borderColor = "var(--accent)"
          e.currentTarget.style.boxShadow = "0 8px 32px rgba(37,99,235,0.15)"
          e.currentTarget.style.transform = "translateY(-5px) scale(1.01)"
        }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "var(--border)"
        e.currentTarget.style.boxShadow = "none"
        e.currentTarget.style.transform = "translateY(0) scale(1)"
      }}
    >
      {/* Window title bar */}
      <div style={{
        backgroundColor: "var(--surface)",
        borderBottom: "1px solid var(--border)",
        padding: "10px 16px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}>
        <div style={{ display: "flex", gap: "5px" }}>
          {(isLocked ? ["#555", "#555", "#555"] : ["#FF5F57", "#FEBC2E", "#28C840"]).map((c, i) => (
            <div key={i} style={{ width: 9, height: 9, borderRadius: "50%", backgroundColor: c }} />
          ))}
        </div>
        <span className="mono" style={{ fontSize: "0.75rem", color: "var(--muted)", flex: 1, textAlign: "center" }}>
          {project.id}
        </span>
        <span style={{
          fontSize: "0.7rem",
          fontWeight: 600,
          padding: "2px 8px",
          borderRadius: "4px",
          color: s.color,
          backgroundColor: s.bg,
          fontFamily: "Geist, sans-serif",
        }}>
          {s.label}
        </span>
      </div>

      {/* Card body */}
      <div style={{ padding: "20px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px", marginBottom: "6px" }}>
          <h3 style={{
            fontFamily: "Fraunces, serif",
            fontSize: "1.15rem",
            fontWeight: 600,
            color: "var(--text)",
          }}>
            {project.name}
          </h3>
          {isLocked && (
            <span style={{ color: "var(--muted)", flexShrink: 0, marginTop: "2px" }}>
              <LockIcon />
            </span>
          )}
        </div>

        {isLocked ? (
          <p className="mono" style={{
            fontSize: "0.78rem",
            color: "var(--muted)",
            marginTop: "10px",
            padding: "10px 14px",
            backgroundColor: "var(--surface)",
            borderRadius: "6px",
            borderLeft: "3px solid var(--border)",
          }}>
            // under development · details coming soon
          </p>
        ) : (
          <>
            <p style={{ fontSize: "0.88rem", color: "var(--accent-dark)", marginBottom: "12px", fontStyle: "italic" }}>
              {project.tagline}
            </p>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)", lineHeight: 1.65, marginBottom: "16px" }}>
              {project.description}
            </p>

            {/* Stack tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.stack.map(t => (
                <span key={t} className="mono" style={{
                  fontSize: "0.72rem",
                  padding: "3px 9px",
                  borderRadius: "4px",
                  backgroundColor: "var(--tag-bg)",
                  color: "var(--muted)",
                  border: "1px solid var(--border)",
                }}>
                  {t}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex gap-3 flex-wrap">
              <Link
                to={`/projects/${project.id}`}
                onClick={e => e.stopPropagation()}
                style={{ fontSize: "0.82rem", color: "var(--accent)", textDecoration: "none", fontWeight: 500 }}
                onMouseEnter={e => e.currentTarget.style.textDecoration = "underline"}
                onMouseLeave={e => e.currentTarget.style.textDecoration = "none"}
              >
                View details →
              </Link>
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer"
                  onClick={e => e.stopPropagation()}
                  style={{ fontSize: "0.82rem", color: "var(--accent-dark)", textDecoration: "none", fontWeight: 500 }}
                  onMouseEnter={e => e.target.style.textDecoration = "underline"}
                  onMouseLeave={e => e.target.style.textDecoration = "none"}
                >
                  GitHub ↗
                </a>
              )}
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noreferrer"
                  onClick={e => e.stopPropagation()}
                  style={{ fontSize: "0.82rem", color: "var(--accent-dark)", textDecoration: "none", fontWeight: 500 }}
                  onMouseEnter={e => e.target.style.textDecoration = "underline"}
                  onMouseLeave={e => e.target.style.textDecoration = "none"}
                >
                  Demo ↗
                </a>
              )}
              {project.live && (
                <a href={project.live} target="_blank" rel="noreferrer"
                  onClick={e => e.stopPropagation()}
                  style={{ fontSize: "0.82rem", color: "var(--accent-dark)", textDecoration: "none", fontWeight: 500 }}
                  onMouseEnter={e => e.target.style.textDecoration = "underline"}
                  onMouseLeave={e => e.target.style.textDecoration = "none"}
                >
                  Open App ↗
                </a>
              )}
              {project.link && (
                <a href={project.link} target="_blank" rel="noreferrer"
                  onClick={e => e.stopPropagation()}
                  style={{ fontSize: "0.82rem", color: "var(--accent-dark)", textDecoration: "none", fontWeight: 500 }}
                  onMouseEnter={e => e.target.style.textDecoration = "underline"}
                  onMouseLeave={e => e.target.style.textDecoration = "none"}
                >
                  Live ↗
                </a>
              )}
              {project.app && (
                <a href={project.app} target="_blank" rel="noreferrer"
                  onClick={e => e.stopPropagation()}
                  style={{ fontSize: "0.82rem", color: "var(--accent-dark)", textDecoration: "none", fontWeight: 500 }}
                  onMouseEnter={e => e.target.style.textDecoration = "underline"}
                  onMouseLeave={e => e.target.style.textDecoration = "none"}
                >
                  Open App ↗
                </a>
              )}
              {project.terminal && (
                <button
                  onClick={e => { e.stopPropagation(); setExpanded(x => !x) }}
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--terminal-green)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "JetBrains Mono, monospace",
                    padding: 0,
                    fontWeight: 500,
                  }}
                >
                  {expanded ? "▾ hide terminal" : "▸ open terminal"}
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {/* Terminal demo — expands in-card, only for unlocked projects */}
      {!isLocked && project.terminal && expanded && (
        <TerminalDemo script={project.terminal} />
      )}
    </div>
  )
}

export default function Projects() {
  const [plannedOpen, setPlannedOpen] = useState(false)

  const complete = projects.filter(p => p.status !== "planned")
  const planned  = projects.filter(p => p.status === "planned")

  return (
    <section id="projects"
      className="max-w-5xl mx-auto px-6"
      style={{ borderTop: "1px solid var(--border)", paddingTop: "3rem", paddingBottom: "2.5rem" }}>

      <div className="flex items-start justify-between mb-12 flex-wrap gap-4">
        <p className="mono text-xs uppercase tracking-widest" style={{ color: "var(--accent)" }}>
          Projects
        </p>
        <p style={{ fontSize: "0.88rem", color: "var(--muted)", maxWidth: "380px", textAlign: "right" }}>
          Personal projects, not demos. Real tools I built to solve real problems I face — and I use them every single day.
        </p>
      </div>

      {/* Shipped projects */}
      <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
        {complete.map((p, i) => (
          <FadeIn key={p.id} delay={i * 80} direction="up">
            <ProjectCard project={p} />
          </FadeIn>
        ))}
      </div>

      {/* In Development accordion */}
      {planned.length > 0 && (
        <div style={{ marginTop: "2.5rem" }}>
          <button
            onClick={() => setPlannedOpen(o => !o)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 18px",
              border: "1px solid var(--border)",
              borderRadius: plannedOpen ? "10px 10px 0 0" : "10px",
              backgroundColor: "var(--surface)",
              cursor: "pointer",
              transition: "border-color 0.18s, background-color 0.18s",
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "var(--accent)"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span className="mono" style={{ fontSize: "0.72rem", color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                In Development
              </span>
              <span style={{
                fontSize: "0.7rem",
                fontWeight: 600,
                padding: "2px 8px",
                borderRadius: "20px",
                color: "#B87820",
                backgroundColor: "rgba(255,184,100,0.15)",
                fontFamily: "Geist, sans-serif",
              }}>
                {planned.length} planned
              </span>
            </div>
            <span style={{ color: "var(--muted)" }}>
              <ChevronIcon open={plannedOpen} />
            </span>
          </button>

          {plannedOpen && (
            <div style={{
              border: "1px solid var(--border)",
              borderTop: "none",
              borderRadius: "0 0 10px 10px",
              padding: "20px",
              backgroundColor: "var(--bg)",
            }}>
              <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
                {planned.map((p, i) => (
                  <FadeIn key={p.id} delay={i * 60} direction="up">
                    <ProjectCard project={p} />
                  </FadeIn>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
