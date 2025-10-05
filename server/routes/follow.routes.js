import express from "express";
import { followUser, unfollowUser } from "../controllers/follow.controller.js";
import isAuth from "../middleware/isAuth.js";

const followRouter = express.Router();

followRouter.post("/:userIdToFollow", isAuth, followUser);
followRouter.delete("/:userIdToUnfollow", isAuth, unfollowUser);

export default followRouter;