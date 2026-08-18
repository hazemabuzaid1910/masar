import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router";
import { Eye, Pencil, Trash2 } from "lucide-react";

export type Student = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  course: string;
  status: string;
};

type Props = {
  onEdit: (student: Student) => void;
  onDelete: (student: Student) => void;
};

export const getStudentColumns = ({
  onEdit,
  onDelete,
}: Props): ColumnDef<Student>[] => [
  {
    accessorKey: "name",
    header: "Student",
    cell: ({ row }) => {
      const student = row.original;

      return (
        <Link
          to={`/dashboard/students/${student.id}`}
          className="flex items-center gap-3 hover:opacity-80"
        >
          <img
            src={student.avatar}
            alt={student.name}
            className="h-10 w-10 rounded-full object-cover"
          />

          <div>
            <p className="font-medium">{student.name}</p>
           
          </div>
        </Link>
      );
    },
  },

  {
    accessorKey: "email",
    header: "Email",
  },

  {
    accessorKey: "course",
    header: "Course",
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;

      return (
        <span
          className={`rounded-full px-2 py-1 text-xs font-medium
            ${
              status === "active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
        >
          {status}
        </span>
      );
    },
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const student = row.original;

      return (
        <div className="flex items-center gap-2">
          <Link
            to={`/dashboard/students/${student.id}`}
            className="rounded-md p-2 hover:bg-muted"
          >
            <Eye size={18} />
          </Link>

          <button
            onClick={() => onEdit(student)}
            className="rounded-md p-2 hover:bg-muted"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => onDelete(student)}
            className="rounded-md p-2 text-red-500 hover:bg-muted"
          >
            <Trash2 size={18} />
          </button>
        </div>
      );
    },
  },
];