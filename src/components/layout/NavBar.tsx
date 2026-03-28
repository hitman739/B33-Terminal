import { useScrolled } from '../../hooks/useScrolled'
import { Button } from '../ui/Button'
import logo from '../../assets/b33-logo.png'

export default function NavBar() {
  const scrolled = useScrolled()

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className="sticky top-0 w-full flex justify-center px-4 pt-4 pb-2"
      style={{ zIndex: 'var(--z-navbar)' }}
    >
      <nav
        className={`liquid-glass rounded-3xl w-full max-w-[1100px] px-8 py-5 flex items-center justify-between gap-4 transition-all duration-300 ${
          scrolled ? 'border border-[rgba(212,255,0,0.1)]' : 'border border-transparent'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <img src={logo} alt="B33" className="h-14 w-auto" />
          <span className="brand-name text-3xl text-foreground">B33</span>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-6">
          {[
            { label: 'Features', id: 'features' },
            { label: 'How It Works', id: 'how-it-works' },
            { label: 'FAQ', id: 'faq' },
          ].map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-lg text-foreground hover:text-primary transition-colors duration-200 cursor-pointer"
            >
              {label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <Button variant="hero" className="animate-glow-pulse text-sm shrink-0">
          Launch App
        </Button>
      </nav>
    </header>
  )
}
