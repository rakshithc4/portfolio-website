import { site } from "@/content/site";
import { SheetHeader } from "@/components/blueprint/sheet-header";
import { ContactArrival, ARRIVAL_DONE } from "@/components/blueprint/contact-arrival";
import { Seal } from "@/components/logo";
import { Arrow } from "@/components/arrow";

export function Contact() {
  const c = site.contact;
  return (
    <footer id="contact" aria-label="contact" className="mx-auto max-w-[1100px] px-5 pb-10 pt-16 md:px-8">
      {/* heading fades up after the arrival drawing finishes */}
      <SheetHeader n="06" name="CONTACT" title={c.heading} headingDelay={ARRIVAL_DONE} />
      <div className="mt-8 grid items-end gap-10 lg:grid-cols-[1fr_280px]">
        <div>
          <a
            href={`mailto:${c.email}`}
            className="u-draw inline-block break-all text-3xl font-semibold tracking-tight hover:text-accent-text md:text-5xl"
          >
            {c.email}
          </a>
          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-[15px]">
            <li><a href={c.phoneHref} className="link-u hover:text-accent-text">{c.phone}</a></li>
            <li><a href={c.linkedin} className="link-u hover:text-accent-text">LinkedIn <Arrow dir="ne" /></a></li>
            <li><a href={c.github} className="link-u hover:text-accent-text">GitHub <Arrow dir="ne" /></a></li>
            <li><a href={site.resumeHref} className="link-u hover:text-accent-text">Resume PDF <Arrow dir="s" /></a></li>
          </ul>
          <p className="mt-8 max-w-[40rem] text-muted">{c.line}</p>
        </div>
        <ContactArrival />
      </div>
      <div className="mt-16 flex items-center justify-between gap-6 border-t border-line pt-6">
        <p className="font-mono text-xs text-muted">{c.footer}</p>
        <Seal className="size-24 shrink-0 text-ink" />
      </div>
    </footer>
  );
}
