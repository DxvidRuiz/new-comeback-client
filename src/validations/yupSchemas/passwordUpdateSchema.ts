// schema/passwordSchema.ts
import { number, object, ref, string } from "yup";

const getCharacterValidationError = (str: string) => {
    return `Your password must have at least 1 ${str} character`;
};
export const passwordUpdateValidationSchema = object({

    currentPassword: string()
        .required("Current Password is required")
        .min(8, "Password should be at least 8 characters")
        .max(100, "Password should be less than 100 characters")
        .matches(/[0-9]/, getCharacterValidationError("digit"))
        .matches(/[a-z]/, getCharacterValidationError("lowercase"))
        .matches(/[A-Z]/, getCharacterValidationError("uppercase"))
        .matches(/[@#.*$%^&+=]/, getCharacterValidationError("special")),
    newPassword: string()
        .required("Please enter a new password")
        // check minimum characters
        .min(8, "Password must have at least 8 characters")
        // different error messages for different requirements
        .matches(/[0-9]/, getCharacterValidationError("digit"))
        .matches(/[a-z]/, getCharacterValidationError("lowercase"))
        .matches(/[A-Z]/, getCharacterValidationError("uppercase"))
        .matches(/[@#.*$%^&+=]/, getCharacterValidationError("special")).notOneOf([ref('currentPassword')], 'New password cannot be the same as the current password'),

    newPasswordConfirmation: string()
        .required("Please re-type your password")
        .oneOf([ref("newPassword")], "Passwords does not match"),
});
export const passwordUpdateSchema = object({

    password: string()
        .required("Please enter a password")
        .min(8, "Password must have at least 8 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/\d/, "Password must contain at least one digit")
        .matches(/[@#.*$%^&+=]/, "Password must contain at least one special character"),


    passwordConfirmation: string()
        .required("Please re-type your password")
        .oneOf([ref("password")], "Passwords does not match"),
});


export const verificationOTPschema = object({
    confirmationCode: number()
        .integer()
        .positive()
        .max(6)
        .required(),
});

export const emailSchema = object({
    email: string()
        .email("Invalid email").
        required("Email required"),

});

// export const passwordUpdateValidationchema = Yup.object().shape({
//     currentPassword: Yup.string()
//         .required("Current Password is required")
//         .min(8, "Password should be at least 8 characters")
//         .max(50, "Password should be less than 100 characters"),
//     newPassword: Yup.string()
//         .required("Password is required")
//         .min(8, "Password should be at least 8 characters")
//         .matches(
//             /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&.])[A-Za-z\d@$!%*#?&.]{8,}$/
//             ,
//             "Password should contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
//         )
//         .notOneOf([Yup.ref('currentPassword')], 'New password cannot be the same as the current password'),
//     newPasswordConfirmation: Yup.string()
//         .required("Confirm Password is required")
//         .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
// });
