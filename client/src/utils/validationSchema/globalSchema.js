import * as Yup from "yup";
import {
  emailRule,
  passwordRule,
  confirmedPasswordRule,
  codeVerificationRule,
} from "./schemaRules";

const userLoginSchema = Yup.object({
  email: emailRule,
  password: passwordRule,
});

const userSignUpSchema = Yup.object({
  email: emailRule,
  password: passwordRule,
  confirmedPassword: confirmedPasswordRule,
});

const codeVerificationSchema = Yup.object({
  code: codeVerificationRule,
});


export { userLoginSchema, userSignUpSchema, codeVerificationSchema };
