import axios from "axios";
import { StorageConstants } from "../redux/Constant";

export const Api = axios.create({
  baseURL: "http://localhost:3000/api",
});

Api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(StorageConstants.AUTH_TOKEN);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
