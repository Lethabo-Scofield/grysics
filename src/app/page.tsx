'use client';

import { motion, useInView, useReducedMotion, MotionConfig } from 'framer-motion';
import { useState, useRef, useEffect, FormEvent } from 'react';
import { ArrowRight, ArrowDown, Check, Calendar } from 'lucide-react';
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

function ArchitectureDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    if (!isInView) return;
    if (prefersReducedMotion) { setActiveStep(4); return; }
    let step = 0;
    const timer = setInterval(() => {
      setActiveStep(step);
      step++;
      if (step > 4) clearInterval(timer);
    }, 600);
    return () => clearInterval(timer);
  }, [isInView, prefersReducedMotion]);

  const nodes = [
    { x: 60, y: 100, label: 'Your AI', sub: 'Model / App' },
    { x: 240, y: 50, label: 'Grysics', sub: 'Verification' },
    { x: 240, y: 150, label: 'Test Suite', sub: 'Scenarios' },
    { x: 420, y: 100, label: 'Report', sub: 'Pass / Fail' },
    { x: 560, y: 100, label: 'Deploy', sub: 'Production' },
  ];

  const instant = prefersReducedMotion;

  return (
    <div ref={ref} className="relative w-full max-w-2xl mx-auto">
      <svg viewBox="0 0 620 200" className="w-full h-auto" fill="none" role="img" aria-labelledby="arch-title arch-desc">
        <title id="arch-title">Grysics verification flow</title>
        <desc id="arch-desc">Diagram showing the flow: Your AI connects to Grysics verification and test suite, which produces a report, leading to deployment.</desc>
        <motion.line x1="110" y1="100" x2="200" y2="55" stroke={activeStep >= 1 ? '#F97316' : '#333'} strokeWidth="1.5" strokeDasharray={activeStep >= 1 ? "0" : "4 4"} initial={{ pathLength: instant ? 1 : 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ duration: instant ? 0 : 0.5, delay: instant ? 0 : 0.3 }} />
        <motion.line x1="110" y1="100" x2="200" y2="150" stroke={activeStep >= 2 ? '#F97316' : '#333'} strokeWidth="1.5" strokeDasharray={activeStep >= 2 ? "0" : "4 4"} initial={{ pathLength: instant ? 1 : 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ duration: instant ? 0 : 0.5, delay: instant ? 0 : 0.6 }} />
        <motion.line x1="290" y1="55" x2="380" y2="100" stroke={activeStep >= 3 ? '#F97316' : '#333'} strokeWidth="1.5" strokeDasharray={activeStep >= 3 ? "0" : "4 4"} initial={{ pathLength: instant ? 1 : 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ duration: instant ? 0 : 0.5, delay: instant ? 0 : 0.9 }} />
        <motion.line x1="290" y1="150" x2="380" y2="100" stroke={activeStep >= 3 ? '#F97316' : '#333'} strokeWidth="1.5" strokeDasharray={activeStep >= 3 ? "0" : "4 4"} initial={{ pathLength: instant ? 1 : 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ duration: instant ? 0 : 0.5, delay: instant ? 0 : 1.0 }} />
        <motion.line x1="460" y1="100" x2="520" y2="100" stroke={activeStep >= 4 ? '#22c55e' : '#333'} strokeWidth="1.5" strokeDasharray={activeStep >= 4 ? "0" : "4 4"} initial={{ pathLength: instant ? 1 : 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ duration: instant ? 0 : 0.5, delay: instant ? 0 : 1.3 }} />

        {nodes.map((node, i) => (
          <motion.g key={node.label} initial={{ opacity: instant ? 1 : 0, scale: instant ? 1 : 0.8 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: instant ? 0 : 0.4, delay: instant ? 0 : i * 0.2 }}>
            <rect x={node.x - 45} y={node.y - 30} width="90" height="60" rx="12" fill={activeStep >= i ? (i === 4 ? '#22c55e10' : '#F9731610') : '#ffffff08'} stroke={activeStep >= i ? (i === 4 ? '#22c55e40' : '#F9731640') : '#ffffff15'} strokeWidth="1" />
            <text x={node.x} y={node.y - 5} textAnchor="middle" fill={activeStep >= i ? '#fff' : '#888'} fontSize="12" fontWeight="500">{node.label}</text>
            <text x={node.x} y={node.y + 12} textAnchor="middle" fill="#666" fontSize="9">{node.sub}</text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}

const TERMINAL_LINES = [
  { text: 'Connecting to AI endpoint...', status: 'info' },
  { text: 'Running accuracy checks', status: 'info' },
  { text: '  Factual accuracy          98.4%', status: 'pass' },
  { text: '  Hallucination rate         1.2%', status: 'pass' },
  { text: '  Context adherence         96.8%', status: 'pass' },
  { text: 'Running latency checks', status: 'info' },
  { text: '  P50 response time          340ms', status: 'pass' },
  { text: '  P99 response time          1.2s', status: 'warn' },
  { text: 'Running edge case tests', status: 'info' },
  { text: '  Adversarial inputs        PASS', status: 'pass' },
  { text: '  Empty context handling    PASS', status: 'pass' },
  { text: '  Token limit behavior      PASS', status: 'pass' },
  { text: '', status: 'info' },
  { text: '  11/12 checks passed  \u00b7  1 warning', status: 'result' },
  { text: '  Ready for deployment', status: 'pass' },
];

function VerificationTerminal() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();
  const [lines, setLines] = useState<{ text: string; status: string }[]>([]);

  useEffect(() => {
    if (!isInView) return;
    if (prefersReducedMotion) { setLines([...TERMINAL_LINES]); return; }
    let i = 0;
    const timer = setInterval(() => {
      if (i < TERMINAL_LINES.length) {
        setLines(prev => [...prev, TERMINAL_LINES[i]]);
        i++;
      } else {
        clearInterval(timer);
      }
    }, 180);
    return () => clearInterval(timer);
  }, [isInView, prefersReducedMotion]);

  return (
    <div ref={ref} className="rounded-2xl border border-white/10 bg-black overflow-hidden shadow-2xl shadow-black/50">
      <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
        <div className="flex gap-1.5" aria-hidden="true">
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
        </div>
        <span className="text-[11px] text-white/30 ml-2 font-mono">grysics verify --target production</span>
      </div>
      <div className="p-4 sm:p-6 font-mono text-[11px] sm:text-[12px] leading-relaxed min-h-[280px] sm:min-h-[320px]" role="log" aria-label="Verification output" aria-live="polite">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: prefersReducedMotion ? 1 : 0, x: prefersReducedMotion ? 0 : -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.15 }}
            className={`${
              line.status === 'pass' ? 'text-green-400' :
              line.status === 'warn' ? 'text-amber-400' :
              line.status === 'result' ? 'text-primary font-semibold' :
              'text-white/50'
            }`}
          >
            {line.text || '\u00A0'}
          </motion.div>
        ))}
        {lines.length < TERMINAL_LINES.length && (
          <span className="inline-block w-2 h-4 bg-primary/80 animate-pulse" aria-hidden="true" />
        )}
      </div>
    </div>
  );
}

function CoverageGraph() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  const prefersReducedMotion = useReducedMotion();
  const instant = prefersReducedMotion;

  const categories = [
    { name: 'Conversational AI', value: 98, priority: true },
    { name: 'RAG Systems', value: 96, priority: true },
    { name: 'Agents', value: 94, priority: true },
    { name: 'Generative AI', value: 97, priority: true },
    { name: 'Recommendations', value: 90, priority: false },
    { name: 'Computer Vision', value: 88, priority: false },
    { name: 'Speech & Audio', value: 85, priority: false },
    { name: 'Predictive', value: 82, priority: false },
  ];

  return (
    <div ref={ref} className="space-y-3" role="list" aria-label="AI category coverage">
      {categories.map((cat, i) => (
        <motion.div
          key={cat.name}
          initial={{ opacity: instant ? 1 : 0, x: instant ? 0 : -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: instant ? 0 : 0.4, delay: instant ? 0 : i * 0.08 }}
          className="flex items-center gap-4"
          role="listitem"
          aria-label={`${cat.name}: ${cat.value}% coverage${cat.priority ? ' (priority)' : ''}`}
        >
          <span className={`text-[11px] sm:text-xs w-32 sm:w-36 text-right flex-shrink-0 ${
            cat.priority ? 'text-white font-medium' : 'text-white/40'
          }`}>
            {cat.name}
          </span>
          <div className="flex-1 h-6 bg-white/5 rounded overflow-hidden relative" aria-hidden="true">
            <motion.div
              className={`h-full rounded origin-left ${cat.priority ? 'bg-primary' : 'bg-white/15'}`}
              style={{ width: `${cat.value}%` }}
              initial={{ scaleX: instant ? 1 : 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: instant ? 0 : 0.8, delay: instant ? 0 : i * 0.08 + 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-white/50 font-mono">
              {cat.value}%
            </span>
          </div>
          {cat.priority && (
            <span className="text-[9px] uppercase tracking-wider text-primary font-semibold flex-shrink-0 hidden sm:block">
              Priority
            </span>
          )}
        </motion.div>
      ))}
    </div>
  );
}

function WaitlistForm({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
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

function DemoForm() {
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
        <label htmlFor="demo-usecase" className="block text-[12px] uppercase tracking-wider text-neutral-400 font-medium mb-1.5">What are you verifying?</label>
        <select id="demo-usecase" value={formData.useCase} onChange={(e) => setFormData({ ...formData, useCase: e.target.value })} className="w-full px-4 py-3 text-sm text-neutral-900 bg-white border border-neutral-200 rounded-xl focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all appearance-none">
          <option value="">Select a category</option>
          <option value="chatbot">Chatbot / Conversational AI</option>
          <option value="rag">RAG System</option>
          <option value="agent">Autonomous Agent</option>
          <option value="generative">Generative AI</option>
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

export default function HomePage() {
  return (
    <MotionConfig reducedMotion="user">
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
            Verify your AI
            <br />
            <span className="text-white/50">before it ships.</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fade}
            className="text-base sm:text-xl text-white/60 font-light mb-10 sm:mb-12 max-w-xl mx-auto"
          >
            Catch failures in chatbots, agents, RAG systems,
            <br className="hidden sm:block" />
            and generative AI before your users do.
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
            <a href="#how-it-works" className="inline-flex flex-col items-center gap-2 text-white/30 hover:text-white/50 transition-colors py-3 px-4">
              <span className="text-[11px] uppercase tracking-widest">How it works</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </a>
          </motion.div>
        </div>
      </section>

      <section id="how-it-works" className="py-20 sm:py-32 bg-neutral-950 text-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-5 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fade}
            className="text-center mb-12 sm:mb-16"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-medium mb-4">How it works</p>
            <h2 className="font-serif text-2xl sm:text-5xl tracking-tight">
              One layer between build
              <span className="text-white/40"> and deploy.</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            variants={fade}
          >
            <ArchitectureDiagram />
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden mt-16">
            {[
              { value: '< 3min', label: 'Full verification' },
              { value: '12+', label: 'Quality checks' },
              { value: '99.9%', label: 'Deploy success' },
              { value: '0', label: 'Missed failures' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i + 2}
                variants={fade}
                className="bg-neutral-950 p-6 sm:p-8 text-center"
              >
                <p className="font-serif text-xl sm:text-2xl italic text-white mb-1">{stat.value}</p>
                <p className="text-[10px] sm:text-xs text-neutral-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-32 border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-5 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              variants={fade}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium mb-4">Live verification</p>
              <h2 className="font-serif text-2xl sm:text-4xl tracking-tight text-neutral-900 mb-4">
                See exactly what passes.
                <span className="text-neutral-400"> And what doesn&apos;t.</span>
              </h2>
              <p className="text-sm sm:text-base text-neutral-500 font-light leading-relaxed mb-8">
                Grysics runs a full suite of checks against your AI and generates a clear, actionable report. No guesswork.
              </p>
              <div className="space-y-3">
                {[
                  { label: 'Accuracy & hallucination detection', color: 'bg-green-500' },
                  { label: 'Latency & performance profiling', color: 'bg-green-500' },
                  { label: 'Edge case & adversarial testing', color: 'bg-green-500' },
                  { label: 'Regression detection across updates', color: 'bg-amber-500' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className={`w-1.5 h-1.5 rounded-full ${item.color} flex-shrink-0`} />
                    <span className="text-sm text-neutral-600">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
              variants={fade}
            >
              <VerificationTerminal />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-32 bg-neutral-950 text-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-5 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fade}
            className="text-center mb-12 sm:mb-16"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-medium mb-4">Coverage</p>
            <h2 className="font-serif text-2xl sm:text-5xl tracking-tight">
              Every type of AI.
              <span className="text-white/40"> One verification layer.</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            variants={fade}
          >
            <CoverageGraph />
          </motion.div>
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
              Failures hide in plain sight.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { num: '73%', title: 'Hallucinate silently', desc: 'AI gives wrong answers with full confidence. Users trust bad output.' },
              { num: '4.2h', title: 'Before detection', desc: 'Average time to discover a regression. Hours of broken user experience.' },
              { num: '68%', title: 'Fail on edge cases', desc: 'Models pass standard tests but break on real-world inputs.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i + 1}
                variants={fade}
                className="p-6 sm:p-8 rounded-2xl border border-neutral-100 bg-neutral-50/50"
              >
                <p className="font-serif text-3xl sm:text-4xl italic text-primary mb-3">{item.num}</p>
                <h3 className="text-base font-medium text-neutral-900 mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-500 font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="book-demo" className="py-20 sm:py-32 border-b border-neutral-100">
        <div className="max-w-4xl mx-auto px-5 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              variants={fade}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium mb-4">Book a demo</p>
              <h2 className="font-serif text-2xl sm:text-4xl tracking-tight text-neutral-900 mb-4">
                See Grysics in action.
              </h2>
              <p className="text-sm sm:text-base text-neutral-500 font-light leading-relaxed mb-8">
                Get a walkthrough of how Grysics catches failures in your AI before they reach users.
              </p>
              <div className="space-y-4">
                {[
                  'Live verification of your AI type',
                  'See real failure detection in action',
                  'Custom setup for your workflow',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm text-neutral-600">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              variants={fade}
              className="bg-neutral-50 rounded-2xl p-6 sm:p-8 border border-neutral-100"
            >
              <DemoForm />
            </motion.div>
          </div>
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
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium">Status</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl tracking-tight text-neutral-900 mb-3">In development</h2>
            <p className="text-sm text-neutral-500 font-light mb-8">Early access soon.</p>
            <div className="flex justify-center">
              <WaitlistForm variant="light" />
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
    </MotionConfig>
  );
}
