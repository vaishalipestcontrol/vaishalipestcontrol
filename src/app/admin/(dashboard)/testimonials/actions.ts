'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

async function uploadAvatar(supabase: any, file: File, name: string) {
  if (!file || file.size === 0) return null
  
  const fileExt = file.name.split('.').pop()
  const filePath = `avatars/${name.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.${fileExt}`
  
  const { data, error } = await supabase.storage
    .from('service-images')
    .upload(filePath, file)

  if (error) return null

  const { data: urlData } = supabase.storage
    .from('service-images')
    .getPublicUrl(data.path)
    
  return urlData.publicUrl
}

export async function createTestimonial(formData: FormData) {
  const supabase = await createClient()
  
  const imageFile = formData.get('avatar') as File
  const avatar_url = await uploadAvatar(supabase, imageFile, formData.get('author_name') as string)

  const data = {
    author_name: formData.get('author_name') as string,
    author_role: formData.get('author_role') as string,
    content: formData.get('content') as string,
    rating: parseInt(formData.get('rating') as string) || 5,
    avatar_color: formData.get('avatar_color') as string || '#4edea3',
    is_published: formData.get('is_published') === 'on',
    avatar_url: avatar_url
  }

  const { error } = await supabase.from('testimonials').insert(data)

  if (error) throw new Error(error.message)

  revalidatePath('/admin/testimonials')
  revalidatePath('/')
  redirect('/admin/testimonials')
}

export async function updateTestimonial(id: string, formData: FormData) {
  const supabase = await createClient()
  
  const imageFile = formData.get('avatar') as File
  let avatar_url = formData.get('existing_avatar_url') as string | null
  
  if (imageFile && imageFile.size > 0) {
    const new_avatar_url = await uploadAvatar(supabase, imageFile, formData.get('author_name') as string)
    if (new_avatar_url) avatar_url = new_avatar_url
  }

  const data = {
    author_name: formData.get('author_name') as string,
    author_role: formData.get('author_role') as string,
    content: formData.get('content') as string,
    rating: parseInt(formData.get('rating') as string) || 5,
    avatar_color: formData.get('avatar_color') as string || '#4edea3',
    is_published: formData.get('is_published') === 'on',
    avatar_url: avatar_url
  }

  const { error } = await supabase.from('testimonials').update(data).eq('id', id)

  if (error) throw new Error(error.message)

  revalidatePath('/admin/testimonials')
  revalidatePath('/')
  redirect('/admin/testimonials')
}

export async function deleteTestimonial(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('testimonials').delete().eq('id', id)

  if (error) throw new Error(error.message)

  revalidatePath('/admin/testimonials')
  revalidatePath('/')
}
