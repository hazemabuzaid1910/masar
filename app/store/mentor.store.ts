import { create } from "zustand";
import type { Mentor } from "~/routes/dashboard/mentors/api/mentor.api";



interface MentorStore {
  mentors: Mentor[];
  loading: boolean;
  error: string | null;

  setMentors: (mentors: Mentor[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useMentorStore = create<MentorStore>((set) => ({
  mentors: [],
  loading: false,
  error: null,

  setMentors: (mentors) => set({ mentors }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));