import { InViewPause } from "@/components/in-view-pause";

// Harbour water: four hairline wave lines drifting sideways, one slow cycle each (26-40s).
// Each line is an SVG two tiles wide (1600 units, tile = 800) shifted by -50% = exactly one tile,
// and every wave period divides 800, so the loop is seamless. transform only; paused off-screen.
const LINES = [
  { period: 200, amp: 3, dur: 40, reverse: false },
  { period: 100, amp: 4, dur: 31, reverse: true },
  { period: 160, amp: 3.5, dur: 36, reverse: false },
  { period: 80, amp: 2.5, dur: 26, reverse: true },
] as const;

const wave = (period: number, amp: number) =>
  `M0 6 q ${period / 4} ${-amp * 2} ${period / 2} 0${` t ${period / 2} 0`.repeat(1600 / (period / 2) - 1)}`;

export function Harbour({ className = "" }: { className?: string }) {
  return (
    <InViewPause className={`pointer-events-none relative h-11 overflow-hidden ${className}`}>
      <div aria-hidden className="absolute inset-0 text-ink [opacity:var(--water-a)]">
        {LINES.map((l, i) => (
          <svg
            key={i}
            viewBox="0 0 1600 12"
            preserveAspectRatio="none"
            className="ambient drift absolute left-0 h-3"
            style={{
              top: i * 10,
              width: "max(200%, 1600px)",
              animationDuration: `${l.dur}s`,
              animationDirection: l.reverse ? "reverse" : "normal",
            }}
          >
            <path d={wave(l.period, l.amp)} fill="none" stroke="currentColor" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
          </svg>
        ))}
      </div>
    </InViewPause>
  );
}
