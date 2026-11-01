// Link arrow that nudges 2px on hover/focus of its parent link (CSS: .arrow in globals.css).
const GLYPH = { ne: "↗", e: "→", s: "↓" } as const;

export function Arrow({ dir }: { dir: keyof typeof GLYPH }) {
  return (
    <span aria-hidden className={`arrow arrow-${dir}`}>
      {GLYPH[dir]}
    </span>
  );
}
