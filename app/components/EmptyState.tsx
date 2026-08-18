import { Icon } from "@iconify/react";

interface Props {
  icon: string;
  title: string;
  description?: string;
}

export function EmptyState({
  icon,
  title,
  description,
}: Props) {
  return (
    <div className="py-16 text-center">
      <div className="w-14 h-14 mx-auto rounded-full bg-gray-100 flex items-center justify-center">
        <Icon
          icon={icon}
          width={26}
          className="text-gray-400"
        />
      </div>

      <h3 className="font-medium mt-4">
        {title}
      </h3>

      {description && (
        <p className="text-sm text-gray-500 mt-1">
          {description}
        </p>
      )}
    </div>
  );
}