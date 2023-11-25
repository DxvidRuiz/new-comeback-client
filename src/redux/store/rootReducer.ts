import { combineReducers } from "redux";
import authReducer from "../slices/authSlice"; // Importa tu reductor individual
import registerFormReducer from "../slices/registerFormSlice"; // Importa tu reductor individual
import registerReducer from "../slices/registerSlice"; // Importa tu reductor individual

const rootReducer = combineReducers({
  authUser: authReducer,
  registerForm: registerFormReducer,
  registerData: registerReducer,
});

export default rootReducer;
