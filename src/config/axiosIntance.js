import Axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;
const authCode = import.meta.env.VITE_AUTH_CODE; // Get auth code from env

const axiosInstance = Axios.create({
  baseURL,
  timeout: 30000,
});

// Request interceptor to include fixed authorization from env
axiosInstance.interceptors.request.use(
  (config) => {
    if (authCode) {
      config.headers['Authorization'] = authCode;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor (simplified - no token handling needed)
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Common API functions
export const apiGet = async (url, params) => {
  try {
    const response = await axiosInstance.get(url, { params });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

export const apiPost = async (url, data) => {
  try {
    const response = await axiosInstance.post(url, data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

export const apiPut = async (url, data) => {
  try {
    const response = await axiosInstance.put(url, data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

export const apiDelete = async (url) => {
  try {
    const response = await axiosInstance.delete(url);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

export default axiosInstance;