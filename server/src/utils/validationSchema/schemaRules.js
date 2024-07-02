import * as Yup from "yup";

/* User Rule */
const userNameRule = Yup.string();

const userEmailRule = Yup.string()
  .email("Invalid Email Format")
  .required("Email is required");

const userPasswordRule = Yup.string()
  .min(8, "Password must be at least 8 characters long")
  .required("Password is required");

const userConfirmedPasswordRule = Yup.string()
  .required("Confirmed Password is required")
  .oneOf([Yup.ref("password"), null], "Password do not match");

/* Admin Rule */
const adminEmailRule = Yup.string().required("Email is required");

const adminPasswordRule = Yup.string().required("Password is required");

const codeVerificationRule = Yup.array()
  .of(
    Yup.string().required("Field is required").matches(/^\d$/, "Must be a integer")
  )
  .length(6, "Verification code must be exactly 6 digits");

export {
  userNameRule,
  userEmailRule,
  userPasswordRule,
  userConfirmedPasswordRule,
  adminEmailRule,
  adminPasswordRule,
  codeVerificationRule,
};
