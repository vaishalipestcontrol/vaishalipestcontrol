'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function SettingsPage() {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const supabase = createClient()

  async function handleUpdatePassword(e: React.FormEvent) {
    e.preventDefault()
    setErrorMsg('')
    setSuccess(false)

    // 1. Client-side Validations
    if (newPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.')
      return
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please verify.')
      return
    }

    setLoading(true)

    try {
      // 2. Execute Supabase Auth Password Update
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      })

      if (error) {
        throw error
      }

      setSuccess(true)
      setNewPassword('')
      setConfirmPassword('')
    } catch (err: any) {
      console.error('Password update error:', err)
      setErrorMsg(err.message || 'Failed to update password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 sm:p-8 max-w-2xl mx-auto">
      <div className="mb-10">
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-on-surface">Security & Credentials</h2>
        <p className="text-secondary text-sm mt-1">Manage and update your administrative portal access credentials securely.</p>
      </div>

      <div className="bg-surface-container-low rounded-3xl p-6 sm:p-10 shadow-sm ghost-border relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-[-20%] right-[-20%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[80px]" />

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">lock_reset</span>
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-on-surface">Update Account Password</h3>
              <p className="text-secondary text-xs">Ensure your account is protected by a strong, unique password.</p>
            </div>
          </div>

          <form onSubmit={handleUpdatePassword} className="space-y-6">
            {/* Success Alert */}
            {success && (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-sm flex items-start gap-3 animate-fade-in">
                <span className="material-symbols-outlined text-lg mt-0.5 text-emerald-500">check_circle</span>
                <div>
                  <p className="font-bold">Password Updated Successfully!</p>
                  <p className="text-xs text-emerald-500/80 mt-0.5">Your admin account credentials have been secured. Use this new password for your next login.</p>
                </div>
              </div>
            )}

            {/* Error Alert */}
            {errorMsg && (
              <div className="p-4 rounded-2xl bg-error/10 border border-error/20 text-error text-sm flex items-start gap-3">
                <span className="material-symbols-outlined text-lg mt-0.5">warning</span>
                <div>
                  <p className="font-bold">Update Failed</p>
                  <p className="text-xs text-error/80 mt-0.5">{errorMsg}</p>
                </div>
              </div>
            )}

            {/* Password guidelines */}
            <div className="p-4 rounded-2xl bg-surface-container-highest/40 border border-outline-variant/30 text-secondary text-xs space-y-1">
              <p className="font-bold text-on-surface mb-1">Password Requirements:</p>
              <ul className="list-disc pl-4 space-y-0.5">
                <li>Minimum of 6 characters in length</li>
                <li>Avoid using simple words or repeating patterns</li>
                <li>Store in a secure corporate password manager</li>
              </ul>
            </div>

            {/* New Password input */}
            <div className="space-y-2">
              <label htmlFor="new-password" className="form-label text-xs uppercase tracking-widest font-black opacity-60 ml-1">
                New Secure Password
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-secondary/40 text-lg select-none">
                  vpn_key
                </span>
                <input
                  id="new-password"
                  type={showNewPassword ? 'text' : 'password'}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="form-input pl-11 pr-12 bg-white transition-all focus:border-primary"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary/40 hover:text-primary transition-colors flex items-center justify-center p-1 rounded-md"
                  tabIndex={-1}
                >
                  <span className="material-symbols-outlined text-lg select-none">
                    {showNewPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Confirm Password input */}
            <div className="space-y-2">
              <label htmlFor="confirm-password" className="form-label text-xs uppercase tracking-widest font-black opacity-60 ml-1">
                Confirm New Password
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-secondary/40 text-lg select-none">
                  lock
                </span>
                <input
                  id="confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="form-input pl-11 pr-12 bg-white transition-all focus:border-primary"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary/40 hover:text-primary transition-colors flex items-center justify-center p-1 rounded-md"
                  tabIndex={-1}
                >
                  <span className="material-symbols-outlined text-lg select-none">
                    {showConfirmPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-4 text-xs font-black tracking-[0.2em] shadow-xl shadow-primary/10 hover:shadow-primary/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  SECURING DATABASE...
                </>
              ) : (
                'UPDATE ACCESS PASSWORD'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
