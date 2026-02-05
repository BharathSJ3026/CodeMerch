'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const emailRef = useRef<HTMLAnchorElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.from(headingRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })

      // Email link animation
      gsap.from(emailRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: emailRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })

      // Form fields stagger
      gsap.from('.form-field', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })

      // Email hover effect
      const emailEl = emailRef.current
      if (emailEl) {
        emailEl.addEventListener('mouseenter', () => {
          gsap.to(emailEl, { 
            scale: 1.02, 
            color: '#D4552A',
            duration: 0.3 
          })
        })
        emailEl.addEventListener('mouseleave', () => {
          gsap.to(emailEl, { 
            scale: 1, 
            color: '#1A1A1A',
            duration: 0.3 
          })
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 bg-charcoal text-cream overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20">
        {/* Left column */}
        <div>
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
            <span className="font-mono text-xs sm:text-sm tracking-widest text-cream/60">04</span>
            <span className="w-8 sm:w-12 h-px bg-rust" />
            <span className="font-mono text-xs sm:text-sm tracking-widest text-cream/60">GET IN TOUCH</span>
          </div>

          <h2
            ref={headingRef}
            className="font-display text-[clamp(2rem,8vw,5rem)] font-bold leading-[0.95] tracking-tight mb-6 sm:mb-8 md:mb-12 will-change-transform"
          >
            Let&apos;s create
            <br />
            <span className="text-stroke-cream">something</span>
            <br />
            extraordinary
          </h2>

          <div className="mb-8 sm:mb-10 md:mb-12">
            <p className="font-mono text-xs sm:text-sm tracking-widest text-cream/60 mb-2 sm:mb-4">EMAIL US</p>
            <a
              ref={emailRef}
              href="mailto:hello@codemerch.studio"
              className="font-display text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold transition-colors break-all sm:break-normal"
              data-cursor-hover
            >
              hello@codemerch.studio
            </a>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            <div>
              <p className="font-mono text-xs sm:text-sm tracking-widest text-cream/60 mb-2 sm:mb-4">LOCATION</p>
              <p className="text-sm sm:text-base text-cream/80">New York, NY</p>
              <p className="text-sm sm:text-base text-cream/80">& Worldwide</p>
            </div>
            <div>
              <p className="font-mono text-xs sm:text-sm tracking-widest text-cream/60 mb-2 sm:mb-4">SOCIALS</p>
              <div className="space-y-1 sm:space-y-2">
                <a href="#" className="block text-sm sm:text-base text-cream/80 hover:text-rust transition-colors link-underline w-fit">
                  Twitter/X
                </a>
                <a href="#" className="block text-sm sm:text-base text-cream/80 hover:text-rust transition-colors link-underline w-fit">
                  LinkedIn
                </a>
                <a href="#" className="block text-sm sm:text-base text-cream/80 hover:text-rust transition-colors link-underline w-fit">
                  Dribbble
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right column - Form */}
        <div className="lg:pt-16 xl:pt-24">
          <form ref={formRef} className="space-y-5 sm:space-y-6 md:space-y-8">
            <div className="form-field">
              <label className="block font-mono text-xs sm:text-sm tracking-widest text-cream/60 mb-2 sm:mb-3">
                YOUR NAME
              </label>
              <input
                type="text"
                className="w-full bg-transparent border-b border-cream/30 py-2 sm:py-3 text-base sm:text-lg focus:border-rust focus:outline-none transition-colors placeholder:text-cream/30"
                placeholder="John Doe"
              />
            </div>

            <div className="form-field">
              <label className="block font-mono text-xs sm:text-sm tracking-widest text-cream/60 mb-2 sm:mb-3">
                YOUR EMAIL
              </label>
              <input
                type="email"
                className="w-full bg-transparent border-b border-cream/30 py-2 sm:py-3 text-base sm:text-lg focus:border-rust focus:outline-none transition-colors placeholder:text-cream/30"
                placeholder="john@company.com"
              />
            </div>

            <div className="form-field">
              <label className="block font-mono text-xs sm:text-sm tracking-widest text-cream/60 mb-2 sm:mb-3">
                PROJECT TYPE
              </label>
              <select className="w-full bg-transparent border-b border-cream/30 py-2 sm:py-3 text-base sm:text-lg focus:border-rust focus:outline-none transition-colors cursor-pointer">
                <option value="" className="bg-charcoal">Select a service</option>
                <option value="web-design" className="bg-charcoal">Web Design</option>
                <option value="development" className="bg-charcoal">Development</option>
                <option value="branding" className="bg-charcoal">Branding</option>
                <option value="ecommerce" className="bg-charcoal">E-Commerce</option>
              </select>
            </div>

            <div className="form-field">
              <label className="block font-mono text-xs sm:text-sm tracking-widest text-cream/60 mb-2 sm:mb-3">
                TELL US MORE
              </label>
              <textarea
                rows={3}
                className="w-full bg-transparent border-b border-cream/30 py-2 sm:py-3 text-base sm:text-lg focus:border-rust focus:outline-none transition-colors resize-none placeholder:text-cream/30"
                placeholder="Brief description of your project..."
              />
            </div>

            <button
              type="submit"
              className="form-field group relative inline-flex items-center gap-3 sm:gap-4 bg-rust text-cream px-6 sm:px-8 py-3 sm:py-4 mt-4 sm:mt-6 md:mt-8 overflow-hidden"
              data-cursor-hover
            >
              <span className="relative z-10 font-mono text-xs sm:text-sm tracking-wide">
                SEND MESSAGE
              </span>
              <span className="relative z-10 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-r-2 border-cream rotate-45 group-hover:translate-x-2 transition-transform" />
              <div className="absolute inset-0 bg-mustard -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
