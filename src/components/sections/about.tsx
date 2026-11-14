import { Fragment } from "react";
import Image from "next/image";
import { site } from "@/content/site";
import { SheetHeader } from "@/components/blueprint/sheet-header";
import { DrawingFrame } from "@/components/blueprint/drawing-frame";
import { MarginNote } from "@/components/blueprint/margin-note";
import { Arrow } from "@/components/arrow";
import { InView } from "@/components/in-view";
import { SplitText } from "@/components/motion/split-text";
import { r, reveal } from "@/lib/motion-config";

export function About() {
  const a = site.about;
  return (
    <section id="about" aria-labelledby="about-heading" className="mx-auto max-w-[1100px] px-5 py-16 md:px-8">
      <SheetHeader id="about-heading" n="05" name="ABOUT" title={a.heading} />

      {/* Mobile order: photo, text, bill of materials, credentials.
          Desktop: photo | text + credentials, then bill of materials full width. */}
      <div className="mt-10 grid gap-x-12 gap-y-12 lg:grid-cols-[300px_1fr]">
        <InView as="figure" className="m-0 max-w-[200px] self-start sm:max-w-[300px] lg:row-span-2">
          <div className="relative">
          <MarginNote text={a.photo.note} className="-top-9 left-20 -rotate-3" arrow="left-full top-1/2 ml-1 -scale-x-100" />
          <DrawingFrame animate>
            <Image
              src={a.photo.src}
              alt={a.photo.alt}
              width={a.photo.width}
              height={a.photo.height}
              sizes="300px"
              className="h-auto w-full"
            />
          </DrawingFrame>
          {/* dimension line along the right side: draws top to bottom, end ticks fade in */}
          <span aria-hidden data-r="line-y" className="absolute -right-4 bottom-0 top-0 w-px bg-muted" style={r(0.2, 0.7)} />
          <span aria-hidden data-r="fade" className="absolute -right-[21px] top-0 h-px w-[11px] bg-muted" style={r(0.2, 0.3)} />
          <span aria-hidden data-r="fade" className="absolute -right-[21px] bottom-0 h-px w-[11px] bg-muted" style={r(0.8, 0.3)} />
          </div>
          <figcaption data-r="fade" className="mt-2 font-mono text-[11px] text-muted" style={r(0.6, 0.4)}>
            {a.caption}
          </figcaption>
        </InView>

        <div>
          <div className="grid max-w-[40rem] gap-4">
            {a.paragraphs.map((p) => (
              <InView as="p" key={p}>
                <SplitText inView text={p} step={0.012} />
              </InView>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted">
            <span className="font-mono text-xs text-accent-text">LANGUAGES</span> · {a.languages}
          </p>
        </div>

        <div className="lg:col-span-2 lg:row-start-3">
          <h3 className="font-mono text-xs tracking-wide text-accent-text">BILL OF MATERIALS</h3>
          {/* column heads, as on a drawing's parts list (decorative) */}
          <div aria-hidden className="mt-3 hidden grid-cols-[124px_1fr_28px] gap-1 pb-1.5 font-mono text-[10px] tracking-wide text-muted sm:grid">
            <span>ITEM</span>
            <span>DESCRIPTION</span>
            <span className="text-right">CHK</span>
          </div>
          {/* each row is entered in turn: rule, item number, parts left to right, then checked off */}
          <InView as="dl" className="border-t-2 border-ink max-sm:mt-3">
            {a.bom.map((g, i) => {
              const d = 0.05 + i * 0.18;
              const checked = d + 0.15 + g.items.length * 0.03;
              return (
                <div key={g.group} className="relative grid gap-1 py-3 pr-7 sm:grid-cols-[124px_1fr]">
                  <dt data-r="fade" className="flex gap-3 font-mono text-xs text-muted" style={r(d, 0.3)}>
                    <span aria-hidden className="tnum text-accent-text">{String(i + 1).padStart(2, "0")}</span>
                    {g.group}
                  </dt>
                  <dd className="text-[15px]">
                    {/* each skill stays on one line; wrapping happens only between skills */}
                    {g.items.map((it, k) => (
                      <Fragment key={it}>
                        <span data-r="fade" style={r(d + 0.1 + k * 0.03, 0.3)}>
                          <span className="whitespace-nowrap">{it}</span>
                          {k < g.items.length - 1 && " ·"}
                        </span>{" "}
                      </Fragment>
                    ))}
                  </dd>
                  <svg aria-hidden viewBox="0 0 16 16" className="absolute right-1 top-3.5 size-4 fill-none stroke-accent" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path data-r="draw" pathLength={1} d="M3 8.5l3.2 3.2L13 4.5" style={r(checked, 0.3)} />
                  </svg>
                  <span aria-hidden data-r="line-x" className="absolute inset-x-0 bottom-0 h-px bg-line" style={r(d, 0.5)} />
                </div>
              );
            })}
          </InView>
        </div>

        <div className="lg:col-start-2 lg:row-start-2">
          <h3 className="font-mono text-xs tracking-wide text-accent-text">CREDENTIALS</h3>
          <InView as="ul" className="mt-3 border-t-2 border-ink">
            {a.credentials.map((c, i) => (
              <li key={c.label} className="card-draft border border-transparent border-b-line px-3 py-[11px] text-[15px]">
                <div data-r="up" style={r(0.05 + i * reveal.stagger)}>
                  {c.href ? (
                    <a href={c.href} className="link-u tap hover:text-accent-text">
                      {c.label} <Arrow dir="ne" />
                    </a>
                  ) : (
                    c.label
                  )}
                </div>
              </li>
            ))}
          </InView>
        </div>
      </div>
    </section>
  );
}
