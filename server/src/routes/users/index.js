import express from "express";
import validateSchema from "../../middleware/validateSchema.js";
import { userSignUpSchema } from "../../utils/validationSchema/globalSchema.js";
import signupUser from "./controllers/signupUser.js";
import loginUser from "./controllers/loginUser.js";

const router = express.Router();

router.post("/signup", validateSchema(userSignUpSchema), signupUser);
router.post("/login", loginUser);

export default router;