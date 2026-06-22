import { useEffect, useRef, useState } from "react"
import { useFrost } from "../context/FrostContext"

/**
 * FrostBg — the glacial atmosphere that sits behind the whole portfolio while
 * Frost mode is engaged. Layered for depth:
 *   • aurora ribbons (DOM, blurred, drifting)
 *   • ice-crystal lattice grid (DOM, masked)
 *   • two-depth blizzard + twinkling glints (canvas, perf-friendly)
 *   • frost creeping in from the screen edges (SVG fractal noise, masked)
 *   • cold ground mist + corner vignette
 *   • a slow sweeping scan line
 * Mounts only when frost is on; fades in. Respects prefers-reduced-motion.
 */
export default function FrostBg() {
  const { frost } = useFrost()
  const canvasRef = useRef(null)
  const animRef = useRef(null)
  const [visible, setVisible] = useState(false)

  const reduce = typeof window !== "undefined" &&
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches

  useEffect(() => {
    if (frost) {
      const t = setTimeout(() => setVisible(true), 100)
      return () => clearTimeout(t)
    }
    setVisible(false)
  }, [frost])

  useEffect(() => {
    if (!visible) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    // Two snow depths: far (small, sharp, slow) and near (large, blurred, fast)
    const make = (c, near) => ({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      r: near ? Math.random() * 2.6 + 1.6 : Math.random() * 1.2 + 0.5,
      vy: near ? Math.random() * 0.9 + 0.55 : Math.random() * 0.45 + 0.18,
      drift: (Math.random() - 0.5) * (near ? 0.8 : 0.4),
      sway: Math.random() * Math.PI * 2,
      swaySpeed: Math.random() * 0.02 + 0.005,
      near,
    })
    const far = Array.from({ length: 70 }, () => make(canvas, false))
    const near = Array.from({ length: 30 }, () => make(canvas, true))
    // Twinkling ice glints
    const glints = Array.from({ length: 22 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.6 + 1,
      ph: Math.random() * Math.PI * 2,
      sp: Math.random() * 0.04 + 0.015,
    }))

    const flake = (p) => {
      p.sway += p.swaySpeed
      p.y += p.vy
      p.x += p.drift + Math.sin(p.sway) * (p.near ? 0.6 : 0.3)
      if (p.y - p.r > canvas.height) { p.y = -p.r; p.x = Math.random() * canvas.width }
      if (p.x < -10) p.x = canvas.width + 10
      if (p.x > canvas.width + 10) p.x = -10
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      const op = p.near ? 0.85 : 0.6
      ctx.fillStyle = `rgba(${p.near ? "255,255,255" : "214,236,250"},${op})`
      ctx.shadowBlur = p.near ? 7 : 0
      ctx.shadowColor = "rgba(186,230,253,0.8)"
      ctx.fill()
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      far.forEach(flake)
      // near layer gets a soft blur for depth
      ctx.save()
      ctx.filter = "blur(1.1px)"
      near.forEach(flake)
      ctx.restore()
      ctx.shadowBlur = 0
      // glints
      glints.forEach(g => {
        g.ph += g.sp
        const tw = (Math.sin(g.ph) + 1) / 2
        ctx.beginPath()
        ctx.arc(g.x, g.y, g.r * (0.6 + tw * 0.7), 0, Math.PI * 2)
        ctx.fillStyle = `rgba(186,230,253,${0.15 + tw * 0.8})`
        ctx.shadowBlur = 8
        ctx.shadowColor = "rgba(186,230,253,0.9)"
        ctx.fill()
      })
      ctx.shadowBlur = 0
      animRef.current = requestAnimationFrame(draw)
    }

    // Pause the rAF loop when the tab/page is hidden — no point animating
    // snow nobody can see, and it frees the CPU/GPU entirely while away.
    const onVis = () => {
      if (document.hidden) {
        cancelAnimationFrame(animRef.current)
      } else if (!reduce) {
        cancelAnimationFrame(animRef.current)
        animRef.current = requestAnimationFrame(draw)
      }
    }

    if (reduce) {
      // single static frame
      far.forEach(p => flake(p)); near.forEach(p => flake(p))
    } else {
      draw()
      document.addEventListener("visibilitychange", onVis)
    }
    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener("resize", resize)
      document.removeEventListener("visibilitychange", onVis)
    }
  }, [visible, reduce])

  if (!frost) return null

  const anim = (v) => (reduce ? "none" : v)

  return (
    <>
      {/* Frozen-night base */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: "radial-gradient(90% 70% at 50% -12%, rgba(95,201,248,0.12), transparent 58%), radial-gradient(80% 70% at 50% 60%, rgba(6,24,43,0.55), transparent 88%), linear-gradient(180deg, #051426, #081F38 55%, #0A2746)",
        opacity: visible ? 1 : 0, transition: "opacity 0.6s ease",
      }} />

      {/* Aurora ribbons — two independently drifting washes.
          Blur radii kept modest: huge blur() over a full-width fixed layer is
          pure GPU fill cost, and these are already soft radial gradients. */}
      <div style={{
        position: "fixed", top: "-16%", left: "-15%", right: "-15%", height: "56%",
        zIndex: 0, pointerEvents: "none", filter: "blur(26px)",
        background: "radial-gradient(50% 100% at 26% 0%, rgba(125,211,252,0.28), transparent 68%), radial-gradient(46% 100% at 60% 6%, rgba(99,232,196,0.18), transparent 70%)",
        animation: anim("fr-aurora 19s ease-in-out infinite"),
        opacity: visible ? 1 : 0, transition: "opacity 0.7s ease",
      }} />
      <div style={{
        position: "fixed", top: "-18%", left: "-10%", right: "-20%", height: "52%",
        zIndex: 0, pointerEvents: "none", filter: "blur(30px)",
        background: "radial-gradient(48% 100% at 70% 0%, rgba(169,236,246,0.2), transparent 70%), radial-gradient(42% 100% at 40% 10%, rgba(129,140,248,0.14), transparent 72%)",
        animation: anim("fr-aurora2 25s ease-in-out infinite"),
        opacity: visible ? 1 : 0, transition: "opacity 0.7s ease",
      }} />

      {/* Ice-crystal lattice grid */}
      <div style={{
        position: "fixed", inset: "-40px", zIndex: 0, pointerEvents: "none",
        backgroundImage: [
          "linear-gradient(rgba(125,211,252,0.07) 1px, transparent 1px)",
          "linear-gradient(90deg, rgba(125,211,252,0.07) 1px, transparent 1px)",
        ].join(","),
        backgroundSize: "58px 58px",
        maskImage: "radial-gradient(ellipse 85% 75% at 55% 35%, #000 12%, transparent 82%)",
        WebkitMaskImage: "radial-gradient(ellipse 85% 75% at 55% 35%, #000 12%, transparent 82%)",
        animation: anim("fr-drift 28s ease-in-out infinite"),
        opacity: visible ? 1 : 0, transition: "opacity 0.6s ease",
      }} />

      {/* Snow + glints */}
      <canvas ref={canvasRef} style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        opacity: visible ? 1 : 0, transition: "opacity 0.8s ease",
      }} />

      {/* Frost creeping in from the edges.
          No mixBlendMode here: a full-screen blend layer re-composites against
          the page content on every scroll frame (the content scrolls *under*
          this fixed layer). Plain compositing + translateZ promotes it to a
          cached static layer that's rasterized once, so scrolling is free.
          Opacity dialed down since we lost the additive screen glow. */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        transform: "translateZ(0)",
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='700' height='700'%3E%3Cfilter id='c'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.014' numOctaves='4' seed='11' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.85 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23c)'/%3E%3C/svg%3E\")",
        backgroundSize: "cover",
        maskImage: "radial-gradient(125% 118% at 50% 44%, transparent 50%, #000 100%)",
        WebkitMaskImage: "radial-gradient(125% 118% at 50% 44%, transparent 50%, #000 100%)",
        opacity: visible ? 0.5 : 0, transition: "opacity 0.9s ease",
      }} />

      {/* Cold ground mist */}
      <div style={{
        position: "fixed", left: "-10%", right: "-10%", bottom: 0, height: "34%",
        zIndex: 0, pointerEvents: "none", filter: "blur(16px)",
        background: "linear-gradient(0deg, rgba(186,230,253,0.12), rgba(125,211,252,0.05) 45%, transparent)",
        animation: anim("fr-mist 16s ease-in-out infinite"),
        opacity: visible ? 1 : 0, transition: "opacity 0.7s ease",
      }} />

      {/* Inner glow + corner vignette */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        boxShadow: "inset 0 0 180px 30px rgba(125,211,252,0.12), inset 0 0 60px rgba(255,255,255,0.06)",
        background: "radial-gradient(120% 120% at 50% 50%, transparent 60%, rgba(3,12,24,0.5) 100%)",
      }} />

      {/* Sweeping scan line */}
      <div style={{
        position: "fixed", left: 0, right: 0, height: "180px", zIndex: 0, pointerEvents: "none",
        background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.05) 45%, rgba(169,236,246,0.09) 50%, transparent)",
        animation: anim("fr-scan 10s linear infinite"),
        opacity: visible ? 1 : 0, transition: "opacity 0.6s ease",
      }} />

      <style>{`
        @keyframes fr-aurora  { 0%,100% { transform: translate(0,0) scaleX(1); opacity: .55; } 50% { transform: translate(36px,8px) scaleX(1.14); opacity: .85; } }
        @keyframes fr-aurora2 { 0%,100% { transform: translate(0,0) scale(1); opacity: .45; } 50% { transform: translate(-42px,14px) scale(1.18); opacity: .8; } }
        @keyframes fr-drift   { 0%,100% { transform: translate(0,0); } 50% { transform: translate(26px,-20px); } }
        @keyframes fr-mist    { 0%,100% { transform: translateX(0); opacity: .45; } 50% { transform: translateX(34px); opacity: .78; } }
        @keyframes fr-scan    { 0% { top: -180px; } 100% { top: 100vh; } }
      `}</style>
    </>
  )
}
