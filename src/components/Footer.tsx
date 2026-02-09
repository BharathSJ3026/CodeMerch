'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const images = [
  '/Web-Design.webp',
  '/Development.webp',
  '/agentic_web.webp',
  '/E-commerce.webp',
  '/video_editing.webp',
]

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  
  // Image trail references
  const imageRefs = useRef<HTMLImageElement[]>([])
  const activeImageIndex = useRef(0)
  const lastMousePos = useRef({ x: 0, y: 0 })
  const isHovering = useRef(false)
  const hoverIntervalId = useRef<number | null>(null)

  useEffect(() => {
    let cleanupLogoListeners: (() => void) | null = null
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(headingRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      })

      // Footer items stagger animation
      gsap.from('.footer-item', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })


      // Hover Image Trail Logic
      const logo = document.getElementById('footer-logo')
      if (logo) {
        const spawnImage = () => {
          if (!isHovering.current) return
          const img = imageRefs.current[activeImageIndex.current]
          if (!img) return

          gsap.set(img, {
            x: lastMousePos.current.x,
            y: lastMousePos.current.y,
            opacity: 1,
            scale: 1,
            zIndex: 20,
            rotation: Math.random() * 20 - 10,
          })

          gsap.to(img, {
            opacity: 0,
            scale: 0.5,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.2,
          })

          activeImageIndex.current = (activeImageIndex.current + 1) % images.length
        }

        const handleMouseMove = (e: MouseEvent) => {
          lastMousePos.current = { x: e.clientX, y: e.clientY }
        }

        const handleMouseEnter = () => {
          isHovering.current = true
          if (hoverIntervalId.current === null) {
            hoverIntervalId.current = window.setInterval(spawnImage, 120)
          }
        }

        const handleMouseLeave = () => {
          isHovering.current = false
          if (hoverIntervalId.current !== null) {
            window.clearInterval(hoverIntervalId.current)
            hoverIntervalId.current = null
          }
        }

        logo.addEventListener('mousemove', handleMouseMove)
        logo.addEventListener('mouseenter', handleMouseEnter)
        logo.addEventListener('mouseleave', handleMouseLeave)

        cleanupLogoListeners = () => {
          logo.removeEventListener('mousemove', handleMouseMove)
          logo.removeEventListener('mouseenter', handleMouseEnter)
          logo.removeEventListener('mouseleave', handleMouseLeave)
          if (hoverIntervalId.current !== null) {
            window.clearInterval(hoverIntervalId.current)
            hoverIntervalId.current = null
          }
        }
      }

    })

    return () => {
      if (cleanupLogoListeners) cleanupLogoListeners()
      ctx.revert()
    }
  }, [])

  return (
    <footer
      ref={footerRef}
      className="sticky bottom-0 z-0 bg-coal text-cream min-h-screen flex flex-col px-4 sm:px-6 md:px-12 py-12 sm:py-16 md:py-20 overflow-hidden"
    >
      {/* Preload images for trail */}
      <div className="fixed top-0 left-0 pointer-events-none w-full h-full z-50 overflow-hidden" style={{ zIndex: 50 }}>
        {images.map((src, i) => (
            <img 
                key={i}
                ref={el => { if(el) imageRefs.current[i] = el }}
                src={src}
                className="absolute w-40 h-56 object-cover rounded-lg shadow-2xl opacity-0 transform -translate-x-1/2 -translate-y-1/2 will-change-transform"
                alt=""
            />
        ))}
      </div>

      {/* Animated Gradient Balls */}
      <div className="gradient-ball gradient-ball-1 absolute top-[10%] left-[5%]" />
      <div className="gradient-ball gradient-ball-2 absolute top-[60%] right-[10%]" />
      <div className="gradient-ball gradient-ball-3 absolute bottom-[20%] left-[40%]" />

      {/* Large CODEMERCH Heading - Centered */}
      <div ref={headingRef} className="relative z-10 my-auto w-full flex flex-col items-center justify-center text-center">
        <p className="font-mono text-xs sm:text-sm tracking-widest text-cream/40 mb-4 sm:mb-6">
          LET&apos;S CREATE SOMETHING AMAZING
        </p>
        <div id="footer-logo" className="cursor-none relative group">
             <h2 className="font-display text-[clamp(4rem,18vw,16rem)] font-bold leading-[0.85] tracking-tighter">
              <span className="block text-cream transition-colors duration-500 group-hover:text-rust">CODE</span>
              <span className="block text-stroke-cream transition-opacity duration-500 group-hover:text-stroke-rust">MERCH<span className="text-rust">.</span></span>
            </h2>
        </div>
      </div>


    </footer>
  )
}
