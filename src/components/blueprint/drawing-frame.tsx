import { r } from "@/lib/motion-config";

// Frames an illustration with corner brackets. `grid` adds the faint drawing grid
// (only ever inside panels, never behind body text).
// `animate`: when the nearest [data-in] ancestor scrolls into view the brackets slide
// ~6px into place; `veil` fades a light blueprint tint off the content.
export function DrawingFrame({
  children,
  grid = false,
  animate = false,
  veil = false,
  className = "",
}: {
  children: React.ReactNode;
  grid?: boolean;
  animate?: boolean;
  veil?: boolean;
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
    <div className={`relative p-3 ${grid ? "grid-paper" : "bg-panel"} ${className}`}>
      {corner("left-0 top-0", "border-l-2 border-t-2", "-6px", "-6px")}
      {corner("right-0 top-0", "border-r-2 border-t-2", "6px", "-6px")}
      {corner("bottom-0 left-0", "border-b-2 border-l-2", "-6px", "6px")}
      {corner("bottom-0 right-0", "border-b-2 border-r-2", "6px", "6px")}
      {children}
      {veil && (
        <span
          aria-hidden
          data-r="veil"
          className="pointer-events-none absolute inset-3 bg-panel"
          style={r(0.15, 0.8)}
        />
      )}
    </div>
  );
}
