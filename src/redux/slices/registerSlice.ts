// features/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiCallThunk } from "../thunks/apiCallThunk";

interface user_i {
  user: {
    id: string;
    email: string;
  };
  loading: boolean;
  error: string | null;
  token: string | null; // Nueva propiedad para el token
}

const initialState: user_i = {
  user: {
    id: undefined,
    email: undefined,
  },
  loading: false,
  error: null,
  token: null, // Nueva propiedad para el token
};

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(apiCallThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(apiCallThunk.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(apiCallThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

// Exporta las acciones generadas automáticamente para los reducers
// export const { setPersonalData, setUserData } = registerSlice.actions;

export default registerSlice.reducer;
