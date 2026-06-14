import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { setAdminToken, clearAdminToken } from '../services/api';

const API = import.meta.env.VITE_API_BASE_URL;

const useAdminStore = create(
  persist(
    (set) => ({
      isAdmin: false,
      adminEmail: null,
      adminLogin: async (email, password) => {
        const res = await fetch(`${API}/api/admin/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || 'Login failed');
        setAdminToken(data.access_token);
        set({ isAdmin: true, adminEmail: email });
      },
      adminLogout: () => {
        clearAdminToken();
        set({ isAdmin: false, adminEmail: null });
      },
    }),
    {
      name: 'zyra-admin-session',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useAdminStore;
