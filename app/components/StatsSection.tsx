// components/orders/StatsSection.tsx

import { StatsCard } from "~/components/StatsCard";

interface Props {
  totalRequests: number;
  pendingOrders: number;
  pendingCourses: number;
}

export function StatsSection({
  totalRequests,
  pendingOrders,
  pendingCourses,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
      <StatsCard
        title="Total Requests"
        value={totalRequests}
        subtitle="Orders & pending courses"
        icon="solar:cart-large-2-bold"
        iconColor="text-[#8E24AA]"
        iconBg="bg-purple-50"
      />

      <StatsCard
        title="Pending Orders"
        value={pendingOrders}
        subtitle="Awaiting approval"
        icon="solar:clock-circle-bold"
        iconColor="text-amber-600"
        iconBg="bg-amber-50"
      />

      <StatsCard
        title="Pending Courses"
        value={pendingCourses}
        subtitle="Teacher submissions"
        icon="solar:book-bold"
        iconColor="text-[#31aebc]"
        iconBg="bg-cyan-50"
      />
    </div>
  );
}