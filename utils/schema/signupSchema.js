import * as yup from "yup";

// Regex pattern
import { commanRegex } from "../../common/Regex/regexValidation";

export const signupSchema = yup.object().shape({
  username: yup
    .string()
    .required("Please provide a username.")
    .trim()
    .lowercase()
    .min(2, "Username is too short - should be 2 chars minimum.")
    .max(60, "Username cannot be more than 60 characters"),
  password: yup
    .string()
    .required("Please provide a password.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(
      commanRegex.passwordRegExp,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  mobileNumber: yup
    .string()
    .required("Please provide a mobile number.")
    .matches(commanRegex.phoneRegExp, "Phone number is not valid")
});
