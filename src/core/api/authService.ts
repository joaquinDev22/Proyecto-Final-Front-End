import api from './axiosConfig';

export const authService = {
  /**
   * Envía las credenciales al backend para iniciar sesión.
   * Guarda el token en localStorage si la petición es exitosa.
   */
  login: async (credentials: any) => {
    const response = await api.post('/auth/loggin', credentials);
    
    // Si tu backend retorna { token: "eyJhb..." }
    if (response.data && response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },
  
  /**
   * Registra un nuevo perfil.
   */
  register: async (userData: any) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  /**
   * Cierra sesión eliminando el token del almacenamiento local.
   */
  logout: () => {
    localStorage.removeItem('token');
  },
  
  /**
   * Verifica si hay un token guardado (no comprueba vigencia, solo existencia local).
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};
