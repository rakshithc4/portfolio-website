"use client";

// Reading progress mapped onto the "span": hero = left pylon, one tick per section,
// page bottom = far pylon. Shared by the desktop span gauge and the mobile progress line.
import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";

export const SPAN_IDS = ["work", "journey", "experience", "about", "contact"] as const;
/** Tick positions along the span, 0 = left pylon, 1 = far pylon. */
export const TICKS = [0.143, 0.329, 0.514, 0.7, 0.886];
const NAV_OFFSET = 72; // matches scroll-padding-top, so a clicked tick lands exactly on its stop

const lerp = (y: number, xs: number[], ys: number[]) => {
  if (y <= xs[0]) return ys[0];
  for (let i = 1; i < xs.length; i++) {
    if (y <= xs[i]) return ys[i - 1] + ((y - xs[i - 1]) / (xs[i] - xs[i - 1])) * (ys[i] - ys[i - 1]);
  }
  return ys[ys.length - 1];
};

export function useSpanProgress() {
  const reduced = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  // Scroll positions (px) of: top, each section, bottom. Measured, not hardcoded.
  const stops = useRef({ x: [0, 1, 2, 3, 4, 5, 6], f: [0, ...TICKS, 1], heroEnd: 0 });
  const [active, setActive] = useState(-1); // -1 = still in the hero
  const [visible, setVisible] = useState(false);

  const update = (y: number) => {
    const { x, heroEnd } = stops.current;
    let idx = -1;
    for (let i = 0; i < SPAN_IDS.length; i++) if (y >= x[i + 1] - 2) idx = i;
    setActive(idx);
    setVisible(y > heroEnd - 120);
  };

  useEffect(() => {
    const measure = () => {
      const y = scrollY.get();
      const top = (id: string) => {
        const el = document.getElementById(id);
        return el ? el.getBoundingClientRect().top + y - NAV_OFFSET : 0;
      };
      const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      const x = [0, ...SPAN_IDS.map(top)];
      x[5] = Math.min(x[5], max - 60); // the last section can't reach the top of the page
      for (let i = 1; i < x.length; i++) x[i] = Math.max(x[i], x[i - 1] + 1);
      x.push(Math.max(max, x[5] + 1));
      const hero = document.getElementById("top");
      stops.current = { x, f: [0, ...TICKS, 1], heroEnd: hero ? hero.getBoundingClientRect().bottom + y : 0 };
      update(y);
    };
    const ro = new ResizeObserver(measure); // fires once on observe, then on any layout change
    ro.observe(document.body);
    return () => ro.disconnect();
  }, [scrollY]);

  useMotionValueEvent(scrollY, "change", update);

  const fraction = useTransform(scrollY, (y) => lerp(y, stops.current.x, stops.current.f));
  const smooth = useSpring(fraction, { stiffness: 140, damping: 26, mass: 0.5 });
  const page = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.5 });

  return { reduced: !!reduced, smooth, page, active, visible };
}
