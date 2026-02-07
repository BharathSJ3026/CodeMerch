'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    number: '01',
    title: 'Web Design',
    description: 'Bespoke digital experiences that captivate and convert. From concept to pixel-perfect execution.',
    tags: ['UI/UX', 'Prototyping', 'Design Systems'],
  },
  {
    number: '02',
    title: 'Development',
    description: 'Clean, performant code that brings designs to life. Built for scale, optimized for speed.',
    tags: ['React', 'Next.js', 'Node.js'],
  },
  {
    number: '03',
    title: 'Branding',
    description: 'Identity systems that tell your story. We craft brands that resonate and endure.',
    tags: ['Logo Design', 'Guidelines', 'Strategy'],
  },
  {
    number: '04',
    title: 'E-Commerce',
    description: 'Online stores built to sell. Seamless shopping experiences that drive revenue.',
    tags: ['Shopify', 'Custom Builds', 'Conversion'],
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const serviceRefs = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(headingRef.current, {
        x: -100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })

      // Service cards stagger animation
      serviceRefs.current.forEach((ref, i) => {
        if (!ref) return

        gsap.from(ref, {
          y: 80,
          opacity: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ref,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        })

        // Hover animation setup
        const title = ref.querySelector('.service-title')
        const number = ref.querySelector('.service-number')
        const line = ref.querySelector('.service-line')

        ref.addEventListener('mouseenter', () => {
          gsap.to(title, { x: 20, duration: 0.4, ease: 'power3.out' })
          gsap.to(number, { scale: 1.1, color: '#D4552A', duration: 0.3 })
          gsap.to(line, { scaleX: 1, duration: 0.4, ease: 'power3.out' })
        })

        ref.addEventListener('mouseleave', () => {
          gsap.to(title, { x: 0, duration: 0.4, ease: 'power3.out' })
          gsap.to(number, { scale: 1, color: '#1A1A1A', duration: 0.3 })
          gsap.to(line, { scaleX: 0, duration: 0.4, ease: 'power3.out' })
        })
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 bg-cream relative z-20 overflow-hidden min-h-screen rounded-t-[3rem] shadow-[0_-25px_50px_-12px_rgba(0,0,0,0.5)] -mt-[100vh]"
    >
      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
        <span className="font-mono text-xs sm:text-sm tracking-widest text-charcoal/60">02</span>
        <span className="w-8 sm:w-12 h-px bg-rust" />
        <span className="font-mono text-xs sm:text-sm tracking-widest text-charcoal/60">WHAT WE DO</span>
      </div>

      <h2
        ref={headingRef}
        className="font-display text-[clamp(2rem,8vw,5rem)] font-bold leading-[0.95] tracking-tight mb-10 sm:mb-14 md:mb-20 will-change-transform"
      >
        Services that
        <br />
        <span className="text-stroke">drive results</span>
      </h2>

      <div className="space-y-0">
        {services.map((service, i) => (
          <div
            key={service.number}
            ref={(el) => { if (el) serviceRefs.current[i] = el }}
            className="group border-t border-charcoal/20 py-6 sm:py-8 md:py-12 cursor-pointer relative"
            data-cursor-hover
          >
            <div className="service-line absolute top-0 left-0 w-full h-px bg-rust origin-left scale-x-0 will-change-transform" />
            
            <div className="flex flex-col md:grid md:grid-cols-12 gap-2 md:gap-4 items-start">
              <div className="md:col-span-1">
                <span className="service-number font-mono text-xs sm:text-sm tracking-wide transition-colors">
                  {service.number}
                </span>
              </div>
              
              <div className="md:col-span-4">
                <h3 className="service-title font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold will-change-transform">
                  {service.title}
                </h3>
              </div>
              
              <div className="md:col-span-4 md:col-start-6 mt-2 md:mt-0">
                <p className="text-sm sm:text-base text-charcoal/70 leading-relaxed">
                  {service.description}
                </p>
              </div>
              
              <div className="md:col-span-3 flex flex-wrap gap-1.5 sm:gap-2 mt-3 md:mt-0">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] sm:text-xs tracking-wide bg-charcoal/10 px-2 sm:px-3 py-0.5 sm:py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
        <div className="border-t border-charcoal/20" />
      </div>
    </section>
  )
}
