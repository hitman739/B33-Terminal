import { motion, useReducedMotion } from 'framer-motion'

interface SectionGlowProps {
  left?: string
  top?: string
  right?: string
  bottom?: string
  size?: number
  opacity?: number
  duration?: number
  zIndex?: number
}

export default function SectionGlow({
  left = '50%',
  top = '50%',
  size = 700,
  opacity = 0.06,
  duration = 6,
  zIndex = 0,
}: SectionGlowProps) {
  const prefersReduced = useReducedMotion()

  const baseStyle: React.CSSProperties = {
    position: 'absolute',
    width: size,
    height: size,
    top,
    left,
    transform: 'translate(-50%, -50%)',
    borderRadius: '50%',
    background: `radial-gradient(circle, rgba(255,193,7,${opacity}) 0%, rgba(255,193,7,${opacity * 0.4}) 40%, transparent 70%)`,
    mixBlendMode: 'screen',
    pointerEvents: 'none',
    willChange: 'opacity',
    filter: `blur(${Math.round(size / 8)}px)`,
    zIndex,
  }

  if (prefersReduced) {
    return <div style={baseStyle} />
  }

  return (
    <motion.div
      style={baseStyle}
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}
