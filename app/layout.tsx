import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

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
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
