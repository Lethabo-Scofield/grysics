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
  title: "Grysics — Verify physical AI before deployment",
  description:
    "Grysics verifies physical AI models through simulation and validation before deployment. Catch failures early, test under constraints, reduce real-world risk.",
  keywords: [
    "AI verification",
    "physical AI",
    "simulation",
    "validation",
    "model testing",
    "AI deployment",
    "robotics testing",
    "edge AI",
  ],
  authors: [{ name: "Grysics" }],
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
    title: "Grysics — Verify physical AI before deployment",
    description:
      "Simulation. Validation. Confidence. Verify your AI before it reaches hardware.",
    images: [
      {
        url: "/images/grysics-logo.png",
        width: 512,
        height: 512,
        alt: "Grysics",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Grysics — Verify physical AI before deployment",
    description:
      "Simulation. Validation. Confidence.",
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
      <body className="overflow-x-hidden">{children}</body>
    </html>
  );
}
