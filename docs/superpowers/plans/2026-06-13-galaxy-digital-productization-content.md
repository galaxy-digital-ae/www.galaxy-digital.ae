# Galaxy-Digital Productization Content Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax. Invoke `frontend-design:frontend-design` when composing pages and `elements-of-style:writing-clearly-and-concisely` when writing copy.

**Goal:** Expand the live Astro site into a consultancy-first productization — re-ground the four pillars, add Custom Build / How We Automate / Case Studies pages, and wire them into nav, footer and homepage — all grounded in real delivered work, anonymized.

**Architecture:** Reuse the existing Astro 5 + Tailwind v4 design system and components. New structured copy lives in typed `src/data/*.ts` files; pages compose existing components (`SectionHeading`, `CtaBand`, `Button`, etc.) plus one new `CaseStudyCard`. No stack changes.

**Tech Stack:** Astro 5, Tailwind v4 (gradients use `bg-linear-to-*`), TypeScript data files. Deploy via the existing `deploy/` pipeline to `www.galaxy-digital.ae`.

**Reference:** Spec at `docs/superpowers/specs/2026-06-13-galaxy-digital-productization-content-design.md`.

**Verification convention:** Each task's gate is `npm run build` exits 0, then a visual check via `npm run dev`. Commit after each task. Honesty: no client names/traceable specifics, no unverified metrics; Tesco evidence framed only as AIOps.

---

## File Structure

```
src/data/
  pillars.ts        MODIFY  re-grounded blurbs + points (4 pillars)
  site.ts           MODIFY  add Custom Build to nav; add footerMore links
  opsDomains.ts     CREATE  6 Day-2 ops domains (Agentic Operations)
  buildingBlocks.ts CREATE  How-We-Automate building blocks + the loop
  caseStudies.ts    CREATE  2 anonymized case studies
  customBuild.ts    CREATE  audience, what-we-build, hosting add-on
src/components/
  CaseStudyCard.astro CREATE  one case-study card (reused on /case-studies + home)
src/pages/
  services/platform-engineering.astro  MODIFY  re-ground + weave stack
  services/agentic-operations.astro    MODIFY  6 ops domains grid
  services/ai-transformation.astro     MODIFY  people/process re-scope
  services/security.astro              MODIFY  re-ground
  services/index.astro                 MODIFY  refreshed intro
  custom-build.astro    CREATE  headline offering page
  how-we-automate.astro CREATE  the automation IP page
  case-studies.astro    CREATE  2 anonymized stories
  index.astro           MODIFY  Custom Build band + How-We-Automate + Case-Studies teasers
src/components/Footer.astro  MODIFY  add Custom Build / How We Automate / Case Studies
```

---

## Phase A — Data

### Task 1: Re-ground the four pillars

**Files:** Modify `src/data/pillars.ts`

- [ ] **Step 1: Replace the `pillars` array** (keep the `Pillar` interface). Set `src/data/pillars.ts` to:
```ts
export interface Pillar {
  slug: string; name: string; marketing: string; blurb: string; points: string[];
}
export const pillars: Pillar[] = [
  { slug: 'platform-engineering', name: 'Platform Engineering', marketing: 'Sovereign Cloud Platforms',
    blurb: 'We build sovereign OpenShift private clouds you own — from bare metal to the AI-hosting substrate — defined entirely as code.',
    points: [
      'Cluster builds: bare-metal (ZTP), IaaS and HostedClusters, multi-cluster via ACM',
      'Platform services: GitOps, Service Mesh, OpenShift Virtualization, ODF/Ceph storage, networking',
      'AI-hosting substrate: OpenShift AI (RHOAI), vLLM/LLM serving, GPU enablement',
    ] },
  { slug: 'agentic-operations', name: 'Agentic Operations', marketing: 'Autonomous Day-2 Operations',
    blurb: 'We run the Day-2 operations that consume a platform team as autonomous agentic workflows — humans set intent, agents execute and reconcile.',
    points: [
      'Provisioning, lifecycle and upgrades, backup and DR',
      'Monitoring, debugging, incident response and postmortems',
      'Detect → plan → act → verify, with human guardrails and a signed audit trail',
    ] },
  { slug: 'ai-transformation', name: 'AI Transformation', marketing: 'AI at the Application Layer',
    blurb: 'We help your teams adopt AI where the work happens — enablement, automated DevOps processes, and governed autonomous agents.',
    points: [
      'Enablement sessions for DevOps and application teams',
      'DevOps process automation at the workload layer',
      'Autonomous agents and tools (LangChain, CrewAI) with governance and guardrails',
    ] },
  { slug: 'security', name: 'Security', marketing: 'Secure by Default',
    blurb: 'Security that is the default, not a phase — policy-as-code, managed secrets, identity, and SecOps.',
    points: [
      'Policy-as-code with Kyverno; identity via OAuth/Keycloak',
      'Managed secrets (External Secrets/Vault) and automated TLS (cert-manager)',
      'Security audits and SecOps monitoring, sovereign by design',
    ] },
];
```

- [ ] **Step 2: Verify** — `npm run build` exits 0 (pillar pages and homepage consume this data).
- [ ] **Step 3: Commit** — `git add src/data/pillars.ts && git commit -m "content: re-ground the four service pillars"`

---

### Task 2: Ops domains data (Agentic Operations)

**Files:** Create `src/data/opsDomains.ts`

- [ ] **Step 1: Create the file:**
```ts
export interface OpsDomain { name: string; blurb: string; }
export const opsDomains: OpsDomain[] = [
  { name: 'Provisioning', blurb: 'Bare-metal (ZTP) and IaaS cluster and node onboarding.' },
  { name: 'Lifecycle management', blurb: 'OpenShift and operator upgrades, patching, drift reconciliation.' },
  { name: 'Backup & DR', blurb: 'Velero/OADP, etcd and database backups, restore drills.' },
  { name: 'Monitoring & observability', blurb: 'Metrics, logs and network flows with proactive alert handling.' },
  { name: 'Debugging & incident response', blurb: 'Health checks, triage, root-cause analysis and postmortems.' },
  { name: 'Capacity & maintenance', blurb: 'Node drain/cordon, scaling, tuning, certificate and secret rotation.' },
];
```
- [ ] **Step 2: Verify** — `npm run build` exits 0.
- [ ] **Step 3: Commit** — `git add src/data/opsDomains.ts && git commit -m "content: add 6 Day-2 ops domains data"`

---

### Task 3: Building blocks data (How We Automate)

**Files:** Create `src/data/buildingBlocks.ts`

- [ ] **Step 1: Create the file:**
```ts
export interface Block { name: string; blurb: string; }
export const buildingBlocks: Block[] = [
  { name: 'SOPs', blurb: 'Hard-won runbooks for every routine operation — the institutional knowledge of running a platform.' },
  { name: 'Skills', blurb: 'Each SOP becomes a reusable, composable skill an agent can execute.' },
  { name: 'Sub-agents', blurb: 'Specialist agents (provisioning, ops, backup) execute skills autonomously.' },
  { name: 'Guardrails', blurb: 'Operating rules keep every agent inside policy — GitOps-only changes, operator-pattern respect, data-safety first.' },
  { name: 'MCP gateway', blurb: 'One brokered, authenticated entry point for agent access, with rate limiting and an audit trail.' },
];
export const loop: string[] = ['Detect', 'Plan', 'Act', 'Verify'];
```
- [ ] **Step 2: Verify** — `npm run build` exits 0.
- [ ] **Step 3: Commit** — `git add src/data/buildingBlocks.ts && git commit -m "content: add how-we-automate building blocks data"`

---

### Task 4: Case studies data (anonymized)

**Files:** Create `src/data/caseStudies.ts`

- [ ] **Step 1: Create the file:**
```ts
export interface CaseStudy {
  tag: string; title: string; challenge: string; built: string; outcome: string; note?: string;
}
export const caseStudies: CaseStudy[] = [
  {
    tag: 'Sovereign private cloud',
    title: 'A European sovereign-cloud operator',
    challenge: 'Run a sovereign, on-premise OpenShift estate without a large operations team.',
    built: 'A multi-cluster OpenShift platform built entirely from Git — bare-metal provisioning, Service Mesh, Virtualization, Ceph storage and policy-as-code — operated by agents for provisioning, backup and Day-2 work.',
    outcome: 'A fully GitOps-managed private cloud where routine operations run autonomously, with humans on the guardrails.',
  },
  {
    tag: 'Enterprise AIOps',
    title: 'A Fortune-500 retailer',
    challenge: 'Let a small platform team support a large internal developer platform.',
    built: 'An AIOps automation library: parallel incident triage, platform-health reporting, pipeline-failure investigation, chaos testing and automated postmortems.',
    outcome: 'Routine investigation and reporting handled by agents, freeing the platform team for higher-value engineering.',
    note: 'A Kubernetes engagement — shown as AIOps depth, not an OpenShift reference.',
  },
];
```
- [ ] **Step 2: Verify** — `npm run build` exits 0.
- [ ] **Step 3: Commit** — `git add src/data/caseStudies.ts && git commit -m "content: add anonymized case studies data"`

---

### Task 5: Custom Build data

**Files:** Create `src/data/customBuild.ts`

- [ ] **Step 1: Create the file:**
```ts
export const audience: string[] = [
  'Already running OpenShift or Kubernetes — or deliberately adopting it',
  'Large internal application-development and hosting platforms',
  'Teams now scheduling AI workloads (agents, LLMs) that need governance',
];
export interface BuildPart { title: string; body: string; }
export const whatWeBuild: BuildPart[] = [
  { title: 'A sovereign platform', body: 'An on-premise OpenShift private cloud, built from bare metal to the AI-hosting substrate — defined as code.' },
  { title: 'Autonomous operations', body: 'The six Day-2 operations domains, run as agentic workflows with human guardrails.' },
  { title: 'The automation layer', body: 'Skills, sub-agents and guardrails tailored to your platform — the system that makes it run itself.' },
];
export const hosting = 'Prefer we run it? Managed OpenShift hosting across the Middle East and Europe — an add-on, not a lock-in.';
```
- [ ] **Step 2: Verify** — `npm run build` exits 0.
- [ ] **Step 3: Commit** — `git add src/data/customBuild.ts && git commit -m "content: add custom-build offering data"`

---

## Phase B — Component

### Task 6: CaseStudyCard component

**Files:** Create `src/components/CaseStudyCard.astro`

- [ ] **Step 1: Create the file:**
```astro
---
import type { CaseStudy } from '../data/caseStudies';
interface Props { study: CaseStudy; }
const { study } = Astro.props;
---
<article class="rounded-2xl bg-linear-to-b from-panel to-bg2 hairline p-7">
  <span class="text-xs font-semibold uppercase tracking-[0.14em] text-cyan">{study.tag}</span>
  <h3 class="mt-2 text-xl font-display font-semibold">{study.title}</h3>
  <div class="mt-5 space-y-4 text-sm">
    <p><span class="text-mut">Challenge — </span>{study.challenge}</p>
    <p><span class="text-mut">What we built — </span>{study.built}</p>
    <p><span class="text-azure">Outcome — </span>{study.outcome}</p>
  </div>
  {study.note && <p class="mt-5 text-xs text-mut italic">{study.note}</p>}
</article>
```
- [ ] **Step 2: Verify** — `npm run build` exits 0.
- [ ] **Step 3: Commit** — `git add src/components/CaseStudyCard.astro && git commit -m "feat: add CaseStudyCard component"`

---

## Phase C — Pages

### Task 7: Rewrite Platform Engineering page (weave the stack + AI substrate)

**Files:** Modify `src/pages/services/platform-engineering.astro`

- [ ] **Step 1: Replace the file** (keeps the existing layout; adds a woven platform-stack section). Set it to:
```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import CtaBand from '../../components/CtaBand.astro';
import { pillars } from '../../data/pillars';
const slug = 'platform-engineering';
const intro = `We build sovereign OpenShift private clouds you own — from bare metal to the AI-hosting substrate, defined entirely as code and ready for AI workloads from day one.`;
const outcomes: string[] = ['A platform you own, not rent', 'Reproducible from Git — no snowflakes', 'In-region data residency, ready for AI'];
const stack: { group: string; items: string }[] = [
  { group: 'Cluster builds', items: 'Bare-metal (ZTP) · IaaS · HostedClusters · multi-cluster via ACM' },
  { group: 'Platform services', items: 'GitOps · Service Mesh · OpenShift Virtualization · ODF/Ceph · networking' },
  { group: 'AI-hosting substrate', items: 'OpenShift AI (RHOAI) · vLLM/LLM serving · GPU enablement' },
];
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
  <section class="container-x py-10">
    <h2 class="text-2xl font-display font-semibold">The platform stack we build</h2>
    <div class="mt-6 grid md:grid-cols-3 gap-4">
      {stack.map((s) => (
        <div class="rounded-2xl bg-panel hairline p-6">
          <div class="text-xs uppercase tracking-[0.14em] text-cyan font-semibold">{s.group}</div>
          <p class="mt-2 text-sm text-mut">{s.items}</p>
        </div>
      ))}
    </div>
  </section>
  <CtaBand />
</BaseLayout>
```
- [ ] **Step 2: Verify** — `npm run build` exits 0; `/services/platform-engineering/` renders the stack section.
- [ ] **Step 3: Commit** — `git add src/pages/services/platform-engineering.astro && git commit -m "content: re-ground platform engineering page"`

---

### Task 8: Rewrite Agentic Operations page (6 ops domains)

**Files:** Modify `src/pages/services/agentic-operations.astro`

- [ ] **Step 1: Replace the file:**
```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import CtaBand from '../../components/CtaBand.astro';
import { pillars } from '../../data/pillars';
import { opsDomains } from '../../data/opsDomains';
const slug = 'agentic-operations';
const intro = `The routine Day-2 operations that consume a platform team — run as autonomous agentic workflows. Humans set intent and own the guardrails; agents detect, plan, act and verify.`;
const p = pillars.find((x) => x.slug === slug)!;
---
<BaseLayout title={p.name} description={p.blurb}>
  <section class="container-x pt-20 pb-10">
    <span class="text-xs font-semibold uppercase tracking-[0.18em] text-cyan">{p.marketing}</span>
    <h1 class="mt-4 text-4xl md:text-5xl font-display font-semibold tracking-tight max-w-3xl">{p.name}</h1>
    <p class="mt-6 text-lg text-mut max-w-2xl">{intro}</p>
  </section>
  <section class="container-x py-10">
    <h2 class="text-2xl font-display font-semibold">Six operations domains, automated</h2>
    <div class="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {opsDomains.map((d, i) => (
        <div class="rounded-2xl bg-linear-to-b from-panel to-bg2 hairline p-6">
          <div class="font-mono text-xs text-cyan">0{i + 1}</div>
          <h3 class="mt-2 font-display text-lg font-semibold">{d.name}</h3>
          <p class="mt-2 text-sm text-mut">{d.blurb}</p>
        </div>
      ))}
    </div>
    <p class="mt-6 text-sm text-mut">Want the mechanism behind this? See <a href="/how-we-automate" class="text-azure hover:brightness-110">how we automate operations →</a></p>
  </section>
  <CtaBand title="Let's make your platform run itself." />
</BaseLayout>
```
- [ ] **Step 2: Verify** — `npm run build` exits 0; the 6 domains render and the How-We-Automate link is present.
- [ ] **Step 3: Commit** — `git add src/pages/services/agentic-operations.astro && git commit -m "content: agentic operations page with 6 ops domains"`

---

### Task 9: Rewrite AI Transformation page (people/process)

**Files:** Modify `src/pages/services/ai-transformation.astro`

- [ ] **Step 1: Replace the file:**
```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import CtaBand from '../../components/CtaBand.astro';
import { pillars } from '../../data/pillars';
const slug = 'ai-transformation';
const intro = `AI adoption where the work actually happens — your application and DevOps teams. We run enablement, automate delivery processes, and build governed autonomous agents for your business workflows.`;
const outcomes: string[] = ['Teams that can build and run AI themselves', 'DevOps processes automated at the workload layer', 'Autonomous agents that stay inside policy'];
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
      <h2 class="text-2xl font-display font-semibold">What we do</h2>
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
- [ ] **Step 2: Verify** — `npm run build` exits 0.
- [ ] **Step 3: Commit** — `git add src/pages/services/ai-transformation.astro && git commit -m "content: re-scope AI transformation to people and process"`

---

### Task 10: Rewrite Security page

**Files:** Modify `src/pages/services/security.astro`

- [ ] **Step 1: Replace the file:**
```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import CtaBand from '../../components/CtaBand.astro';
import { pillars } from '../../data/pillars';
const slug = 'security';
const intro = `Security as the default, not a phase. We enforce policy-as-code, manage secrets and identity, and run Security Operations so issues are caught and contained — sovereign by design.`;
const outcomes: string[] = ['Guardrails enforced automatically, not by review', 'Secrets and certificates managed and rotated', 'Continuous SecOps, compliance-ready'];
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
- [ ] **Step 2: Verify** — `npm run build` exits 0.
- [ ] **Step 3: Commit** — `git add src/pages/services/security.astro && git commit -m "content: re-ground security page"`

---

### Task 11: Refresh Services overview intro

**Files:** Modify `src/pages/services/index.astro`

- [ ] **Step 1: Update only the `<h1>` and lead paragraph** in `src/pages/services/index.astro`. Find:
```astro
    <h1 class="mt-4 text-4xl md:text-5xl font-display font-semibold tracking-tight max-w-3xl">Four pillars for AI-native enterprises.</h1>
    <p class="mt-6 text-lg text-mut max-w-2xl">Cloud-native engineering and OpenShift are our substrate. On top, we deliver four outcomes — build the platform, automate its operations, transform with AI, and keep it secure by default.</p>
```
Replace with:
```astro
    <h1 class="mt-4 text-4xl md:text-5xl font-display font-semibold tracking-tight max-w-3xl">Four pillars. One sovereign platform.</h1>
    <p class="mt-6 text-lg text-mut max-w-2xl">We build sovereign OpenShift private clouds and run them autonomously. Build the platform, automate its Day-2 operations, transform your teams with AI, and keep it secure by default. <a href="/custom-build" class="text-azure hover:brightness-110">See how it comes together as a custom build →</a></p>
```
- [ ] **Step 2: Verify** — `npm run build` exits 0.
- [ ] **Step 3: Commit** — `git add src/pages/services/index.astro && git commit -m "content: refresh services overview intro"`

---

### Task 12: Custom Build page

**Files:** Create `src/pages/custom-build.astro`

- [ ] **Step 1: Create the file:**
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import SectionHeading from '../components/SectionHeading.astro';
import CtaBand from '../components/CtaBand.astro';
import { audience, whatWeBuild, hosting } from '../data/customBuild';
---
<BaseLayout title="Custom Build" description="We build your sovereign OpenShift private cloud and autonomous operations as a custom implementation.">
  <section class="container-x pt-20 pb-10">
    <span class="text-xs font-semibold uppercase tracking-[0.18em] text-cyan">Custom Build</span>
    <h1 class="mt-4 text-4xl md:text-5xl font-display font-semibold tracking-tight max-w-3xl">Your sovereign OpenShift platform — custom-built.</h1>
    <p class="mt-6 text-lg text-mut max-w-2xl">We build the platform, automate its operations, and hand you a sovereign private cloud that runs itself. Consultancy first — you own what we build.</p>
  </section>

  <section class="container-x py-10">
    <SectionHeading eyebrow="Who it's for" title="Built for platform-serious organisations." />
    <ul class="mt-8 grid md:grid-cols-3 gap-4">
      {audience.map((a) => <li class="rounded-2xl bg-panel hairline p-6 text-sm text-mut">{a}</li>)}
    </ul>
  </section>

  <section class="container-x py-10">
    <SectionHeading eyebrow="What we build" title="Three layers, one platform." />
    <div class="mt-8 grid md:grid-cols-3 gap-4">
      {whatWeBuild.map((b, i) => (
        <div class="rounded-2xl bg-linear-to-b from-panel to-bg2 hairline p-6">
          <div class="font-mono text-xs text-cyan">0{i + 1}</div>
          <h3 class="mt-2 font-display text-lg font-semibold">{b.title}</h3>
          <p class="mt-2 text-sm text-mut">{b.body}</p>
        </div>
      ))}
    </div>
  </section>

  <section class="container-x py-10">
    <SectionHeading eyebrow="How we engage" title="Assess → Architect → Automate → Operate." sub="A clear path from today to autonomous — each stage produces working software you own." />
    <p class="mt-6 text-sm text-mut"><a href="/approach" class="text-azure hover:brightness-110">See the full engagement model →</a></p>
  </section>

  <section class="container-x py-10">
    <div class="rounded-2xl hairline p-7 bg-panel">
      <h2 class="font-display text-xl font-semibold">Managed hosting — the add-on</h2>
      <p class="mt-3 text-mut max-w-2xl">{hosting}</p>
    </div>
  </section>

  <CtaBand title="Let's design your custom build." />
</BaseLayout>
```
- [ ] **Step 2: Verify** — `npm run build` exits 0; `/custom-build/` renders.
- [ ] **Step 3: Commit** — `git add src/pages/custom-build.astro && git commit -m "feat: add custom build page"`

---

### Task 13: How We Automate page

**Files:** Create `src/pages/how-we-automate.astro`

- [ ] **Step 1: Create the file:**
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import SectionHeading from '../components/SectionHeading.astro';
import CtaBand from '../components/CtaBand.astro';
import { buildingBlocks, loop } from '../data/buildingBlocks';
---
<BaseLayout title="How We Automate" description="How we turn OpenShift GitOps into autonomous operations: SOPs, skills, sub-agents, guardrails and an MCP gateway.">
  <section class="container-x pt-20 pb-10">
    <span class="text-xs font-semibold uppercase tracking-[0.18em] text-cyan">How we automate</span>
    <h1 class="mt-4 text-4xl md:text-5xl font-display font-semibold tracking-tight max-w-3xl">Not scripts — an operating system for your platform.</h1>
    <p class="mt-6 text-lg text-mut max-w-2xl">Standard GitOps stops at "declared". We add an autonomous layer on top, built from five composable building blocks — so your platform operates itself within guardrails you control.</p>
  </section>

  <section class="container-x py-10">
    <SectionHeading eyebrow="The building blocks" title="From runbook to autonomous agent." />
    <div class="mt-8 space-y-4">
      {buildingBlocks.map((b, i) => (
        <div class="rounded-2xl bg-linear-to-b from-panel to-bg2 hairline p-6 flex gap-6 items-start">
          <div class="font-display text-2xl font-semibold text-grad">0{i + 1}</div>
          <div><h3 class="font-display text-lg font-semibold">{b.name}</h3><p class="mt-2 text-sm text-mut">{b.blurb}</p></div>
        </div>
      ))}
    </div>
  </section>

  <section class="container-x py-10">
    <SectionHeading eyebrow="The loop" title="Detect → Plan → Act → Verify." sub="Every autonomous action runs this loop inside human-defined guardrails, with a signed audit trail." />
    <div class="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
      {loop.map((s, i) => (
        <div class="rounded-2xl bg-panel hairline p-6 text-center">
          <div class="font-mono text-xs text-cyan">0{i + 1}</div>
          <div class="mt-2 font-display text-lg font-semibold">{s}</div>
        </div>
      ))}
    </div>
  </section>

  <CtaBand title="See it running on your platform." />
</BaseLayout>
```
- [ ] **Step 2: Verify** — `npm run build` exits 0; `/how-we-automate/` renders.
- [ ] **Step 3: Commit** — `git add src/pages/how-we-automate.astro && git commit -m "feat: add how-we-automate page"`

---

### Task 14: Case Studies page

**Files:** Create `src/pages/case-studies.astro`

- [ ] **Step 1: Create the file:**
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import CaseStudyCard from '../components/CaseStudyCard.astro';
import CtaBand from '../components/CtaBand.astro';
import { caseStudies } from '../data/caseStudies';
---
<BaseLayout title="Case Studies" description="Anonymized engagements: sovereign OpenShift private cloud and enterprise-scale AIOps automation.">
  <section class="container-x pt-20 pb-10">
    <span class="text-xs font-semibold uppercase tracking-[0.18em] text-cyan">Case studies</span>
    <h1 class="mt-4 text-4xl md:text-5xl font-display font-semibold tracking-tight max-w-3xl">Work we've delivered.</h1>
    <p class="mt-6 text-lg text-mut max-w-2xl">Two engagements, told without the names. Details are anonymized to protect our clients; we'll share specifics under NDA.</p>
  </section>
  <section class="container-x py-10 grid md:grid-cols-2 gap-5">
    {caseStudies.map((s) => <CaseStudyCard study={s} />)}
  </section>
  <CtaBand />
</BaseLayout>
```
- [ ] **Step 2: Verify** — `npm run build` exits 0; `/case-studies/` renders both cards; the AIOps note appears on card 2.
- [ ] **Step 3: Commit** — `git add src/pages/case-studies.astro && git commit -m "feat: add anonymized case studies page"`

---

## Phase D — Site-wide wiring

### Task 15: Nav + Footer wiring

**Files:** Modify `src/data/site.ts`, `src/components/Footer.astro`

- [ ] **Step 1: Add Custom Build to nav + a footerMore list** — In `src/data/site.ts`, replace the `nav` const and add `footerMore`:
```ts
export const nav = [
  { label: 'Custom Build', href: '/custom-build' },
  { label: 'Services', href: '/services' },
  { label: 'Platform', href: '/platform' },
  { label: 'Approach', href: '/approach' },
  { label: 'Team', href: '/about' },
];
export const footerMore = [
  { label: 'How We Automate', href: '/how-we-automate' },
  { label: 'Case Studies', href: '/case-studies' },
];
```
(Custom Build now appears in the top nav, mobile menu, and footer Company column automatically, since those consume `nav`.)

- [ ] **Step 2: Add the footerMore links to the Footer Company column** — In `src/components/Footer.astro`, add the import and render the extra links. Change the import line:
```astro
import { site, nav, socials } from '../data/site';
```
to:
```astro
import { site, nav, socials, footerMore } from '../data/site';
```
Then in the Company `<ul>`, after the `{nav.map(...)}` expression and before the Legal `<li>`, add:
```astro
{footerMore.map((i) => <li><a class="text-sm text-mut hover:text-txt" href={i.href}>{i.label}</a></li>)}
```
- [ ] **Step 3: Verify** — `npm run build` exits 0; Custom Build is in the header nav, How We Automate + Case Studies appear in the footer.
- [ ] **Step 4: Commit** — `git add src/data/site.ts src/components/Footer.astro && git commit -m "feat: wire custom build into nav, how-we-automate and case studies into footer"`

---

### Task 16: Homepage teasers

**Files:** Modify `src/pages/index.astro`

- [ ] **Step 1: Add imports** — In the frontmatter of `src/pages/index.astro`, after the existing component imports, add:
```astro
import { opsDomains } from '../data/opsDomains';
import { caseStudies } from '../data/caseStudies';
import CaseStudyCard from '../components/CaseStudyCard.astro';
```
- [ ] **Step 2: Insert a Custom Build band** — In `src/pages/index.astro`, locate the line `  <Engage />` and insert the following block immediately AFTER it:
```astro
  <section class="container-x py-20">
    <div class="rounded-3xl hairline p-10 md:p-14 bg-linear-to-b from-panel to-bg2 shadow-glow grid lg:grid-cols-2 gap-10 items-center">
      <div>
        <span class="text-xs font-semibold uppercase tracking-[0.18em] text-cyan">Custom Build</span>
        <h2 class="mt-3 text-3xl md:text-4xl font-display font-semibold tracking-tight">We build it. It runs itself. You own it.</h2>
        <p class="mt-4 text-mut">A sovereign OpenShift private cloud, its Day-2 operations automated, delivered as a custom implementation. Hosting with us is an optional add-on.</p>
        <a href="/custom-build" class="mt-6 inline-block text-azure font-semibold hover:brightness-110">Explore Custom Build →</a>
      </div>
      <div class="grid grid-cols-2 gap-3">
        {opsDomains.slice(0, 6).map((d) => <div class="rounded-xl bg-space hairline p-4 text-sm"><span class="text-cyan">▸</span> {d.name}</div>)}
      </div>
    </div>
  </section>
```
- [ ] **Step 3: Insert a Case Studies teaser** — locate the line `  <CtaBand />` (the final one before `</BaseLayout>`) and insert immediately BEFORE it:
```astro
  <section class="container-x py-20">
    <div class="flex items-end justify-between flex-wrap gap-4">
      <SectionHeading eyebrow="Proof" title="Work we've delivered." />
      <a href="/case-studies" class="text-sm text-azure font-semibold hover:brightness-110">All case studies →</a>
    </div>
    <div class="mt-10 grid md:grid-cols-2 gap-5">{caseStudies.map((s) => <CaseStudyCard study={s} />)}</div>
  </section>
```
- [ ] **Step 4: Verify** — `npm run build` exits 0; homepage shows the Custom Build band (with the 6 ops domains) and the case-studies teaser. View at mobile width to confirm the grids stack.
- [ ] **Step 5: Commit** — `git add src/pages/index.astro && git commit -m "content: add custom build band and case studies teaser to homepage"`

---

## Phase E — Verify & ship

### Task 17: Full verification, a11y pass, deploy

**Files:** none (verification + deploy)

- [ ] **Step 1: Full build + route check** — Run `npm run build` (exit 0), then confirm new routes exist:
  `ls dist/custom-build/index.html dist/how-we-automate/index.html dist/case-studies/index.html`
  and the four pillar pages still build under `dist/services/`.
- [ ] **Step 2: a11y / responsive sweep** — `npm run dev`; view `/`, `/custom-build/`, `/how-we-automate/`, `/case-studies/`, and the four pillar pages at 375px and desktop. Confirm: single h1 per page, grids stack, nav shows Custom Build (hamburger on mobile), footer shows How We Automate + Case Studies, no horizontal scroll.
- [ ] **Step 3: Honesty check** — grep the built site for accidental client names: `grep -ri 'tesco\|hoolia' dist/ && echo "LEAK — FIX" || echo "clean ✓"`. Must print `clean ✓`.
- [ ] **Step 4: Deploy** — rebuild image and roll out:
```bash
rm -rf /tmp/gdctx && mkdir -p /tmp/gdctx && git archive HEAD | tar -x -C /tmp/gdctx
oc start-build galaxy-digital-build --from-dir=/tmp/gdctx --follow -n galaxy-digital-web
oc rollout status deploy/galaxy-digital -n galaxy-digital-web --timeout=180s
```
- [ ] **Step 5: Verify live** — confirm the new pages serve:
```bash
for p in /custom-build/ /how-we-automate/ /case-studies/ /services/agentic-operations/; do
  curl -s -o /dev/null -w "%{http_code} $p\n" "https://www.galaxy-digital.ae$p"; done
```
Expected: all `200`.
- [ ] **Step 6: Commit any fixes** — `git add -A && git commit -m "fix: productization a11y/responsive polish"` (skip if nothing changed).

---

## Self-Review (completed by plan author)

**Spec coverage:** Re-grounded pillars → Task 1 + pages Tasks 7-10. Agentic Operations 6 domains → Tasks 2,8. AI Transformation people/process → Task 9. vLLM→Platform Engineering → Task 7. Custom Build page → Tasks 5,12. How We Automate (SOPs→skills→sub-agents→guardrails→MCP gateway + loop) → Tasks 3,13. Case Studies (2 anonymized, Tesco-as-AIOps note) → Tasks 4,6,14. Nav (Custom Build primary; others footer) → Task 15. Footer → Task 15. Homepage teasers → Task 16. Honesty/anonymization → Task 4 note + Task 17 Step 3 grep. Deploy → Task 17. **All spec sections covered.**

**Placeholder scan:** No TBD/TODO. All copy is final and grounded. Anonymized framing is explicit.

**Type consistency:** `Pillar` (unchanged interface, Task 1) consumed by existing PillarCard and pillar pages. New interfaces `OpsDomain`, `Block`, `CaseStudy`, `BuildPart` defined in their data files (Tasks 2-5) and consumed with matching field names in pages (Tasks 8,12,13,14) and `CaseStudyCard` (Task 6). `footerMore` defined in site.ts (Task 15) and imported in Footer (Task 15). `loop` exported from buildingBlocks.ts (Task 3) and consumed in Task 13.
