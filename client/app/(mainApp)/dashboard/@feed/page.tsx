"use client";

import Card from "@/components/Card";
import Post from "@/components/Post";
import { useEffect, useState } from "react";
import { fetchPosts } from "@/lib/post";

interface Post {
  _id: string;
  author: {
    userName: string;
    profilePic: string;
  } | null;
  mediaUrl: string;
  caption: string;
  likes: string[];
  comments: string[];
}

export default function FeedPage() {

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
  const getPosts = async () => {
    const data = await fetchPosts();
    const formatted = data.map((post: Post) => ({
      _id: post._id,
      author: post.author || { userName: "Unknown", profilePic: "/images/profile-pic.png" },
      mediaUrl: post.mediaUrl || "/images/blank.png",
      caption: post.caption || "",
      likes: post.likes || [],
      comments: post.comments || [],
    }));

    setPosts(formatted);
  };

  getPosts();
}, []);



  return (
    // take full height of layout column
    <div className="flex flex-col h-full">
      {/* feed content with scroll */}
      <Card>
        <div
          className="flex-1 overflow-y-auto max-h-[calc(100vh-150px)] p-6"
          style={{
            scrollbarWidth: "none",
          }}
        >
          <div className="flex flex-col gap-4">
            {posts.map((post, index) => (
              <Post key={index} post={post} />
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
