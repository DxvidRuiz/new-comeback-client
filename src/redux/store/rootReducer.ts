import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice"; // Importa tu reductor individual
import registerFormReducer from "../slices/registerFormSlice"; // Importa tu reductor individual
import userSlice from "../slices/userSlice"; // Importa tu reductor individual

const rootReducer = combineReducers({
  auth: authReducer,
  registerForm: registerFormReducer,
  user: userSlice,
});

export default rootReducer;
