import Yup from "../../utils/yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email required"),
  password: Yup.string()
    .min(6, "Password sould have at least 6 characters")
    .required("Password required"),
});
