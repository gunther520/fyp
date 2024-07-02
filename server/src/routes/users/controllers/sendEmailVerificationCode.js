import { User, NonVerifiedUser } from "../../../models/index.js";
import { transporter, mailOptions } from "../../../config/nodemailer.js";
import Env from "../../../utils/constants/Env.js";

const sendEmailVerificationCode = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        status: 400,
        message: "User already exists",
      });
    }

    // Generate a 6-digit verification code
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const nonVerifiedUser = new NonVerifiedUser({
      email: email,
      code: verificationCode,
      expiresAt: new Date(Date.now() + Env.VERIFICATION_EXPIRES * 60 * 1000),
    });
    await nonVerifiedUser.save();

    transporter.sendMail(mailOptions(email, verificationCode), (err, info) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ status: 500, message: "Unexpected Error" });
      }
      console.log(`Your verification code is: ${verificationCode}`);
      res.status(200).json({
        status: 200,
        data: { email: email, password: password },
        message: "Verification code is sent",
      });
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

export default sendEmailVerificationCode;
