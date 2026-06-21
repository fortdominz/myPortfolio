import { useEffect, useRef, useState } from "react"
import { useDomainExpansion } from "../context/DomainExpansionContext"

export default function DomainExpansionBg() {
  const { expanded } = useDomainExpansion()
  const canvasRef = useRef(null)
  const animRef = useRef(null)
  const [visible, setVisible] = useState(false)

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

    // Rising embers
    const embers = Array.from({ length: 90 }, () => spawnEmber(canvas))
    function spawnEmber(c) {
      return {
        x: Math.random() * c.width,
        y: c.height + Math.random() * c.height,
        r: Math.random() * 2.2 + 0.4,
        vy: -(Math.random() * 0.9 + 0.25),
        vx: (Math.random() - 0.5) * 0.4,
        life: Math.random(),
        flick: Math.random() * Math.PI * 2,
        hot: Math.random() > 0.6,
      }
    }

    // Cursed-energy slashes — occasional diagonal lightning
    const slashes = []
    let slashTimer = 0

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Embers
      embers.forEach((p, i) => {
        p.y += p.vy
        p.x += p.vx + Math.sin(p.flick) * 0.3
        p.flick += 0.05
        if (p.y < -10) embers[i] = spawnEmber(canvas)
        const op = (0.4 + 0.6 * Math.abs(Math.sin(p.flick))) * 0.8
        const col = p.hot ? `255,106,61` : `255,45,45`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${col},${op})`
        ctx.shadowBlur = 8
        ctx.shadowColor = `rgba(${col},0.6)`
        ctx.fill()
      })
      ctx.shadowBlur = 0

      // Spawn slashes
      slashTimer--
      if (slashTimer <= 0) {
        slashTimer = 80 + Math.random() * 120
        const x = Math.random() * canvas.width
        const len = canvas.height * (0.5 + Math.random() * 0.5)
        slashes.push({ x, y: -50, len, life: 1, drift: (Math.random() - 0.5) * 40 })
      }
      // Draw + fade slashes
      for (let i = slashes.length - 1; i >= 0; i--) {
        const sl = slashes[i]
        sl.life -= 0.04
        if (sl.life <= 0) { slashes.splice(i, 1); continue }
        const grad = ctx.createLinearGradient(sl.x, sl.y, sl.x + sl.drift, sl.y + sl.len)
        grad.addColorStop(0, `rgba(255,45,45,0)`)
        grad.addColorStop(0.5, `rgba(255,80,60,${sl.life * 0.5})`)
        grad.addColorStop(1, `rgba(255,45,45,0)`)
        ctx.beginPath()
        ctx.moveTo(sl.x, sl.y)
        ctx.lineTo(sl.x + sl.drift, sl.y + sl.len)
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.5
        ctx.stroke()
      }

      animRef.current = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener("resize", resize)
    }
  }, [visible])

  if (!expanded) return null

  const bracket = (corner) => {
    const pos = {
      tl: { top: 18, left: 18, borderWidth: "2px 0 0 2px" },
      tr: { top: 18, right: 18, borderWidth: "2px 2px 0 0" },
      bl: { bottom: 30, left: 18, borderWidth: "0 0 2px 2px" },
      br: { bottom: 30, right: 18, borderWidth: "0 2px 2px 0" },
    }[corner]
    return (
      <div style={{
        position: "fixed", width: 26, height: 26,
        borderStyle: "solid", borderColor: "rgba(255,45,45,0.55)",
        zIndex: 9996, pointerEvents: "none",
        boxShadow: "0 0 12px rgba(255,45,45,0.4)",
        animation: "de-bracket-in 0.5s cubic-bezier(0.2,0.8,0.3,1) both",
        ...pos,
      }} />
    )
  }

  return (
    <>
      {/* Void base */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 90% 70% at 50% 30%, #16020A 0%, #0A0103 45%, #050001 100%)",
      }} />

      {/* Cursed grid — perspective floor */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: [
          "linear-gradient(rgba(255,45,45,0.06) 1px, transparent 1px)",
          "linear-gradient(90deg, rgba(255,45,45,0.06) 1px, transparent 1px)",
        ].join(","),
        backgroundSize: "46px 46px",
        maskImage: "radial-gradient(ellipse 80% 80% at 50% 40%, #000 30%, transparent 75%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 40%, #000 30%, transparent 75%)",
        animation: "de-grid-drift 24s linear infinite",
        opacity: visible ? 1 : 0, transition: "opacity 0.6s ease",
      }} />

      {/* Crimson bloom pulse */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: [
          "radial-gradient(circle 50% at 50% 25%, rgba(255,45,45,0.13) 0%, transparent 55%)",
          "radial-gradient(circle 30% at 80% 80%, rgba(200,20,20,0.1) 0%, transparent 50%)",
          "radial-gradient(circle 28% at 18% 75%, rgba(255,80,40,0.08) 0%, transparent 50%)",
        ].join(","),
        animation: "de-bloom 5s ease-in-out infinite",
      }} />

      {/* Embers + slashes */}
      <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />

      {/* CRT scanlines */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: "repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0px, rgba(0,0,0,0.18) 1px, transparent 2px, transparent 3px)",
        opacity: 0.5, mixBlendMode: "multiply",
      }} />

      {/* Sweeping scan line */}
      <div style={{
        position: "fixed", left: 0, right: 0, height: "2px", zIndex: 0, pointerEvents: "none",
        background: "linear-gradient(90deg, transparent, rgba(255,45,45,0.15) 20%, rgba(255,120,90,0.5) 50%, rgba(255,45,45,0.15) 80%, transparent)",
        animation: "de-scan 6s linear infinite",
        boxShadow: "0 0 14px rgba(255,60,40,0.4)",
      }} />

      {/* Edge vignette */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 75% 75% at 50% 50%, transparent 35%, rgba(5,0,1,0.85) 100%)",
      }} />

      {/* Viewport HUD frame */}
      {bracket("tl")}{bracket("tr")}{bracket("bl")}{bracket("br")}
      <div style={{
        position: "fixed", inset: "14px 14px 26px 14px", zIndex: 9995, pointerEvents: "none",
        border: "1px solid rgba(255,45,45,0.1)",
        animation: "de-frame-in 0.6s ease both",
      }} />
      {/* Top HUD readout */}
      <div className="mono" style={{
        position: "fixed", top: 24, left: 54, zIndex: 9996, pointerEvents: "none",
        fontSize: "0.6rem", letterSpacing: "0.25em", color: "rgba(255,80,70,0.65)",
        textTransform: "uppercase", textShadow: "0 0 8px rgba(255,45,45,0.5)",
        animation: "de-readout 0.8s ease both",
      }}>
        ⟁ DOMAIN · EXPANDED
      </div>
      <div className="mono" style={{
        position: "fixed", top: 24, right: 54, zIndex: 9996, pointerEvents: "none",
        fontSize: "0.6rem", letterSpacing: "0.25em", color: "rgba(255,80,70,0.45)",
        textTransform: "uppercase",
        animation: "de-readout 0.8s 0.1s ease both",
      }}>
        SURE-HIT ·<span style={{ animation: "de-pip-blink 1s step-end infinite" }}> ●</span>
      </div>

      <style>{`
        @keyframes de-grid-drift {
          0%   { background-position: 0 0; }
          100% { background-position: 46px 46px; }
        }
        @keyframes de-bloom {
          0%,100% { opacity: 0.65; transform: scale(1); }
          50%      { opacity: 1;    transform: scale(1.05); }
        }
        @keyframes de-scan {
          0%   { top: -2px;   opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { top: 100vh; opacity: 0; }
        }
        @keyframes de-bracket-in {
          0%   { opacity: 0; transform: scale(0.4); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes de-frame-in {
          0%   { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes de-readout {
          0%   { opacity: 0; transform: translateY(-6px); letter-spacing: 0.5em; }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes de-pip-blink {
          0%,100% { opacity: 1; } 50% { opacity: 0; }
        }
      `}</style>
    </>
  )
}
