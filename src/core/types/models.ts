export interface Job {
    id: string;
    title: string;
    company: string;
    logo: string;
    location: string;
    locationType: 'Remoto' | 'Presencial' | 'Híbrido';
    type: 'Tiempo Completo' | 'Medio Tiempo' | 'Contrato' | 'Freelance';
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

export interface JobCategory {
    name: string;
    count: number;
    icon: string;
    color: string;
}
