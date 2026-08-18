import { create } from "zustand";

export interface DashboardStatistics {
  total_revenue: number;
  monthly_revenue: number;
  daily_revenue: number;
  total_sales: number;
}

export interface DashboardReport {
  platform_share: number;
  teacher_earnings: number;
}

export interface DailyRevenueItem {
  month: string;
  sales: number;
}

interface RevenueState {


  statistics: DashboardStatistics | null;

  statisticsLoading: boolean;
  statisticsError: string | null;



  report: DashboardReport | null;

  reportLoading: boolean;
  reportError: string | null;


  dailyRevenue: DailyRevenueItem[];

  dailyRevenueLoading: boolean;
  dailyRevenueError: string | null;



  setStatistics: (
    statistics: DashboardStatistics
  ) => void;

  setStatisticsLoading: (
    loading: boolean
  ) => void;

  setStatisticsError: (
    error: string | null
  ) => void;


  setReport: (
    report: DashboardReport
  ) => void;

  setReportLoading: (
    loading: boolean
  ) => void;

  setReportError: (
    error: string | null
  ) => void;

  setDailyRevenue: (
    revenue: DailyRevenueItem[]
  ) => void;

  setDailyRevenueLoading: (
    loading: boolean
  ) => void;

  setDailyRevenueError: (
    error: string | null
  ) => void;



  reset: () => void;
}

export const useRevenueStore =
  create<RevenueState>((set) => ({


    statistics: null,

    statisticsLoading: false,

    statisticsError: null,


    report: null,

    reportLoading: false,

    reportError: null,

 

    dailyRevenue: [],

    dailyRevenueLoading: false,

    dailyRevenueError: null,

    setStatistics: (statistics) =>
      set({
        statistics,
        statisticsError: null,
      }),

    setStatisticsLoading: (loading) =>
      set({
        statisticsLoading: loading,
      }),

    setStatisticsError: (error) =>
      set({
        statisticsError: error,
      }),


    setReport: (report) =>
      set({
        report,
        reportError: null,
      }),

    setReportLoading: (loading) =>
      set({
        reportLoading: loading,
      }),

    setReportError: (error) =>
      set({
        reportError: error,
      }),

    setDailyRevenue: (revenue) =>
      set({
        dailyRevenue: revenue,
        dailyRevenueError: null,
      }),

    setDailyRevenueLoading: (loading) =>
      set({
        dailyRevenueLoading: loading,
      }),

    setDailyRevenueError: (error) =>
      set({
        dailyRevenueError: error,
      }),


    reset: () =>
      set({
        statistics: null,
        statisticsLoading: false,
        statisticsError: null,

        report: null,
        reportLoading: false,
        reportError: null,

        dailyRevenue: [],
        dailyRevenueLoading: false,
        dailyRevenueError: null,
      }),
  }));