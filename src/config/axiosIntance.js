import Axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

// Create base axios instance for public requests (no auth required)
const publicAxiosInstance = Axios.create({
  baseURL,
  timeout: 30000,
});

// Create authenticated axios instance for protected requests
const authAxiosInstance = Axios.create({
  baseURL,
  timeout: 30000,
});

// Request interceptor for authenticated requests
authAxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for authenticated requests
authAxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle token expiration
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Public API functions (no authentication required)
export const publicApiGet = async (url, params) => {
  try {
    const response = await publicAxiosInstance.get(url, { params });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

export const publicApiPost = async (url, data) => {
  try {
    const response = await publicAxiosInstance.post(url, data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

// Authenticated API functions (authentication required)
export const authApiGet = async (url, params) => {
  try {
    const response = await authAxiosInstance.get(url, { params });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

export const authApiPost = async (url, data) => {
  try {
    const response = await authAxiosInstance.post(url, data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

export const authApiPut = async (url, data) => {
  try {
    const response = await authAxiosInstance.put(url, data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

export const authApiDelete = async (url) => {
  try {
    const response = await authAxiosInstance.delete(url);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

// Legacy functions for backward compatibility (using public instance)
export const apiGet = publicApiGet;
export const apiPost = publicApiPost;
export const apiPut = publicApiPost; // Using POST for public
export const apiDelete = publicApiPost; // Using POST for public

export default publicAxiosInstance;