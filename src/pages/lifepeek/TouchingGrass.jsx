import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { SpaceBackground, useMedia, MONO, SERIF, SANS, MOON, LIGHT, MUT, DIM } from "./cosmic"
import { grassProfile, grassHighlights, touchinggrass } from "../../data"

/* ── Touching Grass · life outside coding, as a social app ──────────────────
   An Instagram-style feed of Dominion's real life: football, mobile games,
   anime & k-dramas, travel, friends. Profile header, story-highlight filters,
   posts with likes/comments, game-stat posts, and a feed/grid toggle. Cosmic
   theme so it sits inside the LifePeek world. Photos are placeholders until
   real images are dropped into each post's `images`. ──────────────────────── */

const realms = [
  { to: "/lifepeek/life-journey",   label: "Life Journey" },
  { to: "/lifepeek/open-world",     label: "Open World" },
  { to: "/lifepeek/touching-grass", label: "Touching Grass" },
]

const LIKE = "#FF6B8A"
const CARD = "rgba(11,18,38,0.86)"
const BORDER = "rgba(170,195,255,0.13)"

const HeartIcon = ({ filled }) => (
  <svg width="23" height="23" viewBox="0 0 24 24" fill={filled ? LIKE : "none"} stroke={filled ? LIKE : "currentColor"} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
  </svg>
)
const CommentIcon = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z" /></svg>)
const ShareIcon = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>)
const BookmarkIcon = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>)
const GridIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>)
const RowsIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="7" rx="1" /><rect x="3" y="14" width="18" height="6" rx="1" /></svg>)

const emojiOf = cat => (grassHighlights.find(h => h.id === cat) || {}).emoji || "🌱"

export default function TouchingGrass() {
  const reduced = useMedia("(prefers-reduced-motion: reduce)")
  const [liked, setLiked] = useState({})
  const [filter, setFilter] = useState("all")
  const [view, setView] = useState("feed")

  useEffect(() => {
    document.title = "Touching Grass — LifePeek · Dominion Eze"
    return () => { document.title = "Dominion Eze — AI Engineer & System Architect" }
  }, [])

  const toggleLike = id => setLiked(p => ({ ...p, [id]: !p[id] }))
  const posts = filter === "all" ? touchinggrass : touchinggrass.filter(p => p.category === filter)

  return (
    <div style={{ minHeight: "100vh", position: "relative", color: LIGHT, fontFamily: SANS, overflowX: "hidden" }}>
      <SpaceBackground reduced={reduced} theme="liquid" />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Top bar */}
        <nav style={{
          position: "sticky", top: 0, zIndex: 50, background: "rgba(6,11,28,0.66)", backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(180,200,255,0.1)", padding: "0 22px", height: 54,
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
        }}>
          <Link to="/lifepeek" style={{ fontFamily: MONO, fontSize: 11, color: MOON, opacity: 0.85, textDecoration: "none", letterSpacing: "0.1em", display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}>← ☾ LifePeek</Link>
          <div style={{ display: "flex", gap: 18, overflow: "hidden" }}>
            {realms.map(r => {
              const on = r.to === "/lifepeek/touching-grass"
              return (
                <Link key={r.to} to={r.to} style={{
                  fontFamily: MONO, fontSize: "0.66rem", letterSpacing: "0.06em", textTransform: "uppercase",
                  color: on ? LIGHT : MUT, textDecoration: "none", whiteSpace: "nowrap",
                  borderBottom: on ? "1px solid rgba(190,220,255,0.8)" : "1px solid transparent", paddingBottom: 3,
                }}>{r.label}</Link>
              )
            })}
          </div>
          <span style={{ width: 50 }} />
        </nav>

        {/* App column */}
        <div style={{ maxWidth: 500, margin: "0 auto", padding: "0 14px 90px" }}>

          {/* App title */}
          <div style={{ padding: "20px 6px 18px" }}>
            <span style={{ fontFamily: SERIF, fontSize: "1.5rem", fontWeight: 700, color: LIGHT, letterSpacing: "-0.01em" }}>touchgrass<span style={{ color: "#7EE0BE" }}>.</span></span>
            <span style={{ fontFamily: MONO, fontSize: 10, color: DIM, letterSpacing: "0.12em", marginLeft: 10 }}>life outside the IDE</span>
          </div>

          {/* Profile header */}
          <div style={{ display: "flex", alignItems: "center", gap: 22, padding: "4px 6px 16px" }}>
            <div style={{ flexShrink: 0, padding: 3, borderRadius: "50%", background: "linear-gradient(135deg, #7EE0BE, #8FB8FF, #F29CA8)" }}>
              <div style={{ width: 78, height: 78, borderRadius: "50%", overflow: "hidden", border: "2px solid #060A1E", background: "#0A1228" }}>
                <img src="/headshot.jpg" alt="Dominion Eze" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "space-around", textAlign: "center" }}>
              {[{ v: touchinggrass.length, l: "posts" }, { v: grassHighlights.length, l: "highlights" }, { v: "'25", l: "since" }].map(s => (
                <div key={s.l}>
                  <div style={{ fontFamily: SANS, fontSize: "1.15rem", fontWeight: 600, color: LIGHT }}>{s.v}</div>
                  <div style={{ fontFamily: MONO, fontSize: 9, color: MUT, letterSpacing: "0.08em" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Name + bio */}
          <div style={{ padding: "0 6px 18px" }}>
            <p style={{ fontSize: "0.92rem", fontWeight: 600, color: LIGHT, marginBottom: 3 }}>{grassProfile.name} <span style={{ color: MUT, fontWeight: 400 }}>· @{grassProfile.handle}</span></p>
            {grassProfile.bio.split("\n").map((line, i) => (
              <p key={i} style={{ fontSize: "0.86rem", color: i === 0 ? MUT : "rgba(206,222,245,0.82)", lineHeight: 1.5 }}>{line}</p>
            ))}
          </div>

          {/* Highlights / filters */}
          <div className="tg-h" style={{ display: "flex", gap: 16, overflowX: "auto", padding: "6px 6px 18px" }}>
            <style>{`.tg-h::-webkit-scrollbar{display:none}`}</style>
            {grassHighlights.map(h => {
              const on = filter === h.id
              return (
                <button key={h.id} onClick={() => setFilter(on ? "all" : h.id)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flexShrink: 0, width: 62 }}>
                  <span style={{
                    width: 58, height: 58, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                    background: on ? "linear-gradient(135deg, #7EE0BE, #8FB8FF)" : "rgba(20,30,56,0.8)",
                    padding: 2, border: on ? "none" : "1px solid rgba(170,195,255,0.2)",
                    boxShadow: on ? "0 0 18px rgba(126,224,190,0.3)" : "none", transition: "all 0.2s",
                  }}>
                    <span style={{ width: "100%", height: "100%", borderRadius: "50%", background: "#0A1228", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem" }}>{h.emoji}</span>
                  </span>
                  <span style={{ fontFamily: MONO, fontSize: 9, color: on ? LIGHT : MUT, letterSpacing: "0.02em" }}>{h.label}</span>
                </button>
              )
            })}
          </div>

          {/* Tab bar */}
          <div style={{ display: "flex", borderTop: "1px solid " + BORDER, marginBottom: view === "grid" ? 4 : 18 }}>
            {[{ id: "feed", icon: <RowsIcon /> }, { id: "grid", icon: <GridIcon /> }].map(t => (
              <button key={t.id} onClick={() => setView(t.id)} style={{
                flex: 1, background: "none", borderTop: view === t.id ? "1px solid " + LIGHT : "1px solid transparent", borderLeft: "none", borderRight: "none", borderBottom: "none", marginTop: -1,
                color: view === t.id ? LIGHT : DIM, padding: "12px 0", cursor: "pointer", display: "flex", justifyContent: "center",
              }}>{t.icon}</button>
            ))}
          </div>

          {filter !== "all" && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 6px 14px" }}>
              <span style={{ fontFamily: MONO, fontSize: 10, color: MUT, letterSpacing: "0.06em" }}>{emojiOf(filter)} {posts.length} {posts.length === 1 ? "post" : "posts"}</span>
              <button onClick={() => setFilter("all")} style={{ background: "none", border: "none", color: "#8FB8FF", fontFamily: MONO, fontSize: 10, cursor: "pointer", letterSpacing: "0.06em" }}>× clear filter</button>
            </div>
          )}

          {/* Feed / Grid */}
          {view === "grid" ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 3 }}>
              {posts.map(p => (
                <button key={p.id} onClick={() => setView("feed")} style={{ position: "relative", aspectRatio: "1", border: "none", cursor: "pointer", padding: 0, overflow: "hidden", background: "rgba(20,30,56,0.7)" }}>
                  {p.images?.length ? (
                    <img src={p.images[0]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem" }}>{emojiOf(p.category)}</span>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              {posts.map(p => <Post key={p.id} p={p} liked={!!liked[p.id]} onLike={() => toggleLike(p.id)} />)}
            </div>
          )}

          <p style={{ fontFamily: MONO, fontSize: 10, color: DIM, letterSpacing: "0.14em", textAlign: "center", marginTop: 40 }}>🌱 you're all caught up</p>
        </div>
      </div>
    </div>
  )
}

function Post({ p, liked, onLike }) {
  const likes = p.likes + (liked ? 1 : 0)
  return (
    <article style={{ background: CARD, border: "1px solid " + BORDER, borderRadius: 14, overflow: "hidden", backdropFilter: "blur(8px)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 13px" }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", overflow: "hidden", border: "1px solid rgba(170,195,255,0.3)", flexShrink: 0 }}>
          <img src="/headshot.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: "0.82rem", fontWeight: 600, color: LIGHT, lineHeight: 1.2 }}>@{grassProfile.handle}</p>
          <p style={{ fontFamily: MONO, fontSize: 9, color: DIM, letterSpacing: "0.04em" }}>{p.location ? `${p.location} · ` : ""}{emojiOf(p.category)} {p.category}</p>
        </div>
        <span style={{ color: DIM, fontSize: "1.1rem", letterSpacing: 1 }}>···</span>
      </div>

      {/* Photo */}
      <div style={{ position: "relative", aspectRatio: "1", background: "linear-gradient(135deg, rgba(40,55,95,0.5), rgba(11,18,38,0.6))", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {p.images?.length ? (
          <img src={p.images[0]} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: "2.6rem" }}>{emojiOf(p.category)}</span>
            <span style={{ fontFamily: MONO, fontSize: 9, color: "rgba(180,200,235,0.5)", letterSpacing: "0.16em", textTransform: "uppercase" }}>photo goes here</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "11px 13px 6px", color: LIGHT }}>
        <button onClick={onLike} style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", display: "flex", padding: 0 }} aria-label="Like"><HeartIcon filled={liked} /></button>
        <span style={{ display: "flex" }}><CommentIcon /></span>
        <span style={{ display: "flex" }}><ShareIcon /></span>
        <span style={{ marginLeft: "auto", display: "flex" }}><BookmarkIcon /></span>
      </div>

      {/* Likes + caption */}
      <div style={{ padding: "0 13px 14px" }}>
        <p style={{ fontSize: "0.82rem", fontWeight: 600, color: LIGHT, marginBottom: 7 }}>{likes.toLocaleString()} likes</p>
        <p style={{ fontSize: "0.86rem", color: "rgba(214,226,245,0.92)", lineHeight: 1.55 }}>
          <span style={{ fontWeight: 600, color: LIGHT }}>@{grassProfile.handle}</span> {p.caption}
        </p>

        {p.stats?.length > 0 && (
          <div style={{ display: "flex", gap: 8, marginTop: 11, flexWrap: "wrap" }}>
            {p.stats.map(s => (
              <div key={s.label} style={{ background: "rgba(126,224,190,0.08)", border: "1px solid rgba(126,224,190,0.25)", borderRadius: 9, padding: "6px 11px" }}>
                <div style={{ fontFamily: MONO, fontSize: 8, color: "rgba(140,220,190,0.8)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{s.label}</div>
                <div style={{ fontFamily: SANS, fontSize: "0.85rem", fontWeight: 600, color: LIGHT, marginTop: 2 }}>{s.value}</div>
              </div>
            ))}
          </div>
        )}

        {p.tags?.length > 0 && (
          <p style={{ fontSize: "0.82rem", color: "#8FB8FF", marginTop: 9, lineHeight: 1.5 }}>{p.tags.map(t => `#${t}`).join(" ")}</p>
        )}
        {p.comments > 0 && (
          <p style={{ fontFamily: SANS, fontSize: "0.8rem", color: MUT, marginTop: 9, cursor: "pointer" }}>View all {p.comments} comments</p>
        )}
        <p style={{ fontFamily: MONO, fontSize: 9, color: DIM, letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 8 }}>{p.date}</p>
      </div>
    </article>
  )
}
