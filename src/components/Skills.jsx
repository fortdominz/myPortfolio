import { skills } from "../data"

const colors = {
  "Languages":          { bg: "rgba(126,184,212,0.1)", text: "#5A9AB8" },
  "Frameworks & Tools": { bg: "rgba(126,212,153,0.1)", text: "#3A9A60" },
  "Currently Learning": { bg: "rgba(255,184,100,0.1)", text: "#B87820" },
  "AI-Augmented Dev":   { bg: "rgba(180,140,255,0.12)", text: "#8060C0" },
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
        {skills.map(group => {
          const c = colors[group.category] || { bg: "rgba(126,184,212,0.1)", text: "#5A9AB8" }
          return (
            <div key={group.category}>
              <p className="mono text-xs mb-3 font-medium" style={{ color: c.text }}>
                {group.category}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map(item => (
                  <span key={item} style={{
                    fontSize: "0.82rem",
                    padding: "4px 10px",
                    borderRadius: "5px",
                    backgroundColor: c.bg,
                    color: c.text,
                    fontFamily: "Geist, sans-serif",
                    fontWeight: 500,
                  }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
