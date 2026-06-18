import api from './axiosConfig';
import type { Bootcamp } from '../types/models';

const mapModalidad = (modalidad: string): 'En línea' | 'Presencial' | 'Híbrido' => {
    if (!modalidad) return 'En línea';
    const mod = modalidad.toUpperCase();
    if (mod === 'PRESENCIAL') return 'Presencial';
    if (mod === 'HIBRIDO') return 'Híbrido';
    return 'En línea';
};

const mapBootcamp = (dto: any): Bootcamp => ({
    id: dto.id?.toString() || Math.random().toString(),
    title: dto.titulo || 'Bootcamp Sin Título',
    provider: `Instructor ID: ${dto.instructor_id || 'N/A'}`,
    logo: dto.logo || '👨‍💻',
    duration: (dto.inicio && dto.fin) ? `${dto.inicio} al ${dto.fin}` : 'Varias semanas',
    format: mapModalidad(dto.modalidad),
    price: dto.precio ? `$${dto.precio}` : 'Consultar',
    description: dto.descripcion || 'Sin descripción',
    tags: dto.etiquetas || ['Programación'],
    rating: dto.rating || 5.0
});

export const bootcampService = {
  getAll: async (): Promise<Bootcamp[]> => {
    const response = await api.get('/api/v1/bootcamps');
    return response.data.map(mapBootcamp);
  },
  getById: async (id: number): Promise<Bootcamp> => {
    const response = await api.get(`/api/v1/bootcamps/${id}`);
    return mapBootcamp(response.data);
  },
  apply: async (bootcampId: number) => {
    const response = await api.post(`/api/v1/inscripciones/me/${bootcampId}`);
    return response.data;
  },
  getMyEnrollments: async () => {
    const response = await api.get('/api/v1/inscripciones/me');
    return response.data.map((inscripcion: any) => mapBootcamp(inscripcion.bootcamp));
  },
  create: async (data: any) => {
    const response = await api.post('/api/v1/bootcamps/me', data);
    return response.data;
  },
  getMyBootcampsCreated: async (): Promise<Bootcamp[]> => {
    const response = await api.get('/api/v1/bootcamps/me');
    return response.data.map(mapBootcamp);
  }
};
