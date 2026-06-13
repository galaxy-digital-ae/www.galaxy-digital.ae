# Marketing content & honesty rules

Source of truth: `docs/superpowers/specs/2026-06-13-galaxy-digital-productization-content-design.md` and the typed data in `src/data/*.ts`. When writing copy, ground every claim in real delivered capability. Two clients may now be **named** — GRN.CLOUD and Tesco (with Red Hat); every other client stays anonymous. See the naming rules below.

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

## The two named case studies

- **GRN.CLOUD** — a sovereign Dutch Cloud Service Provider; our OpenShift + agentic-ops flagship. 600 bare-metal servers managed as code; a 100%-automated datacenter on GitOps + CI/CD + agentic AI (MCP tools & SOPs) with vLLM local model serving — operable by a single person. Authorized metrics: 600 servers · 100% automated · 1-person ops.
- **Tesco — with Red Hat** — enterprise OpenShift at scale. 400+ HostedClusters across three sites managed with Red Hat ACM, plus agentic AIOps. Authorized metrics: 400+ HostedClusters · 3 sites · 2× faster CI/CD. Always frame as a **joint engagement with Red Hat consultancy**.

## Honesty & naming rules (non-negotiable)

- **Nameable clients:** GRN.CLOUD and Tesco (Tesco always "with Red Hat") may be named with the framings above. Any OTHER client stays anonymous (no names/logos/traceable specifics) until written consent.
- **Pedigree — use it, it's our edge:** Sam and Andrej are former Red Hat engineers; Sam was a Red Hat OpenShift Solution Architect (Red Hat's highest OpenShift role). We are a Red Hat Business Partner **via the Netherlands branch** (not UAE — say "via our NL branch"). Regional claim: "the sovereign OpenShift & AIOps specialist for the Middle East."
- **No fabricated or unverified metrics.** Only the authorized client metrics above, plus generic capability stats (e.g. "100% GitOps-managed").
- **Internal codename `hoolia` must never appear in published output** — it is the GRN.CLOUD engagement's repo name, not the client's public name.
- Every named OpenShift component (ACM, ODF, RHOAI, Service Mesh, GitOps, Virtualization, Kyverno, etc.) must map to capability we have actually deployed.
