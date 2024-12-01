import axios from "axios";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3001", // Your API base URL
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // if (error.response?.status === 401) {
        //     // Handle unauthorized (token expired or invalid)
        //     localStorage.removeItem("token");
        //     window.location.href = "/login"; // Redirect to login page
        // }
        return Promise.reject(error);
    }
);

export default axiosInstance;
