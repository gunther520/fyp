import User from "../../../models/users/User.js";
import bcrypt from "bcrypt";

const signupUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne(email ? { email: email } : null);
    if (existingUser) {
      return res
        .status(400)
        .json({ status: 400, message: "Email is already exists" });
    }
    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email: email,
      password: encryptedPassword,
    });
    await newUser.save();

    res
      .status(201)
      .json({
        status: 201,
        message: "User registered successfully!",
        data: { email: email, password: password },
      });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Failed to register user (Internal Server Error)",
    });
  }
};

export default signupUser;
