export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Freelance';
export type JobLocationType = 'Remote' | 'On-site' | 'Hybrid';

export interface Job {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  locationType: JobLocationType;
  type: JobType;
  salary: string;
  description: string;
  tags: string[];
  postedAt: string;
}

export interface FreelanceProject {
  id: string;
  title: string;
  client: string;
  budget: string;
  duration: string;
  paymentType: 'Fixed' | 'Hourly';
  description: string;
  skills: string[];
  postedAt: string;
  proposals: number;
}

export const mockJobs: Job[] = [
  {
    id: 'j1',
    title: 'Senior Frontend Engineer',
    company: 'TechCorp',
    logo: '🚀',
    location: 'San Francisco, CA',
    locationType: 'Remote',
    type: 'Full-time',
    salary: '$120k - $150k',
    description: 'We are looking for an experienced Frontend Engineer to lead the development of our core product. You will work with React, TypeScript, and Tailwind CSS.',
    tags: ['React', 'TypeScript', 'Tailwind', 'Next.js'],
    postedAt: '2h ago'
  },
  {
    id: 'j2',
    title: 'Product Designer',
    company: 'CreativeSpace',
    logo: '✨',
    location: 'New York, NY',
    locationType: 'Hybrid',
    type: 'Full-time',
    salary: '$90k - $120k',
    description: 'Join our design team to create stunning user interfaces and experiences for our clients. Strong portfolio required.',
    tags: ['Figma', 'UI/UX', 'Prototyping'],
    postedAt: '5h ago'
  },
  {
    id: 'j3',
    title: 'Backend Developer (Node.js)',
    company: 'DataFlow',
    logo: '⚡',
    location: 'London, UK',
    locationType: 'Remote',
    type: 'Contract',
    salary: '$80/hr',
    description: 'Looking for a Node.js expert to help scale our microservices architecture. Experience with AWS is a big plus.',
    tags: ['Node.js', 'AWS', 'Microservices', 'PostgreSQL'],
    postedAt: '1d ago'
  },
  {
    id: 'j4',
    title: 'DevOps Engineer',
    company: 'CloudSys',
    logo: '☁️',
    location: 'Austin, TX',
    locationType: 'On-site',
    type: 'Full-time',
    salary: '$130k - $160k',
    description: 'Manage our infrastructure and deployment pipelines. You should be comfortable with Kubernetes, Terraform, and CI/CD tools.',
    tags: ['Kubernetes', 'Terraform', 'CI/CD', 'AWS'],
    postedAt: '2d ago'
  }
];

export const mockFreelanceProjects: FreelanceProject[] = [
  {
    id: 'f1',
    title: 'E-commerce Website Redesign',
    client: 'Urban Style Boutique',
    budget: '$5,000 - $8,000',
    duration: '1-2 months',
    paymentType: 'Fixed',
    description: 'We need a complete redesign of our Shopify store to improve conversion rates and modernise the brand look.',
    skills: ['Shopify', 'Web Design', 'CSS', 'Conversion Optimization'],
    postedAt: '1h ago',
    proposals: 12
  },
  {
    id: 'f2',
    title: 'React Native Mobile App Development',
    client: 'FitLife Startup',
    budget: '$45 - $65/hr',
    duration: '3-6 months',
    paymentType: 'Hourly',
    description: 'Looking for a React Native developer to help build our new fitness tracking app from scratch.',
    skills: ['React Native', 'Mobile Dev', 'Firebase', 'Redux'],
    postedAt: '4h ago',
    proposals: 8
  },
  {
    id: 'f3',
    title: 'Smart Contract Audit',
    client: 'DeFi Protocol X',
    budget: '$10,000',
    duration: '2 weeks',
    paymentType: 'Fixed',
    description: 'Need an experienced Solidity developer to audit our new staking contracts before mainnet launch.',
    skills: ['Solidity', 'Blockchain', 'Security Audit', 'Web3'],
    postedAt: '1d ago',
    proposals: 25
  },
  {
    id: 'f4',
    title: 'SEO Content Writer for Tech Blog',
    client: 'SaaS Analytics Co',
    budget: '$30 - $50/hr',
    duration: 'Ongoing',
    paymentType: 'Hourly',
    description: 'Seeking a technical writer to produce 2-3 high-quality blog posts per week about data analytics and SaaS trends.',
    skills: ['Content Writing', 'SEO', 'B2B', 'Tech Writing'],
    postedAt: '2d ago',
    proposals: 42
  }
];

export const jobCategories = [
  { name: 'Software Engineering', icon: '💻', count: '1,204', color: 'blue' },
  { name: 'Design & UX', icon: '🎨', count: '840', color: 'orange' },
  { name: 'Marketing', icon: '📈', count: '432', color: 'purple' },
  { name: 'Finance', icon: '💰', count: '210', color: 'yellow' },
  { name: 'Sales', icon: '🤝', count: '315', color: 'green' },
  { name: 'Customer Support', icon: '🎧', count: '523', color: 'red' },
  { name: 'Data Science', icon: '📊', count: '280', color: 'indigo' },
  { name: 'Product Management', icon: '📋', count: '150', color: 'pink' }
];

export interface Bootcamp {
  id: string;
  title: string;
  provider: string;
  logo: string;
  duration: string;
  format: 'Online' | 'In-person' | 'Hybrid';
  price: string;
  description: string;
  tags: string[];
  rating: number;
}

export const mockBootcamps: Bootcamp[] = [
  {
    id: 'b1',
    title: 'Full-Stack Web Development',
    provider: 'CodeAcademy',
    logo: '👨‍💻',
    duration: '12 weeks',
    format: 'Online',
    price: '$9,500',
    description: 'Learn modern web development from scratch. Master React, Node.js, and MongoDB with real-world projects and mentorship.',
    tags: ['React', 'Node.js', 'MongoDB', 'Career Support'],
    rating: 4.8
  },
  {
    id: 'b2',
    title: 'Data Science & Machine Learning',
    provider: 'DataCamp',
    logo: '📊',
    duration: '16 weeks',
    format: 'Hybrid',
    price: '$12,000',
    description: 'Dive deep into Python, Machine Learning, and Neural Networks. Includes a capstone project solving real industry problems.',
    tags: ['Python', 'Machine Learning', 'AI', 'TensorFlow'],
    rating: 4.9
  },
  {
    id: 'b3',
    title: 'UX/UI Design Immersive',
    provider: 'DesignSchool',
    logo: '🎨',
    duration: '10 weeks',
    format: 'Online',
    price: '$8,000',
    description: 'Become a product designer. Learn Figma, user research, wireframing, and build a stunning portfolio to land your first job.',
    tags: ['Figma', 'User Research', 'Prototyping'],
    rating: 4.7
  },
  {
    id: 'b4',
    title: 'Cybersecurity Analyst',
    provider: 'SecureTech',
    logo: '🛡️',
    duration: '14 weeks',
    format: 'Online',
    price: '$11,000',
    description: 'Prepare for a high-demand career in cybersecurity. Learn ethical hacking, network defense, and incident response.',
    tags: ['Network Security', 'Ethical Hacking', 'CompTIA'],
    rating: 4.6
  }
];
