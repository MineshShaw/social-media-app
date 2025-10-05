import User from "../models/user.model.js";

export const followUser = async (req, res) => {
  const { userIdToFollow } = req.params;
  const currentUserId = req.userId;

  if (!currentUserId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (currentUserId === userIdToFollow) {
    return res.status(400).json({ message: "Cannot follow yourself" });
  }

  try {
    // Create a new follow relationship
    const [userToFollow, currentUser] = await Promise.all([
      User.findById(userIdToFollow),
      User.findById(currentUserId),
    ]);

    if (userToFollow.followers.includes(currentUserId)) {
      return res.status(400).json({ message: "Already following" });
    }

    if (!userToFollow || !currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    userToFollow.followers.push(currentUserId);
    currentUser.following.push(userIdToFollow);

    await userToFollow.save();
    await currentUser.save();
    res.status(200).json({ message: "Followed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const unfollowUser = async (req, res) => {
  const { userIdToUnfollow } = req.params;
  const currentUserId = req.userId;

  if (!currentUserId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (currentUserId === userIdToUnfollow) {
    return res.status(400).json({ message: "Cannot unfollow yourself" });
  }

  try {
    const [userToUnfollow, currentUser] = await Promise.all([
      User.findById(userIdToUnfollow),
      User.findById(currentUserId),
    ]);

    if (!userToUnfollow.followers.includes(currentUserId)) {
      return res.status(400).json({ message: "Not following" });
    }

    if (!userToUnfollow || !currentUser) {
      return res.status(404).json({ message: "User not found" });
    }
    userToUnfollow.followers = userToUnfollow.followers.filter(
      (id) => id.toString() !== currentUserId
    );
    currentUser.following = currentUser.following.filter(
      (id) => id.toString() !== userIdToUnfollow
    );

    await userToUnfollow.save();
    await currentUser.save();
    res.status(200).json({ message: "Unfollowed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};