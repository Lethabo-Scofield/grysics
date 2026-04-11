import type { Metadata } from 'next';
import DemoContent from './content';

export const metadata: Metadata = {
  title: 'Book a Demo',
  description: 'Request a personalized demo of Grysics. See how AI execution completes real business operations like financial reconciliation, lead processing, and enterprise reporting.',
  keywords: [
    'AI execution demo',
    'Grysics demo',
    'business automation demo',
    'financial reconciliation',
    'sales lead processing',
    'enterprise reporting',
  ],
  openGraph: {
    title: 'Book a Demo - Grysics AI Execution System',
    description: 'See Grysics in action. Watch AI complete real business tasks end-to-end.',
    url: '/demo',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Book a Demo - Grysics AI Execution System',
    description: 'See Grysics in action. Watch AI complete real business tasks end-to-end.',
  },
  alternates: {
    canonical: '/demo',
  },
};

export default function DemoPage() {
  return <DemoContent />;
}
