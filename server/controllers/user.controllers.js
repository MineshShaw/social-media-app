import User from "../models/user.model.js";
import { uploadToCloudinary } from "../config/cloudinary.js";

export const getCurrentUser = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ userName: username }).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const editProfile = async (req, res) => {
  const { userId } = req.params;
  const { name, userName, bio } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const duplicateUserName = await User.findOne({ userName });
    if (duplicateUserName && duplicateUserName._id.toString() !== userId) {
      return res.status(400).json({ error: "Username already taken" });
    }

    user.name = name;
    user.userName = userName;
    user.bio = bio;

    if (req.file) {
      try {
        const result = await uploadToCloudinary(req.file.path);
        user.profilePic = result.secure_url;
      } catch (err) {
        console.error("Cloudinary upload error:", err);
        return res.status(500).json({ error: err.message, message: "Cloudinary upload failed" });
      }
    }

    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    console.error("editProfile error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
