import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full pt-20 pb-10 bg-[#060a0f] text-white/90 border-t border-white/5 selection:bg-primary-container selection:text-on-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <span className="material-symbols-outlined text-primary-container text-3xl group-hover:rotate-12 transition-transform">shield_moon</span>
              <span className="font-heading font-black text-2xl tracking-tighter text-white">
                Vaishali <span className="text-primary-container">Pest Control</span>
              </span>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              Providing expert property protection across Mumbai for over 15 years. We specialize in high-efficacy, eco-safe pest management solutions tailored for your peace of mind.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.25em] !text-primary-container mb-8">Directory</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/services" className="text-sm text-white/60 hover:text-white transition-colors">Specialized Services</Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-white/60 hover:text-white transition-colors">Our Clinical Mission</Link>
              </li>
              <li>
                <Link href="/quote" className="text-sm text-white/60 hover:text-white transition-colors">Request Assessment</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.25em] !text-primary-container mb-8">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary-container text-xl shrink-0">location_on</span>
                <span className="text-sm text-white/60 leading-relaxed">123 Clinical Plaza, Hygiene Way,<br />Mumbai, Maharashtra</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="material-symbols-outlined text-primary-container text-xl shrink-0">call</span>
                <span className="text-sm text-white/60">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="material-symbols-outlined text-primary-container text-xl shrink-0">mail</span>
                <span className="text-sm text-white/60">support@vaishali.com</span>
              </li>
            </ul>
          </div>

          {/* Social / Certs */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.25em] !text-primary-container mb-8">Certification</h4>
            <div className="flex flex-wrap gap-4 mb-10 opacity-60">
              <div className="flex flex-col items-center gap-1">
                <span className="material-symbols-outlined text-2xl text-primary-container">verified</span>
                <span className="text-[8px] font-black text-white/40 uppercase tracking-tighter">ISO</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="material-symbols-outlined text-2xl text-primary-container">eco</span>
                <span className="text-[8px] font-black text-white/40 uppercase tracking-tighter">ECO</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="material-symbols-outlined text-2xl text-primary-container">security</span>
                <span className="text-[8px] font-black text-white/40 uppercase tracking-tighter">BIO</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="material-symbols-outlined text-2xl text-primary-container">health_and_safety</span>
                <span className="text-[8px] font-black text-white/40 uppercase tracking-tighter">WHO</span>
              </div>
            </div>
            <Link href="/quote" className="inline-block w-full text-center text-[10px] font-black uppercase tracking-[0.2em] px-6 py-4 bg-primary-container text-[#060a0f] rounded-2xl hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-primary-container/10">
              EMERGENCY RESPONSE
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-[9px] text-white/30 font-black uppercase tracking-[0.2em]">
            © {currentYear} Vaishali Pest Control Services. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8">
            <Link href="#" className="text-[9px] text-white/30 hover:text-primary-container font-black uppercase tracking-[0.2em] transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-[9px] text-white/30 hover:text-primary-container font-black uppercase tracking-[0.2em] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
