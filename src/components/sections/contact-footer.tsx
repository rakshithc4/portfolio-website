import { Mail } from "lucide-react"

import { Reveal } from "@/components/reveal"
import { SectionLabel } from "@/components/section-label"
import { profile } from "@/lib/resume-data"

const FOOTER_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
]

export function ContactFooter() {
  return (
    <footer id="contact" className="mx-auto max-w-6xl px-6 py-24 md:px-8 md:py-32">
      <Reveal>
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <SectionLabel icon={Mail} index="06">Contact</SectionLabel>
            <h2 className="mt-4 font-heading text-4xl font-bold uppercase tracking-tight text-foreground sm:text-5xl">
              Stay Connected
            </h2>
            <a
              href={`mailto:${profile.email}`}
              className="mt-4 block break-words text-2xl font-medium text-primary underline decoration-primary/30 underline-offset-8 transition-colors duration-150 hover:decoration-primary sm:text-4xl"
            >
              {profile.email}
            </a>
            <p className="mt-6 max-w-sm text-ink-muted">
              Open to SAP BTP platform engineering and graduate technology
              roles across Australia from Dec 2027 — reach out anytime.
            </p>
          </div>

          <nav className="flex flex-col gap-3 md:col-span-5 md:items-end">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group flex w-full max-w-xs items-center justify-between border-b border-border py-3 text-sm text-ink-muted transition-colors duration-150 hover:text-foreground md:w-auto md:min-w-[220px]"
              >
                <span>{link.label}</span>
                <span className="transition-transform duration-150 group-hover:translate-x-1">
                  →
                </span>
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-border pt-8">
          <div className="flex gap-8 text-sm">
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="text-ink-muted transition-colors duration-150 hover:text-foreground"
            >
              LinkedIn
            </a>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="text-ink-muted transition-colors duration-150 hover:text-foreground"
            >
              GitHub
            </a>
          </div>
          {/* Keep in sync with the hero's "Portfolio · {year}" label (hero.tsx)
              — both derive from the same current-year call, not a hardcoded
              value, so they can't drift apart. */}
          <p className="text-[13px] text-ink-faint">
            © {new Date().getFullYear()} {profile.name}
          </p>
        </div>
      </Reveal>
    </footer>
  )
}
