import { experience, extracurriculars } from "../data"

export default function Experience() {
  return (
    <section id="experience"
      className="max-w-5xl mx-auto px-6"
      style={{ borderTop: "1px solid var(--border)", backgroundColor: "var(--surface-alt)", paddingTop: "3rem", paddingBottom: "2.5rem" }}>

      <p className="mono text-xs uppercase tracking-widest mb-12" style={{ color: "var(--accent)" }}>
        Experience
      </p>

      <div className="flex flex-col gap-10">
        {experience.map((e, i) => (
          <div key={i} style={{
            display: "grid",
            gridTemplateColumns: "180px 1fr",
            gap: "0 40px",
            paddingBottom: i < experience.length - 1 ? "40px" : 0,
            borderBottom: i < experience.length - 1 ? "1px solid var(--border)" : "none",
          }}>
            {/* Left — meta */}
            <div>
              <p className="mono text-xs mb-1" style={{ color: "var(--muted)" }}>{e.period}</p>
              <p style={{ fontSize: "0.82rem", color: "var(--muted)" }}>{e.location}</p>
            </div>

            {/* Right — content */}
            <div>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px", marginBottom: "2px" }}>
                <h3 style={{
                  fontFamily: "Fraunces, serif",
                  fontSize: "1.05rem",
                  fontWeight: 600,
                  color: "var(--text)",
                }}>
                  {e.role}
                </h3>
                {e.tags && (
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", justifyContent: "flex-end", flexShrink: 0 }}>
                    {e.tags.map(tag => (
                      <span key={tag} className="mono" style={{
                        fontSize: "0.68rem",
                        padding: "2px 8px",
                        borderRadius: "4px",
                        color: "var(--accent-dark)",
                        backgroundColor: "rgba(126,184,212,0.1)",
                        border: "1px solid rgba(126,184,212,0.25)",
                        fontWeight: 500,
                        whiteSpace: "nowrap",
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <p style={{ fontSize: "0.88rem", color: "var(--accent-dark)", marginBottom: "12px", fontWeight: 500 }}>
                {e.org}
              </p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "6px" }}>
                {e.bullets.map((b, j) => (
                  <li key={j} style={{
                    fontSize: "0.88rem",
                    color: "var(--muted)",
                    lineHeight: 1.65,
                    display: "flex",
                    gap: "10px",
                    alignItems: "flex-start",
                  }}>
                    <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "var(--accent)", flexShrink: 0, marginTop: "8px" }} />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Extracurriculars */}
      <div style={{ marginTop: "48px", paddingTop: "40px", borderTop: "1px solid var(--border)" }}>
        <p className="mono text-xs uppercase tracking-widest mb-6" style={{ color: "var(--accent)" }}>
          Extracurriculars
        </p>
        <div className="flex flex-wrap gap-3">
          {extracurriculars.map(e => (
            <span key={e} style={{
              fontSize: "0.88rem",
              padding: "7px 16px",
              border: "1px solid var(--border)",
              borderRadius: "6px",
              color: "var(--text)",
              fontWeight: 500,
            }}>
              {e}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
