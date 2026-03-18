import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://bookmyshow.ddns.net/api',
  headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;