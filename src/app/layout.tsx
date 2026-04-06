import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ffffff",
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://grysics.com"),
  title: {
    default: "Grysics - Verify your AI before it ships",
    template: "%s | Grysics",
  },
  description:
    "Grysics catches failures in chatbots, agents, RAG systems, and generative AI before your users do. Automated verification for every type of AI.",
  keywords: [
    "AI verification",
    "chatbot testing",
    "RAG verification",
    "AI agents",
    "generative AI testing",
    "LLM testing",
    "AI deployment",
    "model validation",
    "conversational AI",
    "AI quality assurance",
    "hallucination detection",
    "AI benchmarking",
  ],
  authors: [{ name: "Grysics", url: "https://grysics.com" }],
  creator: "Grysics",
  publisher: "Olyxee",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Grysics",
    title: "Grysics - Verify your AI before it ships",
    description:
      "Catch failures in chatbots, agents, RAG systems, and generative AI before your users do.",
    images: [
      {
        url: "/images/grysics-logo.png",
        width: 512,
        height: 512,
        alt: "Grysics - AI Verification Engine",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Grysics - Verify your AI before it ships",
    description:
      "Catch failures in chatbots, agents, RAG systems, and generative AI before your users do.",
    images: ["/images/grysics-logo.png"],
  },
  alternates: {
    canonical: "https://grysics.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Grysics",
  applicationCategory: "DeveloperApplication",
  description:
    "AI verification engine that catches failures in chatbots, RAG systems, autonomous agents, and generative AI before deployment.",
  url: "https://grysics.com",
  creator: {
    "@type": "Organization",
    name: "Olyxee",
    url: "https://olyxee.com",
    email: "scofield@olyxee.com",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free during beta",
  },
  operatingSystem: "Web",
  featureList: [
    "Hallucination detection",
    "Latency profiling",
    "Edge case testing",
    "Regression detection",
    "Multi-LLM support",
    "Automated verification pipeline",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
