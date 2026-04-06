'use client';

import { motion } from 'framer-motion';
import { useState, FormEvent } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';

const fade = {
  hidden: { opacity: 0 },
  visible: (d: number) => ({
    opacity: 1,
    transition: { duration: 0.6, delay: d * 0.1, ease: 'easeOut' },
  }),
};

const noMotion = {
  hidden: { opacity: 1 },
  visible: () => ({ opacity: 1 }),
};

function WaitlistForm() {
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

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[15px] text-neutral-900 font-medium"
        >
          You&apos;re on the list.
        </motion.p>

        {showPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-3"
          >
            <label htmlFor="building" className="text-[13px] text-neutral-500">What are you building?</label>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <input
                id="building"
                type="text"
                placeholder="Optional"
                className="w-64 px-4 py-2.5 text-[13px] text-neutral-900 bg-white border border-neutral-200 rounded-xl focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-neutral-300"
              />
              <button
                onClick={() => setShowPrompt(false)}
                className="text-[12px] text-neutral-400 hover:text-neutral-600 transition-colors"
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
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-sm">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        aria-label="Email address"
        className="w-full sm:flex-1 px-4 py-2.5 text-[13px] text-neutral-900 bg-white border border-neutral-200 rounded-xl focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-neutral-300"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full sm:w-auto px-6 py-2.5 bg-primary text-white text-[13px] font-medium rounded-xl hover:bg-primary-dark transition-colors duration-200 disabled:opacity-50 flex-shrink-0"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-3 h-3 border-[1.5px] border-white/30 border-t-white rounded-full animate-spin" />
          </span>
        ) : (
          'Join'
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
            <div className="hidden sm:block w-12 lg:w-20 h-px bg-neutral-200 mx-1" />
          )}
          {i > 0 && (
            <div className="sm:hidden h-8 w-px bg-neutral-200 mx-auto" />
          )}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={i + 1}
            variants={fade}
            className="flex flex-col items-center gap-2"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[12px] font-medium ${
              i === steps.length - 1
                ? 'bg-primary/10 text-primary border border-primary/20'
                : 'bg-neutral-50 text-neutral-500 border border-neutral-100'
            }`}>
              {i + 1}
            </div>
            <span className="text-[13px] text-neutral-500">{step}</span>
          </motion.div>
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Header />

      <section className="min-h-[100svh] flex items-center justify-center px-6 pt-16">
        <div className="max-w-xl mx-auto text-center">
          <motion.h1
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fade}
            className="text-3xl sm:text-[2.75rem] lg:text-5xl font-semibold tracking-tight leading-[1.15] text-neutral-900"
          >
            Verify physical AI
            <br />
            before deployment.
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fade}
            className="mt-5 text-[15px] sm:text-base text-neutral-500 font-light tracking-wide"
          >
            Simulation. Validation. Confidence.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fade}
            className="mt-10 flex justify-center"
          >
            <WaitlistForm />
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            custom={3}
            variants={fade}
            className="mt-6"
          >
            <a
              href="#"
              className="text-[13px] text-neutral-400 hover:text-neutral-900 transition-colors duration-200"
            >
              Sign in
            </a>
          </motion.div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-neutral-100" />
      </div>

      <section className="py-24 sm:py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fade}
            className="text-center mb-16"
          >
            <p className="text-[12px] uppercase tracking-[0.2em] text-neutral-400 font-medium">
              How it works
            </p>
          </motion.div>

          <div className="flex justify-center">
            <Pipeline />
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-neutral-100" />
      </div>

      <section className="py-24 sm:py-32 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fade}
            className="text-center mb-16"
          >
            <p className="text-[12px] uppercase tracking-[0.2em] text-neutral-400 font-medium">
              Why it matters
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8 text-center">
            {[
              { title: 'Catch failures early', desc: 'Before they reach hardware.' },
              { title: 'Test under constraints', desc: 'Real physics. Real limits.' },
              { title: 'Reduce real-world risk', desc: 'Ship with confidence.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i + 1}
                variants={fade}
              >
                <p className="text-[15px] font-medium text-neutral-900">{item.title}</p>
                <p className="mt-2 text-[13px] text-neutral-400 font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-neutral-100" />
      </div>

      <section className="py-24 sm:py-32 px-6">
        <div className="max-w-md mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fade}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[12px] uppercase tracking-[0.2em] text-neutral-400 font-medium">
                Status
              </span>
            </div>
            <p className="text-[15px] text-neutral-900 font-medium">In development</p>
            <p className="mt-2 text-[13px] text-neutral-400 font-light">Early access soon.</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
