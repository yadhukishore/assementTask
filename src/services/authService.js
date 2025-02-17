// authService.js
import axios from "axios";
import { authState } from "../components/auth/state/auth";
import { useSetRecoilState } from "recoil";

const BASE_URL = "https://core-skill-test.webc.in/employee-portal/api/v1";
const api = axios.create({ 
  baseURL: BASE_URL,
  // Add timeout to prevent infinite loading
  timeout: 10000
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const useAuthActions = () => {
  const setAuth = useSetRecoilState(authState);

  const loginUser = async (username, password) => {
    try {
      const response = await api.post("/auth/login", { username, password });
      
      if (response.data.success) {
        localStorage.setItem("authToken", response.data.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.data));
        setAuth({
          token: response.data.data.token,
          user: response.data.data,
          isAuthenticated: true,
        });
        return response.data;
      }
      
      return response.data;
    } catch (error) {
      // Properly format error response
      if (error.response?.data) {
        return error.response.data;
      }
      if (error.code === 'ECONNABORTED') {
        return { success: false, message: "Request timed out. Please try again." };
      }
      return { 
        success: false, 
        message: error.message || "Login failed. Please check your connection and try again."
      };
    }
  };

  const logoutUser = async () => {
    try {
      await api.post("/settings/logout");
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      // Always clear local storage and state, even if the logout API call fails
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      setAuth({ token: null, user: null, isAuthenticated: false });
    }
  };

  return { loginUser, logoutUser };
};