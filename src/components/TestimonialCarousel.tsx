'use client'

import { useState, useEffect, useRef } from 'react'

interface Testimonial {
  id: string
  author_name: string
  author_role: string
  content: string
  rating: number
  avatar_color: string
  avatar_url?: string
}

export default function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll logic
  useEffect(() => {
    if (isPaused || testimonials.length <= 1) return

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isPaused, testimonials.length])

  // Sync scroll position with active index
  useEffect(() => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.offsetWidth * activeIndex
      scrollRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      })
    }
  }, [activeIndex])

  if (!testimonials || testimonials.length === 0) return null

  return (
    <div 
      className="relative max-w-4xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Testimonials Container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-hidden snap-x snap-mandatory scroll-smooth"
      >
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="min-w-full snap-center px-4"
          >
            <div className="bg-white p-8 sm:p-12 rounded-[2rem] sm:rounded-[2.5rem] relative flex flex-col items-center text-center border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] overflow-hidden">
              
              {/* Decorative Quotes Icon in Background */}
              <span className="material-symbols-outlined text-primary/5 text-9xl absolute -top-4 -left-6 select-none pointer-events-none">
                format_quote
              </span>
              <span className="material-symbols-outlined text-primary/5 text-9xl absolute -bottom-6 -right-6 select-none pointer-events-none rotate-180">
                format_quote
              </span>

              {/* Profile / Avatar with glowing gradient border */}
              <div className="relative mb-6 z-10">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-gradient-to-tr from-primary to-emerald-500 shadow-md">
                  <div 
                    className="w-full h-full rounded-full overflow-hidden border-2 border-white flex items-center justify-center"
                    style={{ backgroundColor: !t.avatar_url ? t.avatar_color : 'transparent' }}
                  >
                    {t.avatar_url ? (
                      <img src={t.avatar_url} alt={t.author_name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="material-symbols-outlined text-4xl text-white/90">person</span>
                    )}
                  </div>
                </div>
                {/* Floating mini verified check badge */}
                <div className="absolute -bottom-1 -right-1 bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  <span className="material-symbols-outlined text-xs font-bold">check</span>
                </div>
              </div>

              {/* Content Block */}
              <div className="relative z-10 max-w-2xl">
                {/* Rating Stars */}
                <div className="flex justify-center gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span 
                      key={i} 
                      className={`material-symbols-outlined text-xl sm:text-2xl ${
                        i < t.rating ? 'text-amber-400 fill-1' : 'text-slate-200'
                      }`}
                    >
                      star
                    </span>
                  ))}
                </div>

                {/* Highly readable, medium sized testimonial message */}
                <blockquote className="text-slate-600 text-base sm:text-lg md:text-xl font-medium leading-relaxed mb-6">
                  &ldquo;{t.content}&rdquo;
                </blockquote>

                {/* Author Info */}
                <div className="border-t border-slate-100/80 pt-5 mt-5">
                  <p className="font-heading font-black text-slate-900 text-lg tracking-tight">
                    {t.author_name}
                  </p>
                  <p className="text-[10px] sm:text-xs text-primary font-extrabold uppercase tracking-widest mt-1">
                    {t.author_role}
                  </p>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Navigation Indicators */}
      {testimonials.length > 1 && (
        <div className="flex justify-center gap-2.5 mt-8 relative z-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-2 rounded-full transition-all duration-500 ${
                activeIndex === i ? 'w-10 bg-primary' : 'w-2 bg-primary/20 hover:bg-primary/40'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
