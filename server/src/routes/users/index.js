import express from "express";
import validateSchema from "../../middleware/validateSchema.js";
import {
  userLoginSchema,
  codeVerificationSchema,
} from "../../utils/validationSchema/globalSchema.js";
import sendEmailVerificationCode from "./controllers/sendEmailVerificationCode.js";
import resendEmailVerificationCode from "./controllers/resendEmailVerificationCode.js";
import signup from "./controllers/signup.js";
import login from "./controllers/login.js";
import verifyCode from "./controllers/verifyCode.js";

const router = express.Router();

router.post(
  "/signup/send-verification-code",
  validateSchema(userLoginSchema),
  sendEmailVerificationCode
);
router.post(
    "/signup/resend-verification-code",
    validateSchema(userLoginSchema),
    resendEmailVerificationCode
  );
router.post(
  "/signup/verify-code",
  validateSchema(codeVerificationSchema),
  verifyCode
);
router.post("/signup", validateSchema(userLoginSchema), signup);
router.post("/login", validateSchema(userLoginSchema), login);

export default router;
