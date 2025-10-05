import { uploadToCloudinary } from "../config/cloudinary.js";
import Post from "../models/post.model.js";

export const uploadPost = async (req, res) => {
  const { caption, mediaType } = req.body;

  let mediaUrl = "";
  if (req.file) {
    mediaUrl = await uploadToCloudinary(req.file.path);
  } else {
    return res.status(400).json({ message: "No file uploaded" });
  }
  
  try {
      const post = await Post.create({ author: req.userId, caption, mediaType, mediaUrl: mediaUrl.secure_url });
      await post.save();
      return res.status(201).json(post);
  } catch (error) {
      return res.status(500).json({ error: error.message });
  }
}

export const getFeedPosts = async (req, res) => {
  try {
      const posts = await Post.find().sort({ createdAt: -1 }).populate('author', 'userName profilePic');
      return res.status(200).json(posts);
  } catch (error) {
      return res.status(500).json({ error: error.message });
  }
}

export const handleLikePost = async (req, res) => {
  const { postId } = req.params;
  const userId = req.userId;

  try {
      const post = await Post.findById(postId);
      if (!post) {
          return res.status(404).json({ error: "Post not found" });
      }
      const isLiked = post.likes.includes(userId);
      if (isLiked) {
        post.likes = post.likes.filter((id) => id.toString() !== userId);
      } else {
          post.likes.push(userId);
      }
      
      await post.save();
      return res.status(200).json(post);
  } catch (error) {
      return res.status(500).json({ error: error.message });
  }
}