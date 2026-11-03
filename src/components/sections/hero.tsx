import { site, coffeeUrl } from "@/content/site";
import { BridgeHero } from "@/components/blueprint/bridge-hero";
import { DrawingFrame } from "@/components/blueprint/drawing-frame";
import { textStep } from "@/lib/motion-config";
import { Arrow } from "@/components/arrow";
import { Mark, Seal } from "@/components/logo";
import { InViewPause } from "@/components/in-view-pause";
import { MarginNote } from "@/components/blueprint/margin-note";
import { CountUp } from "@/components/count-up";

export function Hero() {
  const h = site.hero;
  return (
    <section id="top" aria-labelledby="hero-heading" className="mx-auto max-w-[1100px] px-5 pb-6 pt-12 md:px-8 md:pt-20">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <div className="rise" style={textStep(0)}>
            <p className="flex items-center gap-2 font-mono text-xs tracking-wide text-accent-text">
              <Mark className="h-3.5 w-auto text-ink" />
              SHEET 01 · INTRODUCTION
            </p>
            <p className="mt-2 font-mono text-xs leading-relaxed text-muted">{h.eyebrow}</p>
          </div>
          <h1 id="hero-heading" className="rise mt-6 font-semibold tracking-tight" style={textStep(1)}>
            <span className="block text-4xl leading-[1.05] sm:text-5xl md:text-6xl">{h.heading}</span>
            <span className="mt-3 block text-balance text-2xl leading-tight sm:text-3xl">{h.subheading}</span>
          </h1>
          <p className="rise mt-3 text-base text-muted" style={textStep(2)}>{h.fullName}</p>
          <p className="rise mt-6 max-w-[34rem] text-lg leading-snug sm:text-xl" style={textStep(3)}>{h.oneLiner}</p>

          <p className="rise mt-8 inline-flex items-start gap-2.5 rounded-full border border-line px-4 py-2 text-sm text-balance" style={textStep(4)}>
            <span aria-hidden className="mt-1.5 size-2 shrink-0 rounded-full bg-ok" />
            <span>
              {h.status.split(" · ")[0]}
              <span aria-hidden className="hidden sm:inline"> · </span>
              <span className="sr-only sm:hidden"> · </span>
              <span className="block sm:inline">{h.status.split(" · ")[1]}</span>
            </span>
          </p>

          <div className="rise mt-8 grid gap-4" style={textStep(5)}>
            <div className="flex gap-3">
            <a
              href="#work"
              className="btn bg-ink px-4 py-3 text-[15px] sm:px-5 font-medium text-bg transition-colors duration-150 hover:bg-accent-text"
            >
              View work <Arrow dir="e" />
            </a>
            <a
              href={`mailto:${site.contact.email}`}
              className="btn border border-ink px-4 py-3 text-[15px] sm:px-5 font-medium transition-colors duration-150 hover:bg-ink hover:text-bg"
            >
              Email me
            </a>
            </div>
            <InViewPause className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <a href={site.contact.github} className="text-[15px] text-muted link-u hover:text-ink">
                GitHub
              </a>
              <a href={site.contact.linkedin} className="text-[15px] text-muted link-u hover:text-ink">
                LinkedIn
              </a>
              <a
                href={coffeeUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Book a 15-minute coffee or video call with Rakshith"
                className="btn coffee inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-sm text-muted hover:text-ink"
              >
                <svg aria-hidden viewBox="0 0 16 16" className="size-4 fill-none stroke-ink" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 7h8v3.5a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3Z M11 8h1a1.5 1.5 0 0 1 0 3h-1 M2 15h10" />
                  <g className="steam-g stroke-accent">
                    <path className="ambient steam" d="M5.5 5.2c-.8-.8.8-1.4 0-2.4" />
                    <path className="ambient steam steam-2" d="M8.5 5.2c-.8-.8.8-1.4 0-2.4" />
                  </g>
                </svg>
                Grab a coffee
              </a>
            </InViewPause>
          </div>
        </div>

        <div>
          <InViewPause className="relative">
            <DrawingFrame grid>
              <BridgeHero />
            </DrawingFrame>
            <MarginNote text={h.note} className="left-[26%] top-[66%] -rotate-3" arrow="-left-[58px] -top-1 -scale-y-100" />
            {/* title-block stamp, like an engineer's approval seal */}
            <Seal className="absolute -bottom-5 right-4 hidden size-24 -rotate-6 rounded-full bg-bg text-ink sm:block md:size-28" />
          </InViewPause>
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

      <dl className="rise mt-16 grid border-y border-line sm:grid-cols-3" style={textStep(6)}>
        {h.proof.map((p, i) => (
          <div key={p.label} className={`flex flex-col-reverse py-6 sm:px-8 ${i > 0 ? "border-t border-line sm:border-l sm:border-t-0" : "sm:pl-0"}`}>
            <dt className="font-mono text-xs uppercase tracking-wide text-muted">{p.label}</dt>
            <dd className="text-4xl font-semibold tracking-tight">
              <CountUp value={p.value} delay={0.5} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
