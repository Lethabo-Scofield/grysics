'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useState, useRef, useEffect, FormEvent } from 'react';
import { ArrowRight, Check, Calendar } from 'lucide-react';

export const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: d * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export function ArchitectureDiagram() {
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

export function VerificationTerminal() {
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
      <div className="p-3 sm:p-6 font-mono text-[10px] sm:text-[12px] leading-relaxed min-h-[240px] sm:min-h-[320px] overflow-x-auto" role="log" aria-label="Verification output" aria-live="polite">
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

export function CoverageGraph() {
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
          className="flex items-center gap-2 sm:gap-4"
          role="listitem"
          aria-label={`${cat.name}: ${cat.value}% coverage${cat.priority ? ' (priority)' : ''}`}
        >
          <span className={`text-[10px] sm:text-xs w-24 sm:w-36 text-right flex-shrink-0 ${
            cat.priority ? 'text-white font-medium' : 'text-white/40'
          }`}>
            {cat.name}
          </span>
          <div className="flex-1 h-5 sm:h-6 bg-white/5 rounded overflow-hidden relative" aria-hidden="true">
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

const LLM_MODELS = [
  { id: 'gpt4', label: 'GPT-4o', logo: '/images/logos/openai.png', cat: 'f' },
  { id: 'claude', label: 'Claude 3.5', logo: '/images/logos/anthropic.png', cat: 'f' },
  { id: 'gemini', label: 'Gemini', logo: '/images/logos/google.svg', cat: 'f' },
  { id: 'llama', label: 'Llama 3', logo: '/images/logos/meta.svg', cat: 'o' },
  { id: 'mistral', label: 'Mistral', logo: '/images/logos/mistral.png', cat: 'o' },
  { id: 'phi', label: 'Phi-3', logo: '/images/logos/microsoft.png', cat: 'o' },
  { id: 'cohere', label: 'Cohere', logo: '/images/logos/cohere.png', cat: 'e' },
  { id: 'falcon', label: 'Falcon', logo: '/images/logos/falcon.png', cat: 'e' },
];

const CAT_COLORS: Record<string, { ring: string; fill: string; line: string }> = {
  f: { ring: '#3b82f6', fill: '#93c5fdb3', line: '#3b82f680' },
  o: { ring: '#22c55e', fill: '#86efacb3', line: '#22c55e80' },
  e: { ring: '#a855f7', fill: '#c4b5fdb3', line: '#a855f780' },
};

export function LLMNetworkDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();
  const instant = prefersReducedMotion;

  const CX = 300;
  const CY = 200;
  const W = 600;
  const H = 400;

  const nodePositions = [
    { ...LLM_MODELS[0], x: 75, y: 55 },
    { ...LLM_MODELS[1], x: 225, y: 35 },
    { ...LLM_MODELS[2], x: 375, y: 35 },
    { ...LLM_MODELS[3], x: 525, y: 55 },
    { ...LLM_MODELS[4], x: 75, y: 345 },
    { ...LLM_MODELS[5], x: 225, y: 365 },
    { ...LLM_MODELS[6], x: 375, y: 365 },
    { ...LLM_MODELS[7], x: 525, y: 345 },
  ];

  return (
    <motion.div
      ref={ref}
      className="w-full max-w-2xl mx-auto py-4 sm:py-8"
      role="img"
      aria-label="Network diagram showing LLMs connected to Grysics verification engine"
      initial={{ opacity: instant ? 1 : 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: instant ? 0 : 0.6 }}
    >
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" aria-hidden="true">
        <defs>
          <radialGradient id="grysics-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F97316" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
          </radialGradient>
          {nodePositions.map((node) => {
            const col = CAT_COLORS[node.cat];
            return (
              <linearGradient key={`grad-${node.id}`} id={`line-${node.id}`} x1={node.x} y1={node.y} x2={CX} y2={CY} gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor={col.line} />
                <stop offset="100%" stopColor="#F9731680" />
              </linearGradient>
            );
          })}
        </defs>

        {nodePositions.map((node, i) => (
          <motion.line
            key={`line-${node.id}`}
            x1={node.x}
            y1={node.y}
            x2={CX}
            y2={CY}
            stroke={`url(#line-${node.id})`}
            strokeWidth="1.5"
            strokeDasharray="4 4"
            initial={{ pathLength: instant ? 1 : 0, opacity: instant ? 1 : 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: instant ? 0 : 0.8, delay: instant ? 0 : 0.2 + i * 0.1 }}
          />
        ))}

        <circle cx={CX} cy={CY} r="60" fill="url(#grysics-glow)" />
        <circle cx={CX} cy={CY} r="36" fill="#F97316" fillOpacity="0.08" stroke="#F97316" strokeWidth="2" />
        <image href="/images/grysics-logo.png" x={CX - 18} y={CY - 18} width="36" height="36" />
        <text x={CX} y={CY + 52} textAnchor="middle" fill="#F97316" fontSize="12" fontWeight="700">Grysics</text>
        <text x={CX} y={CY + 65} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="9">Verification Engine</text>

        {nodePositions.map((node) => {
          const col = CAT_COLORS[node.cat];
          return (
            <g key={node.id}>
              <circle cx={node.x} cy={node.y} r="24" fill="rgba(255,255,255,0.04)" stroke={col.ring} strokeWidth="1" />
              <image href={node.logo} x={node.x - 14} y={node.y - 14} width="28" height="28" />
              <text x={node.x} y={node.y + 36} textAnchor="middle" fontSize="10" fontWeight="500" fill={col.fill}>{node.label}</text>
            </g>
          );
        })}
      </svg>

      <div className="flex flex-wrap justify-center gap-x-5 sm:gap-x-6 gap-y-2 mt-4 sm:mt-6">
        {[
          { label: 'Frontier Models', color: '#3b82f6' },
          { label: 'Open Source', color: '#22c55e' },
          { label: 'Enterprise', color: '#a855f7' },
          { label: 'Grysics', color: '#F97316' },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-[10px] sm:text-[11px] text-white/40">{item.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

const BENCHMARK_DATA = [
  { metric: 'Hallucination Rate', before: 14.2, after: 1.8, unit: '%', lowerBetter: true },
  { metric: 'Accuracy Score', before: 78, after: 96, unit: '%', lowerBetter: false },
  { metric: 'Edge Case Pass', before: 42, after: 94, unit: '%', lowerBetter: false },
  { metric: 'Regression Catch', before: 23, after: 98, unit: '%', lowerBetter: false },
  { metric: 'Avg Response Time', before: 2.4, after: 0.8, unit: 's', lowerBetter: true },
  { metric: 'Deploy Confidence', before: 61, after: 99.2, unit: '%', lowerBetter: false },
];

export function BenchmarkChart() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  const prefersReducedMotion = useReducedMotion();
  const instant = prefersReducedMotion;

  return (
    <div ref={ref} className="space-y-5" role="list" aria-label="Benchmarking results before and after Grysics">
      <div className="flex items-center gap-6 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-white/10 border border-white/20" />
          <span className="text-[11px] text-white/40">Without Grysics</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-primary" />
          <span className="text-[11px] text-white/40">With Grysics</span>
        </div>
      </div>

      {BENCHMARK_DATA.map((item, i) => {
        const maxVal = item.unit === 's' ? 3 : 100;
        const beforePct = (item.before / maxVal) * 100;
        const afterPct = (item.after / maxVal) * 100;
        const improved = item.lowerBetter ? item.before > item.after : item.after > item.before;
        const delta = item.lowerBetter
          ? `-${Math.round(((item.before - item.after) / item.before) * 100)}%`
          : `+${Math.round(((item.after - item.before) / item.before) * 100)}%`;

        return (
          <motion.div
            key={item.metric}
            initial={{ opacity: instant ? 1 : 0, y: instant ? 0 : 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: instant ? 0 : 0.4, delay: instant ? 0 : i * 0.1 }}
            className="group"
            role="listitem"
            aria-label={`${item.metric}: ${item.before}${item.unit} without Grysics, ${item.after}${item.unit} with Grysics`}
          >
            <div className="flex items-center justify-between mb-1.5 sm:mb-2">
              <span className="text-xs sm:text-sm text-white font-medium">{item.metric}</span>
              <span className={`text-[10px] sm:text-xs font-mono font-semibold ${improved ? 'text-green-400' : 'text-red-400'}`}>
                {delta}
              </span>
            </div>
            <div className="space-y-1 sm:space-y-1.5">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex-1 h-4 sm:h-5 bg-white/5 rounded overflow-hidden relative">
                  <motion.div
                    className="h-full rounded bg-white/10 origin-left"
                    style={{ width: `${beforePct}%` }}
                    initial={{ scaleX: instant ? 1 : 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: instant ? 0 : 0.6, delay: instant ? 0 : i * 0.1 + 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />
                </div>
                <span className="text-[10px] sm:text-[11px] text-white/40 font-mono w-12 sm:w-14 text-right">{item.before}{item.unit}</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex-1 h-4 sm:h-5 bg-white/5 rounded overflow-hidden relative">
                  <motion.div
                    className={`h-full rounded origin-left ${item.lowerBetter ? 'bg-green-500' : 'bg-primary'}`}
                    style={{ width: `${afterPct}%` }}
                    initial={{ scaleX: instant ? 1 : 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: instant ? 0 : 0.8, delay: instant ? 0 : i * 0.1 + 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />
                </div>
                <span className="text-[10px] sm:text-[11px] text-primary font-mono font-semibold w-12 sm:w-14 text-right">{item.after}{item.unit}</span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

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
