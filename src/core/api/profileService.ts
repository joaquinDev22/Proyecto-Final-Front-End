import api from './axiosConfig';

export interface Habilidad {
    habilidadId: number;
    nombre: string;
    nivel: number;
}

export interface Proyecto {
    id: number;
    nombre: string;
    descripcion: string;
    link?: string;
    imagen?: string; // base64 string
}

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
    tipoInstructor?: "PARTICULAR" | "EMPRESA";
    fotoPerfil?: string;
    bannerPerfil?: string;
    habilidades?: Habilidad[];
    proyectos?: Proyecto[];
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
  },

  uploadFoto: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/api/v1/perfiles/me/foto', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  uploadBanner: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/api/v1/perfiles/me/banner', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  getTodasHabilidades: async (): Promise<Habilidad[]> => {
    const response = await api.get('/api/v1/habilidades');
    return response.data;
  },

  addHabilidad: async (nombre: string, nivel: number): Promise<Habilidad> => {
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('nivel', nivel.toString());
    const response = await api.post('/api/v1/perfiles/me/habilidades', formData);
    return response.data;
  },

  removeHabilidad: async (habilidadId: number): Promise<string> => {
    const response = await api.delete(`/api/v1/perfiles/me/habilidades/${habilidadId}`);
    return response.data;
  },

  addProyecto: async (nombre: string, descripcion: string, link?: string, imagen?: File): Promise<Proyecto> => {
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    if (link) formData.append('link', link);
    if (imagen) formData.append('imagen', imagen);
    
    const response = await api.post('/api/v1/perfiles/me/proyectos', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  removeProyecto: async (proyectoId: number): Promise<string> => {
    const response = await api.delete(`/api/v1/perfiles/me/proyectos/${proyectoId}`);
    return response.data;
  }
};
