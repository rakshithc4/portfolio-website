"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { site, coffeeUrl } from "@/content/site";
import { ThemeToggle } from "@/components/theme-toggle";
import { Mark } from "@/components/logo";
import { ProgressLine } from "@/components/blueprint/span-gauge";

const EASE_ARR = [0.22, 1, 0.36, 1] as const; // same curve as EASE in motion-config

export function SiteHeader() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [ind, setInd] = useState<{ x: number; w: number } | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);

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

  // Desktop nav: one indicator that slides (transform only) to the active link.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const place = () => {
      const a = active ? nav.querySelector<HTMLAnchorElement>(`a[href="#${active}"]`) : null;
      setInd(a && a.offsetWidth ? { x: a.offsetLeft, w: a.offsetWidth } : null);
    };
    const ro = new ResizeObserver(place); // fires once on observe, then on resize
    ro.observe(nav);
    place();
    return () => ro.disconnect();
  }, [active]);

  // Mobile menu: Escape closes, Tab is trapped inside the header, page behind is inert.
  useEffect(() => {
    if (!open) return;
    const behind = ["main", "contact"].map((id) => (id === "main" ? document.getElementById("main") : document.getElementById(id)));
    behind.forEach((el) => el?.setAttribute("inert", ""));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuBtn.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !headerRef.current) return;
      const f = [...headerRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")].filter(
        (el) => el.offsetParent !== null,
      );
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    addEventListener("keydown", onKey);
    const raf = requestAnimationFrame(() => menuRef.current?.querySelector("a")?.focus());
    return () => {
      removeEventListener("keydown", onKey);
      cancelAnimationFrame(raf);
      behind.forEach((el) => el?.removeAttribute("inert"));
    };
  }, [open]);

  return (
    <header ref={headerRef} className="sticky top-0 z-40 border-b border-line bg-bg">
      <div className="mx-auto flex max-w-[1100px] items-center justify-between gap-3 px-5 py-3 md:px-8">
        <a
          href="#"
          aria-label={`${site.name}, back to top`}
          className="flex items-center gap-2.5 whitespace-nowrap text-[15px] font-semibold tracking-tight md:text-base"
        >
          <Mark draw className="mark-flip h-7 w-auto text-ink" />
          <span className="hidden sm:inline">{site.name}</span>
        </a>

        <nav ref={navRef} aria-label="Primary" className="relative hidden gap-6 md:flex">
          {site.nav.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              aria-current={active === n.id ? "true" : undefined}
              className={`py-1 text-[15px] transition-colors duration-150 ${
                active === n.id ? "text-ink" : "text-muted hover:text-ink"
              }`}
            >
              {n.label}
            </a>
          ))}
          <span
            aria-hidden
            className="absolute bottom-0 left-0 h-0.5 w-px origin-left bg-accent"
            style={{
              transform: `translateX(${ind?.x ?? 0}px) scaleX(${ind?.w ?? 1})`,
              opacity: ind ? 1 : 0,
              transition: reduced ? "none" : "transform 0.35s cubic-bezier(0.22,1,0.36,1), opacity 0.2s",
            }}
          />
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <ThemeToggle />
          <a
            href={site.resumeHref}
            className="btn hidden border border-ink px-3.5 py-1.5 text-sm font-medium hover:bg-ink hover:text-bg md:inline-block"
          >
            Resume ↓
          </a>
          <button
            ref={menuBtn}
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
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

      <AnimatePresence>
        {open && (
          <motion.nav
            ref={menuRef}
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0, y: reduced ? 0 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -8 }}
            transition={{ duration: reduced ? 0 : 0.2, ease: EASE_ARR }}
            className="absolute inset-x-0 top-full flex flex-col border-b border-line bg-bg px-5 pb-4 md:hidden"
          >
            {site.nav.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={() => setOpen(false)}
                aria-current={active === n.id ? "true" : undefined}
                className={`border-b border-line py-3 text-base ${active === n.id ? "text-ink" : "text-muted"}`}
              >
                {n.label}
              </a>
            ))}
            <a
              href={coffeeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="border-b border-line py-3 text-base text-muted"
            >
              <span aria-hidden>☕</span> Coffee chat
            </a>
            <a href={site.resumeHref} className="btn mt-4 border border-ink px-4 py-3 text-center text-[15px] font-medium">
              Resume ↓
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
