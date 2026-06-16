import api from './axiosConfig';

export const freelanceService = {
  getAll: async () => {
    const response = await api.get('/api/freelance/proyectos');
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/api/freelance/proyectos/${id}`);
    return response.data;
  },
  apply: async (proyectoId: number, data: any) => {
    const response = await api.post(`/api/freelance/proyectos/${proyectoId}/postulaciones`, data);
    return response.data;
  }
};
