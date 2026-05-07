'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function submitQuote(formData: FormData) {
  const supabase = await createClient()

  const { error } = await supabase.from('contacts').insert({
    first_name: formData.get('first_name') as string,
    last_name: formData.get('last_name') as string,
    email: formData.get('email') as string,
    concern: formData.get('concern') as string,
    details: formData.get('details') as string,
    status: 'pending',
  })

  revalidatePath('/quote')
  return { success: !error, error: error?.message }
}
