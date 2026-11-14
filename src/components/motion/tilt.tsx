"use client";

import type { PointerEvent, ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { SPRING } from "@/lib/motion-config";

/** Tips its child up to `max` degrees toward the mouse, like lifting a sheet by one corner.
 *  Mouse only; flat under reduced motion. Use on pictures, never on text. */
export function Tilt({ children, max = 2, className }: { children: ReactNode; max?: number; className?: string }) {
  const reduced = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, SPRING);
  const rotateY = useSpring(ry, SPRING);
  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== "mouse") return;
    const b = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - b.left) / b.width - 0.5) * 2 * max);
    rx.set(-((e.clientY - b.top) / b.height - 0.5) * 2 * max);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };
  return (
    <motion.div className={className} style={{ rotateX, rotateY, transformPerspective: 800 }} onPointerMove={move} onPointerLeave={reset}>
      {children}
    </motion.div>
  );
}
