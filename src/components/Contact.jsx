import { profile } from "../data"

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

        <p style={{ fontSize: "0.97rem", color: "var(--muted)", lineHeight: 1.7, marginBottom: "2.5rem" }}>
          Open to internship opportunities, collaborations, and conversations. If something I'm building is interesting to you — reach out.
        </p>

        <div className="flex flex-col gap-3">
          <a href={`mailto:${profile.email}`} style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "0.9rem",
            color: "var(--text)",
            textDecoration: "none",
            fontWeight: 500,
          }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--accent)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--text)"}
          >
            <span className="mono" style={{ color: "var(--muted)", fontSize: "0.78rem", width: "48px" }}>email</span>
            {profile.email}
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "0.9rem",
            color: "var(--text)",
            textDecoration: "none",
            fontWeight: 500,
          }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--accent)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--text)"}
          >
            <span className="mono" style={{ color: "var(--muted)", fontSize: "0.78rem", width: "48px" }}>github</span>
            github.com/fortdominz
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "0.9rem",
            color: "var(--text)",
            textDecoration: "none",
            fontWeight: 500,
          }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--accent)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--text)"}
          >
            <span className="mono" style={{ color: "var(--muted)", fontSize: "0.78rem", width: "48px" }}>in</span>
            linkedin.com/in/dominion-eze
          </a>
        </div>
      </div>
    </section>
  )
}
