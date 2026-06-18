import { useEffect, useRef } from "react"
import { useDomainExpansion } from "../context/DomainExpansionContext"

export default function DomainExpansionBg() {
  const { expanded } = useDomainExpansion()
  const canvasRef = useRef(null)
  const animRef = useRef(null)

  useEffect(() => {
    if (!expanded) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.8 + 0.4,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      opacity: Math.random() * 0.5 + 0.15,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 210, 255, ${p.opacity})`
        ctx.fill()
      })
      animRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener("resize", resize)
    }
  }, [expanded])

  if (!expanded) return null

  return (
    <>
      {/* Deep ocean gradient */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: "linear-gradient(160deg, #020C18 0%, #041525 35%, #061D2E 65%, #092540 100%)",
      }} />
      {/* Radial depth glow */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: `
          radial-gradient(ellipse 70% 50% at 15% 85%, rgba(0,120,160,0.18) 0%, transparent 55%),
          radial-gradient(ellipse 50% 40% at 85% 15%, rgba(0,160,200,0.12) 0%, transparent 50%),
          radial-gradient(ellipse 60% 30% at 50% 50%, rgba(0,80,130,0.08) 0%, transparent 60%)
        `,
        animation: "de-breathe 9s ease-in-out infinite",
      }} />
      {/* Floating particles */}
      <canvas ref={canvasRef} style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.75,
      }} />
    </>
  )
}
