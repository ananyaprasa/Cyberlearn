import axios from 'axios';

const isDev = import.meta.env.DEV;

// CSRF Token management
let csrfToken = null;

export const setCsrfToken = (token) => { csrfToken = token; };
export const getCsrfToken = () => csrfToken;

// Create Axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 30000, // increased for file uploads
  withCredentials: true,
  headers: {
    // Do NOT set Content-Type here — axios sets it automatically per request.
    // Setting it globally breaks multipart/form-data (missing boundary).
    'Accept': 'application/json',
  },
});

// Request interceptor - attach CSRF token to state-changing requests
axiosInstance.interceptors.request.use(
  (config) => {
    // If body is FormData, delete Content-Type so axios sets it automatically
    // with the correct multipart/form-data boundary.
    // For everything else, default to application/json.
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    } else if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json';
    }

    // Attach CSRF token to state-changing requests
    if (csrfToken && ['post', 'put', 'delete', 'patch'].includes(config.method?.toLowerCase())) {
      config.headers['X-CSRF-Token'] = csrfToken;
      config.headers['csrf-token'] = csrfToken;
      config.headers['x-csrf-token'] = csrfToken;
    }
    
    // Log request for debugging (dev only)
    if (isDev) {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    }
    
    return config;
  },
  (error) => {
    if (isDev) console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors globally and CSRF token refresh
axiosInstance.interceptors.response.use(
  (response) => {
    if (isDev) {
      console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url} [${response.status}]`);
    }
    return response;
  },
  async (error) => {
    if (isDev) {
      console.error('❌ API Error:', {
        url: error.config?.url,
        method: error.config?.method,
        status: error.response?.status,
        message: error.response?.data?.error || error.message,
      });
    }
    
    if (error.response?.status === 403 && 
        error.response?.data?.message?.includes('CSRF') && 
        !error.config._csrfRetry) {
      if (isDev) console.warn('🛡️ CSRF token invalid, attempting refresh...');
      try {
        const csrfResponse = await axiosInstance.get('/csrf-token');
        const newToken = csrfResponse.data.data.csrfToken;
        setCsrfToken(newToken);
        error.config._csrfRetry = true;
        error.config.headers['X-CSRF-Token'] = newToken;
        return axiosInstance.request(error.config);
      } catch (csrfError) {
        if (isDev) console.error('❌ CSRF token refresh failed:', csrfError);
        return Promise.reject(error);
      }
    }

    if (isDev) {
      if (error.response?.status === 401)  console.warn('🔒 Unauthorized');
      else if (error.response?.status === 403) console.warn('🚫 Forbidden');
      else if (error.response?.status === 404) console.warn('🔍 Not found:', error.config?.url);
      else if (error.response?.status >= 500) console.error('🔥 Server error');
      else if (error.code === 'ECONNABORTED') console.error('⏰ Request timeout');
      else if (!error.response) console.error('🌐 Network error');
    }
    
    return Promise.reject(error);
  }
);

// Helper function to handle API responses consistently
export const handleApiResponse = (response) => {
  // Backend returns { success: true, data: ... } format
  if (response.data && response.data.success) {
    return response.data.data;
  }
  
  // Fallback for direct data responses
  return response.data;
};

// Helper function to handle API errors consistently
export const handleApiError = (error) => {
  if (error.response?.data?.error) {
    return error.response.data.error;
  }
  
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  
  if (error.message) {
    return error.message;
  }
  
  return 'An unexpected error occurred';
};

// Export configured instance
export default axiosInstance;