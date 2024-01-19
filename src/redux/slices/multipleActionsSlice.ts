// features/authSlice.ts
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { updatePassword } from "../actions/auth.actions";


const initialState = {
    loading: false,
    error: null,
};

export const multipleActionsSlice = createSlice({
    name: "multipleActionsSlice",
    initialState,
    reducers: {
        // setPersonalData: (state, action) => {
        //   const { name, lastname, dateOfBirth, gender } = action.payload;
        //   state.data.name = name;
        //   state.data.lastname = lastname;
        //   state.data.dateOfBirth = dateOfBirth;
        //   state.data.gender = gender;
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

    },
},
);

// Exporta las acciones generadas automáticamente para los reducers
export const { } = multipleActionsSlice.actions;

export default multipleActionsSlice.reducer;
