import { useEffect, useRef, useState } from "react"

const bootLines = [
  { text: "initializing portfolio...", delay: 0 },
  { text: "loading experience data...", delay: 500 },
  { text: "compiling projects...", delay: 950 },
  { text: "ready.", delay: 1350, green: true },
]

export default function LoadingScreen({ onDone }) {
  const [visibleLines, setVisibleLines] = useState([])
  const [fading, setFading] = useState(false)
  const ran = useRef(false)

  useEffect(() => {
    if (ran.current) return
    ran.current = true

    bootLines.forEach(({ text, delay, green }) => {
      setTimeout(() => setVisibleLines(prev => [...prev, { text, green }]), delay)
    })

    // stay visible for 1.7 seconds after "ready." appears, then fade
    setTimeout(() => setFading(true), 3050)
    setTimeout(() => onDone(), 3500)
  }, [])

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      backgroundColor: "#0D1117",
      zIndex: 10000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      opacity: fading ? 0 : 1,
      transition: "opacity 0.45s ease",
      pointerEvents: fading ? "none" : "all",
    }}>
      <div style={{ fontFamily: "JetBrains Mono, monospace" }}>
        <div style={{ color: "#7EB8D4", fontSize: "0.85rem", marginBottom: "1.2rem" }}>
          ~/dominion $
        </div>
        {visibleLines.map((line, i) => (
          <div key={i} style={{
            color: line.green ? "#7EE787" : "#C9D1D9",
            fontSize: "0.82rem",
            marginBottom: "0.45rem",
            animation: "fadeSlideIn 0.3s ease forwards",
          }}>
            {line.text}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
