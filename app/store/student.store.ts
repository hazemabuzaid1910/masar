import { create } from "zustand";
import type { Student } from "~/types/Student";

interface StudentStore {
  students: Student[];

  currentPage: number;
  lastPage: number;
  total: number;
  perPage: number;

  loading: boolean;
  error: string | null;

  setStudents: (students: Student[]) => void;
  setPagination: (
    currentPage: number,
    lastPage: number,
    total: number,
    perPage: number
  ) => void;

  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useStudentStore = create<StudentStore>((set) => ({
  students: [],

  currentPage: 1,
  lastPage: 1,
  total: 0,
  perPage: 10,

  loading: false,
  error: null,

  setStudents: (students) => set({ students }),

  setPagination: (
    currentPage,
    lastPage,
    total,
    perPage
  ) =>
    set({
      currentPage,
      lastPage,
      total,
      perPage,
    }),

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));