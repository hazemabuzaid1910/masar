export const formatDate = (date: string | null) => {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const getStatusStyle = (status: string) => {
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