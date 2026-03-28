import { motion, useReducedMotion } from 'framer-motion'
import { Button } from '../ui/Button'
import AnimatedRibbon from '../ambient/AnimatedRibbon'
import SectionGlow from '../ambient/SectionGlow'

const priceBlocks = [
  {
    label: 'NO SUBSCRIPTIONS',
    desc: 'Zero monthly fees. You only pay when you execute.',
  },
  {
    label: 'NO HIDDEN FEES',
    desc: '0.5% per transaction. No tiers, no surprises.',
  },
  {
    label: 'ALIGNED INCENTIVES',
    desc: 'We profit when you profit.',
  },
]

export default function PricingSection() {
  const prefersReduced = useReducedMotion()

  return (
    <section
      id="pricing"
      className="relative overflow-hidden section-scroll py-24 sm:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      {/* Ambient background layers */}
      <AnimatedRibbon top="50%" direction="ltr" opacity={0.07} speed={25} blur={2} />
      <SectionGlow left="25%" top="40%" size={600} opacity={0.08} duration={5} />

      {/* Label */}
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: '-100px' }}
        className="flex items-center gap-2 mb-12"
      >
        <span className="text-primary font-mono text-xs tracking-widest uppercase">—</span>
        <span className="text-primary font-mono text-xs tracking-widest uppercase">PRICING</span>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-12">
        {/* Left — big percentage */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-100px' }}
          className="flex flex-col gap-2"
        >
          <span
            className="gradient-text font-bold leading-none"
            style={{
              fontSize: 'clamp(120px, 18vw, 200px)',
              filter: 'drop-shadow(0 0 60px rgba(212,255,0,0.3))',
            }}
          >
            0.5%
          </span>
          <p className="text-foreground text-2xl font-semibold tracking-wide">PER TRANSACTION.</p>
          <p className="text-muted-foreground text-xl">NOTHING ELSE.</p>
        </motion.div>

        {/* Right — blocks */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-100px' }}
          className="flex flex-col"
        >
          {priceBlocks.map((block, i) => (
            <div
              key={i}
              className="border-b py-6 flex flex-col gap-1"
              style={{ borderColor: 'rgba(212,255,0,0.08)' }}
            >
              <span className="text-foreground font-semibold tracking-wide text-sm">{block.label}</span>
              <span className="text-muted-foreground">{block.desc}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Banner */}
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: '-100px' }}
        className="liquid-glass rounded-2xl px-8 py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6"
        style={{ borderLeft: '3px solid hsl(var(--primary))' }}
      >
        <div className="flex flex-col gap-1">
          <span className="text-foreground font-semibold text-lg leading-snug">
            THE MOST HONEST FEE MODEL IN THE SPACE.
          </span>
          <span className="text-muted-foreground text-sm">
            No gatekeeping. No tiers. One flat rate that scales with your success.
          </span>
        </div>
        <Button variant="hero" className="shrink-0">Launch App</Button>
      </motion.div>
    </section>
  )
}
