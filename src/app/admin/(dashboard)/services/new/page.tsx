import { upsertService } from '../actions'
import ServiceForm from '../ServiceForm'

export default function NewServicePage() {
  return (
    <div className="p-8 max-w-3xl">
      <h2 className="text-3xl font-heading font-bold text-on-surface mb-8">Add New Service</h2>
      <ServiceForm action={upsertService} />
    </div>
  )
}
