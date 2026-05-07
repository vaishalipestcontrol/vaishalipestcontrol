import { login } from '@/app/admin/login/actions'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface-container-lowest p-4 sm:p-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[120px]" />

      {/* Brand */}
      <Link href="/" className="flex items-center gap-2 mb-10 z-10 group">
        <span className="material-symbols-outlined text-primary text-3xl group-hover:rotate-12 transition-transform">shield_moon</span>
        <span className="font-heading font-black text-2xl tracking-tighter text-on-surface">
          Vaishali <span className="text-primary">Pest Control</span>
        </span>
      </Link>

      <div className="w-full max-w-md bg-surface-container-low p-8 sm:p-10 rounded-[2.5rem] shadow-2xl shadow-black/5 ghost-border z-10 backdrop-blur-sm relative">
        <div className="text-center mb-8">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-4">
            Security Protocol
          </span>
          <h1 className="text-3xl font-heading font-black text-on-surface tracking-tight">Admin Access</h1>
          <p className="text-secondary text-sm mt-2">Authorization required for CMS management</p>
        </div>
        
        <form className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="form-label text-xs uppercase tracking-widest font-black opacity-60 ml-1">Email Address</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-secondary/40 text-lg">mail</span>
              <input 
                id="email" 
                name="email" 
                type="email" 
                required 
                className="form-input pl-11 bg-white" 
                placeholder="admin@vaishali.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="form-label text-xs uppercase tracking-widest font-black opacity-60 ml-1">Secure Password</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-secondary/40 text-lg">lock</span>
              <input 
                id="password" 
                name="password" 
                type="password" 
                required 
                className="form-input pl-11 bg-white" 
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            formAction={login} 
            className="w-full btn-primary py-4 text-xs font-black tracking-[0.2em] shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-[0.98]"
          >
            INITIALIZE SESSION
          </button>
        </form>

        <div className="mt-10 pt-6 border-t ghost-border text-center">
          <p className="text-[10px] text-secondary/50 font-bold uppercase tracking-widest">
            Protected by Clinical Grade Security
          </p>
        </div>
      </div>

      {/* Footer links */}
      <div className="mt-8 flex gap-6 z-10">
        <Link href="/" className="text-xs font-bold text-secondary hover:text-primary transition-colors uppercase tracking-widest">
          Website Home
        </Link>
        <Link href="/quote" className="text-xs font-bold text-secondary hover:text-primary transition-colors uppercase tracking-widest">
          Public Inquiries
        </Link>
      </div>
    </div>
  )
}
