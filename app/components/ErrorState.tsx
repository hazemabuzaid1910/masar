import { Icon } from "@iconify/react";

interface Props {
  message: string;
}

export function ErrorState({
  message,
}: Props) {
  return (
    <div className="min-h-screen bg-neutral-100 p-6">
      <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-red-700">
        <div className="flex items-center gap-2">
          <Icon
            icon="solar:danger-circle-bold"
            width={22}
          />

          <span className="font-medium">
            Failed to load data
          </span>
        </div>

        <p className="text-sm mt-2">
          {message}
        </p>
      </div>
    </div>
  );
}