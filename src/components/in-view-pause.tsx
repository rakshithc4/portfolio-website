"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Wraps ambient (looping) motion. While the wrapper is off-screen it sets data-paused="true",
// and globals.css pauses every `.ambient` animation inside it. (A hidden tab is handled by the
// data-tab-hidden flag from the inline script in layout.tsx.)
export function InViewPause({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      el.dataset.paused = e.isIntersecting ? "false" : "true";
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} data-paused="true" className={className}>
      {children}
    </div>
  );
}
