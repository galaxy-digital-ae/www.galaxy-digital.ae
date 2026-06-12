# Galaxy-Digital Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. **Also invoke `frontend-design:frontend-design` when building components/pages** — it guides the visual execution so output avoids generic AI aesthetics and matches the approved deep-space/azure direction.

**Goal:** Build a static, production-grade marketing website for Galaxy-Digital (UAE IT consultancy / MSP) in Astro + Tailwind, replacing the WordPress skeleton, implementing the approved design system and all 10 pages.

**Architecture:** Astro static site (zero JS by default; tiny client islands only for the mobile menu and the animated hero terminal). Tailwind for styling with design tokens encoded in `tailwind.config.mjs`. Shared `.astro` components keep nav/footer/cards DRY. Page copy and structured data (pillars, team, regions, metrics) live in typed `src/data/*.ts` files. Output is static `dist/` served by nginx on OpenShift (redeploy is a separate follow-up plan).

**Tech Stack:** Astro, Tailwind CSS, @astrojs/tailwind, @fontsource (Space Grotesk, Inter, JetBrains Mono), TypeScript for data files.

**Reference:** Design spec at `docs/superpowers/specs/2026-06-12-galaxy-digital-website-design.md`. Brand assets already in repo: `assets/brand/galaxy-digital-logo-full.jpg`, `assets/team/{sam,amit,mayank,andrej,samira}.jpg`.

**Verification convention:** Unless a task says otherwise, the gate for every task is: `npm run build` exits 0, then `npm run dev` and eyeball the affected page/component in the browser. Commit after each task.

---

## File Structure

```
package.json, astro.config.mjs, tailwind.config.mjs, tsconfig.json
src/
  styles/global.css                 design tokens (CSS vars), base, fonts, utilities
  data/
    site.ts                         nav links, company/contact constants, social
    pillars.ts                      4 pillars (slug, name, marketing name, blurb, points)
    team.ts                         5 members (name, title, photo, linkedin)
    regions.ts                      MEA / Africa / EU region groups
    metrics.ts                      capability stats
  layouts/BaseLayout.astro          <head>, SEO/OG, fonts, Nav, Footer, <slot/>
  components/
    Button.astro  SectionHeading.astro  Pill.astro  Eyebrow.astro
    Nav.astro  MobileMenu.astro  Footer.astro
    PillarCard.astro  MetricStat.astro  TechStrip.astro  TeamCard.astro
    Terminal.astro  Constellation.astro  RegionMap.astro  CtaBand.astro
    home/  (Hero.astro, Pillars.astro, Differentiator.astro, PlatformSection.astro,
            Engage.astro, Metrics.astro, Team.astro)  -- homepage section wrappers
  pages/
    index.astro
    services/index.astro
    services/platform-engineering.astro
    services/agentic-operations.astro
    services/ai-transformation.astro
    services/security.astro
    platform.astro  approach.astro  about.astro  contact.astro  legal.astro
public/
    logo-full.jpg  favicon.svg  og-image.jpg  team/*.jpg
```

---

## Phase 0 — Scaffold & Design Tokens

### Task 1: Initialize Astro + Tailwind, remove WordPress files

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tailwind.config.mjs`, `tsconfig.json`, `.gitignore` (append), `src/pages/index.astro` (temporary)
- Delete: `wordpress-deploy.yaml`, `wp-config.php`, `wordpress-sa.yaml`, `mysql-secret.yaml`, `wordpress-svc.yaml`, `wordpress-route.yaml`, `wordpress-pvc.yaml`, `php-cm.yaml`

- [ ] **Step 1: Scaffold Astro non-interactively**

Run:
```bash
npm create astro@latest . -- --template minimal --no-install --no-git --typescript strict --yes
```
If the directory-not-empty prompt blocks, scaffold in a temp dir and move files:
```bash
npm create astro@latest /tmp/gd-astro -- --template minimal --no-install --no-git --typescript strict --yes
cp -r /tmp/gd-astro/{src,astro.config.mjs,tsconfig.json,package.json} . 2>/dev/null
```

- [ ] **Step 2: Add Tailwind + fonts integration**

Run:
```bash
npx astro add tailwind --yes
npm install @fontsource/space-grotesk @fontsource/inter @fontsource/jetbrains-mono
```

- [ ] **Step 3: Append Astro ignores to .gitignore**

Append to `.gitignore`:
```
node_modules/
dist/
.astro/
```

- [ ] **Step 4: Remove the WordPress deployment files**

Run:
```bash
git rm wordpress-deploy.yaml wp-config.php wordpress-sa.yaml mysql-secret.yaml \
  wordpress-svc.yaml wordpress-route.yaml wordpress-pvc.yaml php-cm.yaml
```

- [ ] **Step 5: Copy brand assets into public/**

Run:
```bash
mkdir -p public/team
cp assets/brand/galaxy-digital-logo-full.jpg public/logo-full.jpg
cp assets/team/*.jpg public/team/
```

- [ ] **Step 6: Temporary index to prove the build**

Create `src/pages/index.astro`:
```astro
---
---
<html lang="en"><head><meta charset="utf-8"><title>Galaxy-Digital</title></head>
<body><h1>Galaxy-Digital — scaffold ok</h1></body></html>
```

- [ ] **Step 7: Verify build**

Run: `npm run build`
Expected: exits 0, `dist/index.html` exists.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "chore: scaffold Astro+Tailwind site, remove WordPress skeleton"
```

---

### Task 2: Design tokens (Tailwind config + global.css)

**Files:**
- Modify: `tailwind.config.mjs`
- Create: `src/styles/global.css`

- [ ] **Step 1: Encode tokens in Tailwind config**

Replace `tailwind.config.mjs` content:
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts,jsx,tsx,md}'],
  theme: {
    extend: {
      colors: {
        space: '#04060E',
        bg2: '#0A1020',
        panel: '#0C1426',
        line: 'rgba(120,180,240,0.12)',
        azure: '#1EA3E8',
        cyan: '#5CC8F7',
        deep: '#1565D8',
        signal: '#56D364',
        txt: '#E9EEFB',
        mut: '#94A3C4',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      maxWidth: { content: '1180px' },
      boxShadow: { glow: '0 0 60px rgba(30,163,232,0.22)' },
      keyframes: {
        'fade-up': { '0%': { opacity: '0', transform: 'translateY(12px)' }, '100%': { opacity: '1', transform: 'none' } },
      },
      animation: { 'fade-up': 'fade-up .6s ease both' },
    },
  },
  plugins: [],
}
```

- [ ] **Step 2: Global base styles + fonts + nebula background**

Create `src/styles/global.css`:
```css
@import '@fontsource/space-grotesk/500.css';
@import '@fontsource/space-grotesk/600.css';
@import '@fontsource/space-grotesk/700.css';
@import '@fontsource/inter/400.css';
@import '@fontsource/inter/500.css';
@import '@fontsource/inter/600.css';
@import '@fontsource/jetbrains-mono/400.css';
@import '@fontsource/jetbrains-mono/500.css';

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html { scroll-behavior: smooth; }
  body {
    @apply bg-space text-txt font-sans antialiased;
    background-image:
      radial-gradient(900px 520px at 82% -8%, rgba(30,163,232,.16), transparent 60%),
      radial-gradient(680px 480px at -5% 8%, rgba(92,200,247,.08), transparent 55%);
    background-attachment: fixed;
  }
  h1,h2,h3 { @apply font-display tracking-tight; }
}

@layer components {
  .container-x { @apply max-w-content mx-auto px-6 md:px-8; }
  .text-grad { @apply bg-gradient-to-r from-cyan to-azure bg-clip-text text-transparent; }
  .hairline { @apply border border-line; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
}
```

- [ ] **Step 3: Verify tokens compile**

Temporarily set `index.astro` body to `<body class="bg-space"><h1 class="text-grad font-display text-4xl">Galaxy-Digital</h1></body>` and import global.css. Run `npm run build`. Expected: exits 0.

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.mjs src/styles/global.css src/pages/index.astro
git commit -m "feat: add design tokens (color, type, nebula bg) and global styles"
```

---

## Phase 1 — Data Layer

### Task 3: Structured data files

**Files:**
- Create: `src/data/site.ts`, `src/data/pillars.ts`, `src/data/team.ts`, `src/data/regions.ts`, `src/data/metrics.ts`

- [ ] **Step 1: Site constants** — Create `src/data/site.ts`:
```ts
export const site = {
  name: 'Galaxy-Digital',
  domain: 'www.galaxy-digital.ae',
  tagline: 'Sovereign private cloud. Autonomous operations. AI-native by design.',
  email: 'hello@galaxy-digital.ae',
  location: 'United Arab Emirates',
};
export const nav = [
  { label: 'Services', href: '/services' },
  { label: 'Platform', href: '/platform' },
  { label: 'Approach', href: '/approach' },
  { label: 'Team', href: '/about' },
];
export const socials = [{ label: 'LinkedIn', href: 'https://www.linkedin.com/company/galaxy-digital-ae' }];
```

- [ ] **Step 2: Pillars** — Create `src/data/pillars.ts`:
```ts
export interface Pillar {
  slug: string; name: string; marketing: string; blurb: string; points: string[];
}
export const pillars: Pillar[] = [
  { slug: 'platform-engineering', name: 'Platform Engineering', marketing: 'Sovereign Cloud Platforms',
    blurb: 'We design and build private-cloud OpenShift platforms you actually own — engineered as code, hosted in-region.',
    points: ['Private-cloud OpenShift platform builds', 'Infrastructure as Code (Terraform, Ansible)', 'In-region managed hosting across MEA & EU'] },
  { slug: 'agentic-operations', name: 'Agentic Operations', marketing: 'Agentic Operations',
    blurb: 'We turn standard OpenShift GitOps into autonomous, agentic workflows — humans set intent, agents execute and reconcile.',
    points: ['AI-driven DevOps operations', 'GitOps-managed, 100% declarative', 'Detect → plan → act → verify, with human guardrails'] },
  { slug: 'ai-transformation', name: 'AI Transformation', marketing: 'AI, End-to-End',
    blurb: 'End-to-end AI delivery: from stakeholder alignment and design through implementation and governance.',
    points: ['Stakeholder management & strategy', 'Solution design & implementation', 'AI governance & guardrails'] },
  { slug: 'security', name: 'Security', marketing: 'Secure by Default',
    blurb: 'Security audits and Security Operations that make safety the default, not an afterthought.',
    points: ['Security audits & posture reviews', 'SecOps monitoring & response', 'Compliance-ready, sovereign by design'] },
];
```

- [ ] **Step 3: Team** — Create `src/data/team.ts`:
```ts
export interface Member { name: string; title: string; photo: string; linkedin?: string; }
export const team: Member[] = [
  { name: 'Sam', title: 'Principal Cloud-Native Architect', photo: '/team/sam.jpg', linkedin: 'https://www.linkedin.com/in/samuelterburg/' },
  { name: 'Amit', title: 'AI-Native Engineer', photo: '/team/amit.jpg', linkedin: 'https://www.linkedin.com/in/amitkatyayana/' },
  { name: 'Mayank', title: 'Site Reliability Engineer', photo: '/team/mayank.jpg', linkedin: 'https://www.linkedin.com/in/mayank-s-596315104/' },
  { name: 'Andrej', title: 'AI & Cloud-Native Engineer', photo: '/team/andrej.jpg', linkedin: 'https://www.linkedin.com/in/agolis/' },
  { name: 'Samira', title: 'Security Specialist', photo: '/team/samira.jpg' },
];
```

- [ ] **Step 4: Regions + Metrics** — Create `src/data/regions.ts`:
```ts
export const regions = [
  { group: 'Middle East', nodes: ['UAE'] },
  { group: 'Africa', nodes: ['Africa'] },
  { group: 'Europe', nodes: ['EU'] },
];
```
Create `src/data/metrics.ts`:
```ts
export const metrics = [
  { value: '100%', label: 'GitOps-managed' },
  { value: '3', label: 'regions — MEA · EU' },
  { value: '<60s', label: 'auto-remediation' },
  { value: 'Senior', label: 'only engineers' },
];
```

- [ ] **Step 5: Verify** — Run `npm run build`. Expected: exits 0 (data files are imported in later tasks; this just confirms no TS errors).

- [ ] **Step 6: Commit**
```bash
git add src/data
git commit -m "feat: add site/pillars/team/regions/metrics data"
```

---

## Phase 2 — Core Components & Layout

### Task 4: Primitive components (Button, Eyebrow, SectionHeading, Pill)

**Files:** Create `src/components/Button.astro`, `Eyebrow.astro`, `SectionHeading.astro`, `Pill.astro`

- [ ] **Step 1: Button** — Create `src/components/Button.astro`:
```astro
---
interface Props { href: string; variant?: 'primary' | 'ghost'; class?: string; }
const { href, variant = 'primary', class: cls = '' } = Astro.props;
const base = 'inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition';
const styles = variant === 'primary'
  ? 'text-white bg-gradient-to-r from-azure to-deep hover:brightness-110 shadow-glow'
  : 'text-txt hairline hover:border-azure/50';
---
<a href={href} class={`${base} ${styles} ${cls}`}><slot /></a>
```

- [ ] **Step 2: Eyebrow** — Create `src/components/Eyebrow.astro`:
```astro
---
---
<span class="text-xs font-semibold uppercase tracking-[0.18em] text-cyan"><slot /></span>
```

- [ ] **Step 3: SectionHeading** — Create `src/components/SectionHeading.astro`:
```astro
---
interface Props { eyebrow?: string; title: string; sub?: string; center?: boolean; }
const { eyebrow, title, sub, center = false } = Astro.props;
---
<div class={center ? 'text-center max-w-2xl mx-auto' : 'max-w-2xl'}>
  {eyebrow && <span class="text-xs font-semibold uppercase tracking-[0.18em] text-cyan">{eyebrow}</span>}
  <h2 class="mt-3 text-3xl md:text-4xl font-display font-semibold tracking-tight">{title}</h2>
  {sub && <p class="mt-4 text-mut">{sub}</p>}
</div>
```

- [ ] **Step 4: Pill** — Create `src/components/Pill.astro`:
```astro
---
---
<span class="text-xs text-mut hairline rounded-full px-3 py-1.5"><slot /></span>
```

- [ ] **Step 5: Verify & commit** — `npm run build` exits 0.
```bash
git add src/components
git commit -m "feat: add Button, Eyebrow, SectionHeading, Pill primitives"
```

---

### Task 5: Nav + MobileMenu + Footer

**Files:** Create `src/components/Nav.astro`, `MobileMenu.astro`, `Footer.astro`

- [ ] **Step 1: Nav** — Create `src/components/Nav.astro`:
```astro
---
import { nav } from '../data/site';
import Button from './Button.astro';
import MobileMenu from './MobileMenu.astro';
---
<header class="sticky top-0 z-50 backdrop-blur-md bg-space/70 border-b border-line">
  <nav class="container-x flex items-center justify-between h-16">
    <a href="/" class="flex items-center gap-2.5">
      <img src="/logo-full.jpg" alt="Galaxy-Digital" class="h-8 w-8 rounded-md object-cover" />
      <span class="font-display font-semibold tracking-tight">Galaxy-Digital</span>
    </a>
    <div class="hidden md:flex items-center gap-8">
      {nav.map((i) => <a href={i.href} class="text-sm text-mut hover:text-txt transition">{i.label}</a>)}
      <Button href="/contact" class="!px-4 !py-2">Book a review</Button>
    </div>
    <MobileMenu />
  </nav>
</header>
```

- [ ] **Step 2: MobileMenu (client island)** — Create `src/components/MobileMenu.astro`:
```astro
---
import { nav } from '../data/site';
---
<details class="md:hidden relative">
  <summary class="list-none cursor-pointer p-2 text-mut" aria-label="Menu">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
  </summary>
  <div class="absolute right-0 mt-2 w-52 rounded-xl bg-panel hairline p-2 shadow-glow">
    {nav.map((i) => <a href={i.href} class="block px-3 py-2 rounded-lg text-sm text-mut hover:text-txt hover:bg-white/5">{i.label}</a>)}
    <a href="/contact" class="block px-3 py-2 rounded-lg text-sm text-azure font-semibold">Book a review →</a>
  </div>
</details>
```

- [ ] **Step 3: Footer** — Create `src/components/Footer.astro`:
```astro
---
import { site, nav, socials } from '../data/site';
import { pillars } from '../data/pillars';
---
<footer class="border-t border-line mt-24">
  <div class="container-x py-14 grid gap-10 md:grid-cols-4">
    <div>
      <div class="flex items-center gap-2.5">
        <img src="/logo-full.jpg" alt="Galaxy-Digital" class="h-8 w-8 rounded-md object-cover" />
        <span class="font-display font-semibold">Galaxy-Digital</span>
      </div>
      <p class="mt-4 text-sm text-mut max-w-xs">{site.tagline}</p>
    </div>
    <div>
      <h3 class="text-xs uppercase tracking-wider text-mut font-semibold">Services</h3>
      <ul class="mt-4 space-y-2">{pillars.map((p) => <li><a class="text-sm text-mut hover:text-txt" href={`/services/${p.slug}`}>{p.name}</a></li>)}</ul>
    </div>
    <div>
      <h3 class="text-xs uppercase tracking-wider text-mut font-semibold">Company</h3>
      <ul class="mt-4 space-y-2">{nav.map((i) => <li><a class="text-sm text-mut hover:text-txt" href={i.href}>{i.label}</a></li>)}<li><a class="text-sm text-mut hover:text-txt" href="/legal">Legal</a></li></ul>
    </div>
    <div>
      <h3 class="text-xs uppercase tracking-wider text-mut font-semibold">Contact</h3>
      <ul class="mt-4 space-y-2 text-sm text-mut">
        <li>{site.location}</li>
        <li><a class="hover:text-txt" href={`mailto:${site.email}`}>{site.email}</a></li>
        {socials.map((s) => <li><a class="hover:text-txt" href={s.href}>{s.label}</a></li>)}
      </ul>
    </div>
  </div>
  <div class="container-x py-6 border-t border-line text-xs text-mut">© 2026 Galaxy-Digital. All rights reserved.</div>
</footer>
```

- [ ] **Step 4: Verify & commit** — `npm run build` exits 0.
```bash
git add src/components
git commit -m "feat: add Nav, MobileMenu, Footer"
```

---

### Task 6: BaseLayout

**Files:** Create `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Layout with SEO/OG** — Create `src/layouts/BaseLayout.astro`:
```astro
---
import '../styles/global.css';
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';
import { site } from '../data/site';
interface Props { title?: string; description?: string; }
const { title, description = site.tagline } = Astro.props;
const fullTitle = title ? `${title} · ${site.name}` : `${site.name} — ${site.tagline}`;
---
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <title>{fullTitle}</title>
  <meta name="description" content={description} />
  <meta property="og:title" content={fullTitle} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content="/og-image.jpg" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
</head>
<body>
  <Nav />
  <main><slot /></main>
  <Footer />
</body>
</html>
```

- [ ] **Step 2: Add favicon placeholder** — Create `public/favicon.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="#04060E"/><text x="16" y="22" font-family="sans-serif" font-size="18" font-weight="700" fill="#1EA3E8" text-anchor="middle">G</text></svg>
```
Also copy the logo as a temporary OG image: `cp public/logo-full.jpg public/og-image.jpg`

- [ ] **Step 3: Verify & commit** — `npm run build` exits 0.
```bash
git add src/layouts public/favicon.svg public/og-image.jpg
git commit -m "feat: add BaseLayout with SEO/OG, favicon"
```

---

### Task 7: Content components (PillarCard, MetricStat, TechStrip, TeamCard, CtaBand)

**Files:** Create `src/components/PillarCard.astro`, `MetricStat.astro`, `TechStrip.astro`, `TeamCard.astro`, `CtaBand.astro`

- [ ] **Step 1: PillarCard** — Create `src/components/PillarCard.astro`:
```astro
---
import type { Pillar } from '../data/pillars';
interface Props { pillar: Pillar; }
const { pillar } = Astro.props;
---
<a href={`/services/${pillar.slug}`} class="group block rounded-2xl bg-gradient-to-b from-panel to-bg2 hairline p-6 hover:border-azure/50 transition">
  <span class="text-xs font-semibold uppercase tracking-[0.14em] text-cyan">{pillar.marketing}</span>
  <h3 class="mt-2 text-xl font-display font-semibold">{pillar.name}</h3>
  <p class="mt-3 text-sm text-mut">{pillar.blurb}</p>
  <span class="mt-4 inline-block text-sm text-azure group-hover:translate-x-1 transition">Learn more →</span>
</a>
```

- [ ] **Step 2: MetricStat** — Create `src/components/MetricStat.astro`:
```astro
---
interface Props { value: string; label: string; }
const { value, label } = Astro.props;
---
<div class="rounded-2xl bg-panel hairline p-6 text-center">
  <div class="text-3xl md:text-4xl font-display font-semibold text-grad">{value}</div>
  <div class="mt-2 text-sm text-mut">{label}</div>
</div>
```

- [ ] **Step 3: TechStrip** — Create `src/components/TechStrip.astro`:
```astro
---
const tech = ['Red Hat OpenShift','Kubernetes','Argo CD','Terraform','Ansible','Prometheus'];
---
<div class="container-x py-10 border-y border-line">
  <p class="text-center text-xs uppercase tracking-[0.18em] text-mut">Engineered on the tools we live in</p>
  <div class="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
    {tech.map((t) => <span class="font-mono text-sm text-mut/80">{t}</span>)}
  </div>
</div>
```

- [ ] **Step 4: TeamCard** — Create `src/components/TeamCard.astro`:
```astro
---
import type { Member } from '../data/team';
interface Props { member: Member; }
const { member } = Astro.props;
---
<div class="rounded-2xl bg-gradient-to-b from-panel to-bg2 hairline p-5">
  <img src={member.photo} alt={member.name} class="w-full aspect-square object-cover rounded-xl" />
  <h3 class="mt-4 font-display font-semibold">{member.name}</h3>
  <p class="text-sm text-cyan">{member.title}</p>
  {member.linkedin && <a href={member.linkedin} class="mt-2 inline-block text-sm text-mut hover:text-txt">LinkedIn →</a>}
</div>
```

- [ ] **Step 5: CtaBand** — Create `src/components/CtaBand.astro`:
```astro
---
import Button from './Button.astro';
interface Props { title?: string; }
const { title = "Let's build the platform your AI runs on." } = Astro.props;
---
<section class="container-x my-24">
  <div class="rounded-3xl hairline p-10 md:p-16 text-center bg-gradient-to-b from-panel to-bg2 shadow-glow">
    <h2 class="text-3xl md:text-4xl font-display font-semibold tracking-tight">{title}</h2>
    <div class="mt-8 flex justify-center gap-4">
      <Button href="/contact">Book a platform review</Button>
      <Button href="/services" variant="ghost">Explore services</Button>
    </div>
  </div>
</section>
```

- [ ] **Step 6: Verify & commit** — `npm run build` exits 0.
```bash
git add src/components
git commit -m "feat: add PillarCard, MetricStat, TechStrip, TeamCard, CtaBand"
```

---

### Task 8: Signature visuals (Terminal, Constellation, RegionMap)

**Files:** Create `src/components/Terminal.astro`, `Constellation.astro`, `RegionMap.astro`

- [ ] **Step 1: Terminal (animated, reduced-motion aware)** — Create `src/components/Terminal.astro`:
```astro
---
const lines = [
  '<span class="text-cyan">▸ agent</span> <span class="text-mut">watch gitops/prod</span>',
  '<span class="text-mut"># drift detected on</span> <span class="text-azure">ingress-controller</span>',
  '<span class="text-[#e3b341]">⚡ planning</span> <span class="text-mut">remediation…</span>',
  '<span class="text-azure">→</span> rollout canary <span class="text-cyan">10%</span> · SLO guard <span class="text-signal">ok</span>',
  '<span class="text-azure">→</span> promote <span class="text-cyan">100%</span> · audit signed',
  '<span class="text-signal">✓ reconciled</span> <span class="text-mut">in 38s — no human paged</span>',
];
---
<div class="rounded-2xl bg-[#050A14] hairline overflow-hidden shadow-glow">
  <div class="flex items-center gap-2 px-4 py-3 border-b border-line">
    <span class="w-3 h-3 rounded-full bg-[#ff5f57]"></span>
    <span class="w-3 h-3 rounded-full bg-[#febc2e]"></span>
    <span class="w-3 h-3 rounded-full bg-[#28c840]"></span>
    <span class="ml-2 font-mono text-xs text-mut">galaxy-agent · reconcile</span>
  </div>
  <div class="p-5 font-mono text-[13px] leading-[1.9]" id="term">
    {lines.map((l, i) => <div class="term-line opacity-0" style={`--i:${i}`} set:html={l} />)}
  </div>
</div>
<style>
  .term-line { animation: reveal .35s ease forwards; animation-delay: calc(var(--i) * .5s + .3s); }
  @keyframes reveal { to { opacity: 1; } }
  @media (prefers-reduced-motion: reduce) { .term-line { opacity: 1 !important; animation: none !important; } }
</style>
```

- [ ] **Step 2: Constellation** — Create `src/components/Constellation.astro`:
```astro
---
const nodes = [
  { label: 'OpenShift', tag: 'CORE', x: 50, y: 38, core: true },
  { label: 'GitOps', tag: 'BUILD', x: 14, y: 20 },
  { label: 'Agentic Ops', tag: 'RUN', x: 78, y: 22 },
  { label: 'SecOps', tag: 'SECURE', x: 18, y: 76 },
  { label: 'AI Layer', tag: 'SCALE', x: 74, y: 74 },
];
---
<div class="relative h-[340px] rounded-2xl hairline overflow-hidden" style="background:radial-gradient(60% 60% at 50% 40%,rgba(30,163,232,.16),transparent 70%)">
  <svg class="absolute inset-0 w-full h-full" aria-hidden="true">
    {nodes.filter(n => !n.core).map(n => (
      <line x1="50%" y1="38%" x2={`${n.x}%`} y2={`${n.y}%`} stroke="rgba(30,163,232,.4)" stroke-width="1.5" stroke-dasharray="4 4" />
    ))}
  </svg>
  {nodes.map(n => (
    <div class={`absolute -translate-x-1/2 -translate-y-1/2 rounded-xl px-3 py-2 text-xs font-semibold bg-gradient-to-b from-[#10203a] to-[#0a1326] ${n.core ? 'border border-azure shadow-glow' : 'hairline'}`} style={`left:${n.x}%;top:${n.y}%`}>
      <span class="block text-[9px] tracking-[0.1em] text-cyan">{n.tag}</span>{n.label}
    </div>
  ))}
</div>
```

- [ ] **Step 3: RegionMap** — Create `src/components/RegionMap.astro`:
```astro
---
import { regions } from '../data/regions';
---
<div class="grid sm:grid-cols-3 gap-4">
  {regions.map((r) => (
    <div class="rounded-2xl bg-panel hairline p-6">
      <div class="text-xs uppercase tracking-[0.14em] text-cyan font-semibold">Region</div>
      <div class="mt-2 font-display text-lg font-semibold">{r.group}</div>
      <div class="mt-1 text-sm text-mut">{r.nodes.join(' · ')}</div>
    </div>
  ))}
</div>
```

- [ ] **Step 4: Verify & commit** — `npm run build` exits 0.
```bash
git add src/components
git commit -m "feat: add Terminal, Constellation, RegionMap visuals"
```

---

## Phase 3 — Homepage

### Task 9: Homepage section components

**Files:** Create `src/components/home/Hero.astro`, `Differentiator.astro`, `PlatformSection.astro`, `Engage.astro`

- [ ] **Step 1: Hero** — Create `src/components/home/Hero.astro`:
```astro
---
import Button from '../Button.astro';
import Pill from '../Pill.astro';
import Terminal from '../Terminal.astro';
---
<section class="container-x pt-20 pb-16 grid lg:grid-cols-2 gap-12 items-center">
  <div class="animate-fade-up">
    <span class="text-xs font-semibold uppercase tracking-[0.18em] text-cyan">OpenShift · GitOps · AI</span>
    <h1 class="mt-4 text-5xl md:text-6xl font-display font-semibold tracking-tight leading-[1.05]">DevOps that <span class="text-grad">runs itself.</span></h1>
    <p class="mt-6 text-lg text-mut max-w-md">We turn standard OpenShift GitOps pipelines into autonomous, agentic workflows — engineered by humans, operated by agents, from our sovereign private cloud across MEA & Europe.</p>
    <div class="mt-8 flex flex-wrap gap-4">
      <Button href="/contact">Book a platform review</Button>
      <Button href="/platform" variant="ghost">See the stack →</Button>
    </div>
    <div class="mt-8 flex flex-wrap gap-2">
      <Pill>Platform Engineering</Pill><Pill>Agentic Ops</Pill><Pill>AI Transformation</Pill><Pill>SecOps</Pill>
    </div>
  </div>
  <Terminal />
</section>
```

- [ ] **Step 2: Differentiator** — Create `src/components/home/Differentiator.astro`:
```astro
---
import SectionHeading from '../SectionHeading.astro';
const loop = [
  { k: 'Detect', d: 'Agents watch GitOps state and telemetry for drift, risk and anomalies.' },
  { k: 'Plan', d: 'A remediation is proposed against policy — within human-defined guardrails.' },
  { k: 'Act', d: 'Change rolls out progressively: canary, SLO guard, promote.' },
  { k: 'Verify', d: 'Outcome is checked and the audit trail is signed — automatically.' },
];
---
<section class="container-x py-20">
  <SectionHeading eyebrow="Why us" title="We make OpenShift run itself." sub="Standard GitOps stops at 'declared'. We add an agentic loop on top — humans set intent, agents execute and reconcile." />
  <div class="mt-12 grid md:grid-cols-4 gap-4">
    {loop.map((s, i) => (
      <div class="rounded-2xl bg-gradient-to-b from-panel to-bg2 hairline p-6">
        <div class="font-mono text-xs text-cyan">0{i + 1}</div>
        <h3 class="mt-2 font-display text-lg font-semibold">{s.k}</h3>
        <p class="mt-2 text-sm text-mut">{s.d}</p>
      </div>
    ))}
  </div>
  <p class="mt-6 text-sm text-mut">Humans set intent, agents execute — the human-and-machine partnership at the core of everything we run.</p>
</section>
```

- [ ] **Step 3: PlatformSection** — Create `src/components/home/PlatformSection.astro`:
```astro
---
import SectionHeading from '../SectionHeading.astro';
import Constellation from '../Constellation.astro';
import RegionMap from '../RegionMap.astro';
---
<section class="container-x py-20">
  <div class="grid lg:grid-cols-2 gap-12 items-center">
    <div>
      <SectionHeading eyebrow="Where we run" title="Sovereign private cloud, in your region." sub="One OpenShift core, every capability orbiting it — hosted across the Middle East, Africa and Europe for data residency and control." />
      <div class="mt-8"><RegionMap /></div>
    </div>
    <Constellation />
  </div>
</section>
```

- [ ] **Step 4: Engage** — Create `src/components/home/Engage.astro`:
```astro
---
import SectionHeading from '../SectionHeading.astro';
const steps = [
  { k: 'Assess', d: 'We map your platform, workflows and risks.' },
  { k: 'Architect', d: 'We design the sovereign, GitOps-native target state.' },
  { k: 'Automate', d: 'We build it as code and layer in agentic operations.' },
  { k: 'Operate', d: 'We run it — autonomously, with humans on the guardrails.' },
];
---
<section class="container-x py-20">
  <SectionHeading eyebrow="How we engage" title="A clear path from today to autonomous." />
  <div class="mt-12 grid md:grid-cols-4 gap-4">
    {steps.map((s, i) => (
      <div class="rounded-2xl bg-panel hairline p-6">
        <div class="font-mono text-xs text-cyan">Step {i + 1}</div>
        <h3 class="mt-2 font-display text-lg font-semibold">{s.k}</h3>
        <p class="mt-2 text-sm text-mut">{s.d}</p>
      </div>
    ))}
  </div>
</section>
```

- [ ] **Step 5: Verify & commit** — `npm run build` exits 0.
```bash
git add src/components/home
git commit -m "feat: add homepage section components"
```

---

### Task 10: Assemble homepage

**Files:** Replace `src/pages/index.astro`

- [ ] **Step 1: Compose the homepage** — Replace `src/pages/index.astro`:
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/home/Hero.astro';
import TechStrip from '../components/TechStrip.astro';
import SectionHeading from '../components/SectionHeading.astro';
import PillarCard from '../components/PillarCard.astro';
import Differentiator from '../components/home/Differentiator.astro';
import PlatformSection from '../components/home/PlatformSection.astro';
import Engage from '../components/home/Engage.astro';
import MetricStat from '../components/MetricStat.astro';
import TeamCard from '../components/TeamCard.astro';
import CtaBand from '../components/CtaBand.astro';
import { pillars } from '../data/pillars';
import { metrics } from '../data/metrics';
import { team } from '../data/team';
---
<BaseLayout>
  <Hero />
  <TechStrip />
  <section class="container-x py-20">
    <SectionHeading eyebrow="What we do" title="Four pillars, one substrate." sub="Cloud-native and OpenShift run through everything — these are the outcomes we deliver on top." />
    <div class="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
      {pillars.map((p) => <PillarCard pillar={p} />)}
    </div>
  </section>
  <Differentiator />
  <PlatformSection />
  <Engage />
  <section class="container-x py-20">
    <SectionHeading center title="Built to prove it." sub="No vanity client counts — capability you can verify." />
    <div class="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-5">{metrics.map((m) => <MetricStat value={m.value} label={m.label} />)}</div>
  </section>
  <section class="container-x py-20">
    <SectionHeading eyebrow="Who we are" title="Senior-only. No offshore handoff." sub="A small team of practitioners who live and breathe this stack." />
    <div class="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">{team.map((m) => <TeamCard member={m} />)}</div>
  </section>
  <CtaBand />
</BaseLayout>
```

- [ ] **Step 2: Verify build + visual** — Run `npm run build`, then `npm run dev` and open the homepage. Confirm: hero terminal animates, all sections render, responsive at mobile width.

- [ ] **Step 3: Commit**
```bash
git add src/pages/index.astro
git commit -m "feat: assemble homepage"
```

---

## Phase 4 — Inner Pages

> Each inner page uses `BaseLayout`, a hero band (Eyebrow + h1 + lead), body sections built from existing components, and ends with `<CtaBand />`. Real copy is given per page — no placeholders.

### Task 11: Services overview

**Files:** Create `src/pages/services/index.astro`

- [ ] **Step 1: Create page** — Create `src/pages/services/index.astro`:
```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import SectionHeading from '../../components/SectionHeading.astro';
import PillarCard from '../../components/PillarCard.astro';
import CtaBand from '../../components/CtaBand.astro';
import { pillars } from '../../data/pillars';
---
<BaseLayout title="Services" description="Platform Engineering, Agentic Operations, AI Transformation and Security — for AI-native enterprises.">
  <section class="container-x pt-20 pb-10">
    <span class="text-xs font-semibold uppercase tracking-[0.18em] text-cyan">Services</span>
    <h1 class="mt-4 text-4xl md:text-5xl font-display font-semibold tracking-tight max-w-3xl">Four pillars for AI-native enterprises.</h1>
    <p class="mt-6 text-lg text-mut max-w-2xl">Cloud-native engineering and OpenShift are our substrate. On top, we deliver four outcomes — build the platform, automate its operations, transform with AI, and keep it secure by default.</p>
  </section>
  <section class="container-x py-10">
    <div class="grid md:grid-cols-2 gap-5">{pillars.map((p) => <PillarCard pillar={p} />)}</div>
  </section>
  <CtaBand />
</BaseLayout>
```

- [ ] **Step 2: Verify & commit** — `npm run build` exits 0.
```bash
git add src/pages/services/index.astro
git commit -m "feat: add services overview page"
```

---

### Task 12: Four pillar detail pages

**Files:** Create `src/pages/services/platform-engineering.astro`, `agentic-operations.astro`, `ai-transformation.astro`, `security.astro`

Each page follows the SAME template below. Substitute the pillar `slug` and add the page-specific `intro` paragraph and `outcomes` list given after the template.

- [ ] **Step 1: Create the four pages from this template** — For each, create `src/pages/services/<slug>.astro`:
```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import CtaBand from '../../components/CtaBand.astro';
import { pillars } from '../../data/pillars';
const slug = '<slug>';                         // <-- set per page
const intro = `<intro>`;                       // <-- set per page (see below)
const outcomes: string[] = [/* <outcomes> */]; // <-- set per page (see below)
const p = pillars.find((x) => x.slug === slug)!;
---
<BaseLayout title={p.name} description={p.blurb}>
  <section class="container-x pt-20 pb-10">
    <span class="text-xs font-semibold uppercase tracking-[0.18em] text-cyan">{p.marketing}</span>
    <h1 class="mt-4 text-4xl md:text-5xl font-display font-semibold tracking-tight max-w-3xl">{p.name}</h1>
    <p class="mt-6 text-lg text-mut max-w-2xl">{intro}</p>
  </section>
  <section class="container-x py-10 grid md:grid-cols-2 gap-10">
    <div>
      <h2 class="text-2xl font-display font-semibold">What you get</h2>
      <ul class="mt-6 space-y-3">{p.points.map((pt) => <li class="flex gap-3 text-mut"><span class="text-signal">✓</span>{pt}</li>)}</ul>
    </div>
    <div>
      <h2 class="text-2xl font-display font-semibold">Outcomes</h2>
      <ul class="mt-6 space-y-3">{outcomes.map((o) => <li class="flex gap-3 text-mut"><span class="text-azure">→</span>{o}</li>)}</ul>
    </div>
  </section>
  <CtaBand />
</BaseLayout>
```

Per-page values:
- **platform-engineering** — `intro`: "We design and build private-cloud OpenShift platforms you actually own — defined as code, hosted in your region, and ready for AI workloads from day one." `outcomes`: `['A platform you own, not rent', 'Reproducible from Git — no snowflakes', 'Ready for in-region data residency']`
- **agentic-operations** — `intro`: "Standard GitOps stops at 'declared'. We add an autonomous agentic loop — detect, plan, act, verify — so your platform remediates drift and ships safely without paging a human for every change." `outcomes`: `['Fewer pages, faster recovery', 'Progressive, SLO-guarded delivery', 'Signed audit trail on every change']`
- **ai-transformation** — `intro`: "We take AI initiatives end-to-end: aligning stakeholders, designing the solution, implementing it on a governed platform, and putting the guardrails in place to run it responsibly." `outcomes`: `['From idea to governed production', 'Clear stakeholder alignment', 'Responsible-AI guardrails built in']`
- **security** — `intro`: "Security is the default, not a phase. We audit your posture, harden the platform, and run Security Operations so issues are caught and contained — sovereign by design." `outcomes`: `['Independent posture review', 'Continuous SecOps monitoring', 'Compliance-ready evidence']`

- [ ] **Step 2: Verify & commit** — `npm run build` exits 0; all four routes render.
```bash
git add src/pages/services
git commit -m "feat: add four pillar detail pages"
```

---

### Task 13: Platform page

**Files:** Create `src/pages/platform.astro`

- [ ] **Step 1: Create page** — Create `src/pages/platform.astro`:
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Constellation from '../components/Constellation.astro';
import RegionMap from '../components/RegionMap.astro';
import SectionHeading from '../components/SectionHeading.astro';
import CtaBand from '../components/CtaBand.astro';
---
<BaseLayout title="Platform" description="Sovereign private-cloud OpenShift, hosted across the Middle East, Africa and Europe.">
  <section class="container-x pt-20 pb-10">
    <span class="text-xs font-semibold uppercase tracking-[0.18em] text-cyan">Sovereign Private Cloud</span>
    <h1 class="mt-4 text-4xl md:text-5xl font-display font-semibold tracking-tight max-w-3xl">The platform behind AI-native enterprises.</h1>
    <p class="mt-6 text-lg text-mut max-w-2xl">One OpenShift core, every capability orbiting it — built as code, operated by agents, and hosted in your region for data residency and control.</p>
  </section>
  <section class="container-x py-10"><Constellation /></section>
  <section class="container-x py-16">
    <SectionHeading eyebrow="Where we run" title="In-region by design." sub="Middle East, Africa and Europe — your data stays where it must." />
    <div class="mt-10"><RegionMap /></div>
  </section>
  <CtaBand />
</BaseLayout>
```

- [ ] **Step 2: Verify & commit** — `npm run build` exits 0.
```bash
git add src/pages/platform.astro
git commit -m "feat: add platform page"
```

---

### Task 14: Approach page

**Files:** Create `src/pages/approach.astro`

- [ ] **Step 1: Create page** — Create `src/pages/approach.astro`:
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import CtaBand from '../components/CtaBand.astro';
const steps = [
  { k: 'Assess', d: 'We map your current platform, delivery workflows, risks and goals — and agree what "good" looks like.' },
  { k: 'Architect', d: 'We design the sovereign, GitOps-native target state, with security and AI readiness built in from the start.' },
  { k: 'Automate', d: 'We build the platform as code and layer agentic operations on top — detect, plan, act, verify.' },
  { k: 'Operate', d: 'We run it autonomously, with humans on the guardrails and a signed audit trail on every change.' },
];
---
<BaseLayout title="Approach" description="Assess → Architect → Automate → Operate. A clear path from today to autonomous.">
  <section class="container-x pt-20 pb-10">
    <span class="text-xs font-semibold uppercase tracking-[0.18em] text-cyan">How we engage</span>
    <h1 class="mt-4 text-4xl md:text-5xl font-display font-semibold tracking-tight max-w-3xl">A clear path from today to autonomous.</h1>
    <p class="mt-6 text-lg text-mut max-w-2xl">Four stages, each producing working software you own. No big-bang — we earn autonomy step by step.</p>
  </section>
  <section class="container-x py-10 space-y-4">
    {steps.map((s, i) => (
      <div class="rounded-2xl bg-gradient-to-b from-panel to-bg2 hairline p-7 flex gap-6 items-start">
        <div class="font-display text-2xl font-semibold text-grad">0{i + 1}</div>
        <div><h3 class="font-display text-xl font-semibold">{s.k}</h3><p class="mt-2 text-mut">{s.d}</p></div>
      </div>
    ))}
  </section>
  <CtaBand />
</BaseLayout>
```

- [ ] **Step 2: Verify & commit** — `npm run build` exits 0.
```bash
git add src/pages/approach.astro
git commit -m "feat: add approach page"
```

---

### Task 15: About / Team page

**Files:** Create `src/pages/about.astro`

- [ ] **Step 1: Create page** — Create `src/pages/about.astro`:
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import TeamCard from '../components/TeamCard.astro';
import SectionHeading from '../components/SectionHeading.astro';
import CtaBand from '../components/CtaBand.astro';
import { team } from '../data/team';
---
<BaseLayout title="About" description="A senior-only team of cloud-native, AI and security practitioners based in the UAE.">
  <section class="container-x pt-20 pb-10">
    <span class="text-xs font-semibold uppercase tracking-[0.18em] text-cyan">Who we are</span>
    <h1 class="mt-4 text-4xl md:text-5xl font-display font-semibold tracking-tight max-w-3xl">We live and breathe AI, cloud-native and OpenShift.</h1>
    <p class="mt-6 text-lg text-mut max-w-2xl">Galaxy-Digital is a UAE-based consultancy and MSP. We build sovereign private-cloud platforms and turn their operations autonomous. Senior-only — no juniors, no offshore handoff.</p>
  </section>
  <section class="container-x py-10">
    <SectionHeading eyebrow="The team" title="Practitioners, not account managers." />
    <div class="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">{team.map((m) => <TeamCard member={m} />)}</div>
  </section>
  <CtaBand />
</BaseLayout>
```

- [ ] **Step 2: Verify & commit** — `npm run build` exits 0; five headshots render.
```bash
git add src/pages/about.astro
git commit -m "feat: add about/team page"
```

---

### Task 16: Contact page

**Files:** Create `src/pages/contact.astro`

- [ ] **Step 1: Create page (mailto-based form, static-friendly)** — Create `src/pages/contact.astro`:
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { site, socials } from '../data/site';
---
<BaseLayout title="Contact" description="Book a platform review with Galaxy-Digital.">
  <section class="container-x pt-20 pb-10 grid lg:grid-cols-2 gap-12">
    <div>
      <span class="text-xs font-semibold uppercase tracking-[0.18em] text-cyan">Contact</span>
      <h1 class="mt-4 text-4xl md:text-5xl font-display font-semibold tracking-tight">Book a platform review.</h1>
      <p class="mt-6 text-lg text-mut max-w-md">Tell us where you are and where you want to get to. We'll come back with a concrete next step.</p>
      <div class="mt-8 space-y-2 text-mut">
        <p>{site.location}</p>
        <p><a class="text-azure hover:brightness-110" href={`mailto:${site.email}`}>{site.email}</a></p>
        {socials.map((s) => <p><a class="hover:text-txt" href={s.href}>{s.label} →</a></p>)}
      </div>
    </div>
    <form action={`mailto:${site.email}`} method="post" enctype="text/plain" class="rounded-2xl bg-gradient-to-b from-panel to-bg2 hairline p-7 space-y-4">
      <div><label class="text-sm text-mut">Name</label><input name="name" required class="mt-1 w-full rounded-lg bg-space hairline px-3 py-2.5 text-txt focus:border-azure outline-none" /></div>
      <div><label class="text-sm text-mut">Work email</label><input name="email" type="email" required class="mt-1 w-full rounded-lg bg-space hairline px-3 py-2.5 text-txt focus:border-azure outline-none" /></div>
      <div><label class="text-sm text-mut">What are you building?</label><textarea name="message" rows="4" class="mt-1 w-full rounded-lg bg-space hairline px-3 py-2.5 text-txt focus:border-azure outline-none"></textarea></div>
      <button type="submit" class="w-full rounded-xl px-5 py-3 text-sm font-semibold text-white bg-gradient-to-r from-azure to-deep hover:brightness-110 shadow-glow">Send</button>
      <p class="text-xs text-mut">Opens your mail client. Prefer email? Write to {site.email}.</p>
    </form>
  </section>
</BaseLayout>
```

- [ ] **Step 2: Verify & commit** — `npm run build` exits 0.
```bash
git add src/pages/contact.astro
git commit -m "feat: add contact page"
```

---

### Task 17: Legal page

**Files:** Create `src/pages/legal.astro`

- [ ] **Step 1: Create page** — Create `src/pages/legal.astro`:
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { site } from '../data/site';
---
<BaseLayout title="Legal" description="Legal information and privacy notice for Galaxy-Digital.">
  <section class="container-x pt-20 pb-24 max-w-2xl">
    <h1 class="text-4xl font-display font-semibold tracking-tight">Legal & Privacy</h1>
    <div class="mt-8 space-y-6 text-mut">
      <div><h2 class="text-xl font-display font-semibold text-txt">Company</h2><p class="mt-2">Galaxy-Digital, {site.location}. Contact: <a class="text-azure" href={`mailto:${site.email}`}>{site.email}</a>.</p></div>
      <div><h2 class="text-xl font-display font-semibold text-txt">Privacy</h2><p class="mt-2">We collect only the information you choose to send us via email or the contact form, and use it solely to respond to your enquiry. We do not sell personal data. To request deletion of your data, email us.</p></div>
      <div><h2 class="text-xl font-display font-semibold text-txt">Cookies</h2><p class="mt-2">This site is static and uses no tracking cookies.</p></div>
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 2: Verify & commit** — `npm run build` exits 0.
```bash
git add src/pages/legal.astro
git commit -m "feat: add legal page"
```

---

## Phase 5 — Polish & Final Verification

### Task 18: Responsive, accessibility & reduced-motion pass

**Files:** Touch any component needing fixes found during review.

- [ ] **Step 1: Mobile sweep** — Run `npm run dev`, view every route at 375px width. Confirm: nav collapses to the hamburger `<details>` menu, grids stack, no horizontal scroll, hero terminal fits. Fix overflow with responsive utilities where needed.
- [ ] **Step 2: A11y sweep** — Confirm: every `<img>` has alt text, headings are ordered (single h1 per page), interactive elements are keyboard-focusable, color contrast on `text-mut` over `bg-space` is acceptable (lighten to a brighter token if any text fails). Add `aria-label` to icon-only controls (already on MobileMenu summary).
- [ ] **Step 3: Reduced motion** — In browser devtools, enable "reduce motion" and reload the homepage. Confirm the terminal lines all show immediately and no animations run.
- [ ] **Step 4: Commit** — `git add -A && git commit -m "fix: responsive, a11y and reduced-motion polish"`

---

### Task 19: Build scripts, README, final build

**Files:** Modify `package.json`; create `README.md`

- [ ] **Step 1: Confirm scripts** — Ensure `package.json` has `"dev": "astro dev"`, `"build": "astro build"`, `"preview": "astro preview"` (Astro adds these by default; add if missing).
- [ ] **Step 2: README** — Create `README.md`:
```markdown
# Galaxy-Digital Website

Static marketing site (Astro + Tailwind) for www.galaxy-digital.ae.

## Develop
```
npm install
npm run dev      # http://localhost:4321
```
## Build
```
npm run build    # outputs static site to dist/
npm run preview  # serve the production build locally
```
Deploys as static files (e.g. nginx on OpenShift). Brand assets live in `assets/`; design spec and plan in `docs/superpowers/`.
```
- [ ] **Step 3: Full build + preview** — Run `npm run build` (exits 0), then `npm run preview` and click through all 10 routes: `/`, `/services`, `/services/platform-engineering`, `/services/agentic-operations`, `/services/ai-transformation`, `/services/security`, `/platform`, `/approach`, `/about`, `/contact`, `/legal`. Confirm each renders with nav + footer.
- [ ] **Step 4: Commit** — `git add -A && git commit -m "docs: add README; finalize build scripts"`

---

## Self-Review (completed by plan author)

**Spec coverage:** Positioning/story → Hero + About (Tasks 9,15). Four pillars → data + cards + 4 detail pages (Tasks 3,7,11,12). Design system (color/type/components) → Tasks 2,4,7,8. Agentic differentiator → Task 9 Differentiator + agentic-operations page (Task 12). Sovereign platform/regions → Constellation/RegionMap + platform page (Tasks 8,13). Approach → Task 14. Team (5, real photos) → Tasks 3,7,15. Contact → Task 16. Legal → Task 17. Honesty constraints (no fake clients, capability metrics) → Task 10 metrics + copy throughout. Tech (Astro/Tailwind/static) → Tasks 1,2. WordPress removed → Task 1. **All spec sections covered.**

**Deferred (per spec §8):** OpenShift redeploy, CMS/blog, Arabic/RTL, real form backend, real OG/logo-derived favicon — intentionally out of scope.

**Placeholder scan:** No TBD/TODO. The only `mailto:` form is a deliberate static-first choice (noted). Favicon and OG image are functional placeholders flagged for later replacement.

**Type consistency:** `Pillar`, `Member` interfaces defined in data (Task 3) and consumed with matching fields in PillarCard/TeamCard (Task 7). Pillar `slug`s match the four page filenames (Task 12). `Button` props (`href`, `variant`) consistent across usages.
