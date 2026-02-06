'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const lettersRef = useRef<HTMLSpanElement[]>([])
  const curtainLeftRef = useRef<HTMLDivElement>(null)
  const curtainRightRef = useRef<HTMLDivElement>(null)
  const [isAnimating, setIsAnimating] = useState(true)

  useLayoutEffect(() => {
    // Immediately hide all letters via GSAP before first paint
    gsap.set(lettersRef.current, { opacity: 0, y: 14 })

    // Small RAF delay to ensure DOM is stable
    requestAnimationFrame(() => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          onComplete: () => {
            setIsAnimating(false)
            onComplete()
          },
        })

        // Smooth letter-by-letter reveal
        tl.to(lettersRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.15,
          stagger: 0.065,
          ease: 'power2.out',
        })

        // Hold so the full word reads cleanly
        tl.to({}, { duration: 0.25 })

        // Curtain pull – smooth and visible
        tl.to(
          [curtainLeftRef.current, curtainRightRef.current],
          {
            xPercent: (i: number) => (i === 0 ? -100 : 100),
            duration: 0.6,
            ease: 'power3.inOut',
          }
        )
      }, containerRef)

      return () => ctx.revert()
    })
  }, [onComplete])

  const text = 'CODEMERCH'
  const letters = text.split('')

  if (!isAnimating) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
    >
      {/* Left curtain */}
      <div
        ref={curtainLeftRef}
        className="absolute inset-y-0 left-0 w-1/2 bg-coal flex items-center justify-end"
      >
        <div className="flex items-baseline pr-0">
          {letters.slice(0, 4).map((letter, i) => (
            <span
              key={i}
              ref={(el) => {
                if (el) lettersRef.current[i] = el
              }}
              className="font-display text-[clamp(2rem,10vw,8rem)] font-bold text-cream tracking-tighter"
            >
              {letter}
            </span>
          ))}
        </div>
      </div>

      {/* Right curtain */}
      <div
        ref={curtainRightRef}
        className="absolute inset-y-0 right-0 w-1/2 bg-coal flex items-center justify-start"
      >
        <div className="flex items-baseline pl-0">
          {letters.slice(4).map((letter, i) => (
            <span
              key={i + 4}
              ref={(el) => {
                if (el) lettersRef.current[i + 4] = el
              }}
              className="font-display text-[clamp(2rem,10vw,8rem)] font-bold text-cream tracking-tighter"
            >
              {letter}
            </span>
          ))}
          {/* Orange fullstop */}
          <span
            ref={(el) => {
              if (el) lettersRef.current[9] = el
            }}
            className="font-display text-[clamp(2rem,10vw,8rem)] font-bold text-rust tracking-tighter"
          >
            .
          </span>
        </div>
      </div>
    </div>
  )
}
