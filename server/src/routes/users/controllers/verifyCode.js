import { NonVerifiedUser } from "../../../models/index.js";
import {
  ErrorMessages,
  SuccessMessages,
} from "../../../utils/constants/Message.js";

const verifyCode = async (req, res) => {
  const { email, code } = req.body;
  const verificationCode = code.join("");

  const existingNonVerifiedUser = await NonVerifiedUser.findOne({
    email: email,
    code: verificationCode,
  });

  if (!existingNonVerifiedUser) {
    return res.status(400).json({
      status: 400,
      message: ErrorMessages.INVALID_VERIFICATION_CODE,
    });
  }

  if (new Date() > existingNonVerifiedUser.expiresAt) {
    await NonVerifiedUser.deleteOne({ email: email, code: verificationCode });
    return res.status(400).json({
      status: 400,
      message: ErrorMessages.VERIFICATION_CODE_EXPIRE,
    });
  }

  await NonVerifiedUser.deleteOne({ email: email, code: verificationCode });
  return res.status(200).json({
    status: 200,
    message: SuccessMessages.VERIFICATION_SUCCESS,
  });
};

export default verifyCode;
