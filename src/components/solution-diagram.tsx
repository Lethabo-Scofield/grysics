'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { Target, Database, FileSpreadsheet, FileText, Bell, ShieldCheck, Sparkles } from 'lucide-react';

const inputs = [
  { label: 'Your Goal', icon: Target },
  { label: 'ERP System', icon: Database },
  { label: 'Excel / Data', icon: FileSpreadsheet },
];

const outputs = [
  { label: 'Reports', icon: FileText },
  { label: 'Notifications', icon: Bell },
  { label: 'Audit Trail', icon: ShieldCheck },
];

export default function SolutionDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: '-10%' });
  const prefersReducedMotion = useReducedMotion();
  const animate = isInView && !prefersReducedMotion;

  return (
    <div
      ref={ref}
      className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent border border-white/[0.08] p-5 sm:p-7 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(249,115,22,0.08), transparent 60%)',
        }}
      />

      <div className="relative flex flex-col items-stretch gap-3 sm:gap-4">
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {inputs.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: -8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="relative flex flex-col items-center gap-1.5 sm:gap-2 px-2 py-3 sm:py-4 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-white/15 hover:bg-white/[0.06] transition-colors"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/[0.06] border border-white/[0.06] flex items-center justify-center">
                <item.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/70" strokeWidth={1.75} />
              </div>
              <span className="text-[10px] sm:text-[11px] text-white/65 font-medium text-center leading-tight tracking-wide">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>

        <FlowConnectors color="primary" animate={animate} />

        <div className="relative w-full p-4 sm:p-5 rounded-xl bg-gradient-to-br from-primary/[0.12] via-primary/[0.06] to-amber-500/[0.04] border border-primary/25 overflow-hidden">
          {animate && (
            <motion.div
              className="absolute -inset-px rounded-xl border border-primary/40 pointer-events-none"
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
          <div className="relative flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
                <Image
                  src="/images/grysics-logo.png"
                  alt="Grysics"
                  width={20}
                  height={20}
                  className="rounded"
                  style={{ width: 20, height: 20 }}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm sm:text-base font-semibold text-white leading-tight">Grysics</span>
                <span className="text-[10px] sm:text-[11px] text-white/50 font-mono tracking-wide">execution engine</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-500/10 border border-green-500/20">
              <span
                className={`w-1.5 h-1.5 rounded-full bg-green-400 ${animate ? 'animate-pulse' : ''}`}
              />
              <span className="text-[9px] sm:text-[10px] text-green-400/90 font-mono uppercase tracking-wider">
                Active
              </span>
            </div>
          </div>
          <div className="relative mt-3 pt-3 border-t border-white/[0.06] flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-primary/70" strokeWidth={2} />
            <span className="text-[10px] sm:text-[11px] text-white/55 font-mono">
              plan · execute · verify · deliver
            </span>
          </div>
        </div>

        <FlowConnectors color="green" animate={animate} delayOffset={0.4} />

        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {outputs.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
              className="relative flex flex-col items-center gap-1.5 sm:gap-2 px-2 py-3 sm:py-4 rounded-xl bg-green-500/[0.05] border border-green-500/15 hover:border-green-500/25 hover:bg-green-500/[0.08] transition-colors"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-green-500/10 border border-green-500/15 flex items-center justify-center">
                <item.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400/85" strokeWidth={1.75} />
              </div>
              <span className="text-[10px] sm:text-[11px] text-green-400/85 font-medium text-center leading-tight tracking-wide">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="relative flex justify-center gap-5 sm:gap-6 mt-5 pt-4 border-t border-white/[0.05]">
        {[
          { label: 'Input', color: 'bg-white/30' },
          { label: 'Processing', color: 'bg-primary' },
          { label: 'Output', color: 'bg-green-400' },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div className={`w-1.5 h-1.5 rounded-full ${item.color}`} />
            <span className="text-[10px] sm:text-xs text-white/40 font-mono uppercase tracking-wider">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FlowConnectors({
  color,
  animate,
  delayOffset = 0,
}: {
  color: 'primary' | 'green';
  animate: boolean;
  delayOffset?: number;
}) {
  const lineCls =
    color === 'primary'
      ? 'bg-gradient-to-b from-transparent via-primary/25 to-transparent'
      : 'bg-gradient-to-b from-transparent via-green-500/30 to-transparent';
  const dotCls =
    color === 'primary'
      ? 'bg-primary shadow-[0_0_8px_rgba(249,115,22,0.8)]'
      : 'bg-green-400 shadow-[0_0_8px_rgba(34,197,94,0.8)]';

  return (
    <div className="relative h-10 sm:h-12 flex items-stretch justify-around">
      {[0, 1, 2].map((i) => (
        <div key={i} className={`relative w-px overflow-hidden ${lineCls}`}>
          {animate && (
            <motion.div
              className={`absolute left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${dotCls}`}
              initial={{ y: -4 }}
              animate={{ y: ['0%', '100%'] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: 'easeIn',
                delay: delayOffset + i * 0.35,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
