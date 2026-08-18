import { Icon } from "@iconify/react";

interface StatsCardProps {
  title: string;
  value: number | string;
  subtitle: string;
  icon: string;
  iconColor: string;
  iconBg: string;
}

export function StatsCard({
  title,
  value,
  subtitle,
  icon,
  iconColor,
  iconBg,
}: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-500 text-sm">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>

          <p className="text-xs text-gray-400 mt-1">
            {subtitle}
          </p>
        </div>

        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center ${iconBg}`}
        >
          <Icon
            icon={icon}
            width={23}
            className={iconColor}
          />
        </div>
      </div>
    </div>
  );
}