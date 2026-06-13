import type { IconName } from '../components/icons';
export interface Block { name: string; blurb: string; icon: IconName; }
export const buildingBlocks: Block[] = [
  { name: 'SOPs', blurb: 'Hard-won runbooks for every routine operation — the institutional knowledge of running a platform.', icon: 'clipboard-list' },
  { name: 'Skills', blurb: 'Each SOP becomes a reusable, composable skill an agent can execute.', icon: 'puzzle' },
  { name: 'Sub-agents', blurb: 'Specialist agents (provisioning, ops, backup) execute skills autonomously.', icon: 'workflow' },
  { name: 'Guardrails', blurb: 'Operating rules keep every agent inside policy — GitOps-only changes, operator-pattern respect, data-safety first.', icon: 'shield' },
  { name: 'MCP gateway', blurb: 'One brokered, authenticated entry point for agent access, with rate limiting and an audit trail.', icon: 'network' },
];
export const loop: string[] = ['Detect', 'Plan', 'Act', 'Verify'];
