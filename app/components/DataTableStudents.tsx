import { Icon } from "@iconify/react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";

export interface Student {
  id: number;
  First_name: string;
  Last_name: string;
  email: string;
  role: string;
  device_id: string | null;
  fcm_token: string | null;
  created_at: string;
  updated_at: string;
}

export interface StudentDataTableProps {
  data: Student[];

  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;

  loading?: boolean;

  buttonTitle?: string;
  buttonFunction?: () => void;
  onRowClick?: (row: Student) => void;
  onEdit?: (row: Student) => void;
  onDelete?: (row: Student) => void;
}

export function DataTableStudents({
  data,
  currentPage,
  lastPage,
  onPageChange,
  loading = false,
  buttonTitle,
  buttonFunction,
  onRowClick,
  onEdit,
  onDelete,
}: StudentDataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const safeData = useMemo(
    () => (Array.isArray(data) ? data : []),
    [data]
  );

  const columns = useMemo<ColumnDef<Student>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "First_name",
        header: "First Name",
      },
      {
        accessorKey: "Last_name",
        header: "Last Name",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => (
          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
            {row.original.role}
          </span>
        ),
      },
      {
        accessorKey: "created_at",
        header: "Created At",
        cell: ({ row }) =>
          new Date(row.original.created_at).toLocaleDateString(),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.(row.original);
              }}
              className="text-blue-600"
            >
              Edit
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(row.original);
              }}
              className="text-red-600"
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    [onEdit, onDelete]
  );

  const table = useReactTable({
    data: safeData,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="space-y-4">
      {/* TOP BAR */}
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap items-center gap-4">
          {/* SEARCH */}
          <div className="flex min-w-62.5 items-center rounded-lg bg-white px-4">
            <Icon icon="iconamoon:search-thin" />

            <input
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search..."
              className="h-10 w-full px-3 outline-none"
            />
          </div>

          {/* SORT */}
          <button
            type="button"
            onClick={() =>
              setSorting([
                {
                  id: "First_name",
                  desc: false,
                },
              ])
            }
            className="flex h-10 items-center gap-2 rounded-lg bg-white px-4"
          >
            <Icon icon="uil:sort" width={18} />
            Sort Name
          </button>
        </div>

        {/* ADD */}
        <button
          type="button"
          onClick={buttonFunction}
          className="flex items-center gap-2 rounded-lg bg-[#8E24AA] px-4 py-2 text-white hover:bg-[#7a1f93]"
        >
          <Icon icon="uil:plus-circle" width={22} />
          {buttonTitle}
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-lg">
        <table className="w-full border-separate border-spacing-y-2">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left font-semibold text-[#414141]"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-10 text-center"
                >
                  Loading...
                </td>
              </tr>
            ) : table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => onRowClick?.(row.original)}
                  className="border-b border-gray-100 bg-white hover:bg-gray-50"
                >
                  {row.getVisibleCells().map((cell, index) => (
                    <td
                      key={cell.id}
                      className={`bg-white px-4 py-4 ${
                        index === 0 ? "rounded-l-xl" : ""
                      } ${
                        index === row.getVisibleCells().length - 1
                          ? "rounded-r-xl"
                          : ""
                      }`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-10 text-center"
                >
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* LARAVEL PAGINATION */}
      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          disabled={currentPage <= 1 || loading}
          onClick={() => onPageChange(currentPage - 1)}
          className="rounded border px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>

        <span className="px-4 py-2">
          {currentPage} / {lastPage}
        </span>

        <button
          type="button"
          disabled={currentPage >= lastPage || loading}
          onClick={() => onPageChange(currentPage + 1)}
          className="rounded border px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}