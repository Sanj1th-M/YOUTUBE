import axios from 'axios';
import { store, logoutSuccess, updateToken } from '../store';
import { tokenService } from './security/tokenService';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

// In-flight request deduplication map
const pendingRequests = new Map();

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Auth & Deduplication
apiClient.interceptors.request.use(
  (config) => {
    // 1. Auth Token Injection
    const token = tokenService.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 2. Request Deduplication
    const requestKey = `${config.method}:${config.url}:${JSON.stringify(config.params)}`;
    if (pendingRequests.has(requestKey)) {
      const source = axios.CancelToken.source();
      config.cancelToken = source.token;
      source.cancel('Duplicate request deduplicated');
    } else {
      const source = axios.CancelToken.source();
      config.cancelToken = source.token;
      pendingRequests.set(requestKey, source);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Cleanup & Token Refresh
apiClient.interceptors.response.use(
  (response) => {
    const requestKey = `${response.config.method}:${response.config.url}:${JSON.stringify(response.config.params)}`;
    pendingRequests.delete(requestKey);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (originalRequest) {
      const requestKey = `${originalRequest.method}:${originalRequest.url}:${JSON.stringify(originalRequest.params)}`;
      pendingRequests.delete(requestKey);
    }
    
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    // Handle 401 & Token Refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = tokenService.getRefreshToken();

      if (refreshToken) {
        try {
          const res = await axios.post(`${API_BASE_URL}/auth/refresh`, { refreshToken });
          const { accessToken } = res.data.data;
          
          tokenService.setAccessToken(accessToken);
          store.dispatch(updateToken(accessToken));
          
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          tokenService.clearTokens();
          store.dispatch(logoutSuccess());
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
