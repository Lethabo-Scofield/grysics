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
    if (prefersReducedMotion) { setActiveStep(4); return; }
    let step = 0;
    const timer = setInterval(() => {
      setActiveStep(step);
      step++;
      if (step > 4) clearInterval(timer);
    }, 600);
    return () => clearInterval(timer);
  }, [isInView, prefersReducedMotion]);

  const nodes = [
    { x: 60, y: 100, label: 'Your Goal', sub: 'Plain text' },
    { x: 240, y: 50, label: 'Grysics', sub: 'Execution' },
    { x: 240, y: 150, label: 'Systems', sub: 'APIs / Data' },
    { x: 420, y: 100, label: 'Processing', sub: 'Multi-step' },
    { x: 560, y: 100, label: 'Output', sub: 'Completed' },
  ];

  const instant = prefersReducedMotion;

  return (
    <div ref={ref} className="relative w-full max-w-2xl mx-auto">
      <svg viewBox="0 0 620 200" className="w-full h-auto" fill="none" role="img" aria-labelledby="arch-title arch-desc">
        <title id="arch-title">Grysics execution flow</title>
        <desc id="arch-desc">Diagram showing the flow: Your goal connects to Grysics execution engine and external systems, which processes tasks and produces a completed output.</desc>
        <motion.line x1="110" y1="100" x2="200" y2="55" stroke={activeStep >= 1 ? '#F97316' : '#333'} strokeWidth="1.5" strokeDasharray={activeStep >= 1 ? "0" : "4 4"} initial={{ pathLength: instant ? 1 : 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ duration: instant ? 0 : 0.5, delay: instant ? 0 : 0.3 }} />
        <motion.line x1="110" y1="100" x2="200" y2="150" stroke={activeStep >= 2 ? '#F97316' : '#333'} strokeWidth="1.5" strokeDasharray={activeStep >= 2 ? "0" : "4 4"} initial={{ pathLength: instant ? 1 : 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ duration: instant ? 0 : 0.5, delay: instant ? 0 : 0.6 }} />
        <motion.line x1="290" y1="55" x2="380" y2="100" stroke={activeStep >= 3 ? '#F97316' : '#333'} strokeWidth="1.5" strokeDasharray={activeStep >= 3 ? "0" : "4 4"} initial={{ pathLength: instant ? 1 : 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ duration: instant ? 0 : 0.5, delay: instant ? 0 : 0.9 }} />
        <motion.line x1="290" y1="150" x2="380" y2="100" stroke={activeStep >= 3 ? '#F97316' : '#333'} strokeWidth="1.5" strokeDasharray={activeStep >= 3 ? "0" : "4 4"} initial={{ pathLength: instant ? 1 : 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ duration: instant ? 0 : 0.5, delay: instant ? 0 : 1.0 }} />
        <motion.line x1="460" y1="100" x2="520" y2="100" stroke={activeStep >= 4 ? '#22c55e' : '#333'} strokeWidth="1.5" strokeDasharray={activeStep >= 4 ? "0" : "4 4"} initial={{ pathLength: instant ? 1 : 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ duration: instant ? 0 : 0.5, delay: instant ? 0 : 1.3 }} />

        {nodes.map((node, i) => (
          <motion.g key={node.label} initial={{ opacity: instant ? 1 : 0, scale: instant ? 1 : 0.8 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: instant ? 0 : 0.4, delay: instant ? 0 : i * 0.2 }}>
            <rect x={node.x - 45} y={node.y - 30} width="90" height="60" rx="12" fill={activeStep >= i ? (i === 4 ? '#22c55e10' : '#F9731610') : '#ffffff08'} stroke={activeStep >= i ? (i === 4 ? '#22c55e40' : '#F9731640') : '#ffffff15'} strokeWidth="1" />
            <text x={node.x} y={node.y - 5} textAnchor="middle" fill={activeStep >= i ? '#fff' : '#888'} fontSize="12" fontWeight="500">{node.label}</text>
            <text x={node.x} y={node.y + 12} textAnchor="middle" fill="#666" fontSize="9">{node.sub}</text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
