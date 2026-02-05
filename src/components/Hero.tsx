'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text animation for main title
      const titleChars = titleRef.current?.querySelectorAll('.char')
      
      if (titleChars) {
        gsap.set(titleChars, { y: 120, opacity: 0, rotateX: -90 })
        gsap.to(titleChars, {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.03,
          delay: 0.8,
          ease: 'power4.out',
        })
      }

      // Subtitle animation
      gsap.from(subtitleRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        delay: 1.5,
        ease: 'power3.out',
      })

      // Tagline items
      gsap.from('.tagline-item', {
        x: -40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        delay: 1.8,
        ease: 'power3.out',
      })

      // Scroll indicator
      gsap.from(scrollIndicatorRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 2.2,
        ease: 'power3.out',
      })

      gsap.to('.scroll-line', {
        scaleY: 1,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
      })

      // Parallax on scroll
      gsap.to(titleRef.current, {
        yPercent: 30,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  const splitText = (text: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className="char inline-block">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-between px-4 sm:px-6 md:px-12 pt-24 sm:pt-28 md:pt-32 pb-8 md:pb-12 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-1/4 right-12 w-px h-48 bg-charcoal/20 hidden lg:block" />
      <div className="absolute bottom-1/4 left-12 w-24 h-px bg-charcoal/20 hidden lg:block" />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center">
        {/* Tagline */}
        <div ref={taglineRef} className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
          <span className="tagline-item w-8 sm:w-12 h-px bg-rust" />
          <span className="tagline-item font-mono text-xs sm:text-sm tracking-widest text-charcoal/60">
            CREATIVE WEB AGENCY
          </span>
        </div>

        {/* Main title */}
        <h1
          ref={titleRef}
          className="font-display text-[clamp(2.5rem,12vw,10rem)] font-bold leading-[0.9] tracking-tighter mb-6 sm:mb-8 will-change-transform"
        >
          <span className="block overflow-hidden">
            {splitText('WE CRAFT')}
          </span>
          <span className="block overflow-hidden">
            {splitText('DIGITAL')}
          </span>
          <span className="block overflow-hidden text-stroke">
            {splitText('EXPERIENCES')}
          </span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="max-w-xs sm:max-w-md md:max-w-xl text-sm sm:text-base md:text-lg lg:text-xl text-charcoal/70 font-body leading-relaxed ml-0 md:ml-auto md:text-right mt-4 md:mt-0"
        >
          We merge code with creativity to build websites that 
          <span className="text-rust font-medium"> stand out</span>. 
          Strategy, design, and development for brands that refuse to blend in.
        </p>
      </div>

      {/* Bottom section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8 mt-8 md:mt-0">
        {/* Stats */}
        <div className="flex gap-8 sm:gap-12 md:gap-16">
          <div>
            <span className="font-display text-2xl sm:text-3xl md:text-4xl font-bold">150+</span>
            <p className="font-mono text-[10px] sm:text-xs tracking-wide text-charcoal/60 mt-1">PROJECTS</p>
          </div>
          <div>
            <span className="font-display text-2xl sm:text-3xl md:text-4xl font-bold">8</span>
            <p className="font-mono text-[10px] sm:text-xs tracking-wide text-charcoal/60 mt-1">YEARS EXP</p>
          </div>
          <div>
            <span className="font-display text-2xl sm:text-3xl md:text-4xl font-bold">40+</span>
            <p className="font-mono text-[10px] sm:text-xs tracking-wide text-charcoal/60 mt-1">CLIENTS</p>
          </div>
        </div>

        {/* Scroll indicator - hidden on mobile to prevent overlap */}
        <div ref={scrollIndicatorRef} className="hidden sm:flex flex-col items-center gap-4">
          <span className="font-mono text-xs tracking-widest rotate-90 origin-center translate-x-4">
            SCROLL
          </span>
          <div className="w-px h-16 bg-charcoal/20 relative overflow-hidden">
            <div className="scroll-line absolute top-0 left-0 w-full h-1/2 bg-rust origin-top scale-y-0 will-change-transform" />
          </div>
        </div>
      </div>
    </section>
  )
}
