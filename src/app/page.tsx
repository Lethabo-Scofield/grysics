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
const WorkflowDemo = dynamic(() => import('@/components/workflow-demo'), { ssr: false, loading: () => <DiagramFallback /> });
const LiveTerminal = dynamic(() => import('@/components/live-terminal'), { ssr: false, loading: () => <DiagramFallback /> });
const BenchmarkChart = dynamic(() => import('@/components/diagrams/benchmark-chart'), { ssr: false, loading: () => <DiagramFallback /> });

function DiagramFallback() {
  return <div className="w-full h-48 animate-pulse bg-white/5 rounded-xl" />;
}

const UseCaseRows = memo(function UseCaseRows() {
  const cases = [
    {
      title: 'Finance',
      items: ['Monthly reporting packs', 'Expense reconciliation', 'Financial summaries'],
    },
    {
      title: 'Compliance',
      items: ['Audit-ready reports', 'Regulatory reporting', 'Data validation workflows'],
    },
    {
      title: 'HR Operations',
      items: ['Onboarding/offboarding execution', 'Employee data updates', 'Reporting'],
    },
    {
      title: 'Enterprise Reporting',
      items: ['Cross-system data aggregation', 'Executive dashboards and summaries'],
    },
  ];
  return (
    <div className="divide-y divide-neutral-100">
      {cases.map((uc, i) => (
        <motion.div
          key={uc.title}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}
          custom={i}
          variants={fade}
          className="group grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 sm:gap-8 py-8 sm:py-10 first:pt-0 last:pb-0"
        >
          <div className="flex items-baseline gap-4">
            <span className="font-serif text-3xl sm:text-4xl text-neutral-200 font-medium leading-none select-none group-hover:text-primary/30 transition-colors duration-300">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="text-lg font-semibold text-neutral-900">{uc.title}</h3>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-2.5 items-start sm:pt-2">
            {uc.items.map((item) => (
              <span
                key={item}
                className="inline-block text-sm text-neutral-500 px-4 py-2 rounded-full border border-neutral-200/80 bg-neutral-50/50 group-hover:border-primary/20 group-hover:bg-primary/[0.03] transition-all duration-300"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
});

const BenefitsSlider = memo(function BenefitsSlider() {
  const benefits = [
    { title: 'No manual workflows', desc: 'Stop building complex automations. Just describe the goal.', icon: '01' },
    { title: 'Works with your systems', desc: 'Connects to ERP, Excel, databases, and more.', icon: '02' },
    { title: 'Reduces workload', desc: 'Free your team from repetitive operational tasks.', icon: '03' },
    { title: 'Accurate outputs', desc: 'Consistent results every time. No human error.', icon: '04' },
    { title: 'Full audit trail', desc: 'Every action logged and traceable for compliance.', icon: '05' },
    { title: 'Enterprise-ready', desc: 'Built for regulated industries from day one.', icon: '06' },
  ];

  const duplicated = [...benefits, ...benefits];

  return (
    <div className="relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      <motion.div
        className="flex gap-4 sm:gap-5"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ x: { duration: 30, repeat: Infinity, ease: 'linear' } }}
      >
        {duplicated.map((b, i) => (
          <div
            key={`${b.title}-${i}`}
            className="flex-shrink-0 w-[260px] sm:w-[300px] p-6 rounded-2xl bg-white border border-neutral-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:border-primary/20 transition-all duration-300 group cursor-default"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/[0.08] flex items-center justify-center mb-4 group-hover:bg-primary/[0.12] transition-colors">
              <span className="text-sm font-semibold text-primary">{b.icon}</span>
            </div>
            <h4 className="text-base font-semibold text-neutral-900 mb-2">{b.title}</h4>
            <p className="text-sm text-neutral-500 leading-relaxed">{b.desc}</p>
          </div>
        ))}
      </motion.div>
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
      <section className="relative min-h-[100svh] flex items-center justify-center px-5 sm:px-8 overflow-hidden">
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
            className="text-[15px] leading-relaxed sm:text-lg text-white/60 font-light mb-10 sm:mb-14 max-w-md mx-auto"
          >
            Describe what needs to be done. Grysics handles the rest.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            custom={3}
            variants={fade}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white text-sm font-medium rounded-full hover:bg-primary-dark transition-all duration-200 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
            >
              Request Demo <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/15 text-white/60 text-sm font-medium rounded-full hover:bg-white/5 hover:text-white/80 transition-all duration-200"
            >
              See How It Works
            </a>
          </motion.div>
        </div>
      </section>

      <section id="how-it-works" className="py-20 sm:py-32 bg-neutral-950 text-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20px" }}
            custom={0}
            variants={fade}
            className="text-center mb-12 sm:mb-16"
          >
            <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-500 font-medium mb-4">How it works</p>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl tracking-tight mb-3">
              Goal in.
              <span className="text-white/30"> Task done.</span>
            </h2>
            <p className="text-sm text-neutral-500 max-w-sm mx-auto">
              You set the goal. Grysics delivers the result.
            </p>
          </motion.div>

          <WorkflowDemo />
        </div>
      </section>

      <section className="py-20 sm:py-32 overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20px" }}
            custom={0}
            variants={fade}
            className="text-center mb-14 sm:mb-20"
          >
            <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-400 font-medium mb-4">The problem</p>
            <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-neutral-900 mb-4">
              Your team is stuck on
              <span className="text-neutral-300"> operational busywork</span>
            </h2>
            <p className="text-base text-neutral-500 font-light max-w-lg mx-auto">
              Finance, compliance, and operations teams lose days every month on tasks that follow the same pattern every time.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-14">
            {[
              {
                stat: '40+',
                unit: 'hours/month',
                title: 'Spent on reconciliation',
                desc: 'Teams manually pull data from ERP, match it against bank statements, and chase discrepancies across email.',
              },
              {
                stat: '5',
                unit: 'systems',
                title: 'Touched per report',
                desc: 'One financial report needs data from ERP, Excel, payment platforms, HR tools, and email threads.',
              },
              {
                stat: '3-5',
                unit: 'days',
                title: 'To close the books',
                desc: 'Month-end close involves manual checks, approvals, and back-and-forth that stretches for days.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-20px" }}
                custom={i + 1}
                variants={fade}
                className="p-6 sm:p-8 rounded-2xl border border-neutral-200/60 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
              >
                <div className="flex items-baseline gap-1.5 mb-4">
                  <span className="font-serif text-4xl sm:text-5xl text-neutral-900 tracking-tight">{item.stat}</span>
                  <span className="text-sm text-neutral-400 font-light">{item.unit}</span>
                </div>
                <h3 className="text-base font-semibold text-neutral-900 mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20px" }}
            custom={4}
            variants={fade}
            className="rounded-2xl bg-neutral-950 p-6 sm:p-10 text-white"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-red-400/70 font-medium mb-3">A typical Monday morning</p>
                <h3 className="font-serif text-2xl sm:text-3xl tracking-tight mb-4">
                  &quot;Can someone pull the Q1 numbers?&quot;
                </h3>
                <div className="space-y-3">
                  {[
                    { time: '9:00 AM', text: 'CFO requests Q1 reconciliation report' },
                    { time: '9:30 AM', text: 'Analyst opens ERP, Excel, and payment platform' },
                    { time: '11:00 AM', text: 'Data copied into spreadsheet, formulas break' },
                    { time: '2:00 PM', text: 'Three discrepancies found, two emails sent' },
                    { time: '4:30 PM', text: 'Report v3 sent for review. Missing one source.' },
                    { time: 'Next day', text: 'Start over with updated data.' },
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-xs text-white/25 font-mono w-16 flex-shrink-0 pt-0.5">{step.time}</span>
                      <span className="text-sm text-white/50">{step.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative lg:-mr-10 xl:-mr-16">
                <Image
                  src="/images/business-docs.png"
                  alt="Manual business document processing"
                  width={800}
                  height={533}
                  className="w-full h-auto rounded-xl lg:rounded-r-none opacity-60"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/40 to-transparent rounded-xl lg:rounded-r-none" />
              </div>
            </div>
          </motion.div>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20px" }}
            custom={5}
            variants={fade}
            className="text-center text-sm text-neutral-400 font-light mt-8 italic"
          >
            Sound familiar? This is what Grysics eliminates.
          </motion.p>
        </div>
      </section>

      <div className="section-divider" />

      <section className="py-20 sm:py-32 bg-neutral-950 text-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20px" }}
            custom={0}
            variants={fade}
            className="text-center mb-12 sm:mb-16"
          >
            <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-500 font-medium mb-4">The solution</p>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl tracking-tight mb-4">
              Grysics executes business
              <br className="hidden sm:block" />
              <span className="text-white/30"> operations for you</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-20px" }}
              custom={1}
              variants={fade}
            >
              <p className="text-base text-neutral-400 font-light mb-8">
                One goal in. Finished work out.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-sm font-semibold">1</span>
                  </div>
                  <p className="font-serif text-lg italic text-primary">You describe the outcome.</p>
                </div>
                <div className="w-px h-4 bg-white/10 ml-5" />
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                    <span className="text-white/50 text-sm font-semibold">2</span>
                  </div>
                  <p className="font-serif text-lg italic text-white/50">Grysics plans, executes, and delivers it.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-20px" }}
              custom={2}
              variants={fade}
              className="relative w-full rounded-2xl overflow-hidden bg-white/[0.02] border border-white/[0.08] p-6 sm:p-8"
            >
              <div className="flex flex-col items-center gap-5">
                <div className="grid grid-cols-3 gap-3 w-full">
                  {['Your Goal', 'ERP System', 'Excel / Data'].map((label) => (
                    <div key={label} className="flex flex-col items-center gap-2">
                      <div className="w-full py-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-center">
                        <span className="text-xs text-white/60 font-medium">{label}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-px h-6 bg-primary/30" />
                  <div className="w-px h-6 bg-primary/30" />
                  <div className="w-px h-6 bg-primary/30" />
                </div>

                <div className="w-full py-4 sm:py-5 rounded-xl bg-primary/[0.08] border border-primary/20 text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Image src="/images/grysics-logo.png" alt="Grysics" width={20} height={20} className="rounded" style={{ width: 20, height: 20 }} />
                    <span className="text-sm sm:text-base font-medium text-primary">Grysics</span>
                  </div>
                  <span className="text-xs text-white/50">AI Execution Engine</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-px h-6 bg-green-500/30" />
                  <div className="w-px h-6 bg-green-500/30" />
                  <div className="w-px h-6 bg-green-500/30" />
                </div>

                <div className="grid grid-cols-3 gap-3 w-full">
                  {['Reports', 'Notifications', 'Audit Trail'].map((label) => (
                    <div key={label} className="flex flex-col items-center gap-2">
                      <div className="w-full py-3 rounded-lg bg-green-500/[0.06] border border-green-500/15 text-center">
                        <span className="text-xs text-green-400/80 font-medium">{label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center gap-6 mt-6 pt-4 border-t border-white/[0.04]">
                {[
                  { label: 'Input', color: 'bg-white/20' },
                  { label: 'Processing', color: 'bg-primary' },
                  { label: 'Output', color: 'bg-green-500' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${item.color}`} />
                    <span className="text-xs text-white/40">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-32 bg-neutral-950">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20px" }}
            custom={0}
            variants={fade}
            className="text-center mb-12 sm:mb-16"
          >
            <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-500 font-medium mb-4">Transparent execution</p>
            <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-white mb-3">
              You stay in control.
              <span className="text-white/30"> Every step is visible.</span>
            </h2>
            <p className="text-sm text-neutral-500 max-w-sm mx-auto">
              See every step. No black boxes.
            </p>
          </motion.div>

          <LiveTerminal />
        </div>
      </section>

      <section className="py-20 sm:py-32">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20px" }}
            custom={0}
            variants={fade}
            className="text-center mb-12 sm:mb-16"
          >
            <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-400 font-medium mb-4">Use cases</p>
            <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-neutral-900">
              Built for business operations.
            </h2>
          </motion.div>

          <UseCaseRows />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20px" }}
            custom={0}
            variants={fade}
            className="mt-16 sm:mt-20 pt-12 sm:pt-16 border-t border-neutral-100"
          >
            <div className="text-center mb-10">
              <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-400 font-medium mb-4">Key benefits</p>
              <h2 className="font-serif text-2xl sm:text-4xl tracking-tight text-neutral-900">
                Why teams choose Grysics.
              </h2>
            </div>
            <div className="-mx-5 sm:-mx-8">
              <BenefitsSlider />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 sm:py-32 bg-neutral-950 text-white">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20px" }}
            custom={0}
            variants={fade}
            className="text-center mb-12"
          >
            <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-500 font-medium mb-4">Trust & control</p>
            <h2 className="font-serif text-3xl sm:text-5xl tracking-tight mb-4">
              Built for reliability
              <span className="text-white/30"> and control.</span>
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {[
              { icon: Eye, title: 'Full traceability', desc: 'Every action Grysics takes is logged with timestamps, inputs, and outputs.' },
              { icon: FileText, title: 'Recorded transformations', desc: 'All data changes are tracked and reversible. Nothing happens silently.' },
              { icon: Lock, title: 'Approval workflows', desc: 'Set human checkpoints at any stage. Grysics pauses and waits for sign-off.' },
              { icon: Shield, title: 'Enterprise-grade', desc: 'Built for regulated industries with SOC 2 and compliance-first architecture.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-20px" }}
                custom={i}
                variants={fade}
                className="group flex items-start gap-5 sm:gap-8 py-7 sm:py-8 border-b border-white/[0.06] last:border-b-0 first:pt-0"
              >
                <div className="flex-shrink-0 w-11 h-11 rounded-full border border-white/[0.08] flex items-center justify-center group-hover:border-primary/30 transition-colors duration-300">
                  <item.icon className="w-5 h-5 text-white/40 group-hover:text-primary transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="relative">
        <div className="h-24 sm:h-32 bg-gradient-to-b from-white to-neutral-950" />

        <div className="bg-neutral-950">
          <section className="pt-16 sm:pt-24 pb-20 sm:pb-28">
            <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-20px" }}
                custom={0}
                variants={fade}
              >
                <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white mb-4">
                  Give it a goal.
                  <br />
                  <span className="bg-gradient-to-r from-primary via-amber-400 to-primary bg-clip-text text-transparent">Get it done.</span>
                </h2>
                <p className="text-base text-white/40 font-light mb-10">
                  See Grysics in action.
                </p>
                <Link
                  href="/demo"
                  className="inline-flex items-center gap-2 px-10 py-4 bg-primary text-white text-sm font-medium rounded-full hover:bg-primary-dark transition-all duration-200 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
                >
                  Request a Demo <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </section>

          <section className="pb-16 sm:pb-20">
            <div className="max-w-5xl mx-auto px-5 sm:px-8">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-20px" }}
                custom={0}
                variants={fade}
                className="text-center"
              >
                <div className="w-12 h-px bg-white/[0.08] mx-auto mb-10" />
                <p className="text-[11px] uppercase tracking-[0.25em] text-white/25 font-medium mb-8">
                  Trusted by teams at leading companies
                </p>
                <div className="flex flex-wrap items-center justify-center gap-x-10 sm:gap-x-16 gap-y-6">
                  {[
                    { name: 'Meridian', style: 'font-serif font-bold text-xl' },
                    { name: 'AXON', style: 'font-mono font-bold text-lg tracking-[0.15em]' },
                    { name: 'Vaultbridge', style: 'font-serif font-medium text-xl italic' },
                    { name: 'NovaCrest', style: 'font-sans font-bold text-lg' },
                    { name: 'LEDGR', style: 'font-mono font-bold text-lg tracking-[0.2em]' },
                    { name: 'Finworth', style: 'font-serif font-bold text-xl' },
                  ].map((company) => (
                    <span
                      key={company.name}
                      className={`${company.style} text-white/15 select-none transition-colors duration-300 hover:text-white/35`}
                    >
                      {company.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      </div>
      </main>

      <Footer />
    </div>
    </MotionConfig>
  );
}
