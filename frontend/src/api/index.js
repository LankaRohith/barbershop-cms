import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Don't redirect if already on login page or if this was a login request
      const isLoginPage = window.location.pathname === '/admin/login';
      const isLoginRequest = error.config?.url?.includes('/auth/login');
      
      if (!isLoginPage && !isLoginRequest) {
        localStorage.removeItem('token');
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// Public API calls
export const getServices = () => api.get('/services');
export const getEmployees = () => api.get('/employees');
export const getGallery = () => api.get('/gallery');

// Auth API calls
export const login = (credentials) => api.post('/auth/login', credentials);

// Admin API calls
export const getAdminServices = () => api.get('/admin/services');
export const createService = (data) => api.post('/admin/services', data);
export const updateService = (id, data) => api.patch(`/admin/services/${id}`, data);
export const deleteService = (id) => api.delete(`/admin/services/${id}`);

export const getAdminEmployees = () => api.get('/admin/employees');
export const createEmployee = (data) => api.post('/admin/employees', data);
export const updateEmployee = (id, data) => api.patch(`/admin/employees/${id}`, data);
export const deleteEmployee = (id) => api.delete(`/admin/employees/${id}`);

export const getAdminGallery = () => api.get('/admin/gallery');
export const uploadGalleryImage = (formData) => {
  return api.post('/admin/gallery/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
export const deleteGalleryImage = (id) => api.delete(`/admin/gallery/${id}`);

export default api;
