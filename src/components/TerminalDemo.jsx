import { useEffect, useRef, useState } from "react"

export default function TerminalDemo({ script }) {
  const [lines, setLines] = useState([])
  const [started, setStarted] = useState(false)
  const [typing, setTyping] = useState({ active: false, text: "", target: "", lineIdx: -1 })
  const containerRef = useRef(null)
  const timeoutsRef = useRef([])

  const clearAll = () => timeoutsRef.current.forEach(clearTimeout)

  const runScript = () => {
    clearAll()
    setLines([])
    setStarted(true)
    setTyping({ active: false, text: "", target: "", lineIdx: -1 })

    script.forEach((entry, i) => {
      const t = setTimeout(() => {
        if (entry.type === "output") {
          setLines(prev => [...prev, { type: "output", text: entry.text }])
        } else if (entry.type === "input") {
          setTyping({ active: true, text: "", target: entry.text, lineIdx: i })
          let charIdx = 0
          const typeChar = () => {
            charIdx++
            setTyping(prev => ({ ...prev, text: entry.text.slice(0, charIdx) }))
            if (charIdx < entry.text.length) {
              const ct = setTimeout(typeChar, 55)
              timeoutsRef.current.push(ct)
            } else {
              setLines(prev => [...prev, { type: "input", text: entry.text }])
              setTyping({ active: false, text: "", target: "", lineIdx: -1 })
            }
          }
          const ct = setTimeout(typeChar, 80)
          timeoutsRef.current.push(ct)
        }
      }, entry.delay)
      timeoutsRef.current.push(t)
    })
  }

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [lines, typing])

  useEffect(() => () => clearAll(), [])

  return (
    <div style={{
      backgroundColor: "var(--terminal-bg)",
      borderRadius: "0 0 8px 8px",
      overflow: "hidden",
    }}>
      {/* Terminal title bar */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 14px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ display: "flex", gap: "6px" }}>
          {["#FF5F57", "#FEBC2E", "#28C840"].map(c => (
            <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: c }} />
          ))}
        </div>
        <span className="mono" style={{ fontSize: "0.72rem", color: "var(--terminal-muted)" }}>
          bash
        </span>
        <button
          onClick={runScript}
          className="mono"
          style={{
            fontSize: "0.72rem",
            color: "var(--accent)",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "2px 6px",
          }}
        >
          {started ? "↺ replay" : "▶ run demo"}
        </button>
      </div>

      {/* Terminal body */}
      <div
        ref={containerRef}
        style={{
          padding: "14px 18px",
          height: "200px",
          overflowY: "auto",
          fontFamily: "JetBrains Mono, monospace",
          fontSize: "0.78rem",
          lineHeight: 1.7,
        }}
      >
        {!started && (
          <p style={{ color: "var(--terminal-muted)" }}>
            Press <span style={{ color: "var(--accent)" }}>▶ run demo</span> to see it in action.
          </p>
        )}
        {lines.map((l, i) => (
          <div key={i} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
            {l.type === "input" && (
              <span style={{ color: "var(--terminal-green)", flexShrink: 0 }}>$</span>
            )}
            <span style={{
              color: l.type === "input" ? "var(--terminal-text)" : "var(--terminal-muted)",
              whiteSpace: "pre",
            }}>
              {l.text}
            </span>
          </div>
        ))}
        {typing.active && (
          <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
            <span style={{ color: "var(--terminal-green)", flexShrink: 0 }}>$</span>
            <span style={{ color: "var(--terminal-text)", whiteSpace: "pre" }}>
              {typing.text}
              <span style={{
                display: "inline-block",
                width: "2px",
                height: "0.9em",
                backgroundColor: "var(--accent)",
                marginLeft: "1px",
                verticalAlign: "middle",
                animation: "blink 1s step-end infinite",
              }} />
            </span>
          </div>
        )}
      </div>
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </div>
  )
}
