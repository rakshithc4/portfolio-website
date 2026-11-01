import { site } from "@/content/site";
import { SheetHeader } from "@/components/blueprint/sheet-header";
import { InView } from "@/components/in-view";
import { r } from "@/lib/motion-config";

// Timeline as a bridge deck: horizontal on desktop, vertical on mobile.
// The deck draws, then each role hangs from it: hanger drops, node appears, text fades in beside it.
export function Experience() {
  return (
    <section id="experience" aria-label="experience" className="mx-auto max-w-[1100px] px-5 py-16 md:px-8">
      <SheetHeader n="04" name="EXPERIENCE" title={site.experience.heading} />
      <InView className="relative mt-12">
        {/* deck line */}
        <span aria-hidden data-r="line-y" className="absolute bottom-0 left-0 top-0 w-0 border-l-2 border-ink md:hidden" style={r(0, 0.8)} />
        <span aria-hidden data-r="line-x" className="absolute inset-x-0 top-0 hidden h-0 border-t-2 border-ink md:block" style={r(0, 0.8)} />
        <ol className="grid gap-10 pl-6 md:grid-cols-3 md:gap-8 md:pl-0">
          {site.experience.roles.map((role, i) => {
            const b = 0.2 + i * 0.2; // staggered, left to right
            return (
              <InView as="li" key={role.title} className="relative md:pt-10">
                {/* hanger drops from the deck */}
                <span
                  aria-hidden
                  data-r="hang"
                  className="absolute -left-6 top-3 h-px w-6 bg-ink md:left-3 md:top-0 md:h-9 md:w-px"
                  style={r(b, 0.35)}
                />
                <span
                  aria-hidden
                  data-r="pop"
                  className="absolute -left-[30px] top-[7px] size-2 rounded-full border-2 border-ink bg-bg md:left-[8px] md:top-8"
                  style={r(b + 0.3, 0.3)}
                />
                <div data-r="up" style={r(b + 0.3)}>
                  <p className="font-mono text-xs text-accent-text">{role.dates}</p>
                  <h3 className="mt-1 text-lg font-semibold leading-snug">{role.title}</h3>
                  <p className="text-muted">{role.org}</p>
                  <p className="mt-3 text-[15px]">{role.text}</p>
                </div>
              </InView>
            );
          })}
        </ol>
      </InView>
    </section>
  );
}
