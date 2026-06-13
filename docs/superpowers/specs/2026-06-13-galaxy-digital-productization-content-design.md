# Galaxy-Digital — Productization Content Spec

**Date:** 2026-06-13
**Builds on:** `2026-06-12-galaxy-digital-website-design.md` (positioning, design system, Astro+Tailwind stack — all unchanged)
**Goal:** Turn the live site from a generic four-pillar services site into a **consultancy-first productization**. Ground every claim in capability we have actually delivered, presented **anonymously**. Lead with **Custom Build** (build your sovereign OpenShift platform + AIOps as a custom implementation); hosting stays an explicit add-on.

---

## 1. Positioning (unchanged, sharpened)

Galaxy-Digital is an MSP specialised in **OpenShift and AIOps**. The product is **consultancy**: we build sovereign, on-premise OpenShift private clouds and turn their Day-2 operations into autonomous, agentic workflows. Ideal customer already runs OpenShift/Kubernetes — or is deliberately moving to it. **Managed hosting (MEA/EU) is an add-on, not a co-equal product.**

One-liner (unchanged): *Sovereign private cloud. Autonomous operations. AI-native by design.*

---

## 2. Evidence sources (INTERNAL — never published)

Two delivered engagements ground the copy. **Their names and any traceable specifics must never appear on the site.**

- `~/git/hoolia/openshift-config` — sovereign on-prem OpenShift private cloud, GitOps-managed, agent-automated. The OpenShift reference.
- `~/git/tesco/tesco-developer-platform` — enterprise-scale internal developer platform with a deep AIOps skill/agent library. **Azure/AKS, not OpenShift** — cite only as *AIOps depth*, never as an OpenShift reference.

**Anonymisation rule:** reference as "a European sovereign-cloud operator" and "a Fortune-500 retailer" (or similar). No names, logos, dates, cluster names, or numbers traceable to a client. No metric appears unless it is a generic capability stat we can stand behind (same rule as the existing site).

---

## 3. Honesty constraints (carried over + extended)

- No client names, logos, testimonials, or traceable specifics until written consent is secured.
- No fabricated or unverified metrics. Capability stats only (e.g. "100% GitOps-managed", "6 Day-2 ops domains").
- Tesco evidence is framed strictly as AIOps automation depth — never implied to be OpenShift.
- Every named OpenShift component (ACM, ODF, RHOAI, ServiceMesh, GitOps, Virtualization, Kyverno, etc.) maps to something we have actually deployed (hoolia evidence).

---

## 4. The four pillars (re-grounded)

OpenShift components are **woven inline** (no standalone capabilities page).

### Platform Engineering — *Sovereign Cloud Platforms*
Build the sovereign OpenShift platform **and the AI-hosting substrate**.
- Cluster builds: bare-metal via ZTP/Metal3, IaaS, HostedClusters (HyperShift), multi-cluster via **ACM** Placement.
- Platform services: **GitOps** (Argo CD app-of-apps, sync-wave ordering), **ServiceMesh**, **OpenShift Virtualization**, **ODF/Ceph** + software-defined storage, networking (MetalLB, NMState, external-dns).
- **AI-hosting substrate** (moved here): **OpenShift AI / RHOAI**, **vLLM**/LLM serving, GPU enablement.
- Outcome: a private cloud you own, defined as code, ready for AI workloads.

### Agentic Operations — *AI-driven Day-2 operations* (flagship differentiator)
The routine ops that consume a platform team, run by agents with humans on the guardrails. **Six operational domains:**
1. **Provisioning** — bare-metal & IaaS, cluster/node onboarding.
2. **Lifecycle management** — OpenShift/operator upgrades, patching, drift reconciliation.
3. **Backup & DR** — Velero/OADP, etcd, databases, restore drills.
4. **Monitoring & observability** — metrics, logs, network flows, alert handling.
5. **Debugging & incident response** — health checks, triage, root-cause, postmortems.
6. **Capacity & maintenance** — node drain/cordon, scaling, tuning, cert/secret rotation.
- Outcome: fewer pages, faster recovery, a signed audit trail on every change. Links to **How We Automate** for the mechanism.

### AI Transformation — *people + business process* (application/workload layer)
Re-scoped away from infrastructure.
- **Enablement** — sessions to upskill DevOps/application teams.
- **DevOps process automation** — automating delivery workflows at the application/workload layer.
- **Autonomous agents & tools** — built with LangChain/CrewAI for business processes.
- **Governance & guardrails** — the controls those agents require.
- Outcome: from AI idea to governed production, with teams that can run it.

### Security — *Secure by Default*
- Policy-as-code (**Kyverno**), secrets management (**External Secrets**/Vault), TLS automation (**cert-manager**), identity (**OAuth/Keycloak**), SecOps monitoring.
- Outcome: safety as the default, sovereign by design.

---

## 5. New pages

### A. Custom Build (`/custom-build`) — new top-nav, the headline offering
- **Hero:** "Your sovereign OpenShift platform — custom-built." Sub: build + automate + (optionally) host.
- **Who it's for:** orgs already running OpenShift/Kubernetes, or deliberately adopting it; enterprises with large internal app-dev and hosting platforms; teams now scheduling AI workloads (agents, LLMs) that need governance.
- **What we build:** sovereign on-prem OpenShift private cloud (Platform Engineering) + autonomous Day-2 operations (Agentic Operations) + the agent/skill/guardrail automation layer (How We Automate).
- **Engagement:** reuse Approach — Assess → Architect → Automate → Operate.
- **Hosting add-on:** explicit, secondary section — "Prefer we run it? Managed OpenShift hosting across MEA & Europe."
- **CTA:** Book a platform review.

### B. How We Automate (`/how-we-automate`) — the differentiator / IP
The mechanism behind Agentic Operations: turning OpenShift GitOps into autonomous operations.
- **The building blocks:** SOPs → reusable **Skills** → **Sub-agents** → **Guardrails** (`AGENTS.md`-style operating rules) → **MCP gateway** brokering agent access with auth & rate-limiting.
- **The loop:** Detect → Plan → Act → Verify, within human-defined guardrails, signed audit trail.
- **Why it's safe:** policy-as-code, operator-pattern respect, data-safety precedence, GitOps-only changes.
- Outcome: not scripts — a disciplined, autonomous operating system for your platform.

### C. Case Studies (`/case-studies`) — two anonymized stories
- **Case 1 — "A European sovereign-cloud operator":** on-prem OpenShift private cloud, multi-cluster, GitOps-managed, agent-automated (provisioning, backup, ops). Capability stats only.
- **Case 2 — "A Fortune-500 retailer":** enterprise-scale AIOps automation for an internal developer platform — incident triage, health reporting, pipeline investigation, chaos testing. Framed as AIOps, not OpenShift.
- Each: Challenge → What we built → Outcome (qualitative). No names, no traceable specifics. A clear "anonymized" note.

---

## 6. Site-wide updates

- **Nav:** add **Custom Build** as a primary nav item. To avoid nav bloat, **How We Automate** and **Case Studies** are reached via the footer plus contextual in-page links (How We Automate is linked prominently from the Agentic Operations pillar and Custom Build; Case Studies from the homepage and Custom Build).
- **Footer:** add Custom Build, How We Automate, Case Studies links.
- **Homepage:** add a concise **Custom Build** call-out band and a **How We Automate** teaser; keep existing hero, pillars, metrics, team. Optionally swap one homepage section to surface the 6 Day-2 ops domains.
- **Services overview & pillar pages:** rewrite copy per §4. Keep existing layout/components.

---

## 7. Design & tech (no new stack)

- Reuse the existing Astro + Tailwind design system and components. Prefer existing components (`SectionHeading`, `PillarCard`, `CtaBand`, `MetricStat`, etc.); add small new presentational components only where a pattern repeats (e.g. an "ops domain" card grid, a "building block" step list, a case-study card).
- Move structured content into typed `src/data/*.ts` files so copy and pages stay in sync: extend `pillars.ts`; add `opsDomains.ts`, `buildingBlocks.ts`, `caseStudies.ts`, `customBuild.ts` as needed.
- Same build → OpenShift → `www.galaxy-digital.ae` pipeline (`deploy/`), unchanged.

---

## 8. Out of scope (this build)

- Named case studies / logos / testimonials — until written client consent.
- A standalone OpenShift "Capabilities" page — components are woven into pillars instead.
- Detailed vLLM/RHOAI product sub-pages, pricing pages, SaaS self-serve — later.
- Blog / Insights, multi-language/RTL — later.

---

## 9. Success criteria

- `astro build` clean; new pages (`/custom-build`, `/how-we-automate`, `/case-studies`) plus the four rewritten pillar pages render and are linked from nav/footer/home.
- Every capability claim traces to real delivered work; zero client names or traceable specifics; no unverified metrics.
- Agentic Operations presents the six Day-2 domains; AI Transformation is people/process-focused; vLLM/RHOAI sits under Platform Engineering.
- Deployed live to `www.galaxy-digital.ae` through the existing pipeline.
