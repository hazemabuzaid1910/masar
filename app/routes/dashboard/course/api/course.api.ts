import { api } from "~/shared/api/api.axios";

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

export interface CourseDetailsResponse {
  data: CourseDetails;
}

export const getCourseById = async (
  id: number
): Promise<CourseDetails> => {
  const response = await api.get<
    CourseDetailsResponse | string
  >(`/admin/dashboard/course/${id}`);

  const data =
    typeof response.data === "string"
      ? JSON.parse(
          response.data.replace(/^\uFEFF/, "")
        )
      : response.data;

  return data.data;
};