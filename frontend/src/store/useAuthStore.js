import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

const timedStorage = {
  getItem: (name) => {
    try {
      const raw = localStorage.getItem(name);
      if (!raw) return null;
      const { value, timestamp } = JSON.parse(raw);
      if (Date.now() - timestamp > TWENTY_FOUR_HOURS) {
        localStorage.removeItem(name);
        return null;
      }
      return value;
    } catch {
      return null;
    }
  },
  setItem: (name, value) => {
    localStorage.setItem(name, JSON.stringify({ value, timestamp: Date.now() }));
  },
  removeItem: (name) => localStorage.removeItem(name),
};

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isLoading: true,

      setUser: (user) => set({ user, isLoading: false }),
      setLoading: (isLoading) => set({ isLoading }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'zyra-auth',
      storage: timedStorage,
      partialize: (state) => ({ user: state.user }),
    }
  )
);

export default useAuthStore;
