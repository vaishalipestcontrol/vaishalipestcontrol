'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function updateContactStatus(id: string, newStatus: string) {
  const supabase = await createClient()

  await supabase
    .from('contacts')
    .update({ status: newStatus })
    .eq('id', id)

  revalidatePath('/admin/contacts')
}

export async function deleteContact(id: string) {
  const supabase = await createClient()

  await supabase
    .from('contacts')
    .delete()
    .eq('id', id)

  revalidatePath('/admin/contacts')
}
