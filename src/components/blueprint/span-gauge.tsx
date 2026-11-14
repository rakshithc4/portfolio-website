"use client";

import { motion, useTransform } from "motion/react";
import { MarkPaths } from "@/components/logo";
import { site } from "@/content/site";
import { SPAN_IDS, TICKS, useSpanProgress } from "@/lib/use-span-progress";

// Miniature bridge profile, viewBox 160 x 56. Pylons at x=7 and x=153, deck at y=36.
const X0 = 10;
const X1 = 150;
const tickX = (f: number) => X0 + f * (X1 - X0);

/** Desktop (>=1440px, in the left margin): reading progress as the request crossing the span. */
export function SpanGauge() {
  const { reduced, smooth, active, visible } = useSpanProgress();
  const x = useTransform(smooth, (f) => tickX(f));
  // Reduced motion: no scrubbing. The dot just sits on the current section's tick.
  const staticX = active < 0 ? X0 : tickX(TICKS[active]);
  const labels = site.nav.filter((n) => (SPAN_IDS as readonly string[]).includes(n.id));

  return (
    <aside
      aria-label="Page progress"
      inert={!visible}
      data-paused={visible ? "false" : "true"}
      className={`fixed left-4 top-1/2 z-30 hidden w-40 -translate-y-1/2 transition-opacity duration-300 min-[1440px]:block ${
        visible ? "opacity-60 focus-within:opacity-100 hover:opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <svg aria-hidden viewBox="0 0 160 56" className="block w-full fill-none">
        {/* water */}
        <path d="M4 50 q6 -3 12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0" className="stroke-line" strokeWidth="1" />
        {/* pylons */}
        <rect x="4" y="22" width="7" height="28" className="fill-bg stroke-ink" strokeWidth="1.5" />
        <rect x="149" y="22" width="7" height="28" className="fill-bg stroke-ink" strokeWidth="1.5" />
        {/* arch */}
        <path d="M10 44 Q80 -14 150 44" className="stroke-ink" strokeWidth="1.5" />
        {/* deck */}
        <line x1="4" x2="156" y1="36" y2="36" className="stroke-ink" strokeWidth="1.5" />
        {/* section ticks */}
        {TICKS.map((f, i) => (
          <line
            key={f}
            x1={tickX(f)}
            x2={tickX(f)}
            y1="31"
            y2="41"
            className={i === active ? "stroke-accent" : "stroke-ink"}
            strokeWidth="1.5"
          />
        ))}
        {/* end cap: the mark, above the far pylon */}
        <g transform="translate(138 1) scale(.34) translate(-4 -4)" className="text-ink">
          <MarkPaths />
        </g>
        {/* the request */}
        <motion.g style={{ x: reduced ? staticX : x }}>
          <circle cx="0" cy="36" r="3.5" className="ambient breathe fill-accent" />
        </motion.g>
      </svg>
      <nav aria-label="Jump to section" className="mt-2">
        <ul className="grid gap-0.5 font-mono text-[11px]">
          {labels.map((n, i) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                aria-label={`Go to ${n.label}`}
                aria-current={i === active ? "true" : undefined}
                className={`flex items-center gap-2 py-1 transition-colors duration-150 hover:text-ink ${
                  i === active ? "text-accent-text" : "text-muted"
                }`}
              >
                <span aria-hidden>{String(i + 2).padStart(2, "0")}</span>
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

/** Below 1440px: reading progress as a measure line under the nav. A tick marks where each
 *  section starts; the orange rule is how far the request has travelled (transform only). */
export function SectionProgress() {
  const { reduced, smooth, active } = useSpanProgress();
  // Reduced motion: no scrubbing. The rule just reaches the current section's tick.
  const staticF = active < 0 ? 0 : TICKS[active];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-full h-1.5 min-[1440px]:hidden">
      {TICKS.map((f, i) => (
        <span
          key={f}
          className={`absolute top-0 h-1.5 w-px transition-colors duration-200 ${i <= active ? "bg-accent" : "bg-muted"}`}
          style={{ left: `${f * 100}%` }}
        />
      ))}
      <motion.div className="absolute inset-x-0 -top-px h-0.5 origin-left bg-accent" style={{ scaleX: reduced ? staticF : smooth }} />
    </div>
  );
}
