// // features/authSlice.ts
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { saveAsyncStorage } from "../../localStorage/SaveAsyncStorage";
// import { AsyncStorageKeys } from "../../localStorage/enum/asyncStorageKeys";
// import { loginUser } from "../actions/auth.actions";

// interface user_i {
//   user: { };
//   loading: boolean;
//   error: string | null;
//   token: string | null; // Nueva propiedad para el token
// }

// const initialState: user_i = {
//   user: {},
//   loading: false,
//   error: null,
//   token: null, // Nueva propiedad para el token
// };

// export const registerSlice = createSlice({
//   name: "register",
//   initialState,
//   reducers: {

//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
//         state.loading = false;
//         state.user = action.payload;
//         state.token = action.payload.token;
//         state.error = null;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || "Something went wrong";
//       });





//   },
// });

// // Exporta las acciones generadas automáticamente para los reducers
// export const { } = registerSlice.actions;

// export default registerSlice.reducer;
