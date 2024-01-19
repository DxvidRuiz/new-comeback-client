export const API_ENDPOINTS = {
  URL_BASE:
    process.env.EXPO_PUBLIC_REACT_APP_API_BASE_URL ||
    "http://192.168.0.104:3000/api/v1/",
  USER_LOGIN: "auth/login",
  REGISTER: "auth/register",
  USER: "users",
  CHECK_USERNAME: "auth/checkusername",
  CHECK_EMAIL: "auth/checkemail",
  COMMENTS: "/comments",
  UPLOAD_PROFILE_PHOTO: "profile/profile-photo",
  UPDATE_PASSWORD: "users/password_update",
  // Agrega aquí otras rutas que necesites
};
