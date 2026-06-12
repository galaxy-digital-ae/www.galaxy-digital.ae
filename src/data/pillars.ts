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
