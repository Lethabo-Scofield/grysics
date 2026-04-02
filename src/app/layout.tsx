import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Olyxee | AI Platform",
  description: "Olyxee builds AI verification and deployment tools.",
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
