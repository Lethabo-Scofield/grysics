'use client';

import { useRef, useState, useEffect } from 'react';
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

const inPaths = [
  'M50 4 C50 32 150 32 150 56',
  'M150 4 L150 56',
  'M250 4 C250 32 150 32 150 56',
];
const outPaths = [
  'M150 4 C150 32 50 32 50 56',
  'M150 4 L150 56',
  'M150 4 C150 32 250 32 250 56',
];

type Phase = 0 | 1 | 2 | 3;

export default function SolutionDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: '-10%' });
  const prefersReducedMotion = useReducedMotion();
  const animate = isInView && !prefersReducedMotion;

  const [phase, setPhase] = useState<Phase>(0);

  useEffect(() => {
    if (!animate) {
      setPhase(0);
      return;
    }
    const t = setInterval(() => {
      setPhase((p) => (((p + 1) % 4) as Phase));
    }, 1400);
    return () => clearInterval(t);
  }, [animate]);

  const inputActive = !animate || phase === 0;
  const flowIn = animate && phase === 0;
  const engineActive = !animate || phase === 1;
  const flowOut = animate && phase === 2;
  const outputActive = !animate || phase === 2 || phase === 3;

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

      <div className="relative flex flex-col items-stretch gap-2 sm:gap-3">
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {inputs.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: -8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className={`relative flex flex-col items-center gap-1.5 sm:gap-2 px-2 py-3 sm:py-4 rounded-xl border transition-all duration-500 ${
                inputActive
                  ? 'bg-white/[0.08] border-white/20 shadow-[0_0_20px_-8px_rgba(255,255,255,0.4)]'
                  : 'bg-white/[0.03] border-white/[0.06]'
              }`}
            >
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg border flex items-center justify-center transition-colors duration-500 ${
                  inputActive ? 'bg-white/[0.10] border-white/15' : 'bg-white/[0.04] border-white/[0.05]'
                }`}
              >
                <item.icon
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors duration-500 ${
                    inputActive ? 'text-white/90' : 'text-white/40'
                  }`}
                  strokeWidth={1.75}
                />
              </div>
              <span
                className={`text-[10px] sm:text-[11px] font-medium text-center leading-tight tracking-wide transition-colors duration-500 ${
                  inputActive ? 'text-white/85' : 'text-white/40'
                }`}
              >
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>

        <Connectors paths={inPaths} active={flowIn} stroke="rgba(249,115,22,0.22)" dotColor="rgb(249,115,22)" glow="rgba(249,115,22,0.9)" cycleKey={phase} />

        <div
          className={`relative w-full p-4 sm:p-5 rounded-xl border overflow-hidden transition-all duration-500 ${
            engineActive
              ? 'bg-gradient-to-br from-primary/[0.18] via-primary/[0.10] to-amber-500/[0.06] border-primary/40 shadow-[0_0_40px_-12px_rgba(249,115,22,0.6)]'
              : 'bg-gradient-to-br from-primary/[0.08] via-primary/[0.04] to-amber-500/[0.02] border-primary/20'
          }`}
        >
          {animate && (
            <motion.div
              key={phase === 1 ? 'engine-pulse' : 'idle'}
              className="absolute -inset-px rounded-xl border border-primary/50 pointer-events-none"
              initial={{ opacity: 0, scale: 1 }}
              animate={
                phase === 1
                  ? { opacity: [0, 0.7, 0], scale: [1, 1.02, 1] }
                  : { opacity: 0 }
              }
              transition={{ duration: 1.4, ease: 'easeOut' }}
            />
          )}
          <div className="relative flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div
                className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-lg border flex items-center justify-center transition-all duration-500 ${
                  engineActive ? 'bg-primary/30 border-primary/45' : 'bg-primary/15 border-primary/25'
                }`}
              >
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
                <span className="text-[10px] sm:text-[11px] text-white/55 font-mono tracking-wide">execution engine</span>
              </div>
            </div>
            <div
              className={`flex items-center gap-1.5 px-2 py-1 rounded-full border transition-colors duration-500 ${
                phase === 1 && animate
                  ? 'bg-primary/15 border-primary/35'
                  : 'bg-green-500/10 border-green-500/20'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${
                  phase === 1 && animate ? 'bg-primary' : 'bg-green-400'
                } ${animate ? 'animate-pulse' : ''}`}
              />
              <span
                className={`text-[9px] sm:text-[10px] font-mono uppercase tracking-wider transition-colors duration-500 ${
                  phase === 1 && animate ? 'text-primary' : 'text-green-400/90'
                }`}
              >
                {phase === 1 && animate ? 'Working' : 'Active'}
              </span>
            </div>
          </div>
          <div className="relative mt-3 pt-3 border-t border-white/[0.06] flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-primary/70" strokeWidth={2} />
            <span className="text-[10px] sm:text-[11px] text-white/55 font-mono">plan · execute · verify · deliver</span>
          </div>
        </div>

        <Connectors paths={outPaths} active={flowOut} stroke="rgba(34,197,94,0.25)" dotColor="rgb(74,222,128)" glow="rgba(74,222,128,0.9)" cycleKey={phase} />

        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {outputs.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
              className={`relative flex flex-col items-center gap-1.5 sm:gap-2 px-2 py-3 sm:py-4 rounded-xl border transition-all duration-500 ${
                outputActive
                  ? 'bg-green-500/[0.10] border-green-500/30 shadow-[0_0_20px_-8px_rgba(34,197,94,0.5)]'
                  : 'bg-green-500/[0.03] border-green-500/10'
              }`}
            >
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg border flex items-center justify-center transition-colors duration-500 ${
                  outputActive ? 'bg-green-500/15 border-green-500/25' : 'bg-green-500/5 border-green-500/10'
                }`}
              >
                <item.icon
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors duration-500 ${
                    outputActive ? 'text-green-300' : 'text-green-400/40'
                  }`}
                  strokeWidth={1.75}
                />
              </div>
              <span
                className={`text-[10px] sm:text-[11px] font-medium text-center leading-tight tracking-wide transition-colors duration-500 ${
                  outputActive ? 'text-green-300' : 'text-green-400/40'
                }`}
              >
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="relative flex justify-center gap-5 sm:gap-6 mt-5 pt-4 border-t border-white/[0.05]">
        {[
          { label: 'Input', color: 'bg-white/30', on: inputActive },
          { label: 'Processing', color: 'bg-primary', on: engineActive },
          { label: 'Output', color: 'bg-green-400', on: outputActive },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div
              className={`w-1.5 h-1.5 rounded-full ${item.color} transition-opacity duration-500 ${
                item.on ? 'opacity-100' : 'opacity-30'
              }`}
            />
            <span
              className={`text-[10px] sm:text-xs font-mono uppercase tracking-wider transition-colors duration-500 ${
                item.on ? 'text-white/65' : 'text-white/30'
              }`}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Connectors({
  paths,
  active,
  stroke,
  dotColor,
  glow,
  cycleKey,
}: {
  paths: string[];
  active: boolean;
  stroke: string;
  dotColor: string;
  glow: string;
  cycleKey: number;
}) {
  return (
    <div className="relative h-10 sm:h-14">
      <svg
        viewBox="0 0 300 60"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        {paths.map((d, i) => (
          <path key={i} d={d} stroke={stroke} strokeWidth={1} fill="none" />
        ))}
        {active &&
          paths.map((d, i) => (
            <circle
              key={`dot-${i}-${cycleKey}`}
              r={2.5}
              fill={dotColor}
              opacity={0}
              style={{ filter: `drop-shadow(0 0 4px ${glow})` }}
            >
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                keyTimes="0;0.1;0.9;1"
                dur="1.1s"
                begin={`${i * 0.12}s`}
                fill="freeze"
              />
              <animateMotion dur="1.1s" path={d} begin={`${i * 0.12}s`} fill="freeze" />
            </circle>
          ))}
      </svg>
    </div>
  );
}
