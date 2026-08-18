import { create } from "zustand";

export interface CourseLesson {
  id: number;
  title: string;
  duration: number;
}

export interface CourseDetails {
  id: number;
  title: string;
  description: string;
  price: string;
  image_path:string;
  teacher_id: number;
  teacher: string;
  students_count: number;
  rating: number;
  lessons: CourseLesson[];
}

interface CourseState {
  course: CourseDetails | null;

  loading: boolean;

  error: string | null;

  setCourse: (course: CourseDetails) => void;

  setLoading: (loading: boolean) => void;

  setError: (error: string | null) => void;

  reset: () => void;
}

export const useCourseStore =
  create<CourseState>((set) => ({
    course: null,

    loading: false,

    error: null,

    setCourse: (course) =>
      set({
        course,
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
        course: null,
        loading: false,
        error: null,
      }),
  }));