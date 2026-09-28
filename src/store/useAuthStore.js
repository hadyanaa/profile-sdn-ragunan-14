import { create } from 'zustand';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "https://api.sdnragunan14pagi.sch.id";

export const getAuthHeaders = () => {
  const token = localStorage.getItem('dashboard_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const useAuthStore = create((set) => ({
  token: localStorage.getItem('dashboard_token') || null,
  isAuthenticated: !!localStorage.getItem('dashboard_token'),
  loading: false,
  error: null,

  login: async (username, password) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { username, password });
      const token = response.data?.token;
      if (!token) {
        throw new Error('Token autentikasi tidak ditemukan dalam respon server');
      }

      localStorage.setItem('dashboard_token', token);
      set({ 
        token, 
        isAuthenticated: true, 
        loading: false,
        error: null
      });
      return true;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Login gagal, periksa username dan password Anda';
      set({ 
        loading: false, 
        error: errorMessage
      });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('dashboard_token');
    set({ token: null, isAuthenticated: false, error: null });
  }
}));

export default useAuthStore;
