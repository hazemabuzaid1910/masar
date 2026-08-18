import { create } from "zustand";

export interface CourseTeacher {
  id: number;
  First_name: string;
  Last_name: string;
  email: string;
  email_verified_at?: string | null;
  device_id?: string | null;
  fcm_token?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  level: string | null;
  image: string | null;
  price: string;
  discount: string;

  teacher_id: number;

  teacher?: CourseTeacher;

  status: string;

  created_at: string | null;
  updated_at: string | null;

  section_id: number;

  evaluations_avg_rating?: number | null;
  videos_count?: number;
}

interface CourseState {
  courses: Course[];
  loading: boolean;
  error: string | null;

  setCourses: (
    courses: Course[]
  ) => void;

  setLoading: (
    loading: boolean
  ) => void;

  setError: (
    error: string | null
  ) => void;

  reset: () => void;
}

export const useCourseStore =
  create<CourseState>((set) => ({
    courses: [],

    loading: false,

    error: null,

    setCourses: (courses) =>
      set({
        courses,
      }),

    setLoading: (loading) =>
      set({
        loading,
      }),

    setError: (error) =>
      set({
        error,
      }),

    reset: () =>
      set({
        courses: [],
        loading: false,
        error: null,
      }),
  }));