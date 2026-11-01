// Frames an illustration with corner brackets. `grid` adds the faint drawing grid
// (only ever inside panels, never behind body text).
export function DrawingFrame({
  children,
  grid = false,
  className = "",
}: {
  children: React.ReactNode;
  grid?: boolean;
  className?: string;
}) {
  const bracket = "absolute size-4 border-ink pointer-events-none";
  return (
    <div className={`relative p-3 ${grid ? "grid-paper" : "bg-panel"} ${className}`}>
      <span aria-hidden className={`${bracket} left-0 top-0 border-l-2 border-t-2`} />
      <span aria-hidden className={`${bracket} right-0 top-0 border-r-2 border-t-2`} />
      <span aria-hidden className={`${bracket} bottom-0 left-0 border-b-2 border-l-2`} />
      <span aria-hidden className={`${bracket} bottom-0 right-0 border-b-2 border-r-2`} />
      {children}
    </div>
  );
}
