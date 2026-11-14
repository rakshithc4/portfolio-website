import { InView } from "@/components/in-view";
import { r } from "@/lib/motion-config";

// End of the span: the far-bank pylon and a small flag draw in, then the sheet is stamped "⑤ DELIVERED".
// Sequence (s): water 0 -> deck .05 -> pylon .3 -> pole .55 -> flag .65 -> stamp .85 (lands ~1.1).

export function ContactArrival() {
  return (
    <InView margin="0px" className="relative max-w-[280px]">
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
          <line data-r="draw" pathLength={1} x1="0" x2="190" y1="110" y2="110" style={r(0.05, 0.4)} />
          <line data-r="draw" pathLength={1} x1="0" x2="190" y1="116" y2="116" strokeWidth="1" style={r(0.05, 0.4)} />
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
          style={r(0.3, 0.3)}
        />
        {/* flag pole and flag */}
        <line data-r="draw" pathLength={1} x1="208" x2="208" y1="70" y2="22" className="stroke-ink" strokeWidth="2" style={r(0.55, 0.2)} />
        <path
          data-r="draw"
          pathLength={1}
          d="M208 22 H238 L231 30 L238 38 H208"
          className="fill-accent stroke-accent"
          strokeWidth="1.5"
          style={r(0.65, 0.25)}
        />
      </svg>
      {/* rubber stamp over the deck: thuds down once the flag is up (CSS: .stamp) */}
      <span
        className="stamp absolute left-0 top-[26%] rounded-[3px] border-2 border-accent-text px-2.5 py-1 font-mono text-[13px] font-semibold tracking-[0.14em] text-accent-text"
        style={r(0.85)}
      >
        ⑤ DELIVERED
      </span>
    </InView>
  );
}
