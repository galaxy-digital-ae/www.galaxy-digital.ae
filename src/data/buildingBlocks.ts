export interface Block { name: string; blurb: string; }
export const buildingBlocks: Block[] = [
  { name: 'SOPs', blurb: 'Hard-won runbooks for every routine operation — the institutional knowledge of running a platform.' },
  { name: 'Skills', blurb: 'Each SOP becomes a reusable, composable skill an agent can execute.' },
  { name: 'Sub-agents', blurb: 'Specialist agents (provisioning, ops, backup) execute skills autonomously.' },
  { name: 'Guardrails', blurb: 'Operating rules keep every agent inside policy — GitOps-only changes, operator-pattern respect, data-safety first.' },
  { name: 'MCP gateway', blurb: 'One brokered, authenticated entry point for agent access, with rate limiting and an audit trail.' },
];
export const loop: string[] = ['Detect', 'Plan', 'Act', 'Verify'];
