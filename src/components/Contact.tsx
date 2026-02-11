'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const floatingImages = [
  { srcs: ['/Web-Design.webp', '/PropLanding.webp'], style: 'top-[5%] left-[15%] w-[22vw] max-w-[320px] -rotate-6' },
  { srcs: ['/Development.webp', '/Studbuddy.webp'], style: 'top-[2%] right-[8%] w-[16vw] max-w-[240px] rotate-3' },
  { srcs: ['/E-commerce.webp', '/obsidian_landing.webp'], style: 'bottom-[18%] left-[3%] w-[13vw] max-w-[200px] rotate-2' },
  { srcs: ['/video_editing.webp', '/propdashboard.webp'], style: 'bottom-[8%] left-[38%] w-[20vw] max-w-[300px] -rotate-2' },
  { srcs: ['/agentic_web.webp', '/Studybuddydash.webp'], style: 'bottom-[10%] right-[5%] w-[17vw] max-w-[260px] rotate-6' },
]

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const formSectionRef = useRef<HTMLDivElement>(null)

  // Dot hover — orbit floating images with GSAP
  const [dotHovered, setDotHovered] = useState(false)
  const orbitTlRef = useRef<gsap.core.Timeline | null>(null)
  const floatImgRefs = useRef<HTMLDivElement[]>([])

  // Build / kill orbit timeline when dot hover state changes
  useEffect(() => {
    if (dotHovered && floatImgRefs.current.length > 0) {
      const tl = gsap.timeline({ repeat: -1 })

      floatImgRefs.current.forEach((el, i) => {
        if (!el) return
        const imgA = el.querySelector('.float-img-a') as HTMLElement
        const imgB = el.querySelector('.float-img-b') as HTMLElement
        if (!imgA || !imgB) return

        const delay = i * 0.15 // stagger each image

        // Crossfade A → B with a scale pulse
        tl.to(imgA, { opacity: 0, duration: 0.6, ease: 'power2.inOut' }, delay)
        tl.to(imgB, { opacity: 1, duration: 0.6, ease: 'power2.inOut' }, delay)
        tl.fromTo(el, { scale: 1 }, { scale: 1.05, duration: 0.3, yoyo: true, repeat: 1, ease: 'power1.inOut' }, delay)

        // Hold image B
        // Crossfade B → A
        tl.to(imgB, { opacity: 0, duration: 0.6, ease: 'power2.inOut' }, 2.5 + delay)
        tl.to(imgA, { opacity: 1, duration: 0.6, ease: 'power2.inOut' }, 2.5 + delay)
        tl.fromTo(el, { scale: 1 }, { scale: 1.05, duration: 0.3, yoyo: true, repeat: 1, ease: 'power1.inOut' }, 2.5 + delay)
      })

      // Pad total duration for clean repeat
      tl.to({}, { duration: 5 }, 0)

      orbitTlRef.current = tl
    } else {
      // Kill timeline — freeze images at whatever state they're in
      if (orbitTlRef.current) {
        orbitTlRef.current.kill()
        orbitTlRef.current = null
      }
      // Only reset scale, keep current image opacity as-is
      floatImgRefs.current.forEach((el) => {
        if (!el) return
        gsap.to(el, { scale: 1, duration: 0.3, ease: 'power2.out' })
      })
    }
    return () => {
      if (orbitTlRef.current) {
        orbitTlRef.current.kill()
        orbitTlRef.current = null
      }
    }
  }, [dotHovered])

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

      // Floating images parallax
      gsap.utils.toArray<HTMLElement>('.cta-float-img').forEach((img, i) => {
        gsap.from(img, {
          y: 60 + i * 20,
          opacity: 0,
          duration: 0.8,
          delay: 0.3 + i * 0.12,
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
        {/* Floating project images with circular motion on dot hover */}
        {floatingImages.map((img, i) => (
          <div
            key={i}
            className={`cta-float-img absolute ${img.style} rounded-lg overflow-hidden shadow-2xl hidden md:block will-change-transform`}
          >
            {/* Inner wrapper — orbit motion is applied here to avoid conflict with scroll parallax on outer div */}
            <div
              ref={(el) => { if (el) floatImgRefs.current[i] = el }}
              className="orbit-wrap relative w-full"
            >
              {/* First image — relative so it gives the container height */}
              <img
                src={img.srcs[0]}
                alt=""
                className="float-img-a w-full object-cover rounded-lg relative"
              />
              {/* Second image — overlaid, initially hidden */}
              <img
                src={img.srcs[1]}
                alt=""
                className="float-img-b w-full h-full object-cover rounded-lg absolute inset-0"
                style={{ opacity: 0 }}
              />
            </div>
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
      <div ref={formSectionRef} className="relative px-4 sm:px-6 md:px-12 lg:px-20 py-16 sm:py-24 md:py-32">
        <h3 className="form-heading font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light italic text-cream/80 mb-10 sm:mb-14 md:mb-16">
          We would love to hear from you.
        </h3>

        <form ref={formRef} className="space-y-6 sm:space-y-8 max-w-full">
          {/* Row 1: First name / Last name */}
          <div className="form-field grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            <div className="relative">
              <input
                type="text"
                className="contact-input w-full bg-cream/[0.06] border border-cream/10 rounded-lg px-5 py-5 text-sm sm:text-base text-cream placeholder:text-cream/30 focus:border-cream/30 focus:outline-none transition-colors"
                placeholder="First name*"
              />
            </div>
            <div className="relative">
              <input
                type="text"
                className="contact-input w-full bg-cream/[0.06] border border-cream/10 rounded-lg px-5 py-5 text-sm sm:text-base text-cream placeholder:text-cream/30 focus:border-cream/30 focus:outline-none transition-colors"
                placeholder="Last name*"
              />
            </div>
          </div>

          {/* Row 2: Company name / Company email */}
          <div className="form-field grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            <div className="relative">
              <input
                type="text"
                className="contact-input w-full bg-cream/[0.06] border border-cream/10 rounded-lg px-5 py-5 text-sm sm:text-base text-cream placeholder:text-cream/30 focus:border-cream/30 focus:outline-none transition-colors"
                placeholder="Company name*"
              />
            </div>
            <div className="relative">
              <input
                type="email"
                className="contact-input w-full bg-cream/[0.06] border border-cream/10 rounded-lg px-5 py-5 text-sm sm:text-base text-cream placeholder:text-cream/30 focus:border-cream/30 focus:outline-none transition-colors"
                placeholder="Company email*"
              />
            </div>
          </div>

          {/* Row 3: Company website */}
          <div className="form-field">
            <input
              type="url"
              className="contact-input w-full bg-cream/[0.06] border border-cream/10 rounded-lg px-5 py-5 text-sm sm:text-base text-cream placeholder:text-cream/30 focus:border-cream/30 focus:outline-none transition-colors"
              placeholder="Company website url*"
            />
          </div>

          {/* Row 4: Project description */}
          <div className="form-field">
            <p className="text-sm sm:text-base text-cream/60 mb-3 sm:mb-4">
              Tell us about the project (Scope, Timeline, Budget):*
            </p>
            <textarea
              rows={6}
              className="contact-input w-full bg-cream/[0.06] border border-cream/10 rounded-lg px-5 py-5 text-sm sm:text-base text-cream placeholder:text-cream/30 focus:border-cream/30 focus:outline-none transition-colors resize-none"
              placeholder="Type us a message"
            />
          </div>

          {/* Submit button area — mouse-follow "Submit Form" */}
          <div
            ref={submitAreaRef}
            className="form-field relative overflow-hidden rounded-lg h-40 sm:h-48 cursor-none"
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
              <div className="flex items-center gap-2 bg-coal text-cream px-5 py-2.5 rounded-full font-mono text-sm whitespace-nowrap border border-cream/20">
                <span className="w-2 h-2 rounded-full bg-[#b8f06a]" />
                Submit Form
              </div>
            </div>

            {/* Static centered label (visible when not hovered) */}
            <div
              className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
              style={{ opacity: submitHovered ? 0 : 1 }}
            >
              <div className="flex items-center gap-2 font-mono text-sm text-cream/50">
                <span className="w-2 h-2 rounded-full bg-cream/30" />
                Submit Form
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
