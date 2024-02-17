// features/authSlice.ts
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { checkOTPcode, generatePasswordUpdateOTPcode, passwordRestoreCodeValidation, passwordUpdateCodeValidation, restorePasswordAfter2FA, updatePassword, updatePasswordAfter2FA } from "../actions/auth.actions";
import { findUserByEmail } from "../actions/user.actions";

// Initial state for the slice
const initialState = {
    loading: false,
    error: null,
    otpCodeCountdown: false,
    otpCodetimeRemaining: 0,
};

// Create a slice of the Redux store with actions and reducer
export const multipleActionsSlice = createSlice({
    name: "multipleActionsSlice",
    initialState,
    reducers: {
        // Action to update the OTP code countdown status
        otpCodeCountdown: (state, action) => {
            state.otpCodeCountdown = action.payload;
        },
        // Action to set the remaining time for the OTP code
        setOTPTimer: (state, action) => {
            state.otpCodetimeRemaining = action.payload;
        },
    },
    extraReducers: (builder) => {
        // Reducer logic for handling various async actions using extraReducers

        // Update Password Action
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
            });

        // Check OTP Code Action
        builder
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
            });

        // Generate Password Update OTP Code Action
        builder
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
            });

        // Update Password After 2FA Action
        builder
            .addCase(updatePasswordAfter2FA.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePasswordAfter2FA.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(updatePasswordAfter2FA.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Something went wrong";
            });
        // Password restore

        builder
            .addCase(restorePasswordAfter2FA.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(restorePasswordAfter2FA.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(restorePasswordAfter2FA.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Something went wrong";
            });
        // Password update code validation
        builder
            .addCase(passwordUpdateCodeValidation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(passwordUpdateCodeValidation.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(passwordUpdateCodeValidation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Something went wrong";
            });
        // Find user by email
        builder
            .addCase(findUserByEmail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(findUserByEmail.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(findUserByEmail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Something went wrong";
            });
        builder
            .addCase(passwordRestoreCodeValidation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(passwordRestoreCodeValidation.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(passwordRestoreCodeValidation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Something went wrong";
            });
    },
});

// Export automatically generated actions for reducers
export const { otpCodeCountdown, setOTPTimer } = multipleActionsSlice.actions;

// Export the reducer
export default multipleActionsSlice.reducer;
