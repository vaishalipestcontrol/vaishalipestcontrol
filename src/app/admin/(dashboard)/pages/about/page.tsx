import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import AboutCMS from './AboutCMS'

export default async function AdminAboutPage() {
  const supabase = await createClient()

  const { data: page } = await supabase
    .from('pages')
    .select('*')
    .eq('slug', 'about')
    .single()

  if (!page) notFound()

  return <AboutCMS initialData={page} />
}
