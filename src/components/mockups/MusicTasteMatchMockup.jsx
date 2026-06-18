import { useEffect, useRef, useState } from "react"

const QUERY = "calm, late night, a little melancholy but not sad"

const TRACKS = [
  { name: "Snowflake", artist: "idealism", score: "0.94", pct: "94%" },
  { name: "Quiet Hours", artist: "Float Away", score: "0.91", pct: "91%" },
  { name: "Philanthrope", artist: "Reminiscing", score: "0.88", pct: "88%" },
  { name: "j'san", artist: "Lullaby", score: "0.85", pct: "85%" },
]

export default function MusicTasteMatchMockup() {
  const [vibeText, setVibeText] = useState("")
  const [btnClicking, setBtnClicking] = useState(false)
  const [cursorRing, setCursorRing] = useState(false)
  const [cursor, setCursor] = useState({ top: 60, left: 20, visible: false })
  const [pip, setPip] = useState(["idle", "idle", "idle", "idle", "idle"])
  const [tracks, setTracks] = useState([false, false, false, false])
  const [resLabel, setResLabel] = useState("results")
  const [activeTab, setActiveTab] = useState("search")
  const timers = useRef([])

  function clr() { timers.current.forEach(clearTimeout); timers.current = [] }
  function t(fn, ms) { const id = setTimeout(fn, ms); timers.current.push(id) }

  function setPipAt(i, state) {
    setPip(prev => { const n = [...prev]; n[i] = state; return n })
  }

  function typeText(str, idx, cb) {
    setVibeText(str.slice(0, idx))
    if (idx <= str.length) {
      const id = setTimeout(() => typeText(str, idx + 1, cb), 38)
      timers.current.push(id)
    } else {
      cb()
    }
  }

  function run() {
    clr()
    setVibeText("")
    setBtnClicking(false)
    setCursorRing(false)
    setCursor({ top: 60, left: 20, visible: false })
    setPip(["idle", "idle", "idle", "idle", "idle"])
    setTracks([false, false, false, false])
    setResLabel("results")
    setActiveTab("search")

    t(() => setCursor({ top: 52, left: 38, visible: true }), 600)
    t(() => typeText(QUERY, 0, () => {
      t(() => setCursor(c => ({ ...c, top: 82, left: 100 })), 400)
      t(() => {
        setBtnClicking(true)
        setCursorRing(true)
        t(() => {
          setBtnClicking(false)
          setCursorRing(false)
          setCursor(c => ({ ...c, visible: false }))
          setResLabel("searching...")
          setPipAt(0, "active")
          t(() => { setPipAt(0, "done"); setPipAt(1, "active") }, 700)
          t(() => { setPipAt(1, "done"); setPipAt(2, "active"); setResLabel("scoring...") }, 1450)
          t(() => { setPipAt(2, "done"); setPipAt(3, "active"); setTracks([true, false, false, false]) }, 2200)
          t(() => setTracks([true, true, false, false]), 2550)
          t(() => setTracks([true, true, true, false]), 2900)
          t(() => {
            setTracks([true, true, true, true])
            setResLabel("results")
            setPipAt(3, "done")
            setPipAt(4, "active")
          }, 3250)
          t(() => {
            setPipAt(4, "done")
            setCursor({ top: 8, left: 175, visible: true })
          }, 4150)
          t(() => {
            setCursorRing(true)
            t(() => {
              setCursorRing(false)
              setCursor(c => ({ ...c, visible: false }))
              setActiveTab("critique")
              t(run, 4500)
            }, 350)
          }, 4650)
        }, 350)
      }, 900)
    }), 1000)
  }

  useEffect(() => { run(); return clr }, [])

  const pipDotColor = (state) => {
    if (state === "done") return "#7C3AED"
    if (state === "active") return "#C4AAFF"
    return "#EDE5FF"
  }

  return (
    <div style={{ width: "100%", maxWidth: "560px", margin: "0 auto" }}>
      <span style={{ display: "block", width: 6, height: 6, borderRadius: "50%", background: "#C8C8C8", margin: "5px auto" }} />
      <div style={{ borderRadius: "10px 10px 0 0", border: "3px solid #C8C8C8", padding: 5, background: "#E0E0E0", overflow: "hidden" }}>
        <div style={{ borderRadius: 6, overflow: "hidden", position: "relative" }}>
          {/* App shell */}
          <div style={{ background: "#F8F4FF", height: 210, display: "flex", flexDirection: "column", fontFamily: "monospace", position: "relative", overflow: "hidden" }}>
            {/* Header */}
            <div style={{ background: "#EDE5FF", borderBottom: "1px solid #D8CAFF", padding: "5px 12px", display: "flex", alignItems: "center", flexShrink: 0 }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: "#7C3AED", flex: 1, letterSpacing: ".04em" }}>MusicTasteMatch</span>
              <div style={{ display: "flex", gap: 0 }}>
                {["Search", "AI Critique"].map(tab => (
                  <div key={tab} style={{
                    fontSize: 7, padding: "3px 10px", color: activeTab === tab.toLowerCase().replace(" ", "") ? "#7C3AED" : "#A78BFA",
                    borderBottom: activeTab === tab.toLowerCase().replace(" ", "") ? "2px solid #7C3AED" : "2px solid transparent",
                    fontWeight: activeTab === tab.toLowerCase().replace(" ", "") ? 700 : 400,
                  }}>{tab}</div>
                ))}
              </div>
            </div>

            {/* Search panel */}
            {activeTab === "search" && (
              <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
                {/* Left */}
                <div style={{ width: 155, borderRight: "1px solid #D8CAFF", padding: 8, display: "flex", flexDirection: "column", gap: 5, flexShrink: 0 }}>
                  <div style={{ fontSize: 6, color: "#A78BFA", letterSpacing: ".1em", textTransform: "uppercase" }}>describe your vibe</div>
                  <div style={{ background: "#fff", border: "1px solid #D8CAFF", borderRadius: 4, padding: "5px 7px", minHeight: 36, fontSize: 7, color: "#3B0764", lineHeight: 1.5, fontFamily: "Georgia, serif", fontStyle: "italic", position: "relative" }}>
                    {vibeText}<span style={{ display: "inline-block", width: 1.5, height: 9, background: "#7C3AED", verticalAlign: "middle", marginLeft: 1, animation: "mtm-blink 0.8s step-end infinite" }} />
                  </div>
                  <div style={{
                    background: btnClicking ? "#5B21B6" : "#7C3AED",
                    borderRadius: 3, padding: "4px 8px", fontSize: 7, color: "#fff", fontWeight: 700,
                    textAlign: "center", transform: btnClicking ? "scale(0.95)" : "scale(1)", transition: "all .15s",
                  }}>MATCH →</div>
                  <div style={{ fontSize: 6, color: "#A78BFA", letterSpacing: ".1em", marginTop: 4 }}>pipeline</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    {["gemini parse", "spotify search", "score songs", "bias check", "ai critique"].map((label, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <div style={{
                          width: 6, height: 6, borderRadius: "50%", flexShrink: 0,
                          background: pipDotColor(pip[i]),
                          animation: pip[i] === "active" ? "mtm-pip-pulse .6s ease-in-out infinite alternate" : "none",
                        }} />
                        <span style={{ fontSize: 6.5, color: pip[i] === "idle" ? "#7C5CBF" : "#7C3AED", fontWeight: pip[i] !== "idle" ? 700 : 400, transition: "color .2s" }}>
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Right */}
                <div style={{ flex: 1, padding: 8, display: "flex", flexDirection: "column", gap: 3, overflow: "hidden" }}>
                  <div style={{ fontSize: 6, color: "#A78BFA", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 2 }}>{resLabel}</div>
                  {TRACKS.map((tr, i) => (
                    <div key={i} style={{
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      padding: "4px 6px", background: i === 0 ? "#E0D4FF" : "#EDE5FF",
                      border: `1px solid ${i === 0 ? "#C4AAFF" : "#D8CAFF"}`, borderRadius: 3,
                      opacity: tracks[i] ? 1 : 0,
                      transform: tracks[i] ? "translateX(0)" : "translateX(8px)",
                      transition: "opacity .4s, transform .4s",
                    }}>
                      <div>
                        <div style={{ fontSize: 7.5, color: "#3B0764", fontWeight: 700, fontFamily: "Georgia, serif" }}>{tr.name}</div>
                        <div style={{ fontSize: 6, color: "#7C5CBF" }}>{tr.artist}</div>
                        <div style={{ height: 2, background: "#D8CAFF", borderRadius: 1, marginTop: 2, width: 60, overflow: "hidden" }}>
                          <div style={{ height: "100%", background: "#7C3AED", borderRadius: 1, width: tr.pct }} />
                        </div>
                      </div>
                      <div style={{ fontSize: 9, fontWeight: 700, color: "#7C3AED" }}>{tr.score}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Critique panel */}
            {activeTab === "critique" && (
              <div style={{ flex: 1, padding: "8px 10px", display: "flex", flexDirection: "column", gap: 6, overflow: "hidden" }}>
                <div style={{ fontSize: 6.5, color: "#5B21B6", fontWeight: 700, letterSpacing: ".05em" }}>Gemini AI Critique Report</div>
                <div style={{ background: "#EDE5FF", border: "1px solid #D8CAFF", borderRadius: 4, padding: "6px 8px" }}>
                  <span style={{ display: "inline-block", fontSize: 5.5, padding: "1px 6px", borderRadius: 8, fontWeight: 700, letterSpacing: ".06em", background: "rgba(16,185,129,.15)", color: "#059669", border: "1px solid rgba(16,185,129,.2)", marginBottom: 4 }}>STRONG MATCH</span>
                  <p style={{ fontSize: 6.5, color: "#5B21B6", lineHeight: 1.6, fontFamily: "Georgia, serif", fontStyle: "italic", margin: 0 }}>"All four results align well with the low-energy, melancholic-but-not-heavy profile. Snowflake edges out as top match due to minimal lyric density."</p>
                  <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                    {[["VIBE ALIGN", "94%"], ["DIVERSITY", "87%"], ["BIAS SCORE", "0.12"]].map(([l, v]) => (
                      <div key={l} style={{ flex: 1, background: "#fff", border: "1px solid #D8CAFF", borderRadius: 3, padding: 4, textAlign: "center" }}>
                        <span style={{ display: "block", fontSize: 5, color: "#A78BFA", letterSpacing: ".06em", marginBottom: 2 }}>{l}</span>
                        <span style={{ fontSize: 10, fontWeight: 700, color: "#7C3AED" }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ background: "#EDE5FF", border: "1px solid #D8CAFF", borderRadius: 4, padding: "6px 8px" }}>
                  <span style={{ display: "inline-block", fontSize: 5.5, padding: "1px 6px", borderRadius: 8, fontWeight: 700, letterSpacing: ".06em", background: "rgba(124,58,237,.12)", color: "#7C3AED", border: "1px solid rgba(124,58,237,.2)", marginBottom: 4 }}>NOTE</span>
                  <p style={{ fontSize: 6.5, color: "#5B21B6", lineHeight: 1.6, fontFamily: "Georgia, serif", fontStyle: "italic", margin: 0 }}>"Three of four results share lo-fi roots. Consider broadening with acoustic or neo-soul for more variety."</p>
                </div>
              </div>
            )}

            {/* Animated cursor */}
            <div style={{
              position: "absolute",
              top: cursor.top, left: cursor.left,
              opacity: cursor.visible ? 1 : 0,
              transition: "top .5s cubic-bezier(.4,0,.2,1), left .5s cubic-bezier(.4,0,.2,1), opacity .2s",
              pointerEvents: "none", zIndex: 99,
            }}>
              {cursorRing && (
                <div style={{
                  position: "absolute", top: -4, left: -4, width: 16, height: 16,
                  borderRadius: "50%", border: "1.5px solid rgba(124,58,237,.6)",
                  animation: "mtm-ring .35s ease-out forwards",
                }} />
              )}
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(124,58,237,.85)", border: "1.5px solid #fff", boxShadow: "0 1px 4px rgba(0,0,0,.25)" }} />
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: 14, background: "#C8C8C8", borderRadius: "0 0 3px 3px", margin: "0 -3px" }} />
      <div style={{ height: 6, background: "#B4B4B4", borderRadius: "0 0 8px 8px", margin: "0 18px" }} />

      <style>{`
        @keyframes mtm-blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes mtm-pip-pulse { from{transform:scale(1)} to{transform:scale(1.4)} }
        @keyframes mtm-ring { 0%{transform:scale(1);opacity:1} 100%{transform:scale(2.5);opacity:0} }
      `}</style>
    </div>
  )
}
