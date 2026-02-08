'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    number: '01',
    title: 'Web Design',
    description: 'Bespoke digital experiences that captivate and convert.',
    tags: ['UI/UX', 'Prototyping', 'Design Systems'],
    bgColor: '#FAF3E1',
    textColor: '#222222',
    accentColor: '#D4552A'
  },
  {
    number: '02',
    title: 'Development',
    description: 'Clean, performant code that brings designs to life.',
    tags: ['React', 'Next.js', 'Node.js'],
    bgColor: '#F5E7C6',
    textColor: '#222222',
    accentColor: '#D4552A'
  },
  {
    number: '03',
    title: 'Branding',
    description: 'Identity systems that tell your story.',
    tags: ['Logo Design', 'Guidelines', 'Strategy'],
    bgColor: '#FA8112',
    textColor: '#222222',
    accentColor: '#FAF3E1'
  },
  {
    number: '04',
    title: 'E-Commerce',
    description: 'Online stores built to sell.',
    tags: ['Shopify', 'Custom Builds', 'Conversion'],
    bgColor: '#222222',
    textColor: '#FAF3E1',
    accentColor: '#FA8112'
  },
]

export default function Services() {
  const containerRef = useRef<HTMLElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = itemsRef.current
      const totalItems = items.length

      const updateActiveIndex = (progress: number) => {
        const index = Math.min(
          Math.floor(progress * totalItems),
          totalItems - 1
        )
        setActiveIndex(index)
      }

      const mm = gsap.matchMedia()

      mm.add('(max-width: 768px)', () => {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${totalItems * 70}%`,
          pin: true,
          scrub: 0.4,
          snap: {
            snapTo: 1 / (totalItems - 1),
            duration: 0.2,
            ease: 'power2.out',
          },
          onUpdate: (self) => updateActiveIndex(self.progress),
        })
      })

      mm.add('(min-width: 769px)', () => {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${totalItems * 100}%`,
          pin: true,
          scrub: 1,
          onUpdate: (self) => updateActiveIndex(self.progress),
        })
      })

      return () => mm.revert()
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* Anchor for navigation routing to ensure it lands at the start of the section */}
      <div id="services-anchor" className="absolute -mt-[100vh] h-[1px] w-full pointer-events-none" />
      
      <section
        ref={containerRef}
        id="services"
      className="relative z-20 min-h-screen rounded-t-[3rem] overflow-hidden -mt-[100vh] shadow-[0_-25px_50px_-12px_rgba(0,0,0,0.5)] transition-colors duration-700 ease-in-out"
      style={{ backgroundColor: services[activeIndex].bgColor }}
    >
      <div className="h-full flex flex-col justify-between py-12 px-4 sm:px-6 md:px-12">
        <div className="flex justify-center mb-8">
            <h2 
                className="font-display text-[clamp(2rem,6vw,4rem)] font-bold uppercase tracking-tight transition-colors duration-500"
                style={{ color: services[activeIndex].textColor }}
            >
                What We Offer.
            </h2>
        </div>

        <div className="flex-1 flex flex-col gap-4">
          {services.map((service, i) => {
            const isActive = i === activeIndex
            return (
              <div
                key={service.number}
                ref={(el) => { itemsRef.current[i] = el }}
                className={`relative w-full min-h-[72px] sm:min-h-[96px] transition-all duration-700 ease-in-out flex flex-col justify-center overflow-hidden ${
                  isActive ? 'flex-[2]' : 'flex-[1] opacity-60'
                }`}
                style={{ 
                    color: service.textColor 
                }}
              >
                {/* Background Marquee Text */}
                <div className="absolute inset-0 flex items-center opacity-10 pointer-events-none select-none overflow-hidden">
                    <div className={`flex whitespace-nowrap ${isActive ? 'animate-marquee' : ''}`}>
                        {[...Array(4)].map((_, idx) => (
                              <span key={idx} className="font-display font-black text-[7vh] sm:text-[10vh] md:text-[15vh] uppercase px-4">
                            {service.title} • {service.title} •
                          </span>
                        ))}
                    </div>
                </div>

                <div className="relative z-10 flex items-center justify-between px-4">
                    <div className="flex items-baseline gap-6">
                        <span className="font-mono text-sm sm:text-base">{service.number}</span>
                        <h3 className={`font-display font-bold uppercase transition-all duration-500 ${
                            isActive ? 'text-4xl sm:text-6xl' : 'text-2xl sm:text-3xl'
                        }`}>
                            {service.title}
                        </h3>
                    </div>
                    
                    <div className={`flex flex-col items-end gap-2 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0 hidden sm:flex'}`}>
                         <p className="font-mono text-xs sm:text-sm max-w-xs text-right hidden md:block">
                            {service.description}
                         </p>
                         <div className="flex gap-2">
                             {service.tags.map(tag => (
                                 <span key={tag} className="text-[10px] uppercase border px-2 py-1 rounded-full" style={{ borderColor: service.textColor }}>
                                     {tag}
                                 </span>
                             ))}
                         </div>
                    </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </section>
    </>
  )
}
