"use client";

// Construction log showpiece: an elevation drawing of a seven-pier bridge that builds itself as
// the pier cards scroll past. Desktop: the drawing is sticky beside the cards. Below lg: it is a
// compact sticky strip under the nav (same SVG, cropped by CSS to the deck-and-piers band).
// One scroll value drives everything through motion values, so nothing re-renders per frame;
// React state changes only when the active pier changes (7 times).
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { DrawPath } from "@/components/motion/draw-path";
import { SPRING } from "@/lib/motion-config";
import { DrawingFrame } from "./drawing-frame";

// Geometry, viewBox 560 x 240. Near bank at x=40, far bank at x=520, piers every 70.
const BANK = 40;
const FAR = 520;
const DECK = 110; // top of deck; girder is 5 deep
const BED = 196; // riverbed
const SPRING_Y = 150; // where the arches meet the piers
const WATER = 182;
const pierX = (i: number) => 60 + i * 70;
/** A card "starts" when its top crosses this fraction of the viewport height. */
const LINE = 0.55;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const pad = (n: number) => String(n).padStart(2, "0");

type PierMeta = { stage: string; title: string; unfinished: boolean };

/** Progress of one phase of pier i: 0 before `from`, 1 after `to` (both in 0..1 of that pier's share). */
function usePhase(built: MotionValue<number>, i: number, from: number, to: number) {
  return useTransform(built, (b) => clamp01((b - i - from) / (to - from)));
}

function Pier({ i, built, active, unfinished }: { i: number; built: MotionValue<number>; active: boolean; unfinished: boolean }) {
  const x = pierX(i);
  const x0 = i === 0 ? BANK : pierX(i - 1);
  const rise = usePhase(built, i, 0, 0.5); // the pier comes up first
  const span = usePhase(built, i, 0, 1); // the deck reaches it (in step with the gantry)
  const arch = usePhase(built, i, 0.5, 1);
  const pop = usePhase(built, i, 0.85, 1); // callout lands last
  const dash = unfinished ? "4 4" : undefined;

  return (
    <g>
      {unfinished ? (
        // the span that isn't built yet: dashed outline that fades in, never "drawn"
        <motion.g style={{ opacity: span }} className="fill-none stroke-ink" strokeDasharray={dash}>
          <path d={`M${x0} ${DECK}H${FAR}M${x0} ${DECK + 5}H${FAR}`} strokeWidth="1.5" />
          <path d={`M${x0 + 6} ${SPRING_Y}Q${(x0 + x) / 2} ${2 * (DECK + 5) - SPRING_Y} ${x - 6} ${SPRING_Y}`} strokeWidth="1" />
          <rect x={x - 6} y={DECK + 10} width="12" height={BED - DECK - 10} strokeWidth="1.5" />
        </motion.g>
      ) : (
        <>
          <g className="fill-none stroke-ink">
            <DrawPath progress={span} d={`M${x0} ${DECK}H${x}`} strokeWidth="2" />
            <DrawPath progress={span} d={`M${x0} ${DECK + 5}H${x}`} strokeWidth="1" />
            {i > 0 && (
              <DrawPath
                progress={arch}
                d={`M${x0 + 6} ${SPRING_Y}Q${(x0 + x) / 2} ${2 * (DECK + 5) - SPRING_Y} ${x - 6} ${SPRING_Y}`}
                strokeWidth="1"
              />
            )}
          </g>
          {/* pier: cap, column, footing. Rises from the riverbed. */}
          <motion.g style={{ scaleY: rise, originY: 1 }} className="fill-bg stroke-ink" strokeWidth="1.5">
            <rect x={x - 6} y={DECK + 10} width="12" height={BED - DECK - 10} />
            <rect x={x - 11} y={DECK + 5} width="22" height="5" />
            <rect x={x - 12} y={BED} width="24" height="5" />
          </motion.g>
        </>
      )}
      {/* numbered callout, as on the hero drawing */}
      <motion.g style={{ opacity: pop }}>
        <line x1={x} x2={x} y1="39" y2={DECK - 4} className="stroke-muted" strokeWidth="1" strokeDasharray={dash} />
        <circle
          cx={x}
          cy="30"
          r="9"
          className={`fill-bg transition-[stroke] duration-200 ${active ? "stroke-accent" : "stroke-ink"}`}
          strokeWidth="1.5"
          strokeDasharray={unfinished ? "3 3" : undefined}
        />
        <text
          x={x}
          y="34"
          textAnchor="middle"
          className={`font-mono transition-[fill] duration-200 ${active ? "fill-accent-text" : "fill-ink"}`}
          fontSize="11"
          fontWeight="600"
        >
          {i + 1}
        </text>
      </motion.g>
    </g>
  );
}

export function JourneyBridge({ piers, children }: { piers: PierMeta[]; children: ReactNode }) {
  const n = piers.length;
  const reduced = useReducedMotion();
  const list = useRef<HTMLOListElement>(null);
  const { scrollY } = useScroll();
  // Scroll positions (document px) at which each card starts, plus where the last one ends. Measured.
  const stops = useRef<number[]>([]);
  const measured = useMotionValue(0); // bumped after each measure so `raw` recomputes without a scroll
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ol = list.current;
    if (!ol) return;
    const measure = () => {
      const top = ol.getBoundingClientRect().top + scrollY.get() - innerHeight * LINE;
      stops.current = [...[...ol.children].map((li) => top + (li as HTMLElement).offsetTop), top + ol.offsetHeight];
      measured.set(measured.get() + 1);
    };
    const ro = new ResizeObserver(measure); // fires once on observe, then on any layout change
    ro.observe(document.body);
    return () => ro.disconnect();
  }, [scrollY, measured]);

  // "Piers built", 0..n, fractional: card i scrolling through its own height takes it from i to i+1.
  const raw = useTransform([scrollY, measured], ([y]: number[]) => {
    const s = stops.current;
    if (s.length < 2 || y <= s[0]) return 0;
    for (let i = 1; i < s.length; i++) if (y <= s[i]) return i - 1 + (y - s[i - 1]) / (s[i] - s[i - 1]);
    return n;
  });
  const smooth = useSpring(raw, SPRING);
  const full = useMotionValue(n);
  // Reduced motion: the bridge is simply built. Only the label follows the scroll.
  const built = reduced ? full : smooth;

  useMotionValueEvent(raw, "change", (v) => setActive(Math.min(n - 1, Math.max(0, Math.floor(v)))));
  // Mark the active card (CSS: li[data-active] in globals.css). The cards are server-rendered children.
  useEffect(() => {
    [...(list.current?.children ?? [])].forEach((li, i) => li.toggleAttribute("data-active", i === active));
  }, [active]);

  // Build front: where the deck has reached. The gantry and the progress rule follow it.
  const frontX = useTransform(built, [0, ...piers.map((_, i) => i + 1)], [BANK, ...piers.map((_, i) => pierX(i))]);
  const gantryX = useTransform(frontX, (x) => x - BANK);
  const ruleScale = useTransform(frontX, (x) => (x - BANK) / (FAR - BANK));

  const p = piers[active];
  return (
    <div className="mt-10 lg:mt-12 lg:grid lg:grid-cols-[minmax(0,1fr)_26rem] lg:items-start lg:gap-12">
      <div
        aria-hidden
        data-scrub
        className="sticky top-[60px] z-20 -mx-5 border-b border-line bg-bg px-5 py-2 md:-mx-8 md:px-8 lg:top-28 lg:mx-0 lg:border-0 lg:bg-transparent lg:p-0"
      >
        {/* title block: which pier is going up */}
        <div className="flex items-baseline justify-between gap-3 font-mono text-xs">
          <p className="tnum text-accent-text">
            PIER {pad(active + 1)} / {pad(n)} · {p.stage}
          </p>
          <p className="hidden text-muted lg:block">ELEVATION · NOT TO SCALE</p>
        </div>
        <p key={active} className="swap mt-1 hidden text-2xl font-semibold tracking-tight lg:block">
          {p.title}
        </p>
        <DrawingFrame className="grid-paper mt-2 max-lg:p-2 lg:mt-4">
          {/* below lg only the deck-and-piers band (y 84..206) shows: the SVG is pulled up and clipped */}
          <div className="aspect-[560/122] overflow-hidden lg:aspect-[560/240]">
            <svg viewBox="0 0 560 240" className="-mt-[15%] block h-auto w-full lg:mt-0">
              {/* riverbed and water */}
              <path d={`M${BANK} ${BED + 5}H${FAR}`} className="stroke-line" strokeWidth="1" />
              <path
                d={`M${BANK} ${WATER}q10 -5 20 0${"t20 0".repeat((FAR - BANK) / 20 - 1)}`}
                className="fill-none stroke-muted"
                strokeWidth="1"
              />
              {/* near bank (built) and far bank (not reached yet) */}
              <path d={`M0 ${DECK}H${BANK}V${BED + 5}H0`} className="fill-bg stroke-ink" strokeWidth="1.5" />
              <path d="M6 192l22-22M6 166l22-22M6 140l22-22" className="stroke-line" strokeWidth="1" />
              <path d={`M560 ${DECK}H${FAR}V${BED + 5}H560`} className="fill-none stroke-muted" strokeWidth="1.5" strokeDasharray="4 4" />

              {piers.map((pier, i) => (
                <Pier key={pier.title} i={i} built={built} active={i === active} unfinished={pier.unfinished} />
              ))}

              {/* gantry at the build front, carrying the request dot */}
              <motion.g style={{ x: gantryX }}>
                <path d={`M${BANK - 9} ${DECK}L${BANK} ${DECK - 20}L${BANK + 9} ${DECK}M${BANK - 5} ${DECK - 9}H${BANK + 5}`} className="fill-none stroke-ink" strokeWidth="1.5" />
                <circle cx={BANK} cy={DECK + 2.5} r="4" className="fill-accent" />
              </motion.g>

              {/* progress rule: a dimension line whose orange part is the span built so far */}
              <g strokeWidth="1">
                <path d={`M${BANK} 226H${FAR}M${BANK} 220V232M${FAR} 220V232`} className="stroke-muted" />
                {piers.map((pier, i) => (
                  <path key={pier.title} d={`M${pierX(i)} 223V229`} className="stroke-muted" />
                ))}
                <motion.path
                  d={`M${BANK} 226H${FAR}`}
                  className="stroke-accent"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                  style={{ scaleX: ruleScale, originX: 0 }}
                />
              </g>
            </svg>
          </div>
        </DrawingFrame>
      </div>

      <ol ref={list} className="relative mt-8 grid gap-8 lg:mt-0">
        {children}
      </ol>
    </div>
  );
}
