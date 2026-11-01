// Hero bridge drawing. Static in step 1; animation is layered on later.
// Everything is drawn with CSS-variable colours so it works in both themes.
// viewBox 640 x 340. Deck at y=190-196, water at y=290.

const DECK_Y = 190;

// Arch is a quadratic curve: M90 250 Q320 -50 550 250.  x = 90+460t, y = 250-600t+600t^2.
const archY = (t: number) => 250 - 600 * t + 600 * t * t;
const HANGER_TS = [0.15, 0.2, 0.26, 0.32, 0.38, 0.44, 0.5, 0.56, 0.62, 0.68, 0.74, 0.8, 0.85];

/* ---- water line ---- */
function Water() {
  return (
    <path
      d={`M20 290 ${"q 15 -7 30 0 t 30 0 ".repeat(1)}${"t 30 0 ".repeat(19)}`}
      className="fill-none stroke-muted"
      strokeWidth="1"
    />
  );
}

/* ---- pylons ---- */
function Pylons() {
  return (
    <g className="fill-bg stroke-ink" strokeWidth="2">
      <rect x="52" y="130" width="36" height="160" />
      <rect x="552" y="130" width="36" height="160" />
      <path d="M52 150h36M552 150h36" strokeWidth="1" />
    </g>
  );
}

/* ---- deck ---- */
function Deck() {
  return (
    <g className="stroke-ink" strokeWidth="2">
      <line x1="30" x2="610" y1={DECK_Y} y2={DECK_Y} />
      <line x1="30" x2="610" y1={DECK_Y + 6} y2={DECK_Y + 6} strokeWidth="1" />
    </g>
  );
}

/* ---- main arch (two chords) ---- */
function Arch() {
  return (
    <g className="fill-none stroke-ink">
      <path d="M90 250 Q320 -50 550 250" strokeWidth="2.5" />
      <path d="M90 250 Q320 -20 550 250" strokeWidth="1" />
    </g>
  );
}

/* ---- hangers: arch down to deck, left to right ---- */
function Hangers() {
  return (
    <g className="stroke-ink" strokeWidth="1">
      {HANGER_TS.map((t) => (
        <line key={t} x1={90 + 460 * t} x2={90 + 460 * t} y1={archY(t)} y2={DECK_Y} />
      ))}
    </g>
  );
}

/* ---- dimension line with end ticks ---- */
function Dimension({ showText }: { showText: boolean }) {
  return (
    <g className="stroke-muted" strokeWidth="1">
      <line x1="90" x2="550" y1="314" y2="314" />
      <line x1="90" x2="90" y1="308" y2="320" />
      <line x1="550" x2="550" y1="308" y2="320" />
      {showText && (
        <text x="320" y="306" textAnchor="middle" className="fill-muted stroke-none font-mono" fontSize="13">
          SPAN · REQUEST → RESPONSE
        </text>
      )}
    </g>
  );
}

/* ---- callouts: numbered circles, leader lines, labels (labels hidden on small screens) ---- */
const CALLOUTS = [
  { n: 1, x: 70, y: 40, tx: 130, ty: 130, label: "BUSINESS PROCESS", side: "r" },
  { n: 2, x: 148, y: 72, tx: 182, ty: archY(0.2), label: "CDS DATA MODEL", side: "r" },
  { n: 3, x: 290, y: 40, tx: 290, ty: archY(0.435), label: "RAP BUSINESS OBJECT", side: "r" },
  { n: 4, x: 450, y: 72, tx: 450, ty: archY(0.783), label: "ODATA V4 SERVICE", side: "l" },
  { n: 5, x: 585, y: 40, tx: 585, ty: 130, label: "UI · FIORI", side: "l" },
] as const;

function Callouts() {
  return (
    <g>
      {CALLOUTS.map((c) => (
        <g key={c.n}>
          <line
            x1={c.x}
            y1={c.y + 9}
            x2={c.n === 1 ? 70 : c.tx}
            y2={c.n === 1 ? 130 : c.ty}
            className="stroke-muted"
            strokeWidth="1"
          />
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
      ))}
    </g>
  );
}

/* ---- the travelling request: starts at the left pylon (1 Business process) ---- */
function Request() {
  return <circle cx="70" cy={DECK_Y + 3} r="5.5" className="fill-accent" />;
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
        <Dimension showText />
        <Callouts />
        <Request />
      </svg>
      <div className="mt-1 flex flex-wrap justify-between gap-x-4 border-t border-line pt-2 font-mono text-sm text-muted">
        <span>DWG RCS-001 · BUSINESS → CODE</span>
        <span>SCALE 1:1 · SYDNEY</span>
      </div>
    </div>
  );
}
