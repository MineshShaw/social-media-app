"use client";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import React, { useState } from "react";
import Image from "next/image";
import Card from "./Card";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { handleLikePost } from "@/lib/post";
import Link from "next/link";

interface userData {
  _id: string;
  userName: string;
  profilePic: string;
}

export default function Post({
  post,
}: {
  post: {
    _id: string;
    author: {
      userName: string;
      profilePic: string;
    } | null;
    mediaUrl: string;
    caption: string;
    likes: string[];
    comments: string[];
  };
}) {
  const user = useSelector(
    (state: RootState) => state.user.userData as userData
  );
  const [liked, setLiked] = useState(
    post.likes.some((like) => like === user._id)
  );
  const [likesCount, setLikesCount] = useState(post.likes?.length || 0);
  const [openComments, setOpenComments] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikesCount((prev) => prev - 1);
    } else {
      setLikesCount((prev) => prev + 1);
    }
    setLiked(!liked);
    handleLikePost(post._id);
  };

  return (
    <div>
      <Card>
        <div className="flex flex-col p-4">
          {/* Author Info */}
          <div className="flex items-center mb-2">
            <Link href={`/profile/${post.author?.userName}`}>
              <Image
                src={post.author?.profilePic || "/images/profile-pic.png"}
                alt="Profile"
                className="rounded-full mr-2"
                width={40}
                height={40}
              />
            </Link>
            <h2 className="text-lg text-black font-semibold">
              {post.author?.userName || "Unknown"}
            </h2>
          </div>

          {/* Post Media */}
          <Image
            src={post.mediaUrl}
            alt="Post Content"
            className="mb-2 rounded-lg"
            width={400}
            height={400}
          />

          {/* Caption */}
          <p className="text-gray-600 mb-3">{post.caption}</p>

          {/* Like + Comments Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className={`px-3 py-1 rounded-md text-sm font-medium gap-2 flex ${
                liked ? "bg-red-500 text-white" : "bg-gray-200 text-black"
              }`}
            >
              {liked ? <AiFillHeart size={18} /> : <AiOutlineHeart size={18} />}
              {liked ? "Liked" : "Like"} ({likesCount})
            </button>

            <button
              onClick={() => setOpenComments(true)}
              className="px-3 py-1 bg-blue-500 text-white flex gap-2 rounded-md text-sm font-medium"
            >
              <FaRegCommentDots size={16} />
              View Comments
            </button>
          </div>
        </div>
      </Card>

      {/* Comments Modal */}
      {openComments && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h3 className="text-lg font-semibold text-black mb-4">Comments</h3>
            {post.comments?.length > 0 ? (
              <ul className="space-y-2 max-h-60 overflow-y-auto">
                {post.comments.map((comment, index) => (
                  <li key={index} className="border-b pb-2">
                    {comment}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No comments yet.</p>
            )}

            <button
              onClick={() => setOpenComments(false)}
              className="mt-4 px-4 py-2 text-black bg-gray-300 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
