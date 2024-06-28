import express from "express";
import validateSchema from "../../middleware/validateSchema";
import { userSchema } from "../../utils/validationSchema/globalSchema";
import signupUser from "./controllers/signupUser";

const router = express.Router();

router.post("/signup", validateSchema(userSchema), signupUser);

export default router;