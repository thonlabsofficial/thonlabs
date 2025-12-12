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
  Row,
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
import { Skeleton } from './skeleton';
import { ArrowUp } from 'lucide-react';
import { ScrollArea } from './scroll-area';

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
        <ArrowUp
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
            <Skeleton className="min-w-4 !w-3/4 h-6" />
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
  wrapperClassName?: string;
  className?: string;
  onRowHover?: (e: React.MouseEvent, row: Row<TData>) => void;
  onRowClick?: (e: React.MouseEvent, row: Row<TData>) => void;
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
  wrapperClassName,
  className,
  onRowHover,
  onRowClick,
  ...props
}: DataTableProps<TData, TValue> & React.HTMLAttributes<HTMLElement>) {
  const [sorting, setSorting] = React.useState<SortingState>(defaultSorting);
  const [globalFilter, setGlobalFilter] = React.useState(defaultSearch);
  const tableWrapperRef = React.useRef<HTMLTableElement>(null);
  const [tableHeight, setTableHeight] = React.useState<number>(186.5);
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

  React.useEffect(() => {
    if (!tableWrapperRef.current) return;

    const updateHeight = () => {
      if (tableWrapperRef.current) {
        setTableHeight(tableWrapperRef.current.scrollHeight);
      }
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(tableWrapperRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [data, loading]);

  return (
    <div className={cn('w-full max-w-full', className)} {...props}>
      {searchFields.length > 0 && (
        <div
          className={cn(
            'flex w-full justify-between gap-3 mb-4',
            wrapperClassName,
          )}
        >
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
      <ScrollArea
        className={'rounded-md border [&>div]:h-full'}
        wrapperClassName={cn('w-full min-w-0 relative', wrapperClassName)}
        style={{ height: tableHeight || 'auto' }}
        orientation="horizontal"
      >
        <Table
          ref={tableWrapperRef}
          className="absolute inset-0 [&_th]:whitespace-nowrap [&_td]:whitespace-nowrap"
        >
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
                  className={cn('group', {
                    'cursor-pointer': onRowClick,
                  })}
                  onMouseEnter={(e) => {
                    onRowHover?.(e, row);
                  }}
                  onClick={(e) => {
                    const target = e.target as HTMLElement;
                    const clickableElement = target.closest(
                      '[data-dt-bypass-click]',
                    );
                    if (clickableElement) {
                      return;
                    }

                    onRowClick?.(e, row);
                  }}
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
      </ScrollArea>
    </div>
  );
}

const MemoizedDataTable = React.memo(DataTable) as typeof DataTable;

type DataTableColumnDef<TData, TValue> = ColumnDef<TData, TValue>;

export { MemoizedDataTable as DataTable, DataTableHeaderCell };
export type { DataTableColumnDef, ColumnDef };
