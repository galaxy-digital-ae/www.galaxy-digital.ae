export interface OpsDomain { name: string; blurb: string; }
export const opsDomains: OpsDomain[] = [
  { name: 'Provisioning', blurb: 'Bare-metal (ZTP) and IaaS cluster and node onboarding.' },
  { name: 'Lifecycle management', blurb: 'OpenShift and operator upgrades, patching, drift reconciliation.' },
  { name: 'Backup & DR', blurb: 'Velero/OADP, etcd and database backups, restore drills.' },
  { name: 'Monitoring & observability', blurb: 'Metrics, logs and network flows with proactive alert handling.' },
  { name: 'Debugging & incident response', blurb: 'Health checks, triage, root-cause analysis and postmortems.' },
  { name: 'Capacity & maintenance', blurb: 'Node drain/cordon, scaling, tuning, certificate and secret rotation.' },
];
