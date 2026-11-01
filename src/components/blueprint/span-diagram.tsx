// Per-project mini span: 5 nodes on a deck, Problem -> UI.
// Percent coordinates keep it responsive without a viewBox.
const LABELS = ["Problem", "Data", "Logic", "Service", "UI"];

export function SpanDiagram() {
  const xs = ["10%", "30%", "50%", "70%", "90%"];
  return (
    <figure aria-label="Project span: problem, data, logic, service, UI" className="m-0">
      <svg aria-hidden className="h-6 w-full overflow-visible">
        {/* deck */}
        <line x1="10%" x2="90%" y1="12" y2="12" className="stroke-ink" strokeWidth="2" />
        {/* nodes */}
        {xs.map((x, i) => (
          <circle
            key={x}
            cx={x}
            cy="12"
            r="5"
            className={i === 4 ? "fill-accent stroke-accent" : "fill-bg stroke-ink"}
            strokeWidth="1.5"
          />
        ))}
      </svg>
      <ol className="mt-1 grid grid-cols-5 text-center font-mono text-[13px] leading-tight text-muted">
        {LABELS.map((l) => (
          <li key={l} className="whitespace-nowrap">
            {l}
          </li>
        ))}
      </ol>
    </figure>
  );
}
