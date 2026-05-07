'use client'

import { useState } from 'react'
import { compressImage } from '@/lib/utils/imageCompression'

export default function TestimonialForm({ 
  initialData, 
  action 
}: { 
  initialData?: any, 
  action: (formData: FormData) => Promise<void> 
}) {
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState<string | null>(initialData?.avatar_url || null)
  const [compressedFile, setCompressedFile] = useState<File | null>(null)
  const [isCompressing, setIsCompressing] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    if (compressedFile) {
      formData.set('avatar', compressedFile)
    }
    try {
      await action(formData)
    } catch (e: any) {
      // Let Next.js handle redirect errors without popping up a false alert
      if (e?.message === 'NEXT_REDIRECT' || e?.digest?.includes('NEXT_REDIRECT')) {
        throw e
      }
      alert('Failed to save testimonial')
    } finally {
      setLoading(false)
    }
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsCompressing(true)
      const reader = new FileReader()
      reader.onload = (ev) => setPreview(ev.target?.result as string)
      reader.readAsDataURL(file)

      try {
        // Compress the avatar down to smaller dimensions suitable for profiles
        const compressed = await compressImage(file, 400, 400, 0.8)
        setCompressedFile(compressed)
      } catch (error) {
        console.error('Avatar compression failed:', error)
      } finally {
        setIsCompressing(false)
      }
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6 sm:space-y-8 bg-surface-container-low p-6 sm:p-10 rounded-3xl ghost-border shadow-xl shadow-black/5">
      <input type="hidden" name="existing_avatar_url" value={initialData?.avatar_url || ''} />

      <div className="flex flex-col items-center gap-4 mb-8">
        <div className="relative group">
          <div 
            className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg bg-surface-container-highest flex items-center justify-center relative"
            style={{ backgroundColor: !preview ? (initialData?.avatar_color || '#4edea3') : 'transparent' }}
          >
            {preview ? (
              <img src={preview} alt="Avatar Preview" className="w-full h-full object-cover" />
            ) : (
              <span className="material-symbols-outlined text-4xl text-white/50">person</span>
            )}

            {isCompressing && (
              <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
          <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
            <span className="material-symbols-outlined">add_a_photo</span>
            <input type="file" name="avatar" className="hidden" accept="image/*" onChange={handleImageChange} />
          </label>
        </div>
        <p className="text-[10px] text-secondary font-black uppercase tracking-widest">
          {isCompressing ? 'Optimizing Avatar...' : 'Client Profile Photo'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="form-label" htmlFor="author_name">Author Name</label>
          <input 
            id="author_name" 
            name="author_name" 
            type="text" 
            required 
            defaultValue={initialData?.author_name} 
            className="form-input" 
            placeholder="e.g. Elena Rodriguez" 
          />
        </div>
        <div className="space-y-2">
          <label className="form-label" htmlFor="author_role">Author Role / Title</label>
          <input 
            id="author_role" 
            name="author_role" 
            type="text" 
            defaultValue={initialData?.author_role} 
            className="form-input" 
            placeholder="e.g. Residential Client" 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="form-label" htmlFor="rating">Rating (1-5)</label>
          <select id="rating" name="rating" defaultValue={initialData?.rating || 5} className="form-input">
            {[5, 4, 3, 2, 1].map(n => (
              <option key={n} value={n}>{n} Stars</option>
            ))}
          </select>
        </div>
        {!preview && (
          <div className="space-y-2">
            <label className="form-label" htmlFor="avatar_color">Fallback Color (HEX)</label>
            <div className="flex gap-3 items-center">
              <input 
                id="avatar_color" 
                name="avatar_color" 
                type="color" 
                defaultValue={initialData?.avatar_color || '#4edea3'} 
                className="w-12 h-12 rounded-lg border-0 bg-transparent cursor-pointer" 
              />
              <input 
                type="text" 
                defaultValue={initialData?.avatar_color || '#4edea3'} 
                className="form-input flex-1 font-mono uppercase" 
                onChange={(e) => {
                  const colorInput = document.getElementById('avatar_color') as HTMLInputElement
                  if (colorInput) colorInput.value = e.target.value
                }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label className="form-label" htmlFor="content">Testimonial Message</label>
        <textarea 
          id="content" 
          name="content" 
          required 
          defaultValue={initialData?.content} 
          rows={4} 
          className="form-input leading-relaxed" 
          placeholder="Enter the client's review message here..." 
        />
      </div>

      <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
        <label className="relative inline-flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            name="is_published" 
            className="sr-only peer" 
            defaultChecked={initialData ? initialData.is_published : true} 
          />
          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          <span className="ml-3 text-sm font-bold text-slate-700 uppercase tracking-widest">Published</span>
        </label>
        <p className="text-[10px] text-slate-500 font-medium leading-tight">
          When published, this testimonial will be visible on the public website.
        </p>
      </div>

      <button type="submit" disabled={loading || isCompressing} className="w-full btn-primary py-4 shadow-xl shadow-primary/20 flex items-center justify-center gap-2">
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            SAVING...
          </>
        ) : initialData ? (
          'UPDATE TESTIMONIAL'
        ) : (
          'CREATE TESTIMONIAL'
        )}
      </button>
    </form>
  )
}
