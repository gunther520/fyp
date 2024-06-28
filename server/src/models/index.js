import mongoose from "mongoose";
import ModelName from "./modelName.js";
import UserModel from "./users/User.js";
import AdminModel from "./admin/Admin.js";

const User = mongoose.model(`${ModelName.UserModel}`, UserModel);
const Admin = mongoose.model(`${ModelName.AdminModel}`, AdminModel);

export {
    User,
    Admin,
}