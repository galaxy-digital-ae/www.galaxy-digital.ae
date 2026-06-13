import type { IconName } from '../components/icons';
export interface Pillar {
  slug: string; name: string; marketing: string; blurb: string; points: string[]; icon: IconName;
}
export const pillars: Pillar[] = [
  { slug: 'platform-engineering', name: 'Platform Engineering', marketing: 'Sovereign Cloud Platforms', icon: 'layers',
    blurb: 'We build sovereign OpenShift private clouds you own — from bare metal to the AI-hosting substrate — defined entirely as code.',
    points: [
      'Cluster builds: bare-metal (ZTP), IaaS and HostedClusters, multi-cluster via ACM',
      'Platform services: GitOps, Service Mesh, OpenShift Virtualization, ODF/Ceph storage, networking',
      'AI-hosting substrate: OpenShift AI (RHOAI), vLLM/LLM serving, GPU enablement',
    ] },
  { slug: 'agentic-operations', name: 'Agentic Operations', marketing: 'Autonomous Day-2 Operations', icon: 'bot',
    blurb: 'We run the Day-2 operations that consume a platform team as autonomous agentic workflows — humans set intent, agents execute and reconcile.',
    points: [
      'Provisioning, lifecycle and upgrades, backup and DR',
      'Monitoring, debugging, incident response and postmortems',
      'Detect → plan → act → verify, with human guardrails and a signed audit trail',
    ] },
  { slug: 'ai-transformation', name: 'AI Transformation', marketing: 'AI at the Application Layer', icon: 'cpu',
    blurb: 'We help your teams adopt AI where the work happens — enablement, automated DevOps processes, and governed autonomous agents.',
    points: [
      'Enablement sessions for DevOps and application teams',
      'DevOps process automation at the workload layer',
      'Autonomous agents and tools (LangChain, CrewAI) with governance and guardrails',
    ] },
  { slug: 'security', name: 'Security', marketing: 'Secure by Default', icon: 'shield-check',
    blurb: 'Security that is the default, not a phase — policy-as-code, managed secrets, identity, and SecOps.',
    points: [
      'Policy-as-code with Kyverno; identity via OAuth/Keycloak',
      'Managed secrets (External Secrets/Vault) and automated TLS (cert-manager)',
      'Security audits and SecOps monitoring, sovereign by design',
    ] },
];
