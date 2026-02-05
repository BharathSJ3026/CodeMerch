'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.footer-content', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} className="bg-coal text-cream py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-12">
      <div className="footer-content">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16">
          <Link href="/" className="font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-tighter">
            CODEMERCH<span className="text-rust">.</span>
          </Link>
          
          <p className="font-mono text-xs sm:text-sm text-cream/60 max-w-md md:text-right">
            Crafting digital experiences that merge code with creativity since 2018.
          </p>
        </div>

        <div className="border-t border-cream/10 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <p className="font-mono text-[10px] sm:text-xs text-cream/40">
              © {new Date().getFullYear()} CODEMERCH. All rights reserved.
            </p>
            
            <div className="flex gap-4 sm:gap-6 md:gap-8">
              <a href="#" className="font-mono text-[10px] sm:text-xs text-cream/40 hover:text-rust transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="font-mono text-[10px] sm:text-xs text-cream/40 hover:text-rust transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
