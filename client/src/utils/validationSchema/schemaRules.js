import * as Yup from "yup";

const emailRule = Yup.string()
  .email("Invalid Email Format")
  .required("Email is required");

const passwordRule = Yup.string()
  .min(8, "Password must be at least 8 characters long")
  .required("Password is required");

const confirmedPasswordRule = Yup.string()
  .required("Confirmed Password is required")
  .oneOf([Yup.ref("password"), null], "Password do not match");

export { emailRule, passwordRule, confirmedPasswordRule };
