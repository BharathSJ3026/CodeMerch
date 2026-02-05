'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'

const navLinks = [
  { label: 'WORK', href: '#work' },
  { label: 'ABOUT', href: '#about' },
  { label: 'SERVICES', href: '#services' },
  { label: 'CONTACT', href: '#contact' },
]

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animation
      gsap.from(logoRef.current, {
        y: -50,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out',
      })

      gsap.from('.nav-link', {
        y: -30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.7,
        ease: 'power3.out',
      })
    })

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (menuOpen && menuRef.current) {
      gsap.fromTo(
        menuRef.current,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 0.6, ease: 'power3.inOut' }
      )
      gsap.from('.mobile-link', {
        y: 60,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        delay: 0.3,
        ease: 'power3.out',
      })
    }
  }, [menuOpen])

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 md:py-6 bg-cream/95 backdrop-blur-sm border-b border-charcoal/10"
      >
        <div className="flex items-center justify-between">
          <div ref={logoRef}>
            <Link href="/" className="font-display text-xl md:text-2xl font-bold tracking-tighter text-charcoal">
              CODEMERCH<span className="text-rust">.</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div ref={linksRef} className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="nav-link font-mono text-sm tracking-wide link-underline"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#contact"
              className="nav-link font-mono text-sm bg-charcoal text-cream px-6 py-3 hover:bg-rust transition-colors duration-300"
            >
              LET&apos;S TALK
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 z-[60] relative"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-2 bg-cream' : 'bg-charcoal'
              }`}
            />
            <span
              className={`block w-6 h-0.5 transition-all duration-300 ${
                menuOpen ? 'opacity-0 bg-cream' : 'bg-charcoal'
              }`}
            />
            <span
              className={`block w-6 h-0.5 transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-2 bg-cream' : 'bg-charcoal'
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="fixed inset-0 bg-charcoal z-40 flex flex-col items-start justify-center px-8"
        >
          {navLinks.map((link, i) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="mobile-link font-display text-5xl text-cream py-4 hover:text-rust transition-colors"
            >
              <span className="text-rust font-mono text-sm mr-4">0{i + 1}</span>
              {link.label}
            </Link>
          ))}
          <Link
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mobile-link mt-8 font-mono text-sm bg-rust text-cream px-8 py-4"
          >
            LET&apos;S TALK
          </Link>
        </div>
      )}
    </>
  )
}
