import { Fragment } from "react";
import { site, type Pier } from "@/content/site";
import { SheetHeader } from "@/components/blueprint/sheet-header";
import { PierIcon } from "@/components/blueprint/pier-icon";
import { InView } from "@/components/in-view";
import { Arrow } from "@/components/arrow";
import { journey, r } from "@/lib/motion-config";

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
          <a key={i} href={l.href} className="font-medium link-u hover:text-accent-text">
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
        <a href={p.cta.href} className="mt-4 inline-block font-medium link-u hover:text-accent-text">
          {p.cta.label.replace(/\s*→$/, "")} <Arrow dir="e" />
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
      {/* deck line: draws left to right; solid to the last built pier, dashed beyond it (draws last) */}
      <InView aria-hidden className="relative col-span-8 col-start-1 row-start-2">
        <div data-r="line-x" className="absolute left-0 top-1/2 h-0 w-[81.25%] border-t-2 border-ink" style={r(0, journey.deckDur)} />
        <div
          data-r="line-x"
          className="absolute left-[81.25%] top-1/2 h-0 w-[18.75%] border-t-2 border-dashed border-ink"
          style={r(journey.dashedDeckDelay, 0.4)}
        />
        <div data-r="fade" className="absolute left-0 top-1/2 h-4 w-0 -translate-y-1/2 border-l-2 border-ink" style={r(0, 0.3)} />
      </InView>

      {piers.map((p, i) => {
        const start = i + 1; // pier centre sits on the boundary between columns `start` and `start+1`
        const above = i % 2 === 0; // card above the deck for odd piers
        const col = { gridColumn: `${start} / span 2` };
        const d = journey.pierStart + i * journey.pierStep; // node -> stem -> card, ~150ms apart per pier
        return (
          <Fragment key={p.title}>
            <InView
              data-r="up"
              className={`px-2 ${above ? "row-start-1 self-end" : "row-start-3 self-start"}`}
              style={{ ...col, ...r(d + journey.cardLag) }}
            >
              <PierCard p={p} i={i} />
            </InView>
            {/* pier: node on the deck, stem to the card, mono label on the far side */}
            <InView aria-hidden className="relative row-start-2" style={col}>
              <span
                data-r="pop"
                className="absolute left-1/2 top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ink bg-bg"
                style={r(d, 0.3)}
              />
              <span
                data-r={above ? "stem-up" : "stem-down"}
                className={`absolute left-1/2 w-0 border-l ${p.unfinished ? "border-dashed border-ink" : "border-ink"} ${
                  above ? "top-0 h-1/2" : "bottom-0 h-1/2"
                }`}
                style={r(d + journey.stemLag, 0.3)}
              />
              <span
                data-r="fade"
                className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-xs text-muted ${
                  above ? "top-[calc(50%+14px)]" : "bottom-[calc(50%+14px)]"
                }`}
                style={r(d, 0.3)}
              >
                PIER {pad(i + 1)}
              </span>
            </InView>
          </Fragment>
        );
      })}
    </div>
  );
}

// Mobile / tablet: the same deck turned vertical. Each pier reveals as it scrolls into view:
// deck line draws downward, node pops, card fades up.
function VerticalDeck({ piers }: { piers: Pier[] }) {
  return (
    <ol className="mt-10 ml-2 lg:hidden">
      {piers.map((p, i) => (
        <InView
          as="li"
          key={p.title}
          className={`relative pl-6 ${i < piers.length - 1 ? "pb-8" : ""}`}
        >
          <span
            aria-hidden
            data-r="line-y"
            className={`absolute bottom-0 left-0 top-0 w-0 border-l-2 border-ink ${p.unfinished ? "border-dashed" : ""}`}
            style={r(0, 0.6)}
          />
          <span
            aria-hidden
            data-r="pop"
            className={`absolute -left-[7px] top-6 size-4 rounded-full border-2 border-ink bg-bg ${
              p.unfinished ? "border-dashed" : ""
            }`}
            style={r(0.1, 0.3)}
          />
          <div data-r="up" style={r(0.25)}>
            <PierCard p={p} i={i} />
          </div>
        </InView>
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
