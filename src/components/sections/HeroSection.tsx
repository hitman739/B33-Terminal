import { motion, useReducedMotion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Button } from '../ui/Button'
import HeroBee from '../ambient/HeroBee'

// ── Live stats ────────────────────────────────────────────────────────────────

const START_MS = new Date('2026-03-26T00:00:00Z').getTime()

const STAT_DEFS = [
  {
    label: 'Bundles Executed',
    start: 2750,
    dailyIncrease: 235,
    // changes visibly every ~6 min (1 bundle per 367 s)
    format: (v: number) => `${Math.floor(v).toLocaleString()}+`,
  },
  {
    label: 'Volume Processed',
    start: 5_000_000,
    dailyIncrease: 1_000_000,
    // toFixed(2) → changes visibly every ~86 s ($10K per tick at $57.87/5s)
    format: (v: number) => `$${(v / 1_000_000).toFixed(2)}M+`,
  },
  {
    label: 'Active Deployers',
    start: 87,
    dailyIncrease: 10,
    // changes visibly every ~2.4 h (1 deployer per 8,640 s)
    format: (v: number) => `${Math.floor(v)}+`,
  },
]

function computeStats() {
  const elapsedDays = (Date.now() - START_MS) / 86_400_000
  return STAT_DEFS.map(({ start, dailyIncrease, format, label }) => ({
    label,
    value: format(start + elapsedDays * dailyIncrease),
  }))
}

// Force re-render every 5 s via a tick counter; derive stats fresh on each render
function useLiveStats() {
  const [, forceUpdate] = useState(0)
  useEffect(() => {
    const id = setInterval(() => forceUpdate(n => n + 1), 5000)
    return () => clearInterval(id)
  }, [])
  return computeStats()
}

export default function HeroSection() {
  const prefersReduced = useReducedMotion()
  const stats = useLiveStats()

  const fadeUp = prefersReduced
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
      }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 -mt-20"
    >
      {/* Bioluminescent bee — full-viewport background */}
      <HeroBee />

      {/* WebGL fallback background — visible only when Three.js fails */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, #1a0e00 0%, #050505 100%)',
          zIndex: 0,
        }}
      />

      {/* Radial vignette — darkens edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 25%, rgba(5,5,5,0.88) 100%)',
          zIndex: 3,
        }}
      />

      {/* Text backdrop — dims the bee directly behind the hero copy so yellow-on-yellow doesn't merge */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 52% 62% at 50% 42%, rgba(5,5,5,0.38) 0%, transparent 100%)',
          zIndex: 4,
        }}
      />

      {/* Bottom dissolve — difumina la transición hacia la siguiente sección */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '18%',
          background: 'linear-gradient(to bottom, transparent 0%, hsl(60 10% 3%) 100%)',
          zIndex: 5,
        }}
      />

      {/* Content */}
      <div
        className="relative flex flex-col items-center text-center gap-8 max-w-3xl mx-auto"
        style={{ zIndex: 10 }}
      >
        {/* Badge */}
        <motion.div
          {...fadeUp}
          transition={prefersReduced ? undefined : { duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="liquid-glass rounded-full px-4 py-1.5 inline-flex items-center gap-2 text-sm text-muted-foreground">
            <span className="text-primary animate-dot-pulse">●</span>
            Now Live on Solana
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          {...fadeUp}
          transition={prefersReduced ? undefined : { duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-semibold leading-[1.05] tracking-tight text-hero-heading"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
        >
          <span className="block">ONE CLICK</span>
          <span className="block gradient-text">FROM LAUNCH TO EXIT.</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          {...fadeUp}
          transition={prefersReduced ? undefined : { duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-foreground text-xl max-w-lg leading-relaxed font-medium"
        >
          Launch, secure your position, and take profits — all handled automatically.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp}
          transition={prefersReduced ? undefined : { duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <Button variant="hero" className="animate-glow-pulse">Get Started</Button>
          <Button variant="secondary">Join Telegram</Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          {...fadeUp}
          transition={prefersReduced ? undefined : { duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-3 gap-0 w-full max-w-xl mt-4"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`flex flex-col items-center gap-1 py-4 ${i > 0 ? 'border-l' : ''}`}
              style={i > 0 ? { borderColor: 'rgba(212,255,0,0.2)' } : {}}
            >
              <span className="gradient-text font-bold text-2xl sm:text-3xl">{stat.value}</span>
              <span className="text-muted-foreground text-xs sm:text-sm text-center">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
