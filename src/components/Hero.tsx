'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const echoContainerRef = useRef<HTMLDivElement>(null)

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

      // Echo text container entrance animation
      const echoContainer = echoContainerRef.current
      if (echoContainer) {
        // Animate the whole container in
        gsap.set(echoContainer, { y: 120, opacity: 0 })
        gsap.to(echoContainer, {
          y: 0,
          opacity: 1,
          duration: 1.2,
          delay: 1.3,
          ease: 'power4.out',
        })

        // Parallax scroll effect - echo layers trail behind main layer
        const echoLayers = echoContainer.querySelectorAll('p')
        echoLayers.forEach((layer, index) => {
          if (index === 0) return // Main layer doesn't move

          const speed = parseFloat(layer.getAttribute('data-speed') || '1')
          const yOffset = (1 - speed) * 300 // Offset creates the trailing effect

          gsap.to(layer, {
            y: yOffset,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          })
        })
      }

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

      // Parallax on scroll for main title
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
      className="relative min-h-[90vh] sm:min-h-screen flex flex-col justify-between px-4 sm:px-6 md:px-12 pt-16 sm:pt-28 md:pt-32 pb-6 md:pb-12 overflow-hidden"
    >
      <div
        className="hero-orb absolute right-4 sm:right-10 md:right-16 top-1/2 -translate-y-1/2 grid pointer-events-none"
        aria-hidden="true"
      />
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
        </h1>

        {/* Parallax Echo Text - EXPERIENCES */}
        <div ref={echoContainerRef} className="text-container relative h-[clamp(2.5rem,12vw,10rem)]">
          <p data-speed="1">EXPERIENCES</p>
          <p data-speed="0.97">EXPERIENCES</p>
          <p data-speed="0.94">EXPERIENCES</p>
          <p data-speed="0.91">EXPERIENCES</p>
          <p data-speed="0.88">EXPERIENCES</p>
        </div>
      </div>

      {/* Bottom section - Scroll indicator */}
      <div className="flex justify-end mt-8 md:mt-0">
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
