import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { upsertService } from '../actions'
import ServiceForm from '../ServiceForm'

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: service } = await supabase
    .from('services')
    .select('*')
    .eq('id', id)
    .single()

  if (!service) notFound()

  return (
    <div className="p-8 max-w-3xl">
      <h2 className="text-3xl font-heading font-bold text-on-surface mb-8">Edit Service: {service.title}</h2>
      <ServiceForm service={service} action={upsertService} />
    </div>
  )
}
