import { useEffect } from "react";
import axios from "axios";

import {
  getComparisonCategory,
  getDashboardStatistics,
  getLatestCourse,
  getPendingOrders,
} from "../routes/dashboard/home/api/home.api";

import { useHomeStore } from "~/store/home.store";

export function useDashboard() {
  const {
    statistics,
    pendingOrders,
    latestCourses,
    sectionComparison,
    loading,
    error,

    setStatistics,
    setPendingOrders,
    setLatestCourses,
    setSectionComparison,
    setLoading,
    setError,
  } = useHomeStore();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError(null);

        const [
          statisticsData,
          pendingOrdersData,
          latestCoursesData,
          sectionComparisonData,
        ] = await Promise.all([
          getDashboardStatistics(),
          getPendingOrders(),
          getLatestCourse(),
          getComparisonCategory(),
        ]);

        setStatistics(statisticsData);

        setPendingOrders(pendingOrdersData);

        setLatestCourses(latestCoursesData);

        setSectionComparison(
          sectionComparisonData.data
        );
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(
            error.response?.data?.message ||
              "Failed to load dashboard"
          );
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [
    setStatistics,
    setPendingOrders,
    setLatestCourses,
    setSectionComparison,
    setLoading,
    setError,
  ]);

  return {
    statistics,
    pendingOrders,
    latestCourses,
    sectionComparison,
    loading,
    error,
  };
}