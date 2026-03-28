import pumpLogo    from '../../assets/logo-pump.png'
import bonkLogo    from '../../assets/logo-bonk.png'
import raydiumLogo from '../../assets/logo-raydium.png'
import meteoraLogo from '../../assets/logo-meteora.png'
import bagsLogo    from '../../assets/logo-bags.png'

// ── Data ─────────────────────────────────────────────────────────────────────

const LOGOS = [
  { src: pumpLogo,    name: 'Pump.fun'  },
  { src: bonkLogo,    name: 'Bonk.fun'  },
  { src: raydiumLogo, name: 'Raydium'   },
  { src: meteoraLogo, name: 'Meteora'   },
  { src: bagsLogo,    name: 'Bags'      },
]

// ── Component ────────────────────────────────────────────────────────────────

export default function LaunchpadsSection() {
  const items = [...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS]

  return (
    <section
      className="relative w-full overflow-hidden py-10 -mt-8"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Title */}
      <p className="text-center text-sm font-mono tracking-[0.2em] uppercase mb-8" style={{ color: 'rgba(255,255,255,0.85)' }}>
        Supported Launchpads
      </p>

      {/* Left fade */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-40 z-10"
        style={{ background: 'linear-gradient(to right, hsl(60 10% 3%) 0%, transparent 100%)' }} />
      {/* Right fade */}
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-40 z-10"
        style={{ background: 'linear-gradient(to left, hsl(60 10% 3%) 0%, transparent 100%)' }} />

      {/* Marquee track — each slot is exactly 20vw so exactly 5 logos fill the viewport */}
      <div className="marquee-track">
        {items.map(({ src, name }, i) => (
          <div
            key={`${name}-${i}`}
            style={{ width: '20vw', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <img
              src={src}
              alt={name}
              className="select-none"
              style={{ height: 56, width: 'auto', opacity: 0.85, filter: 'brightness(1.05)' }}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
