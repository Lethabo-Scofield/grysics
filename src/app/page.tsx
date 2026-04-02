'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState, FormEvent } from 'react';
import { ArrowRight, Check, AlertTriangle, Shield, Zap, Clock, Server, Eye } from 'lucide-react';
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
    { type: 'result', text: '  \u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501' },
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
      <div className="relative bg-[#0d1117] rounded-2xl border border-neutral-200 shadow-2xl shadow-neutral-200/40 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-800 bg-neutral-900">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
          <div className="flex-1 flex items-center justify-center">
            <span className="text-[11px] text-neutral-500 font-mono">grysics / verification</span>
          </div>
        </div>
        <div className="p-4 sm:p-6 font-mono text-[10px] sm:text-[13px] leading-5 sm:leading-6 min-h-[280px] sm:min-h-[340px] overflow-x-auto">
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
                line.type === 'fail' ? 'text-red-400' :
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
    <div className="relative bg-[#0d1117] rounded-2xl border border-neutral-200 overflow-hidden shadow-lg shadow-neutral-200/30">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-neutral-800 bg-neutral-900">
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
        placeholder="you@company.com"
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
          <Image
            src="/images/bg.png"
            alt=""
            fill
            className="object-cover"
            priority
          />
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

          <div className="flex flex-wrap justify-center items-center gap-x-6 sm:gap-x-8 gap-y-2 mt-12 sm:mt-16 px-2">
            {[
              "Pre-deploy verification",
              "12ms average check",
              "50+ hardware targets",
              "PyTorch \u00B7 TensorFlow \u00B7 ONNX",
              "SOC 2 compliant",
            ].map((text, i) => (
              <motion.span
                key={text}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 + i * 0.05 }}
                className="text-[13px] text-white/40"
              >
                {text}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-neutral-950 text-white">
        <div className="max-w-5xl mx-auto px-5 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-10 sm:mb-16">
            <h2 className="font-serif text-2xl sm:text-4xl tracking-tight mb-4">
              The $200B problem nobody talks about
            </h2>
            <p className="text-neutral-400 text-base sm:text-lg font-light max-w-2xl mx-auto">
              AI models that pass every test in development fail silently in production. Your users notice before you do.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              { stat: "73%", label: "of AI apps experience accuracy degradation within 30 days of deployment", icon: AlertTriangle },
              { stat: "4.2h", label: "average time to detect a silent model failure in production AI applications", icon: Clock },
              { stat: "$1.7M", label: "average annual cost of AI downtime per company running production models", icon: Server },
            ].map((item, idx) => (
              <motion.div
                key={item.stat}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx}
                variants={fadeUp}
                className="relative p-6 sm:p-8 rounded-2xl border border-white/10 bg-white/[0.03]"
              >
                <item.icon className="w-5 h-5 text-red-400 mb-4" />
                <p className="font-serif text-3xl sm:text-4xl italic text-white mb-3">{item.stat}</p>
                <p className="text-sm text-neutral-400 leading-relaxed">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20 border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-5 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-10 sm:mb-14">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium mb-3">The solution</p>
            <h2 className="font-serif text-2xl sm:text-5xl tracking-tight text-neutral-900 mb-4">
              One command. Complete confidence.
            </h2>
            <p className="text-neutral-500 text-base sm:text-lg font-light max-w-2xl mx-auto">
              Grysics runs your model through real-world verification on actual target hardware, not simulations.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <TerminalDemo />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-28 border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-5 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-12 sm:mb-20">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium mb-3">Built for AI teams</p>
            <h2 className="font-serif text-2xl sm:text-5xl tracking-tight text-neutral-900 mb-4">
              Whether you&apos;re shipping or scaling
            </h2>
            <p className="text-neutral-500 text-base sm:text-lg font-light max-w-2xl mx-auto">
              Grysics works for every team building AI-powered products, from startups to enterprise.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Launching your first AI app",
                description: "You\u2019ve built a model that works locally. Grysics makes sure it works on every device your users have \u2014 before they find out it doesn\u2019t.",
                tag: "Startups",
                icon: Zap,
              },
              {
                title: "Running AI in production",
                description: "Your models serve thousands of requests. Grysics catches accuracy drift, latency spikes, and memory issues before they become outages.",
                tag: "Growth teams",
                icon: Eye,
              },
              {
                title: "Deploying to edge devices",
                description: "Jetson, mobile, IoT \u2014 every device is different. Grysics verifies your model on 50+ real hardware targets so you ship with confidence.",
                tag: "Edge / IoT",
                icon: Server,
              },
              {
                title: "Scaling AI across products",
                description: "Multiple models, multiple teams. Grysics gives you a single verification pipeline with automated gates that block bad deployments.",
                tag: "Enterprise",
                icon: Shield,
              },
              {
                title: "Converting models for deployment",
                description: "PyTorch to ONNX. TensorFlow to TFLite. Every conversion can silently break accuracy. Grysics catches what unit tests miss.",
                tag: "ML Engineers",
                icon: AlertTriangle,
              },
              {
                title: "Building AI-powered SaaS",
                description: "Your SaaS depends on AI quality. Grysics integrates into your CI/CD pipeline so no model reaches production without passing verification.",
                tag: "SaaS builders",
                icon: Clock,
              },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx}
                variants={fadeUp}
                className="group rounded-2xl border border-neutral-100 hover:border-neutral-200 bg-white hover:shadow-xl hover:shadow-neutral-100/60 transition-all duration-300 p-6 sm:p-7"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-center group-hover:bg-neutral-900 group-hover:border-neutral-900 transition-colors duration-300">
                    <item.icon className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-medium">{item.tag}</span>
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-neutral-900 mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-light">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="py-16 sm:py-28 border-b border-neutral-100 bg-neutral-50/50">
        <div className="max-w-5xl mx-auto px-5 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-12 sm:mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium mb-3">Comprehensive coverage</p>
            <h2 className="font-serif text-2xl sm:text-5xl tracking-tight text-neutral-900 mb-4">
              Every model type. Every device.
            </h2>
            <p className="text-neutral-500 text-base sm:text-lg font-light max-w-2xl mx-auto">
              No matter what your AI app does, Grysics verifies it works correctly on the hardware that matters.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { name: "Computer Vision", examples: "Object detection, segmentation, OCR" },
              { name: "NLP & LLMs", examples: "Text generation, RAG, chatbots" },
              { name: "Image Generation", examples: "Stable Diffusion, DALL-E, Midjourney" },
              { name: "Audio & Speech", examples: "STT, TTS, voice cloning" },
              { name: "Video Analysis", examples: "Action recognition, real-time tracking" },
              { name: "Recommendation", examples: "Content feeds, product ranking" },
              { name: "Medical AI", examples: "Diagnostics, imaging, drug discovery" },
              { name: "Autonomous Systems", examples: "Self-driving, drones, robotics" },
            ].map((app, idx) => (
              <motion.div
                key={app.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx}
                variants={fadeUp}
                className="rounded-2xl border border-neutral-200/60 hover:border-neutral-300 bg-white hover:shadow-lg hover:shadow-neutral-100/60 transition-all duration-300 p-5 sm:p-6"
              >
                <h3 className="text-sm font-semibold text-neutral-900 mb-1.5">{app.name}</h3>
                <p className="text-[11px] sm:text-xs text-neutral-400 leading-relaxed font-light">{app.examples}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-28 border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-5 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium mb-3">Developer-first</p>
              <h2 className="font-serif text-2xl sm:text-5xl tracking-tight text-neutral-900 mb-4 sm:mb-6">
                Three lines. Full verification.
              </h2>
              <p className="text-neutral-500 text-base sm:text-lg font-light leading-relaxed mb-6">
                Drop Grysics into your existing workflow. Works with your CI/CD pipeline, your framework, and your deployment targets.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  "Block bad models automatically in your CI/CD pipeline",
                  "Get detailed reports on why a model fails verification",
                  "Set custom thresholds per model and per device",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-neutral-600">{item}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                {['pip install grysics', 'GitHub Actions', 'Docker', 'GitLab CI'].map((item) => (
                  <span key={item} className="inline-flex items-center px-3 py-1.5 bg-neutral-100 text-neutral-600 rounded-lg text-xs font-mono border border-neutral-200/60">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} variants={fadeUp}>
              <CodePreview />
            </motion.div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-16 sm:py-28 border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-5 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-12 sm:mb-20">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium mb-3">How it works</p>
            <h2 className="font-serif text-2xl sm:text-5xl tracking-tight text-neutral-900">
              From model to production in minutes
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0">
            {[
              {
                step: "01",
                title: "Connect your model",
                description: "Point Grysics at any AI model \u2014 PyTorch, TensorFlow, ONNX, TFLite. We auto-detect architecture, layers, and dependencies. No config files needed.",
              },
              {
                step: "02",
                title: "Verify on real hardware",
                description: "Grysics tests accuracy, latency, memory, and edge cases across your target devices. Not simulations \u2014 actual hardware verification with detailed reports.",
              },
              {
                step: "03",
                title: "Ship with confidence",
                description: "Only verified models reach production. Set up continuous monitoring to catch drift, regressions, and hardware-specific failures automatically.",
              },
            ].map((item, idx) => (
              <motion.div
                key={item.step}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx}
                variants={fadeUp}
                className="relative px-6 sm:px-8 py-8 sm:py-10 border-b sm:border-b-0 sm:border-l first:border-l-0 last:border-b-0 border-neutral-200"
              >
                <span className="text-4xl sm:text-6xl font-serif italic text-neutral-100 block mb-3 sm:mb-4">{item.step}</span>
                <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-2 sm:mb-3">{item.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed font-light">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="performance" className="py-16 sm:py-28 bg-neutral-50/80 border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-5 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-10 sm:mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium mb-3">Performance</p>
            <h2 className="font-serif text-2xl sm:text-5xl tracking-tight text-neutral-900">
              Verification that doesn&apos;t slow you down
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-16">
            {[
              { value: 10, suffix: 'x', label: 'Faster than manual testing' },
              { value: 50, suffix: '+', label: 'Hardware targets' },
              { value: 99, suffix: '.9%', label: 'Deploy success rate' },
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
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
                className="bg-white rounded-xl p-5 border border-neutral-100"
              >
                <p className="text-xs font-medium text-neutral-500 mb-3">{item.label}</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-neutral-500 w-12">Grysics</span>
                    <div className="flex-1 h-6 bg-neutral-100 rounded-md overflow-hidden">
                      <motion.div
                        className="h-full bg-neutral-900 rounded-md flex items-center justify-end pr-2"
                        initial={{ width: 0 }}
                        whileInView={{ width: item.grysicsWidth }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: idx * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                      >
                        <span className="text-[10px] font-bold text-white">{item.grysics}</span>
                      </motion.div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-neutral-400 w-12">Others</span>
                    <div className="flex-1 h-6 bg-neutral-100 rounded-md overflow-hidden">
                      <motion.div
                        className="h-full bg-neutral-300 rounded-md flex items-center justify-end pr-2"
                        initial={{ width: 0 }}
                        whileInView={{ width: item.othersWidth }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: idx * 0.1 + 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                      >
                        <span className="text-[10px] font-bold text-neutral-600">{item.others}</span>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-28 border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-5 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-10 sm:mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium mb-3">Protection</p>
            <h2 className="font-serif text-2xl sm:text-5xl tracking-tight text-neutral-900 mb-4">
              Six failures that break AI apps
            </h2>
            <p className="text-neutral-500 mt-3 sm:mt-4 text-base sm:text-lg font-light max-w-2xl mx-auto">
              These issues silently degrade your AI app in production. Grysics catches all of them before your users do.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {[
              { title: "Accuracy Degradation", description: "Your model scored 98% in the lab but drops to 91% on user devices. Grysics catches accuracy loss from quantization, conversion, and hardware differences.", severity: "Critical" },
              { title: "Latency Spikes", description: "A 200ms delay in your AI feature means users leave. Grysics identifies operations that exceed real-time constraints on target hardware.", severity: "High" },
              { title: "Memory Overflows", description: "Your model runs fine on your GPU but crashes on user devices with less RAM. Grysics verifies memory footprint on actual target hardware.", severity: "Critical" },
              { title: "Silent NaN Failures", description: "Floating-point precision issues cause your model to return garbage data without any error. Grysics detects NaN propagation before deployment.", severity: "High" },
              { title: "Conversion Breakage", description: "PyTorch to ONNX, TensorFlow to TFLite \u2014 every export can silently change model behavior. Grysics validates output consistency across formats.", severity: "Medium" },
              { title: "Performance Bottlenecks", description: "One layer in your model consumes 80% of compute. Grysics pinpoints exactly where your model is slow so you can optimize what matters.", severity: "Medium" },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx}
                variants={fadeUp}
                className="group bg-white rounded-2xl p-6 sm:p-7 border border-neutral-100 hover:border-neutral-200 hover:shadow-lg hover:shadow-neutral-100/60 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-sm font-semibold text-neutral-900">{item.title}</h3>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full flex-shrink-0 ml-3 ${
                    item.severity === 'Critical' ? 'bg-red-50 text-red-600' :
                    item.severity === 'High' ? 'bg-amber-50 text-amber-600' :
                    'bg-blue-50 text-blue-600'
                  }`}>
                    {item.severity}
                  </span>
                </div>
                <p className="text-xs text-neutral-500 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-neutral-950 text-white">
        <div className="max-w-5xl mx-auto px-5 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-12 sm:mb-16">
            <h2 className="font-serif text-2xl sm:text-4xl tracking-tight mb-4">
              Without Grysics vs. With Grysics
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 sm:p-8">
              <p className="text-xs uppercase tracking-widest text-red-400 font-medium mb-6">Without Grysics</p>
              <ul className="space-y-4">
                {[
                  "Model works locally, crashes on user devices",
                  "Silent accuracy drops go unnoticed for weeks",
                  "Manual testing on 2-3 devices, hoping for the best",
                  "Users report bugs you can\u2019t reproduce",
                  "Deployment rollbacks at 2 AM",
                  "No confidence in model updates",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-red-400 mt-0.5 text-sm">\u2717</span>
                    <span className="text-sm text-neutral-300">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp} className="rounded-2xl border border-green-500/20 bg-green-500/5 p-6 sm:p-8">
              <p className="text-xs uppercase tracking-widest text-green-400 font-medium mb-6">With Grysics</p>
              <ul className="space-y-4">
                {[
                  "Verified on 50+ real hardware targets before deploy",
                  "Accuracy drift detected and alerted in real-time",
                  "Automated verification across every target device",
                  "Detailed failure reports with exact root cause",
                  "Only verified models reach production",
                  "Ship model updates with complete confidence",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-green-400 mt-0.5 text-sm">\u2713</span>
                    <span className="text-sm text-neutral-300">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="early-access" className="py-16 sm:py-36">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
            <h2 className="font-serif text-2xl sm:text-5xl lg:text-6xl tracking-tight text-neutral-900 mb-4 sm:mb-6">
              Your users deserve AI
              <br className="hidden sm:block" />
              <span className="text-neutral-400"> that actually works</span>
            </h2>
            <p className="text-neutral-500 text-sm sm:text-lg max-w-xl mx-auto mb-8 sm:mb-10 font-light leading-relaxed">
              Join hundreds of AI teams who refuse to ship unverified models. Get early access to Grysics and start deploying with confidence.
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
