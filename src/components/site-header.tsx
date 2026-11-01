"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { ThemeToggle } from "@/components/theme-toggle";
import { ProgressLine } from "@/components/blueprint/span-gauge";

export function SiteHeader() {
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  // Highlight the nav link for the section nearest the middle of the viewport.
  useEffect(() => {
    const els = site.nav
      .map((n) => document.getElementById(n.id))
      .filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Escape closes the mobile menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open]);

  const link = (id: string, label: string, mobile: boolean) => (
    <a
      key={id}
      href={`#${id}`}
      onClick={() => setOpen(false)}
      aria-current={active === id ? "true" : undefined}
      className={
        mobile
          ? `border-b border-line py-3 text-base ${active === id ? "text-ink" : "text-muted"}`
          : `border-b-2 py-1 text-[15px] transition-colors duration-150 ${
              active === id ? "border-accent text-ink" : "border-transparent text-muted hover:text-ink"
            }`
      }
    >
      {label}
    </a>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg">
      <div className="mx-auto flex max-w-[1100px] items-center justify-between gap-3 px-5 py-3 md:px-8">
        <a href="#" className="whitespace-nowrap text-[15px] font-semibold tracking-tight md:text-base">
          {site.name}
        </a>

        <nav aria-label="Primary" className="hidden gap-6 md:flex">
          {site.nav.map((n) => link(n.id, n.label, false))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <ThemeToggle />
          <a
            href={site.resumeHref}
            className="hidden border border-ink px-3.5 py-1.5 text-sm font-medium transition-colors duration-150 hover:bg-ink hover:text-bg md:inline-block"
          >
            Resume ↓
          </a>
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
            className="grid size-9 place-items-center border border-line md:hidden"
          >
            <svg aria-hidden viewBox="0 0 20 20" className="size-5 fill-none stroke-ink" strokeWidth="1.5">
              {open ? <path d="M4 4l12 12M16 4L4 16" /> : <path d="M3 6h14M3 10h14M3 14h14" />}
            </svg>
          </button>
        </div>
      </div>

      <ProgressLine />

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="absolute inset-x-0 top-full flex flex-col border-b border-line bg-bg px-5 pb-4 md:hidden"
        >
          {site.nav.map((n) => link(n.id, n.label, true))}
          <a href={site.resumeHref} className="mt-4 border border-ink px-4 py-3 text-center text-[15px] font-medium">
            Resume ↓
          </a>
        </nav>
      )}
    </header>
  );
}
