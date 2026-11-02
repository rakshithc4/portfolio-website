// Hero bridge drawing, with the "drawing is made" intro.
// Server component: the intro is pure CSS (see globals.css), timings in lib/motion-config.ts.
// Everything uses CSS-variable colours so it works in both themes.
// viewBox 640 x 340. Deck at y=190-196, water at y=290. Callouts and the dot live in bridge-live.tsx.
import { intro, t } from "@/lib/motion-config";
import { DECK_Y, HANGER_TS, archY } from "./bridge-geometry";
import { BridgeLive } from "./bridge-live";

/* ---- water line ---- */
function Water() {
  return (
    <path
      pathLength={1}
      d={`M20 290 q 15 -7 30 0 ${"t 30 0 ".repeat(19)}`}
      className="draw fill-none stroke-muted"
      strokeWidth="1"
      style={t(intro.water.delay, intro.water.dur)}
    />
  );
}

/* ---- pylons ---- */
function Pylons() {
  const s = t(intro.pylons.delay, intro.pylons.dur);
  return (
    <g className="fill-bg stroke-ink" strokeWidth="2">
      <rect pathLength={1} className="draw" style={s} x="52" y="130" width="36" height="160" />
      <rect pathLength={1} className="draw" style={s} x="552" y="130" width="36" height="160" />
      <path pathLength={1} className="draw" style={s} d="M52 150h36" strokeWidth="1" />
      <path pathLength={1} className="draw" style={s} d="M552 150h36" strokeWidth="1" />
    </g>
  );
}

/* ---- deck ---- */
function Deck() {
  const s = t(intro.deck.delay, intro.deck.dur);
  return (
    <g className="stroke-ink" strokeWidth="2">
      <line pathLength={1} className="draw" style={s} x1="30" x2="610" y1={DECK_Y} y2={DECK_Y} />
      <line pathLength={1} className="draw" style={s} x1="30" x2="610" y1={DECK_Y + 6} y2={DECK_Y + 6} strokeWidth="1" />
    </g>
  );
}

/* ---- main arch (two chords) ---- */
function Arch() {
  return (
    <g className="fill-none stroke-ink">
      <path pathLength={1} className="draw" style={t(intro.arch.delay, intro.arch.dur)} d="M90 250 Q320 -50 550 250" strokeWidth="2.5" />
      <path pathLength={1} className="draw" style={t(intro.arch.delay + 0.05, intro.arch.dur)} d="M90 250 Q320 -20 550 250" strokeWidth="1" />
    </g>
  );
}

/* ---- hangers: arch down to deck, dropping in left to right ---- */
function Hangers() {
  return (
    <g className="stroke-ink" strokeWidth="1">
      {HANGER_TS.map((ht, i) => (
        <line
          key={ht}
          pathLength={1}
          className="draw"
          style={t(intro.hangers.delay + i * intro.hangers.stagger, intro.hangers.dur)}
          x1={90 + 460 * ht}
          x2={90 + 460 * ht}
          y1={archY(ht)}
          y2={DECK_Y}
        />
      ))}
    </g>
  );
}

/* ---- dimension line with end ticks ---- */
function Dimension() {
  const s = t(intro.dimension.delay, intro.dimension.dur);
  return (
    <g className="stroke-muted" strokeWidth="1">
      <line pathLength={1} className="draw" style={s} x1="90" x2="550" y1="314" y2="314" />
      <line pathLength={1} className="draw" style={s} x1="90" x2="90" y1="308" y2="320" />
      <line pathLength={1} className="draw" style={s} x1="550" x2="550" y1="308" y2="320" />
      <text
        x="320"
        y="306"
        textAnchor="middle"
        className="fade fill-muted stroke-none font-mono"
        style={s}
        fontSize="13"
      >
        SPAN · REQUEST → RESPONSE
      </text>
    </g>
  );
}

export function BridgeHero() {
  return (
    <div>
      <svg viewBox="0 0 640 340" aria-hidden className="block h-auto w-full">
        <Water />
        <Pylons />
        <Deck />
        <Arch />
        <Hangers />
        <Dimension />
        {/* callouts + travelling request dot (client: scroll-linked) */}
        <BridgeLive />
      </svg>
      {/* title block */}
      <div
        className="fade mt-1 border-t border-line pt-2 pr-24 font-mono text-sm text-muted md:pr-28"
        style={t(intro.titleBlock.delay, intro.titleBlock.dur)}
      >
        {/* the seal (hero.tsx) sits in the right of this block, so scale/Sydney live there */}
        DWG RCS-001 · BUSINESS → CODE
      </div>
    </div>
  );
}
