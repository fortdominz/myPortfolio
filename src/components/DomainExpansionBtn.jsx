import { useState } from "react"
import { useDomainExpansion } from "../context/DomainExpansionContext"

export default function DomainExpansionBtn() {
  const { expanded, toggle } = useDomainExpansion()
  const [firing, setFiring] = useState(false)

  const handleClick = () => {
    if (firing) return
    setFiring(true)
    // Flash hits first (80ms in), then domain toggles after shockwave peak (500ms)
    setTimeout(() => toggle(), 500)
    setTimeout(() => setFiring(false), 800)
  }

  return (
    <>
      {/* Full-screen flash on activation */}
      {firing && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 99999, pointerEvents: "none",
          background: expanded
            ? "rgba(3, 0, 9, 0.6)"
            : "rgba(130, 60, 255, 0.18)",
          animation: "de-flash 0.5s cubic-bezier(0.2, 0, 0.8, 1) forwards",
        }} />
      )}

      {/* Expanding shockwave */}
      {firing && (
        <div style={{
          position: "fixed",
          bottom: "5.4rem",
          right: "1.8rem",
          width: 14,
          height: 14,
          borderRadius: "50%",
          border: expanded
            ? "2px solid rgba(100, 50, 200, 0.4)"
            : "2px solid rgba(160, 80, 255, 0.5)",
          pointerEvents: "none",
          animation: "de-shockwave 0.55s cubic-bezier(0.1, 0.7, 0.3, 1) forwards",
          zIndex: 9997,
        }} />
      )}

      {/* Button container */}
      <div style={{ position: "fixed", bottom: "5rem", right: "1.5rem", zIndex: 9998 }}>
        <button
          onClick={handleClick}
          title={expanded ? "Exit Domain Expansion" : "Domain Expansion"}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "9px 16px 9px 14px",
            /* Angular HUD corner cuts */
            clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
            border: "none",
            outline: "none",
            background: expanded
              ? "rgba(90, 30, 180, 0.18)"
              : "var(--surface)",
            color: expanded ? "#C084FC" : "var(--muted)",
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "0.68rem",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            cursor: firing ? "not-allowed" : "pointer",
            transition: "all 0.35s cubic-bezier(0.2, 0.8, 0.3, 1)",
            position: "relative",
            whiteSpace: "nowrap",
            /* Glow in expanded mode */
            boxShadow: expanded
              ? "0 0 0 1px rgba(168,85,247,0.4), 0 0 20px rgba(168,85,247,0.2), 0 0 50px rgba(168,85,247,0.08), inset 0 0 20px rgba(168,85,247,0.05)"
              : "0 0 0 1px var(--border)",
            animation: !expanded && !firing ? "de-idle-pulse 4s ease-in-out infinite" : "none",
          }}
        >
          {/* Icon */}
          <span style={{
            fontSize: "0.9rem",
            lineHeight: 1,
            display: "flex",
            alignItems: "center",
            animation: expanded ? "de-icon-in 0.4s cubic-bezier(0.2, 0.8, 0.3, 1)" : "none",
            color: expanded ? "#E879F9" : "inherit",
            filter: expanded ? "drop-shadow(0 0 6px rgba(232,121,249,0.6))" : "none",
          }}>
            {expanded ? "◉" : "⊕"}
          </span>

          {/* Label */}
          <span style={{
            letterSpacing: expanded ? "0.12em" : "0.08em",
            transition: "letter-spacing 0.3s ease",
          }}>
            {expanded ? "Plain Mode" : "Domain Expansion"}
          </span>

          {/* Animated corner pip — only in expanded mode */}
          {expanded && (
            <span style={{
              position: "absolute",
              top: 3,
              right: 3,
              width: 4,
              height: 4,
              background: "#E879F9",
              borderRadius: "50%",
              animation: "de-pip-blink 1.2s step-end infinite",
              filter: "drop-shadow(0 0 3px #E879F9)",
            }} />
          )}
        </button>

        {/* Corner border overlay — gives the HUD outline look */}
        <div style={{
          position: "absolute",
          inset: 0,
          clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
          border: expanded
            ? "1px solid rgba(192,132,252,0.45)"
            : "1px solid var(--border)",
          borderRadius: 0,
          pointerEvents: "none",
          transition: "border-color 0.35s ease",
        }} />
      </div>

      <style>{`
        @keyframes de-flash {
          0%   { opacity: 0; }
          25%  { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes de-shockwave {
          0%   { transform: scale(1);   opacity: 0.8; }
          100% { transform: scale(260); opacity: 0; }
        }
        @keyframes de-idle-pulse {
          0%, 100% { box-shadow: 0 0 0 1px var(--border); }
          50%       { box-shadow: 0 0 0 1px var(--border), 0 0 0 3px rgba(100,60,220,0.08); }
        }
        @keyframes de-icon-in {
          0%   { transform: rotate(-120deg) scale(0.4); opacity: 0; }
          100% { transform: rotate(0deg)   scale(1);   opacity: 1; }
        }
        @keyframes de-pip-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </>
  )
}
