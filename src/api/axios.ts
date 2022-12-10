import axios from "axios";

const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: "http://localhost:9595",
});

export default axiosInstance;

export const { isAxiosError } = axios;
