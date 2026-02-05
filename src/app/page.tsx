import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import About from '@/components/About'
import Services from '@/components/Services'
import Work from '@/components/Work'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      {/* Main content wrapper - slides up to reveal footer */}
      <div className="main-content relative z-10 bg-cream">
        <Navigation />
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Work />
        <Contact />
      </div>
      {/* Footer sits behind the content */}
      <Footer />
    </main>
  )
}
