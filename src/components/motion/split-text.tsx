import { Fragment } from "react";
import { dur, r, stagger, t } from "@/lib/motion-config";

/** Word-by-word reveal. Words are inline-blocks with real spaces between them, so the text
 *  reads, wraps, copies and is announced exactly like plain text. No JS: pure CSS.
 *  Default plays on load (.word). `inView` plays when an <InView> ancestor scrolls in. */
export function SplitText({
  text,
  delay = 0,
  step = stagger.words,
  inView = false,
  className,
}: {
  text: string;
  delay?: number;
  step?: number;
  inView?: boolean;
  className?: string;
}) {
  return (
    <span className={className}>
      {text.split(" ").map((w, i) => (
        <Fragment key={i}>
          {i > 0 && " "}
          <span
            className={inView ? "inline-block" : "word"}
            {...(inView ? { "data-r": "up" } : {})}
            style={inView ? r(delay + i * step, dur.slow, 6) : t(delay + i * step, dur.slow)}
          >
            {w}
          </span>
        </Fragment>
      ))}
    </span>
  );
}
