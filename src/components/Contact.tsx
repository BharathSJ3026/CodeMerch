'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const floatingImages = [
  { src: '/Web-Design.webp', style: 'top-[5%] left-[5%] sm:left-[15%] w-[28vw] sm:w-[22vw] max-w-[320px] -rotate-6' },
  { src: '/Development.webp', style: 'top-[2%] right-[3%] sm:right-[8%] w-[24vw] sm:w-[16vw] max-w-[240px] rotate-3' },
  { src: '/E-commerce.webp', style: 'bottom-[18%] left-[1%] sm:left-[3%] w-[22vw] sm:w-[13vw] max-w-[200px] rotate-2' },
  { src: '/video_editing.webp', style: 'bottom-[8%] left-[30%] sm:left-[38%] w-[26vw] sm:w-[20vw] max-w-[300px] -rotate-2' },
  { src: '/agentic_web.webp', style: 'bottom-[10%] right-[2%] sm:right-[5%] w-[24vw] sm:w-[17vw] max-w-[260px] rotate-6' },
]

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const formSectionRef = useRef<HTMLDivElement>(null)

  // Dot hover — scale pulse on floating images
  const [dotHovered, setDotHovered] = useState(false)
  const floatImgRefs = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    floatImgRefs.current.forEach((el) => {
      if (!el) return
      gsap.to(el, {
        scale: dotHovered ? 1.05 : 1,
        duration: 0.4,
        ease: 'power2.out',
      })
    })
  }, [dotHovered])

  // Typing effect for email
  const emailRef = useRef<HTMLSpanElement>(null)
  const emailText = 'codemerchstudio@gmail.com'

  useEffect(() => {
    const el = emailRef.current
    if (!el) return

    // Split into individual letter spans
    el.innerHTML = emailText
      .split('')
      .map((char) => `<span class="email-char" style="opacity:0;display:inline-block">${char}</span>`)
      .join('')

    const chars = el.querySelectorAll('.email-char')

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        toggleActions: 'play none none reverse',
      },
    })

    tl.to(chars, {
      opacity: 1,
      duration: 0.03,
      stagger: 0.05,
      ease: 'none',
    })

    return () => { tl.kill() }
  }, [])

  const formRef = useRef<HTMLFormElement>(null)

  // Mouse-following cursor for Submit Form
  const submitCursorRef = useRef<HTMLDivElement>(null)
  const submitAreaRef = useRef<HTMLDivElement>(null)
  const submitCursorPos = useRef({ x: 0, y: 0 })
  const submitTargetPos = useRef({ x: 0, y: 0 })
  const [submitHovered, setSubmitHovered] = useState(false)

  // Mouse-following cursor for Contact Us
  const contactCursorRef = useRef<HTMLDivElement>(null)
  const contactAreaRef = useRef<HTMLDivElement>(null)
  const contactCursorPos = useRef({ x: 0, y: 0 })
  const contactTargetPos = useRef({ x: 0, y: 0 })
  const [contactHovered, setContactHovered] = useState(false)

  const rafId = useRef<number>(0)

  // Smooth cursor animation loop
  const animateCursors = useCallback(() => {
    // Submit cursor
    submitCursorPos.current.x += (submitTargetPos.current.x - submitCursorPos.current.x) * 0.12
    submitCursorPos.current.y += (submitTargetPos.current.y - submitCursorPos.current.y) * 0.12
    if (submitCursorRef.current) {
      submitCursorRef.current.style.transform = `translate(${submitCursorPos.current.x}px, ${submitCursorPos.current.y}px)`
    }

    // Contact cursor
    contactCursorPos.current.x += (contactTargetPos.current.x - contactCursorPos.current.x) * 0.12
    contactCursorPos.current.y += (contactTargetPos.current.y - contactCursorPos.current.y) * 0.12
    if (contactCursorRef.current) {
      contactCursorRef.current.style.transform = `translate(${contactCursorPos.current.x}px, ${contactCursorPos.current.y}px)`
    }

    rafId.current = requestAnimationFrame(animateCursors)
  }, [])

  useEffect(() => {
    rafId.current = requestAnimationFrame(animateCursors)
    return () => cancelAnimationFrame(rafId.current)
  }, [animateCursors])

  // Submit area mouse tracking
  useEffect(() => {
    const area = submitAreaRef.current
    if (!area) return
    const handleMove = (e: MouseEvent) => {
      const rect = area.getBoundingClientRect()
      submitTargetPos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    area.addEventListener('mousemove', handleMove)
    return () => area.removeEventListener('mousemove', handleMove)
  }, [])

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
      // CTA heading reveal
      gsap.from('.cta-heading-line', {
        y: 120,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      })

      // Floating images — cool clip-path reveal + parallax
      gsap.utils.toArray<HTMLElement>('.cta-float-img').forEach((img, i) => {
        gsap.fromTo(img, {
          clipPath: 'inset(100% 0% 0% 0%)',
          opacity: 0,
          scale: 1.15,
        }, {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          scale: 1,
          duration: 1.2,
          delay: 0.2 + i * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        })
        gsap.to(img, {
          y: -30 - i * 15,
          ease: 'none',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        })
      })

      // Form heading
      gsap.from('.form-heading', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: formSectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })

      // Form fields stagger
      gsap.from('.form-field', {
        y: 40,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })

      // Scroll to get in touch text
      gsap.from('.scroll-cta-text', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="bg-coal text-cream overflow-hidden"
    >
      {/* ─── SECTION 1: CTA Hero ─── */}
      <div ref={ctaRef} className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 py-20 overflow-hidden">
        {/* Floating project images */}
        {floatingImages.map((img, i) => (
          <div
            key={i}
            ref={(el) => { if (el) floatImgRefs.current[i] = el }}
            className={`cta-float-img absolute ${img.style} rounded-lg overflow-hidden shadow-2xl will-change-transform`}
            style={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          >
            <Image
              src={img.src}
              alt=""
              width={400}
              height={300}
              quality={75}
              priority
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        ))}

        {/* Main heading */}
        <div className="relative z-10 text-center max-w-[90vw]">
          <h2 className="font-display text-[clamp(2rem,6vw,5rem)] font-bold leading-[1.05] tracking-tight">
            <span className="cta-heading-line block">Let&apos;s chat <span
                  className="inline-block w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 rounded-full bg-rust align-middle cursor-pointer"
                  onMouseEnter={() => setDotHovered(true)}
                  onMouseLeave={() => setDotHovered(false)}
                /> and build</span>
            <span className="cta-heading-line block italic font-light">something beautiful</span>
          </h2>
        </div>

        {/* Scroll to get in touch */}
        <p className="scroll-cta-text absolute bottom-8 sm:bottom-12 font-mono text-xs sm:text-sm tracking-widest text-cream/40">
          Scroll to get in touch
        </p>
      </div>

      {/* ─── SECTION 2: Contact Form ─── */}
      <div ref={formSectionRef} className="relative px-4 sm:px-6 md:px-12 lg:px-20 py-12 sm:py-20 md:py-28">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left side — Form */}
          <div className="w-full lg:w-[55%]">
            <h3 className="form-heading font-display text-lg sm:text-xl md:text-2xl lg:text-3xl font-light italic text-cream/80 mb-8 sm:mb-10 md:mb-12">
              We would love to hear from you.
            </h3>

            <form ref={formRef} className="space-y-4 sm:space-y-5">
              {/* Row 1: First name / Last name */}
              <div className="form-field grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    type="text"
                    className="contact-input w-full bg-cream/[0.06] border border-cream/10 rounded-md px-4 py-3 text-xs sm:text-sm text-cream placeholder:text-cream/30 focus:border-cream/30 focus:outline-none transition-colors"
                    placeholder="First name*"
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    className="contact-input w-full bg-cream/[0.06] border border-cream/10 rounded-md px-4 py-3 text-xs sm:text-sm text-cream placeholder:text-cream/30 focus:border-cream/30 focus:outline-none transition-colors"
                    placeholder="Last name*"
                  />
                </div>
              </div>

              {/* Row 2: Company name / Company email */}
              <div className="form-field grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    type="text"
                    className="contact-input w-full bg-cream/[0.06] border border-cream/10 rounded-md px-4 py-3 text-xs sm:text-sm text-cream placeholder:text-cream/30 focus:border-cream/30 focus:outline-none transition-colors"
                    placeholder="Company name*"
                  />
                </div>
                <div className="relative">
                  <input
                    type="email"
                    className="contact-input w-full bg-cream/[0.06] border border-cream/10 rounded-md px-4 py-3 text-xs sm:text-sm text-cream placeholder:text-cream/30 focus:border-cream/30 focus:outline-none transition-colors"
                    placeholder="Company email*"
                  />
                </div>
              </div>

              {/* Row 3: Company website */}
              <div className="form-field">
                <input
                  type="url"
                  className="contact-input w-full bg-cream/[0.06] border border-cream/10 rounded-md px-4 py-3 text-xs sm:text-sm text-cream placeholder:text-cream/30 focus:border-cream/30 focus:outline-none transition-colors"
                  placeholder="Company website url*"
                />
              </div>

              {/* Row 4: Project description */}
              <div className="form-field">
                <p className="text-xs sm:text-sm text-cream/60 mb-2 sm:mb-3">
                  Tell us about the project (Scope, Timeline, Budget):*
                </p>
                <textarea
                  rows={4}
                  className="contact-input w-full bg-cream/[0.06] border border-cream/10 rounded-md px-4 py-3 text-xs sm:text-sm text-cream placeholder:text-cream/30 focus:border-cream/30 focus:outline-none transition-colors resize-none"
                  placeholder="Type us a message"
                />
              </div>

              {/* Submit button area — mouse-follow "Submit Form" */}
              <div
                ref={submitAreaRef}
                className="form-field relative overflow-hidden rounded-md h-28 sm:h-32 cursor-none"
                style={{ backgroundColor: submitHovered ? '#b8f06a' : '#1a1a1a', transition: 'background-color 0.4s ease' }}
                onMouseEnter={() => setSubmitHovered(true)}
                onMouseLeave={() => setSubmitHovered(false)}
                onClick={() => formRef.current?.requestSubmit()}
              >
                {/* Floating label that follows cursor */}
                <div
                  ref={submitCursorRef}
                  className="absolute top-0 left-0 pointer-events-none z-10 -translate-x-1/2 -translate-y-1/2"
                  style={{ opacity: submitHovered ? 1 : 0, transition: 'opacity 0.3s ease' }}
                >
                  <div className="flex items-center gap-2 bg-coal text-cream px-4 py-2 rounded-full font-mono text-xs whitespace-nowrap border border-cream/20">
                    <span className="w-2 h-2 rounded-full bg-[#b8f06a]" />
                    Submit Form
                  </div>
                </div>

                {/* Static centered label (visible when not hovered) */}
                <div
                  className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
                  style={{ opacity: submitHovered ? 0 : 1 }}
                >
                  <div className="flex items-center gap-2 font-mono text-xs text-cream/50">
                    <span className="w-2 h-2 rounded-full bg-cream/30" />
                    Submit Form
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Right side — Socials */}
          <div className="w-full lg:w-[40%] lg:pt-20">
            <h4 className="font-display text-base sm:text-lg font-medium text-cream/80 mb-6">
              Connect with us
            </h4>
            <div className="space-y-4">
              
              <a
                href="https://www.instagram.com/codemerchstudio/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-cream/50 hover:text-cream transition-colors duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                <span className="font-mono text-sm group-hover:translate-x-1 transition-transform duration-300">Instagram</span>
              </a>
              <a
                href="https://www.linkedin.com/company/codemerchstudio/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-cream/50 hover:text-cream transition-colors duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                <span className="font-mono text-sm group-hover:translate-x-1 transition-transform duration-300">LinkedIn</span>
              </a>
             
              
            </div>

            <div className="mt-10 pt-8 border-t border-cream/10">
              <p className="font-mono text-xs text-cream/40 mb-2">Email us directly</p>
              <a
                href="mailto:codemerchstudio@gmail.com"
                className="font-mono text-sm text-cream/70 hover:text-[#b8f06a] transition-colors duration-300"
              >
                <span ref={emailRef} className="email-typing">codemerchstudio@gmail.com</span>
                <span className="inline-block w-[2px] h-[1em] bg-cream/70 ml-[1px] animate-pulse align-middle" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
