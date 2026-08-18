import { useEffect } from "react";
import axios from "axios";

import {
  getDashboardStatistics,
  getDashboardReport,
  getDailyRevenue,
} from "~/routes/dashboard/revenue/api/revenue.api";

import { useRevenueStore } from "~/store/revenue.store";

export function useRevenue() {
  const {
    /* =========================
       Statistics
    ========================= */

    statistics,
    statisticsLoading,
    statisticsError,

    setStatistics,
    setStatisticsLoading,
    setStatisticsError,

    /* =========================
       Report
    ========================= */

    report,
    reportLoading,
    reportError,

    setReport,
    setReportLoading,
    setReportError,

    /* =========================
       Daily Revenue
    ========================= */

    dailyRevenue,
    dailyRevenueLoading,
    dailyRevenueError,

    setDailyRevenue,
    setDailyRevenueLoading,
    setDailyRevenueError,
  } = useRevenueStore();

  /* =========================
     Fetch Statistics
  ========================= */

  const fetchStatistics = async () => {
    try {
      setStatisticsLoading(true);
      setStatisticsError(null);

      const data =
        await getDashboardStatistics();

      console.log(
        "🔥 Revenue Statistics:",
        data
      );

      setStatistics(data);
    } catch (error) {
      console.error(
        "❌ Revenue Statistics Error:",
        error
      );

      if (axios.isAxiosError(error)) {
        setStatisticsError(
          error.response?.data?.message ||
            "Failed to load revenue statistics"
        );
      } else {
        setStatisticsError(
          "Something went wrong"
        );
      }
    } finally {
      setStatisticsLoading(false);
    }
  };

  /* =========================
     Fetch Report
  ========================= */

  const fetchReport = async () => {
    try {
      setReportLoading(true);
      setReportError(null);

      const data =
        await getDashboardReport();

      console.log(
        "🔥 Revenue Report:",
        data
      );

      setReport(data);
    } catch (error) {
      console.error(
        "❌ Revenue Report Error:",
        error
      );

      if (axios.isAxiosError(error)) {
        setReportError(
          error.response?.data?.message ||
            "Failed to load revenue report"
        );
      } else {
        setReportError(
          "Something went wrong"
        );
      }
    } finally {
      setReportLoading(false);
    }
  };

  /* =========================
     Fetch Daily Revenue
  ========================= */

  const fetchDailyRevenue =
    async () => {
      try {
        setDailyRevenueLoading(true);
        setDailyRevenueError(null);

        const data =
          await getDailyRevenue();

        console.log(
          "🔥 Daily Revenue:",
          data
        );

        setDailyRevenue(data);
      } catch (error) {
        console.error(
          "❌ Daily Revenue Error:",
          error
        );

        if (
          axios.isAxiosError(error)
        ) {
          setDailyRevenueError(
            error.response?.data
              ?.message ||
              "Failed to load daily revenue"
          );
        } else {
          setDailyRevenueError(
            "Something went wrong"
          );
        }
      } finally {
        setDailyRevenueLoading(false);
      }
    };

  /* =========================
     Fetch All
  ========================= */

  const fetchRevenue = async () => {
    await Promise.all([
      fetchStatistics(),
      fetchReport(),
      fetchDailyRevenue(),
    ]);
  };

  /* =========================
     Initial Fetch
  ========================= */

  useEffect(() => {
    fetchRevenue();
  }, []);

  /* =========================
     Return
  ========================= */

  return {
    /* Statistics */

    statistics,
    statisticsLoading,
    statisticsError,

    fetchStatistics,

    /* Report */

    report,
    reportLoading,
    reportError,

    fetchReport,

    /* Daily Revenue */

    dailyRevenue,
    dailyRevenueLoading,
    dailyRevenueError,

    fetchDailyRevenue,

    /* All Revenue */

    fetchRevenue,
  };
}