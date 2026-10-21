import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"

/**
 * The shared section-heading treatment — a numbered, icon-led pill instead
 * of a thin tracked-out caption that was reading as near-invisible against
 * the live background.
 */
export function SectionLabel({
  icon: Icon,
  index,
  children,
}: {
  icon: LucideIcon
  index: string
  children: ReactNode
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 py-1.5 pl-1.5 pr-3.5">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary">
        <Icon size={13} strokeWidth={2.25} />
      </span>
      <span className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-primary">
        {index} · {children}
      </span>
    </div>
  )
}
