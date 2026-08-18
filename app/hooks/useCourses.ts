import { useEffect } from "react";
import axios from "axios";

import {
  getCourses,
  getCoursesBySection,
} from "~/routes/dashboard/courses/api/courses.api";

import { useCourseStore } from "~/store/courses.store";

export function useCourses() {
  const {
    courses,
    loading,
    error,
    setCourses,
    setLoading,
    setError,
  } = useCourseStore();

  const fetchAllCourses = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("🔥 Fetching all courses...");

      const response = await getCourses();

      console.log("🔥 ALL RESPONSE:", response);
      console.log("🔥 ALL COURSES:", response.data);

      setCourses(response.data);

    } catch (error) {
      console.error(
        "❌ Fetch all courses error:",
        error
      );

      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ||
            "Failed to load courses"
        );
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchCoursesBySection = async (
    sectionId: number
  ) => {
    try {
      setLoading(true);
      setError(null);

      console.log(
        "🔥 fetchCoursesBySection CALLED"
      );

      console.log(
        "🔥 sectionId:",
        sectionId
      );

      const response =
        await getCoursesBySection(sectionId);

      console.log(
        "🔥 SECTION RESPONSE:",
        response
      );

      console.log(
        "🔥 SECTION COURSES:",
        response.data
      );

      setCourses(response.data);

    } catch (error) {
      console.error(
        "❌ Section courses error:",
        error
      );

      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ||
            "Failed to load courses"
        );
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  return {
    courses,
    loading,
    error,
    fetchAllCourses,
    fetchCoursesBySection,
  };
}