# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## What this is

A single-page personal portfolio site (Rakshith Chandra Shekar) built with Next.js 16 (App Router) + React 19 + Tailwind CSS v4. No backend, no database, no API routes — it's one route (`/`) composed of section components, driven by a single typed content file (`src/content/site.ts`).

## Commands

```bash
npm run dev     # start dev server (localhost:3000)
npm run build    # production build
npm run start    # serve production build
npm run lint     # eslint (eslint-config-next core-web-vitals + typescript)
```

There is no test suite configured. `tsc` runs implicitly via `next build`/editor tooling (`noEmit: true` in tsconfig — there's no standalone typecheck script).

## Before writing any Next.js/React code

Read `AGENTS.md` first — this project pins **Next.js 16**, which has breaking changes vs. older training data. Check `node_modules/next/dist/docs/` for current API behavior before assuming conventions from memory (e.g. route params, caching defaults, config shape).

## Architecture

- **`src/app/page.tsx`** — the whole site. Renders `SiteHeader`, then `Hero (Sheet 01) → Work (02) → Journey / Construction log (03) → Experience (04) → About (05)`, then `Contact` (06, footer). Nav ids: work, journey, experience, about, contact. To reorder/add/remove a section, touch this file.
- **`src/content/site.ts`** — single source of truth for all copy: hero, projects, experience, about, credentials, contact. Edit text here, not in components. Projects have an optional `videoUrl`; a "Watch demo" button renders only when it is set. Preserve `TODO(Rakshith)` comments and provenance notes when editing.
- **`src/app/layout.tsx`** — root layout: Inter Tight + JetBrains Mono via `next/font/google`, metadata (`metadataBase` https://rakshithchandrashekar.com), and an inline script that sets `data-theme` before first paint.
- **`src/app/globals.css`** — Tailwind v4 `@theme inline` plus the two theme token sets (`paper`, `blueprint`).
- **`src/components/blueprint/*`** — drawing-language building blocks (`BridgeHero`, `SpanDiagram`, `SheetHeader`, `DrawingFrame`). Further animation components are added per the redesign plan.
- **`src/components/sections/*`** — one component per page section, each consuming `site.ts`.
- **`src/components/site-header.tsx`** / **`theme-toggle.tsx`** — sticky nav with active-section highlight; Paper/Blueprint toggle (localStorage in try/catch).

## Design system — read before touching UI

`.claude/skills/portfolio-design/SKILL.md` is the binding spec: "Blueprint for a bridge" — an engineering-drawing look (pale blue-grey paper / dark cyanotype themes, navy ink, one safety-orange accent, thin strokes, hand-authored inline SVG), where scrolling = a business request crossing the bridge from pylon ① to pylon ⑤. Use the CSS-variable tokens, never ad hoc colors. No glows, particles, parallax or ambient motion. Animate only transform/opacity/SVG stroke, once-only entries, and honour `prefers-reduced-motion`.

Stack: Tailwind v4 (config in CSS, no `tailwind.config`), `motion` (`motion/react`) for animation. shadcn/ui, `three` and the old particle/WebGL background were removed in the redesign.

## Content accuracy

Resume/project claims in `src/content/site.ts` (stats, counts, dates) have been through accuracy passes per recent commit history — several are tagged `// TODO(Rakshith): verify` where a number still needs confirmation against source (notebooks, repo READMEs). Don't casually change a stat without similar verification, and don't remove a `TODO(Rakshith)` comment without actually resolving it.

## Other directories

- `REF/` — scraped reference material from another site (design inspiration), not part of the build.
- `.claude/docs/` — holds the author's resume PDF for context, not consumed by the app.
