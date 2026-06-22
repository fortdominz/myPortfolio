import { useEffect, useState } from "react"
import { useFrost } from "../context/FrostContext"

/**
 * FrostBg — the glacial atmosphere behind the portfolio while Frost is engaged.
 *
 * LITE build (canvas-free): the live <canvas> snow was the scroll-lag culprit —
 * a full-viewport canvas that repaints every frame re-uploads its whole texture
 * to the GPU continuously, competing with the scroll for bandwidth. This version
 * has ZERO per-frame work: every layer is a static, GPU-composited surface, and
 * the only motion is transform/opacity CSS animation, which runs on the
 * compositor thread and never touches the scroll's frame budget. Snow is now a
 * tiled CSS dot field that drifts by translateY (seamless, compositor-only).
 *
 * Layers (all position:fixed, zIndex 0, behind the transparent portfolio shell):
 *   • frozen-night base (gradients + vignette + inner glow, folded into one)
 *   • a single drifting aurora wash (blurred)
 *   • ice-crystal lattice grid (masked)
 *   • two depths of drifting CSS snow (far + near)
 *   • frost creeping in from the edges (SVG fractal noise, masked)
 *   • cold ground mist + a slow sweeping scan line
 * Mounts only when frost is on; fades in. Respects prefers-reduced-motion.
 */
export default function FrostBg() {
  const { frost } = useFrost()
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

  if (!frost) return null

  const anim = (v) => (reduce ? "none" : v)

  return (
    <>
      {/* Frozen-night base — also carries the corner vignette + inner glow that
          used to be their own layer. Fewer surfaces for the compositor to blend
          over the scrolling content every frame. */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        boxShadow: "inset 0 0 180px 30px rgba(125,211,252,0.12), inset 0 0 60px rgba(255,255,255,0.06)",
        background: "radial-gradient(120% 120% at 50% 50%, transparent 60%, rgba(3,12,24,0.5) 100%), radial-gradient(90% 70% at 50% -12%, rgba(95,201,248,0.12), transparent 58%), radial-gradient(80% 70% at 50% 60%, rgba(6,24,43,0.55), transparent 88%), linear-gradient(180deg, #051426, #081F38 55%, #0A2746)",
        opacity: visible ? 1 : 0, transition: "opacity 0.6s ease",
      }} />

      {/* Aurora wash — one drifting blurred layer. The drift is a transform
          animation (compositor-only: it transforms a cached texture, it does
          not re-rasterize the blur), so it's free during scroll. */}
      <div style={{
        position: "fixed", top: "-17%", left: "-15%", right: "-18%", height: "56%",
        zIndex: 0, pointerEvents: "none", filter: "blur(28px)",
        background: "radial-gradient(50% 100% at 26% 0%, rgba(125,211,252,0.26), transparent 68%), radial-gradient(46% 100% at 60% 6%, rgba(99,232,196,0.16), transparent 70%), radial-gradient(48% 100% at 72% 2%, rgba(169,236,246,0.18), transparent 70%), radial-gradient(42% 100% at 40% 10%, rgba(129,140,248,0.12), transparent 72%)",
        animation: anim("fr-aurora 22s ease-in-out infinite"),
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

      {/* Snow — far depth: small, dim, slow. A tiled dot field that drifts via
          translateY. The layer overhangs the viewport top/bottom so the loop is
          seamless; drift distance == tile height, so it repeats invisibly. */}
      <div style={{
        position: "fixed", top: "-180px", left: 0, right: 0, bottom: "-180px",
        zIndex: 0, pointerEvents: "none",
        backgroundImage: [
          "radial-gradient(1.5px 1.5px at 30px 24px, rgba(214,236,250,0.85), transparent)",
          "radial-gradient(1px 1px at 104px 64px, rgba(214,236,250,0.55), transparent)",
          "radial-gradient(1.5px 1.5px at 62px 122px, rgba(214,236,250,0.7), transparent)",
          "radial-gradient(1px 1px at 134px 140px, rgba(214,236,250,0.5), transparent)",
          "radial-gradient(1px 1px at 18px 92px, rgba(214,236,250,0.6), transparent)",
        ].join(","),
        backgroundSize: "160px 160px",
        animation: anim("fr-snow-far 26s linear infinite"),
        opacity: visible ? 0.9 : 0, transition: "opacity 0.8s ease",
      }} />

      {/* Snow — near depth: larger, brighter, faster */}
      <div style={{
        position: "fixed", top: "-240px", left: 0, right: 0, bottom: "-240px",
        zIndex: 0, pointerEvents: "none",
        backgroundImage: [
          "radial-gradient(2.5px 2.5px at 52px 40px, rgba(255,255,255,0.95), transparent)",
          "radial-gradient(2px 2px at 168px 104px, rgba(255,255,255,0.78), transparent)",
          "radial-gradient(2.5px 2.5px at 112px 182px, rgba(255,255,255,0.9), transparent)",
          "radial-gradient(2px 2px at 28px 150px, rgba(255,255,255,0.7), transparent)",
        ].join(","),
        backgroundSize: "220px 220px",
        animation: anim("fr-snow-near 15s linear infinite"),
        opacity: visible ? 0.95 : 0, transition: "opacity 0.8s ease",
      }} />

      {/* Frost creeping in from the edges. No mixBlendMode (a full-screen blend
          re-composites against scrolling content every frame); plain composite +
          translateZ promotes it to a cached static layer. */}
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

      {/* Sweeping scan line */}
      <div style={{
        position: "fixed", left: 0, right: 0, height: "180px", zIndex: 0, pointerEvents: "none",
        background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.05) 45%, rgba(169,236,246,0.09) 50%, transparent)",
        animation: anim("fr-scan 10s linear infinite"),
        opacity: visible ? 1 : 0, transition: "opacity 0.6s ease",
      }} />

      <style>{`
        @keyframes fr-aurora    { 0%,100% { transform: translate(0,0) scaleX(1); opacity: .55; } 50% { transform: translate(36px,8px) scaleX(1.14); opacity: .85; } }
        @keyframes fr-drift     { 0%,100% { transform: translate(0,0); } 50% { transform: translate(26px,-20px); } }
        @keyframes fr-snow-far  { from { transform: translate3d(0,0,0); } to { transform: translate3d(0,160px,0); } }
        @keyframes fr-snow-near { from { transform: translate3d(0,0,0); } to { transform: translate3d(0,220px,0); } }
        @keyframes fr-mist      { 0%,100% { transform: translateX(0); opacity: .45; } 50% { transform: translateX(34px); opacity: .78; } }
        @keyframes fr-scan      { 0% { top: -180px; } 100% { top: 100vh; } }
      `}</style>
    </>
  )
}
