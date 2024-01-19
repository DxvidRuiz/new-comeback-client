// features/authSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface user_i {
  data: {
    id: string;
    username: string;
    email: string;
    name: string;
    lastname: string;
    gender: string;
    dateOfBirth: string;
    profile: any
  };
}

const initialState: user_i = {
  data: {
    id: undefined,
    username: undefined,
    email: undefined,
    name: undefined,
    lastname: undefined,
    dateOfBirth: undefined,
    gender: undefined,
    profile: undefined
  },
};

export const registerFormSlice = createSlice({
  name: "registerForm ",
  initialState,
  reducers: {
    setPersonalData: (state, action) => {
      const { name, lastname, dateOfBirth, gender } = action.payload;
      state.data.name = name;
      state.data.lastname = lastname;
      state.data.dateOfBirth = dateOfBirth;
      state.data.gender = gender;
    },
    setUserData: (state, action) => {
      const { email, username } = action.payload;
      state.data.email = email;
      state.data.username = username;
      console.log(state);
    },
  },
});

// Exporta las acciones generadas automáticamente para los reducers
export const { setPersonalData, setUserData } = registerFormSlice.actions;

export default registerFormSlice.reducer;
