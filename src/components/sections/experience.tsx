import { site } from "@/content/site";
import { SheetHeader } from "@/components/blueprint/sheet-header";

// Timeline as a bridge deck: horizontal on desktop, vertical on mobile.
// Each role hangs from the deck on a hanger line.
export function Experience() {
  return (
    <section id="experience" aria-label="experience" className="mx-auto max-w-[1100px] px-5 py-16 md:px-8">
      <SheetHeader n="04" name="EXPERIENCE" title={site.experience.heading} />
      <ol className="mt-12 grid gap-10 border-l-2 border-ink pl-6 md:grid-cols-3 md:gap-8 md:border-l-0 md:border-t-2 md:pl-0">
        {site.experience.roles.map((r) => (
          <li key={r.title} className="relative md:pt-10">
            {/* hanger */}
            <span aria-hidden className="absolute -left-6 top-3 h-px w-6 bg-ink md:left-3 md:top-0 md:h-9 md:w-px" />
            <span aria-hidden className="absolute -left-[30px] top-[7px] size-2 rounded-full border-2 border-ink bg-bg md:left-[8px] md:top-8" />
            <p className="font-mono text-xs text-accent-text">{r.dates}</p>
            <h3 className="mt-1 text-lg font-semibold leading-snug">{r.title}</h3>
            <p className="text-muted">{r.org}</p>
            <p className="mt-3 text-[15px]">{r.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
