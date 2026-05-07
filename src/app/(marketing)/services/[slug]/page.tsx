import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: service } = await supabase
    .from('services')
    .select('title, short_description')
    .eq('slug', slug)
    .single()

  if (!service) return { title: 'Service Not Found' }

  return {
    title: `${service.title} | Vaishali Pest Control`,
    description: service.short_description,
  }
}

const WHATSAPP_NUMBER = "919662668711"
const WHATSAPP_MSG = encodeURIComponent("Hi! I am interested in your services. Can you help me?")
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: service } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (!service) notFound()

  const features: string[] = service.features || []

  return (
    <div className="bg-slate-50/50 min-h-screen">
      {/* ── BREADCRUMB & BACK NAVIGATION ───────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-primary transition-colors group"
        >
          <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">arrow_back</span>
          Back to All Services
        </Link>
      </div>

      {/* ── HERO BANNER ─────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-6">
        <div className="relative h-64 sm:h-96 md:h-[420px] rounded-3xl overflow-hidden shadow-lg shadow-slate-100 bg-slate-900">
          {service.image_url ? (
            <img
              src={service.image_url}
              alt={service.title}
              className="w-full h-full object-cover opacity-85"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-900 to-primary/90 flex items-center justify-center">
              <span className="material-symbols-outlined text-8xl text-white/10">{service.icon}</span>
            </div>
          )}
          {/* Advanced Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent" />
          
          {/* Banner Contents */}
          <div className="absolute bottom-0 left-0 p-6 sm:p-10 md:p-12 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4 border border-white/10">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
              Certified Safe Protection
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
              {service.title}
            </h1>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT GRID ────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          
          {/* LEFT: Description & Details */}
          <div className="lg:col-span-2 space-y-8 sm:space-y-12">
            
            {/* About This Service */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-sm">
              <h2 className="font-heading text-2xl sm:text-3xl font-black text-slate-900 mb-6 flex items-center gap-2.5">
                <span className="w-2.5 h-7 bg-primary rounded-full" />
                Service Overview
              </h2>
              <p className="text-slate-600 leading-relaxed text-base sm:text-lg whitespace-pre-line">
                {service.description}
              </p>
            </div>

            {/* Why Choose Vaishali Details */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-sm">
              <h3 className="font-heading text-xl sm:text-2xl font-black text-slate-900 mb-6">
                Why Vaishali Pest Control?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined text-lg">verified_user</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-950 mb-1">Eco-Safe Products</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">Certified kid & pet friendly chemical formulas only.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined text-lg">calendar_today</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-950 mb-1">Flexible Booking</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">Book treatments anytime, including early mornings or weekends.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined text-lg">payments</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-950 mb-1">Simple Pricing</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">Honest pricing without any surprise charges or extra fees.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined text-lg">award_star</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-950 mb-1">Highly Trained Pros</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">Experienced, background-checked local technicians.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT: Sidebar Checklist & Quick CTA */}
          <div className="space-y-6 sm:space-y-8">
            
            {/* Features Checklist */}
            {features.length > 0 && (
              <div className="bg-gradient-to-br from-green-50/50 to-white p-6 sm:p-8 rounded-3xl border border-green-100 shadow-sm">
                <h3 className="font-heading font-black text-lg text-slate-900 mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-xl">verified</span>
                  What&apos;s Included
                </h3>
                <ul className="space-y-4">
                  {features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700 text-sm font-medium">
                      <span className="material-symbols-outlined text-primary text-lg mt-0.5 shrink-0">check_circle</span>
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Sticky/Quick Helpline CTA card */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
              
              <span className="text-[10px] bg-primary/20 text-primary font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border border-primary/20 inline-block mb-4">
                Helpline
              </span>
              <h4 className="font-heading text-xl font-bold mb-2">Need Instant Help?</h4>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                Connect directly with our local expert for custom service setups or questions.
              </p>
              
              <div className="space-y-3">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-all duration-300 text-sm"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp Now
                </a>
                <a
                  href="tel:+919662668711"
                  className="flex items-center justify-center gap-2 w-full bg-white/10 hover:bg-white/15 text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-300 text-sm"
                >
                  <span className="material-symbols-outlined text-lg">call</span>
                  Direct Call Us
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* ── RICH BOTTOM CTA CARD ─────────────────────────── */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="bg-slate-900 text-white rounded-3xl sm:rounded-[2rem] p-8 sm:p-12 shadow-[0_20px_50px_rgba(15,23,42,0.15)] text-center relative overflow-hidden">
            {/* Glowing background accent radial circles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <span className="text-[10px] bg-primary/20 text-primary font-extrabold uppercase tracking-widest px-4 py-2 rounded-full border border-primary/25 inline-block mb-4">
                Zero Hassle Quote
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black mb-6 leading-tight">
                Ready to live pest-free?
              </h2>
              <p className="text-slate-300 mb-8 max-w-xl mx-auto leading-relaxed text-sm sm:text-base">
                Book a fast, free site inspection with one of our certified specialists today. No obligations.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Link
                  href="/quote"
                  className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white font-extrabold py-4 px-8 rounded-2xl shadow-lg transition-transform hover:-translate-y-0.5 text-base"
                >
                  Get Free Assessment
                </Link>
                <a
                  href="tel:+919662668711"
                  className="w-full sm:w-auto bg-white/10 hover:bg-white/15 text-white font-extrabold py-4 px-8 rounded-2xl transition-transform hover:-translate-y-0.5 text-base inline-flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-xl">call</span>
                  +91 96626 68711
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
