// Ye automatically convert krta hai objects(frontend) ko json(backend) string mei
import axios from "axios";

export const axiosInstance = axios.create({
    withCredentials: true,
});

// It automatically grabs your token from localStorage.
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // or cookie if you’re storing it there
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const apiConnector = (method,url,bodyData = {},headers = {},params = {}) => {
    return axiosInstance({
        method,
        url,
        data: bodyData,
        headers,
        params,
    })
}