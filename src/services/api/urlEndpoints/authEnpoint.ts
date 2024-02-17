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
  UPDATE_PASSWORD: "users/password-update",
  FIND_USER_BY_EMAIL: "auth-actions/find-user",
  UPDATE_PASSWORD_AFTER_2FA: "auth-actions/password-update",
  RESTORE_PASSWORD_AFTER_2FA: "auth-actions/password-restore",
  GENERATE_PASSWORD_UPDATE_OTP: "auth-actions/generate-otp-code",
  PASSWORD_UPDATE_CODE_VALIDATION: "auth-actions/password-update-code-validation",
  PASSWORD_RESTORE_CODE_VALIDATION: "auth-actions/password-restore-code-validation",
  GET_PROFILE_POSTS: "posts/get-posts",
  // Agrega aquí otras rutas que necesites
};
