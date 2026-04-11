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
    default: "Grysics - AI Execution System",
    template: "%s | Grysics",
  },
  description:
    "Grysics turns business goals into completed real-world operations. AI that executes across multiple tools and data sources.",
  keywords: [
    "AI execution",
    "business automation",
    "AI operations",
    "goal-driven AI",
    "financial reconciliation",
    "sales automation",
    "enterprise reporting",
    "AI workflow execution",
    "business intelligence",
    "automated operations",
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
    title: "Grysics - AI Execution System",
    description:
      "AI that turns business goals into completed operations across multiple tools and data sources.",
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
    title: "Grysics - AI Execution System",
    description:
      "AI that turns business goals into completed operations across multiple tools and data sources.",
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
      "AI execution system that turns business goals into completed real-world operations across multiple tools and data sources.",
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
      "Goal-driven execution",
      "Financial reconciliation",
      "Sales lead processing",
      "Enterprise reporting",
      "Cross-system operations",
      "Automated error handling",
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
