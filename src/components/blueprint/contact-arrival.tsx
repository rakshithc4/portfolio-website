import { InView } from "@/components/in-view";
import { r } from "@/lib/motion-config";

// End of the span: the far-bank pylon and a small flag draw in with the label "⑤ DELIVERED".
// Sequence (s): water 0 -> deck .1 -> pylon .4 -> pole .8 -> flag .95 -> label 1.15.
// The contact heading waits for ARRIVAL_DONE before it fades up.
export const ARRIVAL_DONE = 1.35;

export function ContactArrival() {
  return (
    <InView margin="0px">
      <svg viewBox="0 0 280 170" aria-hidden className="block h-auto w-full max-w-[280px] overflow-visible">
        {/* water */}
        <path
          data-r="draw"
          pathLength={1}
          d={`M0 160 q 10 -5 20 0 ${"t 20 0 ".repeat(13)}`}
          className="fill-none stroke-muted"
          strokeWidth="1"
          style={r(0, 0.4)}
        />
        {/* last stretch of deck, arriving at the pylon */}
        <g className="stroke-ink" strokeWidth="2">
          <line data-r="draw" pathLength={1} x1="0" x2="190" y1="110" y2="110" style={r(0.1, 0.5)} />
          <line data-r="draw" pathLength={1} x1="0" x2="190" y1="116" y2="116" strokeWidth="1" style={r(0.1, 0.5)} />
        </g>
        {/* far pylon */}
        <rect
          data-r="draw"
          pathLength={1}
          x="190"
          y="70"
          width="36"
          height="90"
          className="fill-bg stroke-ink"
          strokeWidth="2"
          style={r(0.4, 0.4)}
        />
        {/* flag pole and flag */}
        <line data-r="draw" pathLength={1} x1="208" x2="208" y1="70" y2="22" className="stroke-ink" strokeWidth="2" style={r(0.8, 0.25)} />
        <path
          data-r="draw"
          pathLength={1}
          d="M208 22 H238 L231 30 L238 38 H208"
          className="fill-accent stroke-accent"
          strokeWidth="1.5"
          style={r(0.95, 0.3)}
        />
        {/* label */}
        <text
          data-r="fade"
          x="0"
          y="96"
          className="fill-accent-text font-mono"
          fontSize="13"
          fontWeight="600"
          style={r(1.15, 0.3)}
        >
          ⑤ DELIVERED
        </text>
      </svg>
    </InView>
  );
}
