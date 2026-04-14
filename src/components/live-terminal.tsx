'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface TermLine {
  text: string;
  status: 'done' | 'review';
  delay: number;
}

const lines: TermLine[] = [
  { text: 'Connecting to financial systems...', status: 'done', delay: 800 },
  { text: 'Pulling 847 transactions from payment records...', status: 'done', delay: 1200 },
  { text: 'Cross-referencing with accounting data...', status: 'done', delay: 1400 },
  { text: 'Found 3 discrepancies — resolved 2 automatically', status: 'review', delay: 1000 },
  { text: 'Report generated and ready for download', status: 'done', delay: 800 },
];

const summaryLines = [
  'Time: 2m 14s',
  'Records: 847 processed',
  'Variance: $12.4K identified',
];

export default function LiveTerminal() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [commandTyped, setCommandTyped] = useState('');
  const [visibleLines, setVisibleLines] = useState(-1);
  const [showSummary, setShowSummary] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  const [phase, setPhase] = useState<'idle' | 'typing' | 'running' | 'done'>('idle');

  const command = 'grysics run "Reconcile Q1 transactions"';

  useEffect(() => {
    if (!isInView || phase !== 'idle') return;
    setPhase('typing');
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setCommandTyped(command.slice(0, i));
      if (i >= command.length) {
        clearInterval(interval);
        setTimeout(() => setPhase('running'), 400);
      }
    }, 35);
    return () => clearInterval(interval);
  }, [isInView, phase]);

  useEffect(() => {
    if (phase !== 'running') return;
    let current = -1;
    let totalDelay = 300;

    const timeouts: NodeJS.Timeout[] = [];

    lines.forEach((line, idx) => {
      const t = setTimeout(() => {
        setVisibleLines(idx);
      }, totalDelay);
      timeouts.push(t);
      totalDelay += line.delay;
    });

    const summaryTimeout = setTimeout(() => {
      setShowSummary(true);
      setTimeout(() => {
        setShowCursor(true);
        setPhase('done');
      }, 500);
    }, totalDelay + 400);
    timeouts.push(summaryTimeout);

    return () => timeouts.forEach(clearTimeout);
  }, [phase]);

  return (
    <div ref={ref} className="rounded-xl overflow-hidden shadow-2xl shadow-black/40 border border-white/[0.08]">
      <div className="bg-[#2a2a2e] px-4 py-3 flex items-center gap-2 border-b border-white/[0.06]">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 text-center">
          <span className="text-xs text-white/40 font-mono">grysics — reconcile-q1</span>
        </div>
        <div className="flex items-center gap-1.5">
          {phase === 'running' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-1.5"
            >
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] text-green-400/60 font-mono">LIVE</span>
            </motion.div>
          )}
          {phase === 'done' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-1.5"
            >
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-[10px] text-green-400/60 font-mono">DONE</span>
            </motion.div>
          )}
        </div>
      </div>

      <div className="bg-[#1e1e22] p-5 sm:p-8 font-mono text-sm leading-relaxed">
        <div className="mb-4">
          <span className="text-green-400">grysics</span>
          <span className="text-white/30"> ~ </span>
          <span className="text-blue-400">$</span>
          <span className="text-white/80"> {commandTyped}</span>
          {phase === 'typing' && (
            <span className="inline-block w-2 h-4 bg-white/60 ml-0.5 animate-pulse align-middle" />
          )}
        </div>

        {phase !== 'idle' && phase !== 'typing' && (
          <div className="border-t border-white/[0.06] pt-4 space-y-3">
            {lines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={visibleLines >= i ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                transition={{ duration: 0.25 }}
                className="flex items-start gap-3"
              >
                <span className="text-white/20 select-none flex-shrink-0 w-4 text-right">{i + 1}</span>
                {visibleLines >= i ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.15, delay: 0.1 }}
                    className={line.status === 'done' ? 'text-green-400/80' : 'text-amber-400/80'}
                  >
                    {line.status === 'done' ? '✓' : '⚠'}
                  </motion.span>
                ) : (
                  <span className="text-white/10">·</span>
                )}
                <span className="text-white/60">{line.text}</span>
                {visibleLines === i && !showSummary && (
                  <div className="w-3 h-3 border-2 border-white/10 border-t-primary/50 rounded-full animate-spin flex-shrink-0 mt-0.5" />
                )}
              </motion.div>
            ))}
          </div>
        )}

        {showSummary && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mt-6 pt-4 border-t border-white/[0.06]"
          >
            <div className="flex items-center gap-2 text-green-400 mb-2">
              <span>✓</span>
              <span className="font-semibold">Execution complete</span>
            </div>
            <div className="text-white/40 space-y-1 pl-5">
              {summaryLines.map((s, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.15 }}
                >
                  {s}
                </motion.p>
              ))}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Audit trail: <span className="text-blue-400 underline underline-offset-2">view full log →</span>
              </motion.p>
            </div>
          </motion.div>
        )}

        {showCursor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 pt-3"
          >
            <span className="text-green-400">grysics</span>
            <span className="text-white/30"> ~ </span>
            <span className="text-blue-400">$</span>
            <span className="inline-block w-2 h-4 bg-white/50 ml-1 animate-pulse" />
          </motion.div>
        )}
      </div>
    </div>
  );
}
