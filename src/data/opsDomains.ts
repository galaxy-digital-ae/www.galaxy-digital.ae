import type { IconName } from '../components/icons';
export interface OpsDomain { name: string; blurb: string; icon: IconName; }
export const opsDomains: OpsDomain[] = [
  { name: 'Provisioning', blurb: 'Bare-metal (ZTP) and IaaS cluster and node onboarding.', icon: 'boxes' },
  { name: 'Lifecycle management', blurb: 'OpenShift and operator upgrades, patching, drift reconciliation.', icon: 'refresh-cw' },
  { name: 'Backup & DR', blurb: 'Velero/OADP, etcd and database backups, restore drills.', icon: 'database' },
  { name: 'Monitoring & observability', blurb: 'Metrics, logs and network flows with proactive alert handling.', icon: 'activity' },
  { name: 'Debugging & incident response', blurb: 'Health checks, triage, root-cause analysis and postmortems.', icon: 'bug' },
  { name: 'Capacity & maintenance', blurb: 'Node drain/cordon, scaling, tuning, certificate and secret rotation.', icon: 'gauge' },
];
