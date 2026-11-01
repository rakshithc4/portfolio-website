// Hero bridge drawing, with the "drawing is made" intro.
// Server component: the intro is pure CSS (see globals.css), timings in lib/motion-config.ts.
// Everything uses CSS-variable colours so it works in both themes.
// viewBox 640 x 340. Deck at y=190-196, water at y=290.
import { intro, t } from "@/lib/motion-config";

const DECK_Y = 190;

// Arch is a quadratic curve: M90 250 Q320 -50 550 250.  x = 90+460t, y = 250-600t+600t^2.
const archY = (t: number) => 250 - 600 * t + 600 * t * t;
const HANGER_TS = [0.15, 0.2, 0.26, 0.32, 0.38, 0.44, 0.5, 0.56, 0.62, 0.68, 0.74, 0.8, 0.85];

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

/* ---- callouts: numbered circles, leader lines, labels (labels hidden on small screens) ---- */
const CALLOUTS = [
  { n: 1, x: 70, y: 40, tx: 70, ty: 130, label: "BUSINESS PROCESS", side: "r" },
  { n: 2, x: 148, y: 72, tx: 182, ty: archY(0.2), label: "CDS DATA MODEL", side: "r" },
  { n: 3, x: 290, y: 40, tx: 290, ty: archY(0.435), label: "RAP BUSINESS OBJECT", side: "r" },
  { n: 4, x: 450, y: 72, tx: 450, ty: archY(0.783), label: "ODATA V4 SERVICE", side: "l" },
  { n: 5, x: 585, y: 40, tx: 585, ty: 130, label: "UI · FIORI", side: "l" },
] as const;

function Callouts() {
  return (
    <g>
      {CALLOUTS.map((c, i) => {
        const s = t(intro.callouts.delay + i * intro.callouts.stagger, intro.callouts.dur);
        return (
          <g key={c.n}>
            {/* leader line draws to the bridge */}
            <line
              pathLength={1}
              className="draw stroke-muted"
              style={s}
              x1={c.x}
              y1={c.y + 9}
              x2={c.tx}
              y2={c.ty}
              strokeWidth="1"
            />
            <g className="fade" style={s}>
              <circle cx={c.x} cy={c.y} r="9" className="fill-bg stroke-ink" strokeWidth="1.5" />
              <text x={c.x} y={c.y + 4.5} textAnchor="middle" className="fill-ink font-mono" fontSize="13" fontWeight="600">
                {c.n}
              </text>
              <text
                x={c.side === "r" ? c.x + 14 : c.x - 14}
                y={c.y + 4.5}
                textAnchor={c.side === "r" ? "start" : "end"}
                className="hidden fill-ink font-mono md:inline"
                fontSize="13"
              >
                {c.label}
              </text>
            </g>
          </g>
        );
      })}
    </g>
  );
}

/* ---- the travelling request: appears at the left pylon (1 Business process), pulses once ---- */
function Request() {
  return (
    <g>
      <circle
        cx="70"
        cy={DECK_Y + 3}
        r="5.5"
        className="pulse fill-accent"
        style={t(intro.pulse.delay, intro.pulse.dur)}
      />
      <circle
        cx="70"
        cy={DECK_Y + 3}
        r="5.5"
        className="fade fill-accent"
        style={t(intro.dot.delay, intro.dot.dur)}
      />
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
        <Callouts />
        <Request />
      </svg>
      {/* title block */}
      <div
        className="fade mt-1 flex flex-wrap justify-between gap-x-4 border-t border-line pt-2 font-mono text-sm text-muted"
        style={t(intro.titleBlock.delay, intro.titleBlock.dur)}
      >
        <span>DWG RCS-001 · BUSINESS → CODE</span>
        <span>SCALE 1:1 · SYDNEY</span>
      </div>
    </div>
  );
}
