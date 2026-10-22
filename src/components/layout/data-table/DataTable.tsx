"use client";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
} from "@tanstack/react-table";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ReactNode, useState } from "react";
import Toolbar, { StatusFilter } from "./components/Toolbar";
import Pagination from "./components/Pagination";
import EmptyCustom from "../../ui/Empty";

interface DataTablePagination {
  pageIndex: number;
  pageSize: number;
  hasNextPage: boolean;
  onPageChange: (pageIndex: number) => void;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  searchPlaceholder?: string;
  searchColumn?: string;
  statusFilter?: StatusFilter;
  emptyComponent?: ReactNode;
  pageSize?: number;
  toolbar?: ReactNode;
  pagination?: DataTablePagination;
}

export default function DataTable<TData, TValue>({
  columns,
  data,
  isLoading = false,
  searchPlaceholder,
  searchColumn,
  statusFilter,
  emptyComponent = <EmptyCustom />,
  pageSize = 10,
  toolbar,
  pagination,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const isManualPagination = !!pagination;
  const effectivePageSize = pagination?.pageSize ?? pageSize;

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      ...(isManualPagination ? { pagination: { pageIndex: pagination.pageIndex, pageSize: effectivePageSize } } : {}),
    },
    initialState: isManualPagination ? undefined : { pagination: { pageSize } },
    manualPagination: isManualPagination,
    pageCount: isManualPagination ? -1 : undefined,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: isManualPagination
      ? (updater) => {
          const current = { pageIndex: pagination.pageIndex, pageSize: effectivePageSize };
          const next = typeof updater === "function" ? updater(current) : updater;

          pagination.onPageChange(next.pageIndex);
        }
      : undefined,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: isManualPagination ? undefined : getPaginationRowModel(),
  });

  const columnCount = table.getVisibleLeafColumns().length;

  return (
    <div className="flex flex-col gap-4">
      {toolbar ?? (
        <Toolbar
          table={table}
          searchColumn={searchColumn}
          statusFilter={statusFilter}
          searchPlaceholder={searchPlaceholder}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      )}

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader className="bg-muted/70 border-b">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="font-semibold py-3">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: Math.min(pageSize, 5) }).map((_, i) => (
                <TableRow key={`skeleton-${i}`}>
                  {Array.from({ length: columnCount }).map((__, j) => (
                    <TableCell key={j} className="py-3">
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                  className={`${index % 2 === 0 ? "bg-background hover:bg-muted/50" : "bg-sky-50/70 dark:bg-slate-800/40 hover:bg-sky-100/70 dark:hover:bg-slate-800/70"} text-foreground`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columnCount} className="min-h-30 text-center text-sm text-muted-foreground">
                  {emptyComponent}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Pagination table={table} isLoading={isLoading} hasNextPage={pagination?.hasNextPage} />
    </div>
  );
}
