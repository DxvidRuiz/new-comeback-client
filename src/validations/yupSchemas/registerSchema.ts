import * as Yup from "yup";

export const personalDataSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Za-z ]+$/, "Name should contain only letters and spaces")
    .max(50, "Name should be at most 50 characters")
    .required("Name is required"),

  lastname: Yup.string()
    .matches(/^[A-Za-z ]+$/, "Lastname should contain only letters and spaces")
    .max(50, "Lastname should be at most 50 characters")
    .required("Lastname is required"),

  dateOfBirth: Yup.date()
    .required("Date of birth is required")
    .transform((originalValue, originalObject) => {
      const date = new Date(originalValue);
      return date.toISOString() === originalValue ? date : originalValue;
    })
    .test(
      "isValidDate",
      "Invalid date format. Use the format 2023-10-26T13:45:30.000Z",
      (value) => {
        return value instanceof Date && !isNaN(value.getTime());
      }
    ),

  gender: Yup.string()
    .oneOf(["male", "female", "nonbinary"], "Invalid gender")
    .required("Gender is required"),
});

export const userDataSchema = Yup.object().shape({
  username: Yup.string()
    .max(30, "Username is too long")
    .matches(
      /^[a-zA-Z0-9._-]+$/,
      "Username can only contain letters, numbers, periods, underscores, hyphens."
    )
    .required("Username is required"),

  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

export const passwordValidationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password should be at least 8 characters")
    .matches(
      /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*\d){1,})(?=(.*[@$!%*?&.]){1,})[A-Za-z\d@$!%*?&.]{8,}$/,
      "Password should contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
    ),
  passwordConfirmation: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});
