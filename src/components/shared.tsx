'use client';

import { motion } from 'framer-motion';
import { useState, FormEvent } from 'react';
import { Check, Calendar } from 'lucide-react';

export function DemoForm() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', useCase: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit');
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-4 py-8"
      >
        <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
          <Check className="w-5 h-5 text-green-600" />
        </div>
        <div className="text-center">
          <p className="text-lg font-medium text-neutral-900">Demo requested.</p>
          <p className="text-sm text-neutral-500 font-light mt-1">We&apos;ll be in touch within 24 hours.</p>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm mx-auto">
      <div>
        <label htmlFor="demo-name" className="block text-[12px] uppercase tracking-wider text-neutral-400 font-medium mb-1.5">Name</label>
        <input id="demo-name" type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 text-sm text-neutral-900 bg-white border border-neutral-200 rounded-xl focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-neutral-300" placeholder="Your name" />
      </div>
      <div>
        <label htmlFor="demo-email" className="block text-[12px] uppercase tracking-wider text-neutral-400 font-medium mb-1.5">Email</label>
        <input id="demo-email" type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 text-sm text-neutral-900 bg-white border border-neutral-200 rounded-xl focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-neutral-300" placeholder="you@company.com" />
      </div>
      <div>
        <label htmlFor="demo-company" className="block text-[12px] uppercase tracking-wider text-neutral-400 font-medium mb-1.5">Company</label>
        <input id="demo-company" type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="w-full px-4 py-3 text-sm text-neutral-900 bg-white border border-neutral-200 rounded-xl focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-neutral-300" placeholder="Optional" />
      </div>
      <div>
        <label htmlFor="demo-usecase" className="block text-[12px] uppercase tracking-wider text-neutral-400 font-medium mb-1.5">What operations do you need?</label>
        <select id="demo-usecase" value={formData.useCase} onChange={(e) => setFormData({ ...formData, useCase: e.target.value })} className="w-full px-4 py-3 text-sm text-neutral-900 bg-white border border-neutral-200 rounded-xl focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all appearance-none">
          <option value="">Select a category</option>
          <option value="reconciliation">Reconciliation (cross-system)</option>
          <option value="audit">Audit Readiness (SARS / POPIA)</option>
          <option value="reporting">Regulatory Reporting</option>
          <option value="multibranch">Multi-branch Operations</option>
          <option value="other">Other</option>
        </select>
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
      <button type="submit" disabled={loading} className="w-full px-6 py-3.5 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
        {loading ? (
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <><Calendar className="w-4 h-4" />Request Demo</>
        )}
      </button>
    </form>
  );
}
