import axios from 'axios';
import { toast } from 'react-hot-toast';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1',
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || 'Something went wrong';
    const requestUrl = error.config?.url || '';

    // Don't show toast for 401 errors on the 'me' endpoint (silent check)
    // Show toast for all other errors, including 401 on login
    if (error.response?.status === 401 && requestUrl.endsWith('/user/me')) {
      // Silent fail for background auth checks
    } else {
      toast.error(message);
    }

    return Promise.reject(error);
  }
);

export default api;
