import type { Metadata } from "next";

import "../style.css";

export const metadata: Metadata = {
  title: "PeptidesCanada",
  description: "Premium research peptide catalog with secure account access.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
