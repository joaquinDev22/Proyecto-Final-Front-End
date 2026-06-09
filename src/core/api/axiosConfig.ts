import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para peticiones: adjunta el JWT automáticamente

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para respuestas: detecta cuando el token expiró (401)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Manejar token expirado o no autorizado
      localStorage.removeItem('token');
      // Opcional: window.location.href = '/login'; para obligar a loguearse
    }
    return Promise.reject(error);
  }
);

export default api;