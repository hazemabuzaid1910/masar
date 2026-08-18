import { Icon } from "@iconify/react";
import type { Order } from "~/routes/dashboard/orders/api/orders.api";
import {
  formatDate,
  getStatusStyle,
} from "../utils/orders.utils";
import { redirect, useNavigate } from "react-router";
import { route } from "@react-router/dev/routes";

interface Props {
  orders: Order[];
  onMarkAsPaid?: (orderId: number) => Promise<boolean>;
  markingOrderId?: number | null;
  onMarkAsFailed?: (orderId: number) => Promise<boolean>;
  failingOrderId?: number | null;
}

function OrdersTable({ orders, onMarkAsPaid, markingOrderId, onMarkAsFailed, failingOrderId }: Props) {
    const navigate = useNavigate();
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

      <div className="px-6 py-5 border-b border-gray-100">
        <div className="flex items-center justify-between">

          <div>
            <h2 className="font-semibold text-lg">
              Course Orders
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Review student course orders
            </p>
          </div>

          <span className="text-sm text-gray-500">
            {orders.length} orders
          </span>

        </div>
      </div>

      {orders.length === 0 ? (
        <div className="py-16 text-center">

          <div className="w-14 h-14 mx-auto rounded-full bg-gray-100 flex items-center justify-center">
            <Icon
              icon="solar:cart-large-2-bold"
              width={26}
              className="text-gray-400"
            />
          </div>

          <h3 className="font-medium mt-4">
            No orders found
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            There are no course orders to display.
          </p>

        </div>
      ) : (
        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-neutral-50 border-b border-gray-100">
              <tr className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">

                <th className="px-6 py-4">
                  Customer
                </th>

                <th className="px-6 py-4">
                  Courses
                </th>

                <th className="px-6 py-4">
                  Count
                </th>

                <th className="px-6 py-4">
                  Date
                </th>

                <th className="px-6 py-4">
                  Status
                </th>

                <th className="px-6 py-4 text-right">
                  Actions
                </th>

              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="
                    border-b border-gray-100
                    last:border-0
                    hover:bg-gray-50
                    transition
                  "
                >

                  {/* Customer */}
                  <td className="px-6 py-5">

                    <div className="flex items-center gap-3">

                      <div className="
                        w-10 h-10
                        rounded-full
                        bg-purple-100
                        flex items-center justify-center
                      ">
                        <span className="text-sm font-semibold text-[#8E24AA]">
                          {order.user.First_name.charAt(0)}
                          {order.user.Last_name.charAt(0)}
                        </span>
                      </div>

                      <div>
                        <p className="font-medium text-gray-900">
                          {order.user.First_name}{" "}
                          {order.user.Last_name}
                        </p>

                        <p className="text-xs text-gray-400">
                          User #{order.user.id}
                        </p>
                      </div>

                    </div>

                  </td>

                  {/* Courses */}
                  <td className="px-6 py-5">

                    <div className="space-y-2">

                      {order.courses.map((course :any) => (
                        <div
                          key={course.id}
                          className="flex items-center gap-2"
                        >

                          <div className="
                            w-8 h-8
                            rounded-lg
                            bg-cyan-50
                            flex items-center justify-center
                          ">
                            <Icon
                              icon="solar:book-bold"
                              width={16}
                              className="text-[#31aebc]"
                            />
                          </div>

                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {course.title}
                            </p>

                            <p className="text-xs text-gray-400">
                              Course #{course.id}
                            </p>
                          </div>

                        </div>
                      ))}

                    </div>

                  </td>

                  {/* Count */}
                  <td className="px-6 py-5">

                    <span className="
                      inline-flex
                      items-center
                      gap-1.5
                      px-3 py-1.5
                      rounded-lg
                      bg-gray-100
                      text-gray-700
                      text-sm
                      font-medium
                    ">
                      <Icon
                        icon="solar:book-2-bold"
                        width={16}
                      />

                      {order.courses.length}
                    </span>

                  </td>

                  {/* Date */}
                  <td className="px-6 py-5">
                    <p className="text-sm text-gray-700">
                      {formatDate(order.created_at)}
                    </p>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5">

                    <span
                      className={`
                        inline-flex
                        items-center
                        gap-1.5
                        px-3 py-1.5
                        rounded-full
                        text-xs
                        font-medium
                        ${getStatusStyle(order.status)}
                      `}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />

                      {order.status}
                    </span>

                  </td>

                  {/* Actions */}
                  <td className="px-6 py-5">

                    <div className="flex justify-end gap-2">

                      <button
                        title="View order"
                          onClick={() => navigate(`/courses/${order.courses[0].id}`)}

                        className="
                          w-9 h-9
                          rounded-lg
                          border border-gray-200
                          flex items-center justify-center
                          text-gray-600
                          hover:bg-gray-100
                          transition
                        "
                      >
                        <Icon
                          icon="solar:eye-bold"
                          width={18}
                        />
                      </button>

                      {order.status.toLowerCase() === "pending" && (
                        <>
                          <button
                            title="Mark as paid"
                            disabled={!onMarkAsPaid || markingOrderId === order.id}
                            onClick={() => onMarkAsPaid?.(order.id)}
                            className="
                              w-9 h-9
                              rounded-lg
                              bg-[#8E24AA]
                              text-white
                              flex items-center justify-center
                              hover:bg-[#7B1FA2]
                              transition
                              disabled:opacity-50
                              disabled:cursor-not-allowed
                            "
                          >
                            <Icon
                              icon="solar:check-circle-bold"
                              width={18}
                            />
                          </button>

                          <button
                            title="Mark as failed"
                            disabled={!onMarkAsFailed || failingOrderId === order.id}
                            onClick={() => onMarkAsFailed?.(order.id)}
                            className="
                              w-9 h-9
                              rounded-lg
                              bg-red-50
                              text-red-600
                              flex items-center justify-center
                              hover:bg-red-100
                              transition
                              disabled:opacity-50
                              disabled:cursor-not-allowed
                            "
                          >
                            <Icon
                              icon="solar:close-circle-bold"
                              width={18}
                            />
                          </button>
                        </>
                      )}

                    </div>

                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}

export default OrdersTable;