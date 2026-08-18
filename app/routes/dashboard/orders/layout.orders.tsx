import { useState } from "react";

import { ErrorState } from "~/components/ErrorState";
import OrdersTable from "~/components/OrdersTable";
import { OrdersTabs } from "~/components/OrdersTabs";
import { PageHeader } from "~/components/PageHeader";
import { PageLoader } from "~/components/pageLoader";
import { PendingCoursesTable } from "~/components/PendingCoursesTable";
import { StatsSection } from "~/components/StatsSection";
import { ConfirmCourseModal } from "~/components/ConfirmCourseModal";
import { ConfirmOrderStatusModal } from "~/components/ConfirmOrderStatusModal";

import { useOrders } from "~/hooks/useOrders";
import type { Order, PendingCourse } from "~/routes/dashboard/orders/api/orders.api";

function Orders() {
  const [activeTab, setActiveTab] = useState<
    "purchase" | "courses"
  >("purchase");

  const [selectedCourse, setSelectedCourse] =
    useState<PendingCourse | null>(null);

  const [confirmAction, setConfirmAction] = useState<
    "approve" | "reject" | null
  >(null);

  const [selectedOrder, setSelectedOrder] =
    useState<Order | null>(null);

  const [orderStatusAction, setOrderStatusAction] =
    useState<"paid" | "failed" | null>(null);

const {
  orders,
  ordersLoading,
  ordersError,

  pendingCourses,
  coursesLoading,
  coursesError,

  publishPendingCourse,
  publishingCourseId,

  rejectPendingCourse,
  rejectingCourseId,

  markOrderAsPaid,
  markingOrderId,

  markOrderAsFailed,
  failingOrderId,
} = useOrders();

  const pendingOrders = orders.filter(
    (order) =>
      order.status.toLowerCase() === "pending"
  );

  const isLoading =
    activeTab === "purchase"
      ? ordersLoading
      : coursesLoading;

  const currentError =
    activeTab === "purchase"
      ? ordersError
      : coursesError;

  /**
   * Open confirmation modal for approve
   */
  const handleApprove = (course: PendingCourse) => {
    setSelectedCourse(course);
    setConfirmAction("approve");
  };

  /**
   * Open confirmation modal for reject
   */
  const handleReject = (course: PendingCourse) => {
    setSelectedCourse(course);
    setConfirmAction("reject");
  };

  /**
   * Close confirmation modal
   */
  const handleCancelAction = () => {
    // Don't allow closing while API is processing
    if (
      selectedCourse &&
      publishingCourseId === selectedCourse.id
    ) {
      return;
    }

    setSelectedCourse(null);
    setConfirmAction(null);
  };

  const handleOpenOrderStatusModal = (
    order: Order,
    action: "paid" | "failed"
  ) => {
    setSelectedOrder(order);
    setOrderStatusAction(action);
  };

  const handleCloseOrderStatusModal = () => {
    if (
      selectedOrder &&
      (
        markingOrderId === selectedOrder.id ||
        failingOrderId === selectedOrder.id
      )
    ) {
      return;
    }

    setSelectedOrder(null);
    setOrderStatusAction(null);
  };

  /**
   * Confirm approve / reject
   */
 const handleConfirmAction = async () => {
  if (!selectedCourse || !confirmAction) {
    return;
  }

  let success = false;

  if (confirmAction === "approve") {
    success = await publishPendingCourse(
      selectedCourse.id
    );
  }

  if (confirmAction === "reject") {
    success = await rejectPendingCourse(
      selectedCourse.id
    );
  }

  if (success) {
    setSelectedCourse(null);
    setConfirmAction(null);
  }
};

  const handleConfirmOrderStatus = async () => {
    if (!selectedOrder || !orderStatusAction) {
      return;
    }

    let success = false;

    if (orderStatusAction === "paid") {
      success = await markOrderAsPaid(selectedOrder.id);
    }

    if (orderStatusAction === "failed") {
      success = await markOrderAsFailed(selectedOrder.id);
    }

    if (success) {
      setSelectedOrder(null);
      setOrderStatusAction(null);
    }
  };

  if (isLoading) {
    return (
      <PageLoader
        text={
          activeTab === "purchase"
            ? "Loading orders..."
            : "Loading pending courses..."
        }
      />
    );
  }

  if (currentError) {
    return <ErrorState message={currentError} />;
  }

  return (
    <div className="min-h-screen bg-neutral-100 p-6 text-black">

      {/* Header */}
      <PageHeader
        title="Orders"
        description="Review all purchases and pending courses"
      />

      {/* Statistics */}
      <StatsSection
        totalRequests={
          orders.length + pendingCourses.length
        }
        pendingOrders={pendingOrders.length}
        pendingCourses={pendingCourses.length}
      />

      {/* Tabs */}
      <OrdersTabs
        activeTab={activeTab}
        onChange={setActiveTab}
        ordersCount={orders.length}
        coursesCount={pendingCourses.length}
      />

      {/* Orders */}
      {activeTab === "purchase" ? (
        <OrdersTable
          orders={orders}
          onMarkAsPaid={(orderId) => {
            const order = orders.find((item) => item.id === orderId);
            if (order) {
              handleOpenOrderStatusModal(order, "paid");
            }
            return Promise.resolve(false);
          }}
          markingOrderId={markingOrderId}
          onMarkAsFailed={(orderId) => {
            const order = orders.find((item) => item.id === orderId);
            if (order) {
              handleOpenOrderStatusModal(order, "failed");
            }
            return Promise.resolve(false);
          }}
          failingOrderId={failingOrderId}
        />
      ) : (
 <PendingCoursesTable
  courses={pendingCourses}
  publishingCourseId={publishingCourseId}
  rejectingCourseId={rejectingCourseId}
  onApprove={handleApprove}
  onReject={handleReject}
/>
      )}

      {/* Confirm Course Modal */}
      <ConfirmCourseModal
        course={selectedCourse}
        action={confirmAction}
        loading={
  selectedCourse !== null &&
  (
    publishingCourseId === selectedCourse.id ||
    rejectingCourseId === selectedCourse.id
  )
}
        onCancel={handleCancelAction}
        onConfirm={handleConfirmAction}
      />

      <ConfirmOrderStatusModal
        order={selectedOrder}
        action={orderStatusAction}
        loading={
          selectedOrder !== null &&
          (
            markingOrderId === selectedOrder.id ||
            failingOrderId === selectedOrder.id
          )
        }
        onCancel={handleCloseOrderStatusModal}
        onConfirm={handleConfirmOrderStatus}
      />

    </div>
  );
}

export default Orders;