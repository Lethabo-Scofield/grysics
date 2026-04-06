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
  title: "Grysics | AI Verification Engine — Verify Models Before Deployment",
  description:
    "Grysics is an AI verification engine that ensures your AI models work correctly before and after deployment. Real-time monitoring, drift detection, and automated testing across 50+ hardware targets including NVIDIA Jetson. PyTorch, TensorFlow, ONNX supported.",
  keywords: [
    "AI verification",
    "model testing",
    "AI deployment",
    "machine learning testing",
    "model verification",
    "AI monitoring",
    "drift detection",
    "PyTorch testing",
    "TensorFlow verification",
    "ONNX verification",
    "edge AI",
    "NVIDIA Jetson",
    "model accuracy",
    "AI quality assurance",
    "MLOps",
  ],
  authors: [{ name: "Grysics" }],
  creator: "Grysics",
  publisher: "Grysics",
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
    title: "Grysics | AI Verification Engine — Verify Models Before Deployment",
    description:
      "One command to test accuracy, latency, and memory across every target device. Catch AI failures before your users do.",
    images: [
      {
        url: "/images/grysics-logo.png",
        width: 512,
        height: 512,
        alt: "Grysics AI Verification Engine",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Grysics | AI Verification Engine",
    description:
      "Verify your AI models before deployment. Test accuracy, latency, and memory across 50+ hardware targets.",
    images: ["/images/grysics-logo.png"],
  },
  alternates: {
    canonical: "https://grysics.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Grysics",
              description:
                "AI verification engine that ensures models work correctly before and after deployment with real-time monitoring, drift detection, and automated testing.",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "Linux, macOS, Windows",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                description: "Free during beta",
              },
            }),
          }}
        />
      </head>
      <body className="overflow-x-hidden">{children}</body>
    </html>
  );
}
