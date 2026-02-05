'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const [isTouchDevice, setIsTouchDevice] = useState(true)

  useEffect(() => {
    // Check if device has hover capability (not a touch device)
    const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    setIsTouchDevice(!hasHover)
    
    if (!hasHover) return

    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    
    if (!cursor || !cursorDot) return

    // Use transform3d for GPU acceleration
    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX - 10,
        y: e.clientY - 10,
        duration: 0.4,
        ease: 'power2.out',
        force3D: true,
      })
      gsap.to(cursorDot, {
        x: e.clientX - 3,
        y: e.clientY - 3,
        duration: 0.08,
        force3D: true,
      })
    }

    const handleMouseEnter = () => {
      gsap.to(cursor, {
        scale: 2.5,
        opacity: 0.5,
        duration: 0.25,
      })
    }

    const handleMouseLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        opacity: 1,
        duration: 0.25,
      })
    }

    window.addEventListener('mousemove', moveCursor, { passive: true })

    const interactiveElements = document.querySelectorAll('a, button, .magnetic-btn, [data-cursor-hover]')
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  // Don't render on touch devices
  if (isTouchDevice) return null

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-5 h-5 border border-charcoal rounded-full pointer-events-none z-[10000] mix-blend-difference will-change-transform"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <div
        ref={cursorDotRef}
        className="fixed w-1.5 h-1.5 bg-rust rounded-full pointer-events-none z-[10001] will-change-transform"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  )
}
