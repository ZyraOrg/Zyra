import { create } from 'zustand';

const useProfileStore = create((set) => ({
  profile: null,
  isComplete: false,

  setProfile: (profile, isComplete) => set({ profile, isComplete }),
  clearProfile: () => set({ profile: null, isComplete: false }),
}));

export default useProfileStore;
