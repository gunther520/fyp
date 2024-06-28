import axios from 'axios';
import { userSignUpSchema } from "../../utils/validationSchema/globalSchema";
import API_ROUTE_PATHS from "../../utils/constants/ApiRoute";

const signup = async ({ email, password, confirmedPassword }) => {
    const dataValidation = await userSignUpSchema.validate({ email, password, confirmedPassword });
    if (!dataValidation){
        return { status: res.status, message:"Data Validation Fails" }
    }
    const res = await axios.post(API_ROUTE_PATHS.signup, {
      email,
      password,
      confirmedPassword,
    })
    return res.data;
};

export default signup;
