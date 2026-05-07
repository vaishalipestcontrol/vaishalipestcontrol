'use client'

import { useState, useRef } from 'react'
import { compressImage } from '@/lib/utils/imageCompression'

interface ServiceFormProps {
  service?: {
    id: string
    title: string
    slug: string
    short_description: string
    description: string
    icon: string
    image_url: string | null
    features: string[]
    is_published: boolean
  } | null
  action: (formData: FormData) => Promise<void>
}

export default function ServiceForm({ service, action }: ServiceFormProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(service?.image_url || null)
  const [titleValue, setTitleValue] = useState(service?.title || '')
  const [compressedFile, setCompressedFile] = useState<File | null>(null)
  const [isCompressing, setIsCompressing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [sizeStats, setSizeStats] = useState<{ original: string; compressed: string } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const autoSlug = titleValue
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsCompressing(true)
      const originalSizeStr = formatSize(file.size)

      // Preview the original image immediately for responsive feel
      const reader = new FileReader()
      reader.onload = (ev) => setImagePreview(ev.target?.result as string)
      reader.readAsDataURL(file)

      try {
        // Compress the image down to standard sizing (JPEG quality 0.82)
        const compressed = await compressImage(file, 1400, 1400, 0.82)
        setCompressedFile(compressed)
        const compressedSizeStr = formatSize(compressed.size)
        setSizeStats({
          original: originalSizeStr,
          compressed: compressedSizeStr,
        })
      } catch (error) {
        console.error('Image compression failed:', error)
      } finally {
        setIsCompressing(false)
      }
    }
  }

  const handleSubmit = async (formData: FormData) => {
    setIsSaving(true)
    if (compressedFile) {
      // Overwrite the uploaded image file field with the client-side compressed version
      formData.set('image', compressedFile)
    }
    try {
      await action(formData)
    } catch (err: any) {
      // Let Next.js handle redirect errors without popping up a false alert
      if (err?.message === 'NEXT_REDIRECT' || err?.digest?.includes('NEXT_REDIRECT')) {
        throw err
      }
      console.error(err)
      alert('Error updating service')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form action={handleSubmit} className="space-y-8">
      {service && <input type="hidden" name="id" value={service.id} />}
      {service?.image_url && <input type="hidden" name="existing_image_url" value={service.image_url} />}

      {/* Image Upload */}
      <div>
        <label className="form-label">Service Image</label>
        <div
          className="relative w-full h-64 rounded-2xl overflow-hidden bg-slate-50 border-2 border-dashed border-slate-200 cursor-pointer hover:border-primary/50 transition-colors flex items-center justify-center"
          onClick={() => fileInputRef.current?.click()}
        >
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-400 gap-2 p-6">
              <span className="material-symbols-outlined text-5xl">add_photo_alternate</span>
              <p className="text-sm font-bold text-slate-600">Click to upload service image</p>
              <p className="text-xs text-slate-400">Accepts 5MB+ images (will auto-compress smoothly)</p>
            </div>
          )}
          {imagePreview && (
            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-1">
              <span className="material-symbols-outlined text-3xl">edit</span>
              <span className="text-xs font-semibold">Change Image</span>
            </div>
          )}

          {/* Compressing Indicator Overlay */}
          {isCompressing && (
            <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center gap-3">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs font-bold text-primary uppercase tracking-wider">Optimizing High-Res Image...</p>
            </div>
          )}
        </div>

        {/* Compression Statistics Badge */}
        {sizeStats && !isCompressing && (
          <div className="mt-3 flex items-center gap-2 text-xs">
            <span className="bg-slate-100 text-slate-600 font-medium px-2.5 py-1 rounded-full">
              Original: {sizeStats.original}
            </span>
            <span className="text-slate-300">→</span>
            <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">check_circle</span> Optimized: {sizeStats.compressed}
            </span>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          name="image"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div>
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            required
            className="form-input"
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
            placeholder="e.g. Termite Control"
          />
        </div>
        {/* Slug (auto-generated) */}
        <div>
          <label className="form-label">Slug (URL path)</label>
          <input
            type="text"
            name="slug"
            required
            className="form-input font-mono text-sm"
            defaultValue={service?.slug}
            value={service ? undefined : autoSlug}
            readOnly={!service}
            placeholder="auto-generated"
          />
        </div>
      </div>

      {/* Icon */}
      <div>
        <label className="form-label">Material Icon Name</label>
        <input
          type="text"
          name="icon"
          required
          className="form-input"
          defaultValue={service?.icon || 'pest_control'}
          placeholder="pest_control"
        />
        <p className="text-xs text-slate-400 mt-1">Browse icons at <a href="https://fonts.google.com/icons" target="_blank" className="text-primary hover:underline">fonts.google.com/icons</a></p>
      </div>

      {/* Short Description */}
      <div>
        <label className="form-label">Short Description (for card)</label>
        <input
          type="text"
          name="short_description"
          required
          className="form-input"
          defaultValue={service?.short_description}
          placeholder="Brief one-line description shown on the services list"
        />
      </div>

      {/* Full Description */}
      <div>
        <label className="form-label">Full Description (for detail page)</label>
        <textarea
          name="description"
          rows={5}
          required
          className="form-input"
          defaultValue={service?.description}
          placeholder="Detailed description shown on the individual service page..."
        />
      </div>

      {/* What's Included */}
      <div>
        <label className="form-label">What&apos;s Included (one per line)</label>
        <textarea
          name="features"
          rows={5}
          className="form-input font-mono text-sm mb-1.5"
          defaultValue={Array.isArray(service?.features) ? service.features.join('\n') : ''}
          placeholder={"Drill-Fill-Seal advanced technology\nKid & pet friendly chemicals\n5-year service warranty"}
        />
        <p className="text-xs text-slate-400">
          Enter each feature or bullet point on a new line. These will appear in the <strong>What&apos;s Included</strong> list on the public service detail page.
        </p>
      </div>

      {/* Published Toggle */}
      <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl">
        <input
          type="checkbox"
          id="is_published"
          name="is_published"
          defaultChecked={service?.is_published ?? false}
          className="w-5 h-5 accent-primary cursor-pointer"
        />
        <label htmlFor="is_published" className="cursor-pointer">
          <span className="font-bold text-slate-800 block">Publish this service</span>
          <span className="text-sm text-slate-500">Published services will appear on the public website</span>
        </label>
      </div>

      {/* Submit */}
      <div className="flex gap-4">
        <button type="submit" disabled={isSaving || isCompressing} className="btn-primary flex items-center gap-2">
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Saving...
            </>
          ) : service ? (
            'Save Changes'
          ) : (
            'Create Service'
          )}
        </button>
        <a href="/admin/services" className="btn-secondary text-center">
          Cancel
        </a>
      </div>
    </form>
  )
}
