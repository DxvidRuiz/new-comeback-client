import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_ENDPOINTS } from "../../services/api/urlEndpoints/authEnpoint";
import { Api } from "../../services/api/urlEndpoints/axiosRequest";

export const updateUser = createAsyncThunk(
  "updateUser/call",
  async (data: any, { rejectWithValue }: any) => {
    try {
      const response = await Api.patch(API_ENDPOINTS.USER, data);
      return response; // Este será el payload de la acción fulfilled
    } catch (error) {
      return rejectWithValue(error.message); // Este será el payload de la acción rejected
    }
  }
);

export const registerUser = createAsyncThunk(
  "registerUser/call",
  async (data: any, { rejectWithValue }: any) => {
    try {
      const response = await Api.post(API_ENDPOINTS.REGISTER, data);
      return response; // Este será el payload de la acción fulfilled
    } catch (error) {
      return rejectWithValue(error.message); // Este será el payload de la acción rejected
    }
  }
);

export const checkUsername = createAsyncThunk(
  "checkUsername/call",
  async (data: any, { rejectWithValue }: any) => {
    try {
      const response = await Api.post(API_ENDPOINTS.CHECK_USERNAME, data);
      return response; // Este será el payload de la acción fulfilled
    } catch (error) {


      console.log("error desde el thunk", error);

      return rejectWithValue(error.message); // Este será el payload de la acción rejected
    }
  }
);
export const checkEmail = createAsyncThunk(
  "checkUsername/call",
  async (data: any, { rejectWithValue }: any) => {
    try {
      const response = await Api.post(API_ENDPOINTS.CHECK_EMAIL, data);
      return response; // Este será el payload de la acción fulfilled
    } catch (error) {


      console.log("error desde el thunk", error);

      return rejectWithValue(error.message); // Este será el payload de la acción rejected
    }
  }
);

export const findUserByEmail = createAsyncThunk(
  "findUserByEmail/call",
  async (data: any, { rejectWithValue }: any) => {
    try {
      const response = await Api.post(API_ENDPOINTS.FIND_USER_BY_EMAIL, data);
      return response; // Este será el payload de la acción fulfilled
    } catch (error) {
      // Extraer el código de error si está disponible
      const errorCode = error.response ? error.response.status : undefined;
      // Retornar un objeto con el mensaje de error y el código de error
      return rejectWithValue({ message: error.message, errorCode });// Este será el payload de la acción rejected
    }
  }
);

export const uploadProfilePhoto = createAsyncThunk(
  "uploadProfilePhoto/call",
  async (data: any, { rejectWithValue }: any) => {

    try {

      const response = await Api.post(API_ENDPOINTS.UPLOAD_PROFILE_PHOTO, data);

      return response; // Este será el payload de la acción fulfilled
    } catch (error) {
      console.log(error, '-----');

      return rejectWithValue(error.message); // Este será el payload de la acción rejected
    }
  }
);
