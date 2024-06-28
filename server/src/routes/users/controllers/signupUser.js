import { User } from "../../../models/index.js"
import { hashPassword } from "../../../config/bcrypt.js";

const signupUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const existingUser = await User.findOne(email ? { email: email } : null);
    if (existingUser) {
      return res.status(400).json({ 
        status: 400, 
        message: "User is already exists" 
      });
    }

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

export default signupUser;
