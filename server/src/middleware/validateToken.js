import jwt from "jsonwebtoken";

const validateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; 

  if (!token) {
    return res.status(401).json({status:401, message:"Token Unauthorized"});
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // If token is not valid, return Forbidden
    req.user = user; // Add the user payload to the request object
    next(); // Proceed to the next middleware or route handler
  });
};
