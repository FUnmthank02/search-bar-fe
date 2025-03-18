import axios from "axios";
import { TIME_OUT } from "../utils/constants";
import { toast } from "react-hot-toast";

const AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: TIME_OUT,
  headers: {
    "Content-Type": "application/json",
  },
});

AxiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const { response } = error;
    const message = response?.data?.message || error.message;
    toast.error(message);
    return Promise.reject(error);
  }
);

export default AxiosInstance;
