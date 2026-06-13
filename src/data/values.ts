import type { IconName } from '../components/icons';
export interface Value { title: string; blurb: string; icon: IconName; }
export const values: Value[] = [
  { title: 'Highly skilled', blurb: 'Senior-only engineers — Red Hat Certified Architects and former Red Hat staff.', icon: 'award' },
  { title: 'Always learning', blurb: 'We stay at the edge of OpenShift, GitOps and AI — curiosity kept sharp.', icon: 'graduation-cap' },
  { title: 'Always teaching', blurb: 'We enable your teams as we go. Knowledge transfer is part of the work, not an afterthought.', icon: 'book-open' },
  { title: 'Open culture', blurb: 'Open source by default, open communication by habit — no black boxes.', icon: 'users' },
  { title: 'European culture', blurb: 'Direct, pragmatic and quality-first, with the rigour enterprise and government buyers expect.', icon: 'globe' },
  { title: 'Work hard, play hard', blurb: 'We care about the craft and enjoy it — intensity with a sense of humour.', icon: 'zap' },
];
