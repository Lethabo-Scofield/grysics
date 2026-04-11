'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

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

export default function VerificationTerminal() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
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
