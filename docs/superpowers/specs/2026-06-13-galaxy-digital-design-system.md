# Galaxy-Digital Design System — Spec

**Date:** 2026-06-13
**Builds on:** the live Astro 5 + Tailwind v4 site (positioning, tokens, components already shipped).
**Goal:** Turn the current ad-hoc component set into a real, documented design system: a reusable component kit, a "Technical Blueprint" visual language with a Lucide icon set, every page retrofitted onto it, and an **invokable skill** that lets anyone (or Claude) add an on-brand page or marketing section consistently.

---

## 1. Decisions (locked in brainstorming)

- **Visual language:** "Technical Blueprint" — masked dot/line grid textures, nebula-glow accents, refined cards with an optional dashed + corner-bracket variant, mono index labels.
- **Icons:** **Lucide**, re-stroked to **1.6** and coloured **cyan**, inlined as SVG (no runtime icon font).
- **Skill format:** invokable skill at `.claude/skills/design-system/SKILL.md` **plus** a human-readable `docs/design-system.md`.
- **Tone of voice (locked):** engineering-credible · confident-not-hype · concise (active, outcome-first) · honest (no fabricated proof; anonymized clients; capability stats only) · human+machine ("humans set intent, agents execute").
- **Rollout:** retrofit **all** pages.

---

## 2. Visual language — "Technical Blueprint"

- **Section textures (sparing, not every section):** a faint grid (`linear-gradient` 1px lines, ~32px cell) radially masked so it fades out, optionally with a nebula radial-glow accent. Driven by a `texture` prop on `Section` (`none` | `grid` | `glow` | `grid-glow`). Default `none`.
- **Cards:** base = solid panel (`bg-linear-to-b from-panel to-bg2`, hairline). `blueprint` variant adds a dashed cyan border + two corner brackets (`::before`/`::after`). A mono index (`// 01` or `01`) is optional via prop.
- **Icons:** Lucide shapes at `stroke-width: 1.6`, `currentColor` (cyan in context), 24px grid, in a bordered rounded tile. ~19 icons used (see §4).
- **Motion:** unchanged — existing `animate-fade-up`; all decoration respects `prefers-reduced-motion` (textures are static; no new animation required).
- **Constraints:** Tailwind v4 — gradients use `bg-linear-to-*`. No new runtime dependencies; Lucide SVGs are hand-inlined into `Icon.astro` (not the `lucide` npm package at runtime).

---

## 3. Component system

Each component has one responsibility and a typed `Props` interface. New components live in `src/components/`.

| Component | Responsibility | Key props |
|---|---|---|
| `Icon.astro` | name → inlined Lucide SVG (1.6 stroke, currentColor) | `name: IconName`, `class?` |
| `Section.astro` | consistent vertical rhythm + `container-x` + optional texture | `texture?: 'none'\|'grid'\|'glow'\|'grid-glow'`, `class?`, slot |
| `PageHero.astro` | the eyebrow + h1 + lead block (replaces 13 inline copies) | `eyebrow?`, `title`, `lead?`, slot (for CTAs) |
| `Card.astro` | one card: optional icon, index, title, body | `title`, `icon?: IconName`, `index?: string`, `variant?: 'panel'\|'blueprint'`, slot/`body?` |
| `CardGrid.astro` | responsive grid wrapper for cards | `cols?: 2\|3\|4`, slot |
| `FeatureList.astro` | the ✓/→ list (one or two columns) | `title?`, `items: string[]`, `marker?: 'check'\|'arrow'` |

- **Reuse first:** `SectionHeading`, `Button`, `Pill`, `CtaBand`, `MetricStat`, `PillarCard`, `TeamCard`, `CaseStudyCard`, `TechStrip`, `Terminal`, `Constellation`, `RegionMap`, `Nav`, `Footer`, `WhatsAppButton` stay. `PillarCard`/`MetricStat`/`CaseStudyCard` gain an icon where it improves them but keep their interfaces backward-compatible.
- **IconName** is a TypeScript union of the supported names, defined in `src/components/icons.ts` (the path data lives there; `Icon.astro` renders it). This keeps `Icon.astro` small and the path data in one place.

---

## 4. Data changes

Add an `icon: IconName` field to the structured data so cards render icons from data, not hard-coded markup:
- `pillars.ts` — platform-engineering→`layers`, agentic-operations→`bot`, ai-transformation→`cpu`, security→`shield-check`.
- `opsDomains.ts` — provisioning→`boxes`, lifecycle→`refresh-cw`, backup→`database`, monitoring→`activity`, debugging→`bug`, capacity→`gauge`.
- `buildingBlocks.ts` — SOPs→`clipboard-list`, Skills→`puzzle`, Sub-agents→`workflow`, Guardrails→`shield`, MCP gateway→`network`.
- Extras used inline on pages: `cloud` (hosting), `git-branch` (GitOps), `users` (enablement), `globe` (regions).

The full icon set (~19) is the union in `icons.ts`. Adding `icon` fields is additive — existing consumers ignore it until updated.

---

## 5. Retrofit — all pages

Apply the kit page-by-page, **behaviour-preserving** (same content, better structure/visuals):
- Replace each page's inline eyebrow+h1+lead with `<PageHero>`.
- Wrap content blocks in `<Section>`, adding `texture="grid"`/`glow` to 1–2 hero/feature sections per page (not all — restraint).
- Replace inline card-grid markup with `<CardGrid><Card icon=… index=…>` driven by data.
- Replace inline ✓/→ lists with `<FeatureList>`.
- Add icons to: pillar cards, ops domains, building blocks, custom-build "what we build", platform stack, approach steps.

Pages: `index`, `services/index`, the 4 pillar pages, `custom-build`, `how-we-automate`, `case-studies`, `platform`, `approach`, `about`, `contact`, `legal`. Homepage section components in `src/components/home/*` updated to match.

---

## 6. The skill + reference

### `.claude/skills/design-system/SKILL.md`
Frontmatter:
```
name: design-system
description: Use when adding or editing pages, marketing sections, or copy on the
  Galaxy-Digital website (Astro). Encodes the visual language, component kit,
  page recipe, tone of voice, and content/honesty rules.
```
Body (concise; long reference material split into `references/`):
1. **When to use / quick start** — the "add a page in 5 minutes" copy-paste recipe (BaseLayout → PageHero → Section + CardGrid/FeatureList → CtaBand).
2. **Visual language** — tokens, the blueprint decoration rules, when to use textures (sparingly), card variants.
3. **Component catalog** — each component: what it does, props, when to use, a minimal example. (→ `references/components.md` for full detail.)
4. **Icons** — the IconName list and how to add a new one.
5. **Marketing content** — the offering and four pillars (one-liners), what we can claim, and the **honesty + anonymization rules** (no client names, no unverified metrics; Tesco-as-AIOps). (→ `references/content.md`.)
6. **Tone of voice** — the locked voice with good/bad examples. (→ `references/voice.md`.)
7. **Do / Don't** — e.g. "DO use `bg-linear-to-*` (Tailwind v4)", "DON'T hand-roll a hero — use PageHero", "DON'T name a client".

### `docs/design-system.md`
Human-readable mirror: tokens table, component catalog, the page recipe, voice, and a link to the skill. Kept in sync with SKILL.md (same source content, different audience).

---

## 7. Tech & constraints

- Astro 5, Tailwind v4 (`@theme` tokens; gradients `bg-linear-to-*`). No new runtime deps.
- Accessibility: icons are decorative → `aria-hidden="true"` (labels carry meaning); keep single h1 per page (PageHero renders the h1); maintain contrast and `prefers-reduced-motion`.
- Build gate unchanged: `npm run build` exits 0; deploy via existing `deploy/` pipeline.

---

## 8. Out of scope

- New page content or new pages (this is a system + visual retrofit, not new copy).
- Logo redesign, new fonts, palette changes (tokens unchanged).
- An interactive component playground/storybook (the skill + docs reference suffices).
- Animation beyond the existing fade-up.

---

## 9. Success criteria

- A reusable kit (`Icon`, `Section`, `PageHero`, `Card`, `CardGrid`, `FeatureList`) exists with typed props; the 13 inline hero blocks and inline card/list markup are gone (DRY).
- Lucide icons (1.6/cyan) render across pillars, ops domains, building blocks, and extras; ~19-icon `IconName` union.
- Blueprint decoration (grid/glow textures, blueprint cards) applied with restraint across all pages; `npm run build` clean; single h1 per page; reduced-motion respected.
- `.claude/skills/design-system/SKILL.md` (+ `references/`) and `docs/design-system.md` exist; the skill's "add a page" recipe produces a correct, on-brand page when followed.
- Whole site deployed live to `www.galaxy-digital.ae`, visually leveled-up, no content regressions, no client-name leaks.
