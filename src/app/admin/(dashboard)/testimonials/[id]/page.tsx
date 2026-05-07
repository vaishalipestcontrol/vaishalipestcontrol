import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import TestimonialForm from '../TestimonialForm'
import { updateTestimonial } from '../actions'

export default async function EditTestimonialPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params
  const supabase = await createClient()
  
  const { data: testimonial } = await supabase
    .from('testimonials')
    .select('*')
    .eq('id', id)
    .single()

  if (!testimonial) notFound()

  const updateWithId = updateTestimonial.bind(null, id)

  return (
    <div className="p-4 sm:p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <Link href="/admin/testimonials" className="text-primary text-xs font-black uppercase tracking-widest flex items-center gap-2 mb-4 hover:opacity-70 transition-opacity">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Back to List
        </Link>
        <h2 className="text-3xl font-heading font-bold text-on-surface">Edit Testimonial</h2>
        <p className="text-secondary text-sm mt-1">Update clinical feedback details and display status.</p>
      </div>

      <TestimonialForm initialData={testimonial} action={updateWithId} />
    </div>
  )
}
