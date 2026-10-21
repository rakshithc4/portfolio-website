import Image from "next/image"
import { User } from "lucide-react"

import { Reveal } from "@/components/reveal"
import { SectionLabel } from "@/components/section-label"
import { aboutBody, aboutHighlights, aboutLead } from "@/lib/resume-data"

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-28 md:px-8 md:py-36">
      <Reveal>
        <SectionLabel icon={User} index="01">About</SectionLabel>
      </Reveal>

      <div className="mt-10 grid gap-10 md:grid-cols-12 md:gap-12">
        <Reveal delay={0.05} className="md:col-span-3">
          <div className="relative aspect-[4/5] w-full max-w-[200px] overflow-hidden rounded-2xl border border-border">
            <Image
              src="/headshot.jpeg"
              alt="Rakshith Chandra Shekar"
              fill
              sizes="200px"
              className="object-cover"
              priority
            />
          </div>
        </Reveal>

        <div className="md:col-span-9">
          <Reveal delay={0.1}>
            <p className="max-w-2xl font-heading text-2xl leading-snug text-foreground sm:text-3xl md:text-4xl">
              {aboutLead}
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-muted">
              {aboutBody}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-6">
              {aboutHighlights.map((item) => (
                <div key={item.label}>
                  <dt className="sr-only">{item.label}</dt>
                  <dd className="font-mono text-2xl font-medium text-foreground sm:text-3xl">
                    {item.value}
                  </dd>
                  <div className="mt-1.5 text-xs leading-snug text-ink-faint">
                    {item.label}
                  </div>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
