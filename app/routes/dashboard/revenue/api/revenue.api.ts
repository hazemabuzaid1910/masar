import { api } from "~/shared/api/api.axios";

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

export const getDashboardStatistics =
  async (): Promise<DashboardStatistics> => {
    const response = await api.get<unknown>(
      "/admin/dashboard/revenue"
    );

    console.log(
      "🔥 Dashboard Statistics:",
      response.data
    );

    const data =
      typeof response.data === "string"
        ? JSON.parse(
            response.data.replace(/^\uFEFF/, "")
          )
        : response.data;

    return {
      total_revenue: Number(data.total_revenue),
      monthly_revenue: Number(data.monthly_revenue),
      daily_revenue: Number(data.daily_revenue),
      total_sales: Number(data.total_sales),
    };
  };


export const getDashboardReport =
  async (): Promise<DashboardReport> => {
    const response = await api.get<unknown>(
      "/admin/dashboard/revenue/report"
    );

    console.log(
      "🔥 Dashboard Report:",
      response.data
    );

    const data =
      typeof response.data === "string"
        ? JSON.parse(
            response.data.replace(/^\uFEFF/, "")
          )
        : response.data;

    return {
      platform_share: Number(
        data.platform_share ?? 0
      ),

      teacher_earnings: Number(
        data.teacher_earnings ?? 0
      ),
    };
  };


export const getDailyRevenue =
  async (): Promise<DailyRevenueItem[]> => {
    const response = await api.get<unknown>(
      "/admin/dashboard/revenue/daily"
    );

    console.log(
      "🔥 Daily Revenue:",
      response.data
    );

    const data =
      typeof response.data === "string"
        ? JSON.parse(
            response.data.replace(/^\uFEFF/, "")
          )
        : response.data;

    return (data as any[]).map((item) => ({
      month: item.month,
      sales: Number(item.sales ?? 0),
    }));
  };