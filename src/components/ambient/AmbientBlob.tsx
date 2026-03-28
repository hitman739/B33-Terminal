import { motion, useReducedMotion } from 'framer-motion'

interface AmbientBlobProps {
  size?: number
  top?: string
  left?: string
  right?: string
  bottom?: string
  opacity?: number
  duration?: number
  driftX?: number
  driftY?: number
  zIndex?: number
}

export default function AmbientBlob({
  size = 500,
  top,
  left,
  right,
  bottom,
  opacity = 0.06,
  duration = 6,
  driftX = 30,
  driftY = 30,
  zIndex = 0,
}: AmbientBlobProps) {
  const prefersReduced = useReducedMotion()

  const baseStyle: React.CSSProperties = {
    position: 'absolute',
    width: size,
    height: size,
    top,
    left,
    right,
    bottom,
    borderRadius: '50%',
    background: `radial-gradient(circle, rgba(255,193,7,${opacity}) 0%, rgba(255,193,7,${opacity * 0.3}) 50%, transparent 70%)`,
    mixBlendMode: 'screen',
    pointerEvents: 'none',
    willChange: 'transform, opacity',
    filter: `blur(${Math.round(size / 5)}px)`,
    zIndex,
  }

  if (prefersReduced) {
    return <div style={{ ...baseStyle, opacity: 0.7 }} />
  }

  return (
    <motion.div
      style={baseStyle}
      animate={{
        scale: [1, 1.08, 1, 1.04, 1],
        opacity: [0.6, 1, 0.7, 1, 0.6],
        x: [0, driftX, 0, -driftX * 0.5, 0],
        y: [0, -driftY * 0.5, driftY, 0, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}
