# Galaxy-Digital Design System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax. Invoke `frontend-design:frontend-design` when building components and `elements-of-style:writing-clearly-and-concisely` for the skill/docs prose.

**Goal:** Ship a documented design system for the Galaxy-Digital site — a reusable component kit (`Icon`, `Section`, `PageHero`, `Card`, `CardGrid`, `FeatureList`), a "Technical Blueprint" visual language with a Lucide icon set, every page retrofitted onto it, and an invokable `design-system` skill + reference doc.

**Architecture:** Astro 5 + Tailwind v4. New components in `src/components/`; icon path data in `src/components/icons.ts`; decoration utilities in `src/styles/global.css`. Data files gain an `icon` field. Pages are refactored to compose the kit (DRY). The skill lives at `.claude/skills/design-system/`.

**Tech Stack:** Astro, Tailwind v4 (`bg-linear-to-*`, `@theme` tokens), inlined Lucide SVGs (no runtime dep), TypeScript data.

**Reference:** Spec at `docs/superpowers/specs/2026-06-13-galaxy-digital-design-system.md`.

**Verification convention:** Each task gate = `npm run build` exits 0, then visual check via `npm run dev`. Commit after each task. **Pointer-events guard:** every decorative pseudo-element MUST set `pointer-events:none` and sit at `z-index:0` with content at `z-10` (we previously had a clickability regression — do not reintroduce overlays that capture clicks).

---

## File Structure

```
src/components/
  icons.ts        CREATE  IconName union + Lucide path map (19 icons)
  Icon.astro      CREATE  renders icons[name] as inline SVG (1.6 stroke, currentColor)
  Section.astro   CREATE  container + optional grid/glow texture
  PageHero.astro  CREATE  eyebrow + h1 + lead (+ slot)
  Card.astro      CREATE  card with optional icon/index, panel|blueprint variant
  CardGrid.astro  CREATE  responsive grid wrapper
  FeatureList.astro CREATE ✓/→ list
src/styles/global.css   MODIFY  add .gd-blueprint, .tex-grid, .tex-glow utilities
src/data/
  pillars.ts      MODIFY  add icon field
  opsDomains.ts   MODIFY  add icon field
  buildingBlocks.ts MODIFY add icon field
src/pages/** + src/components/home/**  MODIFY  retrofit onto the kit
.claude/skills/design-system/
  SKILL.md        CREATE  invokable skill
  references/components.md  CREATE
  references/content.md     CREATE
  references/voice.md       CREATE
docs/design-system.md       CREATE  human-readable mirror
```

---

## Phase A — Foundation

### Task 1: Icon system (`icons.ts` + `Icon.astro`)

**Files:** Create `src/components/icons.ts`, `src/components/Icon.astro`

- [ ] **Step 1: Create `src/components/icons.ts`** (Lucide paths, verbatim):
```ts
export type IconName =
  | 'layers' | 'bot' | 'cpu' | 'shield-check' | 'boxes' | 'refresh-cw'
  | 'database' | 'activity' | 'bug' | 'gauge' | 'clipboard-list' | 'puzzle'
  | 'workflow' | 'shield' | 'network' | 'cloud' | 'git-branch' | 'users' | 'globe';

export const icons: Record<IconName, string> = {
  'layers': '<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
  'bot': '<path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/>',
  'cpu': '<rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/>',
  'shield-check': '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  'boxes': '<path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z"/><path d="m7 16.5-4.74-2.85"/><path d="m7 16.5 5-3"/><path d="M7 16.5v5.17"/><path d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z"/><path d="m17 16.5-5-3"/><path d="m17 16.5 4.74-2.85"/><path d="M17 16.5v5.17"/><path d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0Z"/><path d="M12 8 7.26 5.15"/><path d="m12 8 4.74-2.85"/><path d="M12 13.5V8"/>',
  'refresh-cw': '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>',
  'database': '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/>',
  'activity': '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
  'bug': '<path d="m8 2 1.88 1.88"/><path d="M14.12 3.88 16 2"/><path d="M9 7.13v-1a3 3 0 1 1 6 0v1"/><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6Z"/><path d="M12 20v-9"/><path d="M6.53 9C4.6 8.8 3 7.1 3 5"/><path d="M6 13H2"/><path d="M3 21c0-2.1 1.7-3.9 3.8-4"/><path d="M20.97 5c0 2.1-1.6 3.8-3.5 4"/><path d="M22 13h-4"/><path d="M17.2 17c2.1.1 3.8 1.9 3.8 4"/>',
  'gauge': '<path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>',
  'clipboard-list': '<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>',
  'puzzle': '<path d="M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 19.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L4.61 19.61a1 1 0 0 1 .474-1.68 2.5 2.5 0 1 0-3.015-3.014 1 1 0 0 1-1.68-.474L-1.293 12.76" transform="translate(2 -1.4)"/>',
  'workflow': '<rect width="8" height="8" x="3" y="3" rx="2"/><path d="M7 11v4a2 2 0 0 0 2 2h4"/><rect width="8" height="8" x="13" y="13" rx="2"/>',
  'shield': '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
  'network': '<rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/>',
  'cloud': '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>',
  'git-branch': '<line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',
  'users': '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  'globe': '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
};
```
> Note on `puzzle`: if the transformed path renders oddly, replace its value with Lucide's canonical `puzzle` path from https://lucide.dev (copy the inner SVG). Verify visually in Step 4.

- [ ] **Step 2: Create `src/components/Icon.astro`:**
```astro
---
import { icons, type IconName } from './icons';
interface Props { name: IconName; class?: string; }
const { name, class: cls = 'w-5 h-5' } = Astro.props;
---
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class={cls} set:html={icons[name]} />
```

- [ ] **Step 3: Verify build** — temporarily add `<Icon name="bot" />` to `src/pages/index.astro` (import it), run `npm run build` (exit 0), then `grep -o 'stroke-width="1.6"' dist/index.html | head -1` should match. Remove the temporary usage before committing.
- [ ] **Step 4: Visual check** — `npm run dev`, confirm a few icons render cleanly (especially `boxes`, `bug`, `puzzle`, `workflow`); redraw `puzzle` per the note if needed.
- [ ] **Step 5: Commit** — `git add src/components/icons.ts src/components/Icon.astro && git commit -m "Add Lucide-based Icon component and icon set"`

---

### Task 2: Decoration utilities + `Section.astro`

**Files:** Modify `src/styles/global.css`; Create `src/components/Section.astro`

- [ ] **Step 1: Append decoration utilities to `src/styles/global.css`** (inside the existing `@layer components { ... }` block, before its closing brace — or add a new `@layer components` block at end):
```css
@layer components {
  /* Blueprint card corner brackets */
  .gd-blueprint { position: relative; }
  .gd-blueprint::before, .gd-blueprint::after {
    content: ""; position: absolute; width: 9px; height: 9px;
    border: 1.5px solid var(--color-cyan); pointer-events: none;
  }
  .gd-blueprint::before { top: -1px; left: -1px; border-right: 0; border-bottom: 0; border-top-left-radius: 4px; }
  .gd-blueprint::after  { bottom: -1px; right: -1px; border-left: 0; border-top: 0; border-bottom-right-radius: 4px; }

  /* Section textures — decorative only, never capture clicks */
  .tex-grid::before {
    content: ""; position: absolute; inset: 0; z-index: 0; pointer-events: none;
    background-image:
      linear-gradient(rgba(120,180,240,.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(120,180,240,.05) 1px, transparent 1px);
    background-size: 32px 32px;
    -webkit-mask-image: radial-gradient(70% 60% at 50% 30%, #000, transparent);
            mask-image: radial-gradient(70% 60% at 50% 30%, #000, transparent);
  }
  .tex-glow::after {
    content: ""; position: absolute; inset: 0; z-index: 0; pointer-events: none;
    background: radial-gradient(600px 320px at 82% -10%, rgba(30,163,232,.14), transparent 60%);
  }
}
```

- [ ] **Step 2: Create `src/components/Section.astro`:**
```astro
---
interface Props { texture?: 'none' | 'grid' | 'glow' | 'grid-glow'; class?: string; }
const { texture = 'none', class: cls = 'py-20' } = Astro.props;
const tex = texture === 'grid' ? 'tex-grid'
  : texture === 'glow' ? 'tex-glow'
  : texture === 'grid-glow' ? 'tex-grid tex-glow' : '';
---
<section class={`relative ${tex}`}>
  <div class={`container-x relative z-10 ${cls}`}><slot /></div>
</section>
```

- [ ] **Step 3: Verify** — temporarily wrap a homepage section in `<Section texture="grid">`, build (exit 0), and in the browser confirm the grid fades behind content AND links inside remain clickable (click a nav/CTA inside it). Run `grep -o 'tex-grid' dist/index.html | head -1`. Revert the temporary change.
- [ ] **Step 4: Commit** — `git add src/styles/global.css src/components/Section.astro && git commit -m "Add blueprint + texture utilities and Section component"`

---

### Task 3: `PageHero.astro`

**Files:** Create `src/components/PageHero.astro`

- [ ] **Step 1: Create the file:**
```astro
---
interface Props { eyebrow?: string; title: string; lead?: string; }
const { eyebrow, title, lead } = Astro.props;
---
<section class="container-x pt-20 pb-10">
  {eyebrow && <span class="text-xs font-semibold uppercase tracking-[0.18em] text-cyan">{eyebrow}</span>}
  <h1 class="mt-4 text-4xl md:text-5xl font-display font-semibold tracking-tight max-w-3xl">{title}</h1>
  {lead && <p class="mt-6 text-lg text-mut max-w-2xl">{lead}</p>}
  <slot />
</section>
```
- [ ] **Step 2: Verify & commit** — build exits 0. `git add src/components/PageHero.astro && git commit -m "Add PageHero component"`

---

### Task 4: `Card.astro` + `CardGrid.astro`

**Files:** Create `src/components/Card.astro`, `src/components/CardGrid.astro`

- [ ] **Step 1: Create `src/components/Card.astro`:**
```astro
---
import Icon from './Icon.astro';
import type { IconName } from './icons';
interface Props { title: string; icon?: IconName; index?: string; variant?: 'panel' | 'blueprint'; }
const { title, icon, index, variant = 'panel' } = Astro.props;
const surface = variant === 'blueprint'
  ? 'gd-blueprint border border-dashed border-cyan/30 bg-[rgba(8,12,22,0.7)]'
  : 'bg-linear-to-b from-panel to-bg2 hairline';
---
<div class={`relative rounded-2xl p-6 ${surface}`}>
  {(icon || index) && (
    <div class="flex items-center justify-between">
      {icon && <span class="w-10 h-10 rounded-[10px] border border-cyan/40 flex items-center justify-center text-cyan"><Icon name={icon} /></span>}
      {index && <span class="font-mono text-xs text-cyan">{index}</span>}
    </div>
  )}
  <h3 class="mt-3 font-display text-lg font-semibold">{title}</h3>
  <div class="mt-2 text-sm text-mut"><slot /></div>
</div>
```
- [ ] **Step 2: Create `src/components/CardGrid.astro`:**
```astro
---
interface Props { cols?: 2 | 3 | 4; class?: string; }
const { cols = 3, class: cls = '' } = Astro.props;
const grid = cols === 2 ? 'md:grid-cols-2'
  : cols === 4 ? 'md:grid-cols-2 lg:grid-cols-4'
  : 'md:grid-cols-2 lg:grid-cols-3';
---
<div class={`grid gap-4 ${grid} ${cls}`}><slot /></div>
```
- [ ] **Step 3: Verify** — build exits 0; temporarily render `<CardGrid><Card title="Test" icon="bot" index="01" variant="blueprint">body</Card></CardGrid>` on a page, confirm brackets + icon render and the card is not clickable-blocking. Revert.
- [ ] **Step 4: Commit** — `git add src/components/Card.astro src/components/CardGrid.astro && git commit -m "Add Card and CardGrid components"`

---

### Task 5: `FeatureList.astro`

**Files:** Create `src/components/FeatureList.astro`

- [ ] **Step 1: Create the file:**
```astro
---
interface Props { title?: string; items: string[]; marker?: 'check' | 'arrow'; }
const { title, items, marker = 'check' } = Astro.props;
const glyph = marker === 'check' ? '✓' : '→';
const glyphClass = marker === 'check' ? 'text-signal' : 'text-azure';
---
<div>
  {title && <h2 class="text-2xl font-display font-semibold">{title}</h2>}
  <ul class="mt-6 space-y-3">
    {items.map((it) => <li class="flex gap-3 text-mut"><span class={glyphClass}>{glyph}</span>{it}</li>)}
  </ul>
</div>
```
- [ ] **Step 2: Verify & commit** — build exits 0. `git add src/components/FeatureList.astro && git commit -m "Add FeatureList component"`

---

## Phase B — Data

### Task 6: Add `icon` fields to data

**Files:** Modify `src/data/pillars.ts`, `src/data/opsDomains.ts`, `src/data/buildingBlocks.ts`

- [ ] **Step 1: `pillars.ts`** — add `icon: IconName` to the interface and each pillar. Add `import type { IconName } from '../components/icons';` at top, add `icon` to the `Pillar` interface, and set: platform-engineering `'layers'`, agentic-operations `'bot'`, ai-transformation `'cpu'`, security `'shield-check'`.
- [ ] **Step 2: `opsDomains.ts`** — add `import type { IconName } from '../components/icons';`, add `icon: IconName` to `OpsDomain`, set: Provisioning `'boxes'`, Lifecycle management `'refresh-cw'`, Backup & DR `'database'`, Monitoring & observability `'activity'`, Debugging & incident response `'bug'`, Capacity & maintenance `'gauge'`.
- [ ] **Step 3: `buildingBlocks.ts`** — add `import type { IconName } from '../components/icons';`, add `icon: IconName` to `Block`, set: SOPs `'clipboard-list'`, Skills `'puzzle'`, Sub-agents `'workflow'`, Guardrails `'shield'`, MCP gateway `'network'`.
- [ ] **Step 4: Verify** — `npm run build` exits 0 (TS will flag any name not in `IconName` — fix typos).
- [ ] **Step 5: Commit** — `git add src/data/pillars.ts src/data/opsDomains.ts src/data/buildingBlocks.ts && git commit -m "Add icon fields to pillars, ops domains, building blocks"`

---

## Phase C — Retrofit

> **Recipe for every page:** (1) replace the inline eyebrow+h1+lead `<section>` with `<PageHero eyebrow title lead />`; (2) replace inline card-grid `<section>`s with `<Section>` + `<CardGrid>` + `<Card icon index>`; (3) replace inline ✓/→ two-column lists with `<FeatureList>`; (4) add `texture="grid"` or `"glow"` to **one** prominent section per page (restraint — not every section). Keep all copy identical. Tailwind v4: `bg-linear-to-*` only.

### Task 7: Worked example — Agentic Operations page

**Files:** Modify `src/pages/services/agentic-operations.astro`

- [ ] **Step 1: Replace the file** (this is the reference implementation other pages follow):
```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import PageHero from '../../components/PageHero.astro';
import Section from '../../components/Section.astro';
import CardGrid from '../../components/CardGrid.astro';
import Card from '../../components/Card.astro';
import CtaBand from '../../components/CtaBand.astro';
import { pillars } from '../../data/pillars';
import { opsDomains } from '../../data/opsDomains';
const p = pillars.find((x) => x.slug === 'agentic-operations')!;
const intro = `The routine Day-2 operations that consume a platform team — run as autonomous agentic workflows. Humans set intent and own the guardrails; agents detect, plan, act and verify.`;
---
<BaseLayout title={p.name} description={p.blurb}>
  <PageHero eyebrow={p.marketing} title={p.name} lead={intro} />
  <Section texture="grid">
    <h2 class="text-2xl font-display font-semibold">Six operations domains, automated</h2>
    <CardGrid cols={3} class="mt-6">
      {opsDomains.map((d, i) => (
        <Card title={d.name} icon={d.icon} index={`0${i + 1}`} variant="blueprint">{d.blurb}</Card>
      ))}
    </CardGrid>
    <p class="mt-6 text-sm text-mut">Want the mechanism behind this? See <a href="/how-we-automate" class="text-azure hover:brightness-110">how we automate operations →</a></p>
  </Section>
  <CtaBand title="Let's make your platform run itself." />
</BaseLayout>
```
- [ ] **Step 2: Verify** — build exits 0; `/services/agentic-operations/` shows blueprint cards with icons + `// 01` indices and a faded grid behind the section; the How-We-Automate link is clickable.
- [ ] **Step 3: Commit** — `git add src/pages/services/agentic-operations.astro && git commit -m "Retrofit agentic operations page onto the kit"`

### Task 8: Retrofit remaining service pages + overview

**Files:** Modify `src/pages/services/index.astro`, `platform-engineering.astro`, `ai-transformation.astro`, `security.astro`

- [ ] **Step 1: Apply the recipe to each**, keeping all copy identical:
  - **platform-engineering**: PageHero; `What you get`/`Outcomes` → two `<FeatureList>` (marker `check`/`arrow`) inside a `<Section>`; the "platform stack we build" 3 cards → `<CardGrid cols={3}>` of `<Card>` (no icon needed, or icons `boxes`/`git-branch`/`cpu`); add `texture="glow"` to the stack section.
  - **ai-transformation**: PageHero; `What we do`/`Outcomes` → two `<FeatureList>`.
  - **security**: PageHero; `What you get`/`Outcomes` → two `<FeatureList>`.
  - **services/index**: PageHero; keep the `PillarCard` grid; wrap in `<Section>`.
- [ ] **Step 2: Verify** — build exits 0; all four routes render; copy unchanged (`grep` a distinctive phrase per page).
- [ ] **Step 3: Commit** — `git add src/pages/services && git commit -m "Retrofit services overview and pillar pages onto the kit"`

### Task 9: Retrofit Custom Build, How We Automate, Case Studies

**Files:** Modify `src/pages/custom-build.astro`, `src/pages/how-we-automate.astro`, `src/pages/case-studies.astro`

- [ ] **Step 1: Apply the recipe:**
  - **custom-build**: PageHero; `audience` list → `<CardGrid cols={3}>` of plain `<Card>`; `whatWeBuild` → `<CardGrid cols={3}>` of `<Card index>` ; hosting block stays; add `texture="glow"` to the "what we build" section.
  - **how-we-automate**: PageHero; `buildingBlocks` → `<CardGrid cols={2}>`-ish or keep the numbered rows but add `<Card icon={b.icon} index>`; the loop (Detect→Plan→Act→Verify) → `<CardGrid cols={4}>` of `<Card>`; `texture="grid"` on the building-blocks section.
  - **case-studies**: PageHero; keep `CaseStudyCard` grid inside a `<Section>`.
- [ ] **Step 2: Verify** — build exits 0; `grep -riE 'tesco|hoolia' dist/ ; echo exit=$?` → no output, exit 1 (anonymization intact).
- [ ] **Step 3: Commit** — `git add src/pages/custom-build.astro src/pages/how-we-automate.astro src/pages/case-studies.astro && git commit -m "Retrofit custom-build, how-we-automate, case-studies onto the kit"`

### Task 10: Retrofit Platform, Approach, About, Contact, Legal + homepage sections

**Files:** Modify `src/pages/platform.astro`, `approach.astro`, `about.astro`, `contact.astro`, `legal.astro`, `src/pages/index.astro`, `src/components/home/*.astro`

- [ ] **Step 1: Apply the recipe** (PageHero for each page hero; `<Section>` wrappers; `texture` on one section each for platform/approach/about). For the homepage: keep the custom `Hero` (its terminal is bespoke), but wrap the pillars/ops/metrics/team sections in `<Section>` and convert the inline `Differentiator`/`Engage` loop cards and the Custom-Build band's ops list to `<Card>`/icons where it improves them. Contact and Legal: PageHero only (no cards). Do NOT alter the contact form or the WhatsApp button.
- [ ] **Step 2: Verify** — `npm run build` exits 0; all 14 routes present; single h1 per page (`for f in $(find dist -name index.html); do echo "$(grep -c '<h1' $f) $f"; done` — every count = 1); a contact-page click target (phone/WhatsApp) still present.
- [ ] **Step 3: Commit** — `git add src/pages src/components/home && git commit -m "Retrofit remaining pages and homepage sections onto the kit"`

---

## Phase D — Skill + docs

### Task 11: The `design-system` skill

**Files:** Create `.claude/skills/design-system/SKILL.md`, `references/components.md`, `references/content.md`, `references/voice.md`

- [ ] **Step 1: Create `.claude/skills/design-system/SKILL.md`:**
````markdown
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
**Rules (non-negotiable):** no client names or traceable specifics (anonymize — "a European sovereign-cloud operator"); no unverified metrics (capability stats only); never frame the AKS/Tesco work as OpenShift.

## Tone of voice (full detail: references/voice.md)
Engineering-credible · confident-not-hype · concise (active, outcome-first) · honest · human+machine ("humans set intent, agents execute").

## Do / Don't
- DO reuse components; DON'T hand-roll a hero — use `PageHero`.
- DO use `bg-linear-to-*`; DON'T use `bg-gradient-to-*`.
- DO keep one `<h1>` per page (PageHero renders it).
- DON'T name a client or invent a metric.
- DON'T let a decorative element capture clicks (`pointer-events:none`, content at `z-10`).
````

- [ ] **Step 2: Create `references/components.md`** — a table of every component with: purpose, props (names + types from the `.astro` `Props` interfaces created in Phase A), and a minimal usage example for each (`PageHero`, `Section`, `Card`, `CardGrid`, `FeatureList`, `Icon`, plus one-liners for `Button`/`Pill`/`SectionHeading`/`CtaBand`/`MetricStat`/`CaseStudyCard`/`Terminal`/`Constellation`/`RegionMap`). Use the exact prop names from the implemented components.
- [ ] **Step 3: Create `references/content.md`** — the offering, the four pillar one-liners, the 6 ops domains, the building blocks, the two anonymized case angles, and the full honesty/anonymization rules (no names, no unverified metrics, Tesco-as-AIOps). Mirror the positioning from `docs/superpowers/specs/2026-06-13-galaxy-digital-productization-content-design.md`.
- [ ] **Step 4: Create `references/voice.md`** — the five voice attributes, each with a one-line rule and a good/bad example pair (e.g. Good: "We turn OpenShift GitOps into autonomous operations." / Bad: "We leverage world-class, cutting-edge cloud synergies.").
- [ ] **Step 5: Verify** — `npm run build` still exits 0 (skill files don't affect the build). Confirm files exist: `ls .claude/skills/design-system/SKILL.md .claude/skills/design-system/references/`.
- [ ] **Step 6: Commit** — `git add .claude/skills/design-system && git commit -m "Add design-system skill with references"`

### Task 12: Human-readable `docs/design-system.md`

**Files:** Create `docs/design-system.md`

- [ ] **Step 1: Create the file** — a human-facing mirror: a tokens table (colour swatches as hex, fonts), the component catalog (same as references/components.md, prose form), the "add a page" recipe, the icon list, tone of voice, and a link to the skill (`.claude/skills/design-system/SKILL.md`). Note at top: "This mirrors the `design-system` skill; keep both in sync."
- [ ] **Step 2: Commit** — `git add docs/design-system.md && git commit -m "Add human-readable design-system reference"`

---

## Phase E — Verify & ship

### Task 13: Full verification, a11y, deploy

**Files:** none (verification + deploy)

- [ ] **Step 1: Full build + route check** — `npm run build` exit 0; `find dist -name index.html | wc -l` = 14.
- [ ] **Step 2: a11y / pointer-events sweep** — `npm run dev`; on `/`, `/custom-build/`, `/services/agentic-operations/`, `/how-we-automate/` at 375px and desktop: confirm single h1, grids stack, **every nav/CTA/in-section link is clickable** (the textures must not block), icons render, no horizontal scroll.
- [ ] **Step 3: Anonymization gate** — `grep -riE 'tesco|hoolia' dist/ && echo "LEAK — FIX" || echo "clean ✓"` → must print `clean ✓`.
- [ ] **Step 4: Deploy** —
```bash
rm -rf /tmp/gdctx && mkdir -p /tmp/gdctx && git archive HEAD | tar -x -C /tmp/gdctx
oc start-build galaxy-digital-build --from-dir=/tmp/gdctx --follow -n galaxy-digital-web
oc rollout status deploy/galaxy-digital -n galaxy-digital-web --timeout=180s
```
- [ ] **Step 5: Verify live** — `for p in / /custom-build/ /services/agentic-operations/ /how-we-automate/ /about/; do curl -s -o /dev/null -w "%{http_code} $p\n" "https://www.galaxy-digital.ae$p"; done` → all 200. Spot-check a clean-URL link still 301→relative (no `:8080`): `curl -sI https://www.galaxy-digital.ae/custom-build | grep -i location` → `location: /custom-build/`.
- [ ] **Step 6: Commit any fixes** — `git add -A && git commit -m "Polish design-system retrofit"` (skip if clean).

---

## Self-Review (completed by plan author)

**Spec coverage:** Visual language (textures, blueprint cards, mono index) → Tasks 2,4,7. Lucide icons 1.6/cyan → Tasks 1,6. Component kit (Icon/Section/PageHero/Card/CardGrid/FeatureList) → Tasks 1-5. Data icon fields → Task 6. Retrofit all pages → Tasks 7-10. Skill + references → Task 11. docs mirror → Task 12. Tone/content/honesty → Task 11 (SKILL + references). Deploy → Task 13. **All spec sections covered.**

**Placeholder scan:** No TBD/TODO. The `puzzle` path has a fallback instruction (verify-and-replace), not a placeholder. Retrofit Tasks 8-10 give per-page directives against existing files (the worked example in Task 7 shows the exact transformation) — actionable, not vague.

**Type consistency:** `IconName` defined in Task 1, imported by `Icon` (Task 1), `Card` (Task 4), and data files (Task 6) with matching names. `Card` props (`title`, `icon`, `index`, `variant`) used consistently in Tasks 7-10. `Section` `texture` union values match the CSS classes from Task 2. `FeatureList` `marker` values (`check`/`arrow`) consistent. `CardGrid` `cols` (2/3/4) matches the class map.
