'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, FileText } from 'lucide-react';
import Image from 'next/image';

type Phase = 'idle' | 'typing' | 'planning' | 'executing' | 'done';

const GOAL_TEXT = 'Reconcile Q1 financial transactions';

const planSteps = [
  'Identifying required data sources...',
  'Mapping ERP → payment records → accounting',
  'Building execution plan (5 steps)',
];

const execSteps = [
  { text: 'Connecting to financial systems', icon: '🔗' },
  { text: 'Pulling 847 transactions', icon: '📥' },
  { text: 'Cross-referencing accounting data', icon: '🔍' },
  { text: 'Resolving 2 of 3 discrepancies', icon: '⚡' },
  { text: 'Generating reconciliation report', icon: '📄' },
];

export default function WorkflowDemo() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [typedText, setTypedText] = useState('');
  const [planIndex, setPlanIndex] = useState(-1);
  const [execIndex, setExecIndex] = useState(-1);
  const [hasRun, setHasRun] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const startDemo = () => {
    if (phase !== 'idle') return;
    setPhase('typing');
    setTypedText('');
    setPlanIndex(-1);
    setExecIndex(-1);
  };

  useEffect(() => {
    if (phase !== 'typing') return;
    if (typedText.length < GOAL_TEXT.length) {
      const timer = setTimeout(() => {
        setTypedText(GOAL_TEXT.slice(0, typedText.length + 1));
      }, 40 + Math.random() * 30);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setPhase('planning'), 600);
      return () => clearTimeout(timer);
    }
  }, [phase, typedText]);

  useEffect(() => {
    if (phase !== 'planning') return;
    if (planIndex < planSteps.length - 1) {
      const timer = setTimeout(() => setPlanIndex((p) => p + 1), 800);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setPhase('executing'), 600);
      return () => clearTimeout(timer);
    }
  }, [phase, planIndex]);

  useEffect(() => {
    if (phase !== 'executing') return;
    if (execIndex < execSteps.length - 1) {
      const timer = setTimeout(() => setExecIndex((p) => p + 1), 900);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setPhase('done');
        setHasRun(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [phase, execIndex]);

  const reset = () => {
    setPhase('idle');
    setTypedText('');
    setPlanIndex(-1);
    setExecIndex(-1);
  };

  return (
    <div ref={containerRef} className="max-w-3xl mx-auto">
      <div className="rounded-xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/30">
        <div className="bg-[#2a2a2e] px-4 py-2.5 flex items-center gap-2 border-b border-white/[0.06]">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-xs text-white/40 font-mono">
              {phase === 'idle' ? 'grysics' : phase === 'done' ? 'grysics — complete' : 'grysics — running...'}
            </span>
          </div>
          <div className="w-[52px]" />
        </div>

        <div className="bg-[#1e1e22] min-h-[340px] sm:min-h-[380px] flex flex-col">
          <div className="flex-1 p-5 sm:p-6 font-mono text-sm overflow-hidden">

            {phase === 'idle' && !hasRun && (
              <div className="h-full flex flex-col items-center justify-center text-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <ArrowRight className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-white/60 text-sm mb-1">Define your goal</p>
                  <p className="text-white/30 text-xs">Click send to watch Grysics work</p>
                </div>
              </div>
            )}

            {phase === 'idle' && hasRun && (
              <div className="h-full flex flex-col items-center justify-center text-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center">
                  <span className="text-green-400 text-lg">✓</span>
                </div>
                <div>
                  <p className="text-white/60 text-sm mb-1">Demo complete</p>
                  <p className="text-white/30 text-xs">Click send to run again</p>
                </div>
              </div>
            )}

            {(phase === 'typing' || phase === 'planning' || phase === 'executing' || phase === 'done') && (
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[10px] text-primary font-bold">Y</span>
                  </div>
                  <div>
                    <p className="text-white/30 text-xs mb-1">You</p>
                    <p className="text-white/80">
                      {typedText}
                      {phase === 'typing' && <span className="inline-block w-1.5 h-4 bg-primary ml-0.5 animate-pulse" />}
                    </p>
                  </div>
                </div>

                <AnimatePresence>
                  {(phase === 'planning' || phase === 'executing' || phase === 'done') && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-[10px] text-blue-400 font-bold">G</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-white/30 text-xs mb-2">Grysics Planning</p>
                        <div className="space-y-1.5">
                          {planSteps.map((step, i) => (
                            <motion.div
                              key={step}
                              initial={{ opacity: 0, x: -8 }}
                              animate={planIndex >= i ? { opacity: 1, x: 0 } : {}}
                              transition={{ duration: 0.3 }}
                              className="flex items-center gap-2"
                            >
                              <span className="text-green-400 text-xs">✓</span>
                              <span className="text-white/50 text-xs">{step}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {(phase === 'executing' || phase === 'done') && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-[10px] text-primary font-bold">G</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-white/30 text-xs mb-2">Grysics Executing</p>
                        <div className="space-y-2">
                          {execSteps.map((step, i) => (
                            <motion.div
                              key={step.text}
                              initial={{ opacity: 0, x: -8 }}
                              animate={execIndex >= i ? { opacity: 1, x: 0 } : {}}
                              transition={{ duration: 0.3 }}
                              className="flex items-center gap-2"
                            >
                              <span className="text-xs">{step.icon}</span>
                              <span className="text-white/50 text-xs">{step.text}</span>
                              {execIndex >= i && (
                                <motion.span
                                  initial={{ opacity: 0, scale: 0.5 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className="text-green-400 text-xs ml-auto"
                                >
                                  done
                                </motion.span>
                              )}
                            </motion.div>
                          ))}
                        </div>

                        {phase === 'executing' && execIndex < execSteps.length - 1 && (
                          <div className="mt-3 flex items-center gap-2">
                            <div className="w-3 h-3 border-2 border-primary/40 border-t-primary rounded-full animate-spin" />
                            <span className="text-white/30 text-xs">Processing...</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {phase === 'done' && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-green-400 text-xs">✓</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-white/30 text-xs mb-2">Grysics Delivered</p>
                        <div className="rounded-lg border border-white/[0.08] overflow-hidden bg-white/[0.02]">
                          <div className="flex items-center gap-2 px-3 py-2 border-b border-white/[0.06] bg-white/[0.03]">
                            <FileText className="w-3.5 h-3.5 text-primary" />
                            <span className="text-xs text-white/60">Q1_Reconciliation_Report.xlsx</span>
                            <span className="text-[10px] text-green-400 ml-auto">Ready</span>
                          </div>
                          <div className="relative aspect-[16/9] overflow-hidden">
                            <Image
                              src="/images/reconcile-result.png"
                              alt="Reconciliation report"
                              fill
                              className="object-cover object-top opacity-80"
                              sizes="600px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1e1e22] via-transparent to-transparent" />
                          </div>
                        </div>
                        <div className="mt-2 flex items-center gap-3 text-xs text-white/30">
                          <span>847 records</span>
                          <span className="text-white/10">|</span>
                          <span>$12.4K variance</span>
                          <span className="text-white/10">|</span>
                          <span>2m 14s</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          <div className="border-t border-white/[0.06] p-3 sm:p-4">
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 flex items-center">
                <span className="text-white/20 text-sm font-mono">
                  {phase === 'idle'
                    ? 'Describe your goal...'
                    : phase === 'typing'
                    ? typedText
                    : GOAL_TEXT}
                </span>
              </div>
              <button
                onClick={phase === 'idle' ? startDemo : phase === 'done' ? reset : undefined}
                disabled={phase !== 'idle' && phase !== 'done'}
                className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 flex-shrink-0 ${
                  phase === 'idle' || phase === 'done'
                    ? 'bg-primary hover:bg-primary-dark text-white cursor-pointer'
                    : 'bg-white/[0.04] text-white/20 cursor-not-allowed'
                }`}
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
