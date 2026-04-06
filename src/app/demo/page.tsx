'use client';

import { motion, MotionConfig } from 'framer-motion';
import { Check } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { fade, DemoForm } from '@/components/shared';

export default function DemoPage() {
  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <div className="grain" />
      <Header />

      <main>
      <section className="pt-32 sm:pt-40 pb-20 sm:pb-32">
        <div className="max-w-4xl mx-auto px-5 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <motion.div
              initial="hidden"
              animate="visible"
              custom={0}
              variants={fade}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium mb-4">Book a demo</p>
              <h1 className="font-serif text-3xl sm:text-5xl tracking-tight text-neutral-900 mb-4">
                See Grysics in action.
              </h1>
              <p className="text-sm sm:text-base text-neutral-500 font-light leading-relaxed mb-8">
                Get a walkthrough of how Grysics catches failures in your AI before they reach users.
              </p>
              <div className="space-y-4">
                {[
                  'Live verification of your AI type',
                  'See real failure detection in action',
                  'Custom setup for your workflow',
                  'Q&A with our engineering team',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm text-neutral-600">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-neutral-100">
                <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium mb-3">Prefer email?</p>
                <a
                  href="mailto:scofield@olyxee.com?subject=Grysics%20Demo%20Request"
                  className="text-sm text-primary hover:text-primary-dark transition-colors"
                >
                  scofield@olyxee.com
                </a>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              custom={1}
              variants={fade}
              className="bg-neutral-50 rounded-2xl p-6 sm:p-8 border border-neutral-100"
            >
              <DemoForm />
            </motion.div>
          </div>
        </div>
      </section>
      </main>

      <Footer />
    </div>
    </MotionConfig>
  );
}
