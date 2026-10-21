"use client"

import { motion } from "motion/react"
import { Award } from "lucide-react"

import { Reveal } from "@/components/reveal"
import { SectionLabel } from "@/components/section-label"
import { experience } from "@/lib/resume-data"

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-28 md:px-8 md:py-36">
      <Reveal>
        <SectionLabel icon={Award} index="03">Experience & Leadership</SectionLabel>
      </Reveal>

      <div className="mt-12 flex flex-col gap-5">
        {experience.map((item, i) => (
          <motion.div
            key={`${item.org}-${item.role}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.35, delay: Math.min(i * 0.06, 0.18), ease: "easeOut" }}
            className="grid gap-4 rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-sm transition-colors duration-200 hover:border-primary/30 sm:p-8 md:grid-cols-12 md:gap-8"
          >
            <div className="md:col-span-3">
              <div className="font-mono text-xs text-ink-faint">{item.period}</div>
              <div className="mt-1 text-xs text-ink-faint">{item.location}</div>
            </div>
            <div className="md:col-span-9">
              <h3 className="font-heading text-xl font-semibold text-foreground">
                {item.role}
              </h3>
              <p className="mt-1 text-sm text-ink-muted">{item.org}</p>
              <ul className="mt-4 space-y-2">
                {item.points.map((point) => (
                  <li
                    key={point}
                    className="flex gap-3 text-sm leading-relaxed text-ink-muted"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
