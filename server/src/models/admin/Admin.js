import mongoose from "mongoose";
import ModelName from "../modelName";

const AdminModel = new mongoose.Schema(
  {
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
  },
  { collection: `${ModelName.AdminModel}`, timestamps: true }
);

export default AdminModel;
