import { Fragment } from "react";
import { site, type Pier } from "@/content/site";
import { SheetHeader } from "@/components/blueprint/sheet-header";
import { PierIcon } from "@/components/blueprint/pier-icon";

const pad = (n: number) => String(n).padStart(2, "0");

// Turns "ProcureFlow" / "AssetPulse" in the copy into links to their Work cards.
function Text({ p }: { p: Pier }) {
  if (!p.links?.length) return <>{p.text}</>;
  const re = new RegExp(`(${p.links.map((l) => l.text).join("|")})`);
  return (
    <>
      {p.text.split(re).map((part, i) => {
        const l = p.links!.find((x) => x.text === part);
        return l ? (
          <a key={i} href={l.href} className="font-medium underline underline-offset-4 hover:text-accent-text">
            {part}
          </a>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        );
      })}
    </>
  );
}

function PierCard({ p, i }: { p: Pier; i: number }) {
  return (
    <div className={`border bg-card p-5 ${p.unfinished ? "border-dashed border-ink" : "border-line"}`}>
      <div className="flex items-center gap-3">
        <PierIcon name={p.icon} dashed={p.unfinished} />
        <p className="font-mono text-xs leading-snug tracking-wide text-accent-text">
          <span className="lg:hidden">PIER {pad(i + 1)} · </span>
          {p.stage}
        </p>
      </div>
      <h3 className="mt-3 text-xl font-semibold tracking-tight">{p.title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed">
        <Text p={p} />
      </p>
      {p.cta && (
        <a href={p.cta.href} className="mt-4 inline-block font-medium underline underline-offset-4 hover:text-accent-text">
          {p.cta.label}
        </a>
      )}
    </div>
  );
}

// Desktop: one long horizontal deck. Piers sit one grid column apart; cards alternate
// above/below the deck and span two columns, so neighbours never collide.
function Deck({ piers }: { piers: Pier[] }) {
  return (
    <div className="mt-12 hidden grid-cols-8 grid-rows-[auto_104px_auto] lg:grid">
      {/* deck line: solid to the last built pier, dashed beyond it */}
      <div aria-hidden className="relative col-span-8 col-start-1 row-start-2">
        <div className="absolute left-0 top-1/2 h-0 w-[81.25%] border-t-2 border-ink" />
        <div className="absolute left-[81.25%] top-1/2 h-0 w-[18.75%] border-t-2 border-dashed border-ink" />
        <div className="absolute left-0 top-1/2 h-4 w-0 -translate-y-1/2 border-l-2 border-ink" />
      </div>

      {piers.map((p, i) => {
        const start = i + 1; // pier centre sits on the boundary between columns `start` and `start+1`
        const above = i % 2 === 0; // card above the deck for odd piers
        const col = { gridColumn: `${start} / span 2` };
        return (
          <Fragment key={p.title}>
            <div
              className={`px-2 ${above ? "row-start-1 self-end" : "row-start-3 self-start"}`}
              style={col}
            >
              <PierCard p={p} i={i} />
            </div>
            {/* pier: stem from card to deck, node on the deck, mono label on the far side */}
            <div aria-hidden className="relative row-start-2" style={col}>
              <span
                className={`absolute left-1/2 w-0 border-l ${p.unfinished ? "border-dashed border-ink" : "border-ink"} ${
                  above ? "top-0 h-1/2" : "bottom-0 h-1/2"
                }`}
              />
              <span
                className={`absolute left-1/2 top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 ${
                  p.unfinished ? "border-dashed bg-bg" : "bg-bg"
                } border-ink`}
              />
              <span
                className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-xs text-muted ${
                  above ? "top-[calc(50%+14px)]" : "bottom-[calc(50%+14px)]"
                }`}
              >
                PIER {pad(i + 1)}
              </span>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}

// Mobile / tablet: the same deck turned vertical.
function VerticalDeck({ piers }: { piers: Pier[] }) {
  return (
    <ol className="mt-10 ml-2 lg:hidden">
      {piers.map((p, i) => (
        <li
          key={p.title}
          className={`relative border-l-2 pl-6 ${p.unfinished ? "border-dashed border-ink" : "border-ink"} ${
            i < piers.length - 1 ? "pb-8" : ""
          }`}
        >
          <span
            aria-hidden
            className={`absolute -left-[9px] top-6 size-4 rounded-full border-2 border-ink bg-bg ${
              p.unfinished ? "border-dashed" : ""
            }`}
          />
          <PierCard p={p} i={i} />
        </li>
      ))}
    </ol>
  );
}

export function Journey() {
  const j = site.journey;
  return (
    <section id="journey" aria-label="journey" className="mx-auto max-w-[1100px] px-5 py-16 md:px-8">
      <SheetHeader n="03" name="CONSTRUCTION LOG" title={j.heading} />
      <p className="mt-3 text-muted">{j.intro}</p>
      <Deck piers={j.piers} />
      <VerticalDeck piers={j.piers} />
    </section>
  );
}
