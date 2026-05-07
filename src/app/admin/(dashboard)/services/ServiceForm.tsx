'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'

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
  const fileInputRef = useRef<HTMLInputElement>(null)

  const autoSlug = titleValue
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (ev) => setImagePreview(ev.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  return (
    <form action={action} encType="multipart/form-data" className="space-y-8">
      {service && <input type="hidden" name="id" value={service.id} />}
      {service?.image_url && <input type="hidden" name="existing_image_url" value={service.image_url} />}

      {/* Image Upload */}
      <div>
        <label className="form-label">Service Image</label>
        <div
          className="relative w-full h-52 rounded-2xl overflow-hidden bg-surface-container-highest border-2 border-dashed border-outline-variant cursor-pointer hover:border-primary transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-secondary gap-2">
              <span className="material-symbols-outlined text-5xl">add_photo_alternate</span>
              <p className="text-sm font-medium">Click to upload service image</p>
            </div>
          )}
          {imagePreview && (
            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-4xl">edit</span>
            </div>
          )}
        </div>
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
        <p className="text-xs text-secondary mt-1">Browse icons at <a href="https://fonts.google.com/icons" target="_blank" className="text-primary hover:underline">fonts.google.com/icons</a></p>
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

      {/* Features */}
      <div>
        <label className="form-label">Features (one per line)</label>
        <textarea
          name="features"
          rows={5}
          className="form-input font-mono text-sm"
          defaultValue={service?.features?.join('\n')}
          placeholder={"Thermal imaging detection\nLiquid barrier treatment\n5-year warranty"}
        />
      </div>

      {/* Published Toggle */}
      <div className="flex items-center gap-4 bg-surface-container-highest/50 p-4 rounded-xl">
        <input
          type="checkbox"
          id="is_published"
          name="is_published"
          defaultChecked={service?.is_published ?? false}
          className="w-5 h-5 accent-primary cursor-pointer"
        />
        <label htmlFor="is_published" className="cursor-pointer">
          <span className="font-bold text-on-surface block">Publish this service</span>
          <span className="text-sm text-secondary">Published services will appear on the public website</span>
        </label>
      </div>

      {/* Submit */}
      <div className="flex gap-4">
        <button type="submit" className="btn-primary">
          {service ? 'Save Changes' : 'Create Service'}
        </button>
        <a href="/admin/services" className="btn-secondary text-center">
          Cancel
        </a>
      </div>
    </form>
  )
}
