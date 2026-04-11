'use client';

import { motion, useReducedMotion } from 'framer-motion';

function FloatingBadge({ text, status, x, y, delay }: { text: string; status: 'pass' | 'warn' | 'fail'; x: string; y: string; delay: number }) {
  const colors = {
    pass: 'border-green-500/20 bg-green-500/5 text-green-400',
    warn: 'border-amber-500/20 bg-amber-500/5 text-amber-400',
    fail: 'border-red-500/20 bg-red-500/5 text-red-400',
  };
  const dots = { pass: 'bg-green-400', warn: 'bg-amber-400', fail: 'bg-red-400' };

  return (
    <motion.div
      className={`absolute hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-sm text-[10px] font-mono ${colors[status]}`}
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay }}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dots[status]}`} />
      {text}
    </motion.div>
  );
}

export default function HeroBackground() {
  const prefersReducedMotion = useReducedMotion();
  const instant = prefersReducedMotion;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#0a0a0f]">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/bg.png')`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80% 60% at 50% 40%, rgba(10,10,15,0.55) 0%, transparent 60%),
            radial-gradient(ellipse 100% 100% at 50% 50%, rgba(10,10,15,0.45) 0%, rgba(10,10,15,0.7) 100%)
          `,
        }}
      />

      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" aria-hidden="true">
        <defs>
          <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>

      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          left: '50%',
          top: '40%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(249,115,22,0.12) 0%, rgba(249,115,22,0.03) 40%, transparent 70%)',
        }}
        animate={instant ? {} : {
          scale: [1, 1.1, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          left: '20%',
          top: '60%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)',
        }}
        animate={instant ? {} : {
          scale: [1, 1.15, 1],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full"
        style={{
          left: '75%',
          top: '25%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)',
        }}
        animate={instant ? {} : {
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />

      <FloatingBadge text="accuracy 98.4%" status="pass" x="8%" y="30%" delay={1.2} />
      <FloatingBadge text="hallucination 1.2%" status="pass" x="78%" y="25%" delay={1.6} />
      <FloatingBadge text="P99 latency 1.2s" status="warn" x="5%" y="65%" delay={2.0} />
      <FloatingBadge text="edge cases PASS" status="pass" x="75%" y="70%" delay={2.4} />

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
    </div>
  );
}
