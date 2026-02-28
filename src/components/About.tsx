'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const triggerRef = useRef<HTMLElement>(null)
  const mobileTextRef = useRef<HTMLParagraphElement>(null)
  const mobileCardsRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let desktopSplit: SplitType | null = null
    let mobileSplit: SplitType | null = null
    let ctx: ReturnType<typeof gsap.context> | null = null

    ctx = gsap.context(() => {
      // Mobile animation
      if (mobileTextRef.current && mobileCardsRef.current) {
        mobileSplit = new SplitType(mobileTextRef.current, { types: 'words' })
        const mobileWords = mobileSplit.words ?? []
        
        if (mobileWords.length > 0) {
          // Start with low opacity, then highlight on scroll
          gsap.set(mobileWords, { opacity: 0.2 })
          
          const mobileCards = mobileCardsRef.current.children
          gsap.set(mobileCards, {
            rotateY: 90,
            opacity: 0,
            x: 30,
            transformPerspective: 1000,
            transformOrigin: 'left center',
          })
          
          const mobileTl = gsap.timeline({
            scrollTrigger: {
              trigger: mobileTextRef.current,
              start: 'top 95%',
              end: 'bottom 50%',
              scrub: 0.5,
            },
          })

          // Highlight words in groups of ~8-9 (use stagger with overlap)
          mobileTl.to(mobileWords, {
            opacity: 1,
            duration: 1,
            stagger: {
              each: 0.08,
              from: 'start',
            },
            ease: 'power2.out',
          })

          mobileTl.to(
            mobileCards,
            {
              rotateY: 0,
              opacity: 1,
              x: 0,
              duration: 0.5,
              stagger: 0.15,
              ease: 'back.out(1.5)',
            },
            0.7
          )
        }
      }

      // Desktop animation
      const desktopText = document.querySelector('.desktop-reveal-text')
      const desktopCards = document.querySelector('.desktop-cards')
      
      if (desktopText && desktopCards) {
        desktopSplit = new SplitType(desktopText as HTMLElement, { types: 'words' })
        const words = desktopSplit.words ?? []
        if (words.length === 0) return

        // Start with low opacity, then highlight on scroll
        gsap.set(words, { opacity: 0.2 })

        const cards = desktopCards.children
        gsap.set(cards, {
          rotateY: 90,
          opacity: 0,
          x: 50,
          transformPerspective: 1000,
          transformOrigin: 'left center',
        })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerRef.current,
            start: 'top top',
            end: '+=60%',
            scrub: 0.5,
          },
        })

        // Highlight words smoothly in groups
        tl.to(words, {
          opacity: 1,
          duration: 1,
          stagger: {
            each: 0.06,
            from: 'start',
          },
          ease: 'power2.out',
        })

        tl.to(
          cards,
          {
            rotateY: 0,
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.15,
            ease: 'back.out(1.5)',
          },
          0.6
        )
      }
    })

    return () => {
      if (ctx) ctx.revert()
      if (desktopSplit) desktopSplit.revert()
      if (mobileSplit) mobileSplit.revert()
    }
  }, [])

  // Sinusoidal particle wave — optimized with typed arrays + IntersectionObserver
  // Disabled on mobile for performance
  useEffect(() => {
    const canvas = canvasRef.current
    const section = triggerRef.current
    if (!canvas || !section) return

    // Skip particle wave on mobile — fixes lag and unwanted movement
    if (window.innerWidth < 768) {
      canvas.style.display = 'none'
      return
    }

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId = 0
    let isVisible = false

    // Typed arrays — cache-friendly, zero GC pressure
    let count = 0
    let px: Float32Array  // x positions
    let py: Float32Array  // baseY offsets from viewport center
    let ps: Float32Array  // sizes
    let pa: Float32Array  // amplitudes
    let pf: Float32Array  // frequencies
    let pp: Float32Array  // phases

    const colors = [
      'rgba(240, 160, 90, 0.5)',
      'rgba(248, 180, 120, 0.42)',
      'rgba(235, 145, 75, 0.55)',
      'rgba(212, 85, 42, 0.55)',
      'rgba(195, 70, 35, 0.45)',
      'rgba(220, 100, 50, 0.5)',
    ]
    const numColors = colors.length

    const resize = () => {
      canvas.width = section.offsetWidth
      canvas.height = section.offsetHeight
      generate()
    }

    const generate = () => {
      count = Math.max(200, Math.floor(canvas.width / 5))
      px = new Float32Array(count)
      py = new Float32Array(count)
      ps = new Float32Array(count)
      pa = new Float32Array(count)
      pf = new Float32Array(count)
      pp = new Float32Array(count)

      const baseFreq = 0.008
      const baseAmp = 30

      for (let i = 0; i < count; i++) {
        px[i] = (canvas.width / count) * i + (Math.random() - 0.5) * 8
        py[i] = (Math.random() - 0.5) * 40
        ps[i] = Math.random() * 2.5 + 2
        pa[i] = baseAmp + (Math.random() - 0.5) * 10
        pf[i] = baseFreq + (Math.random() - 0.5) * 0.001
        pp[i] = Math.random() * 0.3
      }
    }

    resize()
    window.addEventListener('resize', resize)

    // Only run rAF while section is on screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
        if (isVisible && !animationId) tick()
      },
      { threshold: 0 }
    )
    observer.observe(section)

    const tick = () => {
      if (!isVisible) { animationId = 0; return }

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const rect = section.getBoundingClientRect()
      const centerY = -rect.top + window.innerHeight * 0.5
      const wh = window.innerHeight
      const progress = Math.max(0, Math.min(1, (wh - rect.top) / (wh + section.offsetHeight)))
      const phase = progress * Math.PI * 10
      const h = canvas.height

      // Batch per color — stride through array (particles assigned round-robin)
      for (let c = 0; c < numColors; c++) {
        ctx.fillStyle = colors[c]
        ctx.beginPath()
        for (let i = c; i < count; i += numColors) {
          const y = centerY + py[i] + Math.sin(px[i] * pf[i] + pp[i] + phase) * pa[i]
          if (y < -5 || y > h + 5) continue
          ctx.moveTo(px[i] + ps[i], y)
          ctx.arc(px[i], y, ps[i], 0, 6.2832)
        }
        ctx.fill()
      }

      animationId = requestAnimationFrame(tick)
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
      observer.disconnect()
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section 
      ref={triggerRef} 
      id="about-track" 
      className="relative z-[1] bg-cream"
    >
      {/* Particle wave canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Mobile: Normal flow with scroll reveal */}
      <div className="md:hidden py-12 px-4 sm:px-6 relative z-10">
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-6">
          <div className="flex flex-col justify-center">
            <p
              ref={mobileTextRef}
              className="font-display text-[clamp(1.4rem,5vw,2rem)] font-bold leading-[1.3] tracking-tight text-charcoal text-left"
            >
              We are a tight-knit team of designers, developers, and strategists who
              thrive on challenges. From ambitious startups to established brands, we
              partner with clients who dare to be different. Every pixel, every line
              of code, every interaction—crafted with purpose.
            </p>
          </div>

          <div ref={mobileCardsRef} className="flex flex-row gap-4 items-center justify-center">
            {/* Card 1 */}
            <div className="w-36 h-24 sm:w-44 sm:h-28 rounded-xl bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] shadow-2xl border border-charcoal relative overflow-hidden flex flex-col justify-between p-3 sm:p-4 transform hover:scale-105 transition-transform duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rust/20 blur-2xl rounded-full -mr-10 -mt-10"></div>
              <div className="flex justify-between items-start relative z-10">
                <span className="text-2xl sm:text-3xl font-display text-white">∞</span>
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-rust/20 flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rust sm:w-4 sm:h-4">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 16v-4"/>
                    <path d="M12 8h.01"/>
                  </svg>
                </div>
              </div>
              <p className="font-mono text-[8px] sm:text-[10px] tracking-wide text-gray-400 font-bold relative z-10">
                POSSIBILITIES
              </p>
            </div>

            {/* Card 2 */}
            <div className="w-36 h-24 sm:w-44 sm:h-28 rounded-xl bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] shadow-2xl border border-charcoal relative overflow-hidden flex flex-col justify-between p-3 sm:p-4 transform hover:scale-105 transition-transform duration-300">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-rust/20 blur-2xl rounded-full -ml-10 -mb-10"></div>
              <div className="flex justify-between items-start relative z-10">
                <span className="text-2xl sm:text-3xl font-display text-white">100%</span>
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-rust/20 flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rust sm:w-4 sm:h-4">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
              </div>
              <p className="font-mono text-[8px] sm:text-[10px] tracking-wide text-gray-400 font-bold relative z-10">
                CLIENT SATISFACTION
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: Sticky scroll reveal */}
      <div className="hidden md:block min-h-[160vh] relative z-10">
        <div className="sticky top-0 h-screen flex items-center justify-center py-20 px-6 md:px-12 overflow-hidden">
          <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-24 items-center h-full">
            
            <div className="flex flex-col justify-center order-1 lg:col-span-8">
              <p
                className="desktop-reveal-text font-display text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold leading-[1.3] tracking-tight text-charcoal text-left"
              >
                We are a tight-knit team of designers, developers, and strategists who
                thrive on challenges. From ambitious startups to established brands, we
                partner with clients who dare to be different. Every pixel, every line
                of code, every interaction—crafted with purpose.
              </p>
            </div>

            <div className="desktop-cards flex flex-col gap-6 items-center order-2 perspective-1000 pl-12 lg:col-span-4">
              {/* Card 1 */}
              <div className="w-64 h-40 rounded-xl bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] shadow-2xl border border-charcoal relative overflow-hidden flex flex-col justify-between p-6 transform hover:scale-105 transition-transform duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-rust/20 blur-2xl rounded-full -mr-10 -mt-10"></div>
                <div className="flex justify-between items-start relative z-10">
                  <span className="text-4xl font-display text-white">∞</span>
                  <div className="w-8 h-8 rounded-full bg-rust/20 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rust">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 16v-4"/>
                      <path d="M12 8h.01"/>
                    </svg>
                  </div>
                </div>
                <p className="font-mono text-xs tracking-wide text-gray-400 font-bold relative z-10">
                  POSSIBILITIES
                </p>
              </div>

              {/* Card 2 */}
              <div className="w-64 h-40 rounded-xl bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] shadow-2xl border border-charcoal relative overflow-hidden flex flex-col justify-between p-6 transform hover:scale-105 transition-transform duration-300">
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-rust/20 blur-2xl rounded-full -ml-10 -mb-10"></div>
                <div className="flex justify-between items-start relative z-10">
                  <span className="text-4xl font-display text-white">100%</span>
                  <div className="w-8 h-8 rounded-full bg-rust/20 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rust">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                </div>
                <p className="font-mono text-xs tracking-wide text-gray-400 font-bold relative z-10">
                  CLIENT SATISFACTION
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
