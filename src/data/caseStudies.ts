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
