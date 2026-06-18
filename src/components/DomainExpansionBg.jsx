import { useEffect, useRef, useState } from "react"
import { useDomainExpansion } from "../context/DomainExpansionContext"

export default function DomainExpansionBg() {
  const { expanded } = useDomainExpansion()
  const canvasRef = useRef(null)
  const animRef = useRef(null)
  const [visible, setVisible] = useState(false)

  // Delay rendering so the flash animation plays first
  useEffect(() => {
    if (expanded) {
      const t = setTimeout(() => setVisible(true), 120)
      return () => clearTimeout(t)
    } else {
      setVisible(false)
    }
  }, [expanded])

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

    const particles = Array.from({ length: 130 }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 2 + 0.3,
      vx: (Math.random() - 0.5) * (i < 25 ? 1.2 : 0.25),
      vy: (Math.random() - 0.5) * (i < 25 ? 1.2 : 0.25),
      opacity: Math.random() * 0.65 + 0.2,
      phase: Math.random() * Math.PI * 2,
      isStreak: i < 25,
      streakLen: Math.random() * 30 + 12,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        p.phase += 0.018
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        const op = p.opacity * (0.65 + 0.35 * Math.sin(p.phase))
        if (p.isStreak) {
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(p.x - p.vx * p.streakLen, p.y - p.vy * p.streakLen)
          ctx.strokeStyle = `rgba(180,110,255,${op * 0.55})`
          ctx.lineWidth = p.r * 0.6
          ctx.stroke()
        }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(165,95,255,${op})`
        ctx.fill()
      })
      animRef.current = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener("resize", resize)
    }
  }, [visible])

  if (!expanded) return null

  return (
    <>
      {/* Void */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", background: "#030009" }} />

      {/* Blueprint grid — drifts slowly */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: [
          "linear-gradient(rgba(140,70,255,0.07) 1px, transparent 1px)",
          "linear-gradient(90deg, rgba(140,70,255,0.07) 1px, transparent 1px)",
        ].join(","),
        backgroundSize: "52px 52px",
        animation: "de-grid-drift 28s linear infinite",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.6s ease",
      }} />

      {/* Central violet bloom */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: [
          "radial-gradient(ellipse 65% 55% at 50% 38%, rgba(110,40,240,0.14) 0%, transparent 60%)",
          "radial-gradient(ellipse 35% 25% at 82% 75%, rgba(80,20,200,0.09) 0%, transparent 55%)",
        ].join(","),
        animation: "de-bloom 7s ease-in-out infinite",
      }} />

      {/* Edge vignette */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 85% 85% at 50% 50%, transparent 25%, rgba(3,0,9,0.75) 100%)",
      }} />

      {/* Scan line */}
      <div style={{
        position: "fixed", left: 0, right: 0, height: "2px", zIndex: 0, pointerEvents: "none",
        background: "linear-gradient(90deg, transparent 0%, rgba(180,110,255,0.12) 20%, rgba(220,170,255,0.35) 50%, rgba(180,110,255,0.12) 80%, transparent 100%)",
        animation: "de-scan 7s linear infinite",
        boxShadow: "0 0 8px rgba(200,140,255,0.2)",
      }} />

      {/* Particles */}
      <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />

      <style>{`
        @keyframes de-grid-drift {
          0%   { background-position: 0 0; }
          100% { background-position: 52px 52px; }
        }
        @keyframes de-bloom {
          0%,100% { opacity: 0.6; transform: scale(1); }
          50%      { opacity: 1;   transform: scale(1.06); }
        }
        @keyframes de-scan {
          0%   { top: -2px;   opacity: 0; }
          4%   { opacity: 1; }
          96%  { opacity: 1; }
          100% { top: 100vh; opacity: 0; }
        }
      `}</style>
    </>
  )
}
