import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://localhost:5000/api', // Change if your backend runs elsewhere
  baseURL: process.env.REACT_APP_API_URL,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance; 