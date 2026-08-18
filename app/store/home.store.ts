import { create } from "zustand";

export interface DashboardStatistics {
  total_students: number;
  total_courses: number;
  total_teachers: number;
  active_users: number;
  inactive_users: number;
}

export interface PendingOrders {
  course_pending_orders: number;
  teacher_pending_orders: number;
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
  status: string;
  created_at: string;
  updated_at: string;
  section_id: number;
  Number_of_students: number;

  teacher: {
    id: number;
    First_name: string;
    Last_name: string;
    email: string;
  };
}

export interface SectionComparison {
  id: number;
  name: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
  courses_current_month_count: number;
  courses_last_month_count: number;
}

interface HomeState {
  statistics: DashboardStatistics | null;

  pendingOrders: PendingOrders | null;

  latestCourses: Course[];

  sectionComparison: SectionComparison[];

  loading: boolean;
  error: string | null;

  setStatistics: (
    statistics: DashboardStatistics
  ) => void;

  setPendingOrders: (
    pendingOrders: PendingOrders
  ) => void;

  setLatestCourses: (
    courses: Course[]
  ) => void;

  setSectionComparison: (
    sections: SectionComparison[]
  ) => void;

  setLoading: (
    loading: boolean
  ) => void;

  setError: (
    error: string | null
  ) => void;

  reset: () => void;
}

export const useHomeStore = create<HomeState>((set) => ({
  statistics: null,

  pendingOrders: null,

  latestCourses: [],

  sectionComparison: [],

  loading: false,

  error: null,

  setStatistics: (statistics) =>
    set({ statistics }),

  setPendingOrders: (pendingOrders) =>
    set({ pendingOrders }),

  setLatestCourses: (latestCourses) =>
    set({ latestCourses }),

  setSectionComparison: (sectionComparison) =>
    set({ sectionComparison }),

  setLoading: (loading) =>
    set({ loading }),

  setError: (error) =>
    set({ error }),

  reset: () =>
    set({
      statistics: null,
      pendingOrders: null,
      latestCourses: [],
      sectionComparison: [],
      loading: false,
      error: null,
    }),
}));