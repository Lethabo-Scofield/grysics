'use client';

import { memo } from 'react';
import dynamic from 'next/dynamic';
import { motion, MotionConfig } from 'framer-motion';
import { ArrowRight, Check, Eye, Lock, FileText, Shield } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { fade } from '@/components/fade';
import HeroBackground from '@/components/hero-background';

const ArchitectureDiagram = dynamic(() => import('@/components/diagrams/architecture-diagram'), { ssr: false, loading: () => <DiagramFallback /> });
const ExecutionTerminal = dynamic(() => import('@/components/diagrams/verification-terminal'), { ssr: false, loading: () => <DiagramFallback /> });
const BenchmarkChart = dynamic(() => import('@/components/diagrams/benchmark-chart'), { ssr: false, loading: () => <DiagramFallback /> });

function DiagramFallback() {
  return <div className="w-full h-48 animate-pulse bg-white/5 rounded-xl" />;
}

const UseCaseCards = memo(function UseCaseCards() {
  const cases = [
    {
      image: '/images/usecase-finance.png',
      title: 'Finance',
      items: ['Monthly reporting packs', 'Expense reconciliation', 'Financial summaries'],
    },
    {
      image: '/images/usecase-compliance.png',
      title: 'Compliance',
      items: ['Audit-ready reports', 'Regulatory reporting', 'Data validation workflows'],
    },
    {
      image: '/images/usecase-hr.png',
      title: 'HR Operations',
      items: ['Onboarding/offboarding execution', 'Employee data updates', 'Reporting'],
    },
    {
      image: '/images/usecase-reporting.png',
      title: 'Enterprise Reporting',
      items: ['Cross-system data aggregation', 'Executive dashboards and summaries'],
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {cases.map((uc, i) => (
        <motion.div
          key={uc.title}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}
          custom={i}
          variants={fade}
          className="relative rounded-xl sm:rounded-2xl overflow-hidden min-h-[280px] sm:min-h-[320px] group"
        >
          <Image
            src={uc.image}
            alt={uc.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
          <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
            <h3 className="text-base sm:text-lg font-medium text-white mb-2 sm:mb-3">{uc.title}</h3>
            <ul className="space-y-1.5">
              {uc.items.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <div className="w-1 h-1 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
    </div>
  );
});

const BenefitsList = memo(function BenefitsList() {
  const benefits = [
    'No manual workflows',
    'Works with your existing systems',
    'Reduces operational workload',
    'Delivers consistent, accurate outputs',
    'Full audit trail for every action',
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {benefits.map((b, i) => (
        <motion.div
          key={b}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}
          custom={i}
          variants={fade}
          className="flex items-center gap-3 p-4 sm:p-5 rounded-xl border border-neutral-100 bg-white"
        >
          <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
            <Check className="w-3.5 h-3.5 text-green-600" />
          </div>
          <span className="text-sm text-neutral-700 font-medium">{b}</span>
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
            Turn business goals
            <br />
            <span className="bg-gradient-to-r from-primary via-amber-400 to-primary bg-clip-text text-transparent">into completed work.</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fade}
            className="text-[15px] leading-relaxed sm:text-lg text-white/40 font-light mb-10 sm:mb-14 max-w-xl mx-auto px-2"
          >
            Describe what needs to be done. Grysics executes it across your systems, data, and workflows. Automatically and reliably.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            custom={3}
            variants={fade}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-2 sm:px-0"
          >
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white text-sm font-medium rounded-full hover:bg-primary-dark transition-colors"
            >
              Request Demo <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/20 text-white/70 text-sm font-medium rounded-full hover:bg-white/5 transition-colors backdrop-blur-sm"
            >
              See How It Works
            </a>
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

          <ArchitectureDiagram />
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
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium mb-3 sm:mb-4">The problem</p>
            <h2 className="font-serif text-2xl sm:text-5xl tracking-tight text-neutral-900 mb-4 sm:mb-6">
              Business operations are still
              <span className="text-neutral-400"> manual and fragmented</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-20px" }}
              custom={1}
              variants={fade}
              className="relative w-full aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden"
            >
              <Image
                src="/images/business-docs.png"
                alt="Manual business document processing"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-20px" }}
              custom={1}
              variants={fade}
            >
            <p className="text-sm sm:text-base text-neutral-500 font-light leading-relaxed mb-6 sm:mb-8">
              Most companies rely on multiple systems like ERP, Excel, HR platforms, and reporting tools. Teams still spend hours on tasks that should be automatic.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {[
                'Collecting data across systems',
                'Cleaning and reconciling records',
                'Building reports manually',
                'Coordinating across departments',
              ].map((item, i) => (
                <motion.div
                  key={item}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-20px" }}
                  custom={i + 2}
                  variants={fade}
                  className="flex items-center gap-3 p-4 rounded-xl border border-neutral-100 bg-neutral-50/50"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                  <span className="text-sm text-neutral-600">{item}</span>
                </motion.div>
              ))}
            </div>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-20px" }}
              custom={6}
              variants={fade}
              className="text-sm text-neutral-400 font-light text-center mt-6 sm:mt-8"
            >
              Even with modern tools, execution remains manual and time-consuming.
            </motion.p>
          </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-32 bg-neutral-950 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20px" }}
            custom={0}
            variants={fade}
            className="text-center mb-10 sm:mb-14"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-medium mb-3 sm:mb-4">The solution</p>
            <h2 className="font-serif text-2xl sm:text-5xl lg:text-6xl tracking-tight mb-4 sm:mb-6">
              Grysics executes business
              <br className="hidden sm:block" />
              <span className="text-white/40"> operations for you</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-20px" }}
              custom={1}
              variants={fade}
            >
              <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed mb-8">
                Grysics is an AI execution system that takes a business goal and handles the entire process across your tools and data.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-sm font-semibold">1</span>
                  </div>
                  <p className="font-serif text-base sm:text-lg italic text-primary">You describe the outcome.</p>
                </div>
                <div className="w-px h-4 bg-white/10 ml-4" />
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                    <span className="text-white/60 text-sm font-semibold">2</span>
                  </div>
                  <p className="font-serif text-base sm:text-lg italic text-white/60">Grysics plans, executes, and delivers it.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-20px" }}
              custom={2}
              variants={fade}
              className="relative w-full aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-white/5"
            >
              <Image
                src="/images/ai-operations.png"
                alt="AI in business operations and design process"
                fill
                className="object-contain p-4"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
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
                Every execution is transparent. You see each step as it happens: what data is being pulled, what&apos;s being processed, and what the final output looks like.
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
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium mb-3 sm:mb-4">Use cases</p>
            <h2 className="font-serif text-2xl sm:text-5xl tracking-tight text-neutral-900">
              Built for business operations.
            </h2>
          </motion.div>

          <UseCaseCards />
        </div>
      </section>

      <section className="py-16 sm:py-32 border-b border-neutral-100 bg-neutral-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20px" }}
            custom={0}
            variants={fade}
            className="text-center mb-10 sm:mb-16"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium mb-3 sm:mb-4">Key benefits</p>
            <h2 className="font-serif text-2xl sm:text-5xl tracking-tight text-neutral-900">
              Why teams choose Grysics.
            </h2>
          </motion.div>

          <BenefitsList />
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
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium mb-3 sm:mb-4">Differentiation</p>
              <h2 className="font-serif text-2xl sm:text-4xl tracking-tight text-neutral-900 mb-3 sm:mb-4">
                Beyond dashboards and
                <span className="text-neutral-400"> automation tools.</span>
              </h2>
              <p className="text-sm sm:text-base text-neutral-500 font-light leading-relaxed mb-6 sm:mb-8">
                Traditional tools help teams build workflows or visualize data. Grysics completes the work.
              </p>
              <div className="space-y-3">
                {[
                  'No workflow setup required',
                  'No manual data coordination',
                  'No fragmented processes',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-sm text-neutral-600">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-neutral-400 font-light mt-6 italic">
                From request to result. Fully executed.
              </p>
            </motion.div>

            <div className="bg-neutral-950 rounded-xl sm:rounded-2xl p-4 sm:p-8 border border-neutral-200/10">
              <BenchmarkChart />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-32 bg-neutral-950 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20px" }}
            custom={0}
            variants={fade}
            className="text-center mb-10 sm:mb-12"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-medium mb-3 sm:mb-4">Trust & control</p>
            <h2 className="font-serif text-2xl sm:text-5xl tracking-tight mb-4 sm:mb-6">
              Built for reliability
              <span className="text-white/40"> and control.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto">
            {[
              { icon: Eye, title: 'Full traceability', desc: 'Every action is logged and traceable across all systems.' },
              { icon: FileText, title: 'Recorded transformations', desc: 'Data sources and transformations are recorded for review.' },
              { icon: Lock, title: 'Approval workflows', desc: 'Approval steps can be added to any execution process.' },
              { icon: Shield, title: 'Enterprise-grade', desc: 'Designed for finance, compliance, and enterprise operations.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-20px" }}
                custom={i}
                variants={fade}
                className="p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.03]"
              >
                <item.icon className="w-5 h-5 text-primary mb-3" />
                <h3 className="text-sm sm:text-base font-medium text-white mb-1.5">{item.title}</h3>
                <p className="text-xs sm:text-sm text-white/40 font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
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
            <h2 className="font-serif text-2xl sm:text-5xl lg:text-6xl tracking-tight text-neutral-900 mb-3 sm:mb-4">
              Give it a goal.
              <br />
              <span className="bg-gradient-to-r from-primary via-amber-400 to-primary bg-clip-text text-transparent">Get it done.</span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-500 font-light mb-8 sm:mb-10 max-w-md mx-auto">
              See how Grysics can handle your business operations, from goal to completed result.
            </p>
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white text-sm font-medium rounded-full hover:bg-primary-dark transition-colors"
            >
              Request a Demo <ArrowRight className="w-4 h-4" />
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
