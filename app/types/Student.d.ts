export interface Student {
  id: number;
  First_name: string;
  Last_name: string;
  email: string;
  role: string;
  device_id: string | null;
  fcm_token: string | null;
  created_at: string;
  updated_at: string;
}
export interface PaginatedStudentsResponse {
  current_page: number;
  data: Student[];
  last_page: number;
  total: number;
  per_page: number;
}
export interface StudentPersonalInfo {
  id: number;
  name: string;
  email: string;
  status: string;
}

export interface StudentActivitySummary {
  total_enrolled_courses: number;
  completed_courses_count: number;
  incomplete_courses_count: number;
}

export interface EnrolledCourse {
  id: number;
  name?: string;
  title?: string;
  [key: string]: unknown;
}

export interface StudentDetails {
  personal_info: StudentPersonalInfo;
  activity_summary: StudentActivitySummary;
  enrolled_courses: EnrolledCourse[];
  completed_courses: EnrolledCourse[];
}