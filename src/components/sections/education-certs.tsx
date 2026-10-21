import { ExternalLink, GraduationCap } from "lucide-react"

import { Reveal } from "@/components/reveal"
import { SectionLabel } from "@/components/section-label"
import { certifications, education, languages } from "@/lib/resume-data"

export function EducationCerts() {
  return (
    <section id="credentials" className="mx-auto max-w-6xl px-6 py-28 md:px-8 md:py-36">
      <Reveal>
        <SectionLabel icon={GraduationCap} index="05">Credentials</SectionLabel>
      </Reveal>

      <div className="mt-10 grid gap-16 md:grid-cols-2">
        <div>
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
              Education
            </span>
          </Reveal>
          <div className="mt-8 space-y-8">
            {education.map((item) => (
              <Reveal key={item.degree}>
                <h3 className="font-heading text-lg font-semibold leading-snug text-foreground">
                  {item.degree}
                </h3>
                <p className="mt-1 text-sm text-ink-muted">
                  {item.org} · {item.location}
                </p>
                <p className="mt-1 font-mono text-xs text-ink-faint">{item.period}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {item.detail}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        <div>
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
              Certifications
            </span>
          </Reveal>
          <div className="mt-8 space-y-6">
            {certifications.map((cert) => (
              <Reveal key={cert.name}>
                <div className="rounded-xl border border-border bg-card/60 p-4">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-8 w-14 shrink-0 items-center justify-center rounded-md border border-border bg-background/60 font-mono text-[10px] font-semibold uppercase tracking-wide text-ink-muted">
                      {cert.org}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-base font-medium leading-snug text-foreground">
                        {cert.name}
                      </h3>
                      <p className="mt-1 font-mono text-xs text-ink-faint">
                        {cert.period}
                        {cert.credentialId && ` · ID ${cert.credentialId}`}
                      </p>
                    </div>
                  </div>
                  {cert.href && (
                    <a
                      href={cert.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors duration-150 hover:border-primary/40 hover:text-primary"
                    >
                      Show credential
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <span className="mt-12 block font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
              Languages
            </span>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              {languages.map((lang) => (
                <span key={lang.name} className="text-sm text-ink-muted">
                  {lang.name}{" "}
                  <span className="text-ink-faint">({lang.level})</span>
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
