import { Icon } from "@iconify/react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import AreaChartExample from "~/components/Chart";
import TwoLevelPieChart from "~/components/Chart2";

import StatisticCard from "~/components/StatisticCard";
import { useRevenue } from "~/hooks/useRevenue";

export function meta() {
  return [
    { title: "Revenue" },
    {
      name: "description",
      content: "Revenue Management Dashboard",
    },
  ];
}

export default function Revenue() {
const {
  statistics,
  statisticsLoading,
  statisticsError,

  report,
  reportLoading,
  reportError,

  dailyRevenue,
  dailyRevenueLoading,
} = useRevenue();

 if (statisticsLoading || reportLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading revenue...
      </div>
    );
  }

 if (statisticsError || reportError) {{
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
      {statisticsError || reportError}
      </div>
    );
  }}
  return (
    <div className="bg-neutral-100 text-black grid grid-cols-12 min-h-screen w-full text-lg">
      {/* MAIN CONTENT */}
      <div className="col-span-9 flex flex-col gap-5 px-5 py-10">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon
              icon="material-symbols:payments-rounded"
              color="#5347c5"
            />
            <h1 className="text-xl font-semibold">Revenue</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-white p-2 rounded-full relative">
              <Icon icon="clarity:notification-line" color="#464646" />
              <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-400"></div>
            </div>

            <div className="bg-white p-2 rounded-full">
              <Icon icon="mdi-light:email" color="#464646" />
            </div>
          </div>
        </div>

        {/* STATISTICS */}
        <div className="grid grid-cols-4 gap-2 w-full">
          <StatisticCard
            title="Total Revenue"
            icon="streamline:payment-10"
            number={statistics?.total_revenue ?? 0}
            color="#8E24AA"
          />

          <StatisticCard
            title="Monthly Revenue"
            icon="material-symbols:calendar-month-outline"
            number={statistics?.monthly_revenue ?? 0}
            color="#BC3189"
          />

          <StatisticCard
            title="Today Revenue"
            icon="material-symbols-light:today-outline"
            number={statistics?.daily_revenue ?? 0}

            color="#31AEBC"
          />

          <StatisticCard
            title="Total Sales"
            icon="icon-park-outline:sales-report"
            number={statistics?.total_sales ?? 0}
            color="#5347C5"
          />
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-3 gap-5 w-full">
          {/* REVENUE OVERVIEW */}
          <div className="col-span-2 bg-white rounded-lg px-4 pt-4 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <h2 className="font-semibold text-base">
                  Revenue Overview
                </h2>
                 
                <p className="text-sm text-gray-500">
                  Revenue comparison between current and previous month
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="relative h-2 w-2">
                    <div className="absolute top-1/2 -right-1 h-0.5 w-4 -translate-y-1/2 bg-[#FF82BA]" />
                    <div className="absolute inset-0 rounded-full border border-[#FF82BA] bg-white" />
                  </div>

                  <span className="text-sm">Previous Month</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative h-2 w-2">
                    <div className="absolute top-1/2 -right-1 h-0.5 w-4 -translate-y-1/2 bg-[#8979FF]" />
                    <div className="absolute inset-0 rounded-full border border-[#8979FF] bg-white" />
                  </div>

                  <span className="text-sm">Current Month</span>
                </div>
              </div>
            </div>

           <AreaChartExample
  data={dailyRevenue}
  xAxisKey="month"
  series={[
    {
      dataKey: "sales",
      name: "Revenue",
      fill: "#8979FF",
    },
  ]}
/> 
          </div>

          {/* REVENUE DISTRIBUTION */}
          <div className="col-span-1 bg-white rounded-lg px-4 py-2 flex flex-col items-center justify-center">
            <div className="flex flex-col gap-1 w-full">
              <h2 className="font-semibold text-base">
                Revenue Distribution
              </h2>

              <p className="text-sm text-gray-500">
                Platform share vs mentor share
              </p>
            </div>
  <TwoLevelPieChart
    firstValue={report?.platform_share ?? 0}
    secondValue={report?.teacher_earnings ?? 0}
  />
            {/* <TwoLevelPieChart /> */}

            <div className="flex justify-center items-center gap-10 w-full">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF82BA]" />
                <span className="text-sm">Platform</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#8979FF]" />
                <span className="text-sm">Mentors</span>
              </div>
            </div>
          </div>
        </div>

        {/* RECENT TRANSACTIONS */}
        <div className="bg-white rounded-lg p-5 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-base">
              Recent Transactions
            </h2>

            <button className="text-sm text-[#8E24AA] font-medium">
              View All
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-[#ebebeb] pb-3">
              <div>
                <h3 className="font-medium">Ahmed Ali</h3>
                <p className="text-sm text-gray-500">
                  React Mastery Course
                </p>
              </div>

              <div className="text-right">
                <p className="font-semibold text-green-600">$49</p>
                <p className="text-sm text-gray-500">Paid</p>
              </div>
            </div>

            <div className="flex items-center justify-between border-b border-[#ebebeb] pb-3">
              <div>
                <h3 className="font-medium">Sara Mohammad</h3>
                <p className="text-sm text-gray-500">
                  Flutter Bootcamp
                </p>
              </div>

              <div className="text-right">
                <p className="font-semibold text-green-600">$35</p>
                <p className="text-sm text-gray-500">Paid</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Yousef Ahmad</h3>
                <p className="text-sm text-gray-500">
                  AI Fundamentals
                </p>
              </div>

              <div className="text-right">
                <p className="font-semibold text-green-600">$59</p>
                <p className="text-sm text-gray-500">Paid</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SIDEBAR */}
      <div className="col-span-3 bg-white min-h-screen px-4 pt-5 flex flex-col gap-4">
        {/* CALENDAR */}
        <Calendar
          locale="en-US"
          className="border-none! shadow-none!"
        />

        {/* TOP COURSE */}
        <div className="bg-neutral-100 rounded-lg p-4 flex flex-col gap-2">
          <h2 className="font-semibold">Top Earning Course</h2>

          <p className="text-[#8E24AA] font-medium">
            React Mastery
          </p>

          <div className="flex justify-between text-sm">
            <span>Revenue</span>
            <span>$12,450</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Sales</span>
            <span>320</span>
          </div>
        </div>

        {/* REVENUE INSIGHTS */}
        <div className="bg-neutral-100 rounded-lg p-4 flex flex-col gap-3">
          <h2 className="font-semibold">Revenue Insights</h2>

          <div className="flex items-center gap-2 text-green-600">
            <Icon icon="mdi:trending-up" />
            <span className="text-sm">
              Revenue increased 15% this month
            </span>
          </div>

          <div className="text-sm">
            <span className="font-medium">Best Day:</span> Thursday
          </div>

          <div className="text-sm">
            <span className="font-medium">Top Category:</span>{" "}
            Programming
          </div>
        </div>
      </div>
    </div>
  );
}