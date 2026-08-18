import { Icon } from "@iconify/react";
import type { PendingCourse } from "~/routes/dashboard/orders/api/orders.api";
import {
  formatDate,
  getStatusStyle,
} from "~/utils/orders.utils";

interface Props {
  courses: PendingCourse[];

  publishingCourseId: number | null;
  rejectingCourseId: number | null;

  onView?: (course: PendingCourse) => void;
  onApprove?: (course: PendingCourse) => void;
  onReject?: (course: PendingCourse) => void;
}

export function PendingCoursesTable({
  courses,
  publishingCourseId,
  rejectingCourseId,
  onView,
  onApprove,
  onReject,
}: Props) {
  if (courses.length === 0) {
    return (
      <div className="px-6 py-16 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-50">
          <Icon
            icon="solar:book-bold"
            width={28}
            className="text-[#31aebc]"
          />
        </div>

        <h3 className="mt-4 font-semibold text-gray-900">
          No pending courses
        </h3>

        <p className="mx-auto mt-1 max-w-sm text-sm text-gray-500">
          There are currently no courses waiting for teacher approval.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden">
      <table className="w-full table-fixed">
        <thead className="border-b border-gray-100 bg-neutral-50">
          <tr className="text-left">
            <th className="w-[28%] px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Course
            </th>

            <th className="w-[14%] px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Price
            </th>

            <th className="w-[18%] px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Teacher
            </th>

            <th className="w-[12%] px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Level
            </th>

            <th className="w-[12%] px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Submitted
            </th>

            <th className="w-[10%] px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Status
            </th>

            <th className="w-[10%] px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {courses.map((course) => {
            const hasDiscount =
              Number(course.discount) > 0;

            const isPublishing =
              publishingCourseId === course.id;

            const isRejecting =
              rejectingCourseId === course.id;

            const isProcessing =
              isPublishing || isRejecting;

            return (
              <tr
                key={course.id}
                className="
                  border-b border-gray-100
                  last:border-0
                  hover:bg-gray-50/70
                  transition-colors
                "
              >
                {/* Course */}
                <td className="px-5 py-5">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-50">
                      <Icon
                        icon="solar:book-bold"
                        width={20}
                        className="text-[#31aebc]"
                      />
                    </div>

                    <div className="min-w-0">
                      <p
                        className="truncate font-semibold text-gray-900"
                        title={course.title}
                      >
                        {course.title}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        Course #{course.id}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Price */}
                <td className="px-5 py-5">
                  <div>
                    <div className="flex items-center gap-1">
                      <Icon
                        icon="solar:dollar-minimalistic-bold"
                        width={16}
                        className="text-gray-400"
                      />

                      <span className="font-semibold text-gray-900">
                        ${course.price}
                      </span>
                    </div>

                    {hasDiscount && (
                      <span className="mt-1 inline-flex rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                        {course.discount}% OFF
                      </span>
                    )}
                  </div>
                </td>

                {/* Teacher */}
                <td className="px-5 py-5">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-purple-50">
                      <Icon
                        icon="solar:user-bold"
                        width={17}
                        className="text-[#8E24AA]"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-gray-800">
                        Teacher #{course.teacher_id}
                      </p>

                      <p className="mt-0.5 text-xs text-gray-400">
                        ID: {course.teacher_id}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Level */}
                <td className="px-5 py-5">
                  <span
                    className="
                      inline-flex
                      max-w-full
                      items-center
                      gap-1.5
                      truncate
                      rounded-lg
                      bg-gray-100
                      px-2.5
                      py-1.5
                      text-xs
                      font-medium
                      text-gray-700
                    "
                    title={course.level || "Not specified"}
                  >
                    <Icon
                      icon="solar:chart-2-bold"
                      width={14}
                      className="shrink-0 text-gray-400"
                    />

                    <span className="truncate">
                      {course.level || "Not specified"}
                    </span>
                  </span>
                </td>

                {/* Date */}
                <td className="px-5 py-5">
                  <div className="flex items-center gap-1.5">
                    <Icon
                      icon="solar:calendar-bold"
                      width={15}
                      className="shrink-0 text-gray-400"
                    />

                    <span className="whitespace-nowrap text-sm text-gray-700">
                      {formatDate(course.created_at)}
                    </span>
                  </div>
                </td>

                {/* Status */}
                <td className="px-5 py-5">
                  <span
                    className={`
                      inline-flex
                      items-center
                      gap-1.5
                      rounded-full
                      px-2.5
                      py-1.5
                      text-xs
                      font-medium
                      whitespace-nowrap
                      ${getStatusStyle(course.status)}
                    `}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />

                    {course.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-5 py-5">
                  <div className="flex items-center justify-end gap-1.5">

                    {/* View */}
                    <button
                      type="button"
                      title="View course"
                      disabled={isProcessing}
                      onClick={() => onView?.(course)}
                      className="
                        flex h-8 w-8 items-center justify-center
                        rounded-lg
                        border border-gray-200
                        bg-white
                        text-gray-600
                        transition
                        hover:bg-gray-100
                        hover:text-gray-900
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                      "
                    >
                      <Icon
                        icon="solar:eye-bold"
                        width={17}
                      />
                    </button>

                    {/* Approve */}
                    <button
                      type="button"
                      title={
                        isPublishing
                          ? "Publishing course..."
                          : "Approve course"
                      }
                      disabled={isProcessing}
                      onClick={() => onApprove?.(course)}
                      className="
                        flex h-8 w-8 items-center justify-center
                        rounded-lg
                        bg-[#31aebc]
                        text-white
                        transition
                        hover:bg-[#299da9]
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                      "
                    >
                      <Icon
                        icon={
                          isPublishing
                            ? "solar:refresh-circle-bold"
                            : "solar:check-circle-bold"
                        }
                        width={17}
                        className={
                          isPublishing
                            ? "animate-spin"
                            : ""
                        }
                      />
                    </button>

                    {/* Reject */}
                    <button
                      type="button"
                      title={
                        isRejecting
                          ? "Rejecting course..."
                          : "Reject course"
                      }
                      disabled={isProcessing}
                      onClick={() => onReject?.(course)}
                      className="
                        flex h-8 w-8 items-center justify-center
                        rounded-lg
                        bg-red-50
                        text-red-600
                        transition
                        hover:bg-red-100
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                      "
                    >
                      <Icon
                        icon={
                          isRejecting
                            ? "solar:refresh-circle-bold"
                            : "solar:close-circle-bold"
                        }
                        width={17}
                        className={
                          isRejecting
                            ? "animate-spin"
                            : ""
                        }
                      />
                    </button>

                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}