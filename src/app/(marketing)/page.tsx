import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import TestimonialCarousel from "@/components/TestimonialCarousel";

export default async function Home() {
  const supabase = await createClient()
  
  // Fetch Featured Services
  const { data: featuredServices } = await supabase
    .from('services')
    .select('id, title, slug, short_description, icon, image_url')
    .eq('is_published', true)
    .limit(3)
    .order('created_at', { ascending: true })

  // Fetch Published Testimonials
  const { data: testimonials } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  return (
    <>
      {/* ── Hero Section ─────────────────────────────── */}
      <section className="relative flex items-center overflow-hidden px-4 sm:px-6 pt-28 pb-16 sm:py-24 md:pt-32 md:pb-24 bg-surface-container-low min-h-[600px]">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="z-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[2px] bg-primary" />
              <span className="text-primary font-sans text-[10px] font-black tracking-[0.3em] uppercase">
                Est. 2011 • Expert Solutions
              </span>
            </div>
            <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-on-surface leading-[0.95] tracking-tighter mb-8">
              Expert Protection.<br />
              <span className="text-primary">Total Peace.</span>
            </h1>
            <p className="text-lg sm:text-xl text-on-surface-variant max-w-lg mb-10 leading-relaxed font-medium opacity-80">
              With over 15 years of specialized experience, we provide advanced pest management solutions that are as safe for your family as they are effective against pests.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-5">
              <Link href="/quote" className="btn-primary">
                START ASSESSMENT
              </Link>
              <Link href="/services" className="btn-secondary">
                EXPLORE SOLUTIONS
              </Link>
            </div>

            {/* Trust Logos Row */}
            <div className="mt-16 pt-8 border-t border-on-surface/10">
              <p className="text-[9px] font-black text-secondary uppercase tracking-[0.3em] mb-6 opacity-100">Authorized & Certified By</p>
              <div className="flex flex-wrap gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-2xl">verified</span>
                  <span className="text-[9px] font-black uppercase tracking-widest">ISO 9001</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-2xl">eco</span>
                  <span className="text-[9px] font-black uppercase tracking-widest">Eco-Safe</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-2xl">security</span>
                  <span className="text-[9px] font-black uppercase tracking-widest">Bio-Secure</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-2xl">health_and_safety</span>
                  <span className="text-[9px] font-black uppercase tracking-widest">WHO Grade</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute -inset-10 bg-primary/10 rounded-full blur-[100px] group-hover:bg-primary/15 transition-colors duration-700" />
            <img
              alt="Premium Protected Sanctuary"
              className="relative rounded-[3rem] w-full h-auto shadow-[0_32px_64px_-12px_rgba(0,108,73,0.15)] transform group-hover:-translate-y-2 transition-transform duration-700"
              src="/images/hero.png"
            />
          </div>
        </div>
      </section>

      {/* ── Scientific Advantage ──────────────────────── */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="font-heading text-3xl sm:text-4xl font-black tracking-tight mb-4 text-on-surface">The Vaishali Advantage</h2>
              <p className="text-on-surface-variant text-base sm:text-lg leading-relaxed">
                We believe in a comprehensive approach to pest management that combines cutting-edge technology with time-tested expertise.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-1 bg-primary/10 rounded-full" />
              <div className="w-4 h-1 bg-primary rounded-full" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { icon: 'shield_with_heart', title: 'Eco-Safe Treatments', desc: 'Our protocols are designed to be safe for your loved ones and pets while remaining uncompromising on pest elimination.' },
              { icon: 'verified', title: 'Certified Experts', desc: 'Our team is rigorously trained in the latest pest management techniques to provide you with the highest level of service.' },
              { icon: 'bolt', title: 'Swift Response', desc: 'We understand the urgency of pest issues. Our rapid response team is always ready to restore comfort to your space.' },
            ].map((item) => (
              <div key={item.title} className="group p-10 rounded-[2.5rem] bg-surface-container-low/50 hover:bg-white border ghost-border transition-all hover:shadow-2xl hover:shadow-slate-200/50">
                <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                </div>
                <h3 className="font-heading text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-on-surface-variant leading-relaxed text-sm opacity-80">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Services ──────────────────────────── */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 bg-surface-container-low/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl font-black tracking-tight text-on-surface">Specialized Treatments</h2>
            <Link href="/services" className="btn-tertiary">
              VIEW ALL PROTOCOLS
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {featuredServices && featuredServices.length > 0 ? (
              featuredServices.map((service) => (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className="relative group overflow-hidden rounded-[2.5rem] bg-surface-container-low border ghost-border block"
                >
                  <div className="aspect-[4/5] relative">
                    {service.image_url ? (
                      <img
                        alt={service.title}
                        className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                        src={service.image_url}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-surface-container-highest/20">
                        <span className="material-symbols-outlined text-8xl text-primary/10">{service.icon}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-on-surface/90 via-on-surface/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                    <div className="absolute bottom-0 left-0 p-8 w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <span className="material-symbols-outlined text-primary-container text-4xl mb-4 block group-hover:rotate-12 transition-transform">{service.icon}</span>
                      <h4 className="text-white font-heading text-2xl font-bold mb-2">{service.title}</h4>
                      <p className="text-white/70 text-sm opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 line-clamp-2">
                        {service.short_description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-24 text-secondary/40 italic">
                <p>New service protocols are currently being finalized.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────── */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 bg-surface overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-primary font-sans text-[10px] font-black tracking-[0.3em] uppercase mb-4 block">Client Feedback</span>
            <h2 className="font-heading text-4xl sm:text-5xl font-black tracking-tight text-on-surface">Trusted Results</h2>
            <div className="h-1 w-12 bg-primary/20 rounded-full mx-auto mt-6" />
          </div>
          
          <TestimonialCarousel testimonials={testimonials || []} />
        </div>
      </section>

      {/* ── Final CTA ──────────────────────────────────── */}
      <section className="py-24 sm:py-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-[4rem] bg-on-surface p-12 sm:p-24 overflow-hidden text-center">
            {/* Background Illustration */}
            <img 
              src="/images/hero.png" 
              className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay pointer-events-none" 
              alt=""
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent pointer-events-none" />
            
            <div className="relative z-10">
              <h2 className="text-4xl sm:text-6xl font-heading font-black !text-white mb-8 tracking-tighter leading-none">
                Take back control of <br />
                <span className="text-primary-container">your environment.</span>
              </h2>
              <p className="text-white/70 text-lg max-w-xl mx-auto mb-12 font-medium">
                Join over 5,000 satisfied clients who rely on Vaishali for consistent, professional-grade pest solutions.
              </p>
              <Link href="/quote" className="btn-primary !bg-white !text-on-surface hover:!bg-primary-container hover:scale-105">
                GET YOUR FREE INSPECTION
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
