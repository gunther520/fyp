import mongoose from "mongoose";
import ModelName from "../modelName.js";
import Env from "../../utils/constants/Env.js";

const NonVerifiedUserModel = new mongoose.Schema(
  {
    email: { type: String, required: true },
    code: { type: String, required: true },
    expiresAt: {
      type: Date,
      default: Date.now() + Env.VERIFICATION_EXPIRES * 60 * 1000,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      required: true,
    },
  },
  { collection: `${ModelName.NonVerifiedUser}`, timestamps: false }
);

NonVerifiedUserModel.index(
  { createdAt: 1 },
  { expireAfterSeconds: Env.VERIFICATION_EXPIRES }
);

export default NonVerifiedUserModel;
