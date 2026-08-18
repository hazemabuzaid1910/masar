import { Icon } from "@iconify/react";

interface Props {
  showApprove?: boolean;
  onView?: () => void;
  onApprove?: () => void;
  onReject?: () => void;
}

export function TableActions({
  showApprove,
  onView,
  onApprove,
  onReject,
}: Props) {
  return (
    <div className="flex justify-end gap-2">
      <button
        onClick={onView}
        className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition"
      >
        <Icon
          icon="solar:eye-bold"
          width={18}
        />
      </button>

      {showApprove && (
        <>
          <button
            onClick={onApprove}
            className="w-9 h-9 rounded-lg bg-[#31aebc] text-white flex items-center justify-center hover:opacity-90 transition"
          >
            <Icon
              icon="solar:check-circle-bold"
              width={18}
            />
          </button>

          <button
            onClick={onReject}
            className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition"
          >
            <Icon
              icon="solar:close-circle-bold"
              width={18}
            />
          </button>
        </>
      )}
    </div>
  );
}