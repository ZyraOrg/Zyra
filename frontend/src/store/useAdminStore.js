import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useAdminStore = create(
  persist(
    (set) => ({
      isAdmin: false,
      adminLogin: () => set({ isAdmin: true }),
      adminLogout: () => set({ isAdmin: false }),
    }),
    {
      name: 'zyra-admin-session',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useAdminStore;
