'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about-track' },
  { label: 'Services', href: '#services-anchor' },
  { label: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuVisible, setMenuVisible] = useState(false)
  const linksContainerRef = useRef<HTMLDivElement>(null)
  const linksWrapperRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial reveal animation
      gsap.from('.nav-pill', {
        y: -100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.5
      })

      // Scroll animation to collapse nav
      ScrollTrigger.create({
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        onUpdate: (self) => {
          const shouldCollapse = self.scroll() > 1

          if (shouldCollapse) {
            gsap.to(linksContainerRef.current, {
              width: 0,
              paddingLeft: 0,
              paddingRight: 0,
              opacity: 0,
              marginLeft: 0,
              marginRight: 0,
              duration: 0.18,
              ease: 'power2.out',
              overwrite: true,
            })
          } else {
            gsap.to(linksContainerRef.current, {
              width: 'auto',
              paddingLeft: '0.5rem',
              paddingRight: '0.5rem',
              marginLeft: '0.25rem',
              marginRight: '0.25rem',
              opacity: 1,
              duration: 0.22,
              ease: 'power2.out',
              overwrite: true,
            })
          }
        }
      })
    })

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      setMenuVisible(true)
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuRef.current) return

    gsap.killTweensOf([menuRef.current, '.mobile-link', buttonRef.current])

    if (menuOpen) {
      gsap.set(menuRef.current, {
        clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
      })
      gsap.to(menuRef.current, {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 85%)',
        duration: 0.6,
        ease: 'power4.inOut',
      })
      gsap.fromTo(
        '.mobile-link',
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.08,
          delay: 0.15,
          ease: 'power3.out',
        }
      )
      gsap.to(buttonRef.current, { rotation: 90, duration: 0.2, ease: 'power2.out' })
      return
    }

    const tl = gsap.timeline({
      onComplete: () => setMenuVisible(false),
    })

    tl.to('.mobile-link', {
      y: 40,
      opacity: 0,
      duration: 0.25,
      stagger: 0.05,
      ease: 'power2.in',
    })
    tl.to(
      menuRef.current,
      {
        clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
        duration: 0.45,
        ease: 'power4.inOut',
      },
      0.05
    )
    gsap.to(buttonRef.current, { rotation: 0, duration: 0.2, ease: 'power2.out' })
  }, [menuOpen, menuVisible])

  return (
    <>
      <nav className="fixed top-4 left-0 right-0 z-50 flex justify-end items-center pointer-events-none pr-4 sm:pr-6 md:pr-8">
        
        {/* Logo Pill */}
        <div className="nav-pill pointer-events-auto relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/5 rounded-lg blur-[1px]"></div>
          <Link 
            href="/" 
            className="relative block rounded-lg bg-[#1A1A1A]/90 backdrop-blur-md border border-white/10 px-5 py-3 text-[#F5F0E8] transition-colors hover:bg-[#1A1A1A] min-h-[46px] flex items-center"
          >
            <span className="font-display font-bold tracking-tight text-sm">CODEMERCH<span className="text-[#D4552A]">.</span></span>
          </Link>
        </div>

        {/* Links Pill */}
        <div 
          ref={linksContainerRef}
          className="nav-pill pointer-events-auto overflow-hidden mx-1"
        >
          <div className="h-[46px] rounded-lg bg-[#1A1A1A]/90 backdrop-blur-md border border-white/10 text-[#F5F0E8] flex items-center relative">
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/5 rounded-lg blur-[1px] -z-10"></div>
            <div ref={linksWrapperRef} className="flex items-center gap-1 whitespace-nowrap px-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 text-xs font-mono tracking-wide hover:text-[#D4552A] transition-colors rounded-md hover:bg-white/5"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Toggle Pill */}
        <div className="nav-pill pointer-events-auto relative">
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/5 rounded-lg blur-[1px]"></div>
          <button
            ref={buttonRef}
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative flex items-center justify-center rounded-lg bg-[#1A1A1A]/90 backdrop-blur-md border border-white/10 text-[#F5F0E8] hover:bg-[#1A1A1A] hover:text-[#D4552A] transition-colors px-5 py-3 min-h-[46px]"
            aria-label="Toggle menu"
          >
            <span className="font-bold text-lg -mt-2 tracking-widest leading-none">...</span>
          </button>
        </div>
      </nav>

      {/* Full Screen Menu Overlay */}
      {menuVisible && (
        <div 
          ref={menuRef}
          className="fixed inset-0 z-[100] bg-[#1A1A1A] text-[#F5F0E8]"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
        >
          <div className="h-full flex flex-col items-center justify-center gap-8 relative overflow-hidden">
            {/* Background noise/grain could go here */}
            
            {navLinks.map((link, i) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="mobile-link group flex items-baseline gap-4 hover:opacity-100 opacity-100"
              >
                 <span className="font-mono text-sm text-[#D4552A] opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-4 group-hover:translate-x-0 duration-300">
                    0{i + 1}
                 </span>
                 <span className="font-display text-5xl md:text-7xl font-bold uppercase hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#F5F0E8] hover:to-[#999] transition-all duration-300">
                    {link.label}
                 </span>
              </Link>
            ))}

            <button 
              onClick={() => setMenuOpen(false)}
              className="mt-12 text-sm font-mono opacity-50 hover:opacity-100 transition-opacity uppercase tracking-widest"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}
