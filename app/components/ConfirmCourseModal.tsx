// components/orders/ConfirmCourseModal.tsx

import { Icon } from "@iconify/react";
import type { PendingCourse } from "~/routes/dashboard/orders/api/orders.api";

interface Props {
  course: PendingCourse | null;
  action: "approve" | "reject" | null;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ConfirmCourseModal({
  course,
  action,
  loading = false,
  onCancel,
  onConfirm,
}: Props) {
  if (!course || !action) {
    return null;
  }

  const isApprove = action === "approve";

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
        {/* Icon */}
        <div
          className={`
            mx-auto
            flex h-14 w-14
            items-center justify-center
            rounded-2xl
            ${isApprove ? "bg-cyan-50" : "bg-red-50"}
          `}
        >
          <Icon
            icon={
              isApprove
                ? "solar:check-circle-bold"
                : "solar:danger-circle-bold"
            }
            width={28}
            className={
              isApprove
                ? "text-[#31aebc]"
                : "text-red-600"
            }
          />
        </div>

        {/* Title */}
        <h3 className="mt-4 text-center text-lg font-semibold text-gray-900">
          {isApprove
            ? "Approve this course?"
            : "Reject this course?"}
        </h3>

        {/* Course */}
        <div className="mt-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-50">
              <Icon
                icon="solar:book-bold"
                width={20}
                className="text-[#31aebc]"
              />
            </div>

            <div className="min-w-0">
              <p className="truncate font-medium text-gray-900">
                {course.title}
              </p>

              <p className="mt-0.5 text-xs text-gray-400">
                Course #{course.id}
              </p>
            </div>
          </div>
        </div>

        {/* Message */}
        <p className="mt-4 text-center text-sm leading-6 text-gray-500">
          {isApprove
            ? "This course will be published and made available to students."
            : "This course will be rejected and removed from the pending list."}
        </p>

        {/* Actions */}
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
                isApprove
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
            ) : isApprove ? (
              "Yes, Approve"
            ) : (
              "Yes, Reject"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}