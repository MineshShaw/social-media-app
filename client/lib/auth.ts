import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

const api = axios.create({baseURL: API_URL, withCredentials: true,})

export const login = async (userName: string, password: string) => {
  try {
    const response = await api.post("/api/auth/signin", { userName, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signup = async (fullName: string, userName: string, email: string, password: string) => {
  try {
    const response = await api.post("/api/auth/signup", { name: fullName, userName, email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};