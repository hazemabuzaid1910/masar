import { Icon } from "@iconify/react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";

export interface Mentor {
  id: number;
  First_name: string;
  Last_name: string;
  email: string;
  courses_count: number;
}

type MentorDataTableProps = {
  data: Mentor[];
  buttonTitle?: string;
  buttonFunction?: () => void;
  onRowClick?: (row: Mentor) => void;
  onEdit?: (mentor: Mentor) => void;
  onDelete?: (mentor: Mentor) => void;
};

export function MentorDataTable({
  data,
  buttonTitle,
  buttonFunction,
  onRowClick,
  onEdit,
  onDelete,
}: MentorDataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const safeData = useMemo(
  () => (Array.isArray(data) ? data : []),
  [data]
);

  const columns = useMemo<ColumnDef<Mentor>[]>(
    () => [
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
        accessorKey: "courses_count",
        header: "Courses",
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
            >
              Edit
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(row.original);
              }}
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    [onEdit, onDelete]
  );

  console.log("TABLE data:", data);
  console.log("TABLE safeData:", safeData);
  console.log("TABLE columns:", columns);

  const table = useReactTable({
    data: safeData,
    columns: columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // باقي JSX...


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
            {table.getRowModel().rows.length ? (
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
                  No mentors found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-end gap-2">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="rounded border px-3 py-2"
        >
          Previous
        </button>

        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="rounded border px-3 py-2"
        >
          Next
        </button>
      </div>
    </div>
  );
}