"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { SPRING } from "@/lib/motion-config";

/** A rule that draws itself as you scroll (transform only). Horizontal: completes over the first
 *  quarter-screen after it appears. Vertical: its tip follows the reader down its own length. */
export function ScrubLine({ axis, className }: { axis: "x" | "y"; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: axis === "x" ? ["start 0.95", "start 0.7"] : ["start 0.9", "end 0.7"],
  });
  const s = useSpring(scrollYProgress, SPRING);
  const v = reduced ? 1 : s;
  return (
    <motion.span
      ref={ref}
      aria-hidden
      data-scrub="line"
      className={className}
      style={axis === "x" ? { scaleX: v, originX: 0 } : { scaleY: v, originY: 0 }}
    />
  );
}
