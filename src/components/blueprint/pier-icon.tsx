// Small hand-drawn line icons for the construction log, one per pier.
// 32x32 grid, ink stroke from CSS variables, so they work in both themes.
import type { Pier } from "@/content/site";

const PATHS: Record<Pier["icon"], string> = {
  // house
  house: "M4 15 L16 5 L28 15 M7 13 V27 H25 V13 M13 27 V19 H19 V27",
  // books
  books: "M5 7 H10 V27 H5 Z M12 5 H17 V27 H12 Z M19 9 L24 7.5 L28 26.5 L23 28 Z",
  // plane
  plane: "M3 18 L29 6 L22 27 L16 19 Z M16 19 L29 6",
  // speech bubble
  speech: "M4 6 H28 V20 H14 L8 26 V20 H4 Z M10 11 H22 M10 15 H18",
  // gear
  gear: "M16 3 V8 M16 24 V29 M3 16 H8 M24 16 H29 M7 7 L10.5 10.5 M21.5 21.5 L25 25 M25 7 L21.5 10.5 M10.5 21.5 L7 25 M20 16 A4 4 0 1 1 12 16 A4 4 0 1 1 20 16",
  // blueprint sheet
  blueprint: "M4 6 H28 V26 H4 Z M4 12 H28 M10 6 V26 M15 17 H23 M15 21 H20",
  // flag on a pole
  flag: "M8 28 V4 M8 6 H25 L21 11 L25 16 H8",
};

export function PierIcon({ name, dashed = false }: { name: Pier["icon"]; dashed?: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 32 32"
      className="size-8 shrink-0 fill-none stroke-ink"
      strokeWidth="1.5"
      strokeDasharray={dashed ? "3 3" : undefined}
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
