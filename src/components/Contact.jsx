import { useState } from "react"
import { profile } from "../data"

const EmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m2 7 10 7 10-7"/>
  </svg>
)

const GitHubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
)

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7M17 7H7M17 7v10"/>
  </svg>
)

const platforms = [
  {
    id: "email",
    label: "Email",
    display: profile.email,
    href: `mailto:${profile.email}`,
    Icon: EmailIcon,
    external: false,
  },
  {
    id: "github",
    label: "GitHub",
    display: "github.com/fortdominz",
    href: profile.github,
    Icon: GitHubIcon,
    external: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    display: "linkedin.com/in/dominioneze",
    href: profile.linkedin,
    Icon: LinkedInIcon,
    external: true,
  },
]

function PlatformCard({ platform }) {
  const { label, display, href, Icon, external } = platform
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "14px",
        padding: "14px 18px",
        border: "1px solid var(--border)",
        borderRadius: "10px",
        textDecoration: "none",
        backgroundColor: "var(--bg)",
        transition: "border-color 0.18s, background-color 0.18s, transform 0.18s",
        cursor: "pointer",
        color: "inherit",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = "var(--accent)"
        e.currentTarget.style.backgroundColor = "var(--surface)"
        e.currentTarget.style.transform = "translateY(-2px)"
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "var(--border)"
        e.currentTarget.style.backgroundColor = "var(--bg)"
        e.currentTarget.style.transform = "translateY(0)"
      }}
    >
      {/* Icon pill */}
      <div style={{
        width: "40px",
        height: "40px",
        borderRadius: "8px",
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--muted)",
        flexShrink: 0,
      }}>
        <Icon />
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: "0.72rem", color: "var(--muted)", fontFamily: "JetBrains Mono, monospace", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "2px" }}>
          {label}
        </p>
        <p style={{ fontSize: "0.88rem", color: "var(--text)", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {display}
        </p>
      </div>

      {/* Arrow */}
      <span style={{ color: "var(--muted)", flexShrink: 0, opacity: 0.5 }}>
        <ArrowIcon />
      </span>
    </a>
  )
}

function ContactIcons({ platforms }) {
  const [hoveredId, setHoveredId] = useState(null)

  return (
    <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
      {platforms.map(p => {
        const active = hoveredId === p.id
        return (
          <div key={p.id} style={{ position: "relative" }}>
            <a
              href={p.href}
              target={p.external ? "_blank" : undefined}
              rel={p.external ? "noreferrer" : undefined}
              aria-label={p.display}
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "10px",
                border: `1px solid ${active ? "var(--accent)" : "var(--border)"}`,
                backgroundColor: "var(--bg)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: active ? "var(--accent)" : "var(--muted)",
                textDecoration: "none",
                transform: active ? "translateY(-2px)" : "translateY(0)",
                transition: "border-color 0.18s, color 0.18s, transform 0.18s",
              }}
              onMouseEnter={() => setHoveredId(p.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <p.Icon />
            </a>

            {active && (
              <div style={{
                position: "absolute",
                top: "calc(100% + 8px)",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                padding: "5px 10px",
                whiteSpace: "nowrap",
                zIndex: 50,
                pointerEvents: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}>
                <p style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: "0.7rem",
                  color: "var(--muted)",
                  margin: 0,
                }}>
                  {p.display}
                </p>
                <div style={{
                  position: "absolute",
                  top: -4,
                  left: "50%",
                  transform: "translateX(-50%) rotate(45deg)",
                  width: 7,
                  height: 7,
                  backgroundColor: "var(--surface)",
                  borderLeft: "1px solid var(--border)",
                  borderTop: "1px solid var(--border)",
                }} />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default function Contact() {
  return (
    <section id="contact"
      className="max-w-5xl mx-auto px-6"
      style={{ borderTop: "1px solid var(--border)", paddingTop: "3rem", paddingBottom: "2.5rem" }}>

      <div style={{ maxWidth: "560px" }}>
        <p className="mono text-xs uppercase tracking-widest mb-6" style={{ color: "var(--accent)" }}>
          Contact
        </p>

        <h2 style={{
          fontFamily: "Fraunces, serif",
          fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
          fontWeight: 600,
          lineHeight: 1.2,
          marginBottom: "1.2rem",
          color: "var(--text)",
        }}>
          Let's build something<br />
          <em style={{ fontWeight: 300, color: "var(--muted)" }}>worth talking about.</em>
        </h2>

        <p style={{ fontSize: "0.97rem", color: "var(--muted)", lineHeight: 1.7, marginBottom: "2rem" }}>
          Open to internship opportunities, collaborations, and conversations. If something I'm building is interesting to you, reach out.
        </p>

        <ContactIcons platforms={platforms} />
      </div>
    </section>
  )
}
