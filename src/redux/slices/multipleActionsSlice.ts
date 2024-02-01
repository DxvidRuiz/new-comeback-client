// features/authSlice.ts
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { checkOTPcode, generatePasswordUpdateOTPcode, updatePassword } from "../actions/auth.actions";


const initialState = {
    loading: false,
    error: null,
    otpCodeCountdown: false,
    otpCodetimeRemaining: 0,

};

export const multipleActionsSlice = createSlice({
    name: "multipleActionsSlice",
    initialState,
    reducers: {
        otpCodeCountdown: (state, action) => {
            state.otpCodeCountdown = action.payload; // Así actualizas el estado según el payload de la acción
        },
        setOTPTimer: (state, action) => {
            state.otpCodetimeRemaining = action.payload;
        },
    },
    extraReducers: (builder) => {

        builder
            .addCase(updatePassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePassword.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Something went wrong";
            })
            .addCase(checkOTPcode.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(checkOTPcode.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(checkOTPcode.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Something went wrong";
            })
            .addCase(generatePasswordUpdateOTPcode.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(generatePasswordUpdateOTPcode.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(generatePasswordUpdateOTPcode.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Something went wrong";
            })

    },
},
);

// Exporta las acciones generadas automáticamente para los reducers
export const { otpCodeCountdown, setOTPTimer } = multipleActionsSlice.actions;

export default multipleActionsSlice.reducer;
