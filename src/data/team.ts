export interface Member { name: string; title: string; photo: string; linkedin?: string; }
export const team: Member[] = [
  { name: 'Sam', title: 'Principal Cloud-Native Architect', photo: '/team/sam.jpg', linkedin: 'https://www.linkedin.com/in/samuelterburg/' },
  { name: 'Amit', title: 'AI-Native Engineer', photo: '/team/amit.jpg', linkedin: 'https://www.linkedin.com/in/amitkatyayana/' },
  { name: 'Mayank', title: 'Site Reliability Engineer', photo: '/team/mayank.jpg', linkedin: 'https://www.linkedin.com/in/mayank-s-596315104/' },
  { name: 'Andrej', title: 'AI & Cloud-Native Engineer', photo: '/team/andrej.jpg', linkedin: 'https://www.linkedin.com/in/agolis/' },
  { name: 'Samira', title: 'Security Specialist', photo: '/team/samira.jpg' },
];
