import Image from "next/image";
import { site, type Project } from "@/content/site";
import { SheetHeader } from "@/components/blueprint/sheet-header";
import { DrawingFrame } from "@/components/blueprint/drawing-frame";
import { SpanDiagram } from "@/components/blueprint/span-diagram";

function ScanIcon() {
  // Line icon of a brain MRI slice inside a frame.
  return (
    <svg aria-hidden viewBox="0 0 48 48" className="size-10 fill-none stroke-ink" strokeWidth="1.5">
      <path d="M4 14V4h10M34 4h10v10M44 34v10H34M14 44H4V34" />
      <ellipse cx="24" cy="24" rx="12" ry="14" />
      <path d="M24 10v28M16 20c4 2 12 2 16 0M16 29c4-2 12-2 16 0" strokeWidth="1" />
    </svg>
  );
}

function Rows({ p }: { p: Project }) {
  return (
    <dl className="mt-5 grid gap-4 text-[15px]">
      {p.problem && (
        <div>
          <dt className="font-mono text-xs text-accent-text">PROBLEM</dt>
          <dd className="mt-1">{p.problem}</dd>
        </div>
      )}
      {p.built && (
        <div>
          <dt className="font-mono text-xs text-accent-text">WHAT I BUILT</dt>
          <dd className="mt-1">{p.built}</dd>
        </div>
      )}
      {p.summary && <p>{p.summary}</p>}
    </dl>
  );
}

function ProjectCard({ p }: { p: Project }) {
  const sap = p.kind === "sap";
  return (
    <article
      id={p.id}
      aria-labelledby={`${p.id}-name`}
      className="border border-line bg-card p-5 md:p-8"
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

          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
            {p.tags.map((t) => (
              <li key={t} className="whitespace-nowrap border border-line px-2 py-0.5 font-mono text-xs text-muted">
                {t}
              </li>
            ))}
          </ul>

          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-5">
            {p.metrics.map((m) => (
              <div key={m.label}>
                <dd className="tnum text-3xl font-semibold tracking-tight text-ink">{m.value}</dd>
                <dt className="font-mono text-[13px] text-muted">
                  {m.label}
                  {m.sub && <span className="mt-0.5 block text-ink">{m.sub}</span>}
                </dt>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
            {p.links.map((l) => (
              <a key={l.href} href={l.href} className="font-medium underline underline-offset-4 hover:text-accent-text">
                {l.label} ↗
              </a>
            ))}
            {p.videoUrl && (
              <a href={p.videoUrl} className="font-medium underline underline-offset-4 hover:text-accent-text">
                Watch demo ↗
              </a>
            )}
          </div>
          {p.note && <p className="mt-3 text-sm text-muted">{p.note}</p>}
        </div>

        <figure className="m-0 self-start">
          <DrawingFrame>
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
    </article>
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
