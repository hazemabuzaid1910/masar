import { api } from "~/shared/api/api.axios";
import type { PaginatedStudentsResponse, Student, StudentDetails } from "~/types/Student";


export const getStudents = async (
  page = 1
): Promise<PaginatedStudentsResponse> => {
  const response = await api.get<PaginatedStudentsResponse | string>(
    `/admin/dashboard/students?page=${page}`
  );

  if (typeof response.data === "string") {
    return JSON.parse(
      response.data.replace(/^\uFEFF/, "")
    ) as PaginatedStudentsResponse;
  }

  return response.data;
};
export const getStudentDetails = async (
  studentId: number
): Promise<StudentDetails> => {
  const response = await api.get<StudentDetails | string>(
    `/admin/students/${studentId}`
  );

  if (typeof response.data === "string") {
    return JSON.parse(
      response.data.replace(/^\uFEFF/, "")
    ) as StudentDetails;
  }

  return response.data;
};