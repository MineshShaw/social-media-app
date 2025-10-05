import express from "express";
import isAuth from "../middleware/isAuth.js";
import upload from "../middleware/multer.js";
import { getCurrentUser, getUserByUsername, editProfile, getSuggestedUsersToFollow } from "../controllers/user.controllers.js";

const userRouter = express.Router();

userRouter.get("/current", isAuth, getCurrentUser);
userRouter.get("/username/:username", getUserByUsername);
userRouter.get("/suggestions", isAuth, getSuggestedUsersToFollow);
userRouter.put("/:userId", isAuth, upload.single("profilePic"), editProfile);

export default userRouter;