import { Icon } from "@iconify/react";

interface Props {
  text?: string;
}

export function PageLoader({
  text = "Loading...",
}: Props) {
  return (
    <div className="min-h-screen bg-neutral-100 p-6">
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-3 text-gray-500">
          <Icon
            icon="solar:refresh-circle-bold"
            width={24}
            className="animate-spin"
          />

          {text}
        </div>
      </div>
    </div>
  );
}