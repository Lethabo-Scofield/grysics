import type { Metadata } from 'next';
import DemoContent from './content';

export const metadata: Metadata = {
  title: 'Book a Demo',
  description: 'Request a personalized demo of Grysics. See live AI verification, failure detection, and custom setup for your chatbot, RAG system, or autonomous agent.',
  keywords: [
    'AI verification demo',
    'Grysics demo',
    'LLM testing demo',
    'chatbot verification',
    'RAG testing demo',
    'AI quality assurance demo',
    'AI deployment verification',
  ],
  openGraph: {
    title: 'Book a Demo - Grysics AI Verification',
    description: 'See Grysics in action. Get a walkthrough of how we catch failures in your AI before they reach users.',
    url: '/demo',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Book a Demo - Grysics AI Verification',
    description: 'See Grysics in action. Get a walkthrough of how we catch failures in your AI before they reach users.',
  },
  alternates: {
    canonical: '/demo',
  },
};

export default function DemoPage() {
  return <DemoContent />;
}
