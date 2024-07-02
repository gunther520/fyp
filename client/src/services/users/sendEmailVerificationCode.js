import axios from "axios";
import { userSignUpSchema } from "../../utils/validationSchema/globalSchema";
import API_ROUTE_PATHS from "../../utils/constants/ApiRoute";

const sendEmailVerificationCode = async ({ email, password, confirmedPassword }) => {
  const dataValidation = await userSignUpSchema.validate({
    email,
    password,
    confirmedPassword,
  });
  if (!dataValidation) {
    return { status: 403, message: "Data Validation Fails" };
  }
  const res = await axios.post(API_ROUTE_PATHS.sendEmailVerificationCode, {
    email,
    password,
  });
  return res.data;
};

export default sendEmailVerificationCode;
