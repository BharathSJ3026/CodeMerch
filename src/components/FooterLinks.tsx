'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const siteLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
]

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/codemerchstudio?igsh=dm03djE0ajdsOGdv' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/codemerchstudio/' },
]

export default function FooterLinks() {
  const sectionRef = useRef<HTMLElement>(null)

  // Contact Us mouse-follow cursor
  const contactCursorRef = useRef<HTMLDivElement>(null)
  const contactAreaRef = useRef<HTMLDivElement>(null)
  const contactCursorPos = useRef({ x: 0, y: 0 })
  const contactTargetPos = useRef({ x: 0, y: 0 })
  const [contactHovered, setContactHovered] = useState(false)
  const rafId = useRef<number>(0)

  // Smooth cursor animation loop
  const animateCursor = useCallback(() => {
    contactCursorPos.current.x += (contactTargetPos.current.x - contactCursorPos.current.x) * 0.12
    contactCursorPos.current.y += (contactTargetPos.current.y - contactCursorPos.current.y) * 0.12
    if (contactCursorRef.current) {
      contactCursorRef.current.style.transform = `translate(${contactCursorPos.current.x}px, ${contactCursorPos.current.y}px)`
    }
    rafId.current = requestAnimationFrame(animateCursor)
  }, [])

  useEffect(() => {
    rafId.current = requestAnimationFrame(animateCursor)
    return () => cancelAnimationFrame(rafId.current)
  }, [animateCursor])

  // Contact area mouse tracking
  useEffect(() => {
    const area = contactAreaRef.current
    if (!area) return
    const handleMove = (e: MouseEvent) => {
      const rect = area.getBoundingClientRect()
      contactTargetPos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    area.addEventListener('mousemove', handleMove)
    return () => area.removeEventListener('mousemove', handleMove)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.footer-links-item', {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="bg-coal text-cream border-t border-cream/10 px-4 sm:px-6 md:px-12 py-10 sm:py-14 md:py-16"
    >
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1.5fr] gap-10 md:gap-8 lg:gap-12">
        {/* Site Index */}
        <div className="footer-links-item">
          <h4 className="font-display text-base sm:text-lg font-semibold mb-4 sm:mb-6">Site index</h4>
          <ul className="space-y-2 sm:space-y-3">
            {siteLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-sm text-cream/50 hover:text-cream transition-colors duration-200">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div className="footer-links-item">
          <h4 className="font-display text-base sm:text-lg font-semibold mb-4 sm:mb-6">Social</h4>
          <ul className="space-y-2 sm:space-y-3">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-cream/50 hover:text-cream transition-colors duration-200">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right side — Contact Us + info */}
        <div className="footer-links-item flex flex-col gap-5 sm:gap-6">
          {/* Contact Us button area — mouse-follow */}
          <div
            ref={contactAreaRef}
            className="relative overflow-hidden rounded-lg h-28 sm:h-32 cursor-none"
            style={{ backgroundColor: contactHovered ? '#b8f06a' : '#1a1a1a', transition: 'background-color 0.4s ease' }}
            onMouseEnter={() => setContactHovered(true)}
            onMouseLeave={() => setContactHovered(false)}
            onClick={() => {
              const contactSection = document.getElementById('contact')
              contactSection?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            {/* Floating label that follows cursor */}
            <div
              ref={contactCursorRef}
              className="absolute top-0 left-0 pointer-events-none z-10 -translate-x-1/2 -translate-y-1/2"
              style={{ opacity: contactHovered ? 1 : 0, transition: 'opacity 0.3s ease' }}
            >
              <div className="flex items-center gap-2 bg-coal text-cream px-5 py-2.5 rounded-full font-mono text-sm whitespace-nowrap border border-cream/20">
                <span className="w-2 h-2 rounded-full bg-[#b8f06a]" />
                Contact Us
              </div>
            </div>

            {/* Static centered label (visible when not hovered) */}
            <div
              className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
              style={{ opacity: contactHovered ? 0 : 1 }}
            >
              <div className="flex items-center gap-2 font-mono text-sm text-cream/50">
                Contact Us
                <span className="w-2 h-2 rounded-full bg-cream/30" />
              </div>
            </div>
          </div>

          {/* Contact info */}
          <div>
            <p className="text-sm text-cream/50 leading-relaxed">
              Tell us about your project.
              <br />
              Let&apos;s collaborate.
            </p>
            <div className="mt-3 space-y-1">
              <a href="mailto:codemerchstudio@gmail.com" className="flex items-center gap-2 text-sm text-cream/70 hover:text-cream transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-rust" />
                Write Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-10 sm:mt-14 pt-6 border-t border-cream/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-cream/30">
          &copy; {new Date().getFullYear()} CodeMerch Studio. All rights reserved.
        </p>
        <p className="font-mono text-xs text-cream/30">
          Crafted with precision
        </p>
      </div>
    </section>
  )
}
