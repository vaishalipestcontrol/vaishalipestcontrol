'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function updatePageContent(slug: string, content: any) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('pages')
    .update({ 
      content,
      updated_at: new Date().toISOString()
    })
    .eq('slug', slug)

  if (error) throw new Error(error.message)

  revalidatePath(`/admin/pages/${slug}`)
  revalidatePath(`/${slug === 'home' ? '' : slug}`)
  revalidatePath('/about')
  
  return { success: true }
}
