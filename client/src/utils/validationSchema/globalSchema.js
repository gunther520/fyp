import * as Yup from "yup";
import { emailRule, passwordRule, confirmedPasswordRule } from "./schemaRules";

const loginFormSchema = Yup.object({
  email: emailRule,
  password: passwordRule,
});

const signupFormSchema = Yup.object({
  emailRule: emailRule,
  password: passwordRule,
  confirmedPassword: confirmedPasswordRule,
});

export { loginFormSchema, signupFormSchema };
