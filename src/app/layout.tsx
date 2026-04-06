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
  title: "Grysics — Verify your AI before it ships",
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
    title: "Grysics — Verify your AI before it ships",
    description:
      "Catch failures in chatbots, agents, RAG systems, and generative AI before your users do.",
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
    title: "Grysics — Verify your AI before it ships",
    description:
      "Catch failures in chatbots, agents, RAG systems, and generative AI before your users do.",
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
