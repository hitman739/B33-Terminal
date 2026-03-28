import logo from '../../assets/b33-logo.png'
import AmbientBlob from '../ambient/AmbientBlob'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t pt-32 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ borderColor: 'rgba(212,255,0,0.08)' }}>
      {/* Ambient background layers */}
      <AmbientBlob size={450} top="0%" left="0%" opacity={0.04} duration={9} driftX={30} driftY={20} />
      <AmbientBlob size={350} bottom="0%" right="0%" opacity={0.035} duration={8} driftX={-25} driftY={-20} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-16 mb-24" style={{ position: 'relative', zIndex: 10 }}>
        {/* Brand */}
        <div className="col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3 mb-5">
            <img src={logo} alt="B33" className="h-14 w-auto" />
            <span className="brand-name text-2xl text-foreground">B33</span>
          </div>
          <p className="text-muted-foreground text-base leading-relaxed max-w-xs">
            The fastest bundle bot on Solana.
          </p>
        </div>

        {/* Product */}
        <div>
          <h3 className="text-foreground font-semibold text-base mb-6">Product</h3>
          <ul className="space-y-4">
            {['Features', 'How It Works', 'FAQ', 'Launch App'].map((item) => (
              <li key={item}>
                <a href="#" className="text-muted-foreground text-base hover:text-foreground transition-colors duration-200">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Community */}
        <div>
          <h3 className="text-foreground font-semibold text-base mb-6">Community</h3>
          <ul className="space-y-4">
            {['Telegram', 'Twitter/X'].map((item) => (
              <li key={item}>
                <a href="#" className="text-muted-foreground text-base hover:text-foreground transition-colors duration-200">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-foreground font-semibold text-base mb-6">Legal</h3>
          <ul className="space-y-4">
            {['Terms', 'Privacy'].map((item) => (
              <li key={item}>
                <a href="#" className="text-muted-foreground text-base hover:text-foreground transition-colors duration-200">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        className="border-t pt-8 flex flex-col sm:flex-row justify-between gap-4 text-base text-muted-foreground"
        style={{ borderColor: 'rgba(212,255,0,0.05)', position: 'relative', zIndex: 10 }}
      >
        <span>© 2026 B33. Built on Solana.</span>
        <div className="flex gap-8">
          <a href="#" className="hover:text-foreground transition-colors duration-200">Privacy</a>
          <a href="#" className="hover:text-foreground transition-colors duration-200">Terms</a>
        </div>
      </div>
    </footer>
  )
}
