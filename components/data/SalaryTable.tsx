"use client";

import * as React from "react";
import {
  Column,
  ColumnDef,
  Table,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  OnChangeFn,
  useReactTable,
  Row,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  ArrowUpDown,
  ChevronDown,
  ShieldCheck,
  Plus,
  ExternalLink,
  SlidersHorizontal,
  Search,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/shared/EmptyState";
import {
  SalaryTableSkeleton,
  SALARY_TABLE_ROW_HEIGHT,
} from "@/components/shared/Skeletons";
import { cn } from "@/lib/utils";
import { CompensationRecord } from "@/types";
import { CompanyLogo } from "@/components/shared/CompanyLogo";
import {
  formatCurrency,
  getLevelColor,
  getLevelBadgeVariant,
  formatYoE,
} from "@/lib/formatters";
import { useComparisonStore } from "@/lib/hooks/useComparisonStore";
import { SalaryDetailDrawer } from "@/components/data/SalaryDetailDrawer";
import { SalaryTableMobile } from "@/components/data/SalaryTableMobile";

// ─── Constants ────────────────────────────────────────────────────────────────

/** Fixed row height — must match the actual rendered row height */
export const ROW_HEIGHT = SALARY_TABLE_ROW_HEIGHT;
const OVERSCAN = 10;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getCountryFlag(country: string): string {
  const flags: Record<string, string> = {
    "United States": "🇺🇸",
    India: "🇮🇳",
    "United Kingdom": "🇬🇧",
    Canada: "🇨🇦",
    Germany: "🇩🇪",
    Australia: "🇦🇺",
    Singapore: "🇸🇬",
    France: "🇫🇷",
    Netherlands: "🇳🇱",
    Switzerland: "🇨🇭",
  };
  return flags[country] || "🌍";
}

function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffInMonths =
    (now.getFullYear() - date.getFullYear()) * 12 +
    now.getMonth() -
    date.getMonth();
  if (diffInMonths <= 0) return "This month";
  if (diffInMonths === 1) return "1 month ago";
  return `${diffInMonths} months ago`;
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface SalaryTableProps {
  data: CompensationRecord[];
  isLoading?: boolean;
  isPending?: boolean;
  sorting?: SortingState;
  onSortingChange?: OnChangeFn<SortingState>;
}

// ─── Scroll position indicator ────────────────────────────────────────────────

function ScrollPositionBar({
  scrollTop,
  totalHeight,
  containerHeight,
}: {
  scrollTop: number;
  totalHeight: number;
  containerHeight: number;
}) {
  if (totalHeight <= containerHeight) return null;

  const thumbHeight = Math.max(
    40,
    (containerHeight / totalHeight) * containerHeight
  );
  const maxScroll = totalHeight - containerHeight;
  const thumbTop = (scrollTop / maxScroll) * (containerHeight - thumbHeight);

  return (
    <div
      className="absolute right-0 top-0 bottom-0 w-1 bg-border/50 z-30 rounded-full"
      aria-hidden="true"
    >
      <div
        className="absolute w-full bg-muted-foreground/40 rounded-full transition-none"
        style={{ height: thumbHeight, top: thumbTop }}
      />
    </div>
  );
}

export { SalaryTableSkeleton };

// ─── SalaryTable ─────────────────────────────────────────────────────────────

export function SalaryTable({
  data,
  isLoading,
  isPending,
  sorting: controlledSorting,
  onSortingChange,
}: SalaryTableProps) {
  const [internalSorting, setInternalSorting] = React.useState<SortingState>([]);
  const sorting = controlledSorting ?? internalSorting;
  const setSorting: OnChangeFn<SortingState> =
    onSortingChange ?? setInternalSorting;
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<Record<string, boolean>>({});
  const [selectedRecord, setSelectedRecord] = React.useState<CompensationRecord | null>(null);
  const [scrollTop, setScrollTop] = React.useState(0);

  const addToComparison = useComparisonStore(
    React.useCallback((state) => state.addToComparison, [])
  );

  const handleCloseDrawer = React.useCallback(() => setSelectedRecord(null), []);

  const handleColumnSort = React.useCallback(
    (column: Column<CompensationRecord, unknown>) => {
      column.toggleSorting(column.getIsSorted() === "asc");
    },
    []
  );

  const handleSelectAll = React.useCallback(
    (table: Table<CompensationRecord>, value: boolean | string) => {
      table.toggleAllRowsSelected(!!value);
    },
    []
  );

  const handleRowSelect = React.useCallback(
    (row: Row<CompensationRecord>, value: boolean | string) => {
      row.toggleSelected(!!value);
    },
    []
  );

  const handleAddToComparison = React.useCallback(
    (record: CompensationRecord) => {
      addToComparison({
        companyId: record.company.slug,
        level: record.normalizedLevel,
        role: record.role,
      });
    },
    [addToComparison]
  );

  const handleCompareClick = React.useCallback(
    (e: React.MouseEvent, record: CompensationRecord) => {
      e.stopPropagation();
      handleAddToComparison(record);
    },
    [handleAddToComparison]
  );

  const handleDetailClick = React.useCallback(
    (e: React.MouseEvent, record: CompensationRecord) => {
      e.stopPropagation();
      setSelectedRecord(record);
    },
    []
  );

  // ── Column definitions (memoised) ──────────────────────────────────────────

  const columns = React.useMemo<ColumnDef<CompensationRecord>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllRowsSelected()}
            onCheckedChange={(value) => handleSelectAll(table, value)}
            aria-label="Select all"
            className="translate-y-[2px]"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => handleRowSelect(row, value)}
            aria-label={`Select row for ${row.original.company.name}`}
            className="translate-y-[2px]"
          />
        ),
        enableSorting: false,
        enableHiding: false,
        size: 40,
      },
      {
        accessorKey: "company",
        header: "Company",
        cell: ({ row }) => {
          const company = row.original.company;
          return (
            <div className="flex items-center gap-3">
              <CompanyLogo
                src={company.logo}
                name={company.name}
                alt={company.name || "Company"}
                width={32}
                height={32}
                className="h-8 w-8 rounded-md bg-muted object-cover shrink-0"
              />
              <div className="flex flex-col min-w-0">
                <span className="font-semibold text-sm truncate">{company.name}</span>
                {company.industry && (
                  <span className="text-[11px] text-muted-foreground truncate">
                    {company.industry}
                  </span>
                )}
              </div>
            </div>
          );
        },
        size: 180,
      },
      {
        accessorKey: "role",
        header: "Role & Level",
        cell: ({ row }) => {
          const level = row.original.normalizedLevel;
          return (
            <div className="flex flex-col items-start gap-0.5">
              <span className="font-medium text-sm">{row.original.role}</span>
              <div className="flex items-center gap-1.5">
                <span
                  className="text-xs text-muted-foreground truncate max-w-[110px]"
                  title={row.original.rawTitle}
                >
                  {row.original.rawTitle}
                </span>
                <Badge
                  variant={getLevelBadgeVariant(level)}
                  className={cn("text-[10px] px-1.5 py-0 shrink-0", getLevelColor(level))}
                >
                  {level}
                </Badge>
              </div>
            </div>
          );
        },
        size: 200,
      },
      {
        accessorKey: "location",
        header: "Location",
        cell: ({ row }) => {
          const loc = row.original.location;
          return (
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <span>{getCountryFlag(loc.country)}</span>
              <span className="text-sm">{loc.city}</span>
            </div>
          );
        },
        size: 120,
      },
      {
        accessorKey: "baseSalary",
        header: ({ column }) => (
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8"
            onClick={() => handleColumnSort(column)}
          >
            Base
            <ArrowUpDown className="ml-1.5 h-3 w-3" />
          </Button>
        ),
        cell: ({ row }) => (
          <span className="text-sm">
            {formatCurrency(
              row.getValue<number>("baseSalary"),
              row.original.currency,
              true
            )}
          </span>
        ),
        size: 100,
      },
      {
        accessorKey: "stockPerYear",
        header: ({ column }) => (
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8"
            onClick={() => handleColumnSort(column)}
          >
            Stock/yr
            <ArrowUpDown className="ml-1.5 h-3 w-3" />
          </Button>
        ),
        cell: ({ row }) => {
          const val = row.getValue<number>("stockPerYear");
          return (
            <span className="text-sm text-muted-foreground">
              {val > 0 ? formatCurrency(val, row.original.currency, true) : "—"}
            </span>
          );
        },
        size: 100,
      },
      {
        accessorKey: "bonus",
        header: "Bonus",
        cell: ({ row }) => {
          const val = row.getValue<number>("bonus");
          return (
            <span className="text-sm text-muted-foreground">
              {val > 0 ? formatCurrency(val, row.original.currency, true) : "—"}
            </span>
          );
        },
        size: 90,
      },
      {
        accessorKey: "totalCompensation",
        header: ({ column }) => (
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8"
            onClick={() => handleColumnSort(column)}
          >
            Total Comp
            <ArrowUpDown className="ml-1.5 h-3 w-3" />
          </Button>
        ),
        cell: ({ row }) => (
          <span className="text-sm font-bold text-foreground">
            {formatCurrency(
              row.getValue<number>("totalCompensation"),
              row.original.currency,
              true
            )}
          </span>
        ),
        size: 120,
      },
      {
        accessorKey: "yearsOfExperience",
        header: "YoE",
        cell: ({ row }) => (
          <span className="text-sm text-muted-foreground">
            {formatYoE(row.getValue<number>("yearsOfExperience"))}
          </span>
        ),
        size: 70,
      },
      {
        accessorKey: "reportedAt",
        header: ({ column }) => (
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8"
            onClick={() => handleColumnSort(column)}
          >
            Reported
            <ArrowUpDown className="ml-1.5 h-3 w-3" />
          </Button>
        ),
        cell: ({ row }) => (
          <span className="text-xs text-muted-foreground">
            {formatRelativeTime(row.getValue<string>("reportedAt"))}
          </span>
        ),
        size: 110,
      },
      {
        accessorKey: "verified",
        header: "Status",
        cell: ({ row }) => {
          const verified = row.getValue<boolean>("verified");
          const tags = row.original.tags ?? [];
          const isSelfReported = tags.includes("self-reported");

          if (isSelfReported) {
            return (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 text-[10px] font-semibold px-2 py-0.5">
                Self-reported
              </span>
            );
          }
          if (!verified) {
            return (
              <span className="text-xs text-muted-foreground">Unverified</span>
            );
          }
          return (
            <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-500">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">Verified</span>
            </div>
          );
        },
        size: 100,
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <div className="flex items-center justify-end gap-1.5">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-primary"
              aria-label={`Add ${row.original.company.name} to comparison`}
              title="Add to compare"
              onClick={(e) => handleCompareClick(e, row.original)}
            >
              <Plus className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground"
              aria-label={`Open detailed record for ${row.original.company.name}`}
              title="Open detail"
              onClick={(e) => handleDetailClick(e, row.original)}
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </Button>
          </div>
        ),
        size: 80,
        enableHiding: false,
        enableSorting: false,
      },
    ],
    [
      handleSelectAll,
      handleRowSelect,
      handleColumnSort,
      handleCompareClick,
      handleDetailClick,
    ]
  );

  // ── TanStack Table instance ────────────────────────────────────────────────

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: { sorting, columnVisibility, rowSelection },
    // No pagination — virtualisation handles this
    manualPagination: false,
  });

  const { rows } = table.getRowModel();

  const tableStats = React.useMemo(
    () => ({
      totalRows: rows.length,
      selectedCount: Object.values(rowSelection).filter(Boolean).length,
    }),
    [rows.length, rowSelection]
  );

  // ── Virtual scrolling ──────────────────────────────────────────────────────

  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => scrollContainerRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: OVERSCAN,
  });

  const virtualItems = virtualizer.getVirtualItems();
  const totalHeight = virtualizer.getTotalSize();

  const [activeCell, setActiveCell] = React.useState<{ rowIndex: number; colIndex: number } | null>(null);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLElement>, rowIndex: number, colIndex: number) => {
      let nextRowIndex = rowIndex;
      let nextColIndex = colIndex;
      let handled = false;

      switch (e.key) {
        case "ArrowUp":
          nextRowIndex = Math.max(0, rowIndex - 1);
          handled = true;
          break;
        case "ArrowDown":
          nextRowIndex = Math.min(rows.length - 1, rowIndex + 1);
          handled = true;
          break;
        case "ArrowLeft":
          nextColIndex = Math.max(0, colIndex - 1);
          handled = true;
          break;
        case "ArrowRight":
          nextColIndex = Math.min(12 - 1, colIndex + 1); // 12 columns total
          handled = true;
          break;
        case " ":
          e.preventDefault();
          rows[rowIndex]?.toggleSelected();
          handled = true;
          break;
        case "Enter":
          e.preventDefault();
          setSelectedRecord(rows[rowIndex]?.original || null);
          handled = true;
          break;
        default:
          break;
      }

      if (handled) {
        e.stopPropagation();

        if (nextRowIndex !== rowIndex || nextColIndex !== colIndex) {
          setActiveCell({ rowIndex: nextRowIndex, colIndex: nextColIndex });

          const isRowVisible = virtualizer.getVirtualItems().some((item) => item.index === nextRowIndex);
          if (!isRowVisible) {
            virtualizer.scrollToIndex(nextRowIndex, { align: "auto" });
          }

          setTimeout(() => {
            const target = scrollContainerRef.current?.querySelector(
              `[data-row-idx="${nextRowIndex}"][data-col-idx="${nextColIndex}"]`
            ) as HTMLElement;
            if (target) {
              target.focus();
            }
          }, 60);
        }
      }
    },
    [rows, virtualizer]
  );

  // Track scroll position for the indicator bar
  const handleScroll = React.useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      setScrollTop(e.currentTarget.scrollTop);
    },
    []
  );

  // ── Row click handler ──────────────────────────────────────────────────────

  const handleRowClick = React.useCallback(
    (row: Row<CompensationRecord>) => {
      setSelectedRecord(row.original);
    },
    []
  );

  // ── Column visibility toggle ───────────────────────────────────────────────

  const toggleColumnVisibility = React.useCallback(
    (columnId: string, value: boolean) => {
      table.getColumn(columnId)?.toggleVisibility(value);
    },
    [table]
  );

  // ── Header groups (memoised) ───────────────────────────────────────────────

  const headerGroups = React.useMemo(
    () => table.getHeaderGroups(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [table, sorting, columnVisibility]
  );

  const hiddenColumns = React.useMemo(
    () =>
      table
        .getAllColumns()
        .filter((col) => col.getCanHide()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [table, columnVisibility]
  );

  // ── Render ─────────────────────────────────────────────────────────────────

  const sortedData = React.useMemo(() => {
    if (sorting.length === 0) return data;
    const { id, desc } = sorting[0];
    const field = id as keyof CompensationRecord;
    return [...data].sort((a, b) => {
      let aVal: number | string = a[field] as number | string;
      let bVal: number | string = b[field] as number | string;
      if (id === "reportedAt") {
        aVal = new Date(aVal as string).getTime();
        bVal = new Date(bVal as string).getTime();
      }
      if (aVal < bVal) return desc ? 1 : -1;
      if (aVal > bVal) return desc ? -1 : 1;
      return 0;
    });
  }, [data, sorting]);

  return (
    <div className="w-full space-y-3">
      {/* Mobile card list */}
      <div className="md:hidden rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <SalaryTableMobile
          data={sortedData}
          isLoading={isLoading}
          isPending={isPending}
          onRecordClick={(record) => setSelectedRecord(record)}
        />
      </div>

      {/* Desktop toolbar */}
      <div className="hidden md:flex items-center justify-end gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 px-3"
          >
            <SlidersHorizontal className="mr-1.5 h-3.5 w-3.5" />
            Columns
            <ChevronDown className="h-3.5 w-3.5 opacity-50" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {hiddenColumns.map((column) => (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize text-sm"
                checked={column.getIsVisible()}
                onCheckedChange={(value) =>
                  toggleColumnVisibility(column.id, !!value)
                }
              >
                {column.id.replace(/([A-Z])/g, " $1").trim()}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Desktop table container */}
      <div className="hidden md:block rounded-xl border border-border bg-card shadow-sm overflow-hidden relative">
        {isPending && (
          <div
            className="absolute top-3 right-3 z-40 pointer-events-none"
            aria-label="Filtering"
          >
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          </div>
        )}
        {/* Sticky Header — rendered outside the scroll container */}
        <div className="overflow-x-auto bg-muted/40 border-b border-border">
          <table
            className="w-full min-w-[860px] border-collapse"
            style={{ tableLayout: "fixed" }}
          >
            <colgroup>
              {columns.map((col) => (
                <col
                  key={"id" in col ? col.id : (col as { accessorKey: string }).accessorKey}
                  style={{ width: col.size ?? 120 }}
                />
              ))}
            </colgroup>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header, idx) => {
                    const isSticky = idx === 1;
                    return (
                      <th
                        key={header.id}
                        role="columnheader"
                        aria-sort={
                          header.column.getCanSort()
                            ? header.column.getIsSorted()
                              ? header.column.getIsSorted() === "asc"
                                ? "ascending"
                                : "descending"
                              : "none"
                            : undefined
                        }
                        className={cn(
                          "h-10 px-3 text-left text-xs font-semibold text-muted-foreground whitespace-nowrap",
                          isSticky &&
                            "sticky left-0 z-20 bg-muted/60 shadow-[1px_0_0_0_hsl(var(--border))]"
                        )}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
          </table>
        </div>

        {/* Virtualised Body */}
        {isLoading ? (
          <div className="overflow-x-auto">
            <table
              className="w-full min-w-[860px] border-collapse"
              style={{ tableLayout: "fixed" }}
            >
              <colgroup>
                {columns.map((col) => (
                  <col
                    key={"id" in col ? col.id : (col as { accessorKey: string }).accessorKey}
                    style={{ width: col.size ?? 120 }}
                  />
                ))}
              </colgroup>
              <tbody>
                {Array.from({ length: 10 }).map((_, i) => (
                  <tr key={i} style={{ height: ROW_HEIGHT }}>
                    {columns.map((col, j) => (
                      <td
                        key={j}
                        className={cn(
                          "px-3",
                          j === 1 &&
                            "sticky left-0 bg-card shadow-[1px_0_0_0_hsl(var(--border))]"
                        )}
                      >
                        <Skeleton className="h-4 w-full max-w-[100px]" />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : rows.length === 0 ? (
          <EmptyState
            title="No results match your filters"
            description="Try adjusting your filters or search criteria."
            icon={Search}
            className="h-56"
          />
        ) : (
          <div
            ref={scrollContainerRef}
            className="overflow-auto relative"
            style={{ height: Math.min(totalHeight, 600) }}
            onScroll={handleScroll}
          >
            {/* Total height spacer */}
            <div style={{ height: totalHeight, width: "100%", position: "relative" }}>
              {/* Virtual rows */}
              <table
                role="grid"
                aria-colcount={columns.length}
                aria-rowcount={rows.length + 1}
                aria-busy={isPending}
                className="w-full min-w-[860px] border-collapse absolute top-0 left-0"
                style={{ tableLayout: "fixed" }}
              >
                <colgroup>
                  {columns.map((col) => (
                    <col
                      key={"id" in col ? col.id : (col as { accessorKey: string }).accessorKey}
                      style={{ width: col.size ?? 120 }}
                    />
                  ))}
                </colgroup>
                <tbody>
                  {virtualItems.map((virtualRow) => {
                    const row = rows[virtualRow.index];
                    if (!row) return null;
                    const isSelfReported = row.original.tags?.includes("self-reported");

                    return (
                      <tr
                        key={row.id}
                        role="row"
                        aria-selected={row.getIsSelected()}
                        data-index={virtualRow.index}
                        data-state={row.getIsSelected() ? "selected" : undefined}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: ROW_HEIGHT,
                          transform: `translateY(${virtualRow.start}px)`,
                        }}
                        className={cn(
                          "group cursor-pointer border-b border-border/50 transition-colors hover:bg-muted/40",
                          row.getIsSelected() && "bg-primary/5",
                          isSelfReported && "bg-amber-50/40 dark:bg-amber-500/5"
                        )}
                        onClick={() => handleRowClick(row)}
                      >
                        {row.getVisibleCells().map((cell, idx) => {
                          const isSticky = idx === 1;
                          const isCellActive = activeCell
                            ? activeCell.rowIndex === virtualRow.index && activeCell.colIndex === idx
                            : virtualRow.index === 0 && idx === 1;
                          return (
                            <td
                              key={cell.id}
                              role="gridcell"
                              data-row-idx={virtualRow.index}
                              data-col-idx={idx}
                              tabIndex={isCellActive ? 0 : -1}
                              onKeyDown={(e) => handleKeyDown(e, virtualRow.index, idx)}
                              onFocus={() => setActiveCell({ rowIndex: virtualRow.index, colIndex: idx })}
                              className={cn(
                                "px-3 overflow-hidden focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-1 focus:ring-offset-background",
                                isSticky &&
                                  "sticky left-0 z-10 bg-card group-hover:bg-muted/40 transition-colors shadow-[1px_0_0_0_hsl(var(--border))]",
                                row.getIsSelected() && isSticky && "bg-primary/5"
                              )}
                              style={{ height: ROW_HEIGHT }}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Scroll position indicator */}
            <ScrollPositionBar
              scrollTop={scrollTop}
              totalHeight={totalHeight}
              containerHeight={Math.min(totalHeight, 600)}
            />
          </div>
        )}

        {/* Footer: row count */}
        {!isLoading && rows.length > 0 && (
          <div className="flex items-center justify-between px-4 py-2.5 border-t border-border bg-muted/20 text-xs text-muted-foreground">
            <span>
              <span className="font-semibold text-foreground">
                {tableStats.totalRows.toLocaleString()}
              </span>{" "}
              records
              {tableStats.selectedCount > 0 && (
                <span className="ml-2 text-primary font-medium">
                  · {tableStats.selectedCount} selected
                </span>
              )}
            </span>
            <span className="text-[11px]">
              Scroll to explore · {OVERSCAN}-row overscan active
            </span>
          </div>
        )}
      </div>

      <SalaryDetailDrawer
        record={selectedRecord}
        isOpen={!!selectedRecord}
        onClose={handleCloseDrawer}
      />
    </div>
  );
}

SalaryTable.Skeleton = SalaryTableSkeleton;
