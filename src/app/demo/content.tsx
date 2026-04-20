'use client';

import { motion, MotionConfig } from 'framer-motion';
import { Check } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { fade } from '@/components/fade';
import { DemoForm } from '@/components/shared';

export default function DemoContent() {
  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <div className="grain" />
      <Header />

      <main>
      <section className="pt-28 sm:pt-40 pb-16 sm:pb-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <motion.div
              initial="hidden"
              animate="visible"
              custom={0}
              variants={fade}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium mb-3 sm:mb-4">Book a demo</p>
              <h1 className="font-serif text-2xl sm:text-5xl tracking-tight text-neutral-900 mb-3 sm:mb-4">
                See Grysics execute.
              </h1>
              <p className="text-sm sm:text-base text-neutral-500 font-light leading-relaxed mb-6 sm:mb-8">
                Watch Grysics complete a real reconciliation end-to-end. From goal to audit-ready output, in minutes.
              </p>
              <div className="space-y-3 sm:space-y-4">
                {[
                  'Live month-end reconciliation across your systems',
                  'POPIA-aware data handling and SARS-ready audit trail',
                  'Tailored to your finance and compliance workflows',
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

              <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-neutral-100">
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
              className="bg-neutral-50 rounded-xl sm:rounded-2xl p-5 sm:p-8 border border-neutral-100"
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
