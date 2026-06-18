import { useEffect, useRef, useState } from "react"

const PERSONS = [
  { name: "Dominion E.", granted: true, confidence: 94.3 },
  { name: "Unknown", granted: false, confidence: 28.5 },
  { name: "Sarah K.", granted: true, confidence: 91.7 },
]

const INIT_LOGS = [
  { id: 1, name: "Marcus T.", time: "10:30", granted: true },
  { id: 2, name: "Jordan L.", time: "10:25", granted: true },
  { id: 3, name: "Unknown", time: "10:22", granted: false },
]

export default function GateKeepMockup() {
  const [phase, setPhase] = useState("scanning")
  const [pidx, setPidx] = useState(0)
  const [conf, setConf] = useState(0)
  const [logs, setLogs] = useState(INIT_LOGS)
  const [stats, setStats] = useState({ total: 14, granted: 12 })
  const timers = useRef([])
  const cycleRef = useRef(0)
  const logIdRef = useRef(10)

  function clr() { timers.current.forEach(clearTimeout); timers.current = [] }
  function T(fn, ms) { const id = setTimeout(fn, ms); timers.current.push(id) }

  function countUpTo(target, cb) {
    let curr = 0
    const inc = target / 18
    function step() {
      curr = Math.min(curr + inc, target)
      setConf(parseFloat(curr.toFixed(1)))
      if (curr >= target) { cb(); return }
      const id = setTimeout(step, 60)
      timers.current.push(id)
    }
    const id = setTimeout(step, 60)
    timers.current.push(id)
  }

  function runCycle() {
    const n = cycleRef.current
    const person = PERSONS[n % PERSONS.length]
    cycleRef.current = n + 1

    setPhase("scanning")
    setConf(0)

    T(() => {
      setPidx(n % PERSONS.length)
      setPhase("detecting")
      countUpTo(person.confidence, () => {
        T(() => {
          setPhase(person.granted ? "granted" : "denied")
          T(() => {
            const now = new Date()
            const ts = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`
            const newId = logIdRef.current++
            setLogs(prev => [{ id: newId, name: person.name, time: ts, granted: person.granted }, ...prev.slice(0, 3)])
            setStats(prev => ({ total: prev.total + 1, granted: prev.granted + (person.granted ? 1 : 0) }))
            T(runCycle, 1500)
          }, 700)
        }, 650)
      })
    }, 2100)
  }

  useEffect(() => { runCycle(); return clr }, [])

  const person = PERSONS[pidx]
  const isDetecting = ["detecting", "granted", "denied"].includes(phase)
  const isGranted = phase === "granted"
  const isDenied = phase === "denied"
  const bboxColor = isDenied ? "#EF4444" : "#3B8BEB"

  return (
    <div style={{ width: "100%", maxWidth: "560px", margin: "0 auto" }}>
      <span style={{ display: "block", width: 6, height: 6, borderRadius: "50%", background: "#2A2A2A", margin: "5px auto" }} />
      <div style={{ borderRadius: "10px 10px 0 0", border: "3px solid #1C1C1C", padding: 5, background: "#0F0F0F", overflow: "hidden" }}>
        <div style={{ borderRadius: 6, overflow: "hidden" }}>
          <div style={{ background: "#070F1C", height: 210, display: "flex", flexDirection: "column", fontFamily: "monospace", overflow: "hidden" }}>

            {/* Header */}
            <div style={{ background: "#040A14", borderBottom: "1px solid #0D1E35", padding: "5px 10px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
              <span style={{ fontSize: 8.5, fontWeight: 700, color: "#3B8BEB", letterSpacing: ".1em" }}>GATEKEEP</span>
              <span style={{ fontSize: 6, color: "#1A3A6A" }}>CAM-01 · ENTRANCE</span>
              <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#22C55E", animation: "gk-livepulse 1.4s ease-in-out infinite" }} />
                <span style={{ fontSize: 6, color: "#22C55E" }}>LIVE</span>
              </div>
            </div>

            {/* Body */}
            <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

              {/* Camera panel */}
              <div style={{ flex: 1.2, borderRight: "1px solid #0D1E35", padding: 6, display: "flex", flexDirection: "column", gap: 4 }}>

                {/* Feed */}
                <div style={{
                  flex: 1, background: "#040A14",
                  borderRadius: 4,
                  border: `1px solid ${isGranted ? "rgba(34,197,94,.35)" : isDenied ? "rgba(239,68,68,.35)" : "#0D1E35"}`,
                  position: "relative", overflow: "hidden",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "border-color .3s",
                }}>
                  {isGranted && <div style={{ position: "absolute", inset: 0, background: "rgba(34,197,94,.05)" }} />}
                  {isDenied && <div style={{ position: "absolute", inset: 0, background: "rgba(239,68,68,.05)" }} />}

                  {/* Scan bar */}
                  {phase === "scanning" && (
                    <div style={{ position: "absolute", left: 0, right: 0, height: 2, background: "rgba(59,139,235,.45)", animation: "gk-scanbar 2.2s ease-in-out infinite" }} />
                  )}

                  {/* Face silhouette */}
                  <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#08131F", border: "1px solid #0D1E35", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#0D1E35" }} />
                  </div>

                  {/* SVG bounding box */}
                  {isDetecting && (
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", animation: "gk-bbox-in .2s ease-out" }}>
                      <path d="M0 12 L0 0 L12 0" stroke={bboxColor} strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M36 0 L48 0 L48 12" stroke={bboxColor} strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M0 36 L0 48 L12 48" stroke={bboxColor} strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M36 48 L48 48 L48 36" stroke={bboxColor} strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  )}

                  {/* Person name tag */}
                  {(isGranted || isDenied) && (
                    <div style={{ position: "absolute", top: 4, right: 5, fontSize: 5, color: isGranted ? "#22C55E" : "#EF4444", letterSpacing: ".06em" }}>
                      {person.name}
                    </div>
                  )}

                  {/* Status overlay */}
                  <div style={{ position: "absolute", bottom: 4, left: 0, right: 0, textAlign: "center" }}>
                    {phase === "scanning" && <span style={{ fontSize: 5.5, color: "#3B8BEB", letterSpacing: ".1em" }}>SCANNING...</span>}
                    {phase === "detecting" && <span style={{ fontSize: 5.5, color: "#FAB800", letterSpacing: ".1em" }}>ANALYZING · {conf.toFixed(1)}%</span>}
                    {isGranted && <span style={{ fontSize: 5.5, color: "#22C55E", letterSpacing: ".1em", fontWeight: 700 }}>ACCESS GRANTED · {person.confidence}%</span>}
                    {isDenied && <span style={{ fontSize: 5.5, color: "#EF4444", letterSpacing: ".1em", fontWeight: 700 }}>ACCESS DENIED · {person.confidence}%</span>}
                  </div>
                </div>

                {/* Stats */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 3 }}>
                  {[
                    ["TODAY", stats.total, "#5A9AD0"],
                    ["GRANTED", stats.granted, "#22C55E"],
                    ["DENIED", stats.total - stats.granted, "#EF4444"],
                    ["USERS", 8, "#5A9AD0"],
                  ].map(([label, val, color]) => (
                    <div key={label} style={{ background: "#040A14", border: "1px solid #0D1E35", borderRadius: 3, padding: "3px 4px", textAlign: "center" }}>
                      <div style={{ fontSize: 4.5, color: "#1A3A6A", marginBottom: 1 }}>{label}</div>
                      <div style={{ fontSize: 9, fontWeight: 700, color, fontFamily: "monospace" }}>{val}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Access log */}
              <div style={{ width: 118, padding: 6, display: "flex", flexDirection: "column", gap: 3, overflow: "hidden" }}>
                <div style={{ fontSize: 5.5, color: "#1A3A6A", letterSpacing: ".08em", marginBottom: 1 }}>ACCESS LOG</div>
                {logs.slice(0, 4).map(log => (
                  <div key={log.id} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "2.5px 5px",
                    background: "#040A14", borderRadius: 2, border: "1px solid #0D1E35",
                    animation: "gk-log-in .4s ease-out",
                  }}>
                    <span style={{ fontSize: 5.5, color: "#6A9AC8" }}>{log.name}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <span style={{ fontSize: 4.5, color: "#1A3A6A" }}>{log.time}</span>
                      <span style={{
                        fontSize: 4.5, padding: "1px 4px", borderRadius: 2, fontWeight: 700,
                        background: log.granted ? "rgba(34,197,94,.15)" : "rgba(239,68,68,.15)",
                        color: log.granted ? "#22C55E" : "#EF4444",
                      }}>
                        {log.granted ? "OK" : "NO"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: 14, background: "#1C1C1C", borderRadius: "0 0 3px 3px", margin: "0 -3px" }} />
      <div style={{ height: 6, background: "#111", borderRadius: "0 0 8px 8px", margin: "0 18px" }} />

      <style>{`
        @keyframes gk-livepulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.5)} }
        @keyframes gk-scanbar { 0%{top:6%;opacity:.6} 50%{opacity:1} 100%{top:94%;opacity:.1} }
        @keyframes gk-bbox-in { from{opacity:0;transform:translate(-50%,-50%) scale(.7)} to{opacity:1;transform:translate(-50%,-50%) scale(1)} }
        @keyframes gk-log-in { from{opacity:0;transform:translateX(8px)} to{opacity:1;transform:translateX(0)} }
      `}</style>
    </div>
  )
}
