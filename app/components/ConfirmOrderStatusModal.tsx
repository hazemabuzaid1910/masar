import { Icon } from "@iconify/react";
import type { Order } from "~/routes/dashboard/orders/api/orders.api";

interface Props {
  order: Order | null;
  action: "paid" | "failed" | null;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ConfirmOrderStatusModal({
  order,
  action,
  loading = false,
  onCancel,
  onConfirm,
}: Props) {
  if (!order || !action) {
    return null;
  }

  const isPaid = action === "paid";

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/40
        px-4
        backdrop-blur-sm
      "
      onClick={onCancel}
    >
      <div
        className="
          w-full max-w-md
          rounded-2xl
          bg-white
          p-6
          shadow-2xl
        "
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className={`
            mx-auto
            flex h-14 w-14
            items-center justify-center
            rounded-2xl
            ${isPaid ? "bg-cyan-50" : "bg-red-50"}
          `}
        >
          <Icon
            icon={
              isPaid
                ? "solar:check-circle-bold"
                : "solar:danger-circle-bold"
            }
            width={28}
            className={
              isPaid ? "text-[#31aebc]" : "text-red-600"
            }
          />
        </div>

        <h3 className="mt-4 text-center text-lg font-semibold text-gray-900">
          {isPaid ? "Mark this order as paid?" : "Mark this order as failed?"}
        </h3>

        <div className="mt-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100">
              <span className="text-sm font-semibold text-[#8E24AA]">
                {order.user.First_name.charAt(0)}
                {order.user.Last_name.charAt(0)}
              </span>
            </div>

            <div className="min-w-0">
              <p className="truncate font-medium text-gray-900">
                {order.user.First_name} {order.user.Last_name}
              </p>

              <p className="mt-0.5 text-xs text-gray-400">
                Order #{order.id}
              </p>
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-sm leading-6 text-gray-500">
          {isPaid
            ? "This order will be marked as paid and the payment status will be updated."
            : "This order will be marked as failed and the payment status will be updated."}
        </p>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            disabled={loading}
            onClick={onCancel}
            className="
              flex-1
              rounded-xl
              border border-gray-200
              bg-white
              px-4 py-2.5
              text-sm font-medium
              text-gray-700
              transition
              hover:bg-gray-50
              disabled:opacity-50
            "
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={onConfirm}
            className={`
              flex-1
              rounded-xl
              px-4 py-2.5
              text-sm font-medium
              text-white
              transition
              disabled:cursor-not-allowed
              disabled:opacity-60
              ${
                isPaid
                  ? "bg-[#31aebc] hover:bg-[#299da9]"
                  : "bg-red-600 hover:bg-red-700"
              }
            `}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Icon
                  icon="solar:refresh-circle-bold"
                  width={18}
                  className="animate-spin"
                />

                Processing...
              </span>
            ) : isPaid ? (
              "Yes, Mark Paid"
            ) : (
              "Yes, Mark Failed"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
