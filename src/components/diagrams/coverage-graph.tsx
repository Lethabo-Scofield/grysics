'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';

export default function CoverageGraph() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const prefersReducedMotion = useReducedMotion();
  const instant = prefersReducedMotion;

  const categories = [
    { name: 'Conversational AI', value: 98, priority: true },
    { name: 'RAG Systems', value: 96, priority: true },
    { name: 'Agents', value: 94, priority: true },
    { name: 'Generative AI', value: 97, priority: true },
    { name: 'Recommendations', value: 90, priority: false },
    { name: 'Computer Vision', value: 88, priority: false },
    { name: 'Speech & Audio', value: 85, priority: false },
    { name: 'Predictive', value: 82, priority: false },
  ];

  return (
    <div ref={ref} className="space-y-3" role="list" aria-label="AI category coverage">
      {categories.map((cat, i) => (
        <motion.div
          key={cat.name}
          initial={{ opacity: instant ? 1 : 0, x: instant ? 0 : -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: instant ? 0 : 0.4, delay: instant ? 0 : i * 0.08 }}
          className="flex items-center gap-2 sm:gap-4"
          role="listitem"
          aria-label={`${cat.name}: ${cat.value}% coverage${cat.priority ? ' (priority)' : ''}`}
        >
          <span className={`text-[10px] sm:text-xs w-24 sm:w-36 text-right flex-shrink-0 ${
            cat.priority ? 'text-white font-medium' : 'text-white/40'
          }`}>
            {cat.name}
          </span>
          <div className="flex-1 h-5 sm:h-6 bg-white/5 rounded overflow-hidden relative" aria-hidden="true">
            <motion.div
              className={`h-full rounded origin-left ${cat.priority ? 'bg-primary' : 'bg-white/15'}`}
              style={{ width: `${cat.value}%` }}
              initial={{ scaleX: instant ? 1 : 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: instant ? 0 : 0.8, delay: instant ? 0 : i * 0.08 + 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-white/50 font-mono">
              {cat.value}%
            </span>
          </div>
          {cat.priority && (
            <span className="text-[9px] uppercase tracking-wider text-primary font-semibold flex-shrink-0 hidden sm:block">
              Priority
            </span>
          )}
        </motion.div>
      ))}
    </div>
  );
}
