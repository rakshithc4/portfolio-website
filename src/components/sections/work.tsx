import Image from "next/image";
import { Arrow } from "@/components/arrow";
import { InView } from "@/components/in-view";
import { CountUp } from "@/components/count-up";
import { r } from "@/lib/motion-config";
import { site, type Project } from "@/content/site";
import { SheetHeader } from "@/components/blueprint/sheet-header";
import { DrawingFrame } from "@/components/blueprint/drawing-frame";
import { SpanDiagram } from "@/components/blueprint/span-diagram";

function ScanIcon() {
  // Line icon of a brain MRI slice inside a frame.
  return (
    <svg aria-hidden viewBox="0 0 48 48" className="size-10 fill-none stroke-ink" strokeWidth="1.5">
      <path d="M4 14V4h10M34 4h10v10M44 34v10H34M14 44H4V34" />
      <ellipse cx="24" cy="24" rx="12" ry="14" className="fill-accent/[.09]" />
      <path d="M24 10v28M16 20c4 2 12 2 16 0M16 29c4-2 12-2 16 0" strokeWidth="1" />
    </svg>
  );
}

// Text blocks fade up in step with the span diagram nodes lighting (delays match nodeDelay in span-diagram).
function Rows({ p }: { p: Project }) {
  return (
    <>
      {p.summary && (
        <p data-r="up" className="mt-5 text-[15px]" style={r(0.1)}>
          {p.summary}
        </p>
      )}
      {(p.problem || p.built) && (
        <dl className="mt-5 grid gap-4 text-[15px]">
          {p.problem && (
            <div data-r="up" style={r(0.1)}>
              <dt className="font-mono text-xs text-accent-text">PROBLEM</dt>
              <dd className="mt-1">{p.problem}</dd>
            </div>
          )}
          {p.built && (
            <div data-r="up" style={r(0.3)}>
              <dt className="font-mono text-xs text-accent-text">WHAT I BUILT</dt>
              <dd className="mt-1">{p.built}</dd>
            </div>
          )}
        </dl>
      )}
    </>
  );
}

function ProjectCard({ p }: { p: Project }) {
  const sap = p.kind === "sap";
  return (
    <InView
      as="article"
      id={p.id}
      aria-labelledby={`${p.id}-name`}
      className="card-hover border border-line bg-card p-5 md:p-8"
    >
      <div className={sap ? "grid gap-8 lg:grid-cols-[1.1fr_1fr]" : "grid gap-8 lg:grid-cols-[1.1fr_1fr]"}>
        <div>
          <div className="flex items-start gap-4">
            {!sap && <ScanIcon />}
            <div>
              <h3 id={`${p.id}-name`} className="text-2xl font-semibold tracking-tight">
                {p.name}
              </h3>
              <p className="mt-1 text-muted">{p.tagline}</p>
            </div>
          </div>

          {sap && (
            <div className="mt-6">
              <SpanDiagram />
            </div>
          )}

          <Rows p={p} />

          <ul data-r="up" className="mt-5 flex flex-wrap gap-2" aria-label="Technologies" style={r(0.5)}>
            {p.tags.map((t) => (
              <li key={t} className="whitespace-nowrap border border-line px-2 py-0.5 font-mono text-xs text-muted">
                {t}
              </li>
            ))}
          </ul>

          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-5">
            {p.metrics.map((m, i) => (
              <div key={m.label} data-r="up" className="flex flex-col-reverse justify-end" style={r(0.65 + i * 0.06)}>
                <dt className="font-mono text-[13px] text-muted">
                  {m.label}
                  {m.sub && <span className="mt-0.5 block text-ink">{m.sub}</span>}
                </dt>
                <dd className="text-3xl font-semibold tracking-tight text-ink">
                  <CountUp value={m.value} delay={0.65 + i * 0.06} />
                </dd>
              </div>
            ))}
          </dl>

          <div data-r="up" className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[15px]" style={r(0.8)}>
            {p.links.map((l) => (
              <a key={l.href} href={l.href} className="font-medium link-u hover:text-accent-text">
                {l.label} <Arrow dir="ne" />
              </a>
            ))}
            {p.videoUrl && (
              <a href={p.videoUrl} className="font-medium link-u hover:text-accent-text">
                Watch demo <Arrow dir="ne" />
              </a>
            )}
          </div>
          {p.note && (
            <p data-r="up" className="mt-3 text-sm text-muted" style={r(0.9)}>
              {p.note}
            </p>
          )}
        </div>

        <figure className="m-0 self-start">
          <DrawingFrame animate veil>
            <Image
              src={p.image.src}
              alt={p.image.alt}
              width={p.image.width}
              height={p.image.height}
              sizes="(min-width: 1024px) 480px, 90vw"
              className="h-auto w-full"
            />
          </DrawingFrame>
          <figcaption className="mt-2 font-mono text-[11px] text-muted">
            FIG. · {p.name.toUpperCase()}
          </figcaption>
        </figure>
      </div>
    </InView>
  );
}

export function Work() {
  return (
    <section id="work" aria-label="work" className="mx-auto max-w-[1100px] px-5 pb-16 pt-12 md:px-8">
      <SheetHeader n="02" name="WORK" title={site.work.heading} />
      <div className="mt-10 grid gap-8">
        {site.work.projects.map((p) => (
          <ProjectCard key={p.id} p={p} />
        ))}
      </div>
    </section>
  );
}
