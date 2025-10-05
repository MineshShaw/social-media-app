import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/";

const api = axios.create({baseURL: API_URL, withCredentials: true,})

export const followUser = async (userIdToFollow: string) => {
  try {
    const response = await api.post(`/api/follow/${userIdToFollow}`);
    return response.data;
  } catch (error) {
    console.error("Error following user:", error);
    throw error;
  }
};

export const unfollowUser = async (userIdToUnfollow: string) => {
  try {
    const response = await api.delete(`/api/follow/${userIdToUnfollow}`);
    return response.data;
  } catch (error) {
    console.error("Error unfollowing user:", error);
    throw error;
  }
};

export const getSuggestedUsersToFollow = async () => {
  try {
    const response = await api.get('/api/user/suggestions');
    return response.data;
  } catch (error) {
    console.error("Error fetching suggested users:", error);
    throw error;
  }
}