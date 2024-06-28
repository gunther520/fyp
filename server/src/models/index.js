import mongoose from "mongoose";
import ModelName from "./modelName";
import UserModel from "./users/User";
import AdminModel from "./admin/Admin";

const User = mongoose.model(`${ModelName.UserModel}`, UserModel);
const Admin = mongoose.model(`${ModelName.AdminModel}`, AdminModel);

export {
    User,
    Admin,
}