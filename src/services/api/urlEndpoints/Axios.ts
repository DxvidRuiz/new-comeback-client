import axios from 'axios';
import { API_ENDPOINTS } from './authEnpoint';

// Crear una instancia de Axios con configuración base
const axiosInstance = axios.create({
  baseURL: API_ENDPOINTS.URL_BASE,  // URL base para todas las solicitudes
  timeout: 5000,  // Tiempo máximo de espera para las solicitudes en milisegundos
  headers: {
    'Content-Type': 'application/json',  // Tipo de contenido predeterminado
    'Authorization': 'Bearer your_access_token',  // Ejemplo de encabezado de autorización
  },
});

export default axiosInstance;
