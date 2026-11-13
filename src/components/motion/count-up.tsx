"use client";

import { useEffect, useRef } from "react";
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

  // The element holds the final value as its ONE text node, so screen readers and text
  // extracts see it exactly once. The animation rewrites that node in place (no copies).
  useEffect(() => {
    const el = ref.current;
    const m = value.match(NUM);
    if (!el || !inView || reduced || !m) return;
    const target = parseFloat(m[1].replace(/,/g, ""));
    if (target === 0) return;
    const decimals = m[1].split(".")[1]?.length ?? 0;
    const comma = m[1].includes(",");
    const fmt = (v: number) =>
      (comma ? v.toLocaleString("en-US", { maximumFractionDigits: 0 }) : v.toFixed(decimals)) + m[2];
    // Start from 0 right away so the final value never flashes before the count.
    el.textContent = fmt(0);
    const c = animate(0, target, {
      duration: reveal.count,
      delay,
      ease: "easeOut",
      onUpdate: (v) => (el.textContent = fmt(v)),
      onComplete: () => (el.textContent = value),
    });
    return () => {
      c.stop();
      el.textContent = value;
    };
  }, [inView, reduced, value, delay]);

  // min-width (in digit widths) keeps the box from shrinking while it counts, so nothing shifts.
  return (
    <span ref={ref} className="tnum inline-block" style={{ minWidth: `${value.length}ch` }}>
      {value}
    </span>
  );
}
