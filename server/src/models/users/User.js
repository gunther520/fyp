import mongoose from "mongoose";
import ModelName from "../modelName";

const UserModel = new mongoose.Schema(
  {
    userName: { type: String, default: "" },
    email: { type: String, minlength: 8, required: true, unique: true },
    password: { type: String, required: true },
  },
  { collection: `${ModelName.UserModel}`, timestamps: true }
);

export default UserModel;
