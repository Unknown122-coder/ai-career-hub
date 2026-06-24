import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.example.com/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ── Request Interceptor ───────────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// ── Response Interceptor ──────────────────────
api.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function(resolve, reject) {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return api(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // In a real app, this would call /api/refresh-token
        // For this mock, we simulate a successful refresh
        const newToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock-refreshed-token';
        localStorage.setItem('auth_token', newToken);
        
        isRefreshing = false;
        processQueue(null, newToken);
        
        originalRequest.headers['Authorization'] = 'Bearer ' + newToken;
        return api(originalRequest);
      } catch (err) {
        isRefreshing = false;
        processQueue(err, null);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return Promise.reject(err);
      }
    }

    if (error.response) {
      const { status, data } = error.response;
      return Promise.reject({
        status,
        message: data?.message || 'Something went wrong',
        errors: data?.errors || {},
      });
    }

    if (error.request) {
      return Promise.reject({
        status: 0,
        message: 'Network error. Please check your connection.',
      });
    }

    return Promise.reject({
      status: -1,
      message: error.message,
    });
  }
);

export default api;
