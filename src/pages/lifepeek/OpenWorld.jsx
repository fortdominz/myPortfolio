import { useTokens, PageShell, PageHeader, PostCard, EmptyState } from "./shared"
import { openworld } from "../../data"

const ACCENT = "#06B6D4"

export default function OpenWorld() {
  const tok = useTokens()

  return (
    <PageShell tok={tok} title="Open World">
      <PageHeader
        tok={tok}
        label="open-world"
        title="Open World"
        subtitle="Programs, fellowships, accelerators. Every room I've earned a seat in."
        accent={ACCENT}
      />

      {/* Stats row */}
      <div style={{
        maxWidth: 1100, margin: "0 auto",
        padding: "0 40px 44px",
        display: "flex", gap: 10, flexWrap: "wrap",
      }}>
        <div style={{
          fontFamily:    MONO, fontSize: 9,
          color:         ACCENT, letterSpacing: "0.14em",
          textTransform: "uppercase",
          background:    ACCENT + "18",
          padding:       "4px 12px", borderRadius: 6,
        }}>
          {openworld.length} {openworld.length === 1 ? "post" : "posts"}
        </div>
      </div>

      {/* Posts */}
      <section style={{
        maxWidth: 1100, margin: "0 auto",
        padding: "0 40px 100px",
        display: openworld.length > 0 ? "grid" : "block",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        gap: 20,
      }}>
        {openworld.length > 0 ? (
          openworld.map((post, i) => (
            <PostCard
              key={post.id}
              post={post}
              accentColor={ACCENT}
              tok={tok}
              delay={i * 70}
            />
          ))
        ) : (
          <EmptyState
            tok={tok}
            icon="⬡"
            message="Nothing posted yet."
            sub="// posts coming soon"
          />
        )}
      </section>
    </PageShell>
  )
}
