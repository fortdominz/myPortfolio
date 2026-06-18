import { useState } from "react"
import { useDomainExpansion } from "../context/DomainExpansionContext"

export default function DomainExpansionBtn() {
  const { expanded, toggle } = useDomainExpansion()
  const [shockwave, setShockwave] = useState(false)

  const handleClick = () => {
    setShockwave(true)
    setTimeout(() => {
      toggle()
      setShockwave(false)
    }, 550)
  }

  return (
    <div style={{ position: "fixed", bottom: "5rem", right: "1.5rem", zIndex: 9998 }}>

      {/* Shockwave ring that expands from button on click */}
      {shockwave && (
        <div style={{
          position: "fixed",
          bottom: "5.5rem",
          right: "2rem",
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: expanded ? "rgba(0,210,255,0.12)" : "rgba(37,99,235,0.12)",
          pointerEvents: "none",
          animation: "de-shockwave 0.55s cubic-bezier(0.1, 0.8, 0.3, 1) forwards",
          zIndex: 9997,
        }} />
      )}

      <button
        onClick={handleClick}
        title={expanded ? "Exit Domain Expansion" : "Domain Expansion"}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "7px",
          padding: "9px 15px",
          borderRadius: "20px",
          border: expanded
            ? "1px solid rgba(0,210,255,0.35)"
            : "1px solid var(--border)",
          background: expanded
            ? "rgba(0,210,255,0.08)"
            : "var(--surface)",
          backdropFilter: expanded ? "blur(12px)" : "none",
          WebkitBackdropFilter: expanded ? "blur(12px)" : "none",
          color: expanded ? "#00D2FF" : "var(--muted)",
          fontFamily: "JetBrains Mono, monospace",
          fontSize: "0.7rem",
          fontWeight: 600,
          letterSpacing: "0.06em",
          cursor: "pointer",
          transition: "all 0.4s cubic-bezier(0.2, 0.8, 0.3, 1)",
          boxShadow: expanded
            ? "0 0 24px rgba(0,210,255,0.18), 0 0 60px rgba(0,210,255,0.06)"
            : "none",
          animation: !expanded ? "de-idle-pulse 3.5s ease-in-out infinite" : "none",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={e => {
          if (!expanded) e.currentTarget.style.borderColor = "var(--accent)"
        }}
        onMouseLeave={e => {
          if (!expanded) e.currentTarget.style.borderColor = "var(--border)"
        }}
      >
        <span style={{
          fontSize: "0.85rem",
          lineHeight: 1,
          animation: expanded ? "de-spin-in 0.4s ease-out" : "none",
        }}>
          {expanded ? "◎" : "⊕"}
        </span>
        {expanded ? "Plain Mode" : "Domain Expansion"}
      </button>

      <style>{`
        @keyframes de-shockwave {
          0%   { transform: scale(1);   opacity: 0.7; }
          100% { transform: scale(280); opacity: 0; }
        }
        @keyframes de-idle-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(37,99,235,0); }
          50%       { box-shadow: 0 0 0 5px rgba(37,99,235,0.07); }
        }
        @keyframes de-spin-in {
          0%   { transform: rotate(-90deg) scale(0.5); opacity: 0; }
          100% { transform: rotate(0deg)  scale(1);   opacity: 1; }
        }
        @keyframes de-breathe {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.04); }
        }
      `}</style>
    </div>
  )
}
