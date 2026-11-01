import { Fragment } from "react";
import Image from "next/image";
import { site } from "@/content/site";
import { SheetHeader } from "@/components/blueprint/sheet-header";
import { DrawingFrame } from "@/components/blueprint/drawing-frame";
import { InView } from "@/components/in-view";
import { r, reveal } from "@/lib/motion-config";

export function About() {
  const a = site.about;
  return (
    <section id="about" aria-label="about" className="mx-auto max-w-[1100px] px-5 py-16 md:px-8">
      <SheetHeader n="05" name="ABOUT" title={a.heading} />

      {/* Mobile order: photo, text, bill of materials, credentials.
          Desktop: photo | text + credentials, then bill of materials full width. */}
      <div className="mt-10 grid gap-x-12 gap-y-12 lg:grid-cols-[300px_1fr]">
        <InView as="figure" className="m-0 max-w-[300px] self-start lg:row-span-2">
          <div className="relative">
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
              <p key={p}>{p}</p>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted">
            <span className="font-mono text-xs text-accent-text">LANGUAGES</span> · {a.languages}
          </p>
        </div>

        <div className="lg:col-span-2 lg:row-start-3">
          <h3 className="font-mono text-xs tracking-wide text-accent-text">BILL OF MATERIALS</h3>
          <InView as="dl" className="mt-3 border-t-2 border-ink">
            {a.bom.map((g, i) => (
              <div
                key={g.group}
                data-r="up"
                className="grid gap-1 border-b border-line py-3 sm:grid-cols-[96px_1fr]"
                style={r(0.05 + i * reveal.stagger)}
              >
                <dt className="font-mono text-xs text-muted">{g.group}</dt>
                <dd className="text-[15px]">
                  {/* each skill stays on one line; wrapping happens only between skills */}
                  {g.items.map((it, i) => (
                    <Fragment key={it}>
                      {i > 0 && " · "}
                      <span className="whitespace-nowrap">{it}</span>
                    </Fragment>
                  ))}
                </dd>
              </div>
            ))}
          </InView>
        </div>

        <div className="lg:col-start-2 lg:row-start-2">
          <h3 className="font-mono text-xs tracking-wide text-accent-text">CREDENTIALS</h3>
          <InView as="ul" className="mt-3 border-t-2 border-ink">
            {a.credentials.map((c, i) => (
              <li
                key={c.label}
                data-r="up"
                className="border-b border-line py-3 text-[15px]"
                style={r(0.05 + i * reveal.stagger)}
              >
                {c.href ? (
                  <a href={c.href} className="underline underline-offset-4 hover:text-accent-text">
                    {c.label} ↗
                  </a>
                ) : (
                  c.label
                )}
              </li>
            ))}
          </InView>
        </div>
      </div>
    </section>
  );
}
