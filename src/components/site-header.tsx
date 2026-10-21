"use client"

import * as React from "react"
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react"
import { Download, Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"

const RESUME_HREF = "/Rakshith-Chandra-Shekar-Resume.pdf"

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#credentials", label: "Credentials" },
  { href: "#contact", label: "Contact" },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = React.useState(false)
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [activeHref, setActiveHref] = React.useState<string | null>(null)

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 32, mass: 0.2 })

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  React.useEffect(() => {
    const sections = LINKS.map((l) => document.querySelector(l.href)).filter(
      (el): el is Element => !!el
    )
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveHref(`#${entry.target.id}`)
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    )
    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  React.useEffect(() => {
    if (!menuOpen) return
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [menuOpen])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b backdrop-blur-xl transition-colors duration-300",
        scrolled || menuOpen
          ? "border-border bg-background/80"
          : "border-transparent bg-background/30"
      )}
    >
      {/* Scroll progress — an always-on signal of where you are on the page. */}
      <motion.div
        style={{ scaleX: progress }}
        className="absolute inset-x-0 top-0 h-1 origin-left bg-gradient-to-r from-primary/0 via-primary to-primary/0"
      />

      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-8">
        <a
          href="#top"
          onClick={() => setMenuOpen(false)}
          className="group flex items-center gap-3"
        >
          <motion.span
            whileHover={{ rotate: -4, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg border border-primary/30 bg-primary/10 font-heading text-sm font-semibold tracking-tight text-foreground"
          >
            <span className="relative z-10">RCS</span>
            <span className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
          </motion.span>
          <span className="hidden text-sm font-semibold tracking-tight text-foreground transition-colors duration-150 group-hover:text-primary sm:inline">
            Rakshith Chandra Shekar
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => {
            const active = activeHref === link.href
            return (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-3 py-2 text-sm transition-colors duration-150",
                  active ? "text-foreground" : "text-ink-muted hover:text-foreground"
                )}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    className="absolute inset-x-3 -bottom-[1px] h-px bg-primary"
                  />
                )}
              </a>
            )
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <motion.a
            href={RESUME_HREF}
            download
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors duration-150 hover:border-primary/40"
          >
            <Download size={14} />
            Resume
          </motion.a>

          <motion.a
            href="mailto:rakshithc46@gmail.com"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-[0_0_0_0_rgba(91,110,245,0)] transition-shadow duration-200 hover:shadow-[0_0_24px_-4px_rgba(91,110,245,0.6)]"
          >
            Contact
          </motion.a>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground transition-colors duration-150 hover:border-primary md:hidden"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={menuOpen ? "close" : "open"}
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              transition={{ duration: 0.15 }}
              className="flex"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col px-6 py-4">
              {LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.2 }}
                  className="flex h-12 items-center text-sm text-ink-muted transition-colors duration-150 hover:text-foreground"
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href={RESUME_HREF}
                download
                onClick={() => setMenuOpen(false)}
                className="mt-2 flex h-12 items-center gap-1.5 text-sm text-ink-muted transition-colors duration-150 hover:text-foreground"
              >
                <Download size={14} />
                Resume
              </a>
              <a
                href="mailto:rakshithc46@gmail.com"
                onClick={() => setMenuOpen(false)}
                className="flex h-12 items-center text-sm font-medium text-primary"
              >
                Contact
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
