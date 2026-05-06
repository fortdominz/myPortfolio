import { education, certifications } from "../data"

export default function Education() {
  return (
    <section id="education"
      className="max-w-5xl mx-auto px-6"
      style={{ borderTop: "1px solid var(--border)", paddingTop: "3rem", paddingBottom: "2.5rem" }}>

      <p className="mono text-xs uppercase tracking-widest mb-10" style={{ color: "var(--accent)" }}>
        Education
      </p>

      {/* Schools */}
      <div className="flex flex-col" style={{ gap: "2rem", marginBottom: "3rem" }}>
        {education.map((e, i) => (
          <div key={i} style={{
            display: "grid",
            gridTemplateColumns: "180px 1fr",
            gap: "0 40px",
            paddingBottom: i < education.length - 1 ? "2rem" : 0,
            borderBottom: i < education.length - 1 ? "1px solid var(--border)" : "none",
          }}>
            {/* Left */}
            <div>
              <p className="mono text-xs mb-1" style={{ color: "var(--muted)" }}>{e.period}</p>
              <p style={{ fontSize: "0.82rem", color: "var(--muted)" }}>{e.location}</p>
              {e.gpa && (
                <p className="mono" style={{
                  fontSize: "0.75rem",
                  marginTop: "8px",
                  color: "var(--accent-dark)",
                  fontWeight: 600,
                }}>
                  GPA {e.gpa}
                </p>
              )}
            </div>

            {/* Right */}
            <div>
              <h3 style={{
                fontFamily: "Fraunces, serif",
                fontSize: "1.05rem",
                fontWeight: 600,
                color: "var(--text)",
                marginBottom: "2px",
              }}>
                {e.school}
              </h3>
              <p style={{ fontSize: "0.88rem", color: "var(--accent-dark)", fontWeight: 500, marginBottom: "12px" }}>
                {e.degree}
              </p>
              {e.highlights.length > 0 && (
                <div style={{
                  padding: "10px 14px",
                  backgroundColor: "var(--terminal-bg)",
                  borderRadius: "6px",
                  display: "inline-block",
                }}>
                  <p className="mono" style={{ fontSize: "0.7rem", color: "var(--terminal-muted)", marginBottom: "6px" }}>
                    // coursework
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {e.highlights.map(h => (
                      <span key={h} className="mono" style={{
                        fontSize: "0.72rem",
                        color: "var(--terminal-blue)",
                        backgroundColor: "rgba(121,192,255,0.08)",
                        padding: "2px 8px",
                        borderRadius: "4px",
                      }}>
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Certifications */}
      <div style={{ paddingTop: "2rem", borderTop: "1px solid var(--border)" }}>
        <p className="mono text-xs uppercase tracking-widest mb-6" style={{ color: "var(--accent)" }}>
          Certifications
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {certifications.map((c, i) => (
            <a
              key={i}
              href={c.file}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 16px",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                backgroundColor: "var(--bg)",
                textDecoration: "none",
                transition: "border-color 0.15s",
                cursor: "pointer",
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "var(--accent)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
            >
              <span style={{
                width: "6px", height: "6px", borderRadius: "50%",
                backgroundColor: "var(--accent)", flexShrink: 0,
              }} />
              <div>
                <p style={{ fontSize: "0.88rem", fontWeight: 500, color: "var(--text)", lineHeight: 1.3 }}>
                  {c.name}
                </p>
                <p className="mono" style={{ fontSize: "0.72rem", color: "var(--muted)" }}>
                  {c.issuer}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
