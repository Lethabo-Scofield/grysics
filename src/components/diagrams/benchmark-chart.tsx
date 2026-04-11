'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';

const BENCHMARK_DATA = [
  { metric: 'Task Completion', before: 42, after: 96, unit: '%', lowerBetter: false },
  { metric: 'Processing Time', before: 2.4, after: 0.3, unit: 'h', lowerBetter: true },
  { metric: 'Error Rate', before: 18, after: 2.1, unit: '%', lowerBetter: true },
  { metric: 'Data Accuracy', before: 78, after: 98, unit: '%', lowerBetter: false },
  { metric: 'Steps Automated', before: 23, after: 94, unit: '%', lowerBetter: false },
  { metric: 'Cost per Task', before: 85, after: 12, unit: '$', lowerBetter: true },
];

export default function BenchmarkChart() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const prefersReducedMotion = useReducedMotion();
  const instant = prefersReducedMotion;

  return (
    <div ref={ref} className="space-y-5" role="list" aria-label="Performance comparison: manual vs Grysics">
      <div className="flex items-center gap-6 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-white/10 border border-white/20" />
          <span className="text-[11px] text-white/40">Manual</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-primary" />
          <span className="text-[11px] text-white/40">With Grysics</span>
        </div>
      </div>

      {BENCHMARK_DATA.map((item, i) => {
        const maxVal = item.unit === 'h' ? 3 : item.unit === '$' ? 100 : 100;
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
            aria-label={`${item.metric}: ${item.before}${item.unit} manual, ${item.after}${item.unit} with Grysics`}
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
