import { useRef, useState, useEffect } from "react"

/* ── Shared theming for the LifePeek realms ──────────────────────────────────
   Each realm gets its own animated background via <SpaceBackground theme="…">:
     · aurora        — Life Journey  (flowing northern-lights ribbons + stars)
     · constellation — Open World     (a living star-map that reaches to the cursor)
     · liquid        — Touching Grass (soft morphing colour aura, social-app energy)
   (frost — drifting blizzard + icy mist; ember, petals also available.)
   All honor prefers-reduced-motion. ──────────────────────────────────────── */

export const MONO = "'JetBrains Mono', monospace"
export const SERIF = "'Fraunces', Georgia, serif"
export const SANS = "'Geist', system-ui, sans-serif"

export const MOON = "#CFE0FF"
export const LIGHT = "#EAF1FF"
export const MUT = "rgba(188,205,236,0.74)"
export const DIM = "rgba(150,172,210,0.5)"
export const LIVE = "#7EE0BE"

export function useMedia(query) {
  const [match, setMatch] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setMatch(mq.matches)
    on()
    mq.addEventListener("change", on)
    return () => mq.removeEventListener("change", on)
  }, [query])
  return match
}

function drawAurora(ctx, W, H, t, P, reduced) {
  ctx.fillStyle = "#060a18"; ctx.fillRect(0, 0, W, H)
  P.forEach(s => {
    if (!reduced) s.ph += s.sp
    const a = s.b * (reduced ? 0.6 : (0.45 + 0.55 * Math.sin(s.ph)))
    ctx.globalAlpha = a; ctx.beginPath(); ctx.arc(s.x * W, s.y * H, s.r, 0, 6.28); ctx.fillStyle = "rgba(220,230,255,1)"; ctx.fill()
  })
  ctx.globalAlpha = 1
  const cols = [["59,214,160", 0.13], ["90,168,255", 0.11], ["160,107,255", 0.09]]
  cols.forEach((c, k) => {
    ctx.beginPath()
    for (let x = 0; x <= W; x += 12) {
      const tt = reduced ? k * 1.6 : t * 0.5 + k * 1.6
      const y = H * 0.32 + Math.sin(x * 0.011 + tt) * 42 + Math.sin(x * 0.028 - tt * 0.7) * 18 + k * 30
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
    }
    ctx.lineTo(W, 0); ctx.lineTo(0, 0); ctx.closePath()
    const g = ctx.createLinearGradient(0, H * 0.12, 0, H * 0.7)
    g.addColorStop(0, `rgba(${c[0]},0)`); g.addColorStop(0.5, `rgba(${c[0]},${c[1]})`); g.addColorStop(1, `rgba(${c[0]},0)`)
    ctx.fillStyle = g; ctx.fill()
  })
}

function drawConstellation(ctx, W, H, P, mouse, reduced) {
  ctx.fillStyle = "#06080f"; ctx.fillRect(0, 0, W, H)
  if (!reduced) P.forEach(p => { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1 })
  for (let i = 0; i < P.length; i++) {
    for (let j = i + 1; j < P.length; j++) {
      const dx = P[i].x - P[j].x, dy = P[i].y - P[j].y, d = Math.sqrt(dx * dx + dy * dy)
      if (d < 108) { ctx.strokeStyle = `rgba(150,185,255,${(1 - d / 108) * 0.18})`; ctx.lineWidth = 0.6; ctx.beginPath(); ctx.moveTo(P[i].x, P[i].y); ctx.lineTo(P[j].x, P[j].y); ctx.stroke() }
    }
    if (!reduced) {
      const mx = P[i].x - mouse.x, my = P[i].y - mouse.y, md = Math.sqrt(mx * mx + my * my)
      if (md < 150) { ctx.strokeStyle = `rgba(190,215,255,${(1 - md / 150) * 0.45})`; ctx.lineWidth = 0.8; ctx.beginPath(); ctx.moveTo(P[i].x, P[i].y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke() }
    }
    ctx.fillStyle = "rgba(205,222,255,0.8)"; ctx.beginPath(); ctx.arc(P[i].x, P[i].y, 1.6, 0, 6.28); ctx.fill()
  }
}

function drawEmber(ctx, W, H, P, reduced) {
  ctx.fillStyle = "#0e0a06"; ctx.fillRect(0, 0, W, H)
  const g = ctx.createLinearGradient(0, H, 0, H * 0.4); g.addColorStop(0, "rgba(255,120,50,0.07)"); g.addColorStop(1, "rgba(255,120,50,0)")
  ctx.fillStyle = g; ctx.fillRect(0, H * 0.4, W, H * 0.6)
  P.forEach(p => {
    if (!reduced) { p.y -= p.s; p.ph += 0.04; p.x += Math.sin(p.ph) * 0.45 }
    if (p.y < -6) { p.y = H + 6; p.x = Math.random() * W }
    const a = reduced ? 0.5 : (0.35 + 0.65 * Math.abs(Math.sin(p.ph)))
    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.28); ctx.fillStyle = `rgba(255,150,70,${a})`; ctx.shadowBlur = 8; ctx.shadowColor = "rgba(255,140,60,0.7)"; ctx.fill()
  })
  ctx.shadowBlur = 0
}

function drawPetals(ctx, W, H, P, reduced) {
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, "#0b0a1c"); g.addColorStop(1, "#16101f")
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H)
  ctx.save(); ctx.globalCompositeOperation = "lighter"
  const rg = ctx.createRadialGradient(W * 0.72, -H * 0.12, 0, W * 0.72, -H * 0.12, H * 0.7)
  rg.addColorStop(0, "rgba(255,205,228,0.07)"); rg.addColorStop(1, "rgba(255,205,228,0)")
  ctx.fillStyle = rg; ctx.fillRect(0, 0, W, H); ctx.restore()
  P.forEach(p => {
    if (!reduced) {
      p.ph += 0.02; p.y += p.vy; p.x += Math.sin(p.ph) * p.sway; p.rot += p.vr
      if (p.y > H + 12) { p.y = -12; p.x = Math.random() * W }
      if (p.x > W + 12) p.x = -12; else if (p.x < -12) p.x = W + 12
    }
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot)
    ctx.fillStyle = `rgba(${p.c},${p.a})`
    ctx.beginPath(); ctx.ellipse(0, 0, p.r, p.r * 0.55, 0, 0, 6.28); ctx.fill()
    ctx.restore()
  })
}

const BLOBS = [["255,120,160", 0.30, 0.30], ["255,170,90", 0.72, 0.34], ["150,120,255", 0.40, 0.72], ["90,180,255", 0.74, 0.70]]
function drawLiquid(ctx, W, H, t, reduced) {
  ctx.fillStyle = "#0a0a16"; ctx.fillRect(0, 0, W, H)
  ctx.save(); ctx.globalCompositeOperation = "lighter"
  const R0 = Math.min(W, H) * 0.62
  BLOBS.forEach((b, k) => {
    const x = (b[1] + (reduced ? 0 : Math.sin(t * 0.22 + k * 1.7) * 0.1)) * W
    const y = (b[2] + (reduced ? 0 : Math.cos(t * 0.2 + k * 2.1) * 0.1)) * H
    const g = ctx.createRadialGradient(x, y, 0, x, y, R0)
    g.addColorStop(0, `rgba(${b[0]},0.24)`); g.addColorStop(1, `rgba(${b[0]},0)`)
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, R0, 0, 6.28); ctx.fill()
  })
  ctx.restore()
}

function drawFrost(ctx, W, H, P, reduced) {
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, "#0a1b2e"); g.addColorStop(1, "#04101e")
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H)
  P.forEach(f => {
    if (!reduced) { f.y += f.s; f.ph += 0.02; f.x += Math.sin(f.ph) * f.sway + 0.5 }
    if (f.y > H + 6) { f.y = -6; f.x = Math.random() * W }
    if (f.x > W + 6) f.x = -6
    ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, 6.28); ctx.fillStyle = `rgba(228,240,255,${f.a})`; ctx.fill()
  })
  ctx.save()
  const vg = ctx.createRadialGradient(W / 2, H * 0.42, Math.min(W, H) * 0.2, W / 2, H * 0.5, Math.max(W, H) * 0.78)
  vg.addColorStop(0, "rgba(150,205,255,0)"); vg.addColorStop(0.7, "rgba(150,205,255,0.045)"); vg.addColorStop(1, "rgba(8,24,40,0.5)")
  ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H); ctx.restore()
}

export function SpaceBackground({ reduced, theme = "aurora" }) {
  const canvasRef = useRef(null)
  const raf = useRef(0)
  const mouse = useRef({ x: -999, y: -999 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    let W, H
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight }
    resize()
    window.addEventListener("resize", resize)

    let P = []
    if (theme === "aurora") for (let i = 0; i < 120; i++) P.push({ x: Math.random(), y: Math.random() * 0.92, r: Math.random() * 1.2 + 0.3, ph: Math.random() * 6.28, sp: Math.random() * 0.03 + 0.01, b: Math.random() * 0.5 + 0.4 })
    if (theme === "constellation") { const n = Math.max(40, Math.min(95, Math.round(W * H / 17000))); for (let i = 0; i < n; i++) P.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3 }) }
    if (theme === "ember") for (let i = 0; i < 72; i++) P.push({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 2 + 0.6, s: Math.random() * 0.7 + 0.25, ph: Math.random() * 6.28 })
    if (theme === "petals") { const shades = ["244,184,208", "232,155,191", "250,212,226"]; for (let i = 0; i < 54; i++) P.push({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 7 + 4, rot: Math.random() * 6.28, vr: (Math.random() - 0.5) * 0.02, vy: Math.random() * 0.5 + 0.3, sway: Math.random() * 0.6 + 0.3, ph: Math.random() * 6.28, a: Math.random() * 0.4 + 0.28, c: shades[Math.floor(Math.random() * 3)] }) }
    if (theme === "frost") for (let i = 0; i < 170; i++) P.push({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 2.2 + 0.5, s: Math.random() * 1.1 + 0.4, sway: Math.random() * 0.7 + 0.2, ph: Math.random() * 6.28, a: Math.random() * 0.55 + 0.3 })

    const onMove = e => { mouse.current.x = e.clientX; mouse.current.y = e.clientY }
    const onLeave = () => { mouse.current.x = -999; mouse.current.y = -999 }
    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseout", onLeave)

    const t0 = performance.now()
    const draw = now => {
      const t = (now - t0) / 1000
      if (theme === "constellation") drawConstellation(ctx, W, H, P, mouse.current, reduced)
      else if (theme === "ember") drawEmber(ctx, W, H, P, reduced)
      else if (theme === "petals") drawPetals(ctx, W, H, P, reduced)
      else if (theme === "liquid") drawLiquid(ctx, W, H, t, reduced)
      else if (theme === "frost") drawFrost(ctx, W, H, P, reduced)
      else drawAurora(ctx, W, H, t, P, reduced)
      raf.current = requestAnimationFrame(draw)
    }
    draw(performance.now())

    return () => {
      cancelAnimationFrame(raf.current)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseout", onLeave)
    }
  }, [reduced, theme])

  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />
}
