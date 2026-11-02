import { SpanGauge } from "@/components/blueprint/span-gauge";
import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/sections/hero";
import { Work } from "@/components/sections/work";
import { Journey } from "@/components/sections/journey";
import { Experience } from "@/components/sections/experience";
import { About } from "@/components/sections/about";
import { Harbour } from "@/components/blueprint/harbour";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-3 focus:py-2 focus:text-bg"
      >
        Skip to content
      </a>
      <SiteHeader />
      <SpanGauge />
      <main id="main">
        <Hero />
        <Harbour className="mt-8" />
        <Work />
        <Journey />
        <Experience />
        <About />
      </main>
      <Harbour />
      <Contact />
    </>
  );
}
