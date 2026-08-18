import { api } from "~/shared/api/api.axios";

export interface DashboardStatistics {
  total_students: number;
  total_courses: number;
  total_teachers: number;
  active_users: number;
  inactive_users: number;
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
    email_verified_at: string | null;
    device_id: string | null;
    fcm_token: string | null;
    created_at: string;
    updated_at: string;
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

export interface PaginatedSectionComparison {
  current_page: number;
  data: SectionComparison[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    url: string | null;
    label: string;
    page: number | null;
    active: boolean;
  }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}
export interface PendingOrders {
  course_pending_orders: number;
  teacher_pending_orders: number;
}
export const getDashboardStatistics = async (): Promise<DashboardStatistics> => {
  const response = await api.get<unknown>(
    "/admin/dashboard/statistics"
  );
  console.log(response.data)
  if (typeof response.data === "string") {
    return JSON.parse(response.data.replace(/^\uFEFF/, "")) as DashboardStatistics;
  }
  return response.data as DashboardStatistics;
};
export const getLatestCourse = async (): Promise<Course[]> => {
  const response = await api.get<unknown>(
    "/admin/dashboard/latest-courses"
  );
  console.log(response.data)
  if (typeof response.data === "string") {
    return JSON.parse(response.data.replace(/^\uFEFF/, "")) as Course[];
  }
  return response.data as Course[];
};
export const getComparisonCategory = async (): Promise<PaginatedSectionComparison> => {
  const response = await api.get<unknown>(
    "/admin/dashboard/section-comparison"
  );

  console.log(response.data);

  if (typeof response.data === "string") {
    return JSON.parse(
      response.data.replace(/^\uFEFF/, "")
    ) as PaginatedSectionComparison;
  }

  return response.data as PaginatedSectionComparison;
};
export const getPendingOrders = async (): Promise<PendingOrders> => {
  const response = await api.get<unknown>(
    "/admin/dashboard/pending-orders"
  );

  console.log(response.data);

  if (typeof response.data === "string") {
    return JSON.parse(
      response.data.replace(/^\uFEFF/, "")
    ) as PendingOrders;
  }

  return response.data as PendingOrders;
};