import type { Metadata } from "next";
import { Caveat, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { site } from "@/content/site";

const sans = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

// Handwriting for the few margin notes and the signature (see margin-note.tsx).
const hand = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  // www is the address the site serves from (the bare domain redirects to it).
  metadataBase: new URL("https://www.rakshithchandrashekar.com"),
  alternates: { canonical: "/" },
  title: site.meta.title,
  description: site.meta.description,
  openGraph: {
    title: site.meta.title,
    description: site.meta.description,
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: site.meta.title,
    description: site.meta.description,
  },
};

// Runs before first paint so there is no theme flash.
// Saved choice wins; otherwise follow the OS setting.
const themeScript = `(function(){var t;try{t=localStorage.getItem("theme")}catch(e){}
if(t!=="paper"&&t!=="blueprint"){t=matchMedia("(prefers-color-scheme: dark)").matches?"blueprint":"paper"}
document.documentElement.dataset.theme=t;
// Marks that scripts run: scroll reveals only hide content when this is set, so no-JS visitors see everything.
document.documentElement.dataset.js=""})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="paper"
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable} ${hand.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
