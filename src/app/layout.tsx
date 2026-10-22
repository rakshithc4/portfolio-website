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
  "Computer Science student at the University of Sydney (graduating Dec 2027) and aspiring SAP BTP platform engineer — SAP RAP systems built and deployed, plus applied deep learning research.";

export const metadata: Metadata = {
  // Production URL — needed so Open Graph/Twitter image URLs resolve
  // correctly when the link is shared, instead of pointing at localhost.
  // Override with NEXT_PUBLIC_SITE_URL if the domain ever changes.
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://rakshith-portfolio-04.vercel.app"
  ),
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
