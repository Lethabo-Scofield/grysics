'use client';

import { motion, MotionConfig } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { fade, WaitlistForm } from '@/components/shared';

export default function HomePage() {
  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <div className="grain" />
      <Header />

      <main>
      <section className="relative min-h-[100svh] flex items-center justify-center px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/bg.png" alt="" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm mb-6 sm:mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[11px] sm:text-xs text-white/60 font-medium">Now accepting early access</span>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fade}
            className="font-serif text-[1.65rem] leading-[1.15] sm:text-5xl lg:text-7xl text-white tracking-tight sm:leading-[1.1] mb-5 sm:mb-8"
          >
            Verify your AI
            <br />
            <span className="text-white/50">before it ships.</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fade}
            className="text-[15px] leading-relaxed sm:text-xl text-white/60 font-light mb-8 sm:mb-12 max-w-xl mx-auto px-2"
          >
            Catch failures in chatbots, agents, RAG systems,
            <br className="hidden sm:block" />
            and generative AI before your users do.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            custom={3}
            variants={fade}
            className="flex flex-col items-center px-2 sm:px-0"
          >
            <WaitlistForm />
            <p className="text-xs text-white/30 mt-3 sm:mt-4">Free during beta</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-12 sm:mt-24"
          >
            <a href="#overview" className="inline-flex flex-col items-center gap-2 text-white/30 hover:text-white/50 transition-colors py-3 px-4">
              <span className="text-[11px] uppercase tracking-widest">Learn more</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </a>
          </motion.div>
        </div>
      </section>

      <section id="overview" className="py-16 sm:py-32 bg-neutral-950 text-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fade}
            className="text-center mb-12 sm:mb-20"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-medium mb-3 sm:mb-4">What is Grysics</p>
            <h2 className="font-serif text-2xl sm:text-5xl tracking-tight mb-3 sm:mb-4">
              One verification layer
              <span className="text-white/40"> for every AI.</span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 font-light max-w-lg mx-auto">
              Grysics checks your AI for hallucinations, regressions, edge case failures, and latency issues — automatically, before deployment.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/5 rounded-xl sm:rounded-2xl overflow-hidden">
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
                custom={i + 1}
                variants={fade}
                className="bg-neutral-950 p-4 sm:p-8 text-center"
              >
                <p className="font-serif text-lg sm:text-2xl italic text-white mb-1">{stat.value}</p>
                <p className="text-[9px] sm:text-xs text-neutral-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={5}
            variants={fade}
            className="mt-8 sm:mt-12 text-center"
          >
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border border-white/15 text-sm text-white/70 hover:text-white hover:border-white/30 transition-all"
            >
              See how it works <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fade}
          >
            <div className="inline-flex items-center gap-2 mb-5 sm:mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium">Status</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl tracking-tight text-neutral-900 mb-2 sm:mb-3">In development</h2>
            <p className="text-sm text-neutral-500 font-light mb-6 sm:mb-8">Early access soon.</p>
            <div className="flex justify-center mb-8 sm:mb-10 px-2 sm:px-0">
              <WaitlistForm variant="light" />
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/how-it-works"
                className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors underline underline-offset-4 py-2"
              >
                How it works
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white text-sm font-medium rounded-full hover:bg-primary-dark transition-colors"
              >
                Book a Demo <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      </main>

      <Footer />
    </div>
    </MotionConfig>
  );
}
