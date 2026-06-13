---
name: design-system
description: Use when adding or editing pages, marketing sections, or copy on the Galaxy-Digital website (Astro 5 + Tailwind v4). Encodes the visual language, component kit, page recipe, tone of voice, and content/honesty rules.
---

# Galaxy-Digital Design System

Build on-brand pages fast and consistently. The site is **Astro 5 + Tailwind v4** (static), deep-space / "Technical Blueprint" aesthetic.

## Add a page in 5 minutes
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import PageHero from '../components/PageHero.astro';
import Section from '../components/Section.astro';
import CardGrid from '../components/CardGrid.astro';
import Card from '../components/Card.astro';
import FeatureList from '../components/FeatureList.astro';
import CtaBand from '../components/CtaBand.astro';
---
<BaseLayout title="Page Title" description="One-line SEO description.">
  <PageHero eyebrow="Eyebrow" title="Headline" lead="One or two sentences." />
  <Section texture="grid">
    <h2 class="text-2xl font-display font-semibold">Section title</h2>
    <CardGrid cols={3} class="mt-6">
      <Card title="Thing" icon="bot" index="01" variant="blueprint">Body copy.</Card>
    </CardGrid>
  </Section>
  <CtaBand />
</BaseLayout>
```
Routes are directory-style (`/page/`). Always end pages with `<CtaBand />` unless it's Contact/Legal.

## Visual language
- **Tokens** (in `src/styles/global.css` `@theme`): colours `space/bg2/panel/line/azure/cyan/deep/signal/txt/mut`; fonts `display` (Space Grotesk), `sans` (Inter), `mono` (JetBrains Mono); `shadow-glow`; `max-w-content`.
- **Gradients:** Tailwind v4 — use `bg-linear-to-r|b`, NEVER `bg-gradient-to-*` (it silently emits nothing).
- **Textures:** add `texture="grid"`, `"glow"`, or `"grid-glow"` to **one** prominent `<Section>` per page. Restraint — not every section. Textures are `pointer-events:none` and must never sit above links.
- **Cards:** `variant="blueprint"` (dashed + corner brackets, for "system/technical" grids) or default `panel`. Add `icon` + `index` (`"01"`) for scannable grids.

## Components — quick map (full detail: references/components.md)
`PageHero` (eyebrow+h1+lead) · `Section` (container + texture) · `Card` + `CardGrid` · `FeatureList` (✓/→ lists) · `Icon` (Lucide by name) · plus `Button`, `Pill`, `SectionHeading`, `CtaBand`, `MetricStat`, `CaseStudyCard`, and signature visuals `Terminal`/`Constellation`/`RegionMap`.

## Icons
Use `<Icon name="..." />` — names are the `IconName` union in `src/components/icons.ts` (e.g. layers, bot, cpu, shield-check, boxes, refresh-cw, database, activity, bug, gauge, clipboard-list, puzzle, workflow, shield, network, cloud, git-branch, users, globe). To add one: copy the inner SVG from lucide.dev into `icons.ts` and add the name to the union. Icons are decorative (`aria-hidden`).

## Marketing content & honesty (full detail: references/content.md)
Offering: consultancy-first **OpenShift + AIOps** MSP. Four pillars: Platform Engineering, Agentic Operations (6 Day-2 ops domains), AI Transformation (people/process), Security. Hosting is an add-on.
**Rules (non-negotiable):** no client names or traceable specifics (anonymize — "a European sovereign-cloud operator"); no unverified metrics (capability stats only); never frame the enterprise-retail AKS work as OpenShift.

## Tone of voice (full detail: references/voice.md)
Engineering-credible · confident-not-hype · concise (active, outcome-first) · honest · human+machine ("humans set intent, agents execute").

## Do / Don't
- DO reuse components; DON'T hand-roll a hero — use `PageHero`.
- DO use `bg-linear-to-*`; DON'T use `bg-gradient-to-*`.
- DO keep one `<h1>` per page (PageHero renders it).
- DON'T name a client or invent a metric.
- DON'T let a decorative element capture clicks (`pointer-events:none`, content at `z-10`).
