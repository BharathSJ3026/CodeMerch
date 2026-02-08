'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const triggerRef = useRef<HTMLElement>(null)
  const revealTextRef = useRef<HTMLParagraphElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let split: SplitType | null = null
    let mm: ReturnType<typeof gsap.matchMedia> | null = null

    const ctx = gsap.context(() => {
      if (!revealTextRef.current || !cardsRef.current) return

      // Split the text into individual words
      split = new SplitType(revealTextRef.current, { types: 'words' })
      const words = split.words ?? []
      if (words.length === 0) return

      // Start every word dim
      gsap.set(words, { opacity: 0.15 })

      const cards = cardsRef.current.children
      // Initial state for cards
      gsap.set(cards, {
        rotateY: 90,
        opacity: 0,
        x: 50,
        transformPerspective: 1000,
        transformOrigin: 'left center',
      })

      mm = gsap.matchMedia()

      mm.add('(max-width: 768px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerRef.current,
            start: 'top top',
            end: '+=70%',
            scrub: 0.6,
          },
        })

        tl.to(words, {
          opacity: 1,
          duration: 1,
          stagger: 0.05,
          ease: 'none',
        })

        tl.to(
          cards,
          {
            rotateY: 0,
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.2,
            ease: 'back.out(1.5)',
          },
          0.25
        )
      })

      mm.add('(min-width: 769px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerRef.current,
            start: 'top top',
            end: '+=100%',
            scrub: 1,
          },
        })

        tl.to(words, {
          opacity: 1,
          duration: 1,
          stagger: 0.05,
          ease: 'none',
        })

        tl.to(
          cards,
          {
            rotateY: 0,
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.2,
            ease: 'back.out(1.5)',
          },
          0.25
        )
      })
    })

    return () => {
      ctx.revert()
      if (mm) mm.revert()
      if (split) split.revert()
    }
  }, [])

  return (
    <section 
      ref={triggerRef} 
      id="about-track" 
      className="relative z-[1] min-h-[220vh] sm:min-h-[300vh] bg-cream"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center py-20 px-4 sm:px-6 md:px-12 overflow-hidden">
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-24 items-center h-full">
          
          {/* Text Column - Top on Mobile (default), Left on Desktop */}
          {/* Justify start on mobile to push text up? No, center is fine, but user said "cards pop below" */}
          <div className="flex flex-col justify-center order-1 lg:col-span-8">
            <p
              ref={revealTextRef}
              className="font-display text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold leading-[1.3] tracking-tight text-charcoal text-left"
            >
              We are a tight-knit team of designers, developers, and strategists who
              thrive on challenges. From ambitious startups to established brands, we
              partner with clients who dare to be different. Every pixel, every line
              of code, every interaction—crafted with purpose.
            </p>
          </div>

          {/* Cards Column - Bottom on Mobile (order 2), Right on Desktop */}
          <div ref={cardsRef} className="flex flex-row gap-4 items-center justify-center lg:flex-col lg:gap-6 lg:items-center order-2 perspective-1000 pl-0 lg:pl-12 lg:col-span-4 mt-8 lg:mt-0">
              
              {/* Card 1 */}
              <div className="w-32 h-20 sm:w-48 sm:h-28 lg:w-64 lg:h-40 rounded-xl bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] shadow-2xl border border-charcoal relative overflow-hidden flex flex-col justify-between p-3 sm:p-4 lg:p-6 transform hover:scale-105 transition-transform duration-300">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-rust/20 blur-2xl rounded-full -mr-10 -mt-10"></div>
                  <div className="flex justify-between items-start relative z-10">
                      <span className="text-2xl sm:text-3xl lg:text-4xl font-display text-white">∞</span>
                       <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-rust/20 flex items-center justify-center">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rust sm:w-4 sm:h-4">
                             <circle cx="12" cy="12" r="10"/>
                             <path d="M12 16v-4"/>
                             <path d="M12 8h.01"/>
                          </svg>
                      </div>
                  </div>
                  <p className="font-mono text-[8px] sm:text-[10px] lg:text-xs tracking-wide text-gray-400 font-bold relative z-10">
                    POSSIBILITIES
                  </p>
              </div>

              {/* Card 2 */}
               <div className="w-32 h-20 sm:w-48 sm:h-28 lg:w-64 lg:h-40 rounded-xl bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] shadow-2xl border border-charcoal relative overflow-hidden flex flex-col justify-between p-3 sm:p-4 lg:p-6 ml-0 transform hover:scale-105 transition-transform duration-300">
                   <div className="absolute bottom-0 left-0 w-32 h-32 bg-rust/20 blur-2xl rounded-full -ml-10 -mb-10"></div>
                  <div className="flex justify-between items-start relative z-10">
                      <span className="text-2xl sm:text-3xl lg:text-4xl font-display text-white">100%</span>
                       <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-rust/20 flex items-center justify-center">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rust sm:w-4 sm:h-4">
                               <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                               <polyline points="22 4 12 14.01 9 11.01"></polyline>
                          </svg>
                      </div>
                  </div>
                  <p className="font-mono text-[8px] sm:text-[10px] lg:text-xs tracking-wide text-gray-400 font-bold relative z-10">
                    CLIENT SATISFACTION
                  </p>
              </div>

          </div>
        </div>
      </div>
    </section>
  )
}
