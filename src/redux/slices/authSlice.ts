// features/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiCallThunk } from "../thunks/apiCallThunk";

interface MyFeatureState {
  isAuthenticated: boolean;
  token: string | null;  // Nuevo campo para almacenar el accessToken
  data: any[];
  loading: boolean;
  error: string | null;
}

const initialState: MyFeatureState = {
  isAuthenticated: false,
  token: null,  // Inicialmente no hay accessToken
  data: [],
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    clearData: (state) => {
      state.data = [];
    },
    clearError: (state) => {
      state.error = null;
    },
    setAuthentication: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(apiCallThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(apiCallThunk.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(apiCallThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

// Exporta las acciones generadas automáticamente para los reducers
export const { clearData, clearError, setAuthentication, setAccessToken } = authSlice.actions;

export default authSlice.reducer;
