'use client';

import { motion } from 'framer-motion';
import { useState, FormEvent } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export function WaitlistForm({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
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
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const isDark = variant === 'dark';

  if (submitted) {
    return (
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
          You&apos;re on the list. We&apos;ll be in touch.
        </p>
      </motion.div>
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
