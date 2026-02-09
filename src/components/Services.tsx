'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    number: '01',
    title: 'Web Design',
    description: 'Bespoke digital experiences that captivate and convert.',
    tags: ['UI/UX', 'Prototyping', 'Design Systems'],
    image: '/Web-Design.webp',
  },
  {
    number: '02',
    title: 'Development',
    description: 'Clean, performant code that brings designs to life.',
    tags: ['React', 'Next.js', 'Node.js'],
    image: '/Development.webp',
  },
  {
    number: '03',
    title: 'Agentic AI Automation',
    description: 'Autonomous workflows that scale teams and operations.',
    tags: ['AI Agents', 'Workflow Orchestration', 'Integrations'],
    image: '/agentic_web.webp',
  },
  {
    number: '04',
    title: 'E-Commerce',
    description: 'Online stores built to sell.',
    tags: ['Shopify', 'Custom Builds', 'Conversion'],
    image: '/E-commerce.webp',
  },
  {
    number: '05',
    title: 'Video Editing',
    description: 'Cinematic edits that sharpen the message.',
    tags: ['Short Form', 'Color', 'Sound Design'],
    image: '/video_editing.webp',
  },
]

export default function Services() {
  const containerRef = useRef<HTMLElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])
  const curtainLeftRefs = useRef<(HTMLDivElement | null)[]>([])
  const curtainRightRefs = useRef<(HTMLDivElement | null)[]>([])
  const marqueeRefs = useRef<(HTMLDivElement | null)[]>([])
  const mobileCurtainLeftRefs = useRef<(HTMLDivElement | null)[]>([])
  const mobileCurtainRightRefs = useRef<(HTMLDivElement | null)[]>([])
  const hoverIndexRef = useRef<number | null>(null)
  const closeTimerRef = useRef<number | null>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [isDesktop, setIsDesktop] = useState(false)
  const [viewportReady, setViewportReady] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const media = window.matchMedia('(min-width: 768px)')
    const handleChange = () => {
      setIsDesktop(media.matches)
      setViewportReady(true)
    }

    handleChange()
    media.addEventListener('change', handleChange)

    return () => {
      media.removeEventListener('change', handleChange)
    }
  }, [])

  const openDesktop = (index: number) => {
    if (activeIndex === index) return

    imageRefs.current.forEach((el, i) => {
      if (el && i !== index) {
        gsap.set(el, { visibility: 'hidden', zIndex: 1 })
      }
    })

    setActiveIndex(index)

    const leftCurtain = curtainLeftRefs.current[index]
    const rightCurtain = curtainRightRefs.current[index]
    const imageEl = imageRefs.current[index]

    if (leftCurtain && rightCurtain && imageEl) {
      gsap.killTweensOf([leftCurtain, rightCurtain])
      gsap.set([leftCurtain, rightCurtain], { xPercent: 0 })
      gsap.set(imageEl, { visibility: 'visible', zIndex: 10 })

      gsap.to(leftCurtain, {
        xPercent: -100,
        duration: 0.5,
        ease: 'power3.inOut',
      })
      gsap.to(rightCurtain, {
        xPercent: 100,
        duration: 0.5,
        ease: 'power3.inOut',
      })
    }

    const marqueeEl = marqueeRefs.current[index]
    if (marqueeEl) {
      gsap.killTweensOf(marqueeEl)
      gsap.set(marqueeEl, { x: 0 })
      gsap.to(marqueeEl, {
        x: '-50%',
        duration: 15,
        ease: 'none',
        repeat: -1,
      })
    }
  }

  const closeDesktop = (index: number) => {
    const leftCurtain = curtainLeftRefs.current[index]
    const rightCurtain = curtainRightRefs.current[index]
    const imageEl = imageRefs.current[index]

    if (leftCurtain && rightCurtain && imageEl) {
      gsap.killTweensOf([leftCurtain, rightCurtain])

      gsap.to(leftCurtain, {
        xPercent: 0,
        duration: 0.3,
        ease: 'power2.in',
      })
      gsap.to(rightCurtain, {
        xPercent: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set(imageEl, { visibility: 'hidden', zIndex: 1 })
          setActiveIndex(null)
        },
      })
    } else {
      setActiveIndex(null)
    }

    const marqueeEl = marqueeRefs.current[index]
    if (marqueeEl) {
      gsap.killTweensOf(marqueeEl)
      gsap.to(marqueeEl, {
        x: 0,
        duration: 0.3,
        ease: 'power2.out',
      })
    }
  }

  const openMobile = (index: number) => {
    const leftCurtain = mobileCurtainLeftRefs.current[index]
    const rightCurtain = mobileCurtainRightRefs.current[index]

    if (leftCurtain && rightCurtain) {
      gsap.killTweensOf([leftCurtain, rightCurtain])
      gsap.set([leftCurtain, rightCurtain], { xPercent: 0 })
      gsap.to(leftCurtain, {
        xPercent: -100,
        duration: 0.5,
        ease: 'power3.inOut',
      })
      gsap.to(rightCurtain, {
        xPercent: 100,
        duration: 0.5,
        ease: 'power3.inOut',
      })
    }
  }

  const closeMobile = (index: number) => {
    const leftCurtain = mobileCurtainLeftRefs.current[index]
    const rightCurtain = mobileCurtainRightRefs.current[index]

    if (leftCurtain && rightCurtain) {
      gsap.killTweensOf([leftCurtain, rightCurtain])
      gsap.to(leftCurtain, {
        xPercent: 0,
        duration: 0.3,
        ease: 'power2.in',
      })
      gsap.to(rightCurtain, {
        xPercent: 0,
        duration: 0.3,
        ease: 'power2.in',
      })
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section entrance on scroll
      gsap.from(sectionRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'top 40%',
          scrub: 0.5,
        },
        y: 50,
        opacity: 0,
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!viewportReady) return

    if (!isDesktop) {
      setActiveIndex(0)
      openMobile(0)
      return
    }

    setActiveIndex(null)
    imageRefs.current.forEach((el) => {
      if (el) gsap.set(el, { visibility: 'hidden', zIndex: 1 })
    })
  }, [isDesktop, viewportReady])

  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current)
        closeTimerRef.current = null
      }
    }
  }, [])

  const scheduleCloseDesktop = (index: number) => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current)
    }

    closeTimerRef.current = window.setTimeout(() => {
      if (hoverIndexRef.current !== index) {
        closeDesktop(index)
      }
    }, 120)
  }

  return (
    <>
      <section
        ref={containerRef}
        id="services"
        className="relative z-20 overflow-hidden shadow-[0_-15px_30px_-10px_rgba(0,0,0,0.3)] bg-charcoal"
      >
        {/* Floating Image Container - Center of screen (Desktop only) */}
        <div className="hidden md:flex fixed inset-y-0 right-80 pointer-events-none z-30 items-center justify-end pr-8 md:pr-12">
          {services.map((service, i) => ( 
            <div
              key={`image-${service.number}`}
              ref={(el) => { imageRefs.current[i] = el }}
              className="absolute w-[320px] h-[420px] rounded-2xl overflow-hidden shadow-2xl"
              style={{ 
                visibility: 'hidden',
                opacity: 1,
              }}
            >
              {/* Left Curtain */}
              <div 
                ref={(el) => { curtainLeftRefs.current[i] = el }}
                className="absolute left-0 top-0 w-1/2 h-full bg-charcoal z-10"
              />
              {/* Right Curtain */}
              <div 
                ref={(el) => { curtainRightRefs.current[i] = el }}
                className="absolute right-0 top-0 w-1/2 h-full bg-charcoal z-10"
              />
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
                sizes="400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent z-[5]" />
            </div>
          ))}
        </div>

        <div ref={sectionRef} className="flex flex-col justify-center py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-12">
          {/* Header */}
          <div className="flex justify-center mb-6 sm:mb-8 md:mb-10">
            <h2 className="font-display text-[clamp(1.75rem,5vw,3.5rem)] font-bold uppercase tracking-tight text-cream">
              What We Offer.
            </h2>
          </div>

          {/* Services List */}
          <div className="flex flex-col">
            {services.map((service, i) => {
              const isHovered = activeIndex === i
              return (
                <div
                  key={service.number}
                  className="relative border-t border-cream/20 last:border-b cursor-pointer group"
                  onMouseEnter={() => {
                    if (!isDesktop) return

                    hoverIndexRef.current = i
                    if (closeTimerRef.current !== null) {
                      window.clearTimeout(closeTimerRef.current)
                      closeTimerRef.current = null
                    }
                    openDesktop(i)
                  }}
                  onMouseLeave={() => {
                    if (!isDesktop) return

                    hoverIndexRef.current = null
                    scheduleCloseDesktop(i)
                  }}
                  onClick={() => {
                    if (isDesktop) return

                    if (activeIndex === i) {
                      closeMobile(i)
                      setActiveIndex(null)
                      return
                    }

                    if (activeIndex !== null) {
                      closeMobile(activeIndex)
                    }
                    setActiveIndex(i)
                    openMobile(i)
                  }}
                >
                  {/* Background Marquee - Only visible on hover */}
                  <div 
                    className={`absolute inset-0 hidden md:flex items-center overflow-hidden transition-opacity duration-300 ${
                      isHovered ? 'opacity-10' : 'opacity-0'
                    }`}
                  >
                    <div
                      ref={(el) => { marqueeRefs.current[i] = el }}
                      className="flex whitespace-nowrap"
                    >
                      {[...Array(8)].map((_, idx) => (
                        <span 
                          key={idx} 
                          className="font-display font-black text-[6vh] sm:text-[10vh] md:text-[14vh] uppercase px-4 text-cream"
                        >
                          {service.title} • {service.title} •
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Service Content */}
                  <div className="relative z-10 py-4 sm:py-5 md:py-6 flex items-center justify-between transition-all duration-300">
                    <div className="flex items-baseline gap-3 sm:gap-4 md:gap-6">
                      <span className="font-mono text-[10px] sm:text-xs text-rust">{service.number}</span>
                      <h3 
                        className={`font-display font-bold uppercase transition-all duration-500 text-cream ${
                          isHovered 
                            ? 'text-2xl sm:text-4xl md:text-5xl translate-x-1 sm:translate-x-2 md:translate-x-4' 
                            : 'text-xl sm:text-3xl md:text-4xl'
                        }`}
                      >
                        {service.title}
                      </h3>
                    </div>
                    
                    {/* Tags & Description - Desktop */}
                    <div 
                      className={`hidden md:flex flex-col items-end gap-1 transition-all duration-500 ${
                        isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                      }`}
                    >
                      <p className="font-mono text-xs max-w-xs text-right text-cream/80">
                        {service.description}
                      </p>
                      <div className="flex gap-1.5 flex-wrap justify-end">
                        {service.tags.map(tag => (
                          <span 
                            key={tag} 
                            className="text-[9px] uppercase border border-cream/40 text-cream px-1.5 py-0.5 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Arrow indicator - Mobile */}
                    <div 
                      className={`md:hidden transition-all duration-300 ${
                        isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                      }`}
                    >
                      <svg 
                        className="w-5 h-5 text-rust" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M17 8l4 4m0 0l-4 4m4-4H3" 
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Mobile: Image + Tags shown below on hover */}
                  <div 
                    className={`md:hidden overflow-hidden transition-all duration-500 ${
                      isHovered ? 'max-h-[300px] opacity-100 pb-4' : 'max-h-0 opacity-0'
                    }`}
                  >
                    {/* Mobile Image with curtain effect */}
                    <div className="relative w-full h-40 sm:h-48 rounded-lg overflow-hidden mb-3 mx-auto max-w-sm">
                      <div 
                        ref={(el) => { mobileCurtainLeftRefs.current[i] = el }}
                        className="absolute left-0 top-0 w-1/2 h-full bg-charcoal z-10"
                      />
                      <div 
                        ref={(el) => { mobileCurtainRightRefs.current[i] = el }}
                        className="absolute right-0 top-0 w-1/2 h-full bg-charcoal z-10"
                      />
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 384px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
                    </div>
                    <p className="font-mono text-[10px] sm:text-xs text-cream/80 mb-2">
                      {service.description}
                    </p>
                    <div className="flex gap-1.5 flex-wrap">
                      {service.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="text-[9px] uppercase border border-cream/40 text-cream px-1.5 py-0.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
