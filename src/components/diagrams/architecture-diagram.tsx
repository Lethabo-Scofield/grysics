'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

export default function ArchitectureDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const prefersReducedMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    if (!isInView) return;
    if (prefersReducedMotion) { setActiveStep(3); return; }
    let step = 0;
    const timer = setInterval(() => {
      setActiveStep(step);
      step++;
      if (step > 3) clearInterval(timer);
    }, 700);
    return () => clearInterval(timer);
  }, [isInView, prefersReducedMotion]);

  const instant = prefersReducedMotion;

  const steps = [
    {
      num: '01',
      title: 'Define the goal',
      examples: ['"Generate monthly financial report"', '"Prepare compliance report"', '"Update HR records and notify team"'],
    },
    {
      num: '02',
      title: 'Grysics plans the work',
      examples: ['Identifies required data', 'Selects systems', 'Builds execution steps'],
    },
    {
      num: '03',
      title: 'Executes across systems',
      examples: ['Pulls data from ERP, Excel, databases', 'Processes and validates data', 'Performs required calculations'],
    },
    {
      num: '04',
      title: 'Delivers results',
      examples: ['Excel reports & PDF summaries', 'Automated distribution', 'Full audit trail'],
    },
  ];

  return (
    <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {steps.map((step, i) => (
        <motion.div
          key={step.num}
          initial={{ opacity: instant ? 1 : 0, y: instant ? 0 : 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: instant ? 0 : 0.5, delay: instant ? 0 : i * 0.15 }}
          className={`relative p-5 sm:p-6 rounded-xl sm:rounded-2xl border transition-all duration-500 ${
            activeStep >= i
              ? 'border-primary/40 bg-primary/[0.06]'
              : 'border-white/10 bg-white/[0.03]'
          }`}
        >
          <div className="flex items-center gap-3 mb-3 sm:mb-4">
            <span className={`font-serif text-2xl sm:text-3xl italic transition-colors duration-500 ${
              activeStep >= i ? 'text-primary' : 'text-white/20'
            }`}>
              {step.num}
            </span>
            {i < 3 && (
              <div className={`hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-px transition-colors duration-500 ${
                activeStep > i ? 'bg-primary/60' : 'bg-white/10'
              }`} />
            )}
          </div>
          <h3 className={`text-sm sm:text-base font-medium mb-2 sm:mb-3 transition-colors duration-500 ${
            activeStep >= i ? 'text-white' : 'text-white/50'
          }`}>
            {step.title}
          </h3>
          <ul className="space-y-1.5">
            {step.examples.map((ex) => (
              <li key={ex} className="flex items-start gap-2">
                <div className={`w-1 h-1 rounded-full mt-1.5 flex-shrink-0 transition-colors duration-500 ${
                  activeStep >= i ? 'bg-primary/60' : 'bg-white/15'
                }`} />
                <span className="text-[11px] sm:text-xs text-white/40 leading-relaxed">{ex}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}
