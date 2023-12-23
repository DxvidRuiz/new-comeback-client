import { getAsyncStorage } from "../../../localStorage/GetAsyncStorage";
import { AsyncStorageKeys } from "../../../localStorage/enum/asyncStorageKeys";
import axiosInstance from "./Axios";
import { API_ENDPOINTS } from "./authEnpoint";

const TIMEOUT = 10000; // 10 segundos de timeout

export class Api {
  static url = API_ENDPOINTS.URL_BASE

  static get = async (path: string) => {
    try {
      const response = await axiosInstance.get(`${path}`)
      return response.data;
    } catch (error) {
      let errorMessage = "An unexpected error occurred";

      if (error.response) {
        // El servidor respondió con un estado de error
        const serverError = error.response.data?.error || JSON.stringify(error.response.data);
        errorMessage = `Server Error: ${error.response.status} - ${serverError}`;
      } else if (error.request) {
        // La solicitud fue hecha pero no se recibió respuesta
        errorMessage = "No response received from server";
      } else if (error.code === 'ECONNABORTED') {
        // Manejar timeout específicamente
        errorMessage = `Request timeout after ${TIMEOUT / 1000} seconds`;
      } else {
        // Error en la configuración de la solicitud
        errorMessage = `Request Configuration Error: ${error.message}`;
      }

      // Puedes elegir lanzar un error o simplemente devolver un objeto de error
      throw new Error(errorMessage);
    }
  }
  post: () => {

  }

  delete: () => {

  }

  static patch = async (path: string, data: any) => {
    try {
      const token = await getAsyncStorage<string>(AsyncStorageKeys.AUTH_TOKEN);

      const response = await axiosInstance.patch(`${path}`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data;
    } catch (error) {
      let errorMessage = "An unexpected error occurred";

      if (error.response) {
        // El servidor respondió con un estado de error
        const serverError = error.response.data?.error || JSON.stringify(error.response.data);
        errorMessage = `Server Error: ${error.response.status} - ${serverError}`;
      } else if (error.request) {
        // La solicitud fue hecha pero no se recibió respuesta
        errorMessage = "No response received from server";
      } else if (error.code === 'ECONNABORTED') {
        // Manejar timeout específicamente
        errorMessage = `Request timeout after ${TIMEOUT / 1000} seconds`;
      } else {
        // Error en la configuración de la solicitud
        errorMessage = `Request Configuration Error: ${error.message}`;
      }

      // Puedes elegir lanzar un error o simplemente devolver un objeto de error
      throw new Error(errorMessage);
    }
  }

  static post = async (path: string, data: any) => {
    try {
      const token = await getAsyncStorage<string>(AsyncStorageKeys.AUTH_TOKEN);

      const response = await axiosInstance.post(`${path}`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data;
    } catch (error) {
      let errorMessage = "An unexpected error occurred";

      if (error.response) {
        // El servidor respondió con un estado de error
        const serverError = error.response.data?.error || JSON.stringify(error.response.data);
        errorMessage = `Server Error: ${error.response.status} - ${serverError}`;
      } else if (error.request) {
        // La solicitud fue hecha pero no se recibió respuesta
        errorMessage = "No response received from server";
      } else if (error.code === 'ECONNABORTED') {
        // Manejar timeout específicamente
        errorMessage = `Request timeout after ${TIMEOUT / 1000} seconds`;
      } else {
        // Error en la configuración de la solicitud
        errorMessage = `Request Configuration Error: ${error.message}`;
      }

      // Puedes elegir lanzar un error o simplemente devolver un objeto de error
      throw new Error(errorMessage);
    }
  }
}



// export const axiosRequest = async ({
//   method,
//   base_url,
//   endpoint,
//   data = null,
//   headers = {},
//   params,

// }: ApiRequest_I) => {

//   try {
//     const token  = await getAsyncStorage<string>(AsyncStorageKeys.AUTH_TOKEN );
//     if (token) {
//       headers.Authorization = `Bearer ${token}`;
//     }


//     const response = await axios({
//       method: method,
//       url: base_url + endpoint,
//       data: data,
//       headers: headers,
//       params: params,
//       timeout: TIMEOUT,
//     });

//     return response.data;
//   } catch (error) {
//     let errorMessage = "An unexpected error occurred";

//     if (error.response) {
//       // El servidor respondió con un estado de error
//       const serverError = error.response.data?.error || JSON.stringify(error.response.data);
//       errorMessage = `Server Error: ${error.response.status} - ${serverError}`;
//     } else if (error.request) {
//       // La solicitud fue hecha pero no se recibió respuesta
//       errorMessage = "No response received from server";
//     } else if (error.code === 'ECONNABORTED') {
//       // Manejar timeout específicamente
//       errorMessage = `Request timeout after ${TIMEOUT / 1000} seconds`;
//     } else {
//       // Error en la configuración de la solicitud
//       errorMessage = `Request Configuration Error: ${error.message}`;
//     }

//     // Puedes elegir lanzar un error o simplemente devolver un objeto de error
//     throw new Error(errorMessage);
//   }
// };

// export default axiosRequest;
