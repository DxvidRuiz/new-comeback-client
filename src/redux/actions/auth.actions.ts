import { createAsyncThunk } from "@reduxjs/toolkit";
import { reject } from "lodash";
import { API_ENDPOINTS } from "../../services/api/urlEndpoints/authEnpoint";
import { Api } from "../../services/api/urlEndpoints/axiosRequest";

export const loginUser = createAsyncThunk(
  "loginUser/call",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = (await Api.post(API_ENDPOINTS.USER_LOGIN, data));

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const updatePassword = createAsyncThunk(
  "updatePassword/call",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await Api.post(API_ENDPOINTS.UPDATE_PASSWORD, data);

      return response;
    } catch (error) {
      // Extraer el código de error si está disponible
      const errorCode = error.response ? error.response.status : undefined;

      // Retornar un objeto con el mensaje de error y el código de error
      return rejectWithValue({ message: error.message, errorCode });
    }
  }
);

export const updatePasswordAfter2FA = createAsyncThunk(
  "updatePasswordAfter2FA/call",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await Api.patch(API_ENDPOINTS.UPDATE_PASSWORD_AFTER_2FA, data);

      return response;
    } catch (error) {
      // Extraer el código de error si está disponible
      const errorCode = error.response ? error.response.status : undefined;

      // Retornar un objeto con el mensaje de error y el código de error
      return rejectWithValue({ message: error.message, errorCode });
    }
  }
);

export const restorePasswordAfter2FA = createAsyncThunk(
  "restorePasswordAfter2FA/call",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await Api.patch(API_ENDPOINTS.RESTORE_PASSWORD_AFTER_2FA, data);

      return response;
    } catch (error) {
      // Extraer el código de error si está disponible
      const errorCode = error.response ? error.response.status : undefined;

      // Retornar un objeto con el mensaje de error y el código de error
      return rejectWithValue(error);
    }
  }
);




export const checkOTPcode = createAsyncThunk(
  "checkOTPcode/call",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await Api.post(API_ENDPOINTS.UPDATE_PASSWORD, data);
      return response;
    } catch (error) {
      // Extraer el código de error si está disponible
      const errorCode = error.response ? error.response.status : undefined;
      // Retornar un objeto con el mensaje de error y el código de error
      return rejectWithValue({ message: error.message, errorCode });
    }
  }
);
export const generatePasswordUpdateOTPcode = createAsyncThunk(
  "generateOTPcode/call",
  async () => {
    try {
      const response = await Api.get(API_ENDPOINTS.GENERATE_PASSWORD_UPDATE_OTP);
      return response;
    } catch (error) {
      // Extraer el código de error si está disponible
      const errorCode = error.response ? error.response.status : undefined;
      // Retornar un objeto con el mensaje de error y el código de error
      return reject({ message: error.message, errorCode });
    }
  }
);
export const passwordUpdateCodeValidation = createAsyncThunk(
  "passwordUpdateCodeValidation/call",
  async (data: {}, { rejectWithValue }) => {
    try {
      const response = await Api.post(API_ENDPOINTS.PASSWORD_UPDATE_CODE_VALIDATION, data);
      return response;
    } catch (error) {
      // Extraer el código de error si está disponible
      const errorCode = error.response ? error.response.status : undefined;
      // Retornar un objeto con el mensaje de error y el código de error
      return rejectWithValue({ message: error.message, errorCode });
    }
  }
);
export const passwordRestoreCodeValidation = createAsyncThunk(
  "passwordRestoreCodeValidation/call",
  async (data: {}, { rejectWithValue }) => {
    try {
      const response = await Api.post(API_ENDPOINTS.PASSWORD_UPDATE_CODE_VALIDATION, data);
      return response;
    } catch (error) {
      // Extraer el código de error si está disponible
      const errorCode = error.response ? error.response.status : undefined;
      // Retornar un objeto con el mensaje de error y el código de error
      return rejectWithValue({ message: error.message, errorCode });
    }
  }
);
