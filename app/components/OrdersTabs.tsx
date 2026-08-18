import { Icon } from "@iconify/react";

interface Props {
  activeTab: "purchase" | "courses";
  ordersCount: number;
  coursesCount: number;
  onChange: (
    tab: "purchase" | "courses"
  ) => void;
}

export function OrdersTabs({
  activeTab,
  ordersCount,
  coursesCount,
  onChange,
}: Props) {
  return (
    <div className="bg-white rounded-xl p-1.5 flex gap-1 border border-gray-100 shadow-sm">
      <button
        onClick={() => onChange("purchase")}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition ${
          activeTab === "purchase"
            ? "bg-[#8E24AA] text-white"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        <Icon
          icon="solar:cart-large-2-bold"
          width={18}
        />

        Orders

        <span className="px-2 py-0.5 rounded-full text-xs">
          {ordersCount}
        </span>
      </button>

      <button
        onClick={() => onChange("courses")}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition ${
          activeTab === "courses"
            ? "bg-[#31aebc] text-white"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        <Icon
          icon="solar:book-bold"
          width={18}
        />

        Pending Courses

        <span className="px-2 py-0.5 rounded-full text-xs">
          {coursesCount}
        </span>
      </button>
    </div>
  );
}