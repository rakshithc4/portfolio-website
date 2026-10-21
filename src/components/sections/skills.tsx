"use client"

import * as React from "react"
import { motion } from "motion/react"
import {
  Blocks,
  Brain,
  Cloud,
  Code2,
  ShieldCheck,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react"

import { Reveal } from "@/components/reveal"
import { SectionLabel } from "@/components/section-label"
import { cn } from "@/lib/utils"
import { skillGroups } from "@/lib/resume-data"

const GROUP_ICONS: Record<string, LucideIcon> = {
  Languages: Code2,
  "AI / ML": Brain,
  "SAP & ERP": Blocks,
  "Cloud & Tools": Cloud,
  "SDLC & Quality": ShieldCheck,
  Leadership: Users,
}

const FILTERS = ["All", ...skillGroups.map((g) => g.label)]

export function Skills() {
  const [filter, setFilter] = React.useState("All")
  const visibleGroups =
    filter === "All" ? skillGroups : skillGroups.filter((g) => g.label === filter)

  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-24 md:px-8 md:py-32">
      <Reveal>
        <SectionLabel icon={Sparkles} index="04">Skills</SectionLabel>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mt-8 flex flex-wrap gap-2">
          {FILTERS.map((label) => (
            <button
              key={label}
              type="button"
              onClick={() => setFilter(label)}
              className={cn(
                "cursor-pointer rounded-full border px-3.5 py-1.5 text-sm transition-colors duration-150",
                filter === label
                  ? "border-primary/50 bg-primary/15 text-foreground"
                  : "border-border bg-background/40 text-ink-faint hover:border-primary/30 hover:text-ink-muted"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visibleGroups.map((group, i) => {
          const Icon = GROUP_ICONS[group.label] ?? Code2
          return (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.35, delay: Math.min(i * 0.06, 0.24), ease: "easeOut" }}
              className="rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-sm transition-colors duration-200 hover:border-primary/30"
            >
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <Icon size={16} strokeWidth={2} />
                </span>
                <h3 className="text-[13px] font-medium uppercase tracking-[0.08em] text-foreground">
                  {group.label}
                </h3>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-border bg-background/50 px-3 py-1.5 text-sm text-ink-muted transition-colors duration-150 hover:border-primary/40 hover:text-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
