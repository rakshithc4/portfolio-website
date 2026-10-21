"use client"

import { skillMarquee } from "@/lib/resume-data"

export function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-border bg-secondary/40 py-6">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent md:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent md:w-32" />

      <div className="flex w-max motion-safe:animate-[marquee-scroll_28s_linear_infinite] motion-safe:hover:[animation-play-state:paused] motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-3">
        {[skillMarquee, skillMarquee].map((set, setIndex) => (
          <div
            key={setIndex}
            aria-hidden={setIndex === 1}
            className="flex shrink-0 items-center gap-3 pr-3"
          >
            {set.map((item, i) => (
              <span
                key={`${setIndex}-${item}-${i}`}
                className="shrink-0 rounded-full border border-border px-4 py-1.5 font-mono text-[13px] text-ink-muted transition-colors duration-150 hover:border-primary/50 hover:text-foreground"
              >
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
