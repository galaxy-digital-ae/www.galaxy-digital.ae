# Component catalog

Props are read from the actual `.astro` `Props` interfaces in `src/components/`. Names and types are exact — do not invent props.

## Kit components

### PageHero — `src/components/PageHero.astro`
Page header: eyebrow + the single `<h1>` + lead, plus a slot for CTAs.

| Prop | Type | Required | Notes |
| --- | --- | --- | --- |
| `eyebrow` | `string` | no | small uppercase cyan kicker |
| `title` | `string` | yes | renders the page `<h1>` |
| `lead` | `string` | no | muted lead paragraph |

```astro
<PageHero eyebrow="Custom Build" title="Your sovereign OpenShift platform — custom-built." lead="Build it, automate it, optionally host it." />
```

### Section — `src/components/Section.astro`
Full-width section wrapper with `container-x` inner and an optional decorative texture. Content sits at `z-10`; textures are `pointer-events:none`.

| Prop | Type | Required | Notes |
| --- | --- | --- | --- |
| `texture` | `'none' \| 'grid' \| 'glow' \| 'grid-glow'` | no | default `'none'` |
| `class` | `string` | no | inner padding, default `'py-20'` |

```astro
<Section texture="grid">
  <h2 class="text-2xl font-display font-semibold">Section title</h2>
</Section>
```

### Card — `src/components/Card.astro`
A card with optional icon + mono index and two surface variants. Body goes in the slot.

| Prop | Type | Required | Notes |
| --- | --- | --- | --- |
| `title` | `string` | yes | card heading (`<h3>`) |
| `icon` | `IconName` | no | renders an `Icon` in a cyan-bordered chip |
| `index` | `string` | no | mono cyan index, e.g. `"01"` |
| `variant` | `'panel' \| 'blueprint'` | no | default `'panel'`; `blueprint` = dashed border + corner brackets |

```astro
<Card title="Provisioning" icon="boxes" index="01" variant="blueprint">Bare-metal and IaaS onboarding.</Card>
```

### CardGrid — `src/components/CardGrid.astro`
Responsive grid wrapper for `Card`s. `gap-4`, stacks on mobile.

| Prop | Type | Required | Notes |
| --- | --- | --- | --- |
| `cols` | `2 \| 3 \| 4` | no | default `3` |
| `class` | `string` | no | default `''` |

```astro
<CardGrid cols={3} class="mt-6">
  <Card title="One">…</Card>
  <Card title="Two">…</Card>
</CardGrid>
```

### FeatureList — `src/components/FeatureList.astro`
A titled list with a ✓ (signal-green) or → (azure) marker per item.

| Prop | Type | Required | Notes |
| --- | --- | --- | --- |
| `title` | `string` | no | renders an `<h2>` |
| `items` | `string[]` | yes | list rows |
| `marker` | `'check' \| 'arrow'` | no | default `'check'` (`✓`); `'arrow'` = `→` |

```astro
<FeatureList title="What you get" items={["Item one", "Item two"]} marker="check" />
```

### Icon — `src/components/Icon.astro`
Inline Lucide SVG by name (1.6 stroke, `currentColor`, `aria-hidden`). Names = the `IconName` union in `icons.ts`.

| Prop | Type | Required | Notes |
| --- | --- | --- | --- |
| `name` | `IconName` | yes | one of the union members |
| `class` | `string` | no | default `'w-5 h-5'` |

```astro
<Icon name="shield-check" class="w-6 h-6 text-cyan" />
```

## Supporting components

### Button — `src/components/Button.astro`
Link styled as a button. `primary` = azure→deep gradient + glow; `ghost` = hairline outline. Label via slot.

| Prop | Type | Required | Notes |
| --- | --- | --- | --- |
| `href` | `string` | yes | destination |
| `variant` | `'primary' \| 'ghost'` | no | default `'primary'` |
| `class` | `string` | no | default `''` |

```astro
<Button href="/contact">Book a platform review</Button>
<Button href="/services" variant="ghost">Explore services</Button>
```

### Pill — `src/components/Pill.astro`
Small hairline rounded tag. No props — content via slot.

```astro
<Pill>OpenShift</Pill>
```

### SectionHeading — `src/components/SectionHeading.astro`
Eyebrow + `<h2>` + sub-paragraph block, optionally centred. (Distinct from PageHero, which renders the `<h1>`.)

| Prop | Type | Required | Notes |
| --- | --- | --- | --- |
| `eyebrow` | `string` | no | uppercase cyan kicker |
| `title` | `string` | yes | renders an `<h2>` |
| `sub` | `string` | no | muted sub-paragraph |
| `center` | `boolean` | no | default `false` |

```astro
<SectionHeading eyebrow="How we automate" title="The building blocks" center />
```

### CtaBand — `src/components/CtaBand.astro`
Closing call-to-action band with two fixed buttons (Book a platform review / Explore services).

| Prop | Type | Required | Notes |
| --- | --- | --- | --- |
| `title` | `string` | no | default `"Let's build the platform your AI runs on."` |

```astro
<CtaBand title="Let's make your platform run itself." />
```

### MetricStat — `src/components/MetricStat.astro`
A single gradient stat with a muted label. Use for capability stats only (no unverified metrics).

| Prop | Type | Required | Notes |
| --- | --- | --- | --- |
| `value` | `string` | yes | big gradient figure |
| `label` | `string` | yes | muted caption |

```astro
<MetricStat value="6" label="Day-2 ops domains" />
```

### CaseStudyCard — `src/components/CaseStudyCard.astro`
Renders one anonymized case study (tag, title, Challenge / What we built / Outcome, optional note).

| Prop | Type | Required | Notes |
| --- | --- | --- | --- |
| `study` | `CaseStudy` | yes | typed object from `src/data/caseStudies.ts` |

`CaseStudy` shape: `{ tag: string; title: string; challenge: string; built: string; outcome: string; note?: string }`.

```astro
import { caseStudies } from '../data/caseStudies';
<CaseStudyCard study={caseStudies[0]} />
```

## Signature visuals

### Terminal — `src/components/Terminal.astro`
Bespoke animated "agent reconcile" terminal (window chrome + mono log lines). No props — content is internal. Used in the homepage hero.

```astro
<Terminal />
```

### Constellation — `src/components/Constellation.astro`
SVG node-graph showing OpenShift core linked to GitOps / Agentic Ops / SecOps / AI Layer. No props — node data is internal.

```astro
<Constellation />
```

### RegionMap — `src/components/RegionMap.astro`
Region card grid (MEA / EU hosting), driven by `src/data/regions.ts`. No props.

```astro
<RegionMap />
```
