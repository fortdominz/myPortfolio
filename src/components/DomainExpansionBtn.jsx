import { useState } from "react"
import { useDomainExpansion } from "../context/DomainExpansionContext"

export default function DomainExpansionBtn() {
  const { expanded, toggle } = useDomainExpansion()
  const [firing, setFiring] = useState(false)

  const handleClick = () => {
    if (firing) return
    setFiring(true)
    setTimeout(() => toggle(), 480)
    setTimeout(() => setFiring(false), 820)
  }

  return (
    <>
      {/* Activation flash */}
      {firing && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 100000, pointerEvents: "none",
          background: expanded ? "rgba(3,5,10,0.7)" : "rgba(200,218,252,0.16)",
          animation: "cd-flash 0.5s cubic-bezier(0.2,0,0.8,1) forwards",
        }} />
      )}

      {/* Shockwave ring */}
      {firing && (
        <div style={{
          position: "fixed", bottom: "5.4rem", right: "1.8rem",
          width: 14, height: 14, borderRadius: "50%",
          border: "2px solid rgba(200,218,252,0.5)",
          pointerEvents: "none",
          animation: "cd-shock 0.6s cubic-bezier(0.1,0.7,0.3,1) forwards",
          zIndex: 100001,
        }} />
      )}

      <div style={{ position: "fixed", bottom: "5rem", right: "1.5rem", zIndex: 100002 }}>
        <button
          onClick={handleClick}
          title={expanded ? "Release the domain" : "Domain Expansion"}
          style={{
            display: "flex", alignItems: "center", gap: "8px",
            padding: "9px 16px 9px 14px",
            clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
            border: "none", outline: "none",
            background: expanded ? "rgba(190,210,250,0.14)" : "var(--surface)",
            color: expanded ? "#EAF0FB" : "var(--muted)",
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "0.68rem", fontWeight: 600,
            letterSpacing: "0.1em", textTransform: "uppercase",
            cursor: firing ? "not-allowed" : "pointer",
            transition: "all 0.35s cubic-bezier(0.2,0.8,0.3,1)",
            position: "relative", whiteSpace: "nowrap",
            boxShadow: expanded
              ? "0 0 0 1px rgba(200,218,252,0.4), 0 0 22px rgba(160,190,245,0.22), 0 0 55px rgba(160,190,245,0.08)"
              : "0 0 0 1px var(--border)",
            animation: !expanded && !firing ? "cd-idle 4s ease-in-out infinite" : "none",
          }}
          onMouseEnter={e => { if (!expanded) e.currentTarget.style.color = "var(--accent)" }}
          onMouseLeave={e => { if (!expanded) e.currentTarget.style.color = "var(--muted)" }}
        >
          <span style={{
            fontSize: "0.92rem", lineHeight: 1, display: "flex", alignItems: "center",
            animation: expanded ? "cd-icon-in 0.4s cubic-bezier(0.2,0.8,0.3,1)" : "none",
            color: expanded ? "#CBD8EF" : "inherit",
            filter: expanded ? "drop-shadow(0 0 6px rgba(190,210,250,0.7))" : "none",
          }}>
            {expanded ? "◈" : "◇"}
          </span>
          <span style={{ letterSpacing: expanded ? "0.12em" : "0.08em", transition: "letter-spacing 0.3s ease" }}>
            {expanded ? "Release" : "Domain Expansion"}
          </span>
          {expanded && (
            <span style={{
              position: "absolute", top: 3, right: 3,
              width: 4, height: 4, background: "#CBD8EF", borderRadius: "50%",
              animation: "cd-pip 1.2s step-end infinite",
              filter: "drop-shadow(0 0 3px #CBD8EF)",
            }} />
          )}
        </button>

        {/* HUD outline */}
        <div style={{
          position: "absolute", inset: 0,
          clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
          border: expanded ? "1px solid rgba(200,218,252,0.5)" : "1px solid var(--border)",
          pointerEvents: "none", transition: "border-color 0.35s ease",
        }} />
      </div>

      <style>{`
        @keyframes cd-flash { 0% { opacity: 0; } 25% { opacity: 1; } 100% { opacity: 0; } }
        @keyframes cd-shock { 0% { transform: scale(1); opacity: 0.8; } 100% { transform: scale(260); opacity: 0; } }
        @keyframes cd-idle {
          0%,100% { box-shadow: 0 0 0 1px var(--border); }
          50%      { box-shadow: 0 0 0 1px var(--border), 0 0 0 3px rgba(150,180,240,0.08); }
        }
        @keyframes cd-icon-in { 0% { transform: rotate(-120deg) scale(0.4); opacity: 0; } 100% { transform: rotate(0) scale(1); opacity: 1; } }
        @keyframes cd-pip { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>
    </>
  )
}
