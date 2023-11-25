import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosRequest from "../../services/api/urlEndpoints/axiosRequest";
import { ApiRequest_I } from "../../types/apiTypes";

export const apiCallThunk = createAsyncThunk(
  'api/call',
  async (arg :ApiRequest_I , { rejectWithValue }) => {
    try {
      const response = await axiosRequest(arg);
      return response; // Este será el payload de la acción fulfilled
    } catch (error) {
      return rejectWithValue(error.message); // Este será el payload de la acción rejected
    }
  }
);
