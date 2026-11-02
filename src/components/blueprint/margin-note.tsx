// Engineer's margin note: a short handwritten line in orange pencil with a hand-drawn arrow.
// Position it with `className` (absolute, inside a `relative` parent); place and flip the arrow
// with `arrow`. Hidden below 640px to keep mobile clean. Decorative, so hidden from screen readers.
export function MarginNote({ text, className = "", arrow = "" }: { text: string; className?: string; arrow?: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute z-10 select-none font-hand text-[22px] font-medium leading-[1.05] text-accent-text max-sm:hidden ${className}`}
    >
      {text}
      <svg
        viewBox="0 0 56 28"
        className={`absolute h-7 w-14 fill-none stroke-accent ${arrow}`}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      >
        {/* curved shaft ending (left) in an open arrowhead */}
        <path d="M54 5C40 1 20 5 6 20M6 20L7 10M6 20L16 19" />
      </svg>
    </span>
  );
}
