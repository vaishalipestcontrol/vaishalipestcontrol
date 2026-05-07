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
    <div>
      {/* Hero */}
      <div className="relative h-56 sm:h-80 md:h-[480px] overflow-hidden bg-surface-container-low">
        {service.image_url ? (
          <img
            src={service.image_url}
            alt={service.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="material-symbols-outlined text-7xl sm:text-9xl text-primary/20">{service.icon}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-on-surface/90 via-on-surface/20 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 sm:p-10 max-w-3xl">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-6xl font-black text-white leading-tight">{service.title}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="py-10 sm:py-16 px-4 sm:px-6 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
        {/* Main Description */}
        <div className="md:col-span-2">
          <h2 className="font-heading text-xl sm:text-2xl font-bold mb-4 sm:mb-6">About This Service</h2>
          <p className="text-on-surface-variant leading-relaxed text-base sm:text-lg">{service.description}</p>
        </div>

        {/* Features Sidebar */}
        {features.length > 0 && (
          <div className="bg-surface-container-low p-6 sm:p-8 rounded-2xl ghost-border h-fit">
            <h3 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">verified</span>
              What&apos;s Included
            </h3>
            <ul className="space-y-3">
              {features.map((feature: string, i: number) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span className="material-symbols-outlined text-primary text-base mt-0.5 flex-shrink-0">check_circle</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="bg-surface-container-low py-14 sm:py-20 px-4 sm:px-6 text-center">
        <h2 className="font-heading text-2xl sm:text-4xl font-black mb-4">Ready to get started?</h2>
        <p className="text-on-surface-variant mb-6 sm:mb-8 text-sm sm:text-base">Request a free site assessment today.</p>
        <Link href="/quote" className="btn-primary">
          Request Inspection
        </Link>
      </div>
    </div>
  )
}
