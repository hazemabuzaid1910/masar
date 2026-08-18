import { useEffect } from "react";
import axios from "axios";

import { getCourseById } from "~/routes/dashboard/course/api/course.api";

import { useCourseStore } from "~/store/course.store";

export function useCourse(id?: number) {
  const {
    course,
    loading,
    error,

    setCourse,
    setLoading,
    setError,
  } = useCourseStore();

  const fetchCourse = async (
    courseId: number
  ) => {
    try {
      setLoading(true);
      setError(null);

      console.log(
        "🔥 Fetching course:",
        courseId
      );

      const data =
        await getCourseById(courseId);

      console.log(
        "🔥 Course:",
        data
      );

      setCourse(data);

    } catch (error) {

      console.error(
        "❌ Course Error:",
        error
      );

      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ||
            "Failed to load course"
        );
      } else {
        setError(
          "Something went wrong"
        );
      }

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;

    fetchCourse(id);
  }, [id]);

  return {
    course,
    loading,
    error,
    fetchCourse,
  };
}