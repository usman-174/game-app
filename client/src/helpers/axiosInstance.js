import axios from 'axios';

const axiosInstance  = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000, // optional request timeout
});

export default axiosInstance ;