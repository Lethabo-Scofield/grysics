'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState, FormEvent } from 'react';
import { ArrowRight, Check, ArrowDown, Shield, Target, BarChart3, AlertTriangle } from 'lucide-react';
import Image from 'next/image';
import Header from '@/components/header';
import Footer from '@/components/footer';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

function AnimatedCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let current = 0;
    const increment = Math.ceil(target / 40);
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { current = target; clearInterval(timer); }
      setValue(current);
    }, 30);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{prefix}{value.toLocaleString()}{suffix}</span>;
}

function VerificationFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const checks = [
    { label: 'Accuracy', value: '99.2%', status: 'pass', threshold: 'Above target' },
    { label: 'Response Time', value: 'Fast', status: 'pass', threshold: 'Under limit' },
    { label: 'Memory Usage', value: 'Low', status: 'pass', threshold: 'Within budget' },
    { label: 'Stability', value: 'Stable', status: 'pass', threshold: 'No errors' },
    { label: 'Optimisation', value: '97.1%', status: 'warn', threshold: 'Minor trade-off' },
    { label: 'Throughput', value: 'High', status: 'pass', threshold: 'Above target' },
  ];

  return (
    <div ref={ref} className="relative">
      <div className="rounded-3xl border border-neutral-200 bg-white shadow-xl shadow-neutral-200/30 overflow-hidden">
        <div className="px-6 sm:px-8 py-5 bg-neutral-50 border-b border-neutral-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-neutral-900">Verification Report</p>
            <p className="text-xs text-neutral-400 mt-0.5">Your AI model &middot; Customer device</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-200">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-xs font-medium text-green-700">Ready to deploy</span>
          </div>
        </div>

        <div className="p-5 sm:p-8">
          <div className="space-y-3">
            {checks.map((check, i) => (
              <motion.div
                key={check.label}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="flex items-center gap-4 py-3 border-b border-neutral-50 last:border-b-0"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  check.status === 'pass' ? 'bg-green-50' : 'bg-amber-50'
                }`}>
                  {check.status === 'pass' ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-900">{check.label}</p>
                  <p className="text-[11px] text-neutral-400">{check.threshold}</p>
                </div>
                <p className={`text-sm font-semibold flex-shrink-0 ${
                  check.status === 'pass' ? 'text-neutral-900' : 'text-amber-600'
                }`}>{check.value}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.8 }}
            className="mt-6 p-4 rounded-2xl bg-green-50/50 border border-green-100 text-center"
          >
            <p className="text-sm font-medium text-green-800">5 of 6 checks passed &middot; 1 warning &middot; 0 failures</p>
            <p className="text-xs text-green-600 mt-1">This model meets all requirements for production deployment</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function EarlyAccessForm({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-green-50 border border-green-200"
      >
        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-green-100">
          <Check className="w-4 h-4 text-green-600" />
        </div>
        <div>
          <p className="text-sm font-semibold text-green-900">You&apos;re on the list!</p>
          <p className="text-xs text-green-600">We&apos;ll notify you when Grysics launches.</p>
        </div>
      </motion.div>
    );
  }

  const isDark = variant === 'dark';

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
      <input
        type="email"
        placeholder="you@company.co.za"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        aria-label="Email address"
        className={`flex-1 px-5 py-3.5 rounded-full text-sm focus:outline-none transition-all ${
          isDark
            ? 'placeholder:text-white/40 border border-white/20 bg-white/10 text-white backdrop-blur-sm focus:ring-2 focus:ring-white/20 focus:border-white/40'
            : 'placeholder:text-neutral-400 border border-neutral-200 bg-white text-neutral-900 focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-400'
        }`}
      />
      <button
        type="submit"
        disabled={loading}
        className={`px-7 py-3.5 rounded-full font-medium text-sm transition-all disabled:opacity-60 flex items-center justify-center gap-2 flex-shrink-0 ${
          isDark
            ? 'bg-white text-neutral-900 hover:bg-white/90'
            : 'bg-neutral-900 text-white hover:bg-black'
        }`}
      >
        {loading ? (
          <div className={`w-4 h-4 border-2 rounded-full animate-spin ${
            isDark ? 'border-neutral-300 border-t-neutral-900' : 'border-white/30 border-t-white'
          }`} />
        ) : (
          <>Get Early Access <ArrowRight className="w-4 h-4" /></>
        )}
      </button>
    </form>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <div className="grain" />
      <Header />

      <section className="relative min-h-[100svh] flex items-center justify-center px-5 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/bg.png" alt="" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-white/60 font-medium">Now accepting early access applications</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl lg:text-7xl text-white tracking-tight leading-[1.1] mb-6 sm:mb-8"
          >
            Your AI works in the lab.
            <br />
            <span className="text-white/50">Will it work in production?</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-xl text-white/70 leading-relaxed font-light mb-10 sm:mb-12 max-w-2xl mx-auto px-2"
          >
            Grysics automatically checks that your AI works correctly on every device before you ship it. No surprises. No angry users. No 2 AM rollbacks.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-center"
          >
            <EarlyAccessForm />
            <p className="text-xs text-white/40 mt-4">Free during beta &middot; No credit card required</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-16 sm:mt-24"
          >
            <a href="#problem" className="inline-flex flex-col items-center gap-2 text-white/30 hover:text-white/50 transition-colors">
              <span className="text-[11px] uppercase tracking-widest">See why it matters</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </a>
          </motion.div>
        </div>
      </section>

      <section id="problem" className="py-16 sm:py-28 bg-neutral-950 text-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="max-w-3xl mb-16 sm:mb-24">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-medium mb-4">The problem</p>
            <h2 className="font-serif text-2xl sm:text-5xl tracking-tight leading-tight mb-6">
              AI that passes every test in your lab
              <span className="text-neutral-500"> fails silently in production.</span>
            </h2>
            <p className="text-neutral-400 text-base sm:text-lg font-light leading-relaxed">
              Your users notice before you do. By the time you find out, the damage is done &mdash; lost revenue, broken trust, and expensive rollbacks.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="sm:col-span-5 relative p-8 sm:p-10 rounded-3xl border border-white/10 bg-gradient-to-br from-red-500/10 to-transparent">
              <p className="font-serif text-6xl sm:text-8xl italic text-white/90 mb-2">73%</p>
              <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
                of AI applications experience accuracy problems within <span className="text-white font-medium">30 days</span> of going live.
              </p>
            </motion.div>

            <div className="sm:col-span-7 flex flex-col gap-6">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp} className="relative p-6 sm:p-8 rounded-3xl border border-white/10 bg-white/[0.03] flex items-center gap-6">
                <p className="font-serif text-4xl sm:text-5xl italic text-white/80 flex-shrink-0">4.2h</p>
                <div>
                  <p className="text-sm sm:text-base text-neutral-300 font-light">Average time to discover something is wrong. That&apos;s 4 hours of broken AI your customers experience.</p>
                </div>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} variants={fadeUp} className="relative p-6 sm:p-8 rounded-3xl border border-white/10 bg-white/[0.03] flex items-center gap-6">
                <p className="font-serif text-4xl sm:text-5xl italic text-white/80 flex-shrink-0">R31M</p>
                <div>
                  <p className="text-sm sm:text-base text-neutral-300 font-light">Average annual cost of AI downtime per company. Prevention costs a fraction of what failures cost you.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-28 border-b border-neutral-100">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="lg:col-span-5 lg:sticky lg:top-28">
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium mb-3">The solution</p>
              <h2 className="font-serif text-2xl sm:text-5xl tracking-tight text-neutral-900 mb-4 sm:mb-6">
                Know your AI is ready<br />before you ship it.
              </h2>
              <p className="text-neutral-500 text-base sm:text-lg font-light leading-relaxed mb-8">
                Grysics checks your AI model against real-world conditions and gives you a clear pass-or-fail report. If something would break for your users, you&apos;ll know before they do.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Shield, text: "Checks accuracy, speed, and reliability automatically" },
                  { icon: Target, text: "Tests on 50+ real devices your customers actually use" },
                  { icon: BarChart3, text: "Clear reports anyone on the team can understand" },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <item.icon className="w-4 h-4 text-neutral-500" />
                    </div>
                    <span className="text-sm text-neutral-600 leading-relaxed">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} variants={fadeUp} className="lg:col-span-7">
              <VerificationFlow />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-28 border-b border-neutral-100">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-12 sm:mb-20">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium mb-3">Who it&apos;s for</p>
            <h2 className="font-serif text-2xl sm:text-5xl tracking-tight text-neutral-900 mb-4">
              Whether you&apos;re shipping or scaling
            </h2>
          </motion.div>

          <div className="space-y-0">
            {[
              {
                title: "Launching your first AI product",
                audience: "Startups & founders",
                description: "You\u2019ve invested months building your AI. Don\u2019t let it fail on the devices your customers actually use. Grysics gives you confidence it works everywhere before you launch.",
                align: "left" as const,
              },
              {
                title: "Managing AI in production",
                audience: "Product & project managers",
                description: "Your team ships AI updates regularly. How do you know each release is as good as the last? Grysics automatically flags quality drops so you never ship a downgrade.",
                align: "right" as const,
              },
              {
                title: "Scaling across devices and markets",
                audience: "Growth & enterprise teams",
                description: "Different devices, different regions, different conditions. A model that works on high-end hardware might fail on the devices most of your users actually have.",
                align: "left" as const,
              },
              {
                title: "Building AI-powered products",
                audience: "SaaS & product companies",
                description: "Your product\u2019s reputation depends on AI quality. Grysics runs automated checks on every update and blocks anything that doesn\u2019t meet your standards from reaching customers.",
                align: "right" as const,
              },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx}
                variants={fadeUp}
                className={`flex flex-col ${item.align === 'right' ? 'sm:items-end sm:text-right' : 'sm:items-start sm:text-left'} py-10 sm:py-14 border-b last:border-b-0 border-neutral-100`}
              >
                <div className={`max-w-xl ${item.align === 'right' ? 'sm:pl-8' : 'sm:pr-8'}`}>
                  <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-medium">{item.audience}</span>
                  <h3 className="font-serif text-xl sm:text-3xl text-neutral-900 mt-2 mb-3 tracking-tight">{item.title}</h3>
                  <p className="text-neutral-500 text-sm sm:text-base leading-relaxed font-light">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="py-16 sm:py-28 bg-neutral-950 text-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-12 sm:mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-medium mb-3">Comprehensive coverage</p>
            <h2 className="font-serif text-2xl sm:text-5xl tracking-tight">
              Works with any type of AI
            </h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp} className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-16">
            {[
              "Computer Vision", "Language AI & Chatbots", "Image Generation", "Voice & Audio",
              "Video Analysis", "Recommendations", "Medical AI", "Self-driving & Drones",
              "Robotics", "Forecasting", "Fraud Detection", "Search & Retrieval",
            ].map((tag, i) => (
              <span
                key={tag}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium border transition-all duration-300 ${
                  i < 4
                    ? 'border-white/20 bg-white/10 text-white'
                    : i < 8
                    ? 'border-white/10 bg-white/[0.04] text-neutral-300'
                    : 'border-white/5 bg-transparent text-neutral-500'
                }`}
              >
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} variants={fadeUp}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden">
              {[
                { value: '50+', label: 'Devices tested' },
                { value: '< 3min', label: 'Full check' },
                { value: '99.9%', label: 'Deployment success' },
                { value: '6', label: 'Quality checks' },
              ].map((stat) => (
                <div key={stat.label} className="bg-neutral-950 p-6 sm:p-8 text-center">
                  <p className="font-serif text-2xl sm:text-3xl italic text-white mb-1">{stat.value}</p>
                  <p className="text-[10px] sm:text-xs text-neutral-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-28 border-b border-neutral-100">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="lg:col-span-6">
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium mb-3">Easy integration</p>
              <h2 className="font-serif text-2xl sm:text-5xl tracking-tight text-neutral-900 mb-4 sm:mb-6">
                Set it up once.<br />It runs automatically.
              </h2>
              <p className="text-neutral-500 text-base sm:text-lg font-light leading-relaxed mb-8">
                Your team connects Grysics to your AI workflow. From then on, every model update is automatically checked before it goes live. No manual work needed.
              </p>
              <div className="space-y-4">
                {[
                  "Works with all major AI frameworks and tools",
                  "Connects to your existing deployment process",
                  "Automatically blocks updates that don\u2019t pass",
                  "Sends alerts when something needs attention",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-neutral-600">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp} className="lg:col-span-6">
              <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6 sm:p-10">
                <div className="space-y-6">
                  {[
                    { step: "1", title: "Connect", desc: "Link Grysics to your AI project. Takes under 5 minutes.", active: true },
                    { step: "2", title: "Set standards", desc: "Define what \u201Cgood enough\u201D means for your product \u2014 accuracy, speed, reliability.", active: true },
                    { step: "3", title: "Automatic checks", desc: "Every time your AI is updated, Grysics runs a full check across all target devices.", active: true },
                    { step: "4", title: "Clear results", desc: "Get a pass/fail report. If something fails, you\u2019ll know exactly what and why.", active: false },
                  ].map((item, i) => (
                    <motion.div
                      key={item.step}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15, duration: 0.4 }}
                      className="flex gap-4 items-start"
                    >
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 text-sm font-bold ${
                        item.active ? 'bg-neutral-900 text-white' : 'bg-neutral-200 text-neutral-500'
                      }`}>
                        {item.step}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-neutral-900">{item.title}</p>
                        <p className="text-sm text-neutral-500 font-light mt-0.5">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-16 sm:py-28 bg-neutral-50/80 border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-5 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-12 sm:mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium mb-3">Performance</p>
            <h2 className="font-serif text-2xl sm:text-5xl tracking-tight text-neutral-900">
              Fast enough that it never slows your team down
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-16">
            {[
              { value: 10, suffix: 'x', label: 'Faster than manual testing' },
              { value: 50, suffix: '+', label: 'Devices checked' },
              { value: 99, suffix: '.9%', label: 'Deployment success' },
              { value: 3, suffix: 'min', label: 'Full verification' },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx}
                variants={fadeUp}
                className="bg-white rounded-2xl p-5 sm:p-8 border border-neutral-100 text-center"
              >
                <div className="font-serif text-2xl sm:text-4xl italic text-neutral-900 mb-1 sm:mb-2">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-[10px] sm:text-xs text-neutral-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="space-y-4">
            {[
              { label: "Checking Speed", grysics: "Under 3 min", others: "30+ min", grysicsWidth: "10%", othersWidth: "100%" },
              { label: "Accuracy Assurance", grysics: "99.2%", others: "92%", grysicsWidth: "99%", othersWidth: "92%" },
              { label: "Devices Covered", grysics: "50+", others: "2\u20133", grysicsWidth: "95%", othersWidth: "6%" },
              { label: "Successful Releases", grysics: "99.9%", others: "87%", grysicsWidth: "99%", othersWidth: "87%" },
            ].map((item, idx) => (
              <motion.div
                key={item.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx}
                variants={fadeUp}
                className="bg-white rounded-xl p-5 sm:p-6 border border-neutral-100"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <p className="text-sm font-semibold text-neutral-900 sm:w-44 flex-shrink-0">{item.label}</p>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-medium text-neutral-500 w-14">Grysics</span>
                      <div className="flex-1 h-7 bg-neutral-100 rounded-md overflow-hidden">
                        <motion.div
                          className="h-full bg-neutral-900 rounded-md flex items-center justify-end pr-3"
                          initial={{ width: 0 }}
                          whileInView={{ width: item.grysicsWidth }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: idx * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                        >
                          <span className="text-[11px] font-bold text-white">{item.grysics}</span>
                        </motion.div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-medium text-neutral-400 w-14">Manual</span>
                      <div className="flex-1 h-7 bg-neutral-100 rounded-md overflow-hidden">
                        <motion.div
                          className="h-full bg-neutral-300 rounded-md flex items-center justify-end pr-3"
                          initial={{ width: 0 }}
                          whileInView={{ width: item.othersWidth }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: idx * 0.1 + 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                        >
                          <span className="text-[11px] font-bold text-neutral-600">{item.others}</span>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-28 border-b border-neutral-100">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="max-w-3xl mb-12 sm:mb-20">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium mb-3">What we catch</p>
            <h2 className="font-serif text-2xl sm:text-5xl tracking-tight text-neutral-900 mb-4">
              Six things that silently break AI products
            </h2>
            <p className="text-neutral-500 text-base sm:text-lg font-light max-w-2xl">
              These issues don&apos;t show error messages. They quietly make your AI worse, and your users leave without telling you why.
            </p>
          </motion.div>

          <div className="space-y-0">
            {[
              { num: "01", title: "Accuracy drops", detail: "Your AI gets less accurate after deployment. Users get wrong answers, bad recommendations, or missed detections \u2014 and you don\u2019t know until they complain.", severity: "Critical" },
              { num: "02", title: "Slow responses", detail: "Your AI takes too long to respond on certain devices. Users wait, get frustrated, and leave. A few hundred milliseconds can make or break the experience.", severity: "High" },
              { num: "03", title: "Device crashes", detail: "Your AI works on powerful hardware but crashes on the phones and devices your customers actually use. Grysics tests on real devices before you ship.", severity: "Critical" },
              { num: "04", title: "Wrong outputs", detail: "Subtle calculation errors cause your AI to return incorrect results with no error message. Everything looks fine on the surface, but the answers are wrong.", severity: "High" },
              { num: "05", title: "Format problems", detail: "When your AI model is converted for different devices, its behaviour can change. What worked perfectly in one format might give different results in another.", severity: "Medium" },
              { num: "06", title: "Hidden bottlenecks", detail: "Parts of your AI are much slower than others, dragging down the whole experience. Without testing on real devices, you\u2019re optimising blind.", severity: "Medium" },
            ].map((item, idx) => (
              <motion.div
                key={item.num}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx}
                variants={fadeUp}
                className="group flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8 py-8 border-b border-neutral-100 last:border-b-0 hover:bg-neutral-50/50 transition-colors -mx-5 px-5 sm:-mx-6 sm:px-6 rounded-xl"
              >
                <span className="font-serif text-3xl sm:text-4xl italic text-neutral-200 group-hover:text-neutral-900 transition-colors sm:w-20 flex-shrink-0">{item.num}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-base sm:text-lg font-semibold text-neutral-900">{item.title}</h3>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                      item.severity === 'Critical' ? 'bg-red-50 text-red-600' :
                      item.severity === 'High' ? 'bg-amber-50 text-amber-600' :
                      'bg-blue-50 text-blue-600'
                    }`}>
                      {item.severity}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-500 leading-relaxed font-light">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-28 bg-neutral-950 text-white">
        <div className="max-w-5xl mx-auto px-5 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-12 sm:mb-16">
            <h2 className="font-serif text-2xl sm:text-4xl tracking-tight mb-4">
              The difference is night and day
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-white/10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="p-6 sm:p-10 bg-red-500/[0.06] border-b sm:border-b-0 sm:border-r border-white/10">
              <p className="text-xs uppercase tracking-widest text-red-400/80 font-medium mb-8">Without Grysics</p>
              <ul className="space-y-5">
                {[
                  "AI works in testing, fails on customer devices",
                  "Quality drops go unnoticed for weeks",
                  "Manual testing on a few devices, hoping for the best",
                  "Customers report problems you can\u2019t explain",
                  "Emergency fixes at 2 AM",
                  "No way to know if updates make things worse",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-red-400/60 mt-0.5 text-sm flex-shrink-0">\u2717</span>
                    <span className="text-sm text-neutral-400 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp} className="p-6 sm:p-10 bg-green-500/[0.06]">
              <p className="text-xs uppercase tracking-widest text-green-400/80 font-medium mb-8">With Grysics</p>
              <ul className="space-y-5">
                {[
                  "Tested on 50+ real devices before every release",
                  "Quality issues detected and flagged instantly",
                  "Automated checks across every target device",
                  "Clear reports showing exactly what went wrong",
                  "Bad updates blocked before they reach customers",
                  "Ship every update with complete confidence",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-green-400/80 mt-0.5 text-sm flex-shrink-0">\u2713</span>
                    <span className="text-sm text-neutral-300 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="early-access" className="py-20 sm:py-40">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
            <h2 className="font-serif text-2xl sm:text-5xl lg:text-6xl tracking-tight text-neutral-900 mb-4 sm:mb-6">
              Your customers deserve AI
              <br className="hidden sm:block" />
              <span className="text-neutral-400"> that actually works</span>
            </h2>
            <p className="text-neutral-500 text-sm sm:text-lg max-w-xl mx-auto mb-8 sm:mb-10 font-light leading-relaxed">
              Join hundreds of AI teams across South Africa who refuse to ship untested AI. Get early access and start deploying with confidence.
            </p>
            <div className="flex justify-center mb-4">
              <EarlyAccessForm variant="light" />
            </div>
            <p className="text-xs text-neutral-400">Free during beta &middot; Set up in under 5 minutes &middot; No credit card required</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
