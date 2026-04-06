import type { Metadata } from 'next';
import HowItWorksContent from './content';

export const metadata: Metadata = {
  title: 'How It Works',
  description: 'Learn how Grysics verifies AI outputs across LLMs like GPT-4o, Claude, Gemini, Llama, and more. See architecture diagrams, benchmarks, and live verification demos.',
  keywords: [
    'AI verification process',
    'LLM testing workflow',
    'AI benchmarking',
    'hallucination detection',
    'GPT-4 verification',
    'Claude testing',
    'Llama verification',
    'RAG system testing',
    'AI quality assurance',
    'model validation pipeline',
  ],
  openGraph: {
    title: 'How It Works - Grysics AI Verification Engine',
    description: 'One verification layer between build and deploy. See how Grysics catches AI failures before your users do.',
    url: '/how-it-works',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'How It Works - Grysics AI Verification Engine',
    description: 'One verification layer between build and deploy. See how Grysics catches AI failures before your users do.',
  },
  alternates: {
    canonical: '/how-it-works',
  },
};

export default function HowItWorksPage() {
  return <HowItWorksContent />;
}
