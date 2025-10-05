"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getUserByUsername, updateUserProfile } from "@/lib/user";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { followUser, unfollowUser } from "@/lib/follow";

export interface User {
  _id: string;
  profilePic: string;
  name: string;
  userName: string;
  email: string;
  bio: string;
  followers: string[];
  following: string[];
  posts: string[];
  createdAt: string;
  updatedAt: string;
}

export default function Profile() {
  const { username }: { username: string } = useParams();
  const currentUser = useSelector(
    (state: RootState) => state.user.userData as User | null
  );

  const [user, setUser] = useState<User | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<User>>({});
  const [profileFile, setProfileFile] = useState<File | null>(null); 

  useEffect(() => {
    const fetchUser = async (username: string) => {
      const fetchedUser = await getUserByUsername(username);
      setUser(fetchedUser);
    };

    if (username) fetchUser(username);
    setIsFollowing(
      currentUser ? currentUser.following.includes(user?._id || "") : false
    );
  }, [username, currentUser, user?._id]);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    if (isFollowing) {
      unfollowUser(user!._id).catch((err) => console.error(err));
    } else {
      followUser(user!._id).catch((err) => console.error(err));
    }
  };

  const handleEditClick = () => {
    if (user) {
      setFormData({
        profilePic: user.profilePic,
        name: user.name,
        userName: user.userName,
        bio: user.bio,
      });
      setIsEditing(true);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const formDataToSend = new FormData();
    if (profileFile) {
      formDataToSend.append("profilePic", profileFile);
    }
    formDataToSend.append("name", formData.name || "");
    formDataToSend.append("userName", formData.userName || "");
    formDataToSend.append("bio", formData.bio || "");
    updateUserProfile(currentUser!._id, formDataToSend)
      .then((updatedUser) => {
        setUser(updatedUser);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  const isOwnProfile = currentUser?._id === user?._id;

  return (
    <div className="p-6 min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center">
        <h1 className="text-3xl font-bold mb-4 font-serif text-gray-800">
          Profile
        </h1>

        {user ? (
          <>
            <Image
              src={user.profilePic || "/images/profile-pic.png"}
              className="rounded-full border-2 border-gray-300"
              alt={user.name}
              width={120}
              height={120}
            />

            <h2 className="mt-3 text-xl font-semibold text-gray-800">
              {user.name}
            </h2>
            <p className="text-gray-500">@{user.userName}</p>
            <p className="mt-2 text-gray-600 italic">
              {user.bio || "This user has no bio..."}
            </p>

            {/* Stats */}
            <div className="mt-4 flex justify-center gap-6 text-center">
              <div>
                <p className="text-lg font-bold text-gray-600">{user.followers.length}</p>
                <span className="text-gray-500 text-sm">Followers</span>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-600">{user.following.length}</p>
                <span className="text-gray-500 text-sm">Following</span>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-600">{user.posts.length}</p>
                <span className="text-gray-500 text-sm">Posts</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex gap-3">
              {isOwnProfile ? (
                <button
                  onClick={handleEditClick}
                  className="px-5 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
                >
                  Edit Profile
                </button>
              ) : (
                <button
                  onClick={handleFollow}
                  className={`px-5 py-2 rounded-lg transition ${
                    isFollowing
                      ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {isFollowing ? "Following" : "Follow"}
                </button>
              )}
            </div>
          </>
        ) : (
          <p className="text-gray-500">Loading...</p>
        )}
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 backdrop-blur-md text-black flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

            <div className="flex flex-col gap-3">
              {/* Profile Picture Upload */}
              <div className="flex flex-col items-center gap-3">
                <label
                  htmlFor="profilePicUpload"
                  className="cursor-pointer relative"
                >
                  <Image
                    src={formData.profilePic || "/images/profile-pic.png"}
                    alt="Profile"
                    width={100}
                    height={100}
                    className="rounded-full border-2 border-gray-300 object-cover"
                  />
                </label>
                <input
                  id="profilePicUpload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const file = e.target.files[0];
                      setProfileFile(file);
                      const previewUrl = URL.createObjectURL(file);
                      setFormData((prev) => ({
                        ...prev,
                        profilePic: previewUrl,
                      }));
                    }
                  }}
                />
              </div>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name || ""}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-3 py-2 text-black"
              />
              <input
                type="text"
                name="userName"
                placeholder="Username"
                value={formData.userName || ""}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-3 py-2 text-black"
              />
              <textarea
                name="bio"
                placeholder="Bio"
                value={formData.bio || ""}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-3 py-2 text-black"
              />
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-black"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-black"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
