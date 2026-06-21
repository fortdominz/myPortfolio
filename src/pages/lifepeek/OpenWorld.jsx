import { useEffect, useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { SpaceBackground, useMedia, MONO, SERIF, SANS, MOON, LIGHT, MUT, DIM } from "./cosmic"
import { worlds, openworld } from "../../data"

/* ── Open World · an explorable star-atlas ──────────────────────────────────
   Three levels, all URL-backed so the browser back button unwinds correctly
   (program → region → map) and never jumps to the LifePeek menu:
     · map      → ?               (regions on a cosmic map)
     · region   → ?region=ID      (its programs, listed by name)
     · program  → ?region&program (one program: description + activities + photos)
   Photos are optional — nothing forces a slot. ───────────────────────────── */

const realms = [
  { to: "/lifepeek/life-journey",   label: "Life Journey" },
  { to: "/lifepeek/open-world",     label: "Open World" },
  { to: "/lifepeek/touching-grass", label: "Touching Grass" },
]

const GOLD = "#D9B86A"
const WORLD_ICON = { school: "🎓", work: "💼", programs: "🛰️", conferences: "🎤", hackathons: "⚡" }

const POS_WIDE = {
  school: { x: 18, y: 28 }, work: { x: 77, y: 22 }, programs: { x: 49, y: 52 },
  conferences: { x: 26, y: 79 }, hackathons: { x: 79, y: 73 },
}
const POS_NARROW = {
  school: { x: 27, y: 13 }, work: { x: 72, y: 27 }, programs: { x: 42, y: 49 },
  conferences: { x: 70, y: 68 }, hackathons: { x: 29, y: 85 },
}

const countOf = id => openworld.filter(e => e.world === id).length

export default function OpenWorld() {
  const reduced = useMedia("(prefers-reduced-motion: reduce)")
  const isWide = useMedia("(min-width: 720px)")
  const [sp, setSp] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    document.title = "Open World — LifePeek · Dominion Eze"
    return () => { document.title = "Dominion Eze — AI Engineer & System Architect" }
  }, [])

  const regionId = sp.get("region")
  const programId = sp.get("program")
  const region = regionId ? worlds.find(w => w.id === regionId) : null
  const program = programId ? openworld.find(p => p.id === programId && p.world === regionId) : null

  const openRegion = id => setSp({ region: id })
  const openProgram = id => setSp({ region: regionId, program: id })
  const back = () => navigate(-1)

  return (
    <div style={{ minHeight: "100vh", position: "relative", color: LIGHT, fontFamily: SANS, overflowX: "hidden" }}>
      <SpaceBackground reduced={reduced} theme="constellation" />

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
              const on = r.to === "/lifepeek/open-world"
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

        {program && region ? (
          <ProgramView program={program} regionLabel={region.label} accent={region.accent} onBack={back} />
        ) : region ? (
          <RegionView world={region} onBack={back} onOpenProgram={openProgram} />
        ) : (
          <MapAtlas isWide={isWide} onOpen={openRegion} />
        )}
      </div>
    </div>
  )
}

/* ── The atlas (map of worlds) ── */
function MapAtlas({ isWide, onOpen }) {
  const [hover, setHover] = useState(null)
  const pos = isWide ? POS_WIDE : POS_NARROW
  const center = pos.programs

  return (
    <div style={{ maxWidth: 980, margin: "0 auto", padding: "44px 20px 90px" }}>
      <div style={{ marginBottom: 18 }}>
        <p style={{ fontFamily: MONO, fontSize: 10, color: GOLD, letterSpacing: "0.24em", textTransform: "uppercase", marginBottom: 12 }}>☾ Open World · Field Atlas</p>
        <h1 style={{ fontFamily: SERIF, fontSize: "clamp(1.9rem, 5vw, 3rem)", fontWeight: 700, color: LIGHT, lineHeight: 1.06, marginBottom: 14 }}>Chart the worlds<br />I move through.</h1>
        <p style={{ fontFamily: MONO, fontSize: 10, color: MUT, letterSpacing: "0.08em", maxWidth: 320 }}>Pick a place to travel there and read what I lived.</p>
      </div>

      <div style={{
        position: "relative", width: "100%", aspectRatio: isWide ? "16 / 9.4" : "4 / 5",
        border: `1px solid ${GOLD}3A`, borderRadius: 16, overflow: "hidden",
        background: "radial-gradient(ellipse 80% 70% at 50% 45%, rgba(20,30,60,0.45), rgba(6,11,28,0.35))",
        boxShadow: `inset 0 0 70px rgba(0,0,0,0.4), 0 0 0 4px rgba(217,184,106,0.05)`,
      }}>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.5,
          backgroundImage: `linear-gradient(${GOLD}0E 1px, transparent 1px), linear-gradient(90deg, ${GOLD}0E 1px, transparent 1px)`,
          backgroundSize: "58px 58px",
          maskImage: "radial-gradient(ellipse 75% 75% at 50% 50%, #000 50%, transparent 90%)",
          WebkitMaskImage: "radial-gradient(ellipse 75% 75% at 50% 50%, #000 50%, transparent 90%)",
        }} />

        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
          {worlds.filter(w => w.id !== "programs").map(w => (
            <line key={w.id} x1={center.x} y1={center.y} x2={pos[w.id].x} y2={pos[w.id].y}
              stroke={`${GOLD}55`} strokeWidth="0.25" strokeDasharray="1.4 1.4" vectorEffect="non-scaling-stroke" />
          ))}
        </svg>

        {["tl", "tr", "bl", "br"].map(c => (
          <span key={c} style={{
            position: "absolute", width: 16, height: 16, borderStyle: "solid", borderColor: `${GOLD}66`,
            ...(c === "tl" && { top: 10, left: 10, borderWidth: "1.5px 0 0 1.5px" }),
            ...(c === "tr" && { top: 10, right: 10, borderWidth: "1.5px 1.5px 0 0" }),
            ...(c === "bl" && { bottom: 10, left: 10, borderWidth: "0 0 1.5px 1.5px" }),
            ...(c === "br" && { bottom: 10, right: 10, borderWidth: "0 1.5px 1.5px 0" }),
          }} />
        ))}

        <Compass />

        {worlds.map(w => (
          <WorldNode key={w.id} world={w} pos={pos[w.id]} count={countOf(w.id)}
            hovered={hover === w.id} onHover={() => setHover(w.id)} onLeave={() => setHover(null)} onClick={() => onOpen(w.id)} />
        ))}
      </div>

      <p style={{ fontFamily: MONO, fontSize: 10, color: DIM, letterSpacing: "0.12em", textAlign: "center", marginTop: 20 }}>
        ✦ {worlds.length} regions charted · {openworld.length} {openworld.length === 1 ? "program" : "programs"} logged ✦
      </p>
    </div>
  )
}

function WorldNode({ world, pos, count, hovered, onHover, onLeave, onClick }) {
  return (
    <button onClick={onClick} onMouseEnter={onHover} onMouseLeave={onLeave}
      style={{
        position: "absolute", left: `${pos.x}%`, top: `${pos.y}%`, transform: "translate(-50%, -50%)",
        background: "none", border: "none", cursor: "pointer", zIndex: hovered ? 6 : 4,
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8, width: 130,
      }}>
      <span style={{
        width: hovered ? 58 : 50, height: hovered ? 58 : 50, borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: hovered ? "1.4rem" : "1.25rem",
        background: `radial-gradient(circle at 35% 30%, ${world.accent}55, rgba(8,14,32,0.9))`,
        border: `1.5px solid ${world.accent}`,
        boxShadow: hovered ? `0 0 26px ${world.accent}88, 0 0 0 6px ${world.accent}18` : `0 0 14px ${world.accent}44`,
        transition: "all 0.25s cubic-bezier(0.2,0.8,0.2,1)",
      }}>{WORLD_ICON[world.id] || "✦"}</span>
      <span style={{ fontFamily: SERIF, fontSize: "0.92rem", fontWeight: 600, color: LIGHT, lineHeight: 1.1, textAlign: "center", textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}>{world.label}</span>
      <span style={{ fontFamily: MONO, fontSize: 8.5, letterSpacing: "0.1em", textTransform: "uppercase", color: count > 0 ? world.accent : DIM }}>
        {count > 0 ? `${count} ${count === 1 ? "program" : "programs"}` : "uncharted"}
      </span>
      {hovered && (
        <span style={{ position: "absolute", top: "100%", marginTop: 4, width: 160, fontFamily: SANS, fontSize: "0.72rem", color: MUT, lineHeight: 1.4, textAlign: "center", textShadow: "0 1px 6px rgba(0,0,0,0.9)" }}>{world.blurb}</span>
      )}
    </button>
  )
}

function Compass() {
  return (
    <svg width="62" height="62" viewBox="0 0 64 64" style={{ position: "absolute", bottom: 14, right: 14, opacity: 0.7 }}>
      <circle cx="32" cy="32" r="26" fill="none" stroke={`${GOLD}66`} strokeWidth="1" />
      <circle cx="32" cy="32" r="20" fill="none" stroke={`${GOLD}33`} strokeWidth="0.5" />
      <polygon points="32,8 36,32 32,30 28,32" fill={`${GOLD}cc`} />
      <polygon points="32,56 28,32 32,34 36,32" fill={`${GOLD}55`} />
      <text x="32" y="7" textAnchor="middle" fontSize="7" fill={GOLD} fontFamily="JetBrains Mono">N</text>
    </svg>
  )
}

/* ── A region: its programs listed by name (click to open) ── */
function RegionView({ world, onBack, onOpenProgram }) {
  const items = openworld.filter(p => p.world === world.id).slice().sort((a, b) => a.name.localeCompare(b.name))
  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "26px 24px 90px" }}>
      <BackBtn label="Back to the map" onClick={onBack} />
      <RegionHeader world={world} />
      {items.length === 0 ? (
        <EmptyWorld world={world} />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
          {items.map(p => {
            const acts = p.activities?.length || 0
            return (
              <button key={p.id} onClick={() => onOpenProgram(p.id)} style={{
                width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
                padding: "16px 18px", borderRadius: 12, cursor: "pointer", textAlign: "left",
                background: "rgba(9,16,34,0.5)", border: "1px solid rgba(170,195,255,0.14)", transition: "border-color 0.2s, background 0.2s, transform 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${world.accent}77`; e.currentTarget.style.background = "rgba(16,26,52,0.7)"; e.currentTarget.style.transform = "translateX(3px)" }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(170,195,255,0.14)"; e.currentTarget.style.background = "rgba(9,16,34,0.5)"; e.currentTarget.style.transform = "translateX(0)" }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: world.accent, flexShrink: 0, boxShadow: `0 0 8px ${world.accent}` }} />
                  <span style={{ fontFamily: SERIF, fontSize: "1.12rem", fontWeight: 600, color: LIGHT }}>{p.name}</span>
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
                  {acts > 0 && <span style={{ fontFamily: MONO, fontSize: 9, color: MUT, letterSpacing: "0.08em" }}>{acts} {acts === 1 ? "activity" : "activities"}</span>}
                  <span style={{ color: world.accent, fontSize: "0.95rem" }}>→</span>
                </span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

/* ── One program, opened: description + activities + photos (all optional) ── */
function ProgramView({ program, regionLabel, accent, onBack }) {
  const acts = program.activities || []
  const hasContent = program.description || program.photos?.length || acts.length
  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "26px 24px 90px" }}>
      <BackBtn label={regionLabel} onClick={onBack} />
      <div style={{ marginBottom: 22 }}>
        <p style={{ fontFamily: MONO, fontSize: 10, color: accent, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>◇ Program</p>
        <h1 style={{ fontFamily: SERIF, fontSize: "clamp(1.8rem, 5vw, 2.6rem)", fontWeight: 700, color: LIGHT, lineHeight: 1.06 }}>{program.name}</h1>
        <div style={{ height: 1, background: `linear-gradient(90deg, ${accent}66, transparent)`, marginTop: 16 }} />
      </div>

      {program.description && (
        <p style={{ fontFamily: SANS, fontSize: "0.96rem", color: MUT, lineHeight: 1.78, maxWidth: 600, marginBottom: 18 }}>{program.description}</p>
      )}
      <PhotoGrid photos={program.photos} accent={accent} />

      {acts.length > 0 && (
        <div style={{ marginTop: program.description || program.photos?.length ? 36 : 8 }}>
          <p style={{ fontFamily: MONO, fontSize: 10, color: accent, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 6 }}>Activities</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {acts.map(a => <ActivitySection key={a.id} activity={a} accent={accent} />)}
          </div>
        </div>
      )}

      {!hasContent && (
        <p style={{ fontFamily: MONO, fontSize: 10, color: DIM, letterSpacing: "0.06em", marginTop: 8 }}>◎ nothing documented here yet.</p>
      )}
    </div>
  )
}

function ActivitySection({ activity, accent }) {
  return (
    <section style={{ padding: "18px 0", borderTop: "1px solid rgba(170,195,255,0.1)" }}>
      <h3 style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: SERIF, fontSize: "1.18rem", fontWeight: 600, color: LIGHT, marginBottom: activity.description ? 9 : 0 }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: accent, flexShrink: 0, boxShadow: `0 0 7px ${accent}` }} />
        {activity.name}
      </h3>
      {activity.description && (
        <p style={{ fontFamily: SANS, fontSize: "0.9rem", color: MUT, lineHeight: 1.72, paddingLeft: 16 }}>{activity.description}</p>
      )}
      {activity.photos?.length > 0 && <div style={{ paddingLeft: 16, marginTop: 12 }}><PhotoGrid photos={activity.photos} accent={accent} /></div>}
    </section>
  )
}

function PhotoGrid({ photos, accent }) {
  if (!photos?.length) return null
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: 14 }}>
      {photos.map((ph, i) => <PhotoCard key={i} photo={ph} accent={accent} />)}
    </div>
  )
}

function PhotoCard({ photo, accent }) {
  return (
    <figure style={{ margin: 0 }}>
      <div style={{ position: "relative" }}>
        <div style={{ aspectRatio: "4/3", borderRadius: 8, overflow: "hidden", border: `1px solid ${accent}33` }}>
          <img src={photo.src} alt={photo.caption || ""} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
        {photo.tag && (
          <span style={{ position: "absolute", top: 8, left: 8, fontFamily: MONO, fontSize: 8.5, letterSpacing: "0.06em", textTransform: "uppercase", color: "#0A1228", background: accent, borderRadius: 5, padding: "3px 8px", fontWeight: 600 }}>{photo.tag}</span>
        )}
      </div>
      {photo.caption && <figcaption style={{ fontFamily: SANS, fontSize: "0.8rem", color: MUT, lineHeight: 1.5, marginTop: 9 }}>{photo.caption}</figcaption>}
    </figure>
  )
}

function BackBtn({ label, onClick }) {
  return (
    <button onClick={onClick} style={{
      display: "inline-flex", alignItems: "center", gap: 8, background: "none", border: `1px solid ${GOLD}40`,
      color: GOLD, borderRadius: 20, padding: "7px 14px", cursor: "pointer", fontFamily: MONO, fontSize: 10,
      letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 28, maxWidth: "100%",
    }}>← {label}</button>
  )
}

function RegionHeader({ world }) {
  return (
    <div style={{ marginBottom: 26 }}>
      <p style={{ fontFamily: MONO, fontSize: 10, color: world.accent, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>{WORLD_ICON[world.id]} Region</p>
      <h1 style={{ fontFamily: SERIF, fontSize: "clamp(1.9rem, 5vw, 2.8rem)", fontWeight: 700, color: LIGHT, lineHeight: 1.06, marginBottom: 12 }}>{world.label}</h1>
      <p style={{ fontSize: "0.92rem", color: MUT, lineHeight: 1.7, maxWidth: 480 }}>{world.blurb}</p>
      <div style={{ height: 1, background: `linear-gradient(90deg, ${world.accent}66, transparent)`, marginTop: 18 }} />
    </div>
  )
}

function EmptyWorld({ world }) {
  return (
    <div style={{ position: "relative", textAlign: "center", padding: "50px 24px", border: `1px solid ${world.accent}22`, borderRadius: 16, background: `radial-gradient(ellipse 80% 100% at 50% 0%, ${world.accent}0E, transparent 70%)` }}>
      <div style={{ fontSize: "1.6rem", color: world.accent, opacity: 0.5, marginBottom: 12 }}>✦</div>
      <p style={{ fontFamily: SERIF, fontSize: "1.2rem", color: LIGHT, marginBottom: 8, fontStyle: "italic" }}>Uncharted territory</p>
      <p style={{ fontFamily: SANS, fontSize: "0.86rem", color: MUT, lineHeight: 1.65, maxWidth: 400, margin: "0 auto 14px" }}>
        No programs logged in this region yet — the first <span style={{ color: world.accent }}>{world.label}</span> entry lands here.
      </p>
      <p style={{ fontFamily: MONO, fontSize: 9, color: DIM, letterSpacing: "0.12em" }}>add one with world: "{world.id}" in data.js</p>
    </div>
  )
}
