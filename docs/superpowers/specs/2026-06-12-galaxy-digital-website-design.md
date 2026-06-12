# Galaxy-Digital Website — Design Spec

**Date:** 2026-06-12
**Domain:** www.galaxy-digital.ae
**Type:** Marketing website + design system for an IT consultancy / MSP
**Replaces:** the WordPress-on-OpenShift skeleton currently in this repo

---

## 1. Positioning & Brand Story

**What Galaxy-Digital is:** a UAE-based IT consultancy / managed service provider whose people *live and breathe* AI, cloud-native, GitOps and OpenShift. The company builds and operates sovereign private-cloud OpenShift platforms across the Middle East, Africa and Europe, and turns standard OpenShift DevOps workflows into **autonomous, agentic** workflows.

**Lead angle (decided):** *Engineering credibility.* The site must read as built by deep practitioners, not marketers.
**Primary audience (decided):** *digital-native scale-ups* — fast-growing, tech-forward teams that buy on competence, speed and modern engineering.
**Visual personality (decided):** *deep-space premium* — dark cosmic palette with luminous azure accents, leaning into the "Galaxy" name and the brand logo.

**One-line positioning:**
> **Sovereign private cloud. Autonomous operations. AI-native by design.**
> We build and run the OpenShift platforms that power AI-driven enterprises across the Middle East, Africa & Europe — engineered by humans, operated by agents.

**Hero headline (decided — Direction A "Agentic Terminal"):**
> **DevOps that runs itself.**
> We turn standard OpenShift GitOps pipelines into autonomous, agentic workflows — engineered by humans, operated by agents, from our sovereign private cloud across MEA & Europe.

**Brand motif (from the logo):** the **human hand ↔ robot hand** — *humans set intent, agents execute and reconcile.* Recurring narrative thread and the backbone of the "Agentic DevOps" section. Logo also carries a globe (regional reach) and a "G" monogram.

---

## 2. Business Pillars (the offering, organized)

Cloud-Native and OpenShift are the **substrate** running through all pillars, not separate pillars.

| # | Pillar | Marketing name | Scope |
|---|--------|----------------|-------|
| 1 | **Platform Engineering** | *Sovereign Cloud Platforms* | Build private-cloud OpenShift platforms; in-region managed hosting (MEA & EU) |
| 2 | **DevOps & Automation** | *Agentic Operations* | AI-driven DevOps ops, GitOps, Infrastructure-as-Code → autonomous agentic workflows *(the signature differentiator)* |
| 3 | **AI Transformation** | *AI, End-to-End* | Digital transformation: stakeholder management, design, implementation, governance |
| 4 | **Security** | *Secure by Default* | Security audits + Security Operations / monitoring (SecOps) |

---

## 3. Design System

### Color (logo-matched)
| Token | Hex | Use |
|-------|-----|-----|
| `space` (bg) | `#04060E` | page background (deep navy-black) |
| `bg2` | `#0A1020` | raised background |
| `panel` | `#0C1426` | cards, surfaces |
| `line` | `rgba(120,180,240,.12)` | hairline borders |
| `azure` (primary) | `#1EA3E8` | hero accent, buttons, links |
| `cyan` | `#5CC8F7` | highlights, gradient partner |
| `deep` | `#1565D8` | button gradient end |
| `signal` | `#56D364` | success / "ok" telemetry states |
| `txt` | `#E9EEFB` | primary text |
| `mut` | `#94A3C4` | muted / secondary text |

**Gradient:** `cyan → azure` for emphasis text and buttons. Glow used sparingly — as *light*, not decoration. Subtle nebula radial-gradients in backgrounds; faint starfields acceptable as texture.

### Typography
- **Display / headings:** Space Grotesk (500–700), tight letter-spacing (`-0.02em`)
- **Body / UI:** Inter (400–600)
- **Code / telemetry:** JetBrains Mono (400–500)
- Fonts self-hosted via `@fontsource` (no runtime Google Fonts dependency, better for sovereign/offline posture).

### Components (design-system inventory)
Button (primary gradient / secondary outline), Nav (sticky, mega-menu for Services), Footer, Pillar card, Metric stat, Terminal panel (animated agent reconcile), Constellation diagram, Region map, Team card, Section heading w/ eyebrow, CTA band, Tech-logo strip, Pill/chip, Pros/feature list. All reusable Astro components.

### Motion (tasteful, reduced-motion aware)
Terminal typing/line-reveal on the hero; subtle fade-up on scroll for sections; gentle glow pulse on key accents. All gated behind `prefers-reduced-motion`.

---

## 4. Technical Architecture

- **Framework:** Astro (static output, zero JS by default; islands only where needed e.g. mobile menu, terminal animation).
- **Styling:** Tailwind CSS via official Astro integration; design tokens encoded in `tailwind.config` (colors, fonts, spacing). Compiled + purged stylesheet.
- **Components:** shared `.astro` components keep nav/footer/cards DRY across all pages.
- **Content:** page copy in Astro pages / lightweight content collections; pillar data in a typed data file so cards and pages stay in sync.
- **Assets:** logo at `assets/brand/galaxy-digital-logo-full.jpg` (already saved); derive a favicon + an SVG/transparent mark during build if feasible.
- **Output:** `astro build` → static `dist/` (HTML/CSS/JS), served by nginx/httpd on OpenShift. No PHP, no database — clean replacement of the WordPress deployment.
- **Deployment (future plan):** new container image (static + nginx) and OpenShift manifests replacing the WordPress YAML. Spec covers the *site*; the OpenShift redeploy is a follow-up plan, not this build.

### Proposed structure
```
src/
  components/   Nav, Footer, Button, PillarCard, MetricStat, Terminal,
                Constellation, RegionMap, TeamCard, SectionHeading, CtaBand, TechStrip
  layouts/      BaseLayout.astro (head, fonts, nav, footer, SEO meta)
  pages/        index, services/index, services/platform-engineering,
                services/agentic-operations, services/ai-transformation,
                services/security, platform, approach, about, contact, legal
  data/         pillars.ts, team.ts, regions.ts, metrics.ts
  styles/       global.css (tokens, base)
public/         logo, favicon, og image
tailwind.config.mjs
astro.config.mjs
```

---

## 5. Sitemap & Per-Page Content (all 10 pages)

1. **Home** — full long-scroll (see §6).
2. **Services (overview)** — the four pillars expanded, each linking to its detail page; "how the pillars fit together" framing.
3. **Platform Engineering** — sovereign cloud platforms; what we build, OpenShift expertise, IaC.
4. **Agentic Operations** *(flagship)* — the agentic DevOps story in depth: detect→plan→act→verify loop, human-in-the-loop guardrails, GitOps.
5. **AI Transformation** — end-to-end engagement: stakeholder management, design, implementation, governance.
6. **Security** — audits + SecOps/monitoring; secure-by-default posture.
7. **Platform** — sovereign private cloud, MEA·EU regions, data residency, the constellation/region visuals.
8. **Approach** — engagement model: Assess → Architect → Automate → Operate.
9. **About / Team** — company story + five senior engineers, real headshots (`assets/team/*.jpg`) + LinkedIn. "Senior-only, no offshore handoff."

   | Name | Title | LinkedIn | Photo |
   |------|-------|----------|-------|
   | Sam | Principal Cloud-Native Architect | /in/samuelterburg | sam.jpg |
   | Amit | AI-Native Engineer | /in/amitkatyayana | amit.jpg |
   | Mayank | Site Reliability Engineer | /in/mayank-s-596315104 | mayank.jpg |
   | Andrej | AI & Cloud-Native Engineer | /in/agolis | andrej.jpg |
   | Samira | Security Specialist | — | samira.jpg |
10. **Contact** — contact form (static-friendly: mailto or form endpoint TBD), UAE details, LinkedIn.

Plus a light **Legal** page (Privacy/Imprint). Every page uses `BaseLayout` (shared nav/footer/SEO).

---

## 6. Homepage Section Spec (decided order)

0. **Sticky Nav** — logo · Services mega-menu · Platform · Approach · Team · *Book a review* CTA
1. **Hero (Direction A)** — "DevOps that runs itself." headline + sub + dual CTA + animated agent-reconcile terminal
2. **Tech credibility strip** — "Engineered on the tools we live in": OpenShift, Kubernetes, Argo CD, Terraform, Ansible, Prometheus
3. **Four Pillars** — card grid linking to detail pages
4. **The Differentiator — Agentic DevOps** — signature section; detect→plan→act→verify loop + human↔robot motif
5. **Sovereign Platform & Regions** — constellation diagram (OpenShift core + pillar nodes) + MEA·Africa·EU region map + data-residency message
6. **How We Engage** — Assess → Architect → Automate → Operate
7. **Capability Metrics** — 100% GitOps · 3 regions · <60s auto-remediation · senior-only (capability stats, not fabricated client counts)
8. **The Team** — four senior engineers, photos + LinkedIn
9. **CTA Band** — "Let's build the platform your AI runs on."
10. **Footer** — pillars · company · regions · contact (UAE) · LinkedIn

---

## 7. Content & Honesty Constraints

- New company: **no fake client logos, testimonials, or client counts.** Credibility comes from technology/partner stack, capability metrics, and the senior team.
- Team members are real; use the provided names/titles, real headshots (`assets/team/`), and link to LinkedIn profiles where available (Samira has no profile link yet).
- Region claims (MEA/Africa/EU) reflect stated hosting footprint.
- All copy is drafted by us in this build; user reviews and can revise.

---

## 8. Out of Scope (this build)

- OpenShift redeploy (new static-site container image + manifests replacing WordPress YAML) — **follow-up plan**.
- CMS / blog / Insights section — future.
- Multi-language (Arabic/RTL) — future consideration, noted but not built now.
- Contact-form backend wiring — start with mailto / placeholder endpoint; real backend later.
- Real team photography — pending assets.

---

## 9. Success Criteria

- `astro build` produces a static site with all 10 pages, no runtime errors.
- Design system implemented as Tailwind tokens + reusable Astro components; visuals match the approved deep-space/azure direction and the logo.
- Homepage matches the approved 11-block scroll, including the animated hero terminal.
- Fully responsive (mobile → desktop), accessible (semantic HTML, color contrast, `prefers-reduced-motion`, keyboard nav).
- No fabricated proof; honest, engineering-credible copy throughout.
