import { r } from "@/lib/motion-config";

// Per-project mini span: 5 nodes on a deck, Problem -> UI.
// Inside a [data-in] card: the deck draws left to right and the nodes (and their labels)
// light in sequence. On hover (pointer devices) a small orange dot runs across once (CSS: .span-runner).
const LABELS = ["Problem", "Data", "Logic", "Service", "UI"];
const XS = ["10%", "30%", "50%", "70%", "90%"];
const DRAW = 0.8; // seconds for the deck to draw
export const nodeDelay = (i: number) => 0.1 + (i / 4) * (DRAW - 0.2);

export function SpanDiagram() {
  return (
    <figure aria-label="Project span: problem, data, logic, service, UI" className="m-0">
      <div className="relative">
        <svg aria-hidden className="h-6 w-full overflow-visible">
          {/* deck */}
          <line
            data-r="draw"
            pathLength={1}
            x1="10%"
            x2="90%"
            y1="12"
            y2="12"
            className="stroke-ink"
            strokeWidth="2"
            style={r(0, DRAW)}
          />
          {/* nodes */}
          {XS.map((x, i) => (
            <circle
              key={x}
              data-r="pop"
              cx={x}
              cy="12"
              r="5"
              className={i === 4 ? "fill-accent stroke-accent" : "fill-bg stroke-ink"}
              strokeWidth="1.5"
              style={r(nodeDelay(i), 0.3)}
            />
          ))}
        </svg>
        {/* hover runner: box spans the deck; its ::after dot rides the right edge */}
        <span aria-hidden className="span-runner pointer-events-none absolute left-[10%] top-0 h-6 w-[80%]" />
      </div>
      <ol className="mt-1 grid grid-cols-5 text-center font-mono text-[13px] leading-tight text-muted">
        {LABELS.map((l, i) => (
          <li key={l} data-r="fade" className="whitespace-nowrap" style={r(nodeDelay(i), 0.3)}>
            {l}
          </li>
        ))}
      </ol>
    </figure>
  );
}
