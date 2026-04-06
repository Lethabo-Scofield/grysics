'use client';

import { MotionConfig } from 'framer-motion';
import { LLMNetworkDiagram } from '@/components/shared';

export default function TestLLM() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-8">
        <div className="w-full max-w-4xl bg-neutral-950 rounded-2xl p-6 sm:p-10 border border-neutral-200/10">
          <LLMNetworkDiagram />
        </div>
      </div>
    </MotionConfig>
  );
}
