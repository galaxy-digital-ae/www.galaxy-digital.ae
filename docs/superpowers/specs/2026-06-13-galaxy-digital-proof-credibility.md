# Galaxy-Digital — Proof, Credibility & Culture Spec

**Date:** 2026-06-13
**Builds on:** the live site + the design-system kit/skill (use `PageHero`/`Section`/`Card`/`CardGrid`/`FeatureList`/`Icon` and the `design-system` skill throughout).
**Trigger:** competitive analysis of HCS Company ([hcs-company.com](https://www.hcs-company.com/)). They win enterprise/gov OpenShift buyers with named clients, Red Hat partner status, and a strong people-first brand. We close those gaps — and out-credential them on Red Hat pedigree — while keeping our AI-native edge.

**Goal:** Add hard proof and credibility, and rebalance the brand toward **people & culture over product**.

---

## 1. Positioning refinements

- **Category claim (regional leadership, like HCS's "specialist of the Netherlands"):** *"The sovereign OpenShift & AIOps specialist for the Middle East."* Use in the homepage trust strip / hero sub-area.
- **Pedigree as the centerpiece (our sharpest credibility lever):** *Built by former Red Hat OpenShift Solution Architects.* Sam and Andrej are ex-Red Hat; **Sam was a Red Hat OpenShift Specialist / Solution Architect — Red Hat's highest-skilled OpenShift role**, above a Red Hat consultant. This beats HCS (a Red Hat *partner* staffed by consultants) on their own turf.
- **Keep our edge:** agentic AIOps + sovereignty + in-region. HCS has no AI story; the GRN.CLOUD "datacenter one person can run" proof is something they cannot match.
- **Rebalance to people/culture:** the team and how we work become a lead brand element, not an afterthought.

---

## 2. Named case studies (de-anonymized, with authorized metrics)

Replace the two anonymized case studies in `src/data/caseStudies.ts` with named ones.

### GRN.CLOUD — sovereign Dutch Cloud Service Provider *(flagship: agentic ops + sovereignty)*
- **Challenge:** run a sovereign datacenter without a large operations team.
- **What we built:** **600 bare-metal servers** managed entirely as code; a **100%-automated datacenter** on GitOps + CI/CD + **agentic AI workflows** (MCP tools & SOPs) with **vLLM** local model serving.
- **Outcome:** a datacenter **a single person can operate** — fully autonomous, sovereign by design.
- **Metrics:** 600 bare-metal servers · 100% automated · 1-person operations.

### Tesco — enterprise OpenShift at scale, *delivered jointly with Red Hat consultancy*
- **Challenge:** operate a massive internal platform across multiple sites.
- **What we built:** **400+ HostedClusters across 3 sites**, managed with **Red Hat ACM**; agentic AIOps for triage, health and pipeline automation.
- **Outcome:** **2× faster GitOps CI/CD deployments**, fleet-wide consistency.
- **Note:** delivered as a **joint engagement with Red Hat consultancy**.

Both render as named `CaseStudyCard`s with a metrics row. Logos: client *names* only (no logos unless later supplied).

---

## 3. Credibility & Red Hat

### 3a. Trust strip (homepage + Custom Build)
A compact band with: **Red Hat Business Partner** (honestly noted "via our Netherlands branch"), **Former Red Hat OpenShift Solution Architects**, **Red Hat Certified Architects on the team**, the **named clients** (GRN.CLOUD, Tesco), and the **regional category claim**.

### 3b. Certifications section (About/Team)
List each engineer's Red Hat certs explicitly — the long list signals depth. **No "expired" labels; present as earned credentials.** Lead each person with their highest tier.

- **Sam — RHCA (Cloud, Level 6); former Red Hat OpenShift Solution Architect.** Certs: Red Hat Certified Architect (RHCA Cloud, Level 6), RHCE, RHCSA, Red Hat Certified Virtualization Administrator, Red Hat Certified Administrator in OpenStack, Certificate of Expertise in PaaS (Docker Containers), Certificate of Expertise in Configuration Management (Puppet, EX405), Red Hat Certified JBoss Administrator (EAP6).
- **Andrej — RHCA Level III; ex-Red Hat.** Certs: Red Hat Certified Architect (Level III), Red Hat Certified Specialist in OpenShift Administration, Red Hat Certified Virtualization Administrator (EX318), Certificate of Expertise in Clustering & Storage Management (EX436), Certificate of Expertise in Hybrid Cloud Storage (EX236), Red Hat Certified System Administrator in OpenStack, Certificate of Expertise in Server Hardening (EX413), Certificate of Expertise in Deployment & Systems Management (EX401), RHCE, RHCSA.
- **Mayank — CKA + RHCE.** Certs: Certified Kubernetes Administrator (CNCF), Red Hat Certified Engineer (RHCE 6 & 7), Red Hat Certified Engineer in Red Hat OpenStack, Red Hat Certified System Administrator (RHCSA 6 & 7), AWS Certified Solutions Architect – Associate.
- **Amit — AI & Data Science specialist (lead with AI, not Red Hat — he holds none).** Headline: *MSc Data Science & Artificial Intelligence (Distinction), University of Liverpool* — dissertation: Financial NLP using LLMs. Credentials: Certified Kubernetes Administrator (Linux Foundation, CKA), AWS Certified Solutions Architect – Associate, Building Applications Using Amazon Bedrock, MLflow. His card reinforces our AI-native positioning and the AI Transformation pillar.

Store credentials in data: extend `src/data/team.ts` with `headline?: string` (Sam: "Former Red Hat OpenShift Solution Architect"; Amit: his MSc line) and `certs?: string[]`. Per person, the card leads with `headline` then lists `certs`.

### 3c. Homepage metrics (replace placeholders with real, authorized numbers)
Update `src/data/metrics.ts` to feature: **600** bare-metal servers automated · **400+** HostedClusters via ACM · **2×** faster CI/CD · **100%** GitOps-managed. (Keep "sovereign / MEA·EU" framing.)

---

## 4. People & culture (front-and-centre, more than product)

A **"How We Work"** values block built on the tenets:
**Highly skilled · Always learning · Always teaching · Open culture · European culture · Work hard, play hard.**

- New data file `src/data/values.ts` (each: title + one-line description + `icon`).
- A homepage **culture band** (between team and CTA) and an expanded **About** page section presenting the values + the cert/pedigree story, so the team leads the brand. Tone: engineering-premium (not HCS's playful register).

---

## 5. Content-rule & memory updates

- Update the `design-system` skill's `references/content.md`: **GRN.CLOUD and Tesco (with Red Hat) are now nameable** with the framings above; the listed metrics are authorized. Remove the blanket "no client names / Tesco-as-AIOps-only" rule; keep "no *unverified* metrics" (only use provided/authorized ones).
- Update the `galaxy-digital-positioning` memory to reflect named clients + the ex-Red Hat pedigree.

---

## 6. Honesty constraints

- The ex-Red Hat claim must stay accurate (former employment; Sam's Solution Architect role).
- Red Hat Business Partner is the **NL** entity — note it; don't imply a UAE partnership.
- Only the authorized metrics in §2/§3c may appear; no new invented numbers.
- Certs listed are real (scraped from the engineers' own LinkedIn profiles); Mayank/Amit pending real data — no placeholders shipped.
- **Deploy gate change:** the old anonymization grep (`tesco|hoolia` must be absent) no longer applies — "tesco" and "grn.cloud" are now intended. The remaining rule: the internal repo codename **`hoolia` must never appear** in `dist/` (it's the engagement's repo name, not the client's public name "GRN.CLOUD"). Updated verification: `grep -ri 'hoolia' dist/` must be clean.

---

## 7. Dependencies & out of scope

- All four engineers' credentials are now supplied (real). No outstanding data dependencies.
- **Out of scope:** careers page, blog/insights, new engagement models, client logos.

---

## 8. Success criteria

- Two **named** case studies (GRN.CLOUD, Tesco-with-Red-Hat) live with their metrics; the old anonymized versions gone.
- A homepage **trust strip** (Red Hat Business Partner/NL, ex-Red Hat Solution Architects, certs, named clients, regional claim) and updated real metrics.
- A **certifications** presentation on About/Team (Sam & Andrej full lists, no expiry framing; Mayank/Amit slots ready).
- A **values / How We Work** band (homepage + About) on the six tenets; the brand visibly leads more with people than product.
- `design-system` skill content-rules + positioning memory updated for the new naming permissions.
- Built with the design-system kit; `npm run build` clean; deployed live.
