"use client"

import Image from "next/image"
import { motion } from "motion/react"
import { ArrowUpRight, Briefcase, FolderGit2, NotebookText } from "lucide-react"

import { Reveal } from "@/components/reveal"
import { SectionLabel } from "@/components/section-label"
import { projects } from "@/lib/resume-data"

export function Projects() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-24 md:px-8 md:py-32">
      <Reveal>
        <SectionLabel icon={Briefcase} index="02">Work</SectionLabel>
        <p className="mt-4 max-w-md text-ink-muted">
          Real systems shipped end-to-end — SAP RAP business objects, a
          control-room dashboard, and applied deep learning research.
        </p>
      </Reveal>

      <div className="mt-16 flex flex-col gap-10">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.15), ease: "easeOut" }}
            className="group grid gap-8 rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-sm transition-colors duration-200 hover:border-primary/30 sm:p-8 md:grid-cols-12 md:gap-10"
          >
              {/* Content — left on desktop, first on mobile */}
              <div className="flex flex-col md:col-span-7 md:order-1">
                <div>
                  <h3 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    {project.name}
                  </h3>
                  <p className="mt-1 text-[13px] uppercase tracking-[0.1em] text-ink-faint">
                    {project.tagline}
                  </p>
                </div>

                <p className="mt-4 leading-relaxed text-ink-muted">
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-border bg-background/40 px-3 py-1 font-mono text-[11px] text-ink-muted transition-colors duration-150 group-hover:border-primary/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <dl className="mt-6 grid grid-cols-4 gap-4 border-t border-border pt-6">
                  {project.stats.map((stat) => (
                    <div key={stat.label}>
                      <dt className="sr-only">{stat.label}</dt>
                      <dd className="font-mono text-xl font-medium text-foreground">
                        {stat.value}
                      </dd>
                      <div className="mt-1 text-[11px] leading-snug text-ink-faint">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </dl>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  {project.liveDemo && (
                    <motion.a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-shadow duration-200 hover:shadow-[0_0_20px_-4px_rgba(91,110,245,0.6)]"
                    >
                      Live Demo
                      <ArrowUpRight size={15} />
                    </motion.a>
                  )}
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors duration-150 hover:border-primary/40"
                  >
                    <FolderGit2 size={15} />
                    GitHub
                  </a>
                  {project.colabUrl && (
                    <a
                      href={project.colabUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors duration-150 hover:border-primary/40"
                    >
                      <NotebookText size={15} />
                      Model Output
                    </a>
                  )}
                </div>
              </div>

              {/* Screenshot — right on desktop, contained (not full-bleed) */}
              <div className="md:order-2 md:col-span-5">
                {project.image ? (
                  <motion.a
                    href={project.liveDemo ?? project.href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="relative block aspect-[4/3] w-full overflow-hidden rounded-xl border border-border shadow-[0_20px_50px_-20px_rgba(91,110,245,0.25)]"
                  >
                    <Image
                      src={project.image}
                      alt={`${project.name} screenshot`}
                      fill
                      sizes="(min-width: 768px) 40vw, 100vw"
                      className="object-cover"
                    />
                  </motion.a>
                ) : (
                  <div className="flex aspect-[4/3] w-full items-center justify-center rounded-xl border border-dashed border-border bg-background/40">
                    <span className="text-sm font-medium text-ink-faint">
                      Preview coming soon
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
        ))}
      </div>
    </section>
  )
}
