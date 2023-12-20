import { Api } from "../../services/api/urlEndpoints/axiosRequest";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_ENDPOINTS } from "../../services/api/urlEndpoints/authEnpoint";

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
