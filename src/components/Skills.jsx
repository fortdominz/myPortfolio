import { skills } from "../data"
import FadeIn from "./FadeIn"

const colors = {
  "Languages":          { bg: "rgba(37,99,235,0.08)",   text: "#2563EB" },
  "Frameworks & Tools": { bg: "rgba(126,212,153,0.10)",  text: "#3A9A60" },
  "Currently Learning": { bg: "rgba(255,184,100,0.10)",  text: "#B87820" },
  "AI-Augmented Dev":   { bg: "rgba(180,140,255,0.12)",  text: "#8060C0" },
}

export default function Skills() {
  return (
    <section id="skills"
      className="max-w-5xl mx-auto px-6"
      style={{ borderTop: "1px solid var(--border)", backgroundColor: "var(--surface-alt)", paddingTop: "3rem", paddingBottom: "2.5rem" }}>

      <div className="flex items-start justify-between mb-12 flex-wrap gap-4">
        <p className="mono text-xs uppercase tracking-widest" style={{ color: "var(--accent)" }}>
          Skills
        </p>
        <p style={{ fontSize: "0.88rem", color: "var(--muted)", maxWidth: "340px", textAlign: "right" }}>
          What I reach for. What I'm actively learning.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {skills.map((group, i) => {
          const c = colors[group.category] || { bg: "rgba(37,99,235,0.08)", text: "#2563EB" }
          return (
            <FadeIn key={group.category} delay={i * 70} direction="left">
              <div>
                <p className="mono text-xs mb-3 font-medium" style={{ color: c.text }}>
                  {group.category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map(item => (
                    <span
                      key={item}
                      style={{
                        fontSize: "0.82rem",
                        padding: "4px 10px",
                        borderRadius: "5px",
                        backgroundColor: c.bg,
                        color: c.text,
                        fontFamily: "Geist, sans-serif",
                        fontWeight: 500,
                        display: "inline-block",
                        transition: "transform 0.18s ease, box-shadow 0.18s ease",
                        cursor: "default",
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.transform = "translateY(-2px) scale(1.04)"
                        e.currentTarget.style.boxShadow = `0 4px 12px ${c.bg.replace("0.08", "0.3").replace("0.10", "0.3").replace("0.12", "0.3")}`
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.transform = ""
                        e.currentTarget.style.boxShadow = ""
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          )
        })}
      </div>
    </section>
  )
}
