// Schema
import { signupSchema } from "../schema/signupSchema";
import { loginSchema } from "../schema/loginSchema";

export const signUpValidator = async (data) => {
  return await signupSchema.validate(data).catch((e) => {
    throw e;
  });
};

export const loginValidator = async (data) => {
  return await loginSchema.validate(data).catch((e) => {
    throw e;
  });
};
