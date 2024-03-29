// features/authSlice.ts
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { deletePost, getProfilePosts, newPost } from "../actions/profile.actions";

// Initial state for the slice
const initialState = {
    loading: false,
    error: null,
    profilePosts: [],
    loadingNewPost: false,
    loadingDeletePost: false,
    newPost: {},
    otpCodeCountdown: false,
    otpCodetimeRemaining: 0,
};

// Create a slice of the Redux store with actions and reducer
export const profileSlice = createSlice({
    name: "profileSlice",
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
            .addCase(getProfilePosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProfilePosts.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = null;
                state.profilePosts = action.payload
            })
            .addCase(getProfilePosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Something went wrong";
            });
        builder
            .addCase(newPost.pending, (state) => {
                state.loadingNewPost = true;
                state.error = null;
            })
            .addCase(newPost.fulfilled, (state, action: PayloadAction<any>) => {
                state.loadingNewPost = false;
                state.profilePosts.unshift(action.payload); // Añade al principio

                state.error = null;
                // state.profilePosts = action.payload
            })
            .addCase(newPost.rejected, (state, action) => {
                state.loadingNewPost = false;
                state.error = action.error.message || "Something went wrong";
            });
        builder
            .addCase(deletePost.pending, (state) => {
                state.loadingDeletePost = true;
                state.error = null;
            })
            .addCase(deletePost.fulfilled, (state, action: PayloadAction<any>) => {
                state.loadingDeletePost = false;
                state.error = null;

                console.log("ddddddddd", action.payload.id);



                if (action?.payload) {
                    state.profilePosts = state.profilePosts.filter(post => post._id !== action.payload.id);
                } else {
                    // Manejar el caso en el que no hay payload definido
                    console.error("Payload undefined in deletePost.fulfilled");
                }
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.loadingDeletePost = false;
                state.error = action.error.message || "Something went wrong";
            });


    },
});

// Export automatically generated actions for reducers
export const { otpCodeCountdown, setOTPTimer } = profileSlice.actions;

// Export the reducer
export default profileSlice.reducer;
