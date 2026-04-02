'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState, FormEvent } from 'react';
import { ArrowRight, Check } from 'lucide-react';
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
    { type: 'info', text: '◼ Loading model... ResNet-50 (ONNX, 97.8MB)' },
    { type: 'info', text: '◼ Target: NVIDIA Jetson Orin Nano (8GB)' },
    { type: 'blank', text: '' },
    { type: 'header', text: '  VERIFICATION RESULTS' },
    { type: 'blank', text: '' },
    { type: 'pass', text: '  ✓ Accuracy retention     99.2%   (threshold: 95%)' },
    { type: 'pass', text: '  ✓ Inference latency      8.4ms   (threshold: 50ms)' },
    { type: 'pass', text: '  ✓ Memory footprint       412MB   (available: 8GB)' },
    { type: 'pass', text: '  ✓ Numerical stability    PASS    (no NaN detected)' },
    { type: 'warn', text: '  ⚠ INT8 quantization      97.1%   (minor accuracy loss)' },
    { type: 'pass', text: '  ✓ Throughput             119 fps  (target: 30 fps)' },
    { type: 'blank', text: '' },
    { type: 'result', text: '  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
    { type: 'result', text: '  5/6 passed · 1 warning · 0 failed' },
    { type: 'success', text: '  ✓ Model is ready for deployment' },
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
        <div className="p-5 sm:p-6 font-mono text-[12px] sm:text-[13px] leading-6 min-h-[340px]">
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

function EarlyAccessForm() {
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
          <p className="text-sm font-semibold text-green-900">You're on the list!</p>
          <p className="text-xs text-green-600">We'll notify you when Grysics launches.</p>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
      <input
        type="email"
        placeholder="you@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="flex-1 px-5 py-3.5 rounded-full text-sm focus:outline-none transition-all placeholder:text-white/40 border border-white/20 bg-white/10 text-white backdrop-blur-sm focus:ring-2 focus:ring-white/20 focus:border-white/40"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-7 py-3.5 rounded-full font-medium text-sm transition-all disabled:opacity-60 flex items-center justify-center gap-2 flex-shrink-0 bg-white text-neutral-900 hover:bg-white/90"
      >
        {loading ? (
          <div className="w-4 h-4 border-2 rounded-full animate-spin border-neutral-300 border-t-neutral-900" />
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

      <section className="relative pt-28 sm:pt-40 pb-16 sm:pb-24 px-4 sm:px-6 overflow-hidden">
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
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-col items-center gap-4 mb-6">
            <Image src="/images/grysics-logo.png" alt="Grysics" width={48} height={48} className="rounded-xl" priority />
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 text-white/70 rounded-full text-xs font-medium border border-white/20 backdrop-blur-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Now in limited beta
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl lg:text-7xl text-white tracking-tight leading-[1.05] mb-6"
          >
            Verify your AI
            <br />
            <span className="text-white/50">before it breaks</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg sm:text-xl text-white/70 leading-relaxed font-light mb-10 max-w-2xl mx-auto"
          >
            One command to test accuracy, latency, and memory across every target device. Catch failures before your users do.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-center"
          >
            <EarlyAccessForm />
            <p className="text-xs text-white/40 mt-3">Free during beta · No credit card required</p>
          </motion.div>

          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 mt-12">
            {[
              "Pre-deploy verification",
              "12ms average check",
              "50+ hardware targets",
              "PyTorch · TensorFlow · ONNX",
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

      <section className="py-10 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <TerminalDemo />
          </motion.div>
        </div>
      </section>

      <section id="features" className="py-24 sm:py-32 border-t border-neutral-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-neutral-900">
              Any model. Any device.
            </h2>
            <p className="text-neutral-500 mt-4 text-lg font-light max-w-2xl mx-auto">
              Vision, language, generative, audio. Grysics verifies it all on any hardware target.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { name: "Computer Vision", examples: "Object detection, segmentation" },
              { name: "NLP & LLMs", examples: "Text generation, translation" },
              { name: "Image Generation", examples: "Stable Diffusion, DALL-E" },
              { name: "Audio & Speech", examples: "Speech-to-text, voice cloning" },
              { name: "Video Analysis", examples: "Action recognition, tracking" },
              { name: "Robotics", examples: "Path planning, RL policies" },
              { name: "Medical AI", examples: "Diagnostics, medical imaging" },
              { name: "Autonomous Systems", examples: "Self-driving, drone nav" },
            ].map((app, idx) => (
              <motion.div
                key={app.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx}
                variants={fadeUp}
                className="rounded-2xl border border-neutral-100 hover:border-neutral-200 bg-white hover:shadow-lg hover:shadow-neutral-100/60 transition-all duration-300 p-5 sm:p-6"
              >
                <h3 className="text-sm font-semibold text-neutral-900 mb-1.5">{app.name}</h3>
                <p className="text-[11px] sm:text-xs text-neutral-400 leading-relaxed font-light">{app.examples}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32 border-t border-neutral-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
              <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-neutral-900 mb-6">
                Three lines to verify
              </h2>
              <p className="text-neutral-500 text-base sm:text-lg font-light leading-relaxed mb-8">
                Import, configure, verify. Grysics fits into your existing pipeline with a Python SDK, CLI, and CI/CD integrations.
              </p>
              <div className="flex flex-wrap gap-3">
                {['pip install grysics', 'GitHub Actions', 'Docker'].map((item) => (
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

      <section id="performance" className="py-24 sm:py-32 bg-neutral-50/80 border-y border-neutral-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-neutral-900">
              Built for speed
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
            {[
              { value: 10, suffix: 'x', label: 'Faster verification' },
              { value: 50, suffix: '+', label: 'Hardware targets' },
              { value: 99, suffix: '.9%', label: 'Deploy reliability' },
              { value: 3, suffix: 'min', label: 'Avg. verify time' },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx}
                variants={fadeUp}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-100 text-center"
              >
                <div className="font-serif text-3xl sm:text-4xl italic text-neutral-900 mb-2">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-xs text-neutral-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {[
              { label: "Verification Speed", grysics: "12ms", others: "180ms", grysicsWidth: "7%", othersWidth: "100%" },
              { label: "Accuracy Retention", grysics: "99.2%", others: "92%", grysicsWidth: "99%", othersWidth: "92%" },
              { label: "Memory Efficiency", grysics: "245MB", others: "512MB", grysicsWidth: "48%", othersWidth: "100%" },
              { label: "Success Rate", grysics: "99.9%", others: "87%", grysicsWidth: "99%", othersWidth: "87%" },
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

      <section id="how-it-works" className="py-24 sm:py-32 border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-20">
            <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-neutral-900">
              Model to production in minutes
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0">
            {[
              {
                step: "01",
                title: "Upload",
                description: "Drop in any AI model: PyTorch, TensorFlow, ONNX, TFLite. Grysics auto-detects architecture and dependencies.",
              },
              {
                step: "02",
                title: "Verify",
                description: "Grysics tests accuracy, latency, memory, and edge cases across your target devices. Detailed reports in minutes.",
              },
              {
                step: "03",
                title: "Ship",
                description: "Deploy only verified models. Continuous monitoring catches drift and regressions post-deploy automatically.",
              },
            ].map((item, idx) => (
              <motion.div
                key={item.step}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx}
                variants={fadeUp}
                className="relative px-8 py-10 sm:border-l first:border-l-0 border-neutral-200"
              >
                <span className="text-5xl sm:text-6xl font-serif italic text-neutral-100 block mb-4">{item.step}</span>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">{item.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed font-light">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32 bg-neutral-50/80 border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-neutral-900">
              What Grysics catches
            </h2>
            <p className="text-neutral-500 mt-4 text-base sm:text-lg font-light max-w-2xl mx-auto">
              Six categories of failures that silently break AI in production.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Accuracy Degradation", description: "Detects when quantization or hardware conversion silently drops model accuracy below your thresholds.", severity: "Critical" },
              { title: "Latency Violations", description: "Identifies operations that exceed real-time constraints on your target edge devices.", severity: "High" },
              { title: "Memory Overflows", description: "Catches models that exceed available RAM or VRAM on constrained hardware before deployment.", severity: "Critical" },
              { title: "Numerical Instability", description: "Finds floating-point precision issues and NaN propagation that cause silent failures.", severity: "High" },
              { title: "Framework Mismatches", description: "Validates that model exports preserve behavior across PyTorch, TF, and ONNX conversions.", severity: "Medium" },
              { title: "Performance Bottlenecks", description: "Pinpoints layers and operations that consume disproportionate compute or energy.", severity: "Medium" },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx}
                variants={fadeUp}
                className="group bg-white rounded-2xl p-7 border border-neutral-100 hover:border-neutral-200 hover:shadow-lg hover:shadow-neutral-100/60 transition-all duration-300"
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

      <section id="early-access" className="py-24 sm:py-36">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl tracking-tight text-neutral-900 mb-6">
              Stop shipping untested AI
            </h2>
            <p className="text-neutral-500 text-base sm:text-lg max-w-xl mx-auto mb-10 font-light leading-relaxed">
              Join the waitlist. Be the first to verify your AI before it reaches production.
            </p>
            <div className="flex justify-center mb-4">
              <EarlyAccessForm />
            </div>
            <p className="text-xs text-neutral-400">Join 500+ developers already on the waitlist</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
