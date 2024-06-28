import * as Yup from "yup";
import { emailRule, passwordRule, confirmedPasswordRule } from "./schemaRules";

const userLoginSchema = Yup.object({
  email: emailRule,
  password: passwordRule,
});

const userSignUpSchema = Yup.object({
  email: emailRule,
  password: passwordRule,
  confirmedPassword: confirmedPasswordRule,
});

export { userLoginSchema, userSignUpSchema };
