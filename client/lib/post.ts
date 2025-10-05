import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

const api = axios.create({baseURL: API_URL, withCredentials: true,})

export const fetchPosts = async () => {
    try {
      const response = await api.get("/api/post/feed");
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      return [];
    }
  };

export const handleLikePost = async (postId: string) => {
    try {
      const response = await api.post(`/api/post/${postId}/like`);
      return response.data;
    } catch (error) {
      console.error("Error liking post:", error);
      return null;
    }
  };