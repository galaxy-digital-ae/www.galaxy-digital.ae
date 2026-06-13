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
