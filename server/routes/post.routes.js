import express from 'express';
import { uploadPost, getFeedPosts, handleLikePost } from '../controllers/post.controllers.js';
import isAuth from '../middleware/isAuth.js';
import upload from '../middleware/multer.js';

const postRouter = express.Router();

postRouter.post('/upload', isAuth, upload.single('mediaUrl'), uploadPost);
postRouter.get('/feed', getFeedPosts);
postRouter.post('/:postId/like', isAuth, handleLikePost);

export default postRouter;