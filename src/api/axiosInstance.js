import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://api.woliba.com/api/v1";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("woliba_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      "Something went wrong. Please try again.";
    if (error?.response?.status === 401) localStorage.removeItem("woliba_token");
    return Promise.reject({ message, status: error?.response?.status, data: error?.response?.data });
  }
);

export default apiClient;
