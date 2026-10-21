"use client"

import * as React from "react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

/**
 * The site's one entrance pattern: fade + 12px upward shift, once, on
 * scroll into view. Per SKILL.md — deliberately uniform, no per-section
 * variation (no scale, no directional variants, nothing scroll-linked).
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.35, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}
