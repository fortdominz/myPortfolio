import { useState, useRef, useEffect } from "react"
import { useFrost } from "../context/FrostContext"

const SnowflakeIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1" />
    <path d="M12 5.5 9.8 7.7M12 5.5l2.2 2.2M12 18.5l-2.2-2.2M12 18.5l2.2-2.2" />
    <path d="M5.5 12 7.7 9.8M5.5 12l2.2 2.2M18.5 12l-2.2-2.2M18.5 12l-2.2 2.2" />
  </svg>
)

const SoundOnIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 5 6 9H2v6h4l5 4V5z" />
    <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14" />
  </svg>
)

const SoundOffIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 5 6 9H2v6h4l5 4V5z" />
    <path d="M22 9l-6 6M16 9l6 6" />
  </svg>
)

/**
 * FrostToggle — engages / releases Frost mode with a freeze-flash burst and
 * an activation chime. A small mute button (persisted to localStorage) sits
 * beside it. Audio lives at /frost-activate.mp3 in the public folder.
 * Sits just above the StatusBar in the bottom-right corner.
 */
export default function FrostToggle() {
  const { frost, toggle } = useFrost()
  const [firing, setFiring] = useState(false)
  const [muted, setMuted] = useState(() => {
    try { return localStorage.getItem("frost-muted") === "on" } catch { return false }
  })
  const audioRef = useRef(null)

  const reduce = typeof window !== "undefined" &&
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches

  // Preload the activation chime once.
  useEffect(() => {
    const a = new Audio("/frost-activate.mp3")
    a.preload = "auto"
    a.volume = 0.7
    audioRef.current = a
  }, [])

  useEffect(() => {
    try { localStorage.setItem("frost-muted", muted ? "on" : "off") } catch { /* ignore */ }
  }, [muted])

  const playChime = () => {
    if (muted || reduce) return
    const a = audioRef.current
    if (!a) return
    try { a.currentTime = 0; const p = a.play(); if (p && p.catch) p.catch(() => {}) } catch { /* ignore */ }
  }

  const stopChime = () => {
    const a = audioRef.current
    if (!a) return
    try { a.pause(); a.currentTime = 0 } catch { /* ignore */ }
  }

  const handleClick = () => {
    if (firing) return
    setFiring(true)
    if (!frost) playChime()          // chime only when engaging frost
    else stopChime()
    setTimeout(() => toggle(), 360)  // swap mid-flash
    setTimeout(() => setFiring(false), 900)
  }

  const handleMute = () => {
    setMuted(m => {
      const next = !m
      if (next) stopChime()
      return next
    })
  }

  return (
    <>
      {/* Freeze flash */}
      {firing && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 100000, pointerEvents: "none",
          background: frost
            ? "rgba(4,12,24,0.6)"
            : "radial-gradient(circle at calc(100% - 3rem) calc(100% - 3.4rem), rgba(255,255,255,0.95), rgba(186,230,253,0.5) 38%, rgba(95,201,248,0.18) 66%, transparent 100%)",
          animation: "fr-flash 0.85s cubic-bezier(0.2,0,0.8,1) forwards",
        }} />
      )}

      {/* Shockwave rings */}
      {firing && !frost && (
        <>
          <div style={ringStyle("rgba(186,230,253,0.6)", 0)} />
          <div style={ringStyle("rgba(255,255,255,0.45)", 0.06)} />
        </>
      )}

      <div style={{
        position: "fixed", bottom: "3rem", right: "1.5rem", zIndex: 100002,
        display: "flex", alignItems: "center", gap: "8px",
      }}>
        {/* Mute toggle */}
        <button
          onClick={handleMute}
          title={muted ? "Unmute frost chime" : "Mute frost chime"}
          aria-label={muted ? "Unmute frost chime" : "Mute frost chime"}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: 38, height: 38, borderRadius: "50%",
            border: frost ? "1px solid rgba(169,236,246,0.4)" : "1px solid var(--border)",
            background: frost ? "rgba(125,211,252,0.14)" : "var(--bg)",
            color: muted ? "var(--muted)" : (frost ? "#A9ECF6" : "var(--accent)"),
            cursor: "pointer",
            transition: "all 0.3s cubic-bezier(0.2,0.8,0.3,1)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
            backdropFilter: frost ? "blur(8px)" : "none",
            WebkitBackdropFilter: frost ? "blur(8px)" : "none",
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)" }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)" }}
        >
          {muted ? <SoundOffIcon /> : <SoundOnIcon />}
        </button>

        {/* Frost toggle */}
        <button
          onClick={handleClick}
          title={frost ? "Melt — back to plain" : "Freeze"}
          style={{
            display: "flex", alignItems: "center", gap: "8px",
            padding: "10px 18px",
            borderRadius: "30px", border: "none", outline: "none",
            background: frost ? "rgba(125,211,252,0.16)" : "var(--accent)",
            color: frost ? "#EAF4FF" : "#fff",
            fontFamily: "Geist, system-ui, sans-serif",
            fontSize: "0.84rem", fontWeight: 600, letterSpacing: "0.01em",
            cursor: firing ? "not-allowed" : "pointer",
            transition: "all 0.35s cubic-bezier(0.2,0.8,0.3,1)",
            position: "relative", whiteSpace: "nowrap", overflow: "hidden",
            boxShadow: frost
              ? "0 0 0 1px rgba(169,236,246,0.5), 0 8px 34px rgba(125,211,252,0.45)"
              : "0 8px 28px rgba(0,0,0,0.18)",
            backdropFilter: frost ? "blur(8px)" : "none",
            WebkitBackdropFilter: frost ? "blur(8px)" : "none",
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)" }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)" }}
        >
          {/* sheen sweep */}
          <span style={{
            position: "absolute", inset: 0, borderRadius: "30px", pointerEvents: "none", overflow: "hidden",
          }}>
            <span style={{
              position: "absolute", top: 0, bottom: 0, width: "40%",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
              animation: "fr-sheen 4.5s ease-in-out infinite",
            }} />
          </span>
          <span style={{
            display: "flex", alignItems: "center",
            filter: frost ? "drop-shadow(0 0 6px rgba(186,230,253,0.8))" : "none",
            animation: frost ? "fr-spin-in 0.5s cubic-bezier(0.2,0.8,0.3,1)" : "none",
          }}>
            <SnowflakeIcon />
          </span>
          <span>{frost ? "Melt" : "Freeze"}</span>
          {frost && (
            <span style={{
              position: "absolute", top: 6, right: 8,
              width: 4, height: 4, borderRadius: "50%", background: "#A9ECF6",
              filter: "drop-shadow(0 0 3px #A9ECF6)",
              animation: "fr-pip 1.4s step-end infinite",
            }} />
          )}
        </button>
      </div>

      <style>{`
        @keyframes fr-flash { 0% { opacity: 0; } 18% { opacity: 1; } 100% { opacity: 0; } }
        @keyframes fr-sheen { 0% { transform: translateX(-160%); } 55%,100% { transform: translateX(420%); } }
        @keyframes fr-spin-in { 0% { transform: rotate(-160deg) scale(0.4); opacity: 0; } 100% { transform: rotate(0) scale(1); opacity: 1; } }
        @keyframes fr-pip { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes fr-shock { 0% { transform: translate(-50%,-50%) scale(0); opacity: 0.85; } 100% { transform: translate(-50%,-50%) scale(36); opacity: 0; } }
      `}</style>
    </>
  )
}

function ringStyle(color, delay) {
  return {
    position: "fixed",
    bottom: "3.4rem", right: "3rem",
    width: 30, height: 30, borderRadius: "50%",
    border: `2px solid ${color}`,
    transform: "translate(-50%,-50%) scale(0)",
    pointerEvents: "none", zIndex: 100001,
    animation: `fr-shock 0.95s cubic-bezier(0.1,0.7,0.3,1) ${delay}s forwards`,
  }
}
