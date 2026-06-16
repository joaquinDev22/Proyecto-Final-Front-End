export type JobType = 'Tiempo Completo' | 'Medio Tiempo' | 'Contrato' | 'Freelance';
export type JobLocationType = 'Remoto' | 'Presencial' | 'Híbrido';

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
  paymentType: 'Fijo' | 'Por hora';
  description: string;
  skills: string[];
  postedAt: string;
  proposals: number;
}

export const mockJobs: Job[] = [
  {
    id: 'j1',
    title: 'Ingeniero Frontend Senior',
    company: 'TechCorp',
    logo: '🚀',
    location: 'San Francisco, CA',
    locationType: 'Remoto',
    type: 'Tiempo Completo',
    salary: '$120k - $150k',
    description: 'Buscamos un Ingeniero Frontend con experiencia para liderar el desarrollo de nuestro producto principal. Trabajarás con React, TypeScript y Tailwind CSS.',
    tags: ['React', 'TypeScript', 'Tailwind', 'Next.js'],
    postedAt: 'hace 2h'
  },
  {
    id: 'j2',
    title: 'Diseñador de Producto',
    company: 'CreativeSpace',
    logo: '✨',
    location: 'New York, NY',
    locationType: 'Híbrido',
    type: 'Tiempo Completo',
    salary: '$90k - $120k',
    description: 'Únete a nuestro equipo de diseño para crear interfaces y experiencias de usuario asombrosas para nuestros clientes. Se requiere un portafolio sólido.',
    tags: ['Figma', 'UI/UX', 'Prototyping'],
    postedAt: 'hace 5h'
  },
  {
    id: 'j3',
    title: 'Desarrollador Backend (Node.js)',
    company: 'DataFlow',
    logo: '⚡',
    location: 'Londres, Reino Unido',
    locationType: 'Remoto',
    type: 'Contrato',
    salary: '$80/hr',
    description: 'Buscamos un experto en Node.js para ayudar a escalar nuestra arquitectura de microservicios. Experiencia con AWS es un gran plus.',
    tags: ['Node.js', 'AWS', 'Microservicios', 'PostgreSQL'],
    postedAt: 'hace 1 día'
  },
  {
    id: 'j4',
    title: 'Ingeniero DevOps',
    company: 'CloudSys',
    logo: '☁️',
    location: 'Austin, TX',
    locationType: 'Presencial',
    type: 'Tiempo Completo',
    salary: '$130k - $160k',
    description: 'Administra nuestra infraestructura y pipelines de despliegue. Debes sentirte cómodo con Kubernetes, Terraform y herramientas CI/CD.',
    tags: ['Kubernetes', 'Terraform', 'CI/CD', 'AWS'],
    postedAt: 'hace 2 días'
  }
];

export const mockFreelanceProjects: FreelanceProject[] = [
  {
    id: 'f1',
    title: 'Rediseño de Sitio Web E-commerce',
    client: 'Urban Style Boutique',
    budget: '$5,000 - $8,000',
    duration: '1-2 meses',
    paymentType: 'Fijo',
    description: 'Necesitamos un rediseño completo de nuestra tienda Shopify para mejorar las tasas de conversión y modernizar el aspecto de la marca.',
    skills: ['Shopify', 'Diseño Web', 'CSS', 'Optimización de Conversión'],
    postedAt: 'hace 1h',
    proposals: 12
  },
  {
    id: 'f2',
    title: 'Desarrollo de App Móvil con React Native',
    client: 'FitLife Startup',
    budget: '$45 - $65/hr',
    duration: '3-6 meses',
    paymentType: 'Por hora',
    description: 'Buscamos un desarrollador de React Native para ayudar a construir nuestra nueva app de seguimiento de fitness desde cero.',
    skills: ['React Native', 'Desarrollo Móvil', 'Firebase', 'Redux'],
    postedAt: 'hace 4h',
    proposals: 8
  },
  {
    id: 'f3',
    title: 'Auditoría de Smart Contract',
    client: 'DeFi Protocol X',
    budget: '$10,000',
    duration: '2 semanas',
    paymentType: 'Fijo',
    description: 'Necesitamos un desarrollador de Solidity con experiencia para auditar nuestros nuevos contratos de staking antes del lanzamiento en la red principal.',
    skills: ['Solidity', 'Blockchain', 'Auditoría de Seguridad', 'Web3'],
    postedAt: 'hace 1 día',
    proposals: 25
  },
  {
    id: 'f4',
    title: 'Escritor de Contenido SEO para Blog Tech',
    client: 'SaaS Analytics Co',
    budget: '$30 - $50/hr',
    duration: 'Continuo',
    paymentType: 'Por hora',
    description: 'Buscamos un escritor técnico para producir 2-3 artículos de blog de alta calidad por semana sobre análisis de datos y tendencias SaaS.',
    skills: ['Escritura de Contenido', 'SEO', 'B2B', 'Escritura Técnica'],
    postedAt: 'hace 2 días',
    proposals: 42
  }
];

export const jobCategories = [
  { name: 'Ingeniería de Software', icon: '💻', count: '1,204', color: 'blue' },
  { name: 'Diseño y UX', icon: '🎨', count: '840', color: 'orange' },
  { name: 'Marketing', icon: '📈', count: '432', color: 'purple' },
  { name: 'Finanzas', icon: '💰', count: '210', color: 'yellow' },
  { name: 'Ventas', icon: '🤝', count: '315', color: 'green' },
  { name: 'Atención al Cliente', icon: '🎧', count: '523', color: 'red' },
  { name: 'Ciencia de Datos', icon: '📊', count: '280', color: 'indigo' },
  { name: 'Gestión de Producto', icon: '📋', count: '150', color: 'pink' }
];

export interface Bootcamp {
  id: string;
  title: string;
  provider: string;
  logo: string;
  duration: string;
  format: 'En línea' | 'Presencial' | 'Híbrido';
  price: string;
  description: string;
  tags: string[];
  rating: number;
}

export const mockBootcamps: Bootcamp[] = [
  {
    id: 'b1',
    title: 'Desarrollo Web Full-Stack',
    provider: 'CodeAcademy',
    logo: '👨‍💻',
    duration: '12 semanas',
    format: 'En línea',
    price: '$9,500',
    description: 'Aprende desarrollo web moderno desde cero. Domina React, Node.js y MongoDB con proyectos del mundo real y mentoría.',
    tags: ['React', 'Node.js', 'MongoDB', 'Apoyo Profesional'],
    rating: 4.8
  },
  {
    id: 'b2',
    title: 'Ciencia de Datos y Machine Learning',
    provider: 'DataCamp',
    logo: '📊',
    duration: '16 semanas',
    format: 'Híbrido',
    price: '$12,000',
    description: 'Sumérgete en Python, Machine Learning y Redes Neuronales. Incluye un proyecto final resolviendo problemas reales de la industria.',
    tags: ['Python', 'Machine Learning', 'IA', 'TensorFlow'],
    rating: 4.9
  },
  {
    id: 'b3',
    title: 'Inmersivo en Diseño UX/UI',
    provider: 'DesignSchool',
    logo: '🎨',
    duration: '10 semanas',
    format: 'En línea',
    price: '$8,000',
    description: 'Conviértete en un diseñador de producto. Aprende Figma, investigación de usuarios, wireframing y construye un portafolio asombroso para conseguir tu primer trabajo.',
    tags: ['Figma', 'Investigación de Usuarios', 'Prototyping'],
    rating: 4.7
  },
  {
    id: 'b4',
    title: 'Analista de Ciberseguridad',
    provider: 'SecureTech',
    logo: '🛡️',
    duration: '14 semanas',
    format: 'En línea',
    price: '$11,000',
    description: 'Prepárate para una carrera de alta demanda en ciberseguridad. Aprende hacking ético, defensa de redes y respuesta a incidentes.',
    tags: ['Seguridad de Redes', 'Hacking Ético', 'CompTIA'],
    rating: 4.6
  }
];
