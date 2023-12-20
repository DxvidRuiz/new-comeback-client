import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_ENDPOINTS } from "../../services/api/urlEndpoints/authEnpoint";
import { Api } from "../../services/api/urlEndpoints/axiosRequest";

export const updateUser = createAsyncThunk(
  "updateUser/call",
  async (data: any, { rejectWithValue }: any) => {
    try {
      const response = Api.patch(API_ENDPOINTS.USER, data);
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
      const response = Api.post(API_ENDPOINTS.REGISTER, data);
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
      const response = Api.post(API_ENDPOINTS.CHECK_USERNAME, data);
      return response; // Este será el payload de la acción fulfilled
    } catch (error) {


      console.log("error desde el thunk", error);

      return rejectWithValue(error.message); // Este será el payload de la acción rejected
    }
  }
);

export const checkEmail = createAsyncThunk(
  "checkEmail/call",
  async (data: any, { rejectWithValue }: any) => {
    try {
      const response = Api.post(API_ENDPOINTS.CHECK_EMAIL, data);
      return response; // Este será el payload de la acción fulfilled
    } catch (error) {
      return rejectWithValue(error.message); // Este será el payload de la acción rejected
    }
  }
);
