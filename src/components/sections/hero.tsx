import { site } from "@/content/site";
import { BridgeHero } from "@/components/blueprint/bridge-hero";
import { DrawingFrame } from "@/components/blueprint/drawing-frame";

export function Hero() {
  const h = site.hero;
  return (
    <section id="top" aria-labelledby="hero-heading" className="mx-auto max-w-[1100px] px-5 pb-6 pt-12 md:px-8 md:pt-20">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <p className="font-mono text-xs tracking-wide text-accent-text">SHEET 01 · INTRODUCTION</p>
          <p className="mt-2 font-mono text-xs leading-relaxed text-muted">{h.eyebrow}</p>
          <h1 id="hero-heading" className="mt-6 font-semibold tracking-tight">
            <span className="block text-4xl leading-[1.05] sm:text-5xl md:text-6xl">{h.heading}</span>
            <span className="mt-3 block text-balance text-2xl leading-tight sm:text-3xl">{h.subheading}</span>
          </h1>
          <p className="mt-3 text-base text-muted">{h.fullName}</p>
          <p className="mt-6 max-w-[34rem] text-lg leading-snug sm:text-xl">{h.oneLiner}</p>

          <p className="mt-8 inline-flex items-start gap-2.5 rounded-full border border-line px-4 py-2 text-sm text-balance">
            <span aria-hidden className="mt-1.5 size-2 shrink-0 rounded-full bg-ok" />
            <span>
              {h.status.split(" · ")[0]}
              <span aria-hidden className="hidden sm:inline"> · </span>
              <span className="sr-only sm:hidden"> · </span>
              <span className="block sm:inline">{h.status.split(" · ")[1]}</span>
            </span>
          </p>

          <div className="mt-8 grid gap-4">
            <div className="flex gap-3">
            <a
              href="#work"
              className="bg-ink px-4 py-3 text-[15px] sm:px-5 font-medium text-bg transition-colors duration-150 hover:bg-accent-text"
            >
              View work →
            </a>
            <a
              href={`mailto:${site.contact.email}`}
              className="border border-ink px-4 py-3 text-[15px] sm:px-5 font-medium transition-colors duration-150 hover:bg-ink hover:text-bg"
            >
              Email me
            </a>
            </div>
            <div className="flex gap-6">
            <a href={site.contact.github} className="text-[15px] text-muted underline underline-offset-4 hover:text-ink">
              GitHub
            </a>
            <a href={site.contact.linkedin} className="text-[15px] text-muted underline underline-offset-4 hover:text-ink">
              LinkedIn
            </a>
            </div>
          </div>
        </div>

        <div>
          <DrawingFrame grid>
            <BridgeHero />
          </DrawingFrame>
          {/* Legend for small screens, where in-drawing labels are hidden. */}
          <ol className="mt-4 grid gap-1 font-mono text-xs text-muted md:hidden">
            {site.stages.map((s, i) => (
              <li key={s}>
                <span className="text-accent-text">{i + 1}</span> {s}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <dl className="mt-16 grid border-y border-line sm:grid-cols-3">
        {h.proof.map((p, i) => (
          <div key={p.label} className={`flex flex-col-reverse py-6 sm:px-8 ${i > 0 ? "border-t border-line sm:border-l sm:border-t-0" : "sm:pl-0"}`}>
            <dt className="font-mono text-xs uppercase tracking-wide text-muted">{p.label}</dt>
            <dd className="tnum text-4xl font-semibold tracking-tight">{p.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
