"use client"

import { motion } from "motion/react"

import { heroStats } from "@/lib/resume-data"

export function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-dvh w-full max-w-6xl flex-col items-center justify-center overflow-hidden px-6 py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 text-center"
      >
        <span className="text-[13px] font-medium uppercase tracking-[0.2em] text-ink-faint">
          SAP ABAP Cloud · SAP BTP Developer
        </span>

        <h1 className="mt-4 font-heading text-5xl font-bold uppercase tracking-tight text-foreground sm:text-7xl md:text-8xl">
          Rakshith Chandra Shekar
        </h1>

        <span className="mt-4 block text-[13px] font-medium uppercase tracking-[0.2em] text-ink-faint">
          Portfolio · 2027
        </span>

        <p className="mx-auto mt-8 max-w-lg text-ink-muted">
          Computer Science graduate (USyd) building real SAP RAP systems on
          SAP BTP and applying deep learning research — open to graduate
          technology roles anywhere in Australia from Dec 2027.
        </p>

        <div className="mt-8 flex justify-center gap-3">
          <a
            href="#work"
            className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity duration-150 hover:opacity-90"
          >
            View Work
          </a>
          <a
            href="#contact"
            className="rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors duration-150 hover:border-primary/40"
          >
            Get in Touch
          </a>
        </div>

        <motion.dl
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="mx-auto mt-14 flex max-w-md flex-wrap items-center justify-center gap-x-10 gap-y-6 border-t border-border/70 pt-8"
        >
          {heroStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-mono text-2xl font-semibold text-foreground sm:text-3xl">
                {stat.value}
              </dd>
              <div className="mt-1 max-w-[9rem] text-[11px] uppercase tracking-[0.06em] text-ink-faint">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  )
}
