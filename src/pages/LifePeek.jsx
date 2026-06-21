import { useEffect, useRef, useState, useCallback } from "react"
import { Link } from "react-router-dom"
import { useTheme } from "../ThemeContext"
import { lifejourney, openworld, touchinggrass } from "../data"

// ── Theme-aware tokens ────────────────────────────────────────────────────────

function useTokens(dark) {
  return {
    bg:        dark ? "#06080D"                    : "var(--bg)",
    surface:   dark ? "rgba(255,255,255,0.038)"    : "rgba(0,0,0,0.030)",
    surfaceH:  dark ? "rgba(255,255,255,0.072)"    : "rgba(0,0,0,0.055)",
    border:    dark ? "rgba(255,255,255,0.075)"    : "rgba(0,0,0,0.09)",
    borderH:   dark ? "rgba(255,255,255,0.18)"     : "rgba(0,0,0,0.18)",
    text:      dark ? "#E6EDF3"                    : "var(--text)",
    muted:     dark ? "rgba(255,255,255,0.40)"     : "var(--muted)",
    heroBg:    dark ? "#0A0D14"                    : "var(--bg)",
    lineColor: dark ? "rgba(255,255,255,0.10)"     : "rgba(0,0,0,0.12)",
    cardShadow:dark ? "none"                       : "0 2px 12px rgba(0,0,0,0.07)",
  }
}

const MONO  = "'JetBrains Mono', monospace"
const SERIF = "'Fraunces', Georgia, serif"
const SANS  = "'Geist', system-ui, sans-serif"

// ── Hooks ─────────────────────────────────────────────────────────────────────

function useClock() {
  const [time, setTime] = useState("")
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-US", { hour12: false }))
    tick()
    const t = setInterval(tick, 1000)
    return () => clearInterval(t)
  }, [])
  return time
}

function useInView(ref) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold: 0.06 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return inView
}

// ── Nav ───────────────────────────────────────────────────────────────────────

const SECTIONS = [
  { id: "life-journey",   label: "Life Journey"   },
  { id: "open-world",     label: "Open World"     },
  { id: "touching-grass", label: "Touching Grass" },
]

function LifePeekNav({ tok, dark, toggleTheme }) {
  const clock = useClock()

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - 68
    window.scrollTo({ top: y, behavior: "smooth" })
  }

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 50,
      background: dark ? "rgba(6,8,13,0.88)" : "rgba(var(--nav-bg), 0.92)",
      backgroundColor: dark ? "rgba(6,8,13,0.88)" : "var(--nav-bg)",
      backdropFilter: "blur(14px)",
      borderBottom: `1px solid ${tok.border}`,
      padding: "0 40px",
      height: 54,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      gap: 24,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 20, flexShrink: 0 }}>
        <Link
          to="/"
          style={{ fontFamily: MONO, fontSize: 11, color: tok.muted, textDecoration: "none",
            letterSpacing: "0.1em", transition: "color 0.15s" }}
          onMouseEnter={e => e.currentTarget.style.color = tok.text}
          onMouseLeave={e => e.currentTarget.style.color = tok.muted}
        >
          ← portfolio
        </Link>
        <span style={{ fontFamily: MONO, fontSize: 11, color: tok.lineColor }}>|</span>
        <span style={{ fontFamily: MONO, fontSize: 12, color: "var(--accent)", letterSpacing: "0.15em" }}>
          // lifepeek
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        {SECTIONS.map(s => (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: SANS, fontSize: "0.82rem", fontWeight: 500,
              color: tok.muted, padding: 0,
              transition: "color 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.color = tok.text}
            onMouseLeave={e => e.currentTarget.style.color = tok.muted}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
        <span style={{ fontFamily: MONO, fontSize: 10, color: tok.lineColor, letterSpacing: "0.1em" }}>
          {clock}
        </span>
        <button
          onClick={toggleTheme}
          style={{
            background: "none", border: `1px solid ${tok.border}`,
            borderRadius: 6, padding: "4px 8px",
            cursor: "pointer", color: tok.muted,
            fontFamily: MONO, fontSize: 10, letterSpacing: "0.08em",
            transition: "border-color 0.15s, color 0.15s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = "var(--accent)"
            e.currentTarget.style.color = "var(--accent)"
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = tok.border
            e.currentTarget.style.color = tok.muted
          }}
        >
          {dark ? "light" : "dark"}
        </button>
      </div>
    </nav>
  )
}

// ── Section wrapper ───────────────────────────────────────────────────────────

function SectionHeader({ tok, label, title, subtitle, accent }) {
  const ref    = useRef(null)
  const inView = useInView(ref)

  return (
    <div
      ref={ref}
      style={{
        marginBottom: 40,
        opacity:    inView ? 1 : 0,
        transform:  inView ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      <p style={{ fontFamily: MONO, fontSize: 10, color: accent || "var(--accent)",
        letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 10 }}>
        // {label}
      </p>
      <h2 style={{
        fontFamily: SERIF, fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
        fontWeight: 700, color: tok.text,
        letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 8,
      }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{ fontFamily: SANS, fontSize: "0.9rem", color: tok.muted, lineHeight: 1.6 }}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

// ── Life Journey — horizontal timeline ────────────────────────────────────────

function MilestoneStop({ stop, index, tok }) {
  const ref    = useRef(null)
  const inView = useInView(ref)
  const above  = index % 2 === 0
  const isFuture = stop.type === "future"
  const color  = stop.color || tok.muted

  return (
    <div
      ref={ref}
      style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        width: 160, flexShrink: 0, position: "relative",
        opacity:    inView ? 1 : 0,
        transform:  inView ? "translateY(0)" : `translateY(${above ? -16 : 16}px)`,
        transition: `opacity 0.5s ease ${index * 60}ms, transform 0.5s ease ${index * 60}ms`,
      }}
    >
      {/* Label above */}
      <div style={{
        height: 80, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: above ? "flex-end" : "flex-start",
        paddingBottom: above ? 12 : 0, paddingTop: above ? 0 : 12,
        order: above ? 0 : 2,
      }}>
        <span style={{
          fontFamily: SANS, fontSize: "0.78rem", fontWeight: 600,
          color: isFuture ? tok.muted : tok.text,
          textAlign: "center", lineHeight: 1.3,
          fontStyle: isFuture ? "italic" : "normal",
        }}>
          {stop.title}
        </span>
        <span style={{
          fontFamily: MONO, fontSize: 9, color: color,
          letterSpacing: "0.14em", marginTop: 4, textTransform: "uppercase",
        }}>
          {stop.tag}
        </span>
      </div>

      {/* Dot on line */}
      <div style={{
        order: 1,
        width: isFuture ? 12 : 14,
        height: isFuture ? 12 : 14,
        borderRadius: "50%",
        backgroundColor: isFuture ? "transparent" : color,
        border: isFuture ? `2px dashed ${tok.muted}` : `3px solid ${color}`,
        boxShadow: isFuture ? "none" : `0 0 10px ${color}55`,
        zIndex: 2, flexShrink: 0,
        transition: "box-shadow 0.2s",
      }} />

      {/* Date below */}
      <div style={{
        height: 80, display: "flex", alignItems: above ? "flex-start" : "flex-end",
        paddingTop: above ? 10 : 0, paddingBottom: above ? 0 : 10,
        order: above ? 2 : 0,
      }}>
        <span style={{
          fontFamily: MONO, fontSize: 10,
          color: isFuture ? tok.muted : "var(--accent)",
          letterSpacing: "0.1em",
          opacity: isFuture ? 0.5 : 1,
        }}>
          {stop.date}
        </span>
      </div>
    </div>
  )
}

function HorizontalTimeline({ tok }) {
  const scrollRef  = useRef(null)
  const isDown     = useRef(false)
  const startX     = useRef(0)
  const scrollLeft = useRef(0)

  const onMouseDown = useCallback(e => {
    isDown.current = true
    scrollRef.current.style.cursor = "grabbing"
    startX.current     = e.pageX - scrollRef.current.offsetLeft
    scrollLeft.current = scrollRef.current.scrollLeft
  }, [])

  const onMouseMove = useCallback(e => {
    if (!isDown.current) return
    e.preventDefault()
    const x    = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX.current) * 1.2
    scrollRef.current.scrollLeft = scrollLeft.current - walk
  }, [])

  const onMouseUp = useCallback(() => {
    isDown.current = false
    if (scrollRef.current) scrollRef.current.style.cursor = "grab"
  }, [])

  const onWheel = useCallback(e => {
    e.preventDefault()
    scrollRef.current.scrollLeft += e.deltaY
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.addEventListener("wheel", onWheel, { passive: false })
    return () => el.removeEventListener("wheel", onWheel)
  }, [onWheel])

  return (
    <div
      ref={scrollRef}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      style={{
        overflowX: "auto", overflowY: "hidden",
        cursor: "grab", userSelect: "none",
        scrollbarWidth: "none", msOverflowStyle: "none",
        paddingBottom: 4,
      }}
    >
      <div style={{
        display: "flex", alignItems: "center",
        width: "max-content",
        padding: "8px 60px",
        position: "relative", minHeight: 180,
      }}>
        {/* Timeline line */}
        <div style={{
          position: "absolute",
          top: "50%", left: 60,
          width: `calc(100% - 120px)`,
          height: 1,
          background: `linear-gradient(to right, transparent, ${tok.lineColor} 6%, ${tok.lineColor} 94%, transparent)`,
          transform: "translateY(-50%)",
          pointerEvents: "none",
        }} />

        {lifejourney.map((stop, i) => (
          <MilestoneStop key={stop.id} stop={stop} index={i} tok={tok} />
        ))}
      </div>
    </div>
  )
}

// ── Post card ─────────────────────────────────────────────────────────────────

function PostCard({ post, accentColor, tok, delay = 0 }) {
  const ref    = useRef(null)
  const inView = useInView(ref)
  const [hov, setHov] = useState(false)

  const hasImages = post.images && post.images.length > 0
  const meta      = post.program || post.location || ""

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background:   hov ? tok.surfaceH : tok.surface,
        border:       `1px solid ${hov ? accentColor + "55" : tok.border}`,
        borderRadius: 16,
        overflow:     "hidden",
        boxShadow:    hov
          ? `0 0 24px ${accentColor}22, ${tok.cardShadow}`
          : tok.cardShadow,
        transform:    hov ? "translateY(-4px)" :
                      inView ? "translateY(0)" : "translateY(28px)",
        opacity:      inView ? 1 : 0,
        transition:   `all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`,
      }}
    >
      {/* Image area */}
      {hasImages ? (
        <div style={{
          width: "100%",
          aspectRatio: post.images.length === 1 ? "16/9" : "4/3",
          display: "grid",
          gridTemplateColumns: post.images.length >= 2 ? "1fr 1fr" : "1fr",
          gap: 2, backgroundColor: tok.border,
        }}>
          {post.images.slice(0, 4).map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              style={{
                width: "100%", height: "100%",
                objectFit: "cover", display: "block",
                gridColumn: post.images.length === 3 && i === 0 ? "span 2" : "auto",
              }}
            />
          ))}
        </div>
      ) : (
        // No-image placeholder strip
        <div style={{
          height: 6,
          background: `linear-gradient(to right, ${accentColor}, ${accentColor}44)`,
        }} />
      )}

      {/* Content */}
      <div style={{ padding: "20px 22px 22px" }}>
        {/* Meta row */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10, marginBottom: 12,
          flexWrap: "wrap",
        }}>
          <span style={{
            fontFamily: MONO, fontSize: 9, letterSpacing: "0.14em",
            color: accentColor, textTransform: "uppercase",
          }}>
            {meta}
          </span>
          <span style={{ fontFamily: MONO, fontSize: 9, color: tok.muted, letterSpacing: "0.1em" }}>
            ·
          </span>
          <span style={{ fontFamily: MONO, fontSize: 9, color: tok.muted, letterSpacing: "0.1em" }}>
            {post.date}
          </span>
        </div>

        <h3 style={{
          fontFamily: SERIF, fontSize: "1.15rem", fontWeight: 600,
          color: tok.text, marginBottom: 10, lineHeight: 1.25,
        }}>
          {post.title}
        </h3>

        <p style={{
          fontFamily: SANS, fontSize: "0.86rem",
          color: tok.muted, lineHeight: 1.72, marginBottom: 16,
        }}>
          {post.body}
        </p>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {post.tags.map(tag => (
              <span key={tag} style={{
                fontFamily: MONO, fontSize: 9,
                padding: "3px 8px", borderRadius: 4,
                background: accentColor + "15",
                color: accentColor,
                letterSpacing: "0.1em",
              }}>
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function EmptyState({ tok, icon, message, sub }) {
  return (
    <div style={{
      gridColumn: "1 / -1",
      textAlign: "center", padding: "64px 20px",
      border: `1px dashed ${tok.border}`,
      borderRadius: 16,
    }}>
      <div style={{ fontSize: "2rem", marginBottom: 14 }}>{icon}</div>
      <p style={{ fontFamily: SERIF, fontSize: "1.1rem", color: tok.muted, marginBottom: 8 }}>
        {message}
      </p>
      <p style={{ fontFamily: MONO, fontSize: 10, color: tok.lineColor, letterSpacing: "0.12em" }}>
        {sub}
      </p>
    </div>
  )
}

function PostGrid({ posts, accentColor, tok, emptyIcon, emptyMessage, emptySub }) {
  if (!posts || posts.length === 0) {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "1fr" }}>
        <EmptyState tok={tok} icon={emptyIcon} message={emptyMessage} sub={emptySub} />
      </div>
    )
  }

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: 16,
    }}>
      {posts.map((post, i) => (
        <PostCard
          key={post.id}
          post={post}
          accentColor={accentColor}
          tok={tok}
          delay={i * 70}
        />
      ))}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function LifePeek() {
  const { dark, toggle } = useTheme()
  const tok = useTokens(dark)

  useEffect(() => {
    document.title = "LifePeek — Dominion Eze"
    return () => { document.title = "Dominion Eze — AI Engineer & System Architect" }
  }, [])

  const pad = "0 40px"

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: tok.bg,
      color: tok.text,
      fontFamily: SANS,
      transition: "background-color 0.25s ease, color 0.25s ease",
    }}>

      <style>{`
        @keyframes lp-spin {
          to { transform: rotate(360deg); }
        }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Grain */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 9998, pointerEvents: "none",
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
        backgroundSize: "200px 200px",
        opacity: dark ? 0.025 : 0.018,
      }} />

      <LifePeekNav tok={tok} dark={dark} toggleTheme={toggle} />

      {/* ── Page Header ── */}
      <header style={{ maxWidth: 1100, margin: "0 auto", padding: "52px 40px 16px" }}>
        <p style={{ fontFamily: MONO, fontSize: 10, color: tok.muted,
          letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 14 }}>
          // dominion.world
        </p>
        <h1 style={{
          fontFamily: SERIF, fontSize: "clamp(2rem, 4vw, 3.2rem)",
          fontWeight: 700, color: tok.text,
          letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 12,
        }}>
          Beyond the code.
          <span style={{ color: tok.muted, fontWeight: 400 }}> This is who I actually am.</span>
        </h1>
        <p style={{ fontFamily: SANS, fontSize: "0.92rem", color: tok.muted, maxWidth: 480, lineHeight: 1.65 }}>
          Programs I'm in. Places I go. Things I build for fun. The full picture — not just the resume.
        </p>
      </header>

      {/* ── LIFE JOURNEY ── */}
      <section id="life-journey" style={{ maxWidth: 1100, margin: "0 auto", padding: "52px 0 60px" }}>
        <div style={{ padding: pad }}>
          <SectionHeader
            tok={tok}
            label="life journey"
            title="The Roadmap So Far"
            subtitle="Every milestone, program, and move — in order. Drag or scroll to explore."
            accent="var(--accent)"
          />
        </div>

        {/* Full-bleed timeline with inner padding */}
        <div style={{
          background: tok.surface,
          borderTop: `1px solid ${tok.border}`,
          borderBottom: `1px solid ${tok.border}`,
        }}>
          <HorizontalTimeline tok={tok} />
        </div>

        {/* Scroll hint */}
        <div style={{ padding: "12px 40px 0" }}>
          <p style={{ fontFamily: MONO, fontSize: 9, color: tok.lineColor, letterSpacing: "0.14em" }}>
            ← drag or scroll →
          </p>
        </div>
      </section>

      {/* ── OPEN WORLD ── */}
      <section id="open-world" style={{ maxWidth: 1100, margin: "0 auto", padding: "52px 40px 60px" }}>
        <SectionHeader
          tok={tok}
          label="open world"
          title="Programs & Learning"
          subtitle="Inside the cohorts, fellowships, and programs I'm part of. What's actually happening, not just the title."
          accent="#06B6D4"
        />
        <PostGrid
          posts={openworld}
          accentColor="#06B6D4"
          tok={tok}
          emptyIcon="📡"
          emptyMessage="First post coming soon."
          emptySub="// posts from EY, CodePath, Oracle and more on the way"
        />
      </section>

      {/* ── TOUCHING GRASS ── */}
      <section id="touching-grass" style={{ maxWidth: 1100, margin: "0 auto", padding: "52px 40px 80px" }}>
        <SectionHeader
          tok={tok}
          label="touching grass"
          title="Life Outside the Screen"
          subtitle="Outings, hobbies, random moments. Proof that I do, in fact, go outside."
          accent="#10B981"
        />
        <PostGrid
          posts={touchinggrass}
          accentColor="#10B981"
          tok={tok}
          emptyIcon="🌿"
          emptyMessage="First outing post coming soon."
          emptySub="// pics and write-ups dropping as life happens"
        />
      </section>

      {/* ── Footer ── */}
      <footer style={{
        borderTop: `1px solid ${tok.border}`,
        padding: "22px 40px",
        maxWidth: 1100, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 12,
      }}>
        <span style={{ fontFamily: MONO, fontSize: 10, color: tok.lineColor, letterSpacing: "0.12em" }}>
          // content updated as life happens
        </span>
        <Link
          to="/"
          style={{
            fontFamily: MONO, fontSize: 10, color: "var(--accent)",
            textDecoration: "none", letterSpacing: "0.1em",
            transition: "opacity 0.15s",
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.7"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >
          ← back to portfolio
        </Link>
      </footer>
    </div>
  )
}
