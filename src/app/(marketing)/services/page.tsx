import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function ServicesPage() {
  const supabase = await createClient()
  const { data: services } = await supabase
    .from('services')
    .select('id, title, slug, short_description, icon, image_url')
    .eq('is_published', true)
    .order('created_at', { ascending: true })

  return (
    <div className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="mb-10 sm:mb-16">
        <h1 className="font-heading text-4xl sm:text-5xl font-black mb-4">Our Expertise</h1>
        <p className="text-on-surface-variant text-base sm:text-lg max-w-2xl">
          Comprehensive pest management solutions designed for reliability and safety.
        </p>
      </div>

      <div className="space-y-3">
        {services && services.length > 0 ? (
          services.map((service, index) => (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              className={`flex items-center justify-between p-5 sm:p-8 rounded-xl transition-all group ${
                index % 2 === 0 ? 'bg-surface-container-low' : 'bg-surface'
              } hover:bg-white hover:shadow-lg`}
            >
              <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                {service.image_url ? (
                  <img
                    src={service.image_url}
                    alt={service.title}
                    className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-xl flex-shrink-0"
                  />
                ) : (
                  <span className="material-symbols-outlined text-primary text-2xl sm:text-3xl flex-shrink-0">
                    {service.icon}
                  </span>
                )}
                <div className="min-w-0">
                  <h3 className="font-heading text-base sm:text-xl font-bold mb-0.5 sm:mb-1 group-hover:text-primary transition-colors truncate">
                    {service.title}
                  </h3>
                  <p className="text-on-surface-variant text-xs sm:text-base line-clamp-1">
                    {service.short_description}
                  </p>
                </div>
              </div>
              <span className="material-symbols-outlined text-primary-container group-hover:translate-x-2 transition-transform ml-4 flex-shrink-0">
                arrow_forward
              </span>
            </Link>
          ))
        ) : (
          <div className="text-center py-20 text-secondary bg-surface-container-low rounded-2xl ghost-border">
            <span className="material-symbols-outlined text-5xl mb-4 block text-primary/30">pest_control</span>
            <p className="font-bold text-on-surface">No services published yet.</p>
            <p className="text-sm mt-1">Check back soon or <Link href="/quote" className="text-primary hover:underline">contact us</Link> directly.</p>
          </div>
        )}
      </div>
    </div>
  );
}
