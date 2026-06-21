import { useEffect, useState } from "react"

const SECTIONS = [
  { id: "top",        label: "Home" },
  { id: "about",      label: "About" },
  { id: "skills",     label: "Skills" },
  { id: "projects",   label: "Projects" },
  { id: "education",  label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "contact",    label: "Contact" },
]

export default function SectionDots() {
  const [active, setActive] = useState("top")
  const [hovered, setHovered] = useState(null)

  useEffect(() => {
    const observers = []
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { threshold: 0.25 }
      )
      observer.observe(el)
      observers.push(observer)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  const handleClick = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    const navHeight = 64
    const top = el.getBoundingClientRect().top + window.scrollY - navHeight
    window.scrollTo({ top, behavior: "smooth" })
  }

  return (
    <div style={{
      position: "fixed",
      right: "20px",
      top: "50%",
      transform: "translateY(-50%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "12px",
      zIndex: 300,
    }}>
      {SECTIONS.map(({ id, label }) => {
        const isActive = active === id
        const isHovered = hovered === id
        return (
          <div key={id} style={{ position: "relative", display: "flex", alignItems: "center" }}>
            {/* Tooltip */}
            {isHovered && (
              <div style={{
                position: "absolute",
                right: "22px",
                backgroundColor: "var(--terminal-bg)",
                color: "var(--terminal-text)",
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "0.68rem",
                padding: "4px 10px",
                borderRadius: "4px",
                whiteSpace: "nowrap",
                pointerEvents: "none",
                border: "1px solid var(--border)",
              }}>
                {label}
              </div>
            )}
            <button
              onClick={() => handleClick(id)}
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                width: isActive ? "10px" : "6px",
                height: isActive ? "10px" : "6px",
                borderRadius: "50%",
                backgroundColor: isActive ? "var(--accent)" : "var(--border)",
                border: isActive ? "none" : "1px solid var(--muted)",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.2s ease",
                boxShadow: isActive ? "0 0 8px var(--accent)" : "none",
                outline: "none",
              }}
            />
          </div>
        )
      })}
    </div>
  )
}
