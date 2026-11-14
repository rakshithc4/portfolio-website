import { r } from "@/lib/motion-config";

// Per-project mini span: the project's own process as nodes on a deck (labels from site.ts `flow`).
// Inside a [data-in] card: the deck draws left to right and the nodes (and their labels)
// light in sequence. On hover (pointer devices) a small orange dot runs across once (CSS: .span-runner).
const DRAW = 0.8; // seconds for the deck to draw
export const nodeDelay = (i: number, n: number) => 0.1 + (i / (n - 1)) * (DRAW - 0.2);

export function SpanDiagram({ labels }: { labels: string[] }) {
  const n = labels.length;
  // each node sits above the centre of its label column
  const x = (i: number) => `${((i + 0.5) / n) * 100}%`;
  return (
    <figure aria-label={`Process: ${labels.join(", then ")}`} className="m-0">
      <div className="relative">
        <svg aria-hidden className="h-6 w-full overflow-visible">
          {/* deck */}
          <line data-r="draw" pathLength={1} x1={x(0)} x2={x(n - 1)} y1="12" y2="12" className="stroke-ink" strokeWidth="2" style={r(0, DRAW)} />
          {/* nodes: the last one is the delivered result */}
          {labels.map((l, i) => (
            <circle
              key={l}
              data-r="pop"
              cx={x(i)}
              cy="12"
              r="5"
              className={i === n - 1 ? "fill-accent stroke-accent" : "fill-bg stroke-ink"}
              strokeWidth="1.5"
              style={r(nodeDelay(i, n), 0.3)}
            />
          ))}
        </svg>
        {/* hover runner: box spans the deck; its ::after dot rides the right edge */}
        <span aria-hidden className="span-runner pointer-events-none absolute top-0 h-6" style={{ left: x(0), width: `${((n - 1) / n) * 100}%` }} />
      </div>
      <ol className="mt-1 grid text-center font-mono text-[11px] leading-tight text-muted sm:text-[13px]" style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}>
        {labels.map((l, i) => (
          <li key={l} data-r="fade" className="px-0.5" style={r(nodeDelay(i, n), 0.3)}>
            {l}
          </li>
        ))}
      </ol>
    </figure>
  );
}
