import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const API = import.meta.env.VITE_API_BASE_URL;

const useAdminStore = create(
  persist(
    (set) => ({
      isAdmin: false,
      adminLogin: async (email, password) => {
        const res = await fetch(`${API}/api/admin/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Login failed');
        set({ isAdmin: true });
      },
      adminLogout: () => set({ isAdmin: false }),
    }),
    {
      name: 'zyra-admin-session',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useAdminStore;
