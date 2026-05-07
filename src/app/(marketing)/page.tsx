import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import TestimonialCarousel from "@/components/TestimonialCarousel";

const WHATSAPP_NUMBER = '919662668711'
const WHATSAPP_MSG = encodeURIComponent('Hi! I need pest control service. Can you help?')
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`

const PESTS = [
  { icon: 'pest_control', label: 'Cockroaches', color: 'bg-amber-50 border-amber-100' },
  { icon: 'bug_report', label: 'Termites', color: 'bg-orange-50 border-orange-100' },
  { icon: 'mouse', label: 'Rodents', color: 'bg-slate-50 border-slate-100' },
  { icon: 'bed', label: 'Bed Bugs', color: 'bg-red-50 border-red-100' },
  { icon: 'air', label: 'Mosquitoes', color: 'bg-blue-50 border-blue-100' },
  { icon: 'warning', label: 'Other Pests', color: 'bg-green-50 border-green-100' },
]

const FEATURES = [
  {
    icon: 'family_restroom',
    title: 'Safe for Kids & Pets',
    desc: 'We use chemicals that are approved and safe. Your family will not be harmed.',
    color: 'text-green-600 bg-green-50',
  },
  {
    icon: 'verified',
    title: 'Trained & Certified',
    desc: 'Our team is trained and certified in pest control. We know what works.',
    color: 'text-blue-600 bg-blue-50',
  },
  {
    icon: 'schedule',
    title: 'Fast & Reliable',
    desc: 'We come on time and finish the job properly. No delays, no excuses.',
    color: 'text-orange-600 bg-orange-50',
  },
  {
    icon: 'currency_rupee',
    title: 'Fair Price',
    desc: 'No hidden charges. We give you a clear price before starting any work.',
    color: 'text-primary bg-primary/8',
  },
]

export default async function Home() {
  const supabase = await createClient()

  const { data: featuredServices } = await supabase
    .from('services')
    .select('id, title, slug, short_description, icon, image_url')
    .eq('is_published', true)
    .limit(6)
    .order('created_at', { ascending: true })

  const { data: testimonials } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-green-50/80 to-white pt-4 pb-14 lg:pb-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Copy */}
            <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 leading-tight mb-6">
                Got Pests? <br />
                <span className="text-primary">We Fix It Fast.</span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed mx-auto lg:mx-0">
                Vaishali Pest Control has been protecting homes and businesses for over 15 years. 
                Safe treatments, quick service, and results you can see.
              </p>

              {/* CTAs */}
              <div className="w-full flex flex-wrap justify-center lg:justify-start gap-4 mb-10">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp px-6 py-3.5 text-base"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp Us Now
                </a>
                <Link href="/quote" className="btn-primary px-6 py-3.5 text-base">
                  Get Free Quote
                </Link>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-100 w-full max-w-md mx-auto lg:mx-0">
                {[
                  { val: '15+', label: 'Years in Service' },
                  { val: '5000+', label: 'Happy Customers' },
                  { val: '24hr', label: 'Quick Response' },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="text-2xl font-black text-primary font-heading">{s.val}</p>
                    <p className="text-xs text-slate-500 mt-0.5 font-medium">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Hero image / pest visual */}
            <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
              <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-3xl scale-95" />
              <div className="relative bg-white rounded-3xl shadow-2xl shadow-primary/10 overflow-hidden border border-primary/10">
                <img
                  src="/images/hero.png"
                  alt="Pest Control Service"
                  className="w-full h-auto object-cover"
                />
                {/* Floating badge */}
                <div className="absolute bottom-4 left-4 bg-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-xl">verified</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Certified & Safe</p>
                    <p className="text-[10px] text-slate-500">Government Approved</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PEST TYPES ───────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white relative overflow-hidden">
        {/* Decorative Scope/Target Bug Watermark */}
        <div className="absolute right-10 top-12 w-64 h-64 text-primary/5 pointer-events-none select-none z-0 hidden lg:block">
          <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <line x1="12" y1="1" x2="12" y2="23" />
            <line x1="1" y1="12" x2="23" y2="12" />
            <path d="M12 7a2 2 0 0 1 2 2v3h-4V9a2 2 0 0 1 2-2z" fill="currentColor" opacity="0.3" />
            <path d="M9 12h6v4H9z" fill="currentColor" opacity="0.3" />
            <path d="M8 10l-2-1M8 12l-3 .5M8 14l-2 1M16 10l2-1M16 12l3 .5M16 14l2 1" />
          </svg>
        </div>

        {/* Decorative Eco-Safety Shield Watermark */}
        <div className="absolute left-10 bottom-12 w-64 h-64 text-primary/5 pointer-events-none select-none z-0 hidden lg:block rotate-12">
          <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <circle cx="12" cy="11.5" r="3" />
            <path d="M12 7.5v1M12 14.5v1M8.5 11h1M14.5 11h1" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <span className="section-label">What's Bothering You?</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-slate-900">
              We Handle All Types of Pests
            </h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">
              Whether it's cockroaches in your kitchen or termites in your walls — we have the right solution.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {PESTS.map((pest) => (
              <Link
                key={pest.label}
                href="/services"
                className={`flex flex-col items-center gap-3 p-5 rounded-2xl border-2 ${pest.color} hover:scale-105 hover:shadow-md transition-all duration-200 text-center cursor-pointer`}
              >
                <span className="material-symbols-outlined text-3xl text-slate-700">{pest.icon}</span>
                <span className="font-semibold text-sm text-slate-800">{pest.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ─────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-label">Why Choose Us</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-slate-900">
              People Trust Vaishali Pest Control
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-lg hover:border-primary/20 transition-all duration-300">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${f.color}`}>
                  <span className="material-symbols-outlined text-2xl">{f.icon}</span>
                </div>
                <h3 className="font-heading font-bold text-slate-900 text-lg mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ──────────────────────────────────────── */}
      {featuredServices && featuredServices.length > 0 && (
        <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white relative overflow-hidden">
          {/* Decorative Spray Can Watermark */}
          <div className="absolute right-6 top-1/4 w-72 h-72 text-primary/5 pointer-events-none select-none z-0 hidden lg:block rotate-12">
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 10h4v11H10z" />
              <path d="M12 5v5M9 5h6M8 20h8" />
              <path d="M10 5l-2 2M14 5l2 1" />
              <circle cx="18" cy="4" r="0.5" fill="currentColor" />
              <circle cx="19" cy="6" r="0.8" fill="currentColor" />
              <circle cx="21" cy="5" r="0.5" fill="currentColor" />
              <circle cx="17" cy="8" r="0.6" fill="currentColor" />
              <circle cx="20" cy="9" r="0.7" fill="currentColor" />
            </svg>
          </div>

          {/* Decorative Eco Protective Shield Watermark */}
          <div className="absolute left-6 bottom-1/4 w-72 h-72 text-primary/5 pointer-events-none select-none z-0 hidden lg:block -rotate-12">
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M12 7c-2.5 0-4.5 2-4.5 4.5S12 17 12 17s4.5-3 4.5-5.5S14.5 7 12 7z" fill="currentColor" opacity="0.3" />
              <path d="M12 7v10" />
            </svg>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="section-label">Our Services</span>
                <h2 className="font-heading text-3xl sm:text-4xl font-black text-slate-900">
                  What We Offer
                </h2>
              </div>
              <Link href="/services" className="btn-tertiary hidden sm:inline-flex">
                See All Services →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredServices.map((service) => (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className="group bg-white rounded-3xl border border-slate-100 hover:border-transparent hover:shadow-[0_20px_50px_rgba(22,163,74,0.08)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full overflow-hidden"
                >
                  {/* Image container with floating badge */}
                  <div className="relative aspect-[16/11] overflow-hidden bg-slate-50">
                    {service.image_url ? (
                      <img
                        src={service.image_url}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-green-50 to-primary/5 flex items-center justify-center">
                        <span className="material-symbols-outlined text-7xl text-primary/20">{service.icon}</span>
                      </div>
                    )}
                  </div>

                  {/* Floating Circular Icon Badge - Placed outside overflow-hidden to prevent clipping */}
                  <div className="relative z-10">
                    <div className="absolute -top-6 right-6 w-12 h-12 bg-primary text-white rounded-full shadow-lg shadow-primary/25 border-4 border-white flex items-center justify-center group-hover:scale-110 group-hover:bg-slate-900 transition-all duration-300">
                      <span className="material-symbols-outlined text-xl">{service.icon}</span>
                    </div>
                  </div>

                  {/* Body content */}
                  <div className="p-6 pt-8 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block mb-1">
                        Professional Treatment
                      </span>
                      <h3 className="font-heading font-black text-xl text-slate-900 group-hover:text-primary transition-colors mb-3 leading-snug">
                        {service.title}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                        {service.short_description}
                      </p>
                    </div>

                    <div className="mt-6 pt-5 border-t border-slate-50 flex items-center justify-between text-sm">
                      <span className="text-primary font-bold inline-flex items-center gap-1">
                        Read Details 
                        <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">arrow_forward</span>
                      </span>
                      <span className="text-xs text-slate-400 font-medium">100% Guaranteed</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8 sm:hidden">
              <Link href="/services" className="btn-secondary">
                See All Services
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── TESTIMONIALS ──────────────────────────────────── */}
      {testimonials && testimonials.length > 0 && (
        <section className="py-16 sm:py-20 px-4 sm:px-6 bg-slate-50 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="section-label">Customer Reviews</span>
              <h2 className="font-heading text-3xl sm:text-4xl font-black text-slate-900">
                What Our Customers Say
              </h2>
            </div>
            <TestimonialCarousel testimonials={testimonials} />
          </div>
        </section>
      )}

      {/* ── WHATSAPP CTA BANNER ───────────────────────────── */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-primary to-emerald-700 rounded-3xl sm:rounded-[2rem] p-8 sm:p-12 shadow-[0_20px_50px_rgba(22,163,74,0.15)] text-center relative overflow-hidden">
            {/* Soft decorative blur background circles */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="font-heading text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">
                Got a Pest Problem Right Now?
              </h2>
              <p className="text-green-100 text-base sm:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
                Just WhatsApp us. We&apos;ll reply fast and tell you exactly what to do. No waiting, no hassle.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white text-primary font-bold text-base px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <svg className="w-5 h-5 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp Us Now
                </a>
                <Link
                  href="/quote"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-white text-white font-bold text-base px-8 py-4 rounded-xl hover:bg-white/10 active:scale-[0.98] transition-all"
                >
                  Get Free Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
