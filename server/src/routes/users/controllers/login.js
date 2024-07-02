import { User } from "../../../models/index.js";
import { checkHashPassword } from "../../../config/bcrypt.js";
import { getToken } from "../../../config/jwt.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne(email ? { email: email } : null);
    if (!user) {
      return res
        .status(401)
        .json({ status: 401, message: "Invalid email or password" });
    }

    const isPasswordValid = checkHashPassword(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ status: 401, message: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = getToken(user._id, user.email, user.password);
    return res
      .status(200)
      .json({ status: 200, data: { email: user.email, token: token } });
      
  } catch (err) {
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};

export default login;
