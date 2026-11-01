import { site } from "@/content/site";
import { SheetHeader } from "@/components/blueprint/sheet-header";

export function Contact() {
  const c = site.contact;
  return (
    <footer id="contact" aria-label="contact" className="mx-auto max-w-[1100px] px-5 pb-10 pt-16 md:px-8">
      <SheetHeader n="06" name="CONTACT" title={c.heading} />
      <a
        href={`mailto:${c.email}`}
        className="mt-8 inline-block break-all text-3xl font-semibold tracking-tight underline decoration-accent decoration-2 underline-offset-8 hover:text-accent-text md:text-5xl"
      >
        {c.email}
      </a>
      <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-[15px]">
        <li><a href={c.phoneHref} className="underline underline-offset-4 hover:text-accent-text">{c.phone}</a></li>
        <li><a href={c.linkedin} className="underline underline-offset-4 hover:text-accent-text">LinkedIn ↗</a></li>
        <li><a href={c.github} className="underline underline-offset-4 hover:text-accent-text">GitHub ↗</a></li>
        <li><a href={site.resumeHref} className="underline underline-offset-4 hover:text-accent-text">Resume PDF ↓</a></li>
      </ul>
      <p className="mt-8 max-w-[40rem] text-muted">{c.line}</p>
      <p className="mt-16 border-t border-line pt-6 font-mono text-xs text-muted">{c.footer}</p>
    </footer>
  );
}
