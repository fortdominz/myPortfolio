export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)" }}
      className="max-w-5xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <span className="mono text-xs" style={{ color: "var(--muted)" }}>
          <span style={{ color: "var(--accent)" }}>~/</span>dominion · building in public
        </span>
        <span className="mono text-xs" style={{ color: "var(--muted)" }}>
          designed & built by Dominion Eze · {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  )
}
