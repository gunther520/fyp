import * as Yup from "yup";
import {
  userNameRule,
  userEmailRule,
  userPasswordRule,
  userConfirmedPasswordRule,
  adminEmailRule,
  adminPasswordRule,
  codeVerificationRule,
} from "./schemaRules.js";

const userLoginSchema = Yup.object().shape({
  email: userEmailRule,
  password: userPasswordRule,
});

const userSignUpSchema = Yup.object().shape({
  email: userEmailRule,
  password: userPasswordRule,
  confirmedPassword: userConfirmedPasswordRule,
});

const adminSchema = Yup.object().shape({
  email: adminEmailRule,
  password: adminPasswordRule,
});

const codeVerificationSchema = Yup.object().shape({
  code: codeVerificationRule
})

export {
  userLoginSchema,
  userSignUpSchema,
  adminSchema,
  codeVerificationSchema
};
