import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://3.6.90.198:8080/api',
  headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;