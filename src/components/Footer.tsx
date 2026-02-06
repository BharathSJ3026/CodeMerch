'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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


    </footer>
  )
}
