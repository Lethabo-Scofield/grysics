'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

const TERMINAL_LINES = [
  { text: 'Goal: "Reconcile Q1 transactions"', status: 'info' },
  { text: 'Planning execution steps...', status: 'info' },
  { text: '  Connecting to Stripe API        OK', status: 'pass' },
  { text: '  Fetching 847 transactions       OK', status: 'pass' },
  { text: '  Connecting to QuickBooks        OK', status: 'pass' },
  { text: '  Cross-referencing records       OK', status: 'pass' },
  { text: '  Found 3 discrepancies           !', status: 'warn' },
  { text: '  Resolving discrepancies...', status: 'info' },
  { text: '  Auto-resolved 2/3              OK', status: 'pass' },
  { text: '  Flagged 1 for review           !', status: 'warn' },
  { text: '  Generating report              OK', status: 'pass' },
  { text: '', status: 'info' },
  { text: '  847 processed  \u00b7  $12.4K variance identified', status: 'result' },
  { text: '  Execution complete  \u00b7  2m 14s', status: 'pass' },
];

export default function VerificationTerminal() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const prefersReducedMotion = useReducedMotion();
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    if (prefersReducedMotion) {
      setVisibleCount(TERMINAL_LINES.length);
      return;
    }
    const timer = setInterval(() => {
      setVisibleCount(prev => {
        if (prev >= TERMINAL_LINES.length) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 180);
    return () => clearInterval(timer);
  }, [isInView, prefersReducedMotion]);

  const visibleLines = TERMINAL_LINES.slice(0, visibleCount);

  return (
    <div ref={ref} className="rounded-2xl border border-white/10 bg-black overflow-hidden shadow-2xl shadow-black/50">
      <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
        <div className="flex gap-1.5" aria-hidden="true">
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
        </div>
        <span className="text-[11px] text-white/30 ml-2 font-mono">grysics execute --goal reconcile-q1</span>
      </div>
      <div className="p-3 sm:p-6 font-mono text-[10px] sm:text-[12px] leading-relaxed min-h-[240px] sm:min-h-[320px] overflow-x-auto" role="log" aria-label="Execution output" aria-live="polite">
        {visibleLines.map((line, i) => (
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
        {visibleCount < TERMINAL_LINES.length && (
          <span className="inline-block w-2 h-4 bg-primary/80 animate-pulse" aria-hidden="true" />
        )}
      </div>
    </div>
  );
}
