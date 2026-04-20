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
      title: 'Reconciliation',
      items: ['Cross-system matching', 'Bank vs ERP vs payments', 'Discrepancy resolution'],
    },
    {
      title: 'Audit Readiness',
      items: ['SARS-ready audit trails', 'Traceable outputs', 'Evidence packs on demand'],
    },
    {
      title: 'Regulatory Reporting',
      items: ['POPIA-aware data handling', 'Statutory submissions', 'Recurring compliance reports'],
    },
    {
      title: 'Multi-branch Operations',
      items: ['Consolidated reporting', 'Cross-branch data aggregation', 'Resilient month-end close'],
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
    { title: 'Resilient execution', desc: 'Runs through load shedding and outages. Resumes automatically.', icon: '01' },
    { title: 'POPIA-aware', desc: 'Data handling that respects local privacy law from day one.', icon: '02' },
    { title: 'SARS-ready audit trail', desc: 'Every action logged and traceable for inspectors and auditors.', icon: '03' },
    { title: 'Works with your stack', desc: 'Connects to ERP, Excel, payment platforms, databases, and email.', icon: '04' },
    { title: 'Replaces manual reconciliation', desc: 'Days of cross-system matching, eliminated.', icon: '05' },
    { title: 'You stay in control', desc: 'Human approval checkpoints at any regulated step.', icon: '06' },
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
      <section className="relative min-h-[100svh] flex items-center justify-center px-4 sm:px-8 overflow-hidden">
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
            className="font-serif text-[1.75rem] leading-[1.1] sm:text-6xl lg:text-[5.5rem] text-white tracking-tight sm:leading-[1.05] mb-8 sm:mb-10"
          >
            Finance work,
            <br />
            <span className="bg-gradient-to-r from-primary via-amber-400 to-primary bg-clip-text text-transparent">done automatically.</span>
          </motion.h1>

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

      <section id="how-it-works" className="py-16 sm:py-32 bg-neutral-950 text-white">
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
              <span className="text-white/30"> Audit-ready result out.</span>
            </h2>
            <p className="text-sm text-neutral-500 max-w-sm mx-auto">
              You set the goal. Grysics plans, executes, and delivers it, fully traceable.
            </p>
          </motion.div>

          <WorkflowDemo />
        </div>
      </section>

      <section className="py-16 sm:py-32 overflow-hidden">
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
              Four pressures hitting
              <span className="text-neutral-300"> South African finance teams</span>
            </h2>
            <p className="text-base text-neutral-500 font-light max-w-xl mx-auto">
              Reconciliation, reporting, and audit work isn&apos;t just &ldquo;manual&rdquo;. It&apos;s manual under regulatory pressure, fragmented systems, and operational disruption.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-14">
            {[
              {
                stat: '01',
                unit: 'Regulatory pressure',
                title: 'SARS audits and POPIA exposure',
                desc: 'Constant compliance changes mean high risk of fines and a heavy audit burden every cycle.',
              },
              {
                stat: '02',
                unit: 'Fragmented systems',
                title: 'No single source of truth',
                desc: 'ERP, Excel, payment platforms, and email scattered across the business, leading to reconciliation errors and inconsistent reports.',
              },
              {
                stat: '03',
                unit: 'Operational disruption',
                title: 'Load shedding breaks workflows',
                desc: 'Outages and system downtime delay reporting and force teams to repeat work they had already completed.',
              },
              {
                stat: '04',
                unit: 'Skills shortage',
                title: 'Limited automation expertise',
                desc: 'Heavy reliance on manual processes drives slow execution and rising operational cost.',
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
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-4">
                  <span className="font-serif text-4xl sm:text-5xl text-neutral-900 tracking-tight">{item.stat}</span>
                  <span className="text-[11px] sm:text-xs uppercase tracking-[0.18em] text-primary font-medium">{item.unit}</span>
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
                <p className="text-xs uppercase tracking-[0.2em] text-red-400/70 font-medium mb-3">A typical month-end</p>
                <h3 className="font-serif text-2xl sm:text-3xl tracking-tight mb-4">
                  &quot;We need the recon before the SARS deadline.&quot;
                </h3>
                <div className="space-y-3">
                  {[
                    { time: '08:30', text: 'Finance lead requests month-end reconciliation' },
                    { time: '09:15', text: 'Analyst pulls data from ERP, Excel, and payments' },
                    { time: '11:00', text: 'Load shedding hits, work is lost mid-export' },
                    { time: '13:30', text: 'Discrepancies found between branches and bank' },
                    { time: '16:45', text: 'Report v3 sent for review. Audit trail incomplete.' },
                    { time: 'Next day', text: 'Restart. Re-verify. Re-format for SARS.' },
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
            Sound familiar? Grysics removes this entire process, even when the lights go out.
          </motion.p>
        </div>
      </section>

      <div className="section-divider" />

      <section className="py-16 sm:py-32 bg-neutral-950 text-white">
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
              Grysics completes the work,
              <br className="hidden sm:block" />
              <span className="text-white/30"> even under real-world conditions.</span>
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
                One goal in. Audit-ready work out.
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
                  <p className="font-serif text-lg italic text-white/50">Grysics pulls data, resolves issues, and delivers an audit-ready result.</p>
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

      <section className="py-16 sm:py-32 bg-neutral-950">
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
              Every step visible.
              <span className="text-white/30"> Every action audit-ready.</span>
            </h2>
            <p className="text-sm text-neutral-500 max-w-sm mx-auto">
              See exactly what Grysics did, and why. No black boxes for SARS, your auditor, or your CFO.
            </p>
          </motion.div>

          <LiveTerminal />
        </div>
      </section>

      <section className="py-16 sm:py-32">
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
              Built for finance and compliance teams.
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
                Why South African teams choose Grysics.
              </h2>
            </div>
            <div className="-mx-5 sm:-mx-8">
              <BenefitsSlider />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-32 bg-neutral-950 text-white">
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
              Resilient, compliant,
              <span className="text-white/30"> and audit-ready.</span>
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {[
              { icon: Eye, title: 'SARS-ready audit trail', desc: 'Every action logged with timestamps, inputs, and outputs, ready for inspectors and external audit.' },
              { icon: Lock, title: 'POPIA-aware data handling', desc: 'Strict permissions and clear control over what data is touched, shared, or stored.' },
              { icon: FileText, title: 'Resilient by design', desc: 'Pauses through load shedding and outages. Resumes automatically with no lost work.' },
              { icon: Shield, title: 'Human approval checkpoints', desc: 'Set sign-off gates at any regulated step. Explainable outputs, never silent.' },
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
                  Describe the work.
                  <br />
                  <span className="bg-gradient-to-r from-primary via-amber-400 to-primary bg-clip-text text-transparent">Receive the result.</span>
                </h2>
                <p className="text-base text-white/40 font-light mb-10">
                  See Grysics handle a real reconciliation, end to end.
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
