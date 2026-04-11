'use client';

import { motion } from 'framer-motion';
import { useState, FormEvent } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export function WaitlistForm({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  const [email, setEmail] = useState('');
  const [building, setBuilding] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to join');
      setSubmitted(true);
      setTimeout(() => setShowPrompt(true), 1200);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleBuildingSubmit = async () => {
    if (!building.trim()) { setShowPrompt(false); return; }
    try {
      await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, building }),
      });
    } catch { /* silent */ }
    setShowPrompt(false);
  };

  const isDark = variant === 'dark';

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-3"
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
            isDark ? 'bg-white/10' : 'bg-green-50'
          }`}>
            <Check className={`w-4 h-4 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
          </div>
          <p className={`text-[15px] font-medium ${isDark ? 'text-white' : 'text-neutral-900'}`}>
            You&apos;re on the list.
          </p>
        </motion.div>

        {showPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-3"
          >
            <label htmlFor="building" className={`text-[13px] ${isDark ? 'text-white/50' : 'text-neutral-500'}`}>
              What are you building?
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <input
                id="building"
                type="text"
                value={building}
                onChange={(e) => setBuilding(e.target.value)}
                placeholder="Optional"
                onKeyDown={(e) => { if (e.key === 'Enter') handleBuildingSubmit(); }}
                className={`w-64 px-4 py-2.5 text-[13px] rounded-full focus:outline-none transition-all ${
                  isDark
                    ? 'bg-white/10 border border-white/20 text-white placeholder:text-white/30 focus:border-primary/50 focus:ring-2 focus:ring-primary/20'
                    : 'bg-white border border-neutral-200 text-neutral-900 placeholder:text-neutral-300 focus:border-primary/40 focus:ring-2 focus:ring-primary/10'
                }`}
              />
              <button
                onClick={handleBuildingSubmit}
                className={`text-[12px] font-medium transition-colors ${
                  isDark ? 'text-primary hover:text-primary-dark' : 'text-primary hover:text-primary-dark'
                }`}
              >
                {building.trim() ? 'Send' : 'Skip'}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2 w-full max-w-md">
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <input
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-label="Email address"
          className={`flex-1 px-5 py-3.5 rounded-full text-sm focus:outline-none transition-all ${
            isDark
              ? 'placeholder:text-white/40 border border-white/20 bg-white/10 text-white backdrop-blur-sm focus:ring-2 focus:ring-primary/30 focus:border-primary/50'
              : 'placeholder:text-neutral-400 border border-neutral-200 bg-white text-neutral-900 focus:ring-2 focus:ring-primary/20 focus:border-primary/40'
          }`}
        />
        <button
          type="submit"
          disabled={loading}
          className="px-7 py-3.5 rounded-full font-medium text-sm transition-all disabled:opacity-60 flex items-center justify-center gap-2 flex-shrink-0 bg-primary text-white hover:bg-primary-dark"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>Join <ArrowRight className="w-4 h-4" /></>
          )}
        </button>
      </div>
      {error && <p className={`text-xs ${isDark ? 'text-red-400' : 'text-red-500'}`}>{error}</p>}
    </form>
  );
}
