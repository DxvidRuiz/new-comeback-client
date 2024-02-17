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



