import axios from "axios";

const BACKEND_URL = 'http://localhost:8000';

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BACKEND_URL;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;