import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'https://btbmqvawpokfwptcrmem.supabase.co',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Check for user token first (for authenticated requests)
    const userToken = localStorage.getItem('token');
    if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    } else {
      // Use Supabase anon key for public API requests
      const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0Ym1xdmF3cG9rZndwdGNybWVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4NzUwODksImV4cCI6MjA2NDQ1MTA4OX0.8izmlGlzinrsCUHMyH_WpFEfeTCp3t1yfHYDcnmhDws';
      config.headers.Authorization = `Bearer ${anonKey}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global error cases
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;