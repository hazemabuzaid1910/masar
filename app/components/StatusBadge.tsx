interface Props {
  status: string;
}

export function StatusBadge({
  status,
}: Props) {
  const getStyle = () => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-emerald-50 text-emerald-700 border border-emerald-200";

      case "pending":
        return "bg-amber-50 text-amber-700 border border-amber-200";

      case "rejected":
        return "bg-red-50 text-red-700 border border-red-200";

      default:
        return "bg-gray-50 text-gray-700 border border-gray-200";
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${getStyle()}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />

      {status}
    </span>
  );
}