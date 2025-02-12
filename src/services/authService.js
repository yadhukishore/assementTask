import axios from "axios";
import { authState } from "../components/auth/state/auth";
import { useSetRecoilState } from "recoil";

const BASE_URL = "https://core-skill-test.webc.in/employee-portal/api/v1";
const api = axios.create({ baseURL: BASE_URL });

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
      }
      return response.data;
    } catch (error) {
      return error.response?.data || { success: false, message: "Login failed" };
    }
  };

  const logoutUser = async () => {
    try {
      await api.post("/settings/logout");
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      setAuth({ token: null, user: null, isAuthenticated: false });
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return { loginUser, logoutUser };
};