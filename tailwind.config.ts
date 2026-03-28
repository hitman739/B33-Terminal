import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: 'hsl(var(--primary))',
        'primary-foreground': 'hsl(var(--primary-foreground))',
        secondary: 'hsl(var(--secondary))',
        border: 'hsl(var(--border))',
        card: 'hsl(var(--card))',
        muted: 'hsl(var(--muted))',
        'muted-foreground': 'hsl(var(--muted-foreground))',
        hero: {
          heading: 'hsl(var(--hero-heading))',
          sub: 'hsl(var(--hero-sub))',
        },
      },
      keyframes: {
        glowPulse: {
          '0%,100%': { boxShadow: '0 0 20px rgba(212,255,0,0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(212,255,0,0.7), 0 0 60px rgba(212,255,0,0.3)' },
        },
        dotPulse: {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
      },
      animation: {
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'dot-pulse': 'dotPulse 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
