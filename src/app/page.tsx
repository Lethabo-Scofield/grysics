'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState, FormEvent } from 'react';
import { ArrowRight, Check, ArrowDown } from 'lucide-react';
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

function TerminalDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [visibleLines, setVisibleLines] = useState(0);

  const lines = [
    { type: 'cmd', text: '$ grysics verify model.onnx --target jetson-orin' },
    { type: 'info', text: '\u25FC Loading model... ResNet-50 (ONNX, 97.8MB)' },
    { type: 'info', text: '\u25FC Target: NVIDIA Jetson Orin Nano (8GB)' },
    { type: 'blank', text: '' },
    { type: 'header', text: '  VERIFICATION RESULTS' },
    { type: 'blank', text: '' },
    { type: 'pass', text: '  \u2713 Accuracy retention     99.2%   (threshold: 95%)' },
    { type: 'pass', text: '  \u2713 Inference latency      8.4ms   (threshold: 50ms)' },
    { type: 'pass', text: '  \u2713 Memory footprint       412MB   (available: 8GB)' },
    { type: 'pass', text: '  \u2713 Numerical stability    PASS    (no NaN detected)' },
    { type: 'warn', text: '  \u26A0 INT8 quantization      97.1%   (minor accuracy loss)' },
    { type: 'pass', text: '  \u2713 Throughput             119 fps  (target: 30 fps)' },
    { type: 'blank', text: '' },
    { type: 'result', text: '  5/6 passed \u00B7 1 warning \u00B7 0 failed' },
    { type: 'success', text: '  \u2713 Model is ready for deployment' },
  ];

  useEffect(() => {
    if (!isInView) return;
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setVisibleLines(i);
      if (i >= lines.length) clearInterval(timer);
    }, 120);
    return () => clearInterval(timer);
  }, [isInView, lines.length]);

  return (
    <div ref={ref} className="relative">
      <div className="relative bg-[#0d1117] rounded-2xl border border-neutral-800 shadow-2xl overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-800 bg-neutral-900/80">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
          <div className="flex-1 flex items-center justify-center">
            <span className="text-[11px] text-neutral-500 font-mono">grysics / verification</span>
          </div>
        </div>
        <div className="p-4 sm:p-6 font-mono text-[10px] sm:text-[13px] leading-5 sm:leading-6 min-h-[260px] sm:min-h-[320px] overflow-x-auto">
          {lines.slice(0, visibleLines).map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              className={
                line.type === 'cmd' ? 'text-white font-semibold' :
                line.type === 'pass' ? 'text-green-400' :
                line.type === 'warn' ? 'text-amber-400' :
                line.type === 'header' ? 'text-neutral-300 font-bold tracking-wider text-[11px]' :
                line.type === 'success' ? 'text-green-400 font-bold' :
                line.type === 'result' ? 'text-neutral-500' :
                line.type === 'info' ? 'text-neutral-400' :
                'text-transparent select-none'
              }
            >
              {line.text || '\u00A0'}
            </motion.div>
          ))}
          {visibleLines < lines.length && isInView && (
            <span className="inline-block w-2 h-4 bg-white/60 animate-pulse ml-0.5" />
          )}
        </div>
      </div>
    </div>
  );
}

function CodePreview() {
  const [copied, setCopied] = useState(false);

  const code = `import grysics

report = grysics.verify(
    model="model.onnx",
    target="jetson-orin",
    checks=["accuracy", "latency", "memory"],
    thresholds={
        "accuracy": 0.95,
        "latency_ms": 50,
        "memory_mb": 2048
    }
)

if report.passed:
    grysics.deploy(report)`;

  return (
    <div className="relative bg-[#0d1117] rounded-2xl border border-neutral-800 overflow-hidden shadow-lg">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-neutral-800 bg-neutral-900/80">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded bg-yellow-500/60" />
          <span className="text-[11px] text-neutral-500 font-mono">verify.py</span>
        </div>
        <button
          onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          className="text-[11px] text-neutral-500 hover:text-neutral-300 transition-colors"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="p-5 sm:p-6 font-mono text-[12px] sm:text-[13px] leading-6 text-neutral-300 overflow-x-auto">
        <code>{code.split('\n').map((line, i) => {
          let highlighted = line;
          highlighted = highlighted.replace(/(import|from|if)/g, '<kw>$1</kw>');
          highlighted = highlighted.replace(/(".*?")/g, '<str>$1</str>');
          highlighted = highlighted.replace(/(\d+\.?\d*)/g, '<num>$1</num>');
          highlighted = highlighted.replace(/(grysics)/g, '<fn>$1</fn>');

          return (
            <div key={i} className="flex">
              <span className="w-8 text-right pr-4 text-neutral-700 select-none flex-shrink-0">{i + 1}</span>
              <span dangerouslySetInnerHTML={{
                __html: highlighted
                  .replace(/<kw>(.*?)<\/kw>/g, '<span class="text-purple-400">$1</span>')
                  .replace(/<str>(.*?)<\/str>/g, '<span class="text-green-400">$1</span>')
                  .replace(/<num>(.*?)<\/num>/g, '<span class="text-amber-400">$1</span>')
                  .replace(/<fn>(.*?)<\/fn>/g, '<span class="text-cyan-400">$1</span>')
              }} />
            </div>
          );
        })}</code>
      </pre>
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
            Grysics automatically verifies your AI models across every target device before deployment. Stop losing users to silent model failures.
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
                of AI applications experience accuracy degradation within <span className="text-white font-medium">30 days</span> of deployment.
              </p>
            </motion.div>

            <div className="sm:col-span-7 flex flex-col gap-6">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp} className="relative p-6 sm:p-8 rounded-3xl border border-white/10 bg-white/[0.03] flex items-center gap-6">
                <p className="font-serif text-4xl sm:text-5xl italic text-white/80 flex-shrink-0">4.2h</p>
                <div>
                  <p className="text-sm sm:text-base text-neutral-300 font-light">Average time to detect a silent model failure. That&apos;s 4 hours of broken AI your users experience.</p>
                </div>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} variants={fadeUp} className="relative p-6 sm:p-8 rounded-3xl border border-white/10 bg-white/[0.03] flex items-center gap-6">
                <p className="font-serif text-4xl sm:text-5xl italic text-white/80 flex-shrink-0">R31M</p>
                <div>
                  <p className="text-sm sm:text-base text-neutral-300 font-light">Average annual cost of AI downtime per company. Verification costs a fraction of what failures cost you.</p>
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
                One command.<br />Complete confidence.
              </h2>
              <p className="text-neutral-500 text-base sm:text-lg font-light leading-relaxed mb-8">
                Grysics runs your model through real-world verification on actual target hardware. Not simulations. Not approximations. Real devices.
              </p>
              <div className="flex flex-wrap gap-2">
                {['PyTorch', 'TensorFlow', 'ONNX', 'TFLite', 'Jetson', 'Mobile'].map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full text-xs bg-neutral-100 text-neutral-500 border border-neutral-200/60">{tag}</span>
                ))}
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} variants={fadeUp} className="lg:col-span-7">
              <TerminalDemo />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-28 border-b border-neutral-100">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-12 sm:mb-20">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium mb-3">Built for AI teams</p>
            <h2 className="font-serif text-2xl sm:text-5xl tracking-tight text-neutral-900 mb-4">
              Whether you&apos;re shipping or scaling
            </h2>
          </motion.div>

          <div className="space-y-0">
            {[
              {
                title: "Launching your first AI app",
                audience: "Startups & indie builders",
                description: "You\u2019ve built a model that works on your machine. But will it work on every device your users have? Grysics verifies it across 50+ hardware targets before they find out it doesn\u2019t.",
                align: "left" as const,
              },
              {
                title: "Running AI in production at scale",
                audience: "Growth & enterprise teams",
                description: "Your models serve thousands of daily requests. One undetected accuracy drift costs you users and revenue. Grysics catches latency spikes, memory issues, and silent degradation in real-time.",
                align: "right" as const,
              },
              {
                title: "Deploying to edge and IoT",
                audience: "Edge / embedded teams",
                description: "Jetson, mobile, IoT \u2014 every device is different. A model that runs on your A100 might crash on a Jetson Nano. Grysics tests on the actual hardware so you ship with confidence.",
                align: "left" as const,
              },
              {
                title: "Building AI-powered SaaS",
                audience: "SaaS founders & product teams",
                description: "Your SaaS product depends on AI quality. Grysics plugs into your CI/CD pipeline and blocks bad models from reaching production. Every deployment, automatically verified.",
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
              Every model type. Every device.
            </h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp} className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-16">
            {[
              "Computer Vision", "NLP & LLMs", "Image Generation", "Audio & Speech",
              "Video Analysis", "Recommendation", "Medical AI", "Autonomous Systems",
              "Robotics", "Time Series", "Anomaly Detection", "RAG Pipelines",
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
                { value: '50+', label: 'Hardware targets' },
                { value: '12ms', label: 'Avg verification' },
                { value: '99.9%', label: 'Deploy success' },
                { value: '6', label: 'Failure categories' },
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
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} variants={fadeUp} className="lg:col-span-7 order-2 lg:order-1">
              <CodePreview />
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="lg:col-span-5 order-1 lg:order-2">
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium mb-3">Developer-first</p>
              <h2 className="font-serif text-2xl sm:text-5xl tracking-tight text-neutral-900 mb-4 sm:mb-6">
                Three lines.<br />Full verification.
              </h2>
              <p className="text-neutral-500 text-base sm:text-lg font-light leading-relaxed mb-6">
                Drop Grysics into your existing workflow. Python SDK, CLI, or CI/CD &mdash; however your team ships, we fit right in.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  "Block bad models automatically in CI/CD",
                  "Detailed reports on exactly why a model fails",
                  "Custom thresholds per model and device",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-neutral-600">{item}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {['pip install grysics', 'GitHub Actions', 'Docker', 'GitLab CI'].map((item) => (
                  <span key={item} className="px-3 py-1.5 bg-neutral-100 text-neutral-600 rounded-lg text-xs font-mono border border-neutral-200/60">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-16 sm:py-28 border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-5 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-16 sm:mb-24">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium mb-3">How it works</p>
            <h2 className="font-serif text-2xl sm:text-5xl tracking-tight text-neutral-900">
              From model to production in minutes
            </h2>
          </motion.div>

          <div className="relative">
            <div className="hidden sm:block absolute left-1/2 top-0 bottom-0 w-px bg-neutral-200 -translate-x-1/2" />

            {[
              {
                step: "01",
                title: "Connect your model",
                description: "Point Grysics at any AI model \u2014 PyTorch, TensorFlow, ONNX, TFLite. We auto-detect architecture, layers, and dependencies. Zero config needed.",
                side: "left" as const,
              },
              {
                step: "02",
                title: "Verify on real hardware",
                description: "Grysics tests accuracy, latency, memory, and edge cases across your actual target devices. Not simulations \u2014 real verification with detailed, actionable reports.",
                side: "right" as const,
              },
              {
                step: "03",
                title: "Ship with confidence",
                description: "Only verified models reach production. Set up continuous monitoring to catch drift, regressions, and hardware-specific failures automatically post-deploy.",
                side: "left" as const,
              },
            ].map((item, idx) => (
              <motion.div
                key={item.step}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx}
                variants={fadeUp}
                className={`relative flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-16 last:mb-0 ${
                  item.side === 'right' ? 'sm:flex-row-reverse' : ''
                }`}
              >
                <div className={`sm:w-1/2 ${item.side === 'right' ? 'sm:text-right sm:pl-12' : 'sm:pr-12 sm:text-right'}`}>
                  <span className="font-serif text-5xl sm:text-7xl italic text-neutral-100 leading-none">{item.step}</span>
                </div>

                <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-neutral-900 items-center justify-center z-10">
                  <span className="text-white text-xs font-bold">{item.step}</span>
                </div>

                <div className={`sm:w-1/2 ${item.side === 'right' ? 'sm:pr-12 sm:text-left' : 'sm:pl-12'}`}>
                  <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-2">{item.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed font-light">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="performance" className="py-16 sm:py-28 bg-neutral-50/80 border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-5 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-12 sm:mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium mb-3">Performance</p>
            <h2 className="font-serif text-2xl sm:text-5xl tracking-tight text-neutral-900">
              Verification that doesn&apos;t slow you down
            </h2>
          </motion.div>

          <div className="space-y-4">
            {[
              { label: "Verification Speed", grysics: "12ms", others: "180ms", grysicsWidth: "7%", othersWidth: "100%" },
              { label: "Accuracy Retention", grysics: "99.2%", others: "92%", grysicsWidth: "99%", othersWidth: "92%" },
              { label: "Memory Efficiency", grysics: "245MB", others: "512MB", grysicsWidth: "48%", othersWidth: "100%" },
              { label: "Deployment Success", grysics: "99.9%", others: "87%", grysicsWidth: "99%", othersWidth: "87%" },
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
                  <p className="text-sm font-semibold text-neutral-900 sm:w-40 flex-shrink-0">{item.label}</p>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono text-neutral-500 w-12">Grysics</span>
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
                      <span className="text-[10px] font-mono text-neutral-400 w-12">Others</span>
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
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium mb-3">Protection</p>
            <h2 className="font-serif text-2xl sm:text-5xl tracking-tight text-neutral-900 mb-4">
              Six silent killers of AI apps
            </h2>
            <p className="text-neutral-500 text-base sm:text-lg font-light max-w-2xl">
              These issues don&apos;t throw errors. They silently degrade your product. Grysics catches all of them.
            </p>
          </motion.div>

          <div className="space-y-0">
            {[
              { num: "01", title: "Accuracy Degradation", detail: "Your model scored 98% in testing but drops to 91% on user devices. Quantization, conversion, and hardware differences silently erode accuracy.", severity: "Critical" },
              { num: "02", title: "Latency Spikes", detail: "A 200ms delay in your AI feature means users leave. Certain operations that pass on your GPU fail real-time constraints on edge devices.", severity: "High" },
              { num: "03", title: "Memory Overflows", detail: "Your model runs fine on your 80GB A100 but crashes on devices with 4GB RAM. Grysics verifies memory footprint on actual target hardware.", severity: "Critical" },
              { num: "04", title: "Silent NaN Failures", detail: "Floating-point precision issues cause your model to return garbage data with no error message. Users get wrong results, you get no alert.", severity: "High" },
              { num: "05", title: "Conversion Breakage", detail: "PyTorch to ONNX, TensorFlow to TFLite \u2014 every export can change model behavior. A test that passes in one format fails in another.", severity: "Medium" },
              { num: "06", title: "Performance Bottlenecks", detail: "One layer consumes 80% of compute. Without profiling on real hardware, you\u2019re optimising blind.", severity: "Medium" },
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
                  "Model works locally, crashes on user devices",
                  "Silent accuracy drops go unnoticed for weeks",
                  "Manual testing on 2\u20133 devices, hoping for the best",
                  "Users report bugs you can\u2019t reproduce",
                  "Deployment rollbacks at 2 AM",
                  "No confidence in model updates",
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
                  "Verified on 50+ real hardware targets before deploy",
                  "Accuracy drift detected and alerted in real-time",
                  "Automated verification across every target device",
                  "Detailed failure reports with exact root cause",
                  "Only verified models reach production",
                  "Ship model updates with complete confidence",
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
              Your users deserve AI
              <br className="hidden sm:block" />
              <span className="text-neutral-400"> that actually works</span>
            </h2>
            <p className="text-neutral-500 text-sm sm:text-lg max-w-xl mx-auto mb-8 sm:mb-10 font-light leading-relaxed">
              Join hundreds of AI teams across South Africa who refuse to ship unverified models. Get early access and start deploying with confidence.
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
