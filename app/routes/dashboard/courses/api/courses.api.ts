import { api } from "~/shared/api/api.axios";

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

export interface PaginatedCourses {
  current_page: number;
  data: Course[];
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

export const getCourses = async (): Promise<PaginatedCourses> => {
  const response = await api.get<PaginatedCourses | string>(
    "/admin/dashboard/course"
  );

  if (typeof response.data === "string") {
    return JSON.parse(
      response.data.replace(/^\uFEFF/, "")
    );
  }

  return response.data;
};

export const getCoursesBySection = async (
  sectionId: number
): Promise<PaginatedCourses> => {
  const response = await api.get<PaginatedCourses | string>(
    `/admin/sections/${sectionId}/courses`
  );

  if (typeof response.data === "string") {
    return JSON.parse(
      response.data.replace(/^\uFEFF/, "")
    );
  }

  return response.data;
};