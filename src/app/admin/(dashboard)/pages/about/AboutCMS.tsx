'use client'

import { useState } from 'react'
import { updatePageContent } from '../actions'
import Link from 'next/link'

export default function AboutCMSPage({ initialData }: { initialData: any }) {
  const [content, setContent] = useState(initialData.content)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleStatChange = (index: number, field: string, value: string) => {
    const newStats = [...content.stats]
    newStats[index] = { ...newStats[index], [field]: value }
    setContent({ ...content, stats: newStats })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    try {
      await updatePageContent('about', content)
      setMessage('About page updated successfully!')
    } catch (err) {
      setMessage('Failed to update page.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-heading font-bold text-on-surface">About Page CMS</h2>
          <p className="text-secondary text-sm mt-1">Manage the narrative and statistics of your brand.</p>
        </div>
        <button 
          onClick={handleSubmit} 
          disabled={loading}
          className="btn-primary flex items-center gap-2"
        >
          {loading ? 'SAVING...' : 'SAVE CHANGES'}
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-2xl mb-8 text-sm font-bold uppercase tracking-widest text-center ${
          message.includes('success') ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-error/10 text-error border border-error/20'
        }`}>
          {message}
        </div>
      )}

      <form className="space-y-10">
        {/* Hero Section */}
        <div className="bg-surface-container-low p-6 sm:p-10 rounded-[2.5rem] ghost-border shadow-sm">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-8 flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">rocket_launch</span>
            Hero Section
          </h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="form-label">Hero Title</label>
              <input 
                className="form-input" 
                value={content.hero_title} 
                onChange={e => setContent({...content, hero_title: e.target.value})} 
              />
            </div>
            <div className="space-y-2">
              <label className="form-label">Hero Description</label>
              <textarea 
                className="form-input" 
                rows={3} 
                value={content.hero_description} 
                onChange={e => setContent({...content, hero_description: e.target.value})} 
              />
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface-container-low p-6 sm:p-10 rounded-[2.5rem] ghost-border shadow-sm">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-8 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">target</span>
              Mission
            </h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="form-label">Title</label>
                <input 
                  className="form-input" 
                  value={content.mission_title} 
                  onChange={e => setContent({...content, mission_title: e.target.value})} 
                />
              </div>
              <div className="space-y-2">
                <label className="form-label">Description</label>
                <textarea 
                  className="form-input" 
                  rows={4} 
                  value={content.mission_description} 
                  onChange={e => setContent({...content, mission_description: e.target.value})} 
                />
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low p-6 sm:p-10 rounded-[2.5rem] ghost-border shadow-sm">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-8 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">visibility</span>
              Vision
            </h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="form-label">Title</label>
                <input 
                  className="form-input" 
                  value={content.vision_title} 
                  onChange={e => setContent({...content, vision_title: e.target.value})} 
                />
              </div>
              <div className="space-y-2">
                <label className="form-label">Description</label>
                <textarea 
                  className="form-input" 
                  rows={4} 
                  value={content.vision_description} 
                  onChange={e => setContent({...content, vision_description: e.target.value})} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-surface-container-low p-6 sm:p-10 rounded-[2.5rem] ghost-border shadow-sm">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-8 flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">analytics</span>
            Company Statistics
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {content.stats.map((stat: any, index: number) => (
              <div key={index} className="space-y-4 p-4 bg-surface-container-highest/20 rounded-2xl border ghost-border">
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase tracking-widest opacity-50">Value</label>
                  <input 
                    className="form-input bg-white text-lg font-bold" 
                    value={stat.value} 
                    onChange={e => handleStatChange(index, 'value', e.target.value)} 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase tracking-widest opacity-50">Label</label>
                  <input 
                    className="form-input bg-white text-xs" 
                    value={stat.label} 
                    onChange={e => handleStatChange(index, 'label', e.target.value)} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  )
}
