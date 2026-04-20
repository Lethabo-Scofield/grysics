import type { Metadata } from 'next';
import DemoContent from './content';

export const metadata: Metadata = {
  title: 'Book a Demo',
  description: 'Request a personalized demo of Grysics. See how it completes month-end reconciliation, regulatory reporting, and audit-ready outputs — even under load shedding.',
  keywords: [
    'Grysics demo',
    'finance automation demo South Africa',
    'POPIA-compliant automation',
    'SARS audit-ready reporting',
    'automated reconciliation demo',
    'compliance automation',
  ],
  openGraph: {
    title: 'Book a Demo - Grysics',
    description: 'See Grysics complete a real reconciliation end-to-end — POPIA-aware and audit-ready.',
    url: '/demo',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Book a Demo - Grysics',
    description: 'See Grysics complete a real reconciliation end-to-end — POPIA-aware and audit-ready.',
  },
  alternates: {
    canonical: '/demo',
  },
};

export default function DemoPage() {
  return <DemoContent />;
}
