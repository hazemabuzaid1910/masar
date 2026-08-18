import { Icon } from "@iconify/react";

interface Props {
  title: string;
  description: string;
}

export function PageHeader({
  title,
  description,
}: Props) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
        <Icon
          icon="solar:clipboard-list-bold"
          width={23}
          className="text-[#8E24AA]"
        />
      </div>

      <div>
        <h1 className="text-xl font-semibold">
          {title}
        </h1>

        <p className="text-sm text-gray-500">
          {description}
        </p>
      </div>
    </div>
  );
}