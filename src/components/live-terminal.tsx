'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useInView } from 'framer-motion';

const LINES = [
  { text: 'Connecting to financial systems...', status: 'done' as const, delay: 800 },
  { text: 'Pulling 847 transactions from ERP system...', status: 'done' as const, delay: 1200 },
  { text: 'Cross-referencing with accounting data...', status: 'done' as const, delay: 1400 },
  { text: 'Found 3 discrepancies, resolved 2 automatically', status: 'review' as const, delay: 1000 },
  { text: 'Report generated and ready for download', status: 'done' as const, delay: 800 },
];

const SUMMARY = [
  'Time: 2m 14s',
  'Records: 847 processed',
  'Variance: $12.4K identified',
];

const COMMAND = 'grysics run "Reconcile Q1 transactions"';

export default function LiveTerminal() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const hasStarted = useRef(false);

  const [commandText, setCommandText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [visibleLines, setVisibleLines] = useState(-1);
  const [showSummary, setShowSummary] = useState(false);
  const [showFinalCursor, setShowFinalCursor] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const startAnimation = useCallback(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    setIsTyping(true);
    let charIndex = 0;

    const typeInterval = setInterval(() => {
      charIndex++;
      setCommandText(COMMAND.slice(0, charIndex));
      if (charIndex >= COMMAND.length) {
        clearInterval(typeInterval);
        setIsTyping(false);

        setTimeout(() => {
          setIsRunning(true);

          let totalDelay = 300;
          LINES.forEach((line, idx) => {
            setTimeout(() => setVisibleLines(idx), totalDelay);
            totalDelay += line.delay;
          });

          setTimeout(() => {
            setShowSummary(true);
            setTimeout(() => {
              setIsRunning(false);
              setIsDone(true);
              setShowFinalCursor(true);
            }, 500);
          }, totalDelay + 400);
        }, 400);
      }
    }, 35);
  }, []);

  useEffect(() => {
    if (isInView) {
      const t = setTimeout(startAnimation, 300);
      return () => clearTimeout(t);
    }
  }, [isInView, startAnimation]);

  const started = isTyping || isRunning || isDone || commandText.length > 0;

  return (
    <div ref={ref} className="rounded-xl overflow-hidden shadow-2xl shadow-black/40 border border-white/[0.08]">
      <div className="bg-[#2a2a2e] px-4 py-3 flex items-center gap-2 border-b border-white/[0.06]">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 text-center">
          <span className="text-xs text-white/40 font-mono">grysics : reconcile-q1</span>
        </div>
        <div className="flex items-center gap-1.5 min-w-[52px] justify-end">
          {isRunning && (
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] text-green-400/60 font-mono">LIVE</span>
            </div>
          )}
          {isDone && (
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-[10px] text-green-400/60 font-mono">DONE</span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-[#1e1e22] p-4 sm:p-8 font-mono text-xs sm:text-sm leading-relaxed">
        <div className="mb-4 break-all">
          <span className="text-green-400">grysics</span>
          <span className="text-white/30"> ~ </span>
          <span className="text-blue-400">$</span>
          <span className="text-white/80"> {commandText}</span>
          {(isTyping || !started) && (
            <span className="inline-block w-2 h-4 bg-white/60 ml-0.5 animate-pulse align-middle" />
          )}
        </div>

        <div className="border-t border-white/[0.06] pt-4 space-y-3">
          {LINES.map((line, i) => (
            <div
              key={i}
              className={`flex items-start gap-2 sm:gap-3 transition-opacity duration-300 ${
                visibleLines >= i ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <span className="text-white/20 select-none flex-shrink-0 w-4 text-right">{i + 1}</span>
              <span className={`flex-shrink-0 ${line.status === 'done' ? 'text-green-400/80' : 'text-amber-400/80'}`}>
                {line.status === 'done' ? '✓' : '⚠'}
              </span>
              <span className="text-white/60 flex-1 min-w-0 break-words">{line.text}</span>
              {visibleLines === i && isRunning && (
                <div className="w-3 h-3 border-2 border-white/10 border-t-primary/50 rounded-full animate-spin flex-shrink-0 mt-0.5" />
              )}
            </div>
          ))}
        </div>

        <div className={`mt-6 pt-4 border-t border-white/[0.06] transition-opacity duration-400 ${showSummary ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center gap-2 text-green-400 mb-2">
            <span>✓</span>
            <span className="font-semibold">Execution complete</span>
          </div>
          <div className="text-white/40 space-y-1 pl-5">
            {SUMMARY.map((s, i) => (
              <p key={i}>{s}</p>
            ))}
            <p>
              Audit trail: <span className="text-blue-400 underline underline-offset-2">view full log →</span>
            </p>
          </div>
        </div>

        <div className={`mt-4 pt-3 transition-opacity duration-300 ${showFinalCursor ? 'opacity-100' : 'opacity-0'}`}>
          <span className="text-green-400">grysics</span>
          <span className="text-white/30"> ~ </span>
          <span className="text-blue-400">$</span>
          <span className="inline-block w-2 h-4 bg-white/50 ml-1 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
