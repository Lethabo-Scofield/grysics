'use client';

import { memo } from 'react';
import dynamic from 'next/dynamic';
import { motion, MotionConfig } from 'framer-motion';
import { ArrowRight, Zap, Layers, BarChart3, ShieldCheck, Globe, Clock } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { fade } from '@/components/fade';
import { WaitlistForm } from '@/components/waitlist-form';
import HeroBackground from '@/components/hero-background';

function DiagramFallback() {
  return <div className="w-full h-48 animate-pulse bg-white/5 rounded-xl" />;
}

const ExecutionDemo = dynamic(() => import('@/components/diagrams/execution-demo'), { ssr: false, loading: () => <DiagramFallback /> });

const StatsGrid = memo(function StatsGrid() {
  const stats = [
    { value: '10x', label: 'Faster than manual' },
    { value: '3', label: 'Core workflows' },
    { value: '100%', label: 'Goal completion' },
    { value: '0', label: 'Human intervention' },
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
    {
      icon: BarChart3,
      title: 'Financial Reconciliation',
      desc: 'Automatically reconcile transactions across bank statements, payment processors, and accounting software. Catch discrepancies instantly.',
    },
    {
      icon: Zap,
      title: 'Sales Lead Processing',
      desc: 'Qualify, score, and route inbound leads across your CRM, enrichment tools, and outreach platforms in seconds.',
    },
    {
      icon: Layers,
      title: 'Enterprise Reporting',
      desc: 'Generate structured weekly reports by pulling data from multiple sources, analyzing trends, and producing actionable summaries.',
    },
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
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
            <item.icon className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-sm sm:text-base font-medium text-neutral-900 mb-1.5 sm:mb-2">{item.title}</h3>
          <p className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed">{item.desc}</p>
        </motion.div>
      ))}
    </div>
  );
});

const HowItWorksSteps = memo(function HowItWorksSteps() {
  const steps = [
    {
      num: '01',
      title: 'Describe your goal',
      desc: 'Tell Grysics what you need done in plain language. No workflow building, no configuration.',
      example: '"Reconcile Q1 transactions across Stripe and QuickBooks"',
    },
    {
      num: '02',
      title: 'System plans execution',
      desc: 'Grysics breaks your goal into discrete steps, identifies required data sources, and maps the execution path.',
      example: 'Analyzing goal... Breaking into 6 execution steps...',
    },
    {
      num: '03',
      title: 'Multi-step execution',
      desc: 'The system executes across tools and APIs — fetching data, processing records, resolving inconsistencies automatically.',
      example: 'Fetching 847 transactions... Processing records... Resolving 3 discrepancies...',
    },
    {
      num: '04',
      title: 'Completed output',
      desc: 'Receive a structured result with summary metrics, detailed reports, and actionable insights. Real work, done.',
      example: '847 transactions reconciled. 3 discrepancies resolved. $12.4K variance identified.',
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
      {steps.map((step, i) => (
        <motion.div
          key={step.num}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}
          custom={i}
          variants={fade}
          className="relative p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.03]"
        >
          <span className="text-xs font-mono text-primary/60 tracking-wider">{step.num}</span>
          <h3 className="text-base sm:text-lg font-medium text-white mt-2 mb-2">{step.title}</h3>
          <p className="text-sm text-white/40 font-light leading-relaxed mb-4">{step.desc}</p>
          <div className="px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06]">
            <p className="text-[11px] sm:text-xs font-mono text-white/30 italic">{step.example}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
});

const FeatureList = memo(function FeatureList() {
  const features = [
    { icon: Zap, title: 'Goal-driven, not workflow-driven', desc: 'Describe what you want done. Grysics figures out how.' },
    { icon: Globe, title: 'Cross-system execution', desc: 'Operates across APIs, databases, and tools in a single run.' },
    { icon: ShieldCheck, title: 'Error handling built in', desc: 'Automatically resolves missing data, format mismatches, and edge cases.' },
    { icon: Clock, title: 'Minutes, not hours', desc: 'What takes a team hours of manual work, Grysics completes in minutes.' },
    { icon: Layers, title: 'Structured outputs', desc: 'Every execution produces clean, actionable results — tables, reports, summaries.' },
    { icon: BarChart3, title: 'Full transparency', desc: 'See every step, every decision, every data point. Nothing is a black box.' },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {features.map((feat, i) => (
        <motion.div
          key={feat.title}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}
          custom={i}
          variants={fade}
          className="p-5 sm:p-6 rounded-xl border border-neutral-100 hover:border-neutral-200 transition-colors"
        >
          <feat.icon className="w-5 h-5 text-primary mb-3" />
          <h3 className="text-sm font-medium text-neutral-900 mb-1">{feat.title}</h3>
          <p className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed">{feat.desc}</p>
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
            AI that executes
            <br />
            <span className="bg-gradient-to-r from-primary via-amber-400 to-primary bg-clip-text text-transparent">real business tasks.</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fade}
            className="text-[15px] leading-relaxed sm:text-lg text-white/40 font-light mb-10 sm:mb-14 max-w-lg mx-auto px-2"
          >
            Grysics turns business goals into completed operations.
            <br className="hidden sm:block" />
            No workflows. No manual steps. Just results.
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
              One goal in.
              <span className="text-white/40"> Completed task out.</span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 font-light max-w-lg mx-auto">
              Describe what you need done. Grysics plans the execution, operates across your systems, and delivers a finished result.
            </p>
          </motion.div>

          <HowItWorksSteps />
          <StatsGrid />
        </div>
      </section>

      <section className="py-16 sm:py-32 border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20px" }}
            custom={0}
            variants={fade}
            className="text-center mb-10 sm:mb-16"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium mb-3 sm:mb-4">What it does</p>
            <h2 className="font-serif text-2xl sm:text-5xl tracking-tight text-neutral-900 mb-3 sm:mb-4">
              Real work. Not suggestions.
            </h2>
            <p className="text-sm sm:text-base text-neutral-500 font-light max-w-lg mx-auto">
              Grysics doesn&apos;t chat, brainstorm, or suggest. It executes multi-step operations across your business systems and delivers completed outcomes.
            </p>
          </motion.div>

          <ExecutionDemo />
        </div>
      </section>

      <section className="py-16 sm:py-32 border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20px" }}
            custom={0}
            variants={fade}
            className="text-center mb-10 sm:mb-16"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium mb-3 sm:mb-4">Launch workflows</p>
            <h2 className="font-serif text-2xl sm:text-5xl tracking-tight text-neutral-900 mb-3 sm:mb-4">
              Built for operations that matter.
            </h2>
            <p className="text-sm sm:text-base text-neutral-500 font-light max-w-lg mx-auto">
              Three core workflows at launch, with more coming. Each one replaces hours of manual work with a single command.
            </p>
          </motion.div>

          <WorkflowCards />
        </div>
      </section>

      <section className="py-16 sm:py-32 border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20px" }}
            custom={0}
            variants={fade}
            className="text-center mb-10 sm:mb-16"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium mb-3 sm:mb-4">Why Grysics</p>
            <h2 className="font-serif text-2xl sm:text-5xl tracking-tight text-neutral-900">
              AI that does. Not AI that talks.
            </h2>
          </motion.div>

          <FeatureList />
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
              Ready for AI that works?
            </h2>
            <p className="text-sm text-neutral-500 font-light mb-6 sm:mb-8">Join the waitlist for early access or book a personalized demo.</p>
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
