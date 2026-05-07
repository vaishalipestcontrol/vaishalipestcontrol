import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { deleteTestimonial } from './actions'

export default async function TestimonialsListPage() {
  const supabase = await createClient()

  const { data: testimonials } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-on-surface">Testimonials CMS</h2>
          <p className="text-secondary text-sm mt-1">Manage client reviews and ratings shown on the homepage.</p>
        </div>
        <Link href="/admin/testimonials/new" className="btn-primary flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-lg">add_comment</span>
          Add Review
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials?.map((t) => (
          <div key={t.id} className="bg-surface-container-low rounded-3xl p-6 ghost-border flex flex-col shadow-sm hover:shadow-md transition-shadow relative">
            {/* Status Badge */}
            <span className={`absolute top-4 right-4 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
              t.is_published 
                ? 'bg-primary/10 text-primary border border-primary/20' 
                : 'bg-secondary/10 text-secondary border border-secondary/20'
            }`}>
              {t.is_published ? 'Live' : 'Draft'}
            </span>

            {/* Rating */}
            <div className="flex gap-1 mb-4 text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={`material-symbols-outlined text-sm ${i < t.rating ? 'fill-1' : 'opacity-20'}`}>
                  star
                </span>
              ))}
            </div>

            <p className="text-on-surface-variant text-sm italic leading-relaxed mb-6 flex-1">
              &ldquo;{t.content}&rdquo;
            </p>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full flex-shrink-0" style={{ backgroundColor: t.avatar_color }} />
              <div className="min-w-0">
                <p className="font-heading font-bold text-on-surface text-sm truncate">{t.author_name}</p>
                <p className="text-[10px] text-secondary font-black uppercase tracking-tighter truncate">{t.author_role}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-4 border-t ghost-border mt-auto">
              <Link 
                href={`/admin/testimonials/${t.id}`} 
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-primary/20 text-primary font-bold text-[10px] uppercase tracking-widest hover:bg-primary/5 transition-colors"
              >
                <span className="material-symbols-outlined text-sm">edit</span>
                Edit
              </Link>
              <form action={deleteTestimonial.bind(null, t.id)}>
                <button className="w-10 h-10 flex items-center justify-center rounded-xl text-error border border-error/20 hover:bg-error/5 transition-colors">
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
              </form>
            </div>
          </div>
        ))}

        {(!testimonials || testimonials.length === 0) && (
          <div className="col-span-full text-center py-24 text-secondary bg-surface-container-low rounded-3xl ghost-border border-dashed border-2">
            <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-4xl text-primary/40">reviews</span>
            </div>
            <p className="font-heading font-bold text-xl text-on-surface">No reviews yet</p>
            <p className="text-sm mt-2 max-w-xs mx-auto">Start building trust by adding your first client success story.</p>
            <Link href="/admin/testimonials/new" className="btn-primary mt-8 inline-block">
              + Add First Review
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
