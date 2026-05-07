'use client'

import { useState } from 'react'
import { submitQuote } from '@/app/(marketing)/quote/actions'

export default function QuotePage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    const result = await submitQuote(formData)
    setLoading(false)
    if (result.success) setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="py-24 px-4 sm:px-6 max-w-3xl mx-auto text-center">
        <span className="material-symbols-outlined text-6xl sm:text-7xl text-primary mb-6 block">check_circle</span>
        <h1 className="font-heading text-3xl sm:text-4xl font-black mb-4">Request Submitted!</h1>
        <p className="text-on-surface-variant text-base sm:text-lg">
          Thank you! Our experts will review your request and reach out to you within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <div className="py-16 sm:py-24 px-4 sm:px-6 max-w-3xl mx-auto">
      <div className="text-center mb-10 sm:mb-16">
        <h1 className="font-heading text-4xl sm:text-5xl font-black mb-4">Request an Expert Assessment</h1>
        <p className="text-on-surface-variant text-base sm:text-lg">
          Share a few details about your property, and our specialists will design a customized protection plan for you.
        </p>
      </div>

      <form action={handleSubmit} className="bg-surface-container-lowest p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl shadow-xl space-y-6 sm:space-y-8 ghost-border">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8">
          <div>
            <label className="form-label" htmlFor="first_name">First Name</label>
            <input id="first_name" type="text" name="first_name" required className="form-input" placeholder="Priya" />
          </div>
          <div>
            <label className="form-label" htmlFor="last_name">Last Name</label>
            <input id="last_name" type="text" name="last_name" required className="form-input" placeholder="Sharma" />
          </div>
        </div>

        <div>
          <label className="form-label" htmlFor="email">Email Address</label>
          <input id="email" type="email" name="email" required className="form-input" placeholder="priya@example.com" />
        </div>

        <div>
          <label className="form-label" htmlFor="concern">Type of Pest Concern</label>
          <select id="concern" name="concern" required className="form-input">
            <option value="">Select a category...</option>
            <option>Termites</option>
            <option>Cockroaches</option>
            <option>Rodents</option>
            <option>Bed Bugs</option>
            <option>Mosquitoes</option>
            <option>Ants</option>
            <option>General Prevention</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="form-label" htmlFor="details">Additional Details</label>
          <textarea
            id="details"
            name="details"
            rows={4}
            className="form-input"
            placeholder="Describe the environment and any specific concerns..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>
    </div>
  )
}
