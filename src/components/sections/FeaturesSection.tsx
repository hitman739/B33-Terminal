import { motion, useReducedMotion } from 'framer-motion'
import SectionGlow from '../ambient/SectionGlow'

// ── Data ─────────────────────────────────────────────────────────────────────

const features = [
  { title: 'Anti-Sniper Positioning',   desc: 'Secure priority entry. Beat competing wallets.'    },
  { title: 'Automated Profit Taking',   desc: 'Capture profits automatically. No hesitation.'     },
  { title: 'Multi-Launchpad Support',   desc: '10+ launchpads. One interface.'                    },
  { title: 'Bundler & Sniper',          desc: 'Bundle buys. Execute instantly.'                   },
  { title: 'Built-in Mixer',            desc: 'Disperse funds across wallets.'                    },
  { title: 'Vamping',                   desc: 'Clone tokens. Relaunch instantly.'                 },
]

// ── Shared noise overlay (subtle texture on cards) ────────────────────────────

const noiseStyle: React.CSSProperties = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'repeat',
  backgroundSize: '120px 120px',
}

// ── Main feature card ─────────────────────────────────────────────────────────

function MainCard({ title, desc, delay, reduced }: { title: string; desc: string; delay: number; reduced: boolean }) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: '-80px' }}
      whileHover={reduced ? undefined : { scale: 1.02 }}
      className="relative rounded-2xl p-8 flex flex-col justify-between overflow-hidden cursor-default"
      style={{
        background: 'linear-gradient(135deg, rgba(212,255,0,0.04) 0%, rgba(255,255,255,0.015) 60%, rgba(212,255,0,0.02) 100%)',
        border: '1px solid rgba(212,255,0,0.18)',
        boxShadow: '0 0 40px rgba(212,255,0,0.06), inset 0 1px 1px rgba(255,255,255,0.07)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
        ...noiseStyle,
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.boxShadow = '0 0 60px rgba(212,255,0,0.14), inset 0 1px 1px rgba(255,255,255,0.09)'
        el.style.borderColor = 'rgba(212,255,0,0.32)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.boxShadow = '0 0 40px rgba(212,255,0,0.06), inset 0 1px 1px rgba(255,255,255,0.07)'
        el.style.borderColor = 'rgba(212,255,0,0.18)'
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-8 right-8 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(212,255,0,0.5), transparent)' }}
      />

      <div className="flex flex-col gap-4">
        <span
          className="text-xs font-mono tracking-[0.2em] uppercase"
          style={{ color: 'rgba(212,255,0,0.6)' }}
        >
          Core
        </span>
        <h3
          className="font-semibold leading-tight tracking-tight text-foreground"
          style={{ fontSize: 'clamp(1.25rem, 2vw, 1.6rem)' }}
        >
          {title}
        </h3>
        <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
          {desc}
        </p>
      </div>

      {/* Bottom glow dot */}
      <div
        className="absolute bottom-6 right-6 w-2 h-2 rounded-full"
        style={{ background: 'rgba(212,255,0,0.5)', boxShadow: '0 0 8px rgba(212,255,0,0.7)' }}
      />
    </motion.div>
  )
}


// ── Section ───────────────────────────────────────────────────────────────────

export default function FeaturesSection() {
  const reduced = useReducedMotion() ?? false

  return (
    <section
      id="features"
      className="relative section-scroll py-24 sm:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <SectionGlow left="30%" top="50%" size={700} opacity={0.05} duration={7} />
      <SectionGlow left="70%" top="40%" size={500} opacity={0.04} duration={9} />

      {/* Label */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: '-100px' }}
        className="flex items-center gap-2 mb-4"
      >
        <span className="text-primary font-mono text-xs tracking-widest uppercase">— CAPABILITIES</span>
      </motion.div>

      {/* Heading */}
      <motion.h2
        initial={reduced ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: '-100px' }}
        className="font-semibold leading-tight tracking-tight mb-14"
        style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
      >
        <span className="text-foreground block">EVERYTHING YOU NEED</span>
        <span className="gradient-text block">AT LAUNCH.</span>
      </motion.h2>

      {/* 3×2 grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((f, i) => (
          <MainCard key={f.title} title={f.title} desc={f.desc} delay={0.1 + i * 0.08} reduced={reduced} />
        ))}
      </div>
    </section>
  )
}
