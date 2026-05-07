'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { sendAutomaticQuoteEmails } from '@/lib/mail'

export async function submitQuote(formData: FormData) {
  const supabase = await createClient()

  const firstName = formData.get('first_name') as string
  const lastName = formData.get('last_name') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const concern = formData.get('concern') as string
  const details = formData.get('details') as string

  // Server-side mandatory validation for security and schema safety
  if (!firstName || !lastName || !email || !phone || !concern) {
    return { success: false, error: 'All fields (First Name, Last Name, Email, Phone, Concern) are strictly required.' }
  }

  const { error } = await supabase.from('contacts').insert({
    first_name: firstName,
    last_name: lastName,
    email: email,
    phone: phone,
    concern: concern,
    details: details,
    status: 'pending',
  })

  if (!error) {
    // Dispatch automated emails to customer and administrator asynchronously
    try {
      await sendAutomaticQuoteEmails({
        firstName,
        lastName,
        email,
        phone,
        concern,
        details,
      })
    } catch (mailError) {
      console.error('🚨 [Background Email Error] Failed to send automated quote notifications:', mailError)
    }
  }

  revalidatePath('/quote')
  return { success: !error, error: error?.message }
}

