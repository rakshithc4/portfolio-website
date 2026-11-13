"use client";

import type { PointerEvent, ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { SPRING } from "@/lib/motion-config";

/** Leans its child a few px toward the mouse, then springs back. Mouse only: touch and pen
 *  events are ignored, and nothing moves under reduced motion. */
export function Magnetic({ children, max = 6, className = "" }: { children: ReactNode; max?: number; className?: string }) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, SPRING);
  const sy = useSpring(y, SPRING);
  const move = (e: PointerEvent<HTMLSpanElement>) => {
    if (reduced || e.pointerType !== "mouse") return;
    const b = e.currentTarget.getBoundingClientRect();
    x.set(((e.clientX - b.left) / b.width - 0.5) * 2 * max);
    y.set(((e.clientY - b.top) / b.height - 0.5) * 2 * max);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <motion.span className={`inline-block ${className}`} style={{ x: sx, y: sy }} onPointerMove={move} onPointerLeave={reset}>
      {children}
    </motion.span>
  );
}
