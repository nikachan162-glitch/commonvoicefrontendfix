import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log("Request:", {
      url: config.url,
      method: config.method,
      withCredentials: config.withCredentials,
      headers: config.headers,
      cookies: document.cookie,
    });
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        await api.post("/auth/refresh");
        return api(error.config);
      } catch (err) {
        console.error("Token refresh failed:", err);
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);