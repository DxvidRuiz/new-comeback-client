import { createAsyncThunk } from "@reduxjs/toolkit";
import { reject } from "lodash";
import { API_ENDPOINTS } from "../../services/api/urlEndpoints/authEnpoint";
import { Api } from "../../services/api/urlEndpoints/axiosRequest";

export const getProfilePosts = createAsyncThunk(
  "getProfilePost/call",
  async () => {
    try {
      const response = await Api.get(API_ENDPOINTS.GET_PROFILE_POSTS);
      return response; // Este será el payload de la acción fulfilled
    } catch (error) {
      const errorCode = error.response ? error.response.status : undefined;
      // Retornar un objeto con el mensaje de error y el código de error
      return reject({ message: error.message, errorCode });
    }
  }
);

export const newPost = createAsyncThunk(
  "newPost/call",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await Api.post(API_ENDPOINTS.NEW_POST, data);
      return response.data; // Asegúrate de devolver la parte relevante de la respuesta
    } catch (error) {
      let errorMessage = "Unknown error occurred";
      let errorCode = 500; // Un código de error predeterminado si no se puede obtener de la respuesta

      if (error.response) {
        // Si la respuesta del error está disponible, usa esos detalles
        errorMessage = error.response.data?.message || error.message;
        errorCode = error.response.status;
      } else if (error.request) {
        // El error fue hecho pero no hubo respuesta
        errorMessage = "No response received";
      } else {
        // Algo sucedió en la configuración de la solicitud que desencadenó un Error
        errorMessage = error.message;
      }

      // Utiliza rejectWithValue para rechazar explícitamente con un valor específico
      return rejectWithValue({ message: errorMessage, errorCode });
    }
  }
);
export const deletePost = createAsyncThunk(
  "deletePost/call",
  async (id: any, { rejectWithValue }) => {
    try {
      const response = await Api.delete(API_ENDPOINTS.DELETE_POST, id);
      return response; // Asegúrate de devolver la parte relevante de la respuesta
    } catch (error) {
      let errorMessage = "Unknown error occurred";
      let errorCode = 500; // Un código de error predeterminado si no se puede obtener de la respuesta

      if (error.response) {
        // Si la respuesta del error está disponible, usa esos detalles
        errorMessage = error.response.data?.message || error.message;
        errorCode = error.response.status;
      } else if (error.request) {
        // El error fue hecho pero no hubo respuesta
        errorMessage = "No response received";
      } else {
        // Algo sucedió en la configuración de la solicitud que desencadenó un Error
        errorMessage = error.message;
      }

      // Utiliza rejectWithValue para rechazar explícitamente con un valor específico
      return rejectWithValue({ message: errorMessage, errorCode });
    }
  }
);

