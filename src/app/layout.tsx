import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Grysics | AI Verification Engine",
  description:
    "Grysics is an AI verification engine. It ensures AI models work correctly before and after deployment with real-time monitoring, drift detection, and automated testing.",
  openGraph: {
    title: "Grysics | AI Verification Engine",
    description:
      "AI verification engine that ensures models work correctly before and after deployment.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
