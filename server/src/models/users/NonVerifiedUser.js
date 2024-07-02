import mongoose from "mongoose";
import ModelName from "../modelName.js";

const expireTime = 5 * 60; // 5 minutes

const NonVerifiedUserModel = new mongoose.Schema(
  {
    email: { type: String, required: true },
    code: { type: String, required: true },
    expiresAt: {
      type: Date,
      expires: expireTime,
      required: true,
    },
  },
  { collection: `${ModelName.NonVerifiedUser}`, timestamps: true }
);

NonVerifiedUserModel.index({ createdAt: 1 }, { expireAfterSeconds: expireTime });

export default NonVerifiedUserModel;
