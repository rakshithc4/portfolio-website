import type { ElementType, ReactNode } from "react";
import { InView } from "@/components/in-view";
import { r } from "@/lib/motion-config";

type Kind = "up" | "fade" | "draw" | "line-x" | "line-y" | "pop" | "wipe";

/** One element that reveals itself once when it scrolls into view (CSS: [data-r] in globals.css).
 *  For a group that reveals together, use <InView> with data-r children instead. */
export function Reveal({
  kind = "up",
  delay = 0,
  dur,
  y,
  as,
  className,
  children,
}: {
  kind?: Kind;
  delay?: number;
  dur?: number;
  y?: number;
  as?: ElementType;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <InView as={as} data-r={kind} className={className} style={r(delay, dur, y)}>
      {children}
    </InView>
  );
}
