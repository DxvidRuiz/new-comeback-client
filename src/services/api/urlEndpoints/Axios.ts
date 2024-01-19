import axios from 'axios';
import { API_ENDPOINTS } from './authEnpoint';

// Crear una instancia de Axios con configuración base
const axiosInstance = axios.create({
  baseURL: API_ENDPOINTS.URL_BASE,
  timeout: 5000,
});

// Agregar un interceptor para modificar la configuración de la solicitud antes de enviarla
axiosInstance.interceptors.request.use((config) => {
  // Verificar si la solicitud tiene un FormData, y si es así, ajustar los encabezados
  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data';
  } else {
    config.headers['Content-Type'] = 'application/json';
  }

  return config;
});

export default axiosInstance;
