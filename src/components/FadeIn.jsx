import { useEffect, useRef, useState } from "react"

const DIRECTIONS = {
  up:    { x: 0,    y: 28  },
  down:  { x: 0,    y: -28 },
  left:  { x: -28,  y: 0   },
  right: { x: 28,   y: 0   },
  fade:  { x: 0,    y: 0   },
}

export default function FadeIn({ children, delay = 0, ready = true, direction = "up" }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!ready) return

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.05 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ready])

  const { x, y } = DIRECTIONS[direction] ?? DIRECTIONS.up

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView
          ? "translate(0, 0) scale(1)"
          : `translate(${x}px, ${y}px) scale(0.985)`,
        transition: `opacity 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms,
                     transform 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}
