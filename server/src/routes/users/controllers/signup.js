import { User, NonVerifiedUser } from "../../../models/index.js";
import { hashPassword } from "../../../config/bcrypt.js";

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    await NonVerifiedUser.deleteOne({ email: email });

    const newUser = new User({
      email: email,
      password: hashPassword(password),
    });
    await newUser.save();

    res.status(201).json({
      status: 201,
      data: { email: email, password: password },
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

export default signup;
