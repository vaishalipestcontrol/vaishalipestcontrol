import { createClient } from '@/lib/supabase/server'
import { updateContactStatus, deleteContact } from './actions'

export default async function ContactsManager() {
  const supabase = await createClient()
  
  const { data: contacts } = await supabase
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-on-surface">Quote Requests</h2>
        <div className="flex gap-2">
           <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-highest text-xs font-bold text-secondary">
             <span className="w-2 h-2 rounded-full bg-error animate-pulse" />
             {contacts?.filter(c => c.status === 'pending').length || 0} New
           </span>
        </div>
      </div>
      
      {/* Desktop Table View — Hidden on Mobile */}
      <div className="hidden lg:block bg-surface-container-low rounded-2xl ghost-border overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-container-highest/50">
            <tr>
              <th className="p-4 font-bold text-secondary uppercase tracking-wider">Date</th>
              <th className="p-4 font-bold text-secondary uppercase tracking-wider">Name</th>
              <th className="p-4 font-bold text-secondary uppercase tracking-wider">Contact</th>
              <th className="p-4 font-bold text-secondary uppercase tracking-wider">Concern</th>
              <th className="p-4 font-bold text-secondary uppercase tracking-wider">Status</th>
              <th className="p-4 font-bold text-secondary uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/30">
            {contacts?.map((contact) => (
              <tr key={contact.id} className="hover:bg-surface-container-highest/30 transition-colors">
                <td className="p-4 text-secondary whitespace-nowrap">
                  {new Date(contact.created_at).toLocaleDateString()}
                </td>
                <td className="p-4 font-bold text-on-surface">
                  {contact.first_name} {contact.last_name}
                </td>
                <td className="p-4 text-secondary">
                  <a href={`mailto:${contact.email}`} className="text-primary hover:underline">{contact.email}</a>
                </td>
                <td className="p-4 text-on-surface max-w-xs">
                  <div className="font-bold truncate">{contact.concern}</div>
                  {contact.details && <div className="text-secondary text-xs truncate mt-1">{contact.details}</div>}
                </td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    contact.status === 'pending' ? 'bg-error/10 text-error border border-error/20' :
                    contact.status === 'contacted' ? 'bg-primary/10 text-primary border border-primary/20' :
                    'bg-secondary/10 text-secondary border border-secondary/20'
                  }`}>
                    {contact.status}
                  </span>
                </td>
                <td className="p-4 text-right space-x-2 whitespace-nowrap">
                  <form action={updateContactStatus.bind(null, contact.id, contact.status === 'pending' ? 'contacted' : 'resolved')} className="inline">
                    <button className="text-primary hover:bg-primary/5 px-3 py-1.5 rounded-lg text-xs uppercase tracking-wider font-black transition-colors">
                      Advance
                    </button>
                  </form>
                  <form action={deleteContact.bind(null, contact.id)} className="inline">
                    <button className="text-error hover:bg-error/5 p-2 rounded-lg transition-colors">
                      <span className="material-symbols-outlined text-base align-middle">delete</span>
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View — Hidden on Desktop */}
      <div className="lg:hidden space-y-4">
        {contacts?.map((contact) => (
          <div key={contact.id} className="bg-surface-container-low rounded-2xl p-5 ghost-border shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-[10px] font-black text-secondary uppercase tracking-widest mb-1">
                  {new Date(contact.created_at).toLocaleDateString()}
                </p>
                <h3 className="font-heading font-bold text-lg text-on-surface">
                  {contact.first_name} {contact.last_name}
                </h3>
              </div>
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                contact.status === 'pending' ? 'bg-error/10 text-error border border-error/20' :
                contact.status === 'contacted' ? 'bg-primary/10 text-primary border border-primary/20' :
                'bg-secondary/10 text-secondary border border-secondary/20'
              }`}>
                {contact.status}
              </span>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm text-secondary">
                <span className="material-symbols-outlined text-lg">mail</span>
                <a href={`mailto:${contact.email}`} className="text-primary underline">{contact.email}</a>
              </div>
              <div className="flex items-start gap-3 text-sm text-on-surface">
                <span className="material-symbols-outlined text-lg">pest_control</span>
                <div>
                  <p className="font-bold">{contact.concern}</p>
                  {contact.details && <p className="text-secondary text-xs mt-1 leading-relaxed">{contact.details}</p>}
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t ghost-border">
              <form action={updateContactStatus.bind(null, contact.id, contact.status === 'pending' ? 'contacted' : 'resolved')} className="flex-1">
                <button className="w-full btn-primary py-2.5 text-xs font-black tracking-widest">
                  ADVANCE STATUS
                </button>
              </form>
              <form action={deleteContact.bind(null, contact.id)}>
                <button className="p-2.5 text-error hover:bg-error/5 rounded-xl border border-error/20 transition-colors">
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>

      {(!contacts || contacts.length === 0) && (
        <div className="text-center py-24 text-secondary bg-surface-container-low rounded-3xl ghost-border">
          <span className="material-symbols-outlined text-6xl mb-4 opacity-20">mail_outline</span>
          <p className="font-bold text-on-surface">Inbox Clear</p>
          <p className="text-sm mt-1">No quote requests have been received yet.</p>
        </div>
      )}
    </div>
  )
}
