'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';

const LLM_MODELS = [
  { id: 'gpt4', label: 'GPT-4o', logo: '/images/logos/openai.png', cat: 'f' },
  { id: 'claude', label: 'Claude 3.5', logo: '/images/logos/anthropic.png', cat: 'f' },
  { id: 'gemini', label: 'Gemini', logo: '/images/logos/google.svg', cat: 'f' },
  { id: 'llama', label: 'Llama 3', logo: '/images/logos/meta.svg', cat: 'o' },
  { id: 'mistral', label: 'Mistral', logo: '/images/logos/mistral.png', cat: 'o' },
  { id: 'phi', label: 'Phi-3', logo: '/images/logos/microsoft.png', cat: 'o' },
  { id: 'cohere', label: 'Cohere', logo: '/images/logos/cohere.png', cat: 'e' },
  { id: 'falcon', label: 'Falcon', logo: '/images/logos/falcon.png', cat: 'e' },
];

const CAT_COLORS: Record<string, { ring: string; fill: string; line: string }> = {
  f: { ring: '#3b82f6', fill: '#93c5fdb3', line: '#3b82f680' },
  o: { ring: '#22c55e', fill: '#86efacb3', line: '#22c55e80' },
  e: { ring: '#a855f7', fill: '#c4b5fdb3', line: '#a855f780' },
};

export default function LLMNetworkDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const prefersReducedMotion = useReducedMotion();
  const instant = prefersReducedMotion;

  const CX = 300;
  const CY = 200;
  const W = 600;
  const H = 400;

  const nodePositions = [
    { ...LLM_MODELS[0], x: 75, y: 55 },
    { ...LLM_MODELS[1], x: 225, y: 35 },
    { ...LLM_MODELS[2], x: 375, y: 35 },
    { ...LLM_MODELS[3], x: 525, y: 55 },
    { ...LLM_MODELS[4], x: 75, y: 345 },
    { ...LLM_MODELS[5], x: 225, y: 365 },
    { ...LLM_MODELS[6], x: 375, y: 365 },
    { ...LLM_MODELS[7], x: 525, y: 345 },
  ];

  return (
    <motion.div
      ref={ref}
      className="w-full max-w-2xl mx-auto py-4 sm:py-8"
      role="img"
      aria-label="Network diagram showing LLMs connected to Grysics verification engine"
      initial={{ opacity: instant ? 1 : 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: instant ? 0 : 0.6 }}
    >
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" aria-hidden="true">
        <defs>
          <radialGradient id="grysics-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F97316" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
          </radialGradient>
          {nodePositions.map((node) => {
            const col = CAT_COLORS[node.cat];
            return (
              <linearGradient key={`grad-${node.id}`} id={`line-${node.id}`} x1={node.x} y1={node.y} x2={CX} y2={CY} gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor={col.line} />
                <stop offset="100%" stopColor="#F9731680" />
              </linearGradient>
            );
          })}
        </defs>

        {nodePositions.map((node, i) => (
          <motion.line
            key={`line-${node.id}`}
            x1={node.x}
            y1={node.y}
            x2={CX}
            y2={CY}
            stroke={`url(#line-${node.id})`}
            strokeWidth="1.5"
            strokeDasharray="4 4"
            initial={{ pathLength: instant ? 1 : 0, opacity: instant ? 1 : 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: instant ? 0 : 0.8, delay: instant ? 0 : 0.2 + i * 0.1 }}
          />
        ))}

        <circle cx={CX} cy={CY} r="60" fill="url(#grysics-glow)" />
        <circle cx={CX} cy={CY} r="36" fill="#F97316" fillOpacity="0.08" stroke="#F97316" strokeWidth="2" />
        <image href="/images/grysics-logo.png" x={CX - 18} y={CY - 18} width="36" height="36" />
        <text x={CX} y={CY + 52} textAnchor="middle" fill="#F97316" fontSize="12" fontWeight="700">Grysics</text>
        <text x={CX} y={CY + 65} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="9">Verification Engine</text>

        {nodePositions.map((node) => {
          const col = CAT_COLORS[node.cat];
          return (
            <g key={node.id}>
              <circle cx={node.x} cy={node.y} r="24" fill="rgba(255,255,255,0.04)" stroke={col.ring} strokeWidth="1" />
              <image href={node.logo} x={node.x - 14} y={node.y - 14} width="28" height="28" />
              <text x={node.x} y={node.y + 36} textAnchor="middle" fontSize="10" fontWeight="500" fill={col.fill}>{node.label}</text>
            </g>
          );
        })}
      </svg>

      <div className="flex flex-wrap justify-center gap-x-5 sm:gap-x-6 gap-y-2 mt-4 sm:mt-6">
        {[
          { label: 'Frontier Models', color: '#3b82f6' },
          { label: 'Open Source', color: '#22c55e' },
          { label: 'Enterprise', color: '#a855f7' },
          { label: 'Grysics', color: '#F97316' },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-[10px] sm:text-[11px] text-white/40">{item.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
