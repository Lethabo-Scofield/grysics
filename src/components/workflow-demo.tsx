'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Send, FileText, Paperclip } from 'lucide-react';
import Image from 'next/image';

type Phase = 'waiting' | 'typing' | 'sent' | 'planning' | 'executing' | 'done';

const GOAL_TEXT = 'Reconcile Q1 financial transactions using mockDriverData.json';

const planLines = [
  'Reading mockDriverData.json...',
  'Mapping fields: date, amount, reference, vendor',
  'Cross-referencing with ERP payment records',
  'Execution plan ready (5 steps)',
];

const execSteps = [
  { text: 'Connecting to financial systems', time: '0.8s' },
  { text: 'Importing 847 transactions from mockDriverData.json', time: '3.2s' },
  { text: 'Matching against accounting ledger', time: '2.1s' },
  { text: 'Found 3 discrepancies — auto-resolved 2', time: '1.4s' },
  { text: 'Generating reconciliation report', time: '0.6s' },
];

export default function WorkflowDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [phase, setPhase] = useState<Phase>('waiting');
  const [typedText, setTypedText] = useState('');
  const [planIndex, setPlanIndex] = useState(-1);
  const [execIndex, setExecIndex] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isInView && phase === 'waiting') {
      const t = setTimeout(() => setPhase('typing'), 800);
      return () => clearTimeout(t);
    }
  }, [isInView, phase]);

  useEffect(() => {
    if (phase !== 'typing') return;
    if (typedText.length < GOAL_TEXT.length) {
      const delay = GOAL_TEXT[typedText.length] === ' ' ? 80 : 35 + Math.random() * 25;
      const t = setTimeout(() => setTypedText(GOAL_TEXT.slice(0, typedText.length + 1)), delay);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setPhase('sent'), 700);
      return () => clearTimeout(t);
    }
  }, [phase, typedText]);

  useEffect(() => {
    if (phase === 'sent') {
      const t = setTimeout(() => setPhase('planning'), 500);
      return () => clearTimeout(t);
    }
  }, [phase]);

  useEffect(() => {
    if (phase !== 'planning') return;
    if (planIndex < planLines.length - 1) {
      const t = setTimeout(() => setPlanIndex(p => p + 1), 600);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setPhase('executing'), 500);
      return () => clearTimeout(t);
    }
  }, [phase, planIndex]);

  useEffect(() => {
    if (phase !== 'executing') return;
    if (execIndex < execSteps.length - 1) {
      const t = setTimeout(() => setExecIndex(p => p + 1), 800);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setPhase('done'), 700);
      return () => clearTimeout(t);
    }
  }, [phase, execIndex]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [phase, typedText, planIndex, execIndex]);

  const showGrysicsResponse = phase === 'planning' || phase === 'executing' || phase === 'done';

  return (
    <div ref={ref} className="max-w-3xl mx-auto">
      <div className="rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/40">
        <div className="bg-[#28282c] px-4 py-2.5 flex items-center border-b border-white/[0.06]">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-xs text-white/35 font-mono">Grysics</span>
          </div>
          <div className="w-[52px]" />
        </div>

        <div className="bg-[#1a1a1e] flex flex-col" style={{ height: 420 }}>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 scrollbar-hide">

            {phase !== 'waiting' && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-end"
              >
                <div className="max-w-[85%]">
                  <div className="bg-primary/90 rounded-2xl rounded-br-md px-4 py-3">
                    <p className="text-sm text-white leading-relaxed">
                      {typedText}
                      {phase === 'typing' && <span className="inline-block w-0.5 h-4 bg-white/70 ml-0.5 animate-pulse align-middle" />}
                    </p>
                  </div>
                  <div className="flex items-center justify-end gap-1.5 mt-1.5 px-1">
                    <Paperclip className="w-3 h-3 text-white/20" />
                    <span className="text-[10px] text-white/25 font-mono">mockDriverData.json</span>
                  </div>
                </div>
              </motion.div>
            )}

            <AnimatePresence>
              {showGrysicsResponse && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-start"
                >
                  <div className="max-w-[90%]">
                    <div className="bg-white/[0.06] rounded-2xl rounded-bl-md px-4 py-3 border border-white/[0.06]">
                      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/[0.06]">
                        <Image src="/images/grysics-logo.png" alt="G" width={16} height={16} className="rounded" style={{ width: 16, height: 16 }} />
                        <span className="text-xs font-medium text-white/50">Grysics</span>
                        {phase !== 'done' && (
                          <span className="text-[10px] text-primary/60 ml-auto animate-pulse">working...</span>
                        )}
                        {phase === 'done' && (
                          <span className="text-[10px] text-green-400/60 ml-auto">complete</span>
                        )}
                      </div>

                      <div className="space-y-2 mb-3 font-mono">
                        {planLines.map((line, i) => (
                          <motion.div
                            key={`plan-${i}`}
                            initial={{ opacity: 0, height: 0 }}
                            animate={planIndex >= i ? { opacity: 1, height: 'auto' } : {}}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="flex items-start gap-2 text-xs">
                              <span className="text-green-400/70 mt-px flex-shrink-0">✓</span>
                              <span className="text-white/40">{line}</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {(phase === 'executing' || phase === 'done') && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="pt-2 border-t border-white/[0.06] space-y-2 font-mono"
                        >
                          {execSteps.map((step, i) => (
                            <motion.div
                              key={`exec-${i}`}
                              initial={{ opacity: 0, height: 0 }}
                              animate={execIndex >= i ? { opacity: 1, height: 'auto' } : {}}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="flex items-start gap-2 text-xs">
                                <span className="text-blue-400/70 mt-px flex-shrink-0">→</span>
                                <span className="text-white/50 flex-1">{step.text}</span>
                                <span className="text-white/20 flex-shrink-0">{step.time}</span>
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}

                      {phase === 'executing' && execIndex < execSteps.length - 1 && (
                        <div className="mt-3 flex items-center gap-2">
                          <div className="w-3 h-3 border-2 border-white/10 border-t-primary/50 rounded-full animate-spin" />
                          <span className="text-[10px] text-white/20">executing...</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {phase === 'done' && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="flex justify-start"
                >
                  <div className="max-w-[90%]">
                    <div className="bg-white/[0.06] rounded-2xl rounded-bl-md overflow-hidden border border-white/[0.06]">
                      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.06]">
                        <FileText className="w-3.5 h-3.5 text-primary" />
                        <span className="text-xs text-white/60 font-medium">Q1_Reconciliation_Report.xlsx</span>
                        <span className="text-[10px] text-green-400/70 ml-auto font-medium">Delivered</span>
                      </div>
                      <div className="relative aspect-[16/10] max-h-[200px] overflow-hidden">
                        <Image
                          src="/images/reconcile-result.png"
                          alt="Reconciliation report"
                          fill
                          className="object-cover object-top"
                          sizes="600px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1e]/90 via-transparent to-transparent" />
                      </div>
                      <div className="px-4 py-2.5 flex items-center gap-4 text-[10px] text-white/30 font-mono">
                        <span>847 records</span>
                        <span>$12.4K variance</span>
                        <span>2m 14s</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="border-t border-white/[0.06] p-3">
            <div className="flex items-center gap-2.5">
              <Paperclip className="w-4 h-4 text-white/15 flex-shrink-0" />
              <div className="flex-1 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-2.5">
                <span className="text-sm text-white/15">Describe your goal...</span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-white/[0.04] flex items-center justify-center flex-shrink-0">
                <Send className="w-4 h-4 text-white/15" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
