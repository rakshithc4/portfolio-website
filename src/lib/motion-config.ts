import type { CSSProperties } from "react";

// Single place for animation timings and easing (seconds).
// The hero intro is CSS-driven (see globals.css `.draw/.fade/.rise/.pulse`) so it
// runs without JS and never flashes at hydration. These values reach CSS through
// the --delay / --dur / --ease custom properties set by `t()`.

/** Durations (seconds). Nothing one-shot runs longer than `draw`. */
export const dur = { fast: 0.15, base: 0.3, slow: 0.5, draw: 0.8 } as const;

/** Easing curves as cubic-bezier points. No bounce, no elastic. */
export const ease = {
  out: [0.22, 1, 0.36, 1], // default: quick start, long settle
  inOut: [0.65, 0, 0.35, 1], // things that travel (wipes, sweeps)
  stamp: [0.5, 0, 0.9, 0.4], // accelerates into the paper: the contact stamp
} as const;
export const css = (e: readonly number[]) => `cubic-bezier(${e.join(", ")})`;
export const EASE = css(ease.out);

/** Stagger steps (seconds). */
export const stagger = { words: 0.04, tags: 0.03, rows: 0.06 } as const;

/** Spring shared by everything that follows scroll or the pointer. */
export const SPRING = { stiffness: 140, damping: 26, mass: 0.5 } as const;

/** Hero intro timeline. The drawing is complete by ~1.3s; the dot's pulse ends at 1.5s.
 *  Any scroll, key or tap skips straight to the end (html[data-skip], see layout.tsx). */
export const intro = {
  grid: { delay: 0, stagger: 0.02, dur: 0.4 }, // major grid lines rule themselves in
  water: { delay: 0, dur: 0.25 },
  pylons: { delay: 0.05, dur: 0.25 },
  deck: { delay: 0.15, dur: 0.25 },
  arch: { delay: 0.25, dur: 0.45 },
  hangers: { delay: 0.5, stagger: 0.02, dur: 0.18 }, // left to right
  dimension: { delay: 0.8, dur: 0.2 },
  titleBlock: { delay: 0.85, dur: 0.2 },
  callouts: { delay: 0.8, stagger: 0.08, dur: 0.2 }, // 1 to 5, each lights as it lands
  dot: { delay: 1.25, dur: 0.15 },
  pulse: { delay: 1.3, dur: 0.2 },
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
