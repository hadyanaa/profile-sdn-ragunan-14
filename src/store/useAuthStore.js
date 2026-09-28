import { create } from 'zustand';

const useAuthStore = create((set) => ({
  token: localStorage.getItem('dashboard_token') || null,
  isAuthenticated: !!localStorage.getItem('dashboard_token'),
  loading: false,
  error: null,

  login: async (username, password) => {
    set({ loading: true, error: null });
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Static check for now
      if (username === 'admin' && password === 'admin123') {
        const fakeToken = 'fake-jwt-token-12345';
        localStorage.setItem('dashboard_token', fakeToken);
        set({ 
          token: fakeToken, 
          isAuthenticated: true, 
          loading: false,
          error: null
        });
        return true;
      } else {
        throw new Error('Username atau password salah');
      }

      /* 
      // TODO: Replace with actual API call later
      // const API_URL = import.meta.env.VITE_API_URL || "https://api.sdnragunan14pagi.sch.id";
      // const response = await axios.post(`${API_URL}/auth/login`, { username, password });
      // const { token } = response.data;
      // localStorage.setItem('dashboard_token', token);
      // set({ token, isAuthenticated: true, loading: false });
      // return true;
      */
    } catch (error) {
      set({ 
        loading: false, 
        error: error.response?.data?.message || error.message || 'Login gagal' 
      });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('dashboard_token');
    set({ token: null, isAuthenticated: false });
  }
}));

export default useAuthStore;
