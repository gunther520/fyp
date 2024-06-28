import * as Yup from "yup";

const emailRule = Yup.string()
  .required("Email is required")
  .email("Invalid Email Format");

const passwordRule = Yup.string()
  .required("Password is required")
  .min(8, "Password must be at least 8 characters long");

const confirmedPasswordRule = Yup.string()
  .required("Confirmed Password is required")
  .oneOf([Yup.ref("password"), null], "Password do not match");

export { emailRule, passwordRule, confirmedPasswordRule };
