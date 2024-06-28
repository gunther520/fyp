import express from "express";
import validateSchema from "../../middleware/validateSchema.js";
import { userSignUpSchema } from "../../utils/validationSchema/globalSchema.js";
import signupUser from "./controllers/signupUser.js";

const router = express.Router();

router.post("/signup", validateSchema(userSignUpSchema), signupUser);

export default router;