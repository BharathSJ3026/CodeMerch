'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(headingRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      })

      // Footer items stagger animation
      gsap.from('.footer-item', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <footer
      ref={footerRef}
      className="sticky bottom-0 z-0 bg-coal text-cream min-h-screen flex flex-col px-4 sm:px-6 md:px-12 py-12 sm:py-16 md:py-20 overflow-hidden"
    >
      {/* Animated Gradient Balls */}
      <div className="gradient-ball gradient-ball-1 absolute top-[10%] left-[5%]" />
      <div className="gradient-ball gradient-ball-2 absolute top-[60%] right-[10%]" />
      <div className="gradient-ball gradient-ball-3 absolute bottom-[20%] left-[40%]" />

      {/* Large CODEMERCH Heading - Top */}
      <div ref={headingRef} className="relative z-10 mb-auto">
        <p className="font-mono text-xs sm:text-sm tracking-widest text-cream/40 mb-4 sm:mb-6">
          LET&apos;S CREATE SOMETHING AMAZING
        </p>
        <h2 className="font-display text-[clamp(3rem,18vw,16rem)] font-bold leading-[0.85] tracking-tighter">
          <span className="block text-cream">CODE</span>
          <span className="block text-stroke-cream">MERCH<span className="text-rust">.</span></span>
        </h2>
      </div>

      {/* Contact Grid - Bottom */}
      <div className="relative z-10 mt-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
          {/* Email */}
          <div className="footer-item">
            <p className="font-mono text-xs tracking-widest text-cream/40 mb-3">EMAIL</p>
            <a
              href="mailto:hello@codemerch.studio"
              className="font-display text-lg sm:text-xl md:text-2xl font-bold hover:text-rust transition-colors block break-all sm:break-normal"
            >
              hello@codemerch.studio
            </a>
          </div>

          {/* Phone */}
          <div className="footer-item">
            <p className="font-mono text-xs tracking-widest text-cream/40 mb-3">PHONE</p>
            <a
              href="tel:+1234567890"
              className="font-display text-lg sm:text-xl md:text-2xl font-bold hover:text-rust transition-colors block"
            >
              +1 (234) 567-890
            </a>
          </div>

          {/* Location */}
          <div className="footer-item">
            <p className="font-mono text-xs tracking-widest text-cream/40 mb-3">LOCATION</p>
            <p className="text-base sm:text-lg text-cream/80">
              New York, NY<br />
              & Worldwide
            </p>
          </div>

          {/* Socials */}
          <div className="footer-item">
            <p className="font-mono text-xs tracking-widest text-cream/40 mb-3">FOLLOW US</p>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <a href="#" className="text-base sm:text-lg text-cream/80 hover:text-rust transition-colors">
                Twitter
              </a>
              <a href="#" className="text-base sm:text-lg text-cream/80 hover:text-rust transition-colors">
                LinkedIn
              </a>
              <a href="#" className="text-base sm:text-lg text-cream/80 hover:text-rust transition-colors">
                Dribbble
              </a>
              <a href="#" className="text-base sm:text-lg text-cream/80 hover:text-rust transition-colors">
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-cream/10 pt-6 sm:pt-8 mt-12 sm:mt-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link href="/" className="font-display text-lg sm:text-xl font-bold tracking-tighter">
                CODEMERCH<span className="text-rust">.</span>
              </Link>
              <span className="font-mono text-[10px] sm:text-xs text-cream/40">
                © {new Date().getFullYear()}
              </span>
            </div>

            <div className="flex gap-4 sm:gap-6">
              <a href="#" className="font-mono text-[10px] sm:text-xs text-cream/40 hover:text-rust transition-colors">
                Privacy
              </a>
              <a href="#" className="font-mono text-[10px] sm:text-xs text-cream/40 hover:text-rust transition-colors">
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
