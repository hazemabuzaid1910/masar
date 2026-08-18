import { useEffect } from "react";
import axios from "axios";

import { getStudents } from "~/routes/dashboard/students/api/student.api";
import { useStudentStore } from "~/store/student.store";

export function useStudents(page = 1) {
  const {
    students,
    currentPage,
    lastPage,
    total,
    perPage,

    loading,
    error,

    setStudents,
    setPagination,
    setLoading,
    setError,
  } = useStudentStore();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getStudents(page);

        setStudents(response.data);

        setPagination(
          response.current_page,
          response.last_page,
          response.total,
          response.per_page
        );
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(
            error.response?.data?.message ||
              "Failed to load students"
          );
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [page]);

  return {
    students,
    currentPage,
    lastPage,
    total,
    perPage,
    loading,
    error,
  };
}