// filepath: c:\Users\adity\Desktop\pedlagao\Frontend\src\utils\axiosInstance.js
import axios from 'axios';
import API_BASE_URL from '../config/config';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
});

export default axiosInstance;