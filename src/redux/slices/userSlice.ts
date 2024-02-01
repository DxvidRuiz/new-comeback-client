// features/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserData_I from "../../types/userDataInterface";
import { checkEmail, registerUser, updateUser, uploadProfilePhoto } from "../actions/user.actions";
import { setAccessToken } from "./authSlice";

interface user_i {
  user: UserData_I;
  token: string,
  loading: boolean;
  error: string | null;
}

const initialState: user_i = {
  user: undefined,
  token: undefined,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    refreshUser: (state, { payload }: PayloadAction<any>) => {
      try {
        state.user = payload?.data?.user;


        console.log("refresh user  guardado de token ", payload.data.token);

      } catch (error) {
        console.log(error);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkEmail.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(checkEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      // ---------------------------------------------------------
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.error = null;

        setAccessToken(action.payload.token)

        // saveAsyncStorage(AsyncStorageKeys.AUTH_TOKEN, action.payload.token);

      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      //_----------------------------------------------------------------
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      //----------Upload profile photo 
      .addCase(uploadProfilePhoto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadProfilePhoto.fulfilled, (state, action: any) => {
        state.loading = false;
        state.user.profile.profilePhotoRoute = action.payload.data.profilePhotoRoute;
        state.error = null;
      })
      .addCase(uploadProfilePhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

// Exporta las acciones generadas automáticamente para los reducers
export const { refreshUser } = userSlice.actions;

export default userSlice.reducer;
