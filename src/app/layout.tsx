import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
  ],
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://grysics.com"),
  title: {
    default: "Grysics - Automated Finance & Compliance Execution",
    template: "%s | Grysics",
  },
  description:
    "Grysics completes finance and compliance work automatically, even under load shedding, audits, and disrupted systems. POPIA-aware, SARS audit-ready.",
  keywords: [
    "finance automation South Africa",
    "POPIA compliance",
    "SARS audit",
    "automated reconciliation",
    "load shedding resilient",
    "compliance automation",
    "audit-ready reporting",
    "month-end close automation",
    "regulatory reporting South Africa",
    "AI execution system",
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
    locale: "en_ZA",
    siteName: "Grysics",
    title: "Grysics - Automated Finance & Compliance Execution",
    description:
      "Finance and compliance work, completed automatically. Resilient under load shedding, POPIA-aware, SARS audit-ready.",
    images: [
      {
        url: "/images/grysics-logo.png",
        width: 512,
        height: 512,
        alt: "Grysics - AI Execution System",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Grysics - Automated Finance & Compliance Execution",
    description:
      "Finance and compliance work, completed automatically. Resilient under load shedding, POPIA-aware, SARS audit-ready.",
    images: ["/images/grysics-logo.png"],
    creator: "@olyxee",
  },
  alternates: {
    canonical: "https://grysics.com",
  },
  category: "technology",
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Grysics",
    applicationCategory: "BusinessApplication",
    description:
      "Automated execution system for finance and compliance teams. POPIA-aware, SARS audit-ready, and resilient under load shedding and disrupted systems.",
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
      description: "Early access waitlist",
    },
    operatingSystem: "Web",
    featureList: [
      "Automated reconciliation across ERP, Excel, and payment systems",
      "POPIA-aware data handling",
      "SARS-ready audit trail",
      "Regulatory and statutory reporting",
      "Resilient execution through load shedding and outages",
      "Human approval checkpoints for regulated steps",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Olyxee",
    url: "https://olyxee.com",
    email: "scofield@olyxee.com",
    brand: {
      "@type": "Brand",
      name: "Grysics",
      url: "https://grysics.com",
    },
  },
];

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
