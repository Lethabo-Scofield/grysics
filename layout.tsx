import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grysics | AI Verification Engine",
  description:
    "Grysics is Olyxee's AI verification engine. It ensures AI models work correctly before and after deployment with real-time monitoring, drift detection, and automated testing.",
  alternates: {
    canonical: "https://olyxee.com/products/grysics",
  },
  openGraph: {
    title: "Grysics | AI Verification Engine | Olyxee",
    description:
      "AI verification engine that ensures models work correctly before and after deployment.",
    url: "https://olyxee.com/products/grysics",
  },
};

export default function GrysicsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
