import { motion, useReducedMotion } from 'framer-motion'
import { Button } from '../ui/Button'
import AmbientBlob from '../ambient/AmbientBlob'
import SectionGlow from '../ambient/SectionGlow'

export default function CTASection() {
  const prefersReduced = useReducedMotion()

  return (
    <section className="relative overflow-hidden py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      {/* Ambient background layers */}
      <AmbientBlob size={500} top="10%" left="0%" opacity={0.06} duration={8} driftX={40} driftY={30} />
      <AmbientBlob size={400} bottom="10%" right="0%" opacity={0.05} duration={7} driftX={-35} driftY={-25} />
      <SectionGlow left="50%" top="50%" size={700} opacity={0.1} duration={5} />

      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: '-100px' }}
        className="liquid-glass rounded-[2rem] p-12 sm:p-20 max-w-4xl mx-auto text-center flex flex-col items-center gap-8"
        style={{ position: 'relative', zIndex: 10 }}
      >
        <h2
          className="gradient-text font-bold leading-tight tracking-tight"
          style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
        >
          READY TO STING FIRST?
        </h2>
        <p className="text-muted-foreground text-lg max-w-md leading-relaxed">
          Over 1200 deployers already launched with B33. No subscriptions. No set up fees.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Button variant="hero" className="animate-glow-pulse">Launch App</Button>
          <Button variant="secondary">Join Telegram</Button>
        </div>
      </motion.div>
    </section>
  )
}
