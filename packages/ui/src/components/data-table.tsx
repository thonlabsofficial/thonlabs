'use client';

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  FilterFnOption,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui/table';
import { cn } from '@repo/ui/core/utils';
import React from 'react';
import { Input } from '@repo/ui/input';
import Utils from '@repo/utils';
import { LuArrowUp } from 'react-icons/lu';
import { Skeleton } from './skeleton';
import { Clipboard } from './clipboard';

function DataTableHeaderCell({
  accessorKey,
  header,
  columnDef,
}: {
  accessorKey: string;
  header: string;
  columnDef: any;
}) {
  return (
    <div
      role="button"
      className="flex items-center gap-1"
      onClick={() =>
        columnDef.column.toggleSorting(columnDef.column.getIsSorted() === 'asc')
      }
    >
      <div>{header}</div>
      {columnDef.table
        .getState()
        .sorting.some((s: any) => s.id === accessorKey) && (
        <LuArrowUp
          className={cn(
            'w-3 h-3',
            columnDef.column.getIsSorted() === 'asc' ? '' : 'rotate-180',
          )}
        />
      )}
    </div>
  );
}

function DataTableLoaderCell({
  table,
}: {
  table: ReturnType<typeof useReactTable>;
}) {
  return table.getHeaderGroups().map((headerGroup) => (
    <TableRow header key={headerGroup.id} withHover={false}>
      {headerGroup.headers.map((header) => {
        return (
          <TableCell loading key={`loading-${header.id}`} className="py-3">
            <Skeleton className="!w-3/4 h-6" />
          </TableCell>
        );
      })}
    </TableRow>
  ));
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  noResultsMessage: React.ReactNode;
  cursor?: string;
  defaultSorting?: SortingState;
  defaultSearch?: string;
  searchPlaceholder?: string;
  searchFields?: string[];
  loading?: boolean;
  actions?: React.ReactNode;
}

function DataTable<TData, TValue>({
  columns,
  data,
  noResultsMessage,
  cursor = '',
  defaultSorting = [],
  defaultSearch = '',
  searchPlaceholder = 'Search...',
  searchFields = [],
  loading,
  actions,
  ...props
}: DataTableProps<TData, TValue> & React.HTMLAttributes<HTMLElement>) {
  const [sorting, setSorting] = React.useState<SortingState>(defaultSorting);
  const [globalFilter, setGlobalFilter] = React.useState(defaultSearch);

  const memoizedColumns = React.useMemo(() => columns, [columns]);
  const memoizedData = React.useMemo(() => data, [data]);

  const table = useReactTable({
    data: memoizedData,
    columns: memoizedColumns,
    globalFilterFn:
      searchFields.length > 0 ? ('fuzzy' as FilterFnOption<TData>) : undefined,
    state: {
      sorting,
      globalFilter,
    },
    filterFns: {
      fuzzy: (row, _, value) => {
        const data = row.original;
        const search = Utils.normalizeString(value);

        return searchFields.some((field) =>
          Utils.normalizeString(data[field]).includes(search),
        );
      },
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const handleGlobalFilterChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setGlobalFilter(String(e.target.value));
    },
    [],
  );

  return (
    <div {...props}>
      {searchFields.length > 0 && (
        <div className="flex justify-between gap-3 mb-4">
          <div className="min-w-[22rem]">
            <Input
              placeholder={searchPlaceholder}
              size={'sm'}
              value={globalFilter ?? ''}
              onChange={handleGlobalFilterChange}
            />
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow header key={headerGroup.id} withHover={false}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="select-none">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <>
                <DataTableLoaderCell
                  table={table as ReturnType<typeof useReactTable>}
                />
                <DataTableLoaderCell
                  table={table as ReturnType<typeof useReactTable>}
                />
                <DataTableLoaderCell
                  table={table as ReturnType<typeof useReactTable>}
                />
              </>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="group"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn('py-3', {
                        [`cursor-${cursor}`]: cursor,
                      })}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow withHover={false}>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <div className="w-full flex justify-center items-center">
                    {noResultsMessage}
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

const MemoizedDataTable = React.memo(DataTable) as typeof DataTable;

type DataTableColumnDef<TData, TValue> = ColumnDef<TData, TValue>;

export { MemoizedDataTable as DataTable, DataTableHeaderCell };
export type { DataTableColumnDef, ColumnDef };
