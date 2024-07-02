import { User, NonVerifiedUser } from "../../../models/index.js";
import { transporter, mailOptions } from "../../../config/nodemailer.js";
import {
  ErrorMessages,
  SuccessMessages,
} from "../../../utils/constants/Message.js";

const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const resendEmailVerificationCode = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        status: 400,
        message: ErrorMessages.USER_ALREADY_EXIST,
      });
    }

    await NonVerifiedUser.deleteOne({ email: email });

    // Generate a 6-digit verification code
    const verificationCode = generateVerificationCode();

    const nonVerifiedUser = new NonVerifiedUser({
      email: email,
      code: verificationCode,
    });
    await nonVerifiedUser.save();

    transporter.sendMail(mailOptions(email, verificationCode), (err, info) => {
      if (err) {
        return res
          .status(500)
          .json({
            status: 500,
            message: ErrorMessages.SEND_VERIFICATION_CODE_FAILURE,
          });
      }
      console.log(`Your verification code is: ${verificationCode}`);
      res.status(200).json({
        status: 200,
        data: { email: email, password: password },
        message: SuccessMessages.SEND_VERIFICATION_CODE_SUCCESS,
      });
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: ErrorMessages.INTERNAL_SERVER_ERROR,
    });
  }
};

export default resendEmailVerificationCode;
