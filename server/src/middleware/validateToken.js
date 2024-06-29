import jwt from "jsonwebtoken";
import Env from "../utils/constants/Env.js";

const validateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ status: 401, message: "Token Unauthorized" });
  }

  jwt.verify(token, Env.JWT_SECRET, (err, user) => {
    if (err) {
      // Token is not valid
      return res.status(401).json({ status: 401, message: "Token Forbidden" });
    }
    req.user = user; // Add the user payload to the request object
    next();
  });
};
