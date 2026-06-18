import api from './axiosConfig';
import type { FreelanceProject } from '../types/models';

const mapPaymentType = (type: string): 'Fijo' | 'Por hora' => {
  if (!type) return 'Fijo';
  const t = type.toUpperCase();
  if (t === 'POR_HORA' || t === 'POR HORA' || t.includes('HORA')) return 'Por hora';
  return 'Fijo';
};

const mapFreelanceProject = (dto: any): FreelanceProject => ({
  id: dto.proyectoId?.toString() || Math.random().toString(),
  title: dto.area || 'Proyecto sin área',
  client: dto.nombreCliente || `Cliente #${dto.clienteId || 'N/A'}`,
  budget: dto.presupuestoMin && dto.presupuestoMax
    ? `$${dto.presupuestoMin} - $${dto.presupuestoMax}`
    : (dto.presupuestoMin ? `Desde $${dto.presupuestoMin}` : (dto.presupuestoMax ? `Hasta $${dto.presupuestoMax}` : 'A convenir')),
  duration: dto.duracion || 'Duración no especificada',
  paymentType: mapPaymentType(dto.tipoPago),
  description: dto.descripcion || 'Sin descripción.',
  skills: dto.habilidades || [],
  postedAt: dto.fechaPublicacion ? `Publicado el ${dto.fechaPublicacion}` : 'Recientemente',
  proposals: 0 // Default to 0 since the DTO doesn't have it
});

export const freelanceService = {
  getAll: async (): Promise<FreelanceProject[]> => {
    const response = await api.get('/api/v1/freelance/proyectos');
    return response.data.map(mapFreelanceProject);
  },
  getById: async (id: number): Promise<FreelanceProject> => {
    const response = await api.get(`/api/v1/freelance/proyectos/${id}`);
    return mapFreelanceProject(response.data);
  },
  apply: async (proyectoId: number, data: any) => {
    const response = await api.post(`/api/v1/freelance/proyectos/${proyectoId}/postulaciones/me`, data);
    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post('/api/v1/freelance/proyectos/me', data);
    return response.data;
  },
  
  getMyPublishedProjects: async () => {
    const response = await api.get('/api/v1/freelance/proyectos/me/publicados');
    return response.data;
  },

  getMyAssignedProjects: async () => {
    const response = await api.get('/api/v1/freelance/proyectos/me/asignados');
    return response.data;
  }
};
