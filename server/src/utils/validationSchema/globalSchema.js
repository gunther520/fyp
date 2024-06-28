import * as Yup from "yup";
import {
  userNameRule,
  userEmailRule,
  userPasswordRule,
  userConfirmedPasswordRule,
  adminEmailRule,
  adminPasswordRule,
} from "./schemaRules";

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

export { userLoginSchema, userSignUpSchema, adminSchema };
