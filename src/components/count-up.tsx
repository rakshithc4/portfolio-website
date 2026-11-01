"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { reveal } from "@/lib/motion-config";

// Counts a number up from 0 once, when it scrolls into view.
// Handles "17", "7,023", "95.5%", "0.95", and "18/18" (counts the first number).
// Text that isn't a number ("Clean") is shown as-is. Shows the final value with JS off.
const NUM = /^(\d[\d,]*(?:\.\d+)?)(.*)$/;

export function CountUp({ value, delay = 0 }: { value: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const [text, setText] = useState(value);

  useEffect(() => {
    const m = value.match(NUM);
    if (!inView || reduced || !m) return;
    const target = parseFloat(m[1].replace(/,/g, ""));
    if (target === 0) return;
    const decimals = m[1].split(".")[1]?.length ?? 0;
    const comma = m[1].includes(",");
    const fmt = (v: number) =>
      (comma ? v.toLocaleString("en-US", { maximumFractionDigits: 0 }) : v.toFixed(decimals)) + m[2];
    // Start from 0 right away so the final value never flashes before the count.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setText(fmt(0));
    const c = animate(0, target, {
      duration: reveal.count,
      delay,
      ease: "easeOut",
      onUpdate: (v) => setText(fmt(v)),
      onComplete: () => setText(value),
    });
    return () => c.stop();
  }, [inView, reduced, value, delay]);

  // The invisible final value reserves the width, so digits never shift the layout.
  return (
    <span ref={ref} className="tnum inline-grid">
      <span aria-hidden className="invisible col-start-1 row-start-1">{value}</span>
      <span aria-hidden className="col-start-1 row-start-1">{text}</span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
