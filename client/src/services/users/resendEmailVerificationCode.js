import axios from "axios";
import { userLoginSchema } from "../../utils/validationSchema/globalSchema";
import API_ROUTE_PATHS from "../../utils/constants/ApiRoute";

const resendEmailVerificationCode = async ({ email, password }) => {
  const dataValidation = await userLoginSchema.validate({
    email,
    password,
  });
  if (!dataValidation) {
    return { status: 403, message: "Data Validation Fails" };
  }
  const res = await axios.post(API_ROUTE_PATHS.resendEmailVerificationCode, {
    email,
    password,
  });
  return res.data;
};

export default resendEmailVerificationCode;