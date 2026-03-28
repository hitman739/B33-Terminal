import NavBar from './components/layout/NavBar'
import Footer from './components/layout/Footer'
import HeroSection from './components/sections/HeroSection'
import LaunchpadsSection from './components/sections/LaunchpadsSection'
import FeaturesSection from './components/sections/FeaturesSection'
import HowItWorksSection from './components/sections/HowItWorksSection'
import PricingSection from './components/sections/PricingSection'
import FAQSection from './components/sections/FAQSection'
import CTASection from './components/sections/CTASection'

export default function App() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="page-vignette" />
      <NavBar />
      <HeroSection />
      <LaunchpadsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  )
}
