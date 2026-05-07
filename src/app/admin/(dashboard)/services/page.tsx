import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { deleteService } from './actions'

export default async function ServicesListPage() {
  const supabase = await createClient()

  const { data: services } = await supabase
    .from('services')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-on-surface">Services CMS</h2>
          <p className="text-secondary text-sm mt-1">Manage the treatment options displayed on the website.</p>
        </div>
        <Link href="/admin/services/new" className="btn-primary flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-lg">add</span>
          Add Service
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {services?.map((service) => (
          <div key={service.id} className="bg-surface-container-low rounded-2xl p-4 sm:p-6 ghost-border flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 shadow-sm hover:shadow-md transition-shadow">
            {/* Image / Icon */}
            <div className="w-full sm:w-24 h-48 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 bg-surface-container-highest flex items-center justify-center border ghost-border">
              {service.image_url ? (
                <img src={service.image_url} alt={service.title} className="w-full h-full object-cover" />
              ) : (
                <span className="material-symbols-outlined text-4xl text-primary/40">{service.icon || 'pest_control'}</span>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 py-2 w-full">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h3 className="font-heading font-bold text-lg sm:text-xl text-on-surface leading-tight">
                  {service.title}
                </h3>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  service.is_published 
                    ? 'bg-primary/10 text-primary border border-primary/20' 
                    : 'bg-secondary/10 text-secondary border border-secondary/20'
                }`}>
                  {service.is_published ? 'Published' : 'Draft'}
                </span>
              </div>
              <p className="text-on-surface-variant text-sm line-clamp-2 leading-relaxed mb-2">
                {service.short_description}
              </p>
              <div className="flex items-center gap-4 text-[10px] font-bold text-secondary/60 uppercase tracking-widest">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">link</span>
                  /{service.slug}
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">calendar_today</span>
                  {new Date(service.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-0 ghost-border sm:flex-shrink-0">
              <Link 
                href={`/admin/services/${service.id}`} 
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-primary/20 text-primary font-bold text-xs uppercase tracking-widest hover:bg-primary/5 transition-colors"
              >
                <span className="material-symbols-outlined text-base">edit</span>
                Edit
              </Link>
              <form action={deleteService.bind(null, service.id)} className="sm:flex-none">
                <button className="w-full sm:w-10 h-10 flex items-center justify-center rounded-xl text-error border border-error/20 hover:bg-error/5 transition-colors">
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
              </form>
            </div>
          </div>
        ))}

        {(!services || services.length === 0) && (
          <div className="text-center py-24 text-secondary bg-surface-container-low rounded-3xl ghost-border border-dashed border-2">
            <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-4xl text-primary/40">pest_control_rodent</span>
            </div>
            <p className="font-heading font-bold text-xl text-on-surface">No services cataloged</p>
            <p className="text-sm mt-2 max-w-xs mx-auto">Start building your clinical service catalog by adding your first treatment protocol.</p>
            <Link href="/admin/services/new" className="btn-primary mt-8 inline-block">
              + Add Service Protocol
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
