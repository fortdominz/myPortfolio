import { profile } from "../data"

export default function About() {
  const paragraphs = profile.bio.split("\n\n")

  return (
    <section id="about"
      className="max-w-5xl mx-auto px-6"
      style={{ borderTop: "1px solid var(--border)", paddingTop: "3rem", paddingBottom: "2.5rem" }}>
      <div className="grid grid-cols-1 gap-12" style={{ gridTemplateColumns: "1fr 1.6fr" }}>

        {/* Left — label + quick facts */}
        <div>
          <p className="mono text-xs uppercase tracking-widest mb-8"
            style={{ color: "var(--accent)" }}>
            About
          </p>
          <div className="flex flex-col gap-4">
            {[
              ["School", "Fisk University"],
              ["Major", "Computer Science"],
              ["GPA", "4.0"],
              ["Grad", "Dec. 2028"],
              ["Based in", "Nashville, TN"],
              ["Origin", "Lagos, Nigeria"],
            ].map(([label, value]) => (
              <div key={label} style={{ borderBottom: "1px solid var(--border)", paddingBottom: "12px" }}>
                <p className="mono text-xs mb-1" style={{ color: "var(--muted)" }}>{label}</p>
                <p style={{ fontSize: "0.95rem", fontWeight: 500, color: "var(--text)" }}>{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — bio */}
        <div>
          <h2 style={{
            fontFamily: "Fraunces, serif",
            fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
            fontWeight: 600,
            marginBottom: "1.5rem",
            lineHeight: 1.2,
            color: "var(--text)",
          }}>
            Building the tools<br />
            <em style={{ fontWeight: 300, color: "var(--muted)" }}>I wish existed.</em>
          </h2>

          {paragraphs.map((p, i) => (
            <p key={i} style={{
              color: "var(--muted)",
              fontSize: "0.97rem",
              lineHeight: 1.75,
              marginBottom: i < paragraphs.length - 1 ? "1.2rem" : 0,
            }}>
              {p}
            </p>
          ))}

          {/* Coursework */}
          <div style={{
            marginTop: "2rem",
            padding: "16px 20px",
            backgroundColor: "var(--terminal-bg)",
            borderRadius: "8px",
          }}>
            <p className="mono text-xs mb-3" style={{ color: "var(--terminal-muted)" }}>
              // relevant coursework
            </p>
            <div className="flex flex-wrap gap-2">
              {profile.education.coursework.map(c => (
                <span key={c} className="mono" style={{
                  fontSize: "0.78rem",
                  color: "var(--terminal-blue)",
                  backgroundColor: "rgba(121,192,255,0.08)",
                  padding: "3px 10px",
                  borderRadius: "4px",
                }}>
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
