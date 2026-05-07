import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function AdminDashboard() {
  const supabase = await createClient()
  
  // Fetch quick stats
  const { count: contactsCount } = await supabase
    .from('contacts')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending')
    
  const { count: servicesCount } = await supabase
    .from('services')
    .select('*', { count: 'exact', head: true })

  const { count: testimonialsCount } = await supabase
    .from('testimonials')
    .select('*', { count: 'exact', head: true })

  const stats = [
    { 
      label: 'Pending Quotes', 
      value: contactsCount || 0, 
      icon: 'mail', 
      href: '/admin/contacts', 
      color: 'bg-error/10 text-error',
      desc: 'New quote requests'
    },
    { 
      label: 'Total Services', 
      value: servicesCount || 0, 
      icon: 'pest_control', 
      href: '/admin/services', 
      color: 'bg-primary/10 text-primary',
      desc: 'Active service protocols'
    },
    { 
      label: 'Testimonials', 
      value: testimonialsCount || 0, 
      icon: 'reviews', 
      href: '/admin/testimonials', 
      color: 'bg-tertiary/10 text-tertiary',
      desc: 'Published client reviews'
    },
  ]

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
      <div className="mb-10">
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-on-surface">System Overview</h2>
        <p className="text-secondary text-sm mt-1">Operational status of Vaishali Pest Control CMS.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {stats.map((stat) => (
          <Link 
            key={stat.label}
            href={stat.href}
            className="group bg-surface-container-low p-6 rounded-3xl ghost-border flex items-center justify-between transition-all hover:bg-white hover:shadow-xl hover:-translate-y-1"
          >
            <div className="flex items-center gap-6">
              <div className={`w-14 h-14 rounded-2xl ${stat.color} flex items-center justify-center transition-transform group-hover:scale-110`}>
                <span className="material-symbols-outlined text-3xl">{stat.icon}</span>
              </div>
              <div>
                <p className="text-secondary text-xs font-black uppercase tracking-widest">{stat.label}</p>
                <p className="text-4xl font-heading font-black text-on-surface mt-1">{stat.value}</p>
                <p className="text-[10px] text-secondary/60 font-bold mt-1 uppercase tracking-tighter">{stat.desc}</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-secondary opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward_ios</span>
          </Link>
        ))}
      </div>

      <div className="mt-10 sm:mt-12 p-8 sm:p-12 bg-primary/5 rounded-3xl ghost-border relative overflow-hidden">
        <div className="relative z-10 max-w-lg">
          <h3 className="font-heading font-bold text-xl sm:text-2xl text-on-surface mb-3">Clinical Command Center</h3>
          <p className="text-secondary text-sm sm:text-base leading-relaxed mb-6">
            Welcome to your administrative interface. From here you can manage client inquiries and update the public service catalog with surgical precision.
          </p>
          <div className="flex gap-3">
            <Link href="/admin/services/new" className="btn-primary text-xs py-2.5">
              NEW SERVICE
            </Link>
            <Link href="/" className="px-4 py-2.5 rounded-xl border border-primary/20 text-primary font-bold text-xs uppercase tracking-widest hover:bg-primary/5 transition-colors">
              VIEW SITE
            </Link>
          </div>
        </div>
        <span className="material-symbols-outlined text-[120px] sm:text-[180px] absolute -bottom-10 -right-10 text-primary/10 select-none">
          shield_with_heart
        </span>
      </div>
    </div>
  )
}
