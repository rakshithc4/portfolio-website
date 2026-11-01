import Image from "next/image";
import { site } from "@/content/site";
import { SheetHeader } from "@/components/blueprint/sheet-header";
import { DrawingFrame } from "@/components/blueprint/drawing-frame";

export function About() {
  const a = site.about;
  return (
    <section id="about" aria-label="about" className="mx-auto max-w-[1100px] px-5 py-16 md:px-8">
      <SheetHeader n="05" name="ABOUT" title={a.heading} />

      <div className="mt-10 grid gap-12 md:grid-cols-[300px_1fr]">
        <figure className="m-0 max-w-[300px] self-start">
          <DrawingFrame>
            <Image
              src={a.photo.src}
              alt={a.photo.alt}
              width={a.photo.width}
              height={a.photo.height}
              sizes="300px"
              className="h-auto w-full"
            />
          </DrawingFrame>
          <figcaption className="mt-2 font-mono text-[11px] text-muted">{a.caption}</figcaption>
        </figure>

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
      </div>

      <div className="mt-14 grid gap-12 md:grid-cols-2">
        <div>
          <h3 className="font-mono text-xs tracking-wide text-accent-text">BILL OF MATERIALS</h3>
          <dl className="mt-3 border-t-2 border-ink">
            {a.bom.map((g) => (
              <div key={g.group} className="grid gap-1 border-b border-line py-3 sm:grid-cols-[96px_1fr]">
                <dt className="font-mono text-xs text-muted">{g.group}</dt>
                <dd className="text-[15px]">{g.items.join(" · ")}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <h3 className="font-mono text-xs tracking-wide text-accent-text">CREDENTIALS</h3>
          <ul className="mt-3 border-t-2 border-ink">
            {a.credentials.map((c) => (
              <li key={c.label} className="border-b border-line py-3 text-[15px]">
                {c.href ? (
                  <a href={c.href} className="underline underline-offset-4 hover:text-accent-text">
                    {c.label} ↗
                  </a>
                ) : (
                  c.label
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
