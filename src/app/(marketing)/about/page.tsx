import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const WHATSAPP_NUMBER = '919662668711'
const WHATSAPP_MSG = encodeURIComponent('Hi! I need pest control service. Can you help?')
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`

export default async function AboutPage() {
  const supabase = await createClient()

  const { data: page } = await supabase
    .from('pages')
    .select('content')
    .eq('slug', 'about')
    .single()

  const content = page?.content || {
    hero_title: "About Vaishali Pest Control",
    hero_description: "We have been helping families and businesses get rid of pests for over 15 years. Our work is simple — we come, we treat, pests are gone.",
    mission_title: "What We Stand For",
    mission_description: "We believe every home should be safe and clean. That is why we use safe chemicals, train our team well, and make sure the job is done right every time.",
    vision_title: "Our Promise to You",
    vision_description: "We will always be honest about what you need and what it will cost. We don't do unnecessary treatments just to charge more.",
    stats: [
      { value: '15+', label: 'Years in Service' },
      { value: '5000+', label: 'Homes Protected' },
      { value: '100%', label: 'Safe Chemicals' },
      { value: '24hr', label: 'Response Time' },
    ]
  }

  return (
    <div className="bg-white">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-primary/5 to-white py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="section-label">Who We Are</span>
            <h1 className="font-heading text-4xl sm:text-5xl font-black text-slate-900 leading-tight mb-6">
              {content.hero_title}
            </h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-xl">
              {content.hero_description}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Call / WhatsApp
              </a>
              <Link href="/quote" className="btn-primary">Get Free Quote</Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-3xl" />
            <img
              src="/images/botanical-science.png"
              alt="Vaishali Pest Control Team"
              className="relative rounded-3xl w-full h-auto shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────── */}
      <section className="py-12 px-4 sm:px-6 bg-primary">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {content.stats.map((stat: { value: string; label: string }) => (
            <div key={stat.label}>
              <p className="text-4xl font-black text-white font-heading">{stat.value}</p>
              <p className="text-green-200 text-sm mt-1 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── MISSION & VISION ──────────────────────────────── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Mission */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-slate-50 rounded-3xl p-10 border border-slate-100">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary text-3xl">target</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-black text-slate-900 mb-4">
                {content.mission_title}
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                {content.mission_description}
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: 'check_circle', text: 'We use safe and approved chemicals only' },
                { icon: 'check_circle', text: 'Our team is trained every year' },
                { icon: 'check_circle', text: 'We clean up after the treatment' },
                { icon: 'check_circle', text: 'We come back if pests return within the warranty period' },
                { icon: 'check_circle', text: 'No hidden charges — ever' },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-xl shrink-0 mt-0.5">{item.icon}</span>
                  <p className="text-slate-700 font-medium">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Vision */}
          <div className="bg-primary rounded-3xl p-10 sm:p-16">
            <div className="max-w-2xl">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-white text-3xl">lightbulb</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-black text-white mb-4">
                {content.vision_title}
              </h2>
              <p className="text-green-100 text-lg leading-relaxed">
                "{content.vision_description}"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ────────────────────────────────── */}
      <section className="py-12 px-4 sm:px-6 bg-slate-50 border-t border-slate-100">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-8">
            Industry Certified & Approved
          </p>
          <div className="flex flex-wrap justify-center gap-8 sm:gap-16">
            {[
              { icon: 'verified', label: 'ISO 9001' },
              { icon: 'eco', label: 'Eco-Safe' },
              { icon: 'security', label: 'Bio-Secure' },
              { icon: 'health_and_safety', label: 'Safe for Families' },
            ].map((cert) => (
              <div key={cert.label} className="flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-3xl text-primary">{cert.icon}</span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">{cert.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center bg-primary/5 rounded-3xl p-10 sm:p-16 border border-primary/10">
          <h2 className="font-heading text-3xl sm:text-4xl font-black text-slate-900 mb-4">
            Ready to Get Rid of Pests?
          </h2>
          <p className="text-slate-600 text-lg mb-8">
            Contact us now. We'll come to your place, check the problem, and give you a free quote.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-whatsapp px-8 py-4">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Us
            </a>
            <Link href="/quote" className="btn-primary px-8 py-4">Get Free Quote</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
