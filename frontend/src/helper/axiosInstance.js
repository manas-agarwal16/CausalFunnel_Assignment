import axios from "axios";

const BACKEND_URL = 'https://causalfunnel-assignment-x3j3.onrender.com';

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BACKEND_URL;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;