'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FileText, Database, ArrowRight, CheckCircle2, FileSpreadsheet, BarChart3, Search, Zap } from 'lucide-react';
import Image from 'next/image';

type Phase = 'waiting' | 'goal' | 'planning' | 'executing' | 'delivering' | 'done';

export default function WorkflowDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [phase, setPhase] = useState<Phase>('waiting');
  const [execIndex, setExecIndex] = useState(-1);

  useEffect(() => {
    if (isInView && phase === 'waiting') {
      const t = setTimeout(() => setPhase('goal'), 600);
      return () => clearTimeout(t);
    }
  }, [isInView, phase]);

  useEffect(() => {
    if (phase === 'goal') {
      const t = setTimeout(() => setPhase('planning'), 1200);
      return () => clearTimeout(t);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'planning') {
      const t = setTimeout(() => setPhase('executing'), 2400);
      return () => clearTimeout(t);
    }
  }, [phase]);

  useEffect(() => {
    if (phase !== 'executing') return;
    if (execIndex < 3) {
      const t = setTimeout(() => setExecIndex(p => p + 1), 900);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setPhase('delivering'), 600);
      return () => clearTimeout(t);
    }
  }, [phase, execIndex]);

  useEffect(() => {
    if (phase === 'delivering') {
      const t = setTimeout(() => setPhase('done'), 800);
      return () => clearTimeout(t);
    }
  }, [phase]);

  const phaseActive = (p: Phase) => {
    const order: Phase[] = ['waiting', 'goal', 'planning', 'executing', 'delivering', 'done'];
    return order.indexOf(phase) >= order.indexOf(p);
  };

  return (
    <div ref={ref} className="max-w-4xl mx-auto">
      <div className="flex flex-col items-center gap-6 mb-10 sm:mb-14">
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center">
          {[
            { label: 'Goal', active: phaseActive('goal') },
            { label: 'Plan', active: phaseActive('planning') },
            { label: 'Execute', active: phaseActive('executing') },
            { label: 'Deliver', active: phaseActive('done') },
          ].map((step, i) => (
            <div key={step.label} className="flex items-center gap-3 sm:gap-4">
              <motion.div
                animate={step.active ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 0.3 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-500 ${
                  step.active
                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                    : 'bg-white/[0.06] text-white/25'
                }`}
              >
                <span className="text-xs">{String(i + 1).padStart(2, '0')}</span>
                <span>{step.label}</span>
              </motion.div>
              {i < 3 && (
                <div className={`w-6 sm:w-10 h-px transition-colors duration-500 ${
                  phaseActive(['planning', 'executing', 'done'][i] as Phase) ? 'bg-primary/50' : 'bg-white/10'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/40 bg-[#1a1a1e]">
        <div className="bg-[#28282c] px-4 py-2.5 flex items-center border-b border-white/[0.06]">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-xs text-white/35 font-mono">
              {phase === 'done' ? 'Grysics : Complete' : phase === 'waiting' ? 'Grysics' : 'Grysics : Working...'}
            </span>
          </div>
          <div className="w-[52px]" />
        </div>

        <div className="p-5 sm:p-8" style={{ minHeight: 380 }}>
          <AnimatePresence mode="wait">
            {(phase === 'waiting' || phase === 'goal') && (
              <motion.div
                key="goal"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center justify-center text-center py-12"
              >
                <motion.div
                  animate={phase === 'goal' ? { scale: [1, 1.08, 1], borderColor: 'rgba(249,115,22,0.4)' } : {}}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 rounded-2xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center mb-5"
                >
                  <FileSpreadsheet className="w-7 h-7 text-primary" />
                </motion.div>
                <p className="text-white/70 text-base font-medium mb-2">Reconcile Q1 financial transactions</p>
                <p className="text-white/30 text-sm font-mono">Connected to ERP + Bank</p>
              </motion.div>
            )}

            {phase === 'planning' && (
              <motion.div
                key="planning"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="py-6"
              >
                <p className="text-xs text-white/30 uppercase tracking-widest mb-6 text-center">Planning execution</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-0">
                  {[
                    { icon: Database, label: 'Data Sources', sub: 'ERP, Excel, Bank' },
                    { icon: Search, label: 'Validation', sub: 'Cross-reference' },
                    { icon: Zap, label: 'Processing', sub: 'Match & resolve' },
                    { icon: FileText, label: 'Output', sub: 'Report & trail' },
                  ].map((node, i) => (
                    <div key={node.label} className="flex items-center gap-0">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.3, duration: 0.3 }}
                        className="flex flex-col items-center gap-2 px-4 sm:px-5"
                      >
                        <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                          <node.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-white/60 font-medium">{node.label}</p>
                          <p className="text-[10px] text-white/25">{node.sub}</p>
                        </div>
                      </motion.div>
                      {i < 3 && (
                        <motion.div
                          initial={{ opacity: 0, scaleX: 0 }}
                          animate={{ opacity: 1, scaleX: 1 }}
                          transition={{ delay: i * 0.3 + 0.2, duration: 0.2 }}
                          className="hidden sm:block"
                        >
                          <ArrowRight className="w-4 h-4 text-primary/30" />
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="mt-8 flex items-center justify-center gap-2"
                >
                  <div className="w-3 h-3 border-2 border-white/10 border-t-primary/50 rounded-full animate-spin" />
                  <span className="text-xs text-white/25">Building execution plan...</span>
                </motion.div>
              </motion.div>
            )}

            {phase === 'executing' && (
              <motion.div
                key="executing"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="py-4"
              >
                <p className="text-xs text-white/30 uppercase tracking-widest mb-6 text-center">Executing</p>
                <div className="max-w-md mx-auto space-y-3 font-mono">
                  {[
                    { text: 'Pulling 847 records from ERP system', icon: '📄' },
                    { text: 'Matching with bank statement entries', icon: '🔍' },
                    { text: 'Resolving 2 of 3 discrepancies', icon: '⚡' },
                    { text: 'Generating bank reconciliation statement', icon: '📊' },
                  ].map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={execIndex >= i ? { opacity: 1, x: 0 } : { opacity: 0.15, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/[0.05]"
                    >
                      <span className="text-sm">{step.icon}</span>
                      <span className="text-xs text-white/50 flex-1">{step.text}</span>
                      {execIndex >= i ? (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                          <CheckCircle2 className="w-4 h-4 text-green-400" />
                        </motion.div>
                      ) : (
                        execIndex === i - 1 && (
                          <div className="w-3.5 h-3.5 border-2 border-white/10 border-t-primary/50 rounded-full animate-spin" />
                        )
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {(phase === 'delivering' || phase === 'done') && (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="py-2"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-green-400 font-medium">Bank Reconciliation Statement</span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-white/25 font-mono">
                    <span>847 records</span>
                    <span>2m 14s</span>
                  </div>
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="rounded-xl overflow-hidden border border-white/[0.08] bg-white"
                >
                  <div className="relative w-full" style={{ maxHeight: 320 }}>
                    <Image
                      src="/images/reconcile-result.png"
                      alt="Bank Reconciliation Statement"
                      width={800}
                      height={1000}
                      className="w-full h-auto"
                      sizes="800px"
                      priority
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
