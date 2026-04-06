'use client';

import { motion, MotionConfig } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { fade, ArchitectureDiagram, VerificationTerminal, CoverageGraph, LLMNetworkDiagram, BenchmarkChart, WaitlistForm } from '@/components/shared';

export default function HowItWorksPage() {
  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <div className="grain" />
      <Header />

      <main>
      <section className="pt-32 sm:pt-40 pb-20 sm:pb-32 bg-neutral-950 text-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-5 sm:px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fade}
            className="text-center mb-12 sm:mb-16"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-medium mb-4">How it works</p>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl tracking-tight mb-4">
              One layer between build
              <span className="text-white/40"> and deploy.</span>
            </h1>
            <p className="text-sm sm:text-base text-neutral-400 font-light max-w-lg mx-auto">
              Grysics sits between your AI and production, running automated verification to catch failures before your users do.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fade}
          >
            <ArchitectureDiagram />
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden mt-16">
            {[
              { value: '< 3min', label: 'Full verification' },
              { value: '12+', label: 'Quality checks' },
              { value: '99.9%', label: 'Deploy success' },
              { value: '0', label: 'Missed failures' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i + 3}
                variants={fade}
                className="bg-neutral-950 p-6 sm:p-8 text-center"
              >
                <p className="font-serif text-xl sm:text-2xl italic text-white mb-1">{stat.value}</p>
                <p className="text-[10px] sm:text-xs text-neutral-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-32 border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-5 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fade}
            className="text-center mb-12 sm:mb-16"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium mb-4">Ecosystem</p>
            <h2 className="font-serif text-2xl sm:text-5xl tracking-tight text-neutral-900 mb-4">
              Works with every LLM.
            </h2>
            <p className="text-sm sm:text-base text-neutral-500 font-light max-w-lg mx-auto">
              Grysics verifies outputs from frontier models, open-source LLMs, and enterprise AI — all through a single integration.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            variants={fade}
            className="bg-neutral-950 rounded-2xl p-6 sm:p-10 border border-neutral-200/10"
          >
            <LLMNetworkDiagram />
          </motion.div>
        </div>
      </section>

      <section className="py-20 sm:py-32 border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-5 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              variants={fade}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium mb-4">Live verification</p>
              <h2 className="font-serif text-2xl sm:text-4xl tracking-tight text-neutral-900 mb-4">
                See exactly what passes.
                <span className="text-neutral-400"> And what doesn&apos;t.</span>
              </h2>
              <p className="text-sm sm:text-base text-neutral-500 font-light leading-relaxed mb-8">
                Grysics runs a full suite of checks against your AI and generates a clear, actionable report. No guesswork.
              </p>
              <div className="space-y-3">
                {[
                  { label: 'Accuracy & hallucination detection', color: 'bg-green-500' },
                  { label: 'Latency & performance profiling', color: 'bg-green-500' },
                  { label: 'Edge case & adversarial testing', color: 'bg-green-500' },
                  { label: 'Regression detection across updates', color: 'bg-amber-500' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className={`w-1.5 h-1.5 rounded-full ${item.color} flex-shrink-0`} />
                    <span className="text-sm text-neutral-600">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
              variants={fade}
            >
              <VerificationTerminal />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-32 bg-neutral-950 text-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-5 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fade}
            className="text-center mb-12 sm:mb-16"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-medium mb-4">Coverage</p>
            <h2 className="font-serif text-2xl sm:text-5xl tracking-tight">
              Every type of AI.
              <span className="text-white/40"> One verification layer.</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            variants={fade}
          >
            <CoverageGraph />
          </motion.div>
        </div>
      </section>

      <section className="py-20 sm:py-32 border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-5 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              variants={fade}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium mb-4">Benchmarks</p>
              <h2 className="font-serif text-2xl sm:text-4xl tracking-tight text-neutral-900 mb-4">
                Measurable improvement.
                <span className="text-neutral-400"> Every metric.</span>
              </h2>
              <p className="text-sm sm:text-base text-neutral-500 font-light leading-relaxed mb-8">
                Side-by-side comparison of AI deployments with and without Grysics verification. These benchmarks are based on aggregated data across chatbot, RAG, and agent workloads.
              </p>
              <div className="space-y-4">
                {[
                  { value: '87%', label: 'reduction in hallucination rate' },
                  { value: '2.3x', label: 'faster failure detection' },
                  { value: '124%', label: 'improvement in edge case handling' },
                ].map((item) => (
                  <div key={item.label} className="flex items-baseline gap-3">
                    <span className="font-serif text-xl italic text-primary font-semibold">{item.value}</span>
                    <span className="text-sm text-neutral-500">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
              variants={fade}
              className="bg-neutral-950 rounded-2xl p-6 sm:p-8 border border-neutral-200/10"
            >
              <BenchmarkChart />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-32 border-b border-neutral-100">
        <div className="max-w-4xl mx-auto px-5 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fade}
            className="text-center mb-16 sm:mb-20"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium mb-4">Why it matters</p>
            <h2 className="font-serif text-2xl sm:text-5xl tracking-tight text-neutral-900">
              Failures hide in plain sight.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { num: '73%', title: 'Hallucinate silently', desc: 'AI gives wrong answers with full confidence. Users trust bad output.' },
              { num: '4.2h', title: 'Before detection', desc: 'Average time to discover a regression. Hours of broken user experience.' },
              { num: '68%', title: 'Fail on edge cases', desc: 'Models pass standard tests but break on real-world inputs.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i + 1}
                variants={fade}
                className="p-6 sm:p-8 rounded-2xl border border-neutral-100 bg-neutral-50/50"
              >
                <p className="font-serif text-3xl sm:text-4xl italic text-primary mb-3">{item.num}</p>
                <h3 className="text-base font-medium text-neutral-900 mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-500 font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-32">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fade}
          >
            <h2 className="font-serif text-2xl sm:text-4xl tracking-tight text-neutral-900 mb-4">
              Ready to verify?
            </h2>
            <p className="text-sm text-neutral-500 font-light mb-8">Join the waitlist or book a personalized demo.</p>
            <div className="flex justify-center mb-8">
              <WaitlistForm variant="light" />
            </div>
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white text-sm font-medium rounded-full hover:bg-primary-dark transition-colors"
            >
              Book a Demo <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
      </main>

      <Footer />
    </div>
    </MotionConfig>
  );
}
