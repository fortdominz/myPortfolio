import { useEffect, useRef, useState } from "react"

const TASKS = [
  "Review FastAPI docs",
  "Push portfolio commit",
  "Study Data Structures ch.4",
]

const JOURNAL = "locked in on the portfolio build. the momentum is real this week..."

export default function DayKeepMockup() {
  const [checked, setChecked] = useState([false, false, false])
  const [streak, setStreak] = useState(14)
  const [journal, setJournal] = useState("")
  const timers = useRef([])

  function clr() { timers.current.forEach(clearTimeout); timers.current = [] }
  function T(fn, ms) { const id = setTimeout(fn, ms); timers.current.push(id) }

  function typeJournal(idx, cb) {
    setJournal(JOURNAL.slice(0, idx))
    if (idx <= JOURNAL.length) {
      const id = setTimeout(() => typeJournal(idx + 1, cb), 36)
      timers.current.push(id)
    } else {
      cb && cb()
    }
  }

  function run() {
    clr()
    setChecked([false, false, false])
    setStreak(14)
    setJournal("")

    T(() => setChecked([true, false, false]), 1400)
    T(() => setChecked([true, true, false]), 2700)
    T(() => setStreak(15), 3400)
    T(() => typeJournal(0, () => T(run, 3500)), 4100)
  }

  useEffect(() => { run(); return clr }, [])

  return (
    <div style={{ width: "100%", maxWidth: "560px", margin: "0 auto" }}>
      <span style={{ display: "block", width: 6, height: 6, borderRadius: "50%", background: "#C8C8C8", margin: "5px auto" }} />
      <div style={{ borderRadius: "10px 10px 0 0", border: "3px solid #C0C0C0", padding: 5, background: "#E4E4E4", overflow: "hidden" }}>
        <div style={{ borderRadius: 6, overflow: "hidden" }}>
          <div style={{ background: "#F7FBF5", height: 210, display: "flex", flexDirection: "column", fontFamily: "'Geist', system-ui, sans-serif", overflow: "hidden" }}>

            {/* Header */}
            <div style={{ background: "#E8F4E5", borderBottom: "1px solid #CEEAC9", padding: "5px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: "#2A7040", letterSpacing: ".04em" }}>DayKeep</span>
              <span style={{ fontSize: 6.5, color: "#68A87E" }}>May 18, 2026</span>
              <div style={{ display: "flex", alignItems: "center", gap: 4, background: "rgba(42,112,64,.1)", border: "1px solid rgba(42,112,64,.2)", borderRadius: 8, padding: "2px 8px" }}>
                <span style={{ fontSize: 8 }}>🔥</span>
                <span style={{ fontSize: 8, fontWeight: 700, color: "#2A7040" }}>{streak} days</span>
              </div>
            </div>

            {/* Body */}
            <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

              {/* Left — tasks + goal */}
              <div style={{ flex: 1.1, borderRight: "1px solid #CEEAC9", padding: 8, display: "flex", flexDirection: "column", gap: 5 }}>
                <div style={{ fontSize: 6, color: "#68A87E", letterSpacing: ".1em", textTransform: "uppercase" }}>Today's Tasks</div>
                {TASKS.map((task, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{
                      width: 13, height: 13, borderRadius: 3, border: `1.5px solid ${checked[i] ? "#2A7040" : "#A2D4B0"}`,
                      background: checked[i] ? "#2A7040" : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "all .25s", flexShrink: 0,
                    }}>
                      {checked[i] && (
                        <svg width="7" height="7" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span style={{
                      fontSize: 7.5, color: checked[i] ? "#A2D4B0" : "#2A4535",
                      textDecoration: checked[i] ? "line-through" : "none",
                      transition: "all .25s",
                    }}>{task}</span>
                  </div>
                ))}

                <div style={{ marginTop: 3, fontSize: 6, color: "#68A87E", letterSpacing: ".1em", textTransform: "uppercase" }}>Active Goal</div>
                <div style={{ background: "#E8F4E5", border: "1px solid #CEEAC9", borderRadius: 4, padding: "5px 7px" }}>
                  <div style={{ fontSize: 7.5, color: "#2A7040", fontWeight: 600, marginBottom: 4 }}>Build portfolio</div>
                  <div style={{ height: 4, background: "#CEEAC9", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: "80%", background: "#2A7040", borderRadius: 2, transition: "width .8s" }} />
                  </div>
                  <div style={{ fontSize: 5.5, color: "#68A87E", marginTop: 2, textAlign: "right" }}>80%</div>
                </div>
              </div>

              {/* Right — journal + mood */}
              <div style={{ flex: 1, padding: 8, display: "flex", flexDirection: "column", gap: 5, overflow: "hidden" }}>
                <div style={{ fontSize: 6, color: "#68A87E", letterSpacing: ".1em", textTransform: "uppercase" }}>Journal</div>
                <div style={{ background: "#E8F4E5", border: "1px solid #CEEAC9", borderRadius: 4, padding: "6px 8px", flex: 1, overflow: "hidden" }}>
                  <div style={{ fontSize: 6, color: "#68A87E", marginBottom: 4 }}>Today · Focused 💪</div>
                  <div style={{ fontSize: 7.5, color: "#2A4535", lineHeight: 1.6, fontStyle: "italic" }}>
                    "{journal}<span style={{ display: "inline-block", width: 1.5, height: 9, background: "#2A7040", verticalAlign: "middle", animation: "dk-blink .85s step-end infinite" }} />"
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 6, color: "#68A87E", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 5 }}>Mood (7 days)</div>
                  <div style={{ display: "flex", gap: 3 }}>
                    {["😊", "😊", "💪", "😌", "💪", "😊", "💪"].map((m, i) => (
                      <span key={i} style={{ fontSize: 10 }}>{m}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: 14, background: "#C0C0C0", borderRadius: "0 0 3px 3px", margin: "0 -3px" }} />
      <div style={{ height: 6, background: "#B0B0B0", borderRadius: "0 0 8px 8px", margin: "0 18px" }} />
      <style>{`
        @keyframes dk-blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </div>
  )
}
