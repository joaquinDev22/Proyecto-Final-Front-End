import api from './axiosConfig';

export interface UserProfile {
    nombre?: string;
    apellido?: string;
    email?: string;
    rol?: string;
    fechaNacimiento?: string;
    telefono?: string;
    pais?: string;
    descripcion?: string;
    ubicacion?: string;
    sitioWeb?: string;
    logo?: string;
}

export const profileService = {
  getProfile: async (): Promise<UserProfile> => {
    const response = await api.get('/api/v1/perfiles/me');
    return response.data;
  },
  
  updateProfile: async (data: Partial<UserProfile>): Promise<UserProfile> => {
    const response = await api.put('/api/v1/perfiles/me', data);
    return response.data;
  },
  
  uploadCV: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/api/v1/perfiles/me/cv', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
};
