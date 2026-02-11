'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
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
  const imageRefs = useRef<HTMLDivElement[]>([])
  const activeImageIndex = useRef(0)
  const lastSpawnPos = useRef({ x: 0, y: 0 })
  const zCounter = useRef(0)

  useEffect(() => {
    let cleanupListeners: (() => void) | null = null
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

      // Hover Image Trail Logic — only on the "CODE" word
      const codeWord = document.getElementById('footer-code-word')
      if (codeWord) {
        const DISTANCE_THRESHOLD = 60 // minimum px between spawns

        const spawnImage = (x: number, y: number) => {
          const img = imageRefs.current[activeImageIndex.current]
          if (!img) return

          // Kill any running tweens on this image so it resets cleanly
          gsap.killTweensOf(img)
          zCounter.current++

          // Use a GSAP timeline for a single smooth sequence
          const tl = gsap.timeline()
          tl.set(img, {
            x,
            y,
            opacity: 0,
            scale: 0.3,
            zIndex: zCounter.current,
            rotation: Math.random() * 20 - 10,
          })
          // Smoothly expand and fade in
          tl.to(img, {
            opacity: 1,
            scale: 1,
            duration: 0.35,
            ease: 'power2.out',
          })
          // Hold briefly, then smoothly shrink and fade out
          tl.to(img, {
            opacity: 0,
            scale: 0.7,
            y: y + 30,
            duration: 0.5,
            ease: 'power1.in',
          }, '+=0.25')

          activeImageIndex.current = (activeImageIndex.current + 1) % images.length
        }

        const handleMouseMove = (e: MouseEvent) => {
          const dx = e.clientX - lastSpawnPos.current.x
          const dy = e.clientY - lastSpawnPos.current.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist >= DISTANCE_THRESHOLD) {
            lastSpawnPos.current = { x: e.clientX, y: e.clientY }
            spawnImage(e.clientX, e.clientY)
          }
        }

        const handleMouseEnter = (e: MouseEvent) => {
          lastSpawnPos.current = { x: e.clientX, y: e.clientY }
          spawnImage(e.clientX, e.clientY)
        }

        const handleMouseLeave = () => {
          // Fade out any remaining visible images
          imageRefs.current.forEach((img) => {
            gsap.to(img, { opacity: 0, duration: 0.3, ease: 'power2.out' })
          })
        }

        codeWord.addEventListener('mousemove', handleMouseMove)
        codeWord.addEventListener('mouseenter', handleMouseEnter)
        codeWord.addEventListener('mouseleave', handleMouseLeave)

        cleanupListeners = () => {
          codeWord.removeEventListener('mousemove', handleMouseMove)
          codeWord.removeEventListener('mouseenter', handleMouseEnter)
          codeWord.removeEventListener('mouseleave', handleMouseLeave)
        }
      }
    })

    return () => {
      if (cleanupListeners) cleanupListeners()
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
            <div 
                key={i}
                ref={el => { if(el) imageRefs.current[i] = el }}
                className="absolute w-28 h-40 rounded-lg shadow-2xl opacity-0 -translate-x-1/2 -translate-y-1/2 will-change-transform overflow-hidden"
            >
                <Image
                    src={src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="112px"
                    loading="lazy"
                    quality={60}
                />
            </div>
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
        <div className="relative group">
             <h2 className="font-display text-[clamp(4rem,18vw,16rem)] font-bold leading-[0.85] tracking-tighter">
              <span id="footer-code-word" className="block text-cream transition-colors duration-500 hover:text-rust">CODE</span>
              <span className="block text-stroke-cream transition-opacity duration-500 group-hover:text-stroke-rust">MERCH<span className="text-rust">.</span></span>
            </h2>
        </div>
      </div>


    </footer>
  )
}
