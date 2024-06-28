import jwt from "jsonwebtoken";
import Env from "../utils/constants/Env.js";

const getToken = ( userId, email, password ) => {
  return jwt.sign(
    { userId: userId, email: email, password: password },
    Env.JWT_SECRET,
    { expiresIn: Env.JWT_EXPIRES_IN }
  );
};

export { getToken }
