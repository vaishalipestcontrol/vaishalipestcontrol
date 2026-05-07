'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/quote', label: 'Get Quote' },
]

export default function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Close menu on route change
  useEffect(() => { setOpen(false) }, [pathname])

  // Add shadow on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 glass transition-shadow duration-300 ${
          scrolled ? 'shadow-md shadow-black/5' : ''
        }`}
      >
        <nav className="flex justify-between items-center px-4 sm:px-6 py-4 max-w-7xl mx-auto">
          {/* Logo */}
          <Link
            href="/"
            className="font-heading font-extrabold text-lg sm:text-xl tracking-tighter text-on-surface z-10"
          >
            <span className="text-primary">V</span>aishali Pest Control
          </Link>

          {/* Desktop nav — hidden on mobile */}
          <div className="hidden md:flex gap-1 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-heading text-sm font-bold tracking-tight px-3 py-2 rounded-lg transition-colors ${
                  pathname === link.href
                    ? 'text-primary bg-primary/5'
                    : 'text-secondary hover:bg-surface-container-highest hover:text-on-surface'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA — hidden on mobile */}
          <Link href="/quote" className="btn-primary hidden md:inline-flex">
            GET QUOTE
          </Link>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-surface-container-highest transition-colors gap-[5px]"
          >
            <span
              className={`block h-0.5 w-6 bg-on-surface rounded-full transition-all duration-300 ${
                open ? 'rotate-45 translate-y-[7px]' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-on-surface rounded-full transition-all duration-300 ${
                open ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-on-surface rounded-full transition-all duration-300 ${
                open ? '-rotate-45 -translate-y-[7px]' : ''
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          open ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-on-surface/30 backdrop-blur-sm transition-opacity duration-300 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Slide-in drawer */}
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-surface-container-lowest shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between px-6 py-5 border-b ghost-border">
            <span className="font-heading font-bold text-on-surface">Menu</span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container-highest transition-colors"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex-1 flex flex-col p-4 gap-1 overflow-y-auto">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-heading font-bold text-base transition-colors ${
                  pathname === link.href
                    ? 'bg-primary/10 text-primary'
                    : 'text-on-surface hover:bg-surface-container-highest'
                }`}
              >
                <span className="material-symbols-outlined text-sm">
                  {link.href === '/'
                    ? 'home'
                    : link.href === '/services'
                    ? 'pest_control'
                    : link.href === '/about'
                    ? 'info'
                    : 'mail'}
                </span>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Drawer footer CTA */}
          <div className="p-4 border-t ghost-border">
            <Link href="/quote" className="btn-primary w-full text-center block">
              GET QUOTE
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
