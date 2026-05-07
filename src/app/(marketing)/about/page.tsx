import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AboutPage() {
  const supabase = await createClient()

  const { data: page } = await supabase
    .from('pages')
    .select('content')
    .eq('slug', 'about')
    .single()

  const content = page?.content || {
    hero_title: "Over a Decade of Excellence in Pest Protection.",
    hero_description: "At Vaishali, we don't just treat infestations; we build long-term defense systems for your home. Our mission is to provide every client with a safe, healthy, and pest-free environment using the latest industry innovations.",
    mission_title: "Our Dedicated Mission",
    mission_description: "To set the benchmark for quality and safety in the pest management industry, ensuring every home we touch becomes a safer place for families to grow.",
    vision_title: "Our Vision for Your Home",
    vision_description: "To be Mumbai's most trusted name in property protection, known for our integrity, innovation, and unwavering commitment to client satisfaction.",
    stats: [
      { value: '15+', label: 'Years of Excellence' },
      { value: '5000+', label: 'Protected Homes' }
    ]
  }

  return (
    <div className="py-24 sm:py-32 px-4 sm:px-6 max-w-7xl mx-auto">

      {/* Header Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-[2px] bg-primary" />
            <span className="text-primary font-sans text-[10px] font-black tracking-[0.3em] uppercase">
              Professional Pest Solutions
            </span>
          </div>
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl font-black mb-8 leading-[0.95] tracking-tighter text-on-surface">
            {content.hero_title}
          </h1>
          <p className="text-on-surface-variant text-lg sm:text-xl leading-relaxed max-w-xl opacity-80">
            {content.hero_description}
          </p>
        </div>
        <div className="relative group">
          <div className="absolute -inset-10 bg-primary/5 rounded-full blur-[100px] group-hover:bg-primary/10 transition-colors duration-700" />
          <img 
            src="/images/botanical-science.png" 
            alt="Botanical Science" 
            className="relative w-full h-auto rounded-[3rem] shadow-2xl transform group-hover:-translate-y-2 transition-transform duration-700" 
          />
        </div>
      </div>

      {/* Philosophy blocks */}
      <div className="space-y-32">
        {/* Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="p-12 sm:p-16 rounded-[3rem] bg-surface-container-low border ghost-border relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-9xl">biotech</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-black mb-6 text-on-surface tracking-tight">{content.mission_title}</h2>
            <p className="text-on-surface-variant leading-relaxed text-base sm:text-lg opacity-80">
              {content.mission_description}
            </p>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {content.stats.map((stat: any, index: number) => (
              <div 
                key={stat.label} 
                className={`p-8 rounded-[2rem] text-center border ghost-border shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 ${
                  index % 2 === 0 ? 'bg-primary text-white border-transparent' : 'bg-white text-on-surface'
                }`}
              >
                <p className="font-heading text-4xl sm:text-5xl font-black mb-2 tracking-tighter">{stat.value}</p>
                <p className={`text-[10px] font-black uppercase tracking-widest ${index % 2 === 0 ? 'text-white/60' : 'text-secondary'}`}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Vision */}
        <div className="relative rounded-[4rem] bg-[#060a0f] p-12 sm:p-24 overflow-hidden group border border-white/5 shadow-2xl">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 blur-[100px] rounded-full group-hover:bg-primary/30 transition-colors" />
          <div className="relative z-10 max-w-2xl">
            <h2 className="font-heading text-3xl sm:text-4xl font-black mb-6 !text-white tracking-tight">
              <span className="text-primary-container">02.</span> {content.vision_title}
            </h2>
            <p className="text-white/70 leading-relaxed text-base sm:text-lg italic font-medium">
              &ldquo;{content.vision_description}&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Certification Row */}
      <div className="mt-32 pt-16 border-t border-on-surface/10 text-center">
        <p className="text-[10px] font-black text-secondary uppercase tracking-[0.3em] mb-12 opacity-100">Industry Certified Standards</p>
        <div className="flex flex-wrap justify-center gap-12 sm:gap-24">
          <div className="flex flex-col items-center gap-3 opacity-30 hover:opacity-100 transition-all duration-500">
            <span className="material-symbols-outlined text-4xl text-primary">verified</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-secondary">ISO 9001</span>
          </div>
          <div className="flex flex-col items-center gap-3 opacity-30 hover:opacity-100 transition-all duration-500">
            <span className="material-symbols-outlined text-4xl text-primary">eco</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-secondary">Eco-Safe</span>
          </div>
          <div className="flex flex-col items-center gap-3 opacity-30 hover:opacity-100 transition-all duration-500">
            <span className="material-symbols-outlined text-4xl text-primary">security</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-secondary">Bio-Secure</span>
          </div>
          <div className="flex flex-col items-center gap-3 opacity-30 hover:opacity-100 transition-all duration-500">
            <span className="material-symbols-outlined text-4xl text-primary">health_and_safety</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-secondary">WHO Grade</span>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="mt-32 text-center p-12 sm:p-24 bg-surface-container-low rounded-[4rem] border ghost-border shadow-xl shadow-black/[0.02]">
        <h2 className="font-heading text-4xl sm:text-5xl font-black mb-8 text-on-surface tracking-tighter">Start your journey to a pest-free home today.</h2>
        <Link href="/quote" className="btn-primary">
          BOOK A FREE INSPECTION
        </Link>
      </div>
    </div>
  );
}
