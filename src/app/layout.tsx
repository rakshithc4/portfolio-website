import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";

import { LiveBackground } from "@/components/ui/live-background";

const sans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const heading = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "Rakshith Chandra Shekar";
const description =
  "Computer Science graduate (USyd) and aspiring SAP BTP platform engineer — SAP RAP systems built end-to-end and applied deep learning research.";

export const metadata: Metadata = {
  // ponytail: update this to the real Vercel/custom domain once deployed —
  // without it, link-preview images resolve against whatever host serves
  // the page, which works but isn't guaranteed across every platform.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    images: [{ url: "/og-image.jpg", width: 800, height: 420 }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${heading.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <LiveBackground />
        {children}
      </body>
    </html>
  );
}
