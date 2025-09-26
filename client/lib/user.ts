import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/";

const api = axios.create({baseURL: API_URL, withCredentials: true,})

export async function getUserByUsername(username: string) {
    try {
        const response = await api.get(`/api/user/username/${username}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}   

export async function updateUserProfile(userId: string, data: FormData) {
    try {
        const response = await api.put(`/api/user/${userId}`, data, {
            headers: {
                "Content-Type": "multipart/form-data", 
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}