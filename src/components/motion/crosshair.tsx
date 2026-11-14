"use client";

import { useEffect, useRef } from "react";

/** Drafting crosshair with a coordinate readout, shown only while the mouse is over a drawing
 *  panel ([data-drawing]). Everywhere else the normal cursor is untouched. Never mounts its
 *  listeners on touch devices. Position is written straight to the element: no React renders. */
export function Crosshair() {
  const ref = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    document.documentElement.dataset.crosshair = ""; // CSS hides the native cursor inside drawings
    const hide = () => {
      el.style.opacity = "0";
    };
    const move = (e: PointerEvent) => {
      const panel = e.pointerType === "mouse" && e.target instanceof Element ? e.target.closest("[data-drawing]") : null;
      if (!panel) return hide();
      const b = panel.getBoundingClientRect();
      el.style.opacity = "1";
      el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      if (label.current) {
        label.current.textContent = `X ${Math.round(e.clientX - b.left)} · Y ${Math.round(e.clientY - b.top)}`;
      }
    };
    addEventListener("pointermove", move, { passive: true });
    addEventListener("scroll", hide, { passive: true }); // the panel moves away under a still mouse
    document.documentElement.addEventListener("pointerleave", hide);
    return () => {
      removeEventListener("pointermove", move);
      removeEventListener("scroll", hide);
      document.documentElement.removeEventListener("pointerleave", hide);
      delete document.documentElement.dataset.crosshair;
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed left-0 top-0 z-50 opacity-0">
      <span className="absolute -left-3 top-0 h-px w-6 bg-accent" />
      <span className="absolute -top-3 left-0 h-6 w-px bg-accent" />
      <span ref={label} className="tnum absolute left-3 top-3 whitespace-nowrap bg-bg px-1 font-mono text-[10px] text-muted" />
    </div>
  );
}
