import { useEffect, useRef, useState } from "react"

const GAMES = [
  { name: "Uno", desc: "Fast card game · 2-10 players", icon: "🃏" },
  { name: "Monopoly", desc: "Property trading · 2-8 players", icon: "🏠" },
  { name: "Catan", desc: "Strategy + negotiation · 3-6", icon: "🎲" },
]

export default function GameNightMockup() {
  const [cards, setCards] = useState([false, false, false])
  const [rsvpState, setRsvpState] = useState("default") // default | pulse | clicked
  const timers = useRef([])

  function clr() { timers.current.forEach(clearTimeout); timers.current = [] }
  function T(fn, ms) { const id = setTimeout(fn, ms); timers.current.push(id) }

  function run() {
    clr()
    setCards([false, false, false])
    setRsvpState("default")

    T(() => setCards([true, false, false]), 500)
    T(() => setCards([true, true, false]), 900)
    T(() => setCards([true, true, true]), 1300)
    T(() => setRsvpState("pulse"), 2200)
    T(() => setRsvpState("default"), 3000)
    T(() => setRsvpState("pulse"), 3500)
    T(() => setRsvpState("default"), 4300)
    T(() => setRsvpState("clicked"), 5200)
    T(run, 8500)
  }

  useEffect(() => { run(); return clr }, [])

  return (
    <div style={{ width: "100%", maxWidth: "560px", margin: "0 auto" }}>
      {/* Browser bar */}
      <div style={{ background: "#EDEBE8", borderRadius: "10px 10px 0 0", border: "1px solid #D4D0CB", padding: "7px 10px 0", display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ display: "flex", gap: 4 }}>
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c, i) => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />
          ))}
        </div>
        <div style={{ flex: 1, background: "#fff", borderRadius: 4, padding: "2px 8px", border: "1px solid #D4D0CB" }}>
          <span style={{ fontSize: 7, color: "#999", fontFamily: "monospace" }}>positive-berry-musician-695.vscodeedu.app</span>
        </div>
      </div>

      {/* Website frame */}
      <div style={{ border: "1px solid #D4D0CB", borderTop: "none", borderRadius: "0 0 2px 2px", overflow: "hidden" }}>
        <div style={{ background: "#FFFAF7", height: 190, display: "flex", flexDirection: "column", fontFamily: "'Geist', system-ui, sans-serif", overflow: "hidden" }}>

          {/* Nav */}
          <div style={{ background: "#fff", borderBottom: "1px solid #F2DDD5", padding: "6px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
            <span style={{ fontSize: 9, fontWeight: 700, color: "#B84020" }}>🎲 Game Night</span>
            <div style={{ display: "flex", gap: 12 }}>
              {["Home", "Games", "RSVP", "About"].map(l => (
                <span key={l} style={{ fontSize: 6.5, color: "#999" }}>{l}</span>
              ))}
            </div>
          </div>

          {/* Hero */}
          <div style={{ padding: "10px 16px 8px", borderBottom: "1px solid #F2DDD5", flexShrink: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#B84020", fontFamily: "Georgia, serif", marginBottom: 2 }}>
              Neighborhood Game Night
            </div>
            <div style={{ fontSize: 7, color: "#AAA", marginBottom: 7 }}>
              📅 Every Saturday · 6PM – 10PM · 42 Maple Street
            </div>
            <button style={{
              background: rsvpState === "clicked" ? "#2A7040" : "#B84020",
              color: "#fff", border: "none", borderRadius: 4,
              padding: "4px 14px", fontSize: 7.5, fontWeight: 700, cursor: "pointer",
              transform: rsvpState === "pulse" ? "scale(1.06)" : "scale(1)",
              transition: "all .22s",
              boxShadow: rsvpState === "pulse" ? "0 0 0 4px rgba(184,64,32,.2)" : "none",
            }}>
              {rsvpState === "clicked" ? "✓ You're in!" : "RSVP Now"}
            </button>
          </div>

          {/* Game cards */}
          <div style={{ flex: 1, padding: "8px 16px", display: "flex", gap: 8, overflow: "hidden" }}>
            {GAMES.map((game, i) => (
              <div key={i} style={{
                flex: 1, background: "#fff", border: "1px solid #F2DDD5", borderRadius: 6,
                padding: "7px 8px", display: "flex", flexDirection: "column", gap: 3,
                opacity: cards[i] ? 1 : 0,
                transform: cards[i] ? "translateY(0)" : "translateY(8px)",
                transition: "opacity .35s, transform .35s",
              }}>
                <span style={{ fontSize: 14 }}>{game.icon}</span>
                <div style={{ fontSize: 8.5, fontWeight: 700, color: "#B84020" }}>{game.name}</div>
                <div style={{ fontSize: 6, color: "#AAA", lineHeight: 1.5 }}>{game.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ height: 14, background: "#D4D0CB", borderRadius: "0 0 3px 3px", border: "1px solid #D4D0CB", borderTop: "none" }} />
      <div style={{ height: 6, background: "#C4C0BB", borderRadius: "0 0 8px 8px", margin: "0 18px" }} />
    </div>
  )
}
