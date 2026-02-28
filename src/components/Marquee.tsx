'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Marquee() {
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(marqueeRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: marqueeRef.current,
          start: 'top 90%',
          end: 'top 50%',
          scrub: true,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  const marqueeItems = [
    'WEB DESIGN',
    '●',
    'DEVELOPMENT',
    '●',
    'AGENTIC AI AUTOMATION',
    '●',
    'UI/UX',
    '●',
    'E-COMMERCE',
    '●',
    'VIDEO EDITING',
    '●',
    'STRATEGY',
    '●',
  ]

  return (
    <div
      ref={marqueeRef}
      className="py-10 sm:py-12 md:py-16 bg-charcoal text-cream overflow-hidden -rotate-2 relative z-50 -mx-6"
    >
      <div className="flex whitespace-nowrap will-change-transform" style={{ animation: 'marquee 20s linear infinite' }}>
        {[...marqueeItems, ...marqueeItems].map((item, i) => (
          <span
            key={i}
            className={`font-display text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mx-4 sm:mx-6 md:mx-10 flex-shrink-0 ${item === '●' ? 'text-rust' : ''}`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
