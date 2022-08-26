import * as yup from "yup";

export const loginSchema = yup.object().shape({
  username: yup
    .string()
    .required("Please provide a username.")
    .trim()
    .lowercase()
    .min(2, "Username is too short - should be 2 chars minimum.")
    .max(60, "Username cannot be more than 60 characters"),
  password: yup.string().required("Please provide a password.")
});
