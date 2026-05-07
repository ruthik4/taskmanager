import axios from 'axios';

// Switch to your Railway URL when pushing to production
const BASE_URL = 'http://localhost:8080';
// const BASE_URL = 'https://taskmanager-production-76f3.up.railway.app';

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
