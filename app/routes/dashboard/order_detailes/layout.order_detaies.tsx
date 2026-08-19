import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  User,
  CreditCard,
  Calendar,
  BookOpen,
  CheckCircle,
  XCircle,
  Clock,
  Hash,
} from "lucide-react";

import { useOrderDetails } from "../../../hooks/useOrderDetailes";
import { useOrders } from "~/hooks/useOrders";
import { ConfirmOrderStatusModal } from "~/components/ConfirmOrderStatusModal";

type OrderStatus = "pending" | "paid" | "failed";

type OrderStatusAction = "paid" | "failed" | null;

export default function OrderDetails() {
  const { id } = useParams();

  const { order, isLoading, error, refetch } =
    useOrderDetails(Number(id));

  /**
   * Same order actions used in Orders page
   */
  const {
    markOrderAsPaid,
    markingOrderId,
    markOrderAsFailed,
    failingOrderId,
  } = useOrders();

  /**
   * Confirmation modal state
   */
  const [orderStatusAction, setOrderStatusAction] =
    useState<OrderStatusAction>(null);

  const statusStyles: Record<OrderStatus, string> = {
    pending: "bg-amber-50 text-amber-600",
    paid: "bg-emerald-50 text-emerald-600",
    failed: "bg-red-50 text-red-600",
  };

  /**
   * Open confirmation modal
   */
  const handleOpenOrderStatusModal = (
    action: "paid" | "failed"
  ) => {
    setOrderStatusAction(action);
  };

  /**
   * Close confirmation modal
   */
  const handleCloseOrderStatusModal = () => {
    if (
      order &&
      (
        markingOrderId === order.id ||
        failingOrderId === order.id
      )
    ) {
      return;
    }

    setOrderStatusAction(null);
  };

  /**
   * Confirm approve / reject
   */
  const handleConfirmOrderStatus = async () => {
    if (!order || !orderStatusAction) {
      return;
    }

    let success = false;

    if (orderStatusAction === "paid") {
      success = await markOrderAsPaid(order.id);
    }

    if (orderStatusAction === "failed") {
      success = await markOrderAsFailed(order.id);
    }

    if (success) {
      setOrderStatusAction(null);

      // Refresh order details after status update
      await refetch();
    }
  };

  const isActionLoading =
    order !== null &&
    (
      markingOrderId === order.id ||
      failingOrderId === order.id
    );

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="rounded-2xl bg-white px-8 py-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Loading order details...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50">
        <p className="text-slate-600">{error}</p>

        <button
          onClick={refetch}
          className="rounded-xl bg-violet-600 px-5 py-2.5 font-medium text-white shadow-sm transition hover:bg-violet-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-500">
          Order not found
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-violet-100">
              <BookOpen
                className="text-violet-600"
                size={27}
              />
            </div>

            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Order Details
                </h1>

                <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500">
                  #{order.id}
                </span>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                Review order information and payment details
              </p>
            </div>
          </div>

          <div
            className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
              statusStyles[order.status as OrderStatus]
            }`}
          >
            {order.status === "pending" && (
              <Clock size={16} />
            )}

            {order.status === "paid" && (
              <CheckCircle size={16} />
            )}

            {order.status === "failed" && (
              <XCircle size={16} />
            )}

            <span className="capitalize">
              {order.status}
            </span>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          <div className="rounded-2xl bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Order ID
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  #{order.id}
                </h2>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50">
                <Hash
                  size={20}
                  className="text-violet-600"
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Courses Count
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  {order.items.length}
                </h2>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50">
                <BookOpen
                  size={20}
                  className="text-cyan-600"
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)] sm:col-span-2 lg:col-span-1">
            <p className="text-sm font-medium text-slate-500">
              Order Status
            </p>

            <div
              className={`mt-3 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
                statusStyles[order.status as OrderStatus]
              }`}
            >
              {order.status === "pending" && (
                <Clock size={16} />
              )}

              {order.status === "paid" && (
                <CheckCircle size={16} />
              )}

              {order.status === "failed" && (
                <XCircle size={16} />
              )}

              <span className="capitalize">
                {order.status}
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">

          {/* Left */}
          <div className="space-y-6 lg:col-span-2">

            {/* Customer */}
            <div className="overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_rgba(15,23,42,0.04)]">
              <div className="flex items-center justify-between px-6 py-5">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Customer Information
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Customer details associated with this order
                  </p>
                </div>

                <User
                  size={20}
                  className="text-slate-400"
                />
              </div>

              <div className="px-6 pb-6">
                <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-violet-100 font-bold text-violet-700">
                    {order.user.First_name.charAt(0)}
                    {order.user.Last_name.charAt(0)}
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-900">
                      {order.user.First_name}{" "}
                      {order.user.Last_name}
                    </h4>

                    <p className="mt-1 text-sm text-slate-500">
                      User #{order.user.id}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Courses */}
            <div className="overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_rgba(15,23,42,0.04)]">
              <div className="px-6 py-5">
                <h3 className="text-lg font-bold text-slate-900">
                  Ordered Courses
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Courses included in this order
                </p>
              </div>

              <div className="space-y-3 px-6 pb-6">
                {order.items.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-4 rounded-xl bg-slate-50 p-4 transition hover:bg-slate-100 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-100">
                        <BookOpen
                          size={20}
                          className="text-cyan-600"
                        />
                      </div>

                      <div>
                        <h4 className="font-semibold text-slate-900">
                          {item.course.title}
                        </h4>

                        <p className="mt-1 text-sm text-slate-500">
                          Course #{item.course.id}
                        </p>
                      </div>
                    </div>

                    <span className="text-sm font-medium text-slate-400">
                      Teacher #{item.course.teacher_id}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-6">

            {/* Payment Details */}
            <div className="overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_rgba(15,23,42,0.04)]">
              <div className="px-6 py-5">
                <h3 className="text-lg font-bold text-slate-900">
                  Payment Details
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Transaction information
                </p>
              </div>

              <div className="space-y-1 px-6 pb-6">

                <div className="flex items-center gap-4 rounded-xl p-3 transition hover:bg-slate-50">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50">
                    <CreditCard
                      size={18}
                      className="text-violet-600"
                    />
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-400">
                      Payment Method
                    </p>

                    <p className="mt-1 font-semibold text-slate-800">
                      {order.type_of_payment}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl p-3 transition hover:bg-slate-50">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50">
                    <User
                      size={18}
                      className="text-violet-600"
                    />
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-400">
                      Transaction Number
                    </p>

                    <p className="mt-1 font-semibold text-slate-800">
                      {order.number_of_messages_payment}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl p-3 transition hover:bg-slate-50">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50">
                    <Calendar
                      size={18}
                      className="text-violet-600"
                    />
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-400">
                      Order Date
                    </p>

                    <p className="mt-1 font-semibold text-slate-800">
                      {new Date(
                        order.created_at
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Payment Image */}
            <div className="overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_rgba(15,23,42,0.04)]">
              <div className="px-6 py-5">
                <h3 className="text-lg font-bold text-slate-900">
                  Payment Screenshot
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Uploaded payment proof
                </p>
              </div>

              <div className="px-4 pb-4">
                <div className="overflow-hidden rounded-xl bg-slate-100">
                  <img
                    src={`https://course-vedio-production.up.railway.app/${order.image_path}`}
                    alt="Payment Proof"
                    className="h-72 w-full object-cover transition duration-300 hover:scale-[1.02]"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            {order.status.toLowerCase() === "pending" && (
              <div className="rounded-2xl bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)]">

                <h3 className="font-bold text-slate-900">
                  Order Actions
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Review the payment before taking action.
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3">

                  {/* Approve */}
                  <button
                    type="button"
                    disabled={isActionLoading}
                    onClick={() =>
                      handleOpenOrderStatusModal("paid")
                    }
                    className="
                      flex items-center justify-center gap-2
                      rounded-xl
                      bg-emerald-600
                      py-3
                      text-sm
                      font-semibold
                      text-white
                      shadow-sm
                      transition
                      hover:bg-emerald-700
                      active:scale-[0.98]
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  >
                    <CheckCircle size={18} />
                    Approve
                  </button>

                  {/* Reject */}
                  <button
                    type="button"
                    disabled={isActionLoading}
                    onClick={() =>
                      handleOpenOrderStatusModal("failed")
                    }
                    className="
                      flex items-center justify-center gap-2
                      rounded-xl
                      bg-red-500
                      py-3
                      text-sm
                      font-semibold
                      text-white
                      shadow-sm
                      transition
                      hover:bg-red-600
                      active:scale-[0.98]
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  >
                    <XCircle size={18} />
                    Reject
                  </button>

                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <ConfirmOrderStatusModal
        order={order}
        action={orderStatusAction}
        loading={isActionLoading}
        onCancel={handleCloseOrderStatusModal}
        onConfirm={handleConfirmOrderStatus}
      />
    </div>
  );
}