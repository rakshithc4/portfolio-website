import { Parallax } from "@/components/motion/parallax";
import { css, ease, intro, r, t } from "@/lib/motion-config";

// Major grid lines every 80px (= 5 minor squares). Enough to cover the largest panel; extras are clipped.
const MAJOR_X = [80, 160, 240, 320, 400, 480, 560];
const MAJOR_Y = [80, 160, 240, 320];

// Frames an illustration with corner brackets. `grid` adds the faint drawing grid
// (only ever inside panels, never behind body text): on load the major lines rule themselves in
// while the fine grid fades up, and the sheet drifts ~1px against the mouse (see Parallax).
// `animate`: when the nearest [data-in] ancestor scrolls into view the brackets slide
// ~6px into place; `wipe` uncovers the content left to right (clip-path).
export function DrawingFrame({
  children,
  grid = false,
  animate = false,
  wipe = false,
  className = "",
}: {
  children: React.ReactNode;
  grid?: boolean;
  animate?: boolean;
  wipe?: boolean;
  className?: string;
}) {
  const bracket = "absolute size-4 border-ink pointer-events-none";
  const corner = (pos: string, borders: string, bx: string, by: string) => (
    <span
      aria-hidden
      className={`${bracket} ${pos} ${borders}`}
      {...(animate ? { "data-r": "bracket", style: { ...r(0.1, 0.5), "--bx": bx, "--by": by } as React.CSSProperties } : {})}
    />
  );
  return (
    <div data-drawing className={`relative bg-panel p-3 ${grid ? "overflow-hidden" : ""} ${className}`}>
      {grid && (
        <div aria-hidden className="pointer-events-none absolute -inset-1">
          <Parallax depth={-1.5} className="absolute inset-0">
            <div className="fade grid-paper absolute inset-0" style={t(intro.grid.delay, intro.grid.dur)} />
            <svg className="absolute inset-0 size-full fill-none stroke-line" strokeWidth="1">
              {MAJOR_X.map((x, i) => (
                <line key={x} pathLength={1} className="draw" x1={x + 0.5} x2={x + 0.5} y1="0" y2="100%" style={t(intro.grid.delay + i * intro.grid.stagger, intro.grid.dur)} />
              ))}
              {MAJOR_Y.map((y, i) => (
                <line key={y} pathLength={1} className="draw" x1="0" x2="100%" y1={y + 0.5} y2={y + 0.5} style={t(intro.grid.delay + i * intro.grid.stagger, intro.grid.dur)} />
              ))}
            </svg>
          </Parallax>
        </div>
      )}
      {corner("left-0 top-0", "border-l-2 border-t-2", "-6px", "-6px")}
      {corner("right-0 top-0", "border-r-2 border-t-2", "6px", "-6px")}
      {corner("bottom-0 left-0", "border-b-2 border-l-2", "-6px", "6px")}
      {corner("bottom-0 right-0", "border-b-2 border-r-2", "6px", "6px")}
      <div className="relative" {...(wipe ? { "data-r": "wipe", style: { ...r(0.15, 0.8), "--ease": css(ease.inOut) } as React.CSSProperties } : {})}>
        {children}
      </div>
    </div>
  );
}
