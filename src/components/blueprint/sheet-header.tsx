import { InView } from "@/components/in-view";
import { Mark } from "@/components/logo";
import { r, reveal } from "@/lib/motion-config";

// Section opener styled as a drawing sheet: hairline rule draws across,
// then the orange mono label and the heading fade up 8px. Plays once.
export function SheetHeader({
  n,
  name,
  title,
  as: Tag = "h2",
  headingDelay = 0.25,
}: {
  n: string;
  name: string;
  title: string;
  as?: "h1" | "h2";
  /** Seconds before the heading appears (the contact sheet waits for its drawing). */
  headingDelay?: number;
}) {
  return (
    <InView>
      <div data-r="line-x" className="h-px w-full bg-line" aria-hidden style={r(0, reveal.ruleDur)} />
      <p data-r="up" className="mt-6 flex items-center gap-2 font-mono text-xs tracking-wide text-accent-text" style={r(0.15, 0.5, reveal.headerY)}>
        <Mark className="h-3.5 w-auto text-ink" />
        SHEET {n} · {name}
      </p>
      <Tag data-r="up" className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl" style={r(headingDelay, 0.5, reveal.headerY)}>
        {title}
      </Tag>
    </InView>
  );
}
