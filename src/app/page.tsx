'use client';

import { motion } from 'framer-motion';
import { useState, FormEvent } from 'react';
import { ArrowRight, ArrowDown, Check } from 'lucide-react';
import Image from 'next/image';
import Header from '@/components/header';
import Footer from '@/components/footer';

const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: d * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

function WaitlistForm({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => setShowPrompt(true), 1200);
    }, 800);
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
                placeholder="Optional"
                className={`w-64 px-4 py-2.5 text-[13px] rounded-full focus:outline-none transition-all ${
                  isDark
                    ? 'bg-white/10 border border-white/20 text-white placeholder:text-white/30 focus:border-primary/50 focus:ring-2 focus:ring-primary/20'
                    : 'bg-white border border-neutral-200 text-neutral-900 placeholder:text-neutral-300 focus:border-primary/40 focus:ring-2 focus:ring-primary/10'
                }`}
              />
              <button
                onClick={() => setShowPrompt(false)}
                className={`text-[12px] transition-colors ${
                  isDark ? 'text-white/40 hover:text-white/60' : 'text-neutral-400 hover:text-neutral-600'
                }`}
              >
                Skip
              </button>
            </div>
          </motion.div>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
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
    </form>
  );
}

function Pipeline() {
  const steps = ['Model', 'Simulation', 'Validation', 'Deployment'];

  return (
    <div className="flex flex-col sm:flex-row items-center gap-0">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center">
          {i > 0 && (
            <div className="hidden sm:block w-16 lg:w-24 h-px bg-white/15 mx-2" />
          )}
          {i > 0 && (
            <div className="sm:hidden h-10 w-px bg-white/15 mx-auto" />
          )}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={i + 1}
            variants={fade}
            className="flex flex-col items-center gap-3"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium border ${
              i === steps.length - 1
                ? 'bg-primary/20 text-primary border-primary/30'
                : 'bg-white/5 text-white/70 border-white/10'
            }`}>
              {i + 1}
            </div>
            <span className="text-sm text-white/60">{step}</span>
          </motion.div>
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <div className="grain" />
      <Header />

      <section className="relative min-h-[100svh] flex items-center justify-center px-5 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/bg.png" alt="" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs text-white/60 font-medium">Now accepting early access</span>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fade}
            className="font-serif text-[1.75rem] sm:text-5xl lg:text-7xl text-white tracking-tight leading-[1.1] mb-6 sm:mb-8"
          >
            Verify physical AI
            <br />
            <span className="text-white/50">before deployment.</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fade}
            className="text-base sm:text-xl text-white/60 font-light mb-10 sm:mb-12 max-w-lg mx-auto tracking-wide"
          >
            Simulation. Validation. Confidence.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            custom={3}
            variants={fade}
            className="flex flex-col items-center"
          >
            <WaitlistForm />
            <p className="text-xs text-white/30 mt-4">Free during beta</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-16 sm:mt-24"
          >
            <a href="#concept" className="inline-flex flex-col items-center gap-2 text-white/30 hover:text-white/50 transition-colors py-3 px-4">
              <span className="text-[11px] uppercase tracking-widest">How it works</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </a>
          </motion.div>
        </div>
      </section>

      <section id="concept" className="py-20 sm:py-32 bg-neutral-950 text-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-5 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fade}
            className="text-center mb-16 sm:mb-20"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-medium mb-4">The process</p>
            <h2 className="font-serif text-2xl sm:text-5xl tracking-tight">
              From model to deployment.
            </h2>
          </motion.div>

          <div className="flex justify-center">
            <Pipeline />
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-32 border-b border-neutral-100">
        <div className="max-w-4xl mx-auto px-5 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fade}
            className="text-center mb-16 sm:mb-20"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium mb-4">Why it matters</p>
            <h2 className="font-serif text-2xl sm:text-5xl tracking-tight text-neutral-900">
              Ship with confidence.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
            {[
              { title: 'Catch failures early', desc: 'Before they reach hardware.' },
              { title: 'Test under constraints', desc: 'Real physics. Real limits.' },
              { title: 'Reduce real-world risk', desc: 'Deploy without doubt.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i + 1}
                variants={fade}
                className="text-center"
              >
                <h3 className="font-serif text-lg sm:text-xl text-neutral-900 mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-500 font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-32 bg-neutral-950 text-white">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fade}
          >
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-medium">Status</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl tracking-tight mb-3">In development</h2>
            <p className="text-sm text-neutral-500 font-light">Early access soon.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 sm:py-32">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fade}
          >
            <h2 className="font-serif text-2xl sm:text-5xl tracking-tight text-neutral-900 mb-4 sm:mb-6">
              Be the first to verify.
            </h2>
            <p className="text-neutral-500 text-sm sm:text-base max-w-md mx-auto mb-8 sm:mb-10 font-light">
              Join the waitlist for early access.
            </p>
            <div className="flex justify-center mb-4">
              <WaitlistForm variant="light" />
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
