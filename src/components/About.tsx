'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const revealTextRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    let split: SplitType | null = null

    const ctx = gsap.context(() => {
      if (!revealTextRef.current) return

      // Split the text into individual words
      split = new SplitType(revealTextRef.current, { types: 'words' })

      if (split.words && split.words.length > 0) {
        // Start every word dim
        gsap.set(split.words, { opacity: 0.15 })

        // Create a timeline that scrubs with scroll
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: revealTextRef.current,
            start: 'top 85%',
            end: 'bottom 40%',
            scrub: 1,
          },
        })

        // Animate each word to full opacity, staggered across the timeline
        tl.to(split.words, {
          opacity: 1,
          duration: 1,
          stagger: 0.5,
          ease: 'none',
        })
      }
    })

    return () => {
      ctx.revert()
      if (split) split.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 sm:py-32 md:py-40 px-4 sm:px-6 md:px-12 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-3 sm:gap-4 mb-10 sm:mb-14 md:mb-20">
          <span className="font-mono text-xs sm:text-sm tracking-widest text-charcoal/60">01</span>
          <span className="w-8 sm:w-12 h-px bg-rust" />
          <span className="font-mono text-xs sm:text-sm tracking-widest text-charcoal/60">ABOUT US</span>
        </div>

        {/* Scroll-based text reveal */}
        <p
          ref={revealTextRef}
          className="font-display text-[clamp(1.5rem,5vw,3.5rem)] font-bold leading-[1.2] tracking-tight text-charcoal"
        >
          We are a tight-knit team of designers, developers, and strategists who
          thrive on challenges. From ambitious startups to established brands, we
          partner with clients who dare to be different. Every pixel, every line
          of code, every interaction—crafted with purpose.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 sm:gap-8 mt-12 sm:mt-16 md:mt-24">
          <div>
            <span className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-rust">∞</span>
            <p className="font-mono text-xs sm:text-sm tracking-wide text-charcoal/60 mt-1 sm:mt-2">
              POSSIBILITIES
            </p>
          </div>
          <div>
            <span className="font-display text-3xl sm:text-4xl md:text-5xl font-bold">100%</span>
            <p className="font-mono text-xs sm:text-sm tracking-wide text-charcoal/60 mt-1 sm:mt-2">
              CLIENT SATISFACTION
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
