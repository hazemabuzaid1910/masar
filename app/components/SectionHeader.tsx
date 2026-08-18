interface Props {
  title: string;
  description: string;
  count: number;
  label: string;
}

export function SectionHeader({
  title,
  description,
  count,
  label,
}: Props) {
  return (
    <div className="px-6 py-5 border-b border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-lg">
            {title}
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            {description}
          </p>
        </div>

        <span className="text-sm text-gray-500">
          {count} {label}
        </span>
      </div>
    </div>
  );
}