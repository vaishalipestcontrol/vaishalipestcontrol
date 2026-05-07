import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const WHATSAPP_NUMBER = '919662668711'
const WHATSAPP_MSG = encodeURIComponent('Hi! I need pest control service. Can you help?')
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`

export default async function ServicesPage() {
  const supabase = await createClient()
  const { data: services } = await supabase
    .from('services')
    .select('id, title, slug, short_description, icon, image_url')
    .eq('is_published', true)
    .order('created_at', { ascending: true })

  return (
    <div className="bg-white">
      {/* ── PAGE HEADER ──────────────────────────────────── */}
      <section className="bg-gradient-to-br from-primary/5 to-white py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <span className="section-label">What We Do</span>
          <h1 className="font-heading text-4xl sm:text-5xl font-black text-slate-900 mb-4">
            Our Pest Control Services
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            From small homes to big offices — we handle all kinds of pests. 
            Pick what you need, or just WhatsApp us and we'll guide you.
          </p>
        </div>
      </section>

      {/* ── SERVICES GRID ─────────────────────────────────── */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {services && services.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
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
                      <h2 className="font-heading font-black text-xl text-slate-900 group-hover:text-primary transition-colors mb-3 leading-snug">
                        {service.title}
                      </h2>
                      <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                        {service.short_description}
                      </p>
                    </div>

                    <div className="mt-6 pt-5 border-t border-slate-50 flex items-center justify-between text-sm">
                      <span className="text-primary font-bold inline-flex items-center gap-1">
                        Read Details 
                        <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">arrow_forward</span>
                      </span>
                      <span className="text-xs bg-emerald-50 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full">
                        Active
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-slate-50 rounded-3xl border border-slate-100">
              <span className="material-symbols-outlined text-6xl text-slate-300 mb-4 block">pest_control</span>
              <p className="font-bold text-slate-700 text-lg">Services coming soon!</p>
              <p className="text-slate-500 mt-2 mb-6">
                Meanwhile, WhatsApp us and we'll tell you what we can do for you.
              </p>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                WhatsApp Us
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────── */}
      <section className="py-14 px-4 sm:px-6 bg-slate-50 border-t border-slate-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-2xl sm:text-3xl font-black text-slate-900 mb-3">
            Not Sure What You Need?
          </h2>
          <p className="text-slate-600 mb-6">
            Just WhatsApp us. Tell us the problem and we'll come check your place for free.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp for Help
            </a>
            <Link href="/quote" className="btn-primary">Fill Quote Form</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
