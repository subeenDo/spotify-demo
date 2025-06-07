import axios from "axios";
import { SPOTIFY_BASE_URL } from "../configs/commonConfig";

const api = axios.create({
    baseURL: SPOTIFY_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
});

api.interceptors.request.use((request) => {
    const token = localStorage.getItem("access_token");
    //console.log("API Request Headers before sending:", config.headers);
    if (token) {
        request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
}, (error) => {
    return Promise.reject(error);
});


export default api;
