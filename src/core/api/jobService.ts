import api from './axiosConfig';

export const jobService = {
  getAll: async () => {
    const response = await api.get('/api/vacantes');
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/api/vacantes/${id}`);
    return response.data;
  },
  apply: async (id: number, data: any) => {
    const response = await api.post(`/api/vacantes/${id}/postulaciones`, data);
    return response.data;
  }
};
