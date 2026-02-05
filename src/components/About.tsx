'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const textRefs = useRef<HTMLParagraphElement[]>([])
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(headingRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
          end: 'top 50%',
          toggleActions: 'play none none reverse',
        },
      })

      // Text paragraphs stagger
      textRefs.current.forEach((ref, i) => {
        gsap.from(ref, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.15,
          scrollTrigger: {
            trigger: ref,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        })
      })

      // Image reveal
      gsap.from(imageRef.current, {
        clipPath: 'inset(100% 0 0 0)',
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      })

      // Parallax on image
      gsap.to('.about-image-inner', {
        yPercent: -15,
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 lg:gap-24">
        {/* Left column - Text */}
        <div className="order-2 lg:order-1">
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
            <span className="font-mono text-xs sm:text-sm tracking-widest text-charcoal/60">01</span>
            <span className="w-8 sm:w-12 h-px bg-rust" />
            <span className="font-mono text-xs sm:text-sm tracking-widest text-charcoal/60">ABOUT US</span>
          </div>

          <h2
            ref={headingRef}
            className="font-display text-[clamp(2rem,8vw,5rem)] font-bold leading-[0.95] tracking-tight mb-6 sm:mb-8 md:mb-12 will-change-transform"
          >
            We don&apos;t follow
            <br />
            <span className="text-stroke">trends—</span>
            <br />
            we set them
          </h2>

          <div className="space-y-4 sm:space-y-6 max-w-lg">
            <p
              ref={(el) => { if (el) textRefs.current[0] = el }}
              className="text-sm sm:text-base md:text-lg text-charcoal/80 leading-relaxed"
            >
              CODEMERCH is a creative web agency born from the belief that digital 
              experiences should be bold, memorable, and unapologetically unique.
            </p>
            <p
              ref={(el) => { if (el) textRefs.current[1] = el }}
              className="text-sm sm:text-base md:text-lg text-charcoal/80 leading-relaxed"
            >
              We&apos;re a tight-knit team of designers, developers, and strategists 
              who thrive on challenges. From ambitious startups to established 
              brands, we partner with clients who dare to be different.
            </p>
            <p
              ref={(el) => { if (el) textRefs.current[2] = el }}
              className="text-sm sm:text-base md:text-lg text-charcoal/80 leading-relaxed"
            >
              Our process is rooted in collaboration, obsessive attention to detail, 
              and a relentless pursuit of excellence. Every pixel, every line of 
              code, every interaction—crafted with purpose.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-8 mt-8 sm:mt-12 md:mt-16">
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

        {/* Right column - Image */}
        <div className="order-1 lg:order-2 relative">
          <div
            ref={imageRef}
            className="relative aspect-[4/5] sm:aspect-[4/4] lg:aspect-[4/5] overflow-hidden"
            style={{ clipPath: 'inset(0 0 0 0)' }}
          >
            <div className="about-image-inner absolute inset-0 scale-110 bg-charcoal flex items-center justify-center will-change-transform">
              <div className="text-center">
                <span className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-cream/10">CM</span>
                <p className="font-mono text-cream/40 text-xs sm:text-sm tracking-widest mt-2 sm:mt-4">
                  EST. 2018
                </p>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 border border-rust hidden lg:block" />
          <div className="absolute -bottom-4 -left-4 w-full h-px bg-charcoal/20 hidden lg:block" />
        </div>
      </div>
    </section>
  )
}
