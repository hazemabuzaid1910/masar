import { Icon } from "@iconify/react";
import { Link } from "react-router";

interface PendingActionProps {
  pendingOrders: {
    course_pending_orders: number;
    teacher_pending_orders: number;
  } | null;
}

function PendingAction({
  pendingOrders,
}: PendingActionProps) {
  return (
    <div className="p-2 rounded-lg text-black border border-gray-400 flex flex-col gap-2 mt-5">
      <div className="flex items-center justify-between border-b border-gray-400 pb-2">
        <div className="flex items-center gap-2">
          <Icon
            icon="material-symbols-light:pending-actions"
            color="#3b3b3b"
            width={20}
          />

          <h2 className="font-semibold text-base">
            Pending Action
          </h2>
        </div>

        <Link
          to="/pending-actions"
          className="text-blue-500 text-sm hover:underline"
        >
          View Details
        </Link>
      </div>

      <div className="flex flex-col gap-4 mt-2">

        {/* Instructor Requests */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon
              icon="fluent-mdl2:publish-course"
              color="#3b3b3b"
            />

            <h3 className="font-medium text-sm">
              Instructor Requests
            </h3>

            <div className="bg-blue-400 text-white text-[12px] font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {pendingOrders?.teacher_pending_orders ?? 0}
            </div>
          </div>

          <Link
            to="/pending-actions"
            className="text-blue-500 text-[14px] hover:underline"
          >
            <Icon
              icon="material-symbols-light:arrow-forward"
              width={20}
            />
          </Link>
        </div>

        {/* Course Approvals */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon
              icon="simple-icons:wikibooks"
              color="#3b3b3b"
            />

            <h3 className="font-medium text-sm">
              Course Approvals
            </h3>

            <div className="bg-cyan-400 text-white text-[12px] font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {pendingOrders?.course_pending_orders ?? 0}
            </div>
          </div>

          <Link
            to="/pending-actions"
            className="text-blue-500 text-[14px] hover:underline"
          >
            <Icon
              icon="material-symbols-light:arrow-forward"
              width={20}
            />
          </Link>
        </div>



      </div>
    </div>
  );
}

export default PendingAction;