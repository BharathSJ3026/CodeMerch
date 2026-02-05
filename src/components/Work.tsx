'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 1,
    title: 'Stellar Labs',
    category: 'Web Design & Development',
    year: '2025',
    color: '#D4552A',
  },
  {
    id: 2,
    title: 'Nomad Coffee',
    category: 'E-Commerce / Branding',
    year: '2025',
    color: '#7A8B6E',
  },
  {
    id: 3,
    title: 'Archetype Studio',
    category: 'Brand Identity',
    year: '2024',
    color: '#E8B84A',
  },
  {
    id: 4,
    title: 'Velocity Motors',
    category: 'Web Application',
    year: '2024',
    color: '#1A1A1A',
  },
]

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null)
  const projectRefs = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from('.work-heading', {
        y: 80,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '.work-heading',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })

      // Project cards
      projectRefs.current.forEach((ref) => {
        if (!ref) return

        gsap.from(ref, {
          y: 100,
          opacity: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ref,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        })

        // Hover effects
        const image = ref.querySelector('.project-image')
        const title = ref.querySelector('.project-title')
        const overlay = ref.querySelector('.project-overlay')

        ref.addEventListener('mouseenter', () => {
          gsap.to(image, { scale: 1.05, duration: 0.6, ease: 'power3.out' })
          gsap.to(title, { y: -10, duration: 0.4, ease: 'power3.out' })
          gsap.to(overlay, { opacity: 1, duration: 0.4 })
        })

        ref.addEventListener('mouseleave', () => {
          gsap.to(image, { scale: 1, duration: 0.6, ease: 'power3.out' })
          gsap.to(title, { y: 0, duration: 0.4, ease: 'power3.out' })
          gsap.to(overlay, { opacity: 0, duration: 0.4 })
        })
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="work"
      className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 sm:gap-0 mb-8 sm:mb-12 md:mb-16">
        <div>
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
            <span className="font-mono text-xs sm:text-sm tracking-widest text-charcoal/60">03</span>
            <span className="w-8 sm:w-12 h-px bg-rust" />
            <span className="font-mono text-xs sm:text-sm tracking-widest text-charcoal/60">SELECTED WORK</span>
          </div>

          <h2 className="work-heading font-display text-[clamp(2rem,8vw,5rem)] font-bold leading-[0.95] tracking-tight will-change-transform">
            Projects that
            <br />
            <span className="text-stroke">speak volumes</span>
          </h2>
        </div>

        <a
          href="#"
          className="hidden md:flex items-center gap-4 group"
          data-cursor-hover
        >
          <span className="font-mono text-sm tracking-wide">VIEW ALL WORK</span>
          <span className="w-12 h-px bg-charcoal group-hover:w-20 transition-all duration-300" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
        {projects.map((project, i) => (
          <div
            key={project.id}
            ref={(el) => { if (el) projectRefs.current[i] = el }}
            className={`group cursor-pointer ${i % 2 === 1 ? 'md:mt-16 lg:mt-24' : ''}`}
            data-cursor-hover
          >
            <div className="relative aspect-[4/3] overflow-hidden mb-4 sm:mb-6">
              <div 
                className="project-image absolute inset-0 transition-transform duration-700 will-change-transform"
                style={{ backgroundColor: project.color }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white/10">
                    {project.id.toString().padStart(2, '0')}
                  </span>
                </div>
              </div>
              <div className="project-overlay absolute inset-0 bg-charcoal/20 opacity-0 transition-opacity" />
              
              {/* Corner brackets */}
              <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-cream opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-cream opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-cream opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-cream opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="project-title font-display text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 will-change-transform truncate">
                  {project.title}
                </h3>
                <p className="font-mono text-xs sm:text-sm text-charcoal/60">
                  {project.category}
                </p>
              </div>
              <span className="font-mono text-xs sm:text-sm text-charcoal/40 flex-shrink-0">
                {project.year}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile view all link */}
      <a
        href="#"
        className="flex md:hidden items-center gap-4 mt-8 sm:mt-12"
        data-cursor-hover
      >
        <span className="font-mono text-xs sm:text-sm tracking-wide">VIEW ALL WORK</span>
        <span className="w-8 sm:w-12 h-px bg-charcoal" />
      </a>
    </section>
  )
}
