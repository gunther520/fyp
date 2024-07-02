import { NonVerifiedUser } from "../../../models/index.js";

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
      message: "Invalid Verification Code",
    });
  }

  if (new Date() > existingNonVerifiedUser.expiresAt) {
    await NonVerifiedUser.deleteOne({ email: email, code: verificationCode });
    return res.status(400).json({
      status: 400,
      message: "Validation Code is Expired",
    });
  }

  await NonVerifiedUser.deleteOne({ email: email, code: verificationCode });
  return res.status(200).json({
    status: 200,
    message: "Verification Success!",
  });
};

export default verifyCode;
