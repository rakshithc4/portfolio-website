"use client";

import type { SVGProps } from "react";
import { motion, type MotionValue } from "motion/react";
import { dur as D, r } from "@/lib/motion-config";

type Props = Omit<SVGProps<SVGPathElement>, "style" | "ref"> & {
  /** 0..1 motion value: the stroke follows it (scroll-scrubbed). Omit for a one-shot draw. */
  progress?: MotionValue<number>;
  delay?: number;
  dur?: number;
};

/** SVG stroke draw-on. One-shot: draws when its <InView> ancestor scrolls in (CSS only).
 *  With `progress`: the drawn length tracks the motion value, no React renders. */
export function DrawPath({ progress, delay = 0, dur = D.draw, ...path }: Props) {
  if (progress) {
    // motion normalises pathLength to 0..1 and sets the dash properties itself
    return <motion.path {...(path as object)} style={{ pathLength: progress }} />;
  }
  return <path {...path} pathLength={1} data-r="draw" style={r(delay, dur)} />;
}
