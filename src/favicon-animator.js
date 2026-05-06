// Animated canvas favicon — Dom cartoon character (personal mini-me)
// Dirty white + gold bg, brown skin, human proportions, full animation

function rr(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

export function startFaviconAnimation() {
  const canvas = document.createElement('canvas')
  canvas.width = 64
  canvas.height = 64
  const ctx = canvas.getContext('2d')

  let link = document.querySelector("link[rel~='icon']")
  if (!link) {
    link = document.createElement('link')
    link.rel = 'icon'
    document.head.appendChild(link)
  }
  link.type = 'image/png'

  const start = performance.now()

  // Color palette
  const SKIN      = '#B07040'   // warm brown skin
  const SKIN_DARK = '#8C5830'   // shadow / darker skin areas
  const HAIR      = '#120A00'   // near-black dark brown hair
  const SHIRT     = '#1D3A5F'   // navy shirt
  const SHIRT_ACC = '#2E5A8A'   // shirt collar accent
  const BG_FROM   = '#F2E8C8'   // dirty white base
  const BG_TO     = '#E8D898'   // warm gold tint

  function frame(ts) {
    const t = (ts - start) / 1000

    // Float — 2.8s sine, ±2.2px
    const floatSin = Math.sin(t * 2 * Math.PI / 2.8)
    const floatY   = -floatSin * 2.2
    // Squash & stretch
    const sx = 1 + floatSin * 0.018
    const sy = 1 - floatSin * 0.018

    // Blink — every 4s, smooth sine envelope in last 14%
    const blinkPhase = (t % 4) / 4
    const eyeClose = blinkPhase > 0.86
      ? Math.sin(((blinkPhase - 0.86) / 0.14) * Math.PI)
      : 0

    // Wave — left arm, 1.7s cycle, ±28°
    const waveAngle = Math.sin(t * 2 * Math.PI / 1.7) * 28 * Math.PI / 180

    // ── DRAW ────────────────────────────────────────────
    ctx.clearRect(0, 0, 64, 64)

    // Rounded square clip
    rr(ctx, 0, 0, 64, 64, 13)
    ctx.save()
    ctx.clip()

    // Background — dirty white to warm gold gradient
    const grad = ctx.createLinearGradient(0, 0, 64, 64)
    grad.addColorStop(0, BG_FROM)
    grad.addColorStop(1, BG_TO)
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 64, 64)

    // ── CHARACTER GROUP (float + squash/stretch) ─────────
    ctx.save()
    ctx.translate(0, floatY)
    ctx.translate(32, 36)
    ctx.scale(sx, sy)
    ctx.translate(-32, -36)

    // ── BODY ─────────────────────────────────────────────

    // Shirt body
    rr(ctx, 19, 42, 26, 14, 6)
    ctx.fillStyle = SHIRT
    ctx.fill()

    // Collar V
    ctx.beginPath()
    ctx.moveTo(26, 42)
    ctx.lineTo(32, 48)
    ctx.lineTo(38, 42)
    ctx.strokeStyle = SHIRT_ACC
    ctx.lineWidth = 1.8
    ctx.lineJoin = 'round'
    ctx.stroke()

    // Neck
    ctx.beginPath()
    ctx.ellipse(32, 40, 4, 3.5, 0, 0, Math.PI * 2)
    ctx.fillStyle = SKIN
    ctx.fill()

    // Left arm — waves
    ctx.save()
    ctx.translate(19, 45)
    ctx.rotate(-waveAngle)
    // upper arm
    rr(ctx, -15, -4, 15, 8, 4)
    ctx.fillStyle = SKIN
    ctx.fill()
    // hand
    ctx.beginPath()
    ctx.ellipse(-16, 0, 4.5, 4, 0, 0, Math.PI * 2)
    ctx.fillStyle = SKIN
    ctx.fill()
    ctx.restore()

    // Right arm — subtle counter-wave
    ctx.save()
    ctx.translate(45, 45)
    ctx.rotate(waveAngle * 0.25)
    rr(ctx, 0, -4, 15, 8, 4)
    ctx.fillStyle = SKIN
    ctx.fill()
    ctx.beginPath()
    ctx.ellipse(16, 0, 4.5, 4, 0, 0, Math.PI * 2)
    ctx.fillStyle = SKIN
    ctx.fill()
    ctx.restore()

    // ── HEAD ─────────────────────────────────────────────

    // Ears (behind head, drawn first)
    ;[[18, 26], [46, 26]].forEach(([ex, ey]) => {
      ctx.beginPath()
      ctx.ellipse(ex, ey, 3.5, 4.5, 0, 0, Math.PI * 2)
      ctx.fillStyle = SKIN
      ctx.fill()
      // inner ear
      ctx.beginPath()
      ctx.ellipse(ex, ey, 2, 3, 0, 0, Math.PI * 2)
      ctx.fillStyle = SKIN_DARK
      ctx.fill()
    })

    // Head — slightly oval (human-ish)
    ctx.beginPath()
    ctx.ellipse(32, 26, 14.5, 16, 0, 0, Math.PI * 2)
    ctx.fillStyle = SKIN
    ctx.fill()

    // ── HAIR ─────────────────────────────────────────────
    // Natural close-cropped hair: clipped cap + rounded top

    ctx.save()
    ctx.beginPath()
    ctx.ellipse(32, 26, 14.7, 16.2, 0, 0, Math.PI * 2)
    ctx.clip()
    // fill top portion as hair
    ctx.fillStyle = HAIR
    ctx.fillRect(17, 10, 30, 14)
    ctx.restore()

    // Rounded hair top (slightly wider than head = natural volume)
    ctx.beginPath()
    ctx.ellipse(32, 14, 12, 7, 0, Math.PI, 0)
    ctx.fillStyle = HAIR
    ctx.fill()

    // Subtle hairline fade edge
    ctx.save()
    ctx.beginPath()
    ctx.ellipse(32, 26, 14.5, 16, 0, 0, Math.PI * 2)
    ctx.clip()
    const hairFade = ctx.createLinearGradient(32, 22, 32, 28)
    hairFade.addColorStop(0, HAIR)
    hairFade.addColorStop(1, 'rgba(18,10,0,0)')
    ctx.fillStyle = hairFade
    ctx.fillRect(17, 22, 30, 6)
    ctx.restore()

    // ── FACE ─────────────────────────────────────────────

    // Eyebrows — thicker, more human
    ctx.strokeStyle = HAIR
    ctx.lineWidth = 2.4
    ctx.lineCap = 'round'
    ctx.beginPath()
    ctx.moveTo(20, 19)
    ctx.quadraticCurveTo(25, 16.5, 29.5, 18.5)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(34.5, 18.5)
    ctx.quadraticCurveTo(39, 16.5, 44, 19)
    ctx.stroke()

    // Eyes
    ;[[25, 24], [39, 24]].forEach(([ex, ey]) => {
      ctx.save()
      ctx.translate(ex, ey)
      ctx.scale(1, 1 - eyeClose * 0.92)
      ctx.translate(-ex, -ey)

      // White sclera
      ctx.beginPath()
      ctx.ellipse(ex, ey, 5, 5.5, 0, 0, Math.PI * 2)
      ctx.fillStyle = 'white'
      ctx.fill()

      // Dark brown iris
      ctx.beginPath()
      ctx.arc(ex + 0.3, ey + 0.5, 3.2, 0, Math.PI * 2)
      ctx.fillStyle = '#2C1400'
      ctx.fill()

      // Pupil center
      ctx.beginPath()
      ctx.arc(ex + 0.3, ey + 0.5, 1.8, 0, Math.PI * 2)
      ctx.fillStyle = '#0A0400'
      ctx.fill()

      // Shine
      ctx.beginPath()
      ctx.arc(ex + 1.8, ey - 1.8, 1.3, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(255,255,255,0.9)'
      ctx.fill()

      // Eyelid line (top)
      ctx.beginPath()
      ctx.ellipse(ex, ey, 5, 5.5, 0, Math.PI, 0)
      ctx.strokeStyle = SKIN_DARK
      ctx.lineWidth = 1.2
      ctx.stroke()

      ctx.restore()
    })

    // Nose — small, human (two subtle dots)
    ctx.fillStyle = SKIN_DARK
    ctx.beginPath()
    ctx.ellipse(30, 31, 1.5, 1, 0.3, 0, Math.PI * 2)
    ctx.fill()
    ctx.beginPath()
    ctx.ellipse(34, 31, 1.5, 1, -0.3, 0, Math.PI * 2)
    ctx.fill()

    // Smile — teeth showing, wide cartoon grin
    // Outer mouth arc
    ctx.beginPath()
    ctx.arc(32, 28, 8, 0.35, Math.PI - 0.35)
    ctx.strokeStyle = SKIN_DARK
    ctx.lineWidth = 1.5
    ctx.stroke()

    // Teeth fill
    ctx.save()
    ctx.beginPath()
    ctx.arc(32, 28, 7.5, 0.45, Math.PI - 0.45)
    ctx.lineTo(32, 36)
    ctx.closePath()
    ctx.fillStyle = '#F8F4EE'
    ctx.fill()
    ctx.restore()

    // Tooth divider line
    ctx.beginPath()
    ctx.moveTo(32, 33.5)
    ctx.lineTo(32, 36)
    ctx.strokeStyle = 'rgba(180,160,140,0.5)'
    ctx.lineWidth = 0.8
    ctx.stroke()

    // Cheek blush — warm brown undertone
    ctx.fillStyle = 'rgba(180, 100, 60, 0.15)'
    ;[[19, 30], [45, 30]].forEach(([x, y]) => {
      ctx.beginPath()
      ctx.ellipse(x, y, 5, 3, 0, 0, Math.PI * 2)
      ctx.fill()
    })

    ctx.restore() // end character
    ctx.restore() // end clip

    link.href = canvas.toDataURL('image/png')
    requestAnimationFrame(frame)
  }

  requestAnimationFrame(frame)
}
