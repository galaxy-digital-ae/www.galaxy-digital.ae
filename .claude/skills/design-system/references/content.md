# Marketing content & honesty rules

Source of truth: `docs/superpowers/specs/2026-06-13-galaxy-digital-productization-content-design.md` and the typed data in `src/data/*.ts`. When writing copy, ground every claim in real delivered capability — presented **anonymously**.

## The offering

Galaxy-Digital is a **consultancy-first MSP specialised in OpenShift and AIOps**. The product is consultancy: we build sovereign, on-premise OpenShift private clouds and turn their Day-2 operations into autonomous, agentic workflows. The ideal customer already runs OpenShift/Kubernetes — or is deliberately moving to it.

Lead with **Custom Build** (build your sovereign OpenShift platform + AIOps as a custom implementation). **Managed hosting (MEA/EU) is an explicit add-on, not a co-equal product.**

One-liner: *Sovereign private cloud. Autonomous operations. AI-native by design.*

## The four pillars (one-liners)

- **Platform Engineering** — *Sovereign Cloud Platforms.* Build the sovereign OpenShift private cloud you own — from bare metal to the AI-hosting substrate — defined entirely as code.
- **Agentic Operations** — *Autonomous Day-2 Operations* (flagship differentiator). Run the Day-2 operations that consume a platform team as autonomous agentic workflows — humans set intent, agents execute and reconcile.
- **AI Transformation** — *AI at the Application Layer.* Help teams adopt AI where the work happens — enablement, automated DevOps processes, and governed autonomous agents. People + process, not infrastructure.
- **Security** — *Secure by Default.* Security that is the default, not a phase — policy-as-code, managed secrets, identity, and SecOps.

## The six Day-2 operations domains (Agentic Operations)

1. **Provisioning** — bare-metal (ZTP) and IaaS cluster and node onboarding.
2. **Lifecycle management** — OpenShift and operator upgrades, patching, drift reconciliation.
3. **Backup & DR** — Velero/OADP, etcd and database backups, restore drills.
4. **Monitoring & observability** — metrics, logs and network flows with proactive alert handling.
5. **Debugging & incident response** — health checks, triage, root-cause analysis and postmortems.
6. **Capacity & maintenance** — node drain/cordon, scaling, tuning, certificate and secret rotation.

Outcome: fewer pages, faster recovery, a signed audit trail on every change.

## The five building blocks (How We Automate)

The mechanism behind Agentic Operations — turning OpenShift GitOps into autonomous operations:

1. **SOPs** — hard-won runbooks for every routine operation; the institutional knowledge of running a platform.
2. **Skills** — each SOP becomes a reusable, composable skill an agent can execute.
3. **Sub-agents** — specialist agents (provisioning, ops, backup) execute skills autonomously.
4. **Guardrails** — operating rules keep every agent inside policy: GitOps-only changes, operator-pattern respect, data-safety first.
5. **MCP gateway** — one brokered, authenticated entry point for agent access, with rate limiting and an audit trail.

The loop: **Detect → Plan → Act → Verify**, within human-defined guardrails, with a signed audit trail.

## The two anonymized case angles

- **Case 1 — "A European sovereign-cloud operator"** (the OpenShift reference). On-prem, multi-cluster OpenShift private cloud built entirely from Git — bare-metal provisioning, Service Mesh, Virtualization, Ceph storage and policy-as-code — operated by agents for provisioning, backup and Day-2 work. Capability stats only.
- **Case 2 — "A Fortune-500 retailer"** (AIOps depth, **not** OpenShift). An enterprise-scale AIOps automation library for an internal developer platform: parallel incident triage, platform-health reporting, pipeline-failure investigation, chaos testing and automated postmortems. Framed strictly as AIOps automation depth. Carries an explicit anonymized note: a Kubernetes engagement shown as AIOps depth, not an OpenShift reference.

## Honesty & anonymization rules (non-negotiable)

- **No client names, logos, testimonials, or traceable specifics** until written consent is secured. Reference engagements only as "a European sovereign-cloud operator" / "a Fortune-500 retailer" (or similar). No names, logos, dates, cluster names, or numbers traceable to a client.
- **No fabricated or unverified metrics.** Capability stats only (e.g. "100% GitOps-managed", "6 Day-2 ops domains"). A metric appears only if it is a generic capability stat we can stand behind.
- **Never frame the enterprise-retail AKS work as OpenShift.** It is Azure/AKS — cite it only as *AIOps automation depth*, never as an OpenShift reference, never implied to be OpenShift.
- Every named OpenShift component (ACM, ODF, RHOAI, Service Mesh, GitOps, Virtualization, Kyverno, etc.) must map to capability we have actually deployed.
