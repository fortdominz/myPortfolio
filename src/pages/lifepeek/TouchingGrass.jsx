import { useTokens, PageShell, PageHeader, PostCard, EmptyState } from "./shared"
import { touchinggrass } from "../../data"

const ACCENT = "#10B981"

export default function TouchingGrass() {
  const tok = useTokens()

  return (
    <PageShell tok={tok} title="Touching Grass">
      <PageHeader
        tok={tok}
        label="touching-grass"
        title="Touching Grass"
        subtitle="Outside the screen. Outings, hobbies, and the city I'm still figuring out."
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
          {touchinggrass.length} {touchinggrass.length === 1 ? "post" : "posts"}
        </div>
      </div>

      {/* Posts */}
      <section style={{
        maxWidth: 1100, margin: "0 auto",
        padding: "0 40px 100px",
        display: touchinggrass.length > 0 ? "grid" : "block",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        gap: 20,
      }}>
        {touchinggrass.length > 0 ? (
          touchinggrass.map((post, i) => (
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
            icon="❋"
            message="Nothing here yet."
            sub="// go touch grass first"
          />
        )}
      </section>
    </PageShell>
  )
}
