import { Fragment } from "react";
import { site, type Pier } from "@/content/site";
import { SheetHeader } from "@/components/blueprint/sheet-header";
import { PierIcon } from "@/components/blueprint/pier-icon";
import { MarginNote } from "@/components/blueprint/margin-note";
import { JourneyBridge } from "@/components/blueprint/journey-bridge";
import { Reveal } from "@/components/motion/reveal";
import { Arrow } from "@/components/arrow";

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
    <div className={`card-draft border bg-card p-5 ${p.unfinished ? "border-dashed border-ink" : "border-line"}`}>
      <div className="flex items-center gap-3">
        <PierIcon name={p.icon} dashed={p.unfinished} />
        <p className="font-mono text-xs leading-snug tracking-wide text-accent-text">
          PIER {pad(i + 1)} · {p.stage}
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

// One list of pier cards (a single copy in the DOM). The bridge drawing beside it (a strip above it on
// small screens) builds pier by pier as the cards scroll past: see journey-bridge.tsx.
export function Journey() {
  const j = site.journey;
  return (
    <section id="journey" aria-labelledby="journey-heading" className="mx-auto max-w-[1100px] px-5 py-16 md:px-8">
      <SheetHeader id="journey-heading" n="03" name="CONSTRUCTION LOG" title={j.heading} />
      <p className="mt-3 text-muted">{j.intro}</p>
      <JourneyBridge piers={j.piers.map((p) => ({ stage: p.stage, title: p.title, unfinished: !!p.unfinished }))}>
        {j.piers.map((p, i) => (
          <Reveal as="li" key={p.title} className={`relative ${p.note ? "sm:mt-8" : ""}`}>
            <PierCard p={p} i={i} />
            {p.note && (
              <MarginNote
                text={p.note}
                className="-top-8 left-6 -rotate-2 whitespace-nowrap"
                arrow="left-full top-1/2 ml-1 -scale-x-100"
              />
            )}
          </Reveal>
        ))}
      </JourneyBridge>
    </section>
  );
}
