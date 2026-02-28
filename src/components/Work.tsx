'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 1,
    title: 'Elite Prop India',
    category: 'A Prop trading firm',
    description: 'Full-stack property listing and management platform',
    year: '2025',
    image1: '/PropLanding.webp',
    image2: '/propdashboard.webp',
    color: '#D4552A',
    link: 'https://elitepropindia.com',
  },
  {
    id: 2,
    title: 'Study Buddy',
    category: 'EdTech Web App',
    description: 'Collaborative study platform for MVJCE students',
    year: '2025',
    image1: '/Studbuddy.webp',
    image2: '/Studybuddydash.webp',
    color: '#7A8B6E',
    link: 'https://study-buddy-for-mvjce.vercel.app',
  },
  {
    id: 3,
    title: 'Obsidian',
    category: 'AI / RAG Application',
    description: 'Chat interface for personal documents (RAG)',
    year: '2025',
    image1: '/obsidian_landing.webp',
    image2: '/Obsidian_chat.webp',
    color: '#1A1A1A',
    link: null,
  },
]

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null)
  const projectRefs = useRef<HTMLDivElement[]>([])
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorPos = useRef({ x: 0, y: 0 })
  const targetPos = useRef({ x: 0, y: 0 })
  const rafId = useRef<number>(0)

  const curtainLeftRefs = useRef<(HTMLDivElement | null)[]>([])
  const curtainRightRefs = useRef<(HTMLDivElement | null)[]>([])

  const [cursorVisible, setCursorVisible] = useState(false)
  const [cursorColor, setCursorColor] = useState('#D4552A')
  const [cursorLabel, setCursorLabel] = useState('open')

  // Smooth cursor follow loop
  const animateCursor = useCallback(() => {
    cursorPos.current.x += (targetPos.current.x - cursorPos.current.x) * 0.15
    cursorPos.current.y += (targetPos.current.y - cursorPos.current.y) * 0.15

    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${cursorPos.current.x}px, ${cursorPos.current.y}px)`
    }
    rafId.current = requestAnimationFrame(animateCursor)
  }, [])

  useEffect(() => {
    rafId.current = requestAnimationFrame(animateCursor)
    return () => cancelAnimationFrame(rafId.current)
  }, [animateCursor])

  // Global mouse tracking
  useEffect(() => {
    const handleGlobalMouse = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleGlobalMouse)
    return () => window.removeEventListener('mousemove', handleGlobalMouse)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading text reveal from bottom
      gsap.from('.work-heading-text', {
        yPercent: 100,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.work-heading',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })

      // Project cards scroll-in
      projectRefs.current.forEach((ref) => {
        if (!ref) return

        gsap.from(ref, {
          y: 80,
          opacity: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ref,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        })
      })
    })

    return () => ctx.revert()
  }, [])

  const handleProjectEnter = (project: typeof projects[0], index: number) => {
    setCursorVisible(true)
    setCursorColor(project.color)
    setCursorLabel(project.link ? 'open' : 'view')

    const left = curtainLeftRefs.current[index]
    const right = curtainRightRefs.current[index]
    if (left && right) {
      gsap.killTweensOf([left, right])
      gsap.to(left, { xPercent: -100, duration: 0.6, ease: 'power3.inOut' })
      gsap.to(right, { xPercent: 100, duration: 0.6, ease: 'power3.inOut' })
    }
  }

  const handleProjectLeave = (index: number) => {
    setCursorVisible(false)

    const left = curtainLeftRefs.current[index]
    const right = curtainRightRefs.current[index]
    if (left && right) {
      gsap.killTweensOf([left, right])
      gsap.to(left, { xPercent: 0, duration: 0.4, ease: 'power2.in' })
      gsap.to(right, { xPercent: 0, duration: 0.4, ease: 'power2.in' })
    }
  }

  const handleProjectClick = (project: typeof projects[0]) => {
    if (project.link) {
      window.open(project.link, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <section
      ref={sectionRef}
      id="work"
      className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 overflow-hidden"
    >
      {/* Custom project cursor */}
      <div
        ref={cursorRef}
        className="project-cursor fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          opacity: cursorVisible ? 1 : 0,
          transition: 'opacity 0.25s ease',
        }}
      >
        <div
          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-mono font-semibold -translate-x-1/2 -translate-y-1/2 whitespace-nowrap"
          style={{
            backgroundColor: cursorColor,
            color: cursorColor === '#1A1A1A' ? '#F5F0E8' : '#0D0D0D',
            transition: 'background-color 0.35s ease, color 0.35s ease',
          }}
        >
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cursorColor === '#1A1A1A' ? '#F5F0E8' : '#0D0D0D' }} />
          {cursorLabel}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 sm:gap-0 mb-6 sm:mb-8 md:mb-12">
        <div>
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
            <span className="font-mono text-xs sm:text-sm tracking-widest text-charcoal/60">03</span>
            <span className="w-8 sm:w-12 h-px bg-rust" />
            <span className="font-mono text-xs sm:text-sm tracking-widest text-charcoal/60">SELECTED WORK</span>
          </div>

          <h2 className="work-heading overflow-hidden font-display text-[clamp(2rem,8vw,5rem)] font-bold leading-[0.95] tracking-tight will-change-transform">
            <span className="work-heading-text block">Featured Work</span>
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
        {projects.map((project, i) => (
          <div
            key={project.id}
            ref={(el) => { if (el) projectRefs.current[i] = el }}
            className="project-card group"
            style={{ cursor: cursorVisible ? 'none' : 'pointer' }}
            onMouseEnter={() => handleProjectEnter(project, i)}
            onMouseLeave={() => handleProjectLeave(i)}
            onClick={() => handleProjectClick(project)}
          >
            {/* Image container */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-4">
              {/* Hover image (image2) — sits underneath the curtains */}
              <Image
                src={project.image2}
                alt={`${project.title} detail`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading="lazy"
                quality={75}
              />

              {/* Left curtain — shows left half of image1 */}
              <div
                ref={(el) => { curtainLeftRefs.current[i] = el }}
                className="absolute left-0 top-0 w-1/2 h-full z-[10] overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-[200%] h-full">
                  <Image
                    src={project.image1}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                    quality={75}
                  />
                </div>
              </div>

              {/* Right curtain — shows right half of image1 */}
              <div
                ref={(el) => { curtainRightRefs.current[i] = el }}
                className="absolute right-0 top-0 w-1/2 h-full z-[10] overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-[200%] h-full">
                  <Image
                    src={project.image1}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                    quality={75}
                  />
                </div>
              </div>

              {/* Subtle overlay */}
              <div className="absolute inset-0 z-[15] bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

              {/* Corner brackets */}
              <div className="absolute top-3 left-3 w-5 h-5 border-l-2 border-t-2 border-cream opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[15]" />
              <div className="absolute top-3 right-3 w-5 h-5 border-r-2 border-t-2 border-cream opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[15]" />
              <div className="absolute bottom-3 left-3 w-5 h-5 border-l-2 border-b-2 border-cream opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[15]" />
              <div className="absolute bottom-3 right-3 w-5 h-5 border-r-2 border-b-2 border-cream opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[15]" />
            </div>

            {/* Project info */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-base sm:text-lg md:text-xl font-bold mb-1 truncate transition-colors duration-300 group-hover:text-rust">
                  {project.title}
                </h3>
                <p className="font-mono text-[11px] sm:text-xs text-charcoal/60 leading-snug">
                  {project.description}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <span className="font-mono text-[11px] text-charcoal/40">{project.year}</span>
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ backgroundColor: project.color }}
                />
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-2">
              {project.category.split(' / ').map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 border border-charcoal/15 rounded-full text-charcoal/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
