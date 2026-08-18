import { Icon } from "@iconify/react";
import Calendar from "react-calendar";
import AreaChartExample from "~/components/Chart";
import TwoLevelPieChart from "~/components/Chart2";
import RadialBarChartClickToFocusLegendExample from "~/components/Chart2";
import StatisticCard from "~/components/StatisticCard";
import StudentCard from "~/components/StudentCard";
import "react-calendar/dist/Calendar.css";
import NewCourse from "~/components/NewCourse";
import PendingAction from "~/components/PendingAction";
import { useDashboard } from "~/hooks/useDashboard";
import { useHomeStore } from "~/store/home.store";

export function meta({}: any) {
  return [
    { title: "Home" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
const {
  statistics,
  pendingOrders,
  latestCourses,
  sectionComparison,
  loading,
  error,
} = useDashboard();

  console.log(statistics?.total_students)
  return (
    <div className="text-black bg-neutral-100  grid grid-cols-12 min-h-screen    text-lg w-full   ">
      <div className=" flex flex-col gap-5 col-span-9 py-10  px-5 ">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon icon={"material-symbols:dashboard-rounded"} color="#5347c5" />
            <h1  className="text-xl font-semibold">Dashboard</h1>
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-4">
              <div className="bg-white p-2 rounded-full relative">
                <Icon icon="clarity:notification-line" color="#464646" />
                <div className="w-2 h-2 bg-red-400 rounded-full absolute right-2 top-2"></div>
              </div>
              <div className="bg-white p-2 rounded-full">
                <Icon icon="mdi-light:email" color="#464646" />
              </div>{" "}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3  gap-5  w-full">
          <StatisticCard
            color="#8E24AA"
            title="Students"
            number={statistics?.total_students ?? 0}
            increase={5}
            link="students"
          />
          <StatisticCard
            color="#bc3189"
            title="Courses"
            number={statistics?.total_courses ?? 0}
            increase={10}
            link="courses"
          />
          <StatisticCard
            color="#31aebc"
            title="Mentors"
            number={statistics?.total_teachers ?? 0}
            increase={15}
            link="mentors"
          />
        </div>
        <div className="grid grid-cols-3 gap-5 w-full">
          <div className="col-span-2 bg-white flex-col px-4 gap-4 pt-4 rounded-lg flex  justify-start">
            <div className="flex items-center justify-between">
              {" "}
              <div className="flex  flex-col gap-1 w-full">
                <h2 className="font-semibold text-base">Courses by Category</h2>
                <p className=" text-gray-500 mb-2 text-sm">
                  comparison between current and previous month
                </p>
              </div>
              <div className="flex flex-col gap-2 items-start">
                <div className="flex items-center gap-2 ">
                  <div className="relative w-2 h-2">
                    <div className="absolute top-1/2 -right-1 w-4 h-0.5 -translate-y-1/2 bg-[#FF82BA]"></div>

                    <div className="absolute inset-0 rounded-full bg-white border border-[#FF82BA]"></div>
                  </div>
                  <span className="text-sm">Febrewary</span>
                </div>
              
              <div className="flex items-center gap-2 ">
                <div className="relative w-2 h-2">
                  <div className="absolute top-1/2 -right-1 w-4 h-0.5 -translate-y-1/2 bg-[#8979FF]"></div>

                  <div className="absolute inset-0 rounded-full bg-white border border-[#8979FF]"></div>
                </div>
                <span className="text-sm">March</span>
              </div>
            </div></div>
         <AreaChartExample
  data={sectionComparison.map((section) => ({
    name: section.name,
    currentMonth:
      section.courses_current_month_count,
    lastMonth:
      section.courses_last_month_count,
  }))}
  xAxisKey="name"
  series={[
    {
      dataKey: "currentMonth",
      name: "Current Month",
      fill: "#FF82BA",
    },
    {
      dataKey: "lastMonth",
      name: "Last Month",
      fill: "#8979FF",
    },
  ]}
/>
          </div>
          <div className="col-span-1 bg-white flex-col px-4 py-2  rounded-lg flex items-center justify-center">
            <div className="flex  flex-col gap-1 w-full">
              <h2 className="font-semibold text-base">Student Activity</h2>
              <p className=" text-gray-500 mb-2 text-sm">Active Vs inactive students</p>
            </div>
            <TwoLevelPieChart
  firstValue={statistics?.active_users ?? 0}
  secondValue={statistics?.inactive_users ?? 0}
/>
            <div className="flex items-center justify-center gap-10 w-full ">
              <div className="flex items-center gap-2 ">
                <span className="bg-[#FF82BA] w-3 h-3 rounded-full "></span>
                <span className="text-sm">Active</span>
              </div>
              <div className="flex items-center gap-2 ">
                <span className="bg-[#8979FF] w-3 h-3 rounded-full "></span>
                <span className="text-sm">Inactive</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-5 bg-white p-5 rounded-lg">
          <h2 className="font-semibold text-base">Recent students added</h2>
          <StudentCard />
          <StudentCard />
          <StudentCard />
        </div>
      </div>
      <div className=" bg-white col-span-3 px-4 pt-5 flex flex-col gap-4  min-h-screen">
        <Calendar locale="en-US" className="border-none! shadow-none" />
        <NewCourse course={latestCourses[0] ?? null}/>
<PendingAction pendingOrders={pendingOrders} />      </div>
    </div>
  );
}
