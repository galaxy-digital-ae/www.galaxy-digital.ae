# Galaxy-Digital Proof, Credibility & Culture Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax. Invoke `frontend-design:frontend-design` for components and the `design-system` skill for page composition + copy.

**Goal:** Add hard proof (named case studies + metrics), Red Hat credibility (pedigree + certs + trust strip), and a people/culture rebalance to the live site.

**Architecture:** Astro 5 + Tailwind v4, reusing the design-system kit (`PageHero`, `Section`, `Card`, `CardGrid`, `FeatureList`, `Icon`). New structured content in `src/data/*.ts`; two small new components (`TrustStrip`, plus metric rendering in `CaseStudyCard`); pages composed from the kit.

**Tech Stack:** Astro, Tailwind v4 (`bg-linear-to-*`), inlined Lucide icons, TypeScript data.

**Reference:** Spec at `docs/superpowers/specs/2026-06-13-galaxy-digital-proof-credibility.md`. Use the `design-system` skill's tone + content rules.

**Verification convention:** each task gate = `npm run build` exits 0 + visual check. Commit per task. **Deploy gate changed:** `grep -ri 'hoolia' dist/` must be clean (internal codename); "tesco"/"grn.cloud" are now intentional and allowed.

---

## File Structure

```
src/components/icons.ts     MODIFY  +award, graduation-cap, book-open, zap
src/data/caseStudies.ts     MODIFY  named cases + metrics field
src/data/metrics.ts         MODIFY  real authorized numbers
src/data/team.ts            MODIFY  + headline?, certs?; fill all members
src/data/values.ts          CREATE  6 culture tenets
src/components/TrustStrip.astro    CREATE
src/components/CaseStudyCard.astro MODIFY  render metrics row
src/components/TeamCard.astro      MODIFY  render headline
src/pages/index.astro       MODIFY  TrustStrip + values band + named cases
src/pages/about.astro       MODIFY  headlines + Certifications + Values sections
src/pages/custom-build.astro MODIFY TrustStrip
.claude/skills/design-system/references/content.md  MODIFY  naming permissions
~/.claude/.../memory/galaxy-digital-positioning.md  MODIFY  named clients + pedigree
```

---

## Phase A — Data & icons

### Task 1: Add culture icons to `icons.ts`

**Files:** Modify `src/components/icons.ts`

- [ ] **Step 1:** Add four names to the `IconName` union: `| 'award' | 'graduation-cap' | 'book-open' | 'zap'`.
- [ ] **Step 2:** Add their entries to the `icons` map (real Lucide paths):
```ts
  'award': '<path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/><circle cx="12" cy="8" r="6"/>',
  'graduation-cap': '<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>',
  'book-open': '<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
  'zap': '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
```
- [ ] **Step 3:** `npm run build` exits 0. Commit: `git add src/components/icons.ts && git commit -m "Add culture icons (award, graduation-cap, book-open, zap)"`

### Task 2: Named case studies + metrics

**Files:** Modify `src/data/caseStudies.ts`

- [ ] **Step 1:** Replace the file:
```ts
export interface CaseStudy {
  tag: string; title: string; challenge: string; built: string; outcome: string;
  metrics?: { value: string; label: string }[]; note?: string;
}
export const caseStudies: CaseStudy[] = [
  {
    tag: 'Sovereign private cloud',
    title: 'GRN.CLOUD — a sovereign Dutch cloud provider',
    challenge: 'Run a sovereign datacenter without a large operations team.',
    built: '600 bare-metal servers managed entirely as code, and a 100%-automated datacenter on GitOps, CI/CD and agentic AI workflows (MCP tools and SOPs) with vLLM local model serving.',
    outcome: 'A datacenter a single person can operate — fully autonomous and sovereign by design.',
    metrics: [
      { value: '600', label: 'bare-metal servers' },
      { value: '100%', label: 'automated' },
      { value: '1', label: 'person to run it' },
    ],
  },
  {
    tag: 'Enterprise OpenShift · with Red Hat',
    title: 'Tesco — enterprise OpenShift at scale',
    challenge: 'Operate a massive internal platform across multiple sites.',
    built: '400+ HostedClusters across three sites, managed with Red Hat ACM, plus agentic AIOps for triage, health and pipeline automation.',
    outcome: '2× faster GitOps CI/CD deployments and fleet-wide consistency.',
    metrics: [
      { value: '400+', label: 'HostedClusters' },
      { value: '3', label: 'sites via ACM' },
      { value: '2×', label: 'faster CI/CD' },
    ],
    note: 'Delivered as a joint engagement with Red Hat consultancy.',
  },
];
```
- [ ] **Step 2:** Build exit 0. Commit: `git add src/data/caseStudies.ts && git commit -m "Name case studies (GRN.CLOUD, Tesco with Red Hat) with metrics"`

### Task 3: Real homepage metrics

**Files:** Modify `src/data/metrics.ts`

- [ ] **Step 1:** Replace the array:
```ts
export const metrics = [
  { value: '600', label: 'bare-metal servers automated' },
  { value: '400+', label: 'HostedClusters via ACM' },
  { value: '2×', label: 'faster GitOps CI/CD' },
  { value: '100%', label: 'GitOps-managed' },
];
```
- [ ] **Step 2:** Build exit 0. Commit: `git add src/data/metrics.ts && git commit -m "Use real authorized metrics on homepage"`

### Task 4: Team credentials

**Files:** Modify `src/data/team.ts`

- [ ] **Step 1:** Replace the file:
```ts
export interface Member { name: string; title: string; photo: string; linkedin?: string; headline?: string; certs?: string[]; }
export const team: Member[] = [
  { name: 'Sam', title: 'Principal Cloud-Native Architect', photo: '/team/sam.jpg', linkedin: 'https://www.linkedin.com/in/samuelterburg/',
    headline: 'Former Red Hat OpenShift Solution Architect',
    certs: [
      'Red Hat Certified Architect (RHCA Cloud, Level 6)',
      'Red Hat Certified Engineer (RHCE)',
      'Red Hat Certified System Administrator (RHCSA)',
      'Red Hat Certified Virtualization Administrator',
      'Red Hat Certified Administrator in OpenStack',
      'Certificate of Expertise in PaaS (Docker Containers)',
      'Certificate of Expertise in Configuration Management (Puppet, EX405)',
      'Red Hat Certified JBoss Administrator (EAP6)',
    ] },
  { name: 'Amit', title: 'AIOps Engineer', photo: '/team/amit.jpg', linkedin: 'https://www.linkedin.com/in/amitkatyayana/',
    headline: 'MSc Data Science & AI (Distinction), University of Liverpool',
    certs: [
      'Certified Kubernetes Administrator (CKA)',
      'AWS Certified Solutions Architect – Associate',
      'Building Applications Using Amazon Bedrock',
      'MLflow',
    ] },
  { name: 'Mayank', title: 'Site Reliability Engineer', photo: '/team/mayank.jpg', linkedin: 'https://www.linkedin.com/in/mayank-s-596315104/',
    certs: [
      'Certified Kubernetes Administrator (CKA)',
      'Red Hat Certified Engineer (RHCE 6 & 7)',
      'Red Hat Certified Engineer in Red Hat OpenStack',
      'Red Hat Certified System Administrator (RHCSA 6 & 7)',
      'AWS Certified Solutions Architect – Associate',
    ] },
  { name: 'Andrej', title: 'AI & Cloud-Native Engineer', photo: '/team/andrej.jpg', linkedin: 'https://www.linkedin.com/in/agolis/',
    headline: 'Former Red Hat engineer',
    certs: [
      'Red Hat Certified Architect (Level III)',
      'Red Hat Certified Specialist in OpenShift Administration',
      'Red Hat Certified Virtualization Administrator (EX318)',
      'Certificate of Expertise in Clustering & Storage Management (EX436)',
      'Certificate of Expertise in Hybrid Cloud Storage (EX236)',
      'Red Hat Certified System Administrator in OpenStack',
      'Certificate of Expertise in Server Hardening (EX413)',
      'Certificate of Expertise in Deployment & Systems Management (EX401)',
      'Red Hat Certified Engineer (RHCE)',
      'Red Hat Certified System Administrator (RHCSA)',
    ] },
  { name: 'Samira', title: 'Security Specialist', photo: '/team/samira.jpg' },
];
```
- [ ] **Step 2:** Build exit 0. Commit: `git add src/data/team.ts && git commit -m "Add team headlines and Red Hat/cloud certifications"`

### Task 5: Culture values

**Files:** Create `src/data/values.ts`

- [ ] **Step 1:** Create the file:
```ts
import type { IconName } from '../components/icons';
export interface Value { title: string; blurb: string; icon: IconName; }
export const values: Value[] = [
  { title: 'Highly skilled', blurb: 'Senior-only engineers — Red Hat Certified Architects and former Red Hat staff.', icon: 'award' },
  { title: 'Always learning', blurb: 'We stay at the edge of OpenShift, GitOps and AI — curiosity kept sharp.', icon: 'graduation-cap' },
  { title: 'Always teaching', blurb: 'We enable your teams as we go. Knowledge transfer is part of the work, not an afterthought.', icon: 'book-open' },
  { title: 'Open culture', blurb: 'Open source by default, open communication by habit — no black boxes.', icon: 'users' },
  { title: 'European culture', blurb: 'Direct, pragmatic and quality-first, with the rigour enterprise and government buyers expect.', icon: 'globe' },
  { title: 'Work hard, play hard', blurb: 'We care about the craft and enjoy it — intensity with a sense of humour.', icon: 'zap' },
];
```
- [ ] **Step 2:** Build exit 0. Commit: `git add src/data/values.ts && git commit -m "Add culture values data"`

---

## Phase B — Components

### Task 6: `TrustStrip.astro`

**Files:** Create `src/components/TrustStrip.astro`

- [ ] **Step 1:** Create the file:
```astro
---
const points = [
  'Red Hat Business Partner (NL)',
  'Former Red Hat OpenShift Solution Architects',
  'Red Hat Certified Architects (RHCA)',
  'Trusted by GRN.CLOUD & Tesco (with Red Hat)',
];
---
<section class="border-y border-line bg-bg2/40">
  <div class="container-x py-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center">
    {points.map((p) => <span class="text-sm text-mut">{p}</span>)}
  </div>
</section>
```
- [ ] **Step 2:** Build exit 0. Commit: `git add src/components/TrustStrip.astro && git commit -m "Add TrustStrip credibility band"`

### Task 7: Render metrics in `CaseStudyCard`

**Files:** Modify `src/components/CaseStudyCard.astro`

- [ ] **Step 1:** After the `outcome` `<p>` and before the `{study.note && …}` line, insert a metrics row:
```astro
  {study.metrics && (
    <div class="mt-5 flex flex-wrap gap-x-6 gap-y-3">
      {study.metrics.map((m) => (
        <div><span class="font-display text-xl font-semibold text-grad">{m.value}</span> <span class="text-xs text-mut">{m.label}</span></div>
      ))}
    </div>
  )}
```
(The `CaseStudy` type already has `metrics?` from Task 2.)
- [ ] **Step 2:** Build exit 0; on `/case-studies/` the metric numbers render. Commit: `git add src/components/CaseStudyCard.astro && git commit -m "Render case-study metrics row"`

### Task 8: Render headline in `TeamCard`

**Files:** Modify `src/components/TeamCard.astro`

- [ ] **Step 1:** Immediately after the line that renders `member.title` (`<p class="text-sm text-cyan">{member.title}</p>`), add:
```astro
  {member.headline && <p class="mt-1 text-xs text-mut">{member.headline}</p>}
```
- [ ] **Step 2:** Build exit 0; Sam/Amit/Andrej show their headline on `/about/`. Commit: `git add src/components/TeamCard.astro && git commit -m "Show team member headline"`

---

## Phase C — Pages

### Task 9: Homepage — trust strip, real metrics, named cases, culture band

**Files:** Modify `src/pages/index.astro`

- [ ] **Step 1: Imports** — add to the frontmatter: `import TrustStrip from '../components/TrustStrip.astro';`, `import Card from '../components/Card.astro';`, `import { values } from '../data/values';`. (CaseStudyCard, CardGrid, SectionHeading, Section already imported from earlier work; if any is missing, add it.)
- [ ] **Step 2: Trust strip** — insert `<TrustStrip />` immediately after the existing `<TechStrip />` line (near the top).
- [ ] **Step 3: Region claim** — in the `Hero` is bespoke; instead add the regional claim as a small line. Just below the `<TrustStrip />`, the metrics/cases already carry proof, so no extra hero edit needed. (If a homepage tagline line is wanted, that's a later tweak — not in this task.)
- [ ] **Step 4: Culture band** — insert before the final `<CtaBand />`:
```astro
  <Section texture="grid">
    <SectionHeading eyebrow="How we work" title="Senior engineers who teach as they build." sub="No juniors, no offshore handoff — Red Hat Certified Architects and ex-Red Hat engineers who care about the craft." />
    <CardGrid cols={3} class="mt-10">
      {values.map((v) => <Card title={v.title} icon={v.icon}>{v.blurb}</Card>)}
    </CardGrid>
  </Section>
```
- [ ] **Step 5:** The existing case-studies teaser now renders the named cases with metrics automatically (data-driven). Build exit 0; homepage shows the trust strip, real metrics (600/400+/2×/100%), named case cards with metric rows, and the culture band.
- [ ] **Step 6:** Commit: `git add src/pages/index.astro && git commit -m "Homepage: trust strip, named cases, culture band"`

### Task 10: About — headlines, certifications, values, pedigree

**Files:** Modify `src/pages/about.astro`

- [ ] **Step 1:** Read the current `about.astro`. Keep the `PageHero` and team grid (now showing headlines automatically). Update the hero `lead` to include the pedigree: append (keep existing first sentence) "Built by former Red Hat OpenShift Solution Architects and Red Hat Certified Architects." Use the `design-system` voice.
- [ ] **Step 2: Certifications section** — add imports (`import { team } from '../data/team';` likely already present; `import Section from '../components/Section.astro'`, `import CardGrid from '../components/CardGrid.astro'`, `import Card from '../components/Card.astro'`, `import SectionHeading from '../components/SectionHeading.astro'` as needed). Add after the team grid:
```astro
  <Section texture="grid">
    <SectionHeading eyebrow="Credentials" title="Certified to the architect level." sub="The certifications our engineers have earned — depth you can verify." />
    <CardGrid cols={2} class="mt-10">
      {team.filter((m) => m.certs && m.certs.length).map((m) => (
        <Card title={m.name} variant="blueprint">
          {m.headline && <span class="block text-xs text-cyan mb-3">{m.headline}</span>}
          <ul class="space-y-1.5">{m.certs!.map((c) => <li class="flex gap-2 text-mut"><span class="text-signal">✓</span>{c}</li>)}</ul>
        </Card>
      ))}
    </CardGrid>
  </Section>
```
- [ ] **Step 3: Values section** — add `import { values } from '../data/values';` and insert:
```astro
  <Section>
    <SectionHeading eyebrow="How we work" title="Our way of working." />
    <CardGrid cols={3} class="mt-10">
      {values.map((v) => <Card title={v.title} icon={v.icon}>{v.blurb}</Card>)}
    </CardGrid>
  </Section>
```
- [ ] **Step 4:** Build exit 0; `/about/` shows headlines on team cards, a certifications grid (Sam/Amit/Mayank/Andrej; Samira omitted — no certs), and the values section; single h1 preserved.
- [ ] **Step 5:** Commit: `git add src/pages/about.astro && git commit -m "About: pedigree, certifications and values sections"`

### Task 11: Custom Build — trust strip

**Files:** Modify `src/pages/custom-build.astro`

- [ ] **Step 1:** Add `import TrustStrip from '../components/TrustStrip.astro';` and place `<TrustStrip />` immediately after the `<PageHero … />`.
- [ ] **Step 2:** Build exit 0. Commit: `git add src/pages/custom-build.astro && git commit -m "Custom Build: add trust strip"`

---

## Phase D — Plumbing

### Task 12: Update content rules + memory

**Files:** Modify `.claude/skills/design-system/references/content.md`, `~/.claude/projects/-home-sterburg-git-galaxy-digital-www-galaxy-digital-ae/memory/galaxy-digital-positioning.md`

- [ ] **Step 1:** In `references/content.md`, replace the blanket anonymization rule with the new policy: **GRN.CLOUD** and **Tesco (framed as a joint engagement with Red Hat)** are nameable; the authorized metrics (600 servers / 100% automated / 1-person; 400+ HostedClusters / 3 sites / 2× CI/CD) may be used. Keep: no *unverified* metrics; the internal repo codename **`hoolia` must never appear**. Add the pedigree facts (ex-Red Hat; Sam = former Red Hat OpenShift Solution Architect) and the regional claim.
- [ ] **Step 2:** Update the `galaxy-digital-positioning` memory: clients GRN.CLOUD + Tesco are now nameable with framing; add the ex-Red Hat pedigree; note `hoolia` is the internal codename for the GRN.CLOUD repo (never publish). Keep it one concise file.
- [ ] **Step 3:** `npm run build` still exits 0 (these files don't affect the build). Commit: `git add .claude/skills/design-system/references/content.md && git commit -m "Update content rules: GRN.CLOUD and Tesco nameable"` (the memory file lives outside the repo; it is saved, not committed here).

---

## Phase E — Verify & ship

### Task 13: Verify, gate, deploy

**Files:** none

- [ ] **Step 1:** `npm run build` exit 0; `find dist -name index.html | wc -l` = 14.
- [ ] **Step 2:** Single h1 per page: `for f in $(find dist -name index.html); do c=$(grep -c '<h1' $f); [ "$c" = 1 ] || echo "BAD $c $f"; done` (no output = good).
- [ ] **Step 3:** Updated gate — internal codename only: `grep -ri 'hoolia' dist/ && echo "LEAK — FIX" || echo "clean ✓"` → must be `clean ✓`. Confirm the intended names DO appear: `grep -rl 'GRN.CLOUD' dist/ | head -1` and `grep -rl 'Tesco' dist/ | head -1` both match.
- [ ] **Step 4:** Proof renders: `grep -o '600' dist/index.html | head -1`; `grep -o 'Former Red Hat OpenShift Solution Architect' dist/about/index.html | head -1`; `grep -o 'RHCA Cloud, Level 6' dist/about/index.html | head -1`.
- [ ] **Step 5:** Deploy:
```bash
rm -rf /tmp/gdctx && mkdir -p /tmp/gdctx && git archive HEAD | tar -x -C /tmp/gdctx
oc start-build galaxy-digital-build --from-dir=/tmp/gdctx --follow -n galaxy-digital-web
oc rollout status deploy/galaxy-digital -n galaxy-digital-web --timeout=180s
```
- [ ] **Step 6:** Verify live: `for p in / /about/ /case-studies/ /custom-build/; do curl -s -o /dev/null -w "%{http_code} $p\n" "https://www.galaxy-digital.ae$p"; done` → all 200; `curl -s https://www.galaxy-digital.ae/about/ | grep -o 'RHCA Cloud, Level 6'` matches; `curl -s https://www.galaxy-digital.ae/ | grep -iq hoolia && echo LEAK || echo "clean ✓"`.

---

## Self-Review (completed by plan author)

**Spec coverage:** Category claim + pedigree → TrustStrip (Task 6), homepage/about copy (Tasks 9-10). Named case studies + metrics → Tasks 2,7,9,11. Trust strip → Tasks 6,9,11. Certifications → Tasks 1,4,8,10. Real metrics → Task 3. Values/culture → Tasks 5,9,10. Content-rule + memory → Task 12. Deploy gate change → Task 13. **All spec sections covered.**

**Placeholder scan:** No TBD/TODO. All cert/metric data is real and supplied. Samira correctly has no `certs` (filtered out of the certifications grid).

**Type consistency:** `IconName` extended (Task 1) and consumed by `values.ts` (Task 5) with the new names. `CaseStudy.metrics?` defined (Task 2) and consumed in `CaseStudyCard` (Task 7). `Member.headline?`/`certs?` defined (Task 4) and consumed in `TeamCard` (Task 8) + about (Task 10). `Value` (`title`/`blurb`/`icon`) consumed via `Card` in Tasks 9-10. `Card`/`CardGrid`/`Section`/`SectionHeading` props match the existing components.
