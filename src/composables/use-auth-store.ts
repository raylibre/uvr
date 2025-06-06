import { ref } from 'vue';
import { login as loginApi, register as registerApi } from '~/services/api/auth-api-service';
import type { User } from '~/interfaces/auth';

const user = ref<User | null>(null);
const isAuthenticated = ref(false);

export function useAuthStore() {
  const login = async (credentials: { identifier: string; password: string }) => {
    const response = await loginApi(credentials);
    user.value = response.user;
    isAuthenticated.value = true;
    // Store token in secure storage
    localStorage.setItem('token', response.token);
  };

  const register = async (credentials: { email: string; phone: string; password: string }) => {
    const response = await registerApi(credentials);
    user.value = response.user;
    isAuthenticated.value = true;
    // Store token in secure storage
    localStorage.setItem('token', response.token);
  };

  const logout = () => {
    user.value = null;
    isAuthenticated.value = false;
    localStorage.removeItem('token');
  };

  const getUser = () => user.value;
  const getIsAuthenticated = () => isAuthenticated.value;

  return {
    login,
    register,
    logout,
    getUser,
    getIsAuthenticated
  };
} 