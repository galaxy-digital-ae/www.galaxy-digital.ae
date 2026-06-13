# Galaxy-Digital Design System

> This mirrors the `design-system` skill at `.claude/skills/design-system/SKILL.md`; keep both in sync.

The site is **Astro 5 + Tailwind v4** (static), with a deep-space / "Technical Blueprint" aesthetic. Reusable components live in `src/components/`; design tokens live in `src/styles/global.css` `@theme`.

## Design tokens

Defined in `src/styles/global.css` under `@theme`.

### Colours

| Token | Hex / value | Role |
| --- | --- | --- |
| `space` | `#04060E` | page background (deepest) |
| `bg2` | `#0A1020` | secondary background / gradient stop |
| `panel` | `#0C1426` | card / panel surface |
| `line` | `rgba(120,180,240,0.12)` | hairline borders |
| `azure` | `#1EA3E8` | primary accent / links |
| `cyan` | `#5CC8F7` | eyebrows, icons, indices |
| `deep` | `#1565D8` | gradient end (buttons) |
| `signal` | `#56D364` | success / ✓ marker |
| `txt` | `#E9EEFB` | body text |
| `mut` | `#94A3C4` | muted / secondary text |

### Fonts

| Role | Family | Usage |
| --- | --- | --- |
| `display` | Space Grotesk | headings (`font-display`) |
| `sans` | Inter | body (default) |
| `mono` | JetBrains Mono | indices, terminal, code |

Other tokens: `--shadow-glow` (`0 0 60px rgba(30,163,232,0.22)`), `--container-content` (`1180px`, via `max-w-content` / `container-x`), `--animate-fade-up`.

### Gradients
Tailwind v4: use `bg-linear-to-r` / `bg-linear-to-b`. **Never** use `bg-gradient-to-*` — it silently emits nothing.

## Component catalog

Prose mirror of `.claude/skills/design-system/references/components.md`. Props are the exact `Props` interfaces from each `.astro` file.

### Kit components

- **PageHero** (`PageHero.astro`) — page header rendering the single `<h1>`. Props: `eyebrow?: string`, `title: string`, `lead?: string`, plus a slot for CTAs.
- **Section** (`Section.astro`) — full-width wrapper with `container-x` inner; content at `z-10`. Props: `texture?: 'none' | 'grid' | 'glow' | 'grid-glow'` (default `'none'`), `class?: string` (default `'py-20'`). Textures are `pointer-events:none` and must never sit above links.
- **Card** (`Card.astro`) — card with optional icon chip + mono index. Props: `title: string`, `icon?: IconName`, `index?: string`, `variant?: 'panel' | 'blueprint'` (default `'panel'`). `blueprint` adds a dashed border and corner brackets. Body via slot.
- **CardGrid** (`CardGrid.astro`) — responsive grid for cards (`gap-4`, stacks on mobile). Props: `cols?: 2 | 3 | 4` (default `3`), `class?: string`.
- **FeatureList** (`FeatureList.astro`) — titled ✓/→ list. Props: `title?: string`, `items: string[]`, `marker?: 'check' | 'arrow'` (default `'check'`). `check` = signal-green ✓, `arrow` = azure →.
- **Icon** (`Icon.astro`) — inline Lucide SVG (1.6 stroke, `currentColor`, `aria-hidden`). Props: `name: IconName`, `class?: string` (default `'w-5 h-5'`).

### Supporting components

- **Button** (`Button.astro`) — link styled as a button. Props: `href: string`, `variant?: 'primary' | 'ghost'` (default `'primary'`), `class?: string`. `primary` = azure→deep gradient + glow; `ghost` = hairline outline. Label via slot.
- **Pill** (`Pill.astro`) — small hairline rounded tag. No props; content via slot.
- **SectionHeading** (`SectionHeading.astro`) — eyebrow + `<h2>` + sub block (PageHero owns the `<h1>`). Props: `eyebrow?: string`, `title: string`, `sub?: string`, `center?: boolean` (default `false`).
- **CtaBand** (`CtaBand.astro`) — closing call-to-action band with two fixed buttons. Props: `title?: string` (default `"Let's build the platform your AI runs on."`).
- **MetricStat** (`MetricStat.astro`) — single gradient stat + muted label. Props: `value: string`, `label: string`. Capability stats only.
- **CaseStudyCard** (`CaseStudyCard.astro`) — one anonymized case study. Props: `study: CaseStudy` (from `src/data/caseStudies.ts`: `{ tag, title, challenge, built, outcome, note? }`).

### Signature visuals

- **Terminal** (`Terminal.astro`) — bespoke animated "agent reconcile" terminal. No props (internal content); used in the homepage hero.
- **Constellation** (`Constellation.astro`) — SVG node-graph: OpenShift core linked to GitOps / Agentic Ops / SecOps / AI Layer. No props.
- **RegionMap** (`RegionMap.astro`) — region card grid (MEA / EU hosting), driven by `src/data/regions.ts`. No props.

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

Rules of thumb: routes are directory-style (`/page/`); keep one `<h1>` per page (PageHero renders it); end pages with `<CtaBand />` unless it's Contact/Legal; add a `texture` to **one** prominent `<Section>` per page (restraint).

## Icons

Use `<Icon name="..." />`. Names are the `IconName` union in `src/components/icons.ts`:

`layers`, `bot`, `cpu`, `shield-check`, `boxes`, `refresh-cw`, `database`, `activity`, `bug`, `gauge`, `clipboard-list`, `puzzle`, `workflow`, `shield`, `network`, `cloud`, `git-branch`, `users`, `globe`.

To add one: copy the inner SVG from [lucide.dev](https://lucide.dev) into `icons.ts` and add the name to the union. Icons are decorative (`aria-hidden`).

## Tone of voice

Full detail (with Good/Bad pairs): `.claude/skills/design-system/references/voice.md`. The five attributes:

1. **Engineering-credible** — name real technologies and patterns precisely.
2. **Confident, not hype** — state what we do plainly; no superlatives or buzzword stacking.
3. **Concise** — active voice, outcome first, cut filler.
4. **Honest** — claim only delivered capability; anonymize; never invent a metric.
5. **Human + machine** — agents do the routine work; humans set intent and own the guardrails.

Content & honesty rules (no client names or traceable specifics, no unverified metrics, never frame the AKS work as OpenShift) live in `.claude/skills/design-system/references/content.md`.
