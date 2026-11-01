import type { CSSProperties } from "react";

// Single place for animation timings and easing (seconds).
// The hero intro is CSS-driven (see globals.css `.draw/.fade/.rise/.pulse`) so it
// runs without JS and never flashes at hydration. These values reach CSS through
// the --delay / --dur / --ease custom properties set by `t()`.

export const EASE = "cubic-bezier(0.22, 1, 0.36, 1)"; // ease-out, no overshoot

/** Hero intro timeline. Drawing + callouts finish by ~1.75s; dot pulse ends ~2.15s. */
export const intro = {
  water: { delay: 0, dur: 0.25 },
  pylons: { delay: 0.1, dur: 0.3 },
  deck: { delay: 0.25, dur: 0.3 },
  arch: { delay: 0.4, dur: 0.5 },
  hangers: { delay: 0.7, stagger: 0.03, dur: 0.2 }, // left to right
  dimension: { delay: 1.1, dur: 0.25 },
  titleBlock: { delay: 1.2, dur: 0.25 },
  callouts: { delay: 1.1, stagger: 0.1, dur: 0.25 }, // 1 to 5
  dot: { delay: 1.7, dur: 0.2 },
  pulse: { delay: 1.75, dur: 0.4 },
  // Hero text: fade-and-rise, short stagger, starts immediately.
  text: { stagger: 0.07, dur: 0.5 },
} as const;

type Vars = CSSProperties & Record<`--${string}`, string>;

/** Inline-style helper: timing for one animated element. */
export const t = (delay: number, dur: number): Vars => ({
  "--delay": `${delay}s`,
  "--dur": `${dur}s`,
  "--ease": EASE,
});

/** Nth hero text block (0-based). */
export const textStep = (n: number) => t(n * intro.text.stagger, intro.text.dur);

/** Scroll-triggered entries (play once). Used through the `r()` helper -> CSS in globals.css. */
export const reveal = {
  dur: 0.5,
  y: 12, // fade-up distance for content
  headerY: 8, // fade-up distance for sheet labels/headings
  ruleDur: 0.7, // hairline rule draws across
  stagger: 0.06, // list rows
  count: 0.8, // count-ups
} as const;

/** Timing (and optional rise distance in px) for one scroll-revealed element. */
export const r = (delay = 0, dur: number = reveal.dur, y?: number): Vars => ({
  ...t(delay, dur),
  ...(y === undefined ? {} : { "--y": `${y}px` }),
});

/** Construction log: piers rise in order, then the unfinished span draws last. */
export const journey = {
  deckDur: 1.0, // solid deck draws left to right
  pierStart: 0.2,
  pierStep: 0.15, // stagger between piers
  stemLag: 0.12, // node -> stem
  cardLag: 0.3, // node -> card
  dashedDeckDelay: 1.3, // last: the dashed span
} as const;
