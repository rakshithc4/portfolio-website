"use client";

// The live parts of the hero bridge: numbered callouts and the orange "request" dot.
// Intro (fade/draw/pulse) is CSS; this adds the scroll-scrubbed travel.
// Rendered inside the hero <svg>, so it also server-renders (static, dot at stage 1).
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { intro, t } from "@/lib/motion-config";
import { CALLOUTS, DECK_Y, STAGE_X } from "./bridge-geometry";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export function BridgeLive() {
  const reduced = useReducedMotion();
  const anchor = useRef<SVGGElement>(null);
  const { scrollY } = useScroll();
  // Scroll range (document px) over which the dot crosses the bridge.
  const range = useRef({ start: 0, end: 1000 });
  const [stage, setStage] = useState(0); // 0..4: stage the dot has reached

  useEffect(() => {
    const svg = anchor.current?.ownerSVGElement;
    if (!svg) return;
    const measure = () => {
      const r = svg.getBoundingClientRect();
      const top = r.top + scrollY.get();
      const bottom = r.bottom + scrollY.get();
      const vh = innerHeight;
      // Starts once the bridge is well on screen (immediately on desktop),
      // ends when the bridge is about to leave the top.
      const start = Math.max(0, top - 0.6 * vh);
      const end = Math.max(start + 200, bottom - 0.15 * vh);
      range.current = { start, end };
    };
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    return () => ro.disconnect();
  }, [scrollY]);

  const raw = useTransform(scrollY, (y) => clamp01((y - range.current.start) / (range.current.end - range.current.start)));
  const p = useSpring(raw, { stiffness: 140, damping: 26, mass: 0.5 });
  // Equal scroll share per stage; x follows the stage positions along the deck.
  const dotX = useTransform(p, [0, 0.25, 0.5, 0.75, 1], STAGE_X.map((x) => x - STAGE_X[0]));

  useMotionValueEvent(p, "change", (v) => {
    if (!reduced) setStage(Math.min(4, Math.floor(v * 4 + 0.02)));
  });

  return (
    <g ref={anchor}>
      {/* callouts: circle + label; the reached one is orange, earlier ones get a tick */}
      {CALLOUTS.map((c, i) => {
        const s = t(intro.callouts.delay + i * intro.callouts.stagger, intro.callouts.dur);
        const active = i === stage;
        const done = i < stage;
        return (
          <g key={c.n}>
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
              <circle
                cx={c.x}
                cy={c.y}
                r="9"
                className={`fill-bg transition-[stroke] duration-200 ${active ? "stroke-accent" : "stroke-ink"}`}
                strokeWidth="1.5"
              />
              <text
                x={c.x}
                y={c.y + 4.5}
                textAnchor="middle"
                className={`font-mono transition-[fill] duration-200 ${active ? "fill-accent-text" : "fill-ink"}`}
                fontSize="13"
                fontWeight="600"
              >
                {c.n}
              </text>
              <text
                x={c.side === "r" ? c.x + 14 : c.x - 14}
                y={c.y + 4.5}
                textAnchor={c.side === "r" ? "start" : "end"}
                className={`hidden font-mono transition-[fill] duration-200 md:inline ${active ? "fill-accent-text" : "fill-ink"}`}
                fontSize="13"
              >
                {c.label}
              </text>
              {/* small check tick once the dot has passed */}
              <g className={`transition-opacity duration-300 ${done ? "opacity-100" : "opacity-0"}`}>
                <circle cx={c.x + 9} cy={c.y - 9} r="5.5" className="fill-ink" />
                <path
                  d={`M${c.x + 6.5} ${c.y - 9} l2 2 l3.5 -4`}
                  className="fill-none stroke-bg"
                  strokeWidth="1.5"
                />
              </g>
            </g>
          </g>
        );
      })}

      {/* the request: appears at stage 1, pulses once, then travels with scroll */}
      <motion.g style={{ x: reduced ? 0 : dotX }}>
        <circle
          cx={STAGE_X[0]}
          cy={DECK_Y + 3}
          r="5.5"
          className="pulse fill-accent"
          style={t(intro.pulse.delay, intro.pulse.dur)}
        />
        <circle
          cx={STAGE_X[0]}
          cy={DECK_Y + 3}
          r="5.5"
          className="fade fill-accent"
          style={t(intro.dot.delay, intro.dot.dur)}
        />
      </motion.g>
    </g>
  );
}
