'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import About from '@/components/About'
import Services from '@/components/Services'
import Work from '@/components/Work'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import LoadingScreen from '@/components/LoadingScreen'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <main>
      {/* Loading screen with curtain reveal */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

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
