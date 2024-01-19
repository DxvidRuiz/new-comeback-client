import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_ENDPOINTS } from "../../services/api/urlEndpoints/authEnpoint";
import { Api } from "../../services/api/urlEndpoints/axiosRequest";

export const loginUser = createAsyncThunk(
  "loginUser/call",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = Api.post(API_ENDPOINTS.USER_LOGIN, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const updatePassword = createAsyncThunk(
  "updatePassword/call",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = Api.post(API_ENDPOINTS.UPDATE_PASSWORD, data);


      return response;
    } catch (error) {


      return rejectWithValue(error.message);
    }
  }
);
