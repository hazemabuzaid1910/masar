import { api } from "~/shared/api/api.axios";

export interface OrderUser {
  id: number;
  First_name: string;
  Last_name: string;
}

export interface OrderCourse {
  id: number;
  title: string;
  teacher_id: number;
}

export interface Order {
  id: number;
  status: string;
  user: OrderUser;
  courses: OrderCourse[];
  created_at: string;
}

export interface PaginatedOrdersResponse {
  current_page: number;
  data: Order[];
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  per_page: number;
  total: number;
}

export interface PendingCourse {
  id: number;
  title: string;
  description: string;
  level: string | null;
  image: string | null;
  price: string;
  discount: string;
  teacher_id: number;
  status: string;
  created_at: string | null;
  updated_at: string | null;
  section_id: number;
}

export interface PendingCoursesPagination {
  current_page: number;
  data: PendingCourse[];
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}

export interface PendingCoursesResponse {
  pending_courses: PendingCoursesPagination;
}

/* =========================
   Pending Courses
========================= */

export const getPendingCourses = async (): Promise<PendingCourse[]> => {
  const response = await api.get<PendingCoursesResponse | string>(
    "/admin/dashboard/course/pending"
  );

  let data: PendingCoursesResponse;

  if (typeof response.data === "string") {
    data = JSON.parse(response.data.replace(/^\uFEFF/, ""));
  } else {
    data = response.data;
  }

  console.log("Pending Courses API:", data);

  return data.pending_courses.data;
};

/* =========================
   Orders
========================= */

export const getOrders = async (): Promise<Order[]> => {
  const response = await api.get<PaginatedOrdersResponse | string>(
    "/admin/dashboard/orders"
  );

  let data: PaginatedOrdersResponse;

  if (typeof response.data === "string") {
    data = JSON.parse(response.data.replace(/^\uFEFF/, ""));
  } else {
    data = response.data;
  }

  console.log("Orders API:", data);

  return data.data;
};

/* =========================
   Publish Course
========================= */

export interface PublishCourseResponse {
  message: string;
}

/* =========================
   Publish Course
========================= */

export interface PublishCourseResponse {
  message: string;
}

export const publishCourse = async (
  courseId: number
): Promise<PublishCourseResponse> => {
  const response = await api.post<PublishCourseResponse>(
    `/admin/courses/${courseId}/publish`
  );

  return response.data;
};

/* =========================
   Reject Course
========================= */

export interface RejectCourseResponse {
  message: string;
}

export const rejectCourse = async (
  courseId: number
): Promise<RejectCourseResponse> => {
  const response = await api.post<RejectCourseResponse>(
    `/admin/courses/${courseId}/reject`
  );

  return response.data;
};
export interface UpdateOrderStatusResponse {
  message: string;
}

export const markOrderAsPaid = async (
  orderId: number
): Promise<UpdateOrderStatusResponse> => {
  const response =
    await api.put<UpdateOrderStatusResponse>(
      `/admin/dashboard/updateStatusToPaid/${orderId}`
    );

  return response.data;
};

export const markOrderAsFailed = async (
  orderId: number
): Promise<UpdateOrderStatusResponse> => {
  const response =
    await api.put<UpdateOrderStatusResponse>(
      `/admin/dashboard/updateStatusToFailed/${orderId}`
    );

  return response.data;
};