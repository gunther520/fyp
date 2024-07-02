import mongoose from "mongoose";
import ModelName from "./modelName.js";
import UserModel from "./users/User.js";
import AdminModel from "./admin/Admin.js";
import NonVerifiedUserModel from "./users/nonVerifiedUser.js";

const User = mongoose.model(`${ModelName.UserModel}`, UserModel);
const Admin = mongoose.model(`${ModelName.AdminModel}`, AdminModel);
const NonVerifiedUser = mongoose.model(`${ModelName.NonVerifiedUser}`, NonVerifiedUserModel);

export {
    User,
    Admin,
    NonVerifiedUser,
}