"use client";

import { useSyncExternalStore } from "react";

type Theme = "paper" | "blueprint";

function subscribe(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => mo.disconnect();
}
const getTheme = (): Theme =>
  document.documentElement.dataset.theme === "blueprint" ? "blueprint" : "paper";

function setTheme(t: Theme) {
  const root = document.documentElement;
  // Fade colours for ~200ms while switching (skipped for reduced motion).
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
    root.classList.add("theme-anim");
    setTimeout(() => root.classList.remove("theme-anim"), 260);
  }
  root.dataset.theme = t;
  try {
    localStorage.setItem("theme", t);
  } catch {
    /* private mode / blocked storage: theme still applies for this visit */
  }
}

export function ThemeToggle() {
  const theme = useSyncExternalStore<Theme>(subscribe, getTheme, () => "paper");
  return (
    <div
      role="group"
      aria-label="Colour theme"
      className="inline-flex border border-line font-mono"
    >
      {(["paper", "blueprint"] as const).map((t) => (
        <button
          key={t}
          type="button"
          aria-pressed={theme === t}
          onClick={() => setTheme(t)}
          className={`px-2 py-1.5 text-[11px] capitalize md:px-2.5 md:text-xs transition-colors duration-150 ${
            theme === t ? "bg-ink text-bg" : "text-muted hover:text-ink"
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
