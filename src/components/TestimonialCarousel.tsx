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
    }, 4000)

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
      className="relative"
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
            <div className="bg-surface-container-low p-8 sm:p-12 rounded-[2.5rem] relative flex flex-col md:flex-row gap-8 items-center md:items-start border ghost-border shadow-xl shadow-black/[0.02]">
              {/* Quote Icon Overlay */}
              <span className="material-symbols-outlined text-primary/10 text-8xl absolute top-8 right-12 hidden md:block select-none">
                format_quote
              </span>

              {/* Profile / Avatar */}
              <div className="flex-shrink-0">
                <div 
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-white shadow-lg flex items-center justify-center bg-surface-container-highest"
                  style={{ backgroundColor: !t.avatar_url ? t.avatar_color : 'transparent' }}
                >
                  {t.avatar_url ? (
                    <img src={t.avatar_url} alt={t.author_name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="material-symbols-outlined text-3xl text-white/50">person</span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left z-10">
                {/* Rating */}
                <div className="flex justify-center md:justify-start gap-1 mb-6 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={`material-symbols-outlined text-lg ${i < t.rating ? 'fill-1' : 'opacity-20'}`}>
                      star
                    </span>
                  ))}
                </div>

                {/* Message */}
                <blockquote className="text-xl sm:text-2xl font-sans italic text-on-surface leading-relaxed mb-8">
                  &ldquo;{t.content}&rdquo;
                </blockquote>

                {/* Author */}
                <div>
                  <p className="font-heading font-black text-on-surface text-lg tracking-tight">{t.author_name}</p>
                  <p className="text-xs text-secondary font-black uppercase tracking-widest mt-1">{t.author_role}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Indicators */}
      {testimonials.length > 1 && (
        <div className="flex justify-center gap-3 mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
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
