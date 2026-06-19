import api from './axiosConfig';
import type { Job } from '../types/models';

const mapLocationType = (type: string): 'Remoto' | 'Presencial' | 'Híbrido' => {
    if (!type) return 'Remoto';
    const t = type.toUpperCase();
    if (t === 'PRESENCIAL') return 'Presencial';
    if (t === 'HIBRIDO' || t === 'HIBRIDA') return 'Híbrido';
    return 'Remoto';
};

const mapJobType = (type: string): 'Tiempo Completo' | 'Medio Tiempo' | 'Contrato' | 'Freelance' => {
    if (!type) return 'Tiempo Completo';
    const t = type.toUpperCase();
    if (t === 'MEDIO_TIEMPO' || t === 'PART_TIME') return 'Medio Tiempo';
    if (t === 'CONTRATO' || t === 'CONTRACT') return 'Contrato';
    if (t === 'FREELANCE') return 'Freelance';
    return 'Tiempo Completo';
};

const mapJob = (dto: any): Job => ({
    id: dto.vacanteId?.toString() || Math.random().toString(),
    title: dto.puesto || 'Puesto Sin Título',
    company: dto.nombreEmpresa || `Empresa #${dto.empresaId || 'N/A'}`,
    logo: dto.logo || '🏢',
    location: dto.ubicacion || 'Ubicación no especificada',
    locationType: mapLocationType(dto.tipoUbicacion),
    type: mapJobType(dto.tipoVacante),
    salary: dto.salario ? `$${dto.salario}` : 'Salario a convenir',
    description: dto.descripcion || 'Sin descripción detallada.',
    tags: dto.etiquetas || ['IT'],
    postedAt: dto.publicacion ? `Publicado el ${dto.publicacion}` : 'Recientemente'
});

export const jobService = {
  getAll: async (): Promise<Job[]> => {
    const response = await api.get('/api/v1/vacantes');
    return response.data.map(mapJob);
  },
  getById: async (id: number): Promise<Job> => {
    const response = await api.get(`/api/v1/vacantes/${id}`);
    return mapJob(response.data);
  },
  getMyVacancies: async (): Promise<Job[]> => {
    const response = await api.get('/api/v1/vacantes/me');
    return response.data.map(mapJob);
  },
  apply: async (id: number, data: any) => {
    const response = await api.post(`/api/v1/vacantes/${id}/postulaciones/me`, data);
    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post('/api/v1/vacantes/me', data);
    return response.data;
  }
};
