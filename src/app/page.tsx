'use client';

import { memo } from 'react';
import dynamic from 'next/dynamic';
import { motion, MotionConfig } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { fade } from '@/components/fade';
import { WaitlistForm } from '@/components/waitlist-form';
import HeroBackground from '@/components/hero-background';

const ArchitectureDiagram = dynamic(() => import('@/components/diagrams/architecture-diagram'), { ssr: false, loading: () => <DiagramFallback /> });
const ExecutionTerminal = dynamic(() => import('@/components/diagrams/verification-terminal'), { ssr: false, loading: () => <DiagramFallback /> });
const CoverageGraph = dynamic(() => import('@/components/diagrams/coverage-graph'), { ssr: false, loading: () => <DiagramFallback /> });
const LLMNetworkDiagram = dynamic(() => import('@/components/diagrams/llm-network-diagram'), { ssr: false, loading: () => <DiagramFallback /> });
const BenchmarkChart = dynamic(() => import('@/components/diagrams/benchmark-chart'), { ssr: false, loading: () => <DiagramFallback /> });

function DiagramFallback() {
  return <div className="w-full h-48 animate-pulse bg-white/5 rounded-xl" />;
}

const StatsGrid = memo(function StatsGrid() {
  const stats = [
    { value: '< 3min', label: 'Average execution' },
    { value: '3', label: 'Launch workflows' },
    { value: '100%', label: 'Goal completion' },
    { value: '0', label: 'Manual steps' },
  ];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/5 rounded-xl sm:rounded-2xl overflow-hidden mt-10 sm:mt-16">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}
          custom={i}
          variants={fade}
          className="bg-neutral-950 p-4 sm:p-8 text-center"
        >
          <p className="font-serif text-lg sm:text-2xl italic text-white mb-1">{stat.value}</p>
          <p className="text-[9px] sm:text-xs text-neutral-500">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
});

const WorkflowCards = memo(function WorkflowCards() {
  const items = [
    { num: '01', title: 'Financial Reconciliation', desc: 'Match transactions across bank statements, payment processors, and accounting tools. Flag discrepancies automatically.' },
    { num: '02', title: 'Sales Lead Processing', desc: 'Pull leads from your CRM, enrich and score them, then route qualified ones to the right reps.' },
    { num: '03', title: 'Enterprise Reporting', desc: 'Aggregate data from multiple sources, calculate trends, and produce structured weekly reports.' },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
      {items.map((item, i) => (
        <motion.div
          key={item.title}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}
          custom={i}
          variants={fade}
          className="p-5 sm:p-8 rounded-xl sm:rounded-2xl border border-neutral-100 bg-neutral-50/50"
        >
          <p className="font-serif text-2xl sm:text-4xl italic text-primary mb-2 sm:mb-3">{item.num}</p>
          <h3 className="text-sm sm:text-base font-medium text-neutral-900 mb-1.5 sm:mb-2">{item.title}</h3>
          <p className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed">{item.desc}</p>
        </motion.div>
      ))}
    </div>
  );
});

export default function HomePage() {
  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <div className="grain" />
      <Header />

      <main>
      <section className="relative min-h-[100svh] flex items-center justify-center px-4 sm:px-6 overflow-hidden">
        <HeroBackground />

        <div className="max-w-4xl mx-auto text-center relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm mb-8 sm:mb-10"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[11px] sm:text-xs text-white/50 font-mono tracking-wide">Coming soon</span>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fade}
            className="font-serif text-[2rem] leading-[1.1] sm:text-6xl lg:text-[5.5rem] text-white tracking-tight sm:leading-[1.05] mb-6 sm:mb-8"
          >
            Give it a goal.
            <br />
            <span className="bg-gradient-to-r from-primary via-amber-400 to-primary bg-clip-text text-transparent">Get it done.</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fade}
            className="text-[15px] leading-relaxed sm:text-lg text-white/40 font-light mb-10 sm:mb-14 max-w-lg mx-auto px-2"
          >
            Grysics is an AI execution system. Describe a business task,
            <br className="hidden sm:block" />
            and it handles the rest — across your tools and data.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            custom={3}
            variants={fade}
            className="flex flex-col items-center px-2 sm:px-0"
          >
            <WaitlistForm />
            <p className="text-[11px] text-white/20 mt-4 font-mono tracking-wide">Join the early access waitlist</p>
          </motion.div>
        </div>
      </section>

      <section id="how-it-works" className="pt-16 sm:pt-32 pb-16 sm:pb-32 bg-neutral-950 text-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20px" }}
            custom={0}
            variants={fade}
            className="text-center mb-10 sm:mb-16"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-medium mb-3 sm:mb-4">How it works</p>
            <h2 className="font-serif text-2xl sm:text-5xl lg:text-6xl tracking-tight mb-3 sm:mb-4">
              Goal in.
              <span className="text-white/40"> Task done.</span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 font-light max-w-lg mx-auto">
              You describe what needs to happen. Grysics figures out the steps, connects to your systems, and delivers the finished result.
            </p>
          </motion.div>

          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            <ArchitectureDiagram />
          </div>

          <StatsGrid />
        </div>
      </section>

      <section id="ecosystem" className="py-16 sm:py-32 border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20px" }}
            custom={0}
            variants={fade}
            className="text-center mb-10 sm:mb-16"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium mb-3 sm:mb-4">Ecosystem</p>
            <h2 className="font-serif text-2xl sm:text-5xl tracking-tight text-neutral-900 mb-3 sm:mb-4">
              Connects to the tools you use.
            </h2>
            <p className="text-sm sm:text-base text-neutral-500 font-light max-w-lg mx-auto">
              Grysics works with major AI providers and integrates with your existing stack through a single connection.
            </p>
          </motion.div>

          <div className="bg-neutral-900 rounded-xl sm:rounded-2xl p-4 sm:p-10 border border-neutral-700/30 overflow-x-auto">
            <LLMNetworkDiagram />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-32 border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-20px" }}
              custom={0}
              variants={fade}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium mb-3 sm:mb-4">Live execution</p>
              <h2 className="font-serif text-2xl sm:text-4xl tracking-tight text-neutral-900 mb-3 sm:mb-4">
                Watch it work.
                <span className="text-neutral-400"> Step by step.</span>
              </h2>
              <p className="text-sm sm:text-base text-neutral-500 font-light leading-relaxed mb-6 sm:mb-8">
                Every execution is transparent. You see each step as it happens — what data is being pulled, what&apos;s being processed, and what the final output looks like.
              </p>
              <div className="space-y-3">
                {[
                  { label: 'Connects to your data sources', color: 'bg-green-500' },
                  { label: 'Processes records across systems', color: 'bg-green-500' },
                  { label: 'Handles errors and edge cases', color: 'bg-green-500' },
                  { label: 'Delivers structured results', color: 'bg-amber-500' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className={`w-1.5 h-1.5 rounded-full ${item.color} flex-shrink-0`} />
                    <span className="text-sm text-neutral-600">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <ExecutionTerminal />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-32 bg-neutral-950 text-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20px" }}
            custom={0}
            variants={fade}
            className="text-center mb-10 sm:mb-16"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-medium mb-3 sm:mb-4">Coverage</p>
            <h2 className="font-serif text-2xl sm:text-5xl tracking-tight">
              Operations we handle.
              <span className="text-white/40"> And what&apos;s next.</span>
            </h2>
          </motion.div>

          <CoverageGraph />
        </div>
      </section>

      <section className="py-16 sm:py-32 border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-20px" }}
              custom={0}
              variants={fade}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium mb-3 sm:mb-4">Performance</p>
              <h2 className="font-serif text-2xl sm:text-4xl tracking-tight text-neutral-900 mb-3 sm:mb-4">
                Manual vs. Grysics.
              </h2>
              <p className="text-sm sm:text-base text-neutral-500 font-light leading-relaxed mb-6 sm:mb-8">
                Side-by-side comparison across common business operations. Based on internal testing with reconciliation, lead processing, and reporting workflows.
              </p>
            </motion.div>

            <div className="bg-neutral-950 rounded-xl sm:rounded-2xl p-4 sm:p-8 border border-neutral-200/10">
              <BenchmarkChart />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-32 border-b border-neutral-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20px" }}
            custom={0}
            variants={fade}
            className="text-center mb-12 sm:mb-20"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium mb-3 sm:mb-4">At launch</p>
            <h2 className="font-serif text-2xl sm:text-5xl tracking-tight text-neutral-900">
              Three workflows. More coming.
            </h2>
          </motion.div>

          <WorkflowCards />
        </div>
      </section>

      <section className="py-16 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20px" }}
            custom={0}
            variants={fade}
          >
            <h2 className="font-serif text-2xl sm:text-4xl tracking-tight text-neutral-900 mb-3 sm:mb-4">
              Interested?
            </h2>
            <p className="text-sm text-neutral-500 font-light mb-6 sm:mb-8">Join the waitlist or book a demo to see it in action.</p>
            <div className="flex justify-center mb-6 sm:mb-8">
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
