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
                className={`flex items-center gap-2 py-0.5 transition-colors duration-150 hover:text-ink ${
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

/** Mobile / small laptops (<1440px): 2px orange progress line, drawn under the nav. */
export function ProgressLine() {
  const { reduced, page, active } = useSpanProgress();
  return (
    <motion.div
      aria-hidden
      className="absolute inset-x-0 -bottom-px h-0.5 origin-left bg-accent min-[1440px]:hidden"
      style={{ scaleX: reduced ? (active + 1) / SPAN_IDS.length : page }}
    />
  );
}
