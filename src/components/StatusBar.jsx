export default function StatusBar() {
  return (
    <div style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      height: "28px",
      backgroundColor: "#161B22",
      borderTop: "1px solid #30363D",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      paddingInline: "24px",
      zIndex: 9999,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <span style={{ display: "flex", alignItems: "center", gap: "7px" }}>
          <span style={{
            width: "7px", height: "7px", borderRadius: "50%",
            backgroundColor: "#7EE787",
            boxShadow: "0 0 6px #7EE787",
            display: "inline-block",
            flexShrink: 0,
          }} />
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.68rem", color: "#7EE787" }}>
            open to internships
          </span>
        </span>
        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.68rem", color: "#6E7681" }}>
          summer 2026
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.68rem", color: "#6E7681" }}>
          cs @ fisk university
        </span>
        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.68rem", color: "#79C0FF" }}>
          gpa 4.0
        </span>
      </div>
    </div>
  )
}
