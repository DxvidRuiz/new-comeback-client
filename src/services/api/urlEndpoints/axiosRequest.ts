import { getAsyncStorage } from "../../../localStorage/GetAsyncStorage";
import { AsyncStorageKeys } from "../../../localStorage/enum/asyncStorageKeys";
import { EncryptKeys } from "../../security/EncryptKeys";
import axiosInstance from "./Axios";
import { API_ENDPOINTS } from "./authEnpoint";

const TIMEOUT = 10000; // 10 segundos de timeout

export class Api {
  static url = API_ENDPOINTS.URL_BASE

  static get = async (path: string) => {
    try {
      const token = await getAsyncStorage<string>(AsyncStorageKeys.AUTH_TOKEN, "string", EncryptKeys.AUTH_ENCRYPT_KEY);

      const response = await axiosInstance.get(
        `${path}`,
        {
          headers: {
            Authorization: `Bearer ${token ? token : ""}`,
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
  post: () => {

  }

  delete: () => {

  }

  static patch = async (path: string, data: any) => {
    try {
      const token = await getAsyncStorage<string>(AsyncStorageKeys.AUTH_TOKEN, "string", EncryptKeys.AUTH_ENCRYPT_KEY);

      const response = await axiosInstance.patch(`${path}`, data, {
        headers: {
          Authorization: `Bearer ${token ? token : ""}`,
        }
      })

      console.log(response.status);

      return response.data;
    } catch (error) {
      let errorMessage = "An unexpected error occurred";
      let errorCode: string | number | undefined = undefined;

      if (error.response) {
        // El servidor respondió con un estado de error
        // const serverError = error.response.data?.error || JSON.stringify(error.response.data);
        // errorMessage = `errorStatus: ${error.response.status} - ${serverError}`;
        errorMessage = error.response;
        // errorCode = error.response.message.data.statusCode
        // errorCode = error.response.status;
      } else if (error.request) {
        // La solicitud fue hecha pero no se recibió respuesta
        errorMessage = "No response received from the server";
      } else if (error.code === 'ECONNABORTED') {
        // Manejar timeout específicamente
        errorMessage = `Request timeout after ${TIMEOUT / 1000} seconds`;
      } else if (error.message.includes('Network Error')) {
        // Error de red (por ejemplo, sin conexión a Internet)
        errorMessage = 'Network Error: Please check your internet connection';
      } else {
        // Otros errores en la configuración de la solicitud
        errorMessage = `Request Configuration Error: ${error.message}`;
      }

      // Retornar un objeto que incluya el mensaje de error y el código de error
      throw { message: errorMessage, errorCode };
    }
  }




  static post = async (path: string, data: any) => {


    // const { loading, user: ot } = useSelector((state: RootState) => state.user)
    try {


      const token = await getAsyncStorage<string>(AsyncStorageKeys.AUTH_TOKEN, "string", EncryptKeys.AUTH_ENCRYPT_KEY);

      const response = await axiosInstance.post(`${path}`, data, {
        headers: {
          Authorization: `Bearer ${token ? token : ""}`,
          // 'Content-Type': 'multipart/form-data'
        }
      });
      // Retornar un objeto que incluya el mensaje de éxito y el código de estado
      // return { message: 'Request successful', statusCode: response.status, data: response.data };
      return response
    } catch (error) {
      let errorMessage = "An unexpected error occurred";
      let errorCode: string | number | undefined = undefined;

      if (error.response) {
        // El servidor respondió con un estado de error
        // const serverError = error.response.data?.error || JSON.stringify(error.response.data);
        // errorMessage = `errorStatus: ${error.response.status} - ${serverError}`;
        errorMessage = error.response;
        // errorCode = error.response.message.data.statusCode
        // errorCode = error.response.status;
      } else if (error.request) {
        // La solicitud fue hecha pero no se recibió respuesta
        errorMessage = "No response received from the server";
      } else if (error.code === 'ECONNABORTED') {
        // Manejar timeout específicamente
        errorMessage = `Request timeout after ${TIMEOUT / 1000} seconds`;
      } else if (error.message.includes('Network Error')) {
        // Error de red (por ejemplo, sin conexión a Internet)
        errorMessage = 'Network Error: Please check your internet connection';
      } else {
        // Otros errores en la configuración de la solicitud
        errorMessage = `Request Configuration Error: ${error.message}`;
      }

      // Retornar un objeto que incluya el mensaje de error y el código de error
      throw { message: errorMessage, errorCode };
    }
  }




  static delete = async (path: string, id: string) => {
    try {
      const token = await getAsyncStorage<string>(AsyncStorageKeys.AUTH_TOKEN, "string", EncryptKeys.AUTH_ENCRYPT_KEY);

      // Asume que `path` ya incluye el prefijo necesario, como `/usuarios/`
      // y simplemente añade el `id` al final para especificar el recurso a borrar.
      const fullPath = `${path}${id}`;

      const response = await axiosInstance.delete(fullPath, {
        headers: {
          Authorization: `Bearer ${token ? token : ""}`,
        }
      });

      // Retornar los datos de la respuesta directamente
      return response.data;
    } catch (error) {
      let errorMessage = "An unexpected error occurred";
      let errorCode: string | number | undefined = undefined;

      if (error.response) {
        // El servidor respondió con un estado de error
        errorMessage = error.response.data?.error || JSON.stringify(error.response.data);
        errorMessage = `Server Error: ${error.response.status} - ${errorMessage}`;
        errorCode = error.response.status;
      } else if (error.request) {
        // La solicitud fue hecha pero no se recibió respuesta
        errorMessage = "No response received from the server";
      } else if (error.code === 'ECONNABORTED') {
        // Manejar timeout específicamente
        errorMessage = `Request timeout after ${TIMEOUT / 1000} seconds`;
      } else if (error.message.includes('Network Error')) {
        // Error de red (por ejemplo, sin conexión a Internet)
        errorMessage = 'Network Error: Please check your internet connection';
      } else {
        // Otros errores en la configuración de la solicitud
        errorMessage = `Request Configuration Error: ${error.message}`;
      }

      // Retornar un objeto que incluya el mensaje de error y el código de error
      throw { message: errorMessage, errorCode };
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
