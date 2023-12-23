// features/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AsyncStorageKeys } from "../../localStorage/enum/asyncStorageKeys";
import { saveAsyncStorage } from "../../localStorage/SaveAsyncStorage";
import { loginUser } from "../actions/auth.actions";


interface MyFeatureState {
  isAuthenticated: boolean;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: MyFeatureState = {
  isAuthenticated: false,
  token: null,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    clearData: (state) => {

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
    logout(state) {
      state.isAuthenticated = false;
      saveAsyncStorage(AsyncStorageKeys.AUTH_TOKEN, undefined);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.error = null;
        saveAsyncStorage(AsyncStorageKeys.AUTH_TOKEN, action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

// Exporta las acciones generadas automáticamente para los reducers
export const { clearData, clearError, setAuthentication, setAccessToken, logout } =
  authSlice.actions;

export default authSlice.reducer;
