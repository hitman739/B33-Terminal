import { motion, useReducedMotion } from 'framer-motion'
import AmbientBlob from '../ambient/AmbientBlob'

// ── Data ─────────────────────────────────────────────────────────────────────

const steps = [
  {
    number: '01',
    title: 'Fund & Split',
    desc: 'Distribute capital across multiple wallets instantly.',
    note: null,
  },
  {
    number: '02',
    title: 'Configure Execution',
    desc: 'Define entries, timing and strategy across wallets.',
    note: null,
  },
  {
    number: '03',
    title: 'Deploy & Capture',
    desc: 'Execute at launch and secure profits automatically.',
    note: 'All wallets execute in sync. No delay.',
  },
]

const stepDotPositions = ['0%', '50%', '100%']

// ── Section ───────────────────────────────────────────────────────────────────

export default function HowItWorksSection() {
  const prefersReduced = useReducedMotion()

  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden section-scroll py-24 sm:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <AmbientBlob size={600} bottom="0%" left="0%" opacity={0.05} duration={10} driftX={40} driftY={-30} />

      {/* Label */}
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: '-100px' }}
        className="flex items-center gap-2 mb-4"
      >
        <span className="text-primary font-mono text-xs tracking-widest uppercase">—</span>
        <span className="text-primary font-mono text-xs tracking-widest uppercase">PROTOCOL</span>
      </motion.div>

      {/* Heading */}
      <motion.h2
        initial={prefersReduced ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: '-100px' }}
        className="font-semibold leading-tight tracking-tight mb-20"
        style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
      >
        <span className="text-foreground block">EXECUTE IN</span>
        <span className="gradient-text block">3 STEPS.</span>
      </motion.h2>

      {/* Steps */}
      <div className="relative">
        {/* Connecting line — desktop only */}
        <div className="hidden lg:block absolute top-[4.5rem] left-[16.6%] right-[16.6%] h-px" style={{ background: 'rgba(212,255,0,0.12)' }}>
          {/* Traveling glow dot */}
          {!prefersReduced && (
            <motion.div
              className="absolute top-0 h-full w-4 rounded-full"
              style={{ background: 'rgba(212,255,0,0.7)', boxShadow: '0 0 8px rgba(212,255,0,0.5)' }}
              animate={{ left: ['0%', '100%', '0%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
          )}

          {/* Step indicator dots */}
          {stepDotPositions.map((pos, i) => (
            <motion.div
              key={i}
              animate={prefersReduced ? undefined : {
                scale: [1, 1.3, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={prefersReduced ? undefined : {
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut' as const,
                delay: i * 0.6,
              }}
              style={{
                position: 'absolute',
                top: '50%',
                left: pos,
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'rgba(212,255,0,0.9)',
                boxShadow: '0 0 6px rgba(212,255,0,0.6)',
                transform: 'translate(-50%, -50%)',
                willChange: 'transform, opacity',
              }}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={prefersReduced ? false : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: '-100px' }}
              className="flex flex-col gap-4"
            >
              {/* Large gradient number */}
              <div
                className="gradient-text font-bold leading-none"
                style={{ fontSize: 'clamp(80px, 12vw, 140px)' }}
              >
                {step.number}
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-foreground font-semibold text-2xl">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">{step.desc}</p>
                {step.note && (
                  <p className="font-mono text-xs tracking-widest uppercase mt-1" style={{ color: 'rgba(212,255,0,0.6)' }}>
                    {step.note}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: '-100px' }}
        className="mt-16"
      >
        <a
          href="#"
          className="font-mono text-primary tracking-[0.1em] text-sm hover:underline transition-all duration-200"
        >
          START YOUR FIRST BUNDLE →
        </a>
      </motion.div>
    </section>
  )
}
