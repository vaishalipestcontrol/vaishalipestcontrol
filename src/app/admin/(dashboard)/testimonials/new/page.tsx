import Link from 'next/link'
import TestimonialForm from '../TestimonialForm'
import { createTestimonial } from '../actions'

export default function NewTestimonialPage() {
  return (
    <div className="p-4 sm:p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <Link href="/admin/testimonials" className="text-primary text-xs font-black uppercase tracking-widest flex items-center gap-2 mb-4 hover:opacity-70 transition-opacity">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Back to List
        </Link>
        <h2 className="text-3xl font-heading font-bold text-on-surface">New Testimonial</h2>
        <p className="text-secondary text-sm mt-1">Add a new client success story to the public catalog.</p>
      </div>

      <TestimonialForm action={createTestimonial} />
    </div>
  )
}
