import { create } from 'zustand';
import api from '../services/api';
import toast from 'react-hot-toast';

const useAuthStore = create((set) => ({
  user: null,
  isCheckingAuth: true,
  isAuthenticated: false,

  checkAuth: async (navigate) => {
    try {
      const userData = await api.getUser();
      set({ user: userData, isCheckingAuth: false, isAuthenticated: true });
    } catch (err) {
      set({ user: null, isCheckingAuth: false, isAuthenticated: false });
      const status = err?.response?.status;
      if (status === 401 || status === 403) {
        toast.error("Please log in to continue");
        if (navigate) {
          navigate("/login", { replace: true });
        }
      }
    }
  },

  setUser: (user) => set({ user, isAuthenticated: !!user }),

  logout: () => set({ user: null, isAuthenticated: false }),
}));

export default useAuthStore;
