import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

interface AnimatedRibbonProps {
  top?: string
  direction?: 'ltr' | 'rtl'
  opacity?: number
  speed?: number   // seconds for one full horizontal cycle
  blur?: number    // px blur applied via CSS filter
  zIndex?: number
}

export default function AnimatedRibbon({
  top = '50%',
  direction = 'ltr',
  opacity = 0.04,
  speed = 20,
  blur = 0,
  zIndex = 0,
}: AnimatedRibbonProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let rafId: number
    let phase = 0

    const AMPLITUDE = 18
    const FREQUENCY = 2.5
    const BAND = 6

    function resize() {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    function draw(ph: number) {
      if (!canvas || !ctx) return
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)

      ctx.beginPath()
      // Top edge of ribbon (left to right)
      for (let x = 0; x <= w; x++) {
        const y = h / 2 + AMPLITUDE * Math.sin((x / w) * FREQUENCY * Math.PI * 2 + ph)
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      // Bottom edge of ribbon (right to left)
      for (let x = w; x >= 0; x--) {
        const y = h / 2 + AMPLITUDE * Math.sin((x / w) * FREQUENCY * Math.PI * 2 + ph) + BAND
        ctx.lineTo(x, y)
      }
      ctx.closePath()

      // Fade the ribbon at the horizontal edges
      const grad = ctx.createLinearGradient(0, 0, w, 0)
      grad.addColorStop(0, `rgba(255,193,7,0)`)
      grad.addColorStop(0.08, `rgba(255,193,7,${opacity})`)
      grad.addColorStop(0.92, `rgba(255,193,7,${opacity})`)
      grad.addColorStop(1, `rgba(255,193,7,0)`)
      ctx.fillStyle = grad
      ctx.fill()
    }

    const phaseStep = (2 * Math.PI) / (speed * 60)
    const sign = direction === 'ltr' ? 1 : -1

    function loop() {
      phase += phaseStep * sign
      draw(phase)
      rafId = requestAnimationFrame(loop)
    }

    resize()

    if (prefersReduced) {
      draw(0)
    } else {
      rafId = requestAnimationFrame(loop)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
    }
  }, [direction, opacity, speed, prefersReduced])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top,
        left: 0,
        right: 0,
        width: '100%',
        height: 60,
        pointerEvents: 'none',
        mixBlendMode: 'screen',
        willChange: 'transform',
        filter: blur > 0 ? `blur(${blur}px)` : undefined,
        zIndex,
        transform: 'translateY(-50%)',
      }}
    />
  )
}
