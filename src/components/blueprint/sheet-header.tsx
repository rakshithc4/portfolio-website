// Section opener styled as a drawing sheet: hairline rule, orange mono label, plain heading.
export function SheetHeader({
  n,
  name,
  title,
  as: Tag = "h2",
}: {
  n: string;
  name: string;
  title: string;
  as?: "h1" | "h2";
}) {
  return (
    <div>
      <div className="h-px w-full bg-line" aria-hidden />
      <p className="mt-6 font-mono text-xs tracking-wide text-accent-text">
        SHEET {n} · {name}
      </p>
      <Tag className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
        {title}
      </Tag>
    </div>
  );
}
