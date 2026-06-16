import api from './axiosConfig';

export const bootcampService = {
  getAll: async () => {
    const response = await api.get('/api/v1/bootcamps');
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/api/v1/bootcamps/${id}`);
    return response.data;
  },
  apply: async (bootcampId: number, employeeId: number) => {
    const response = await api.post(`/api/v1/inscripciones/${bootcampId}/empleados/${employeeId}`);
    return response.data;
  }
};
