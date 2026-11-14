"use client";

import { useEffect, type ReactNode } from "react";
import { motion, motionValue, useSpring, useTransform } from "motion/react";
import { SPRING } from "@/lib/motion-config";

// Pointer position across the window, -1..1 on each axis. One passive listener for the whole page,
// bound only on mouse devices without reduced motion; otherwise the values stay 0 and nothing moves.
const px = motionValue(0);
const py = motionValue(0);
let bound = false;
function bind() {
  if (bound) return;
  if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  bound = true;
  addEventListener(
    "pointermove",
    (e) => {
      px.set((e.clientX / innerWidth) * 2 - 1);
      py.set((e.clientY / innerHeight) * 2 - 1);
    },
    { passive: true },
  );
}

/** Shifts its children by up to `depth` px as the mouse crosses the window. Keep depth tiny (1-3):
 *  layers at different depths read as sheets of tracing paper, not as a 3D effect. */
export function Parallax({ depth = 3, className, children }: { depth?: number; className?: string; children: ReactNode }) {
  useEffect(bind, []);
  const x = useSpring(useTransform(px, (v) => v * depth), SPRING);
  const y = useSpring(useTransform(py, (v) => v * depth), SPRING);
  return (
    <motion.div className={className} style={{ x, y }}>
      {children}
    </motion.div>
  );
}
