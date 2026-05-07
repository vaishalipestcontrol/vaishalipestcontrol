'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { logout } from '@/app/admin/(dashboard)/actions';

const adminLinks = [
  { href: '/admin', label: 'Dashboard', icon: 'dashboard' },
  { href: '/admin/services', label: 'Services CMS', icon: 'pest_control' },
  { href: '/admin/testimonials', label: 'Testimonials', icon: 'reviews' },
  { href: '/admin/pages/about', label: 'About Page', icon: 'info' },
  { href: '/admin/contacts', label: 'Quote Requests', icon: 'mail' },
  { href: '/admin/settings', label: 'Change Password', icon: 'lock_reset' },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-surface-container-lowest">
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 bg-surface-container-low border-b ghost-border sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container-highest transition-colors"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
          <span className="font-heading font-bold text-primary">Admin Portal</span>
        </div>
        <Link href="/" className="text-secondary">
          <span className="material-symbols-outlined">home</span>
        </Link>
      </header>

      {/* Sidebar Overlay (Mobile) */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-on-surface/30 backdrop-blur-sm z-50 md:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-[60] w-72 bg-surface-container-low border-r ghost-border flex flex-col transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 md:w-64
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 flex items-center justify-between">
          <h1 className="font-heading font-bold text-xl text-primary">Admin Portal</h1>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container-highest transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {adminLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all
                ${pathname === link.href 
                  ? 'bg-primary/10 text-primary shadow-sm' 
                  : 'text-on-surface hover:bg-surface-container-highest'
                }
              `}
            >
              <span className="material-symbols-outlined text-lg">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t ghost-border space-y-2">
          <form action={logout}>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-error hover:bg-error/10 transition-all">
              <span className="material-symbols-outlined text-lg">logout</span>
              Sign Out
            </button>
          </form>
          <Link href="/" className="flex items-center justify-center gap-2 py-2 text-xs font-bold text-secondary hover:text-primary transition-colors uppercase tracking-widest">
            <span className="material-symbols-outlined text-xs">arrow_back</span>
            Back to Website
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden">
        <div className="min-h-full">
          {children}
        </div>
      </main>
    </div>
  );
}
