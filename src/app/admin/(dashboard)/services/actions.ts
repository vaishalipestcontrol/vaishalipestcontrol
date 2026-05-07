'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function upsertService(formData: FormData) {
  const supabase = await createClient()

  const id = formData.get('id') as string | null
  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const short_description = formData.get('short_description') as string
  const description = formData.get('description') as string
  const icon = formData.get('icon') as string
  const is_published = formData.get('is_published') === 'on'
  const featuresRaw = formData.get('features') as string
  const features = featuresRaw ? featuresRaw.split('\n').filter(Boolean) : []

  // Handle image upload if a new file was provided
  let image_url = formData.get('existing_image_url') as string | null

  const imageFile = formData.get('image') as File
  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split('.').pop()
    const filePath = `${slug}-${Date.now()}.${fileExt}`
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('service-images')
      .upload(filePath, imageFile, { upsert: true })

    if (!uploadError && uploadData) {
      const { data: urlData } = supabase.storage
        .from('service-images')
        .getPublicUrl(uploadData.path)
      image_url = urlData.publicUrl
    }
  }

  const payload = { title, slug, short_description, description, icon, image_url, features, is_published }

  if (id) {
    await supabase.from('services').update(payload).eq('id', id)
  } else {
    await supabase.from('services').insert(payload)
  }

  revalidatePath('/admin/services')
  revalidatePath('/services')
  redirect('/admin/services')
}

export async function deleteService(id: string) {
  const supabase = await createClient()
  await supabase.from('services').delete().eq('id', id)
  revalidatePath('/admin/services')
  revalidatePath('/services')
}
