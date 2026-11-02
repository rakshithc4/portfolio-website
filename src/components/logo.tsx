import { SEAL_TEXT_D } from "@/components/seal-text";
import { t } from "@/lib/motion-config";

// Brand marks. Geometry matches public/brand/mark.svg and seal.svg (the masters).
// Ink is currentColor, so set it with a text-* class; the request dot is --accent.
const STROKE = { fill: "none", stroke: "currentColor", strokeWidth: 8 } as const;

/** The R-on-the-deck paths in the 4 4 58 54 box. `draw` strokes them in once (header). */
export function MarkPaths({ draw = false }: { draw?: boolean }) {
  const d = (delay: number, dur: number) =>
    draw ? { className: "draw", pathLength: 1, style: t(delay, dur) } : {};
  return (
    <>
      <path d="M16 54V10H33A13 13 0 0 1 33 36H16" {...STROKE} {...d(0, 0.5)} />
      <path d="M30 36L46 54" {...STROKE} {...d(0.35, 0.3)} />
      <path d="M6 36H44" {...STROKE} {...d(0.2, 0.4)} />
      <circle
        cx="54"
        cy="36"
        r="6"
        className="fill-accent"
        {...(draw ? { style: { opacity: 0, animation: "fade 0.2s ease-out 0.7s forwards" } } : {})}
      />
    </>
  );
}

/** Primary mark. Use at any size. Decorative by default; pass `label` when it stands alone. */
export function Mark({ className = "", draw = false, label }: { className?: string; draw?: boolean; label?: string }) {
  return (
    <svg
      viewBox="4 4 58 54"
      className={className}
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
    >
      <MarkPaths draw={draw} />
    </svg>
  );
}

/** Engineer's seal. Only for >= 96px: it reads as a (R) when smaller. */
export function Seal({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className}>
      <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="2.6" />
      <circle cx="32" cy="32" r="17" fill="none" stroke="currentColor" strokeWidth="1.8" />
      {/* ring text as outlines, so it renders the same everywhere (generated, see seal-text.ts) */}
      <path d={SEAL_TEXT_D} fill="currentColor" />
      <g transform="translate(32 32) scale(.46) translate(-33 -31)">
        <MarkPaths />
      </g>
    </svg>
  );
}
