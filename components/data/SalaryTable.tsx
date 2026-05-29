"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { 
  ArrowUpDown, 
  ChevronDown, 
  ShieldCheck, 
  Plus, 
  ExternalLink,
  SlidersHorizontal,
  Search
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { CompensationRecord } from "@/types";
import Image from "next/image";
import { formatCurrency, getLevelColor, getLevelBadgeVariant, formatYoE } from "@/lib/formatters";
import { useComparisonStore } from "@/lib/hooks/useComparisonStore";
import { SalaryDetailDrawer } from "@/components/data/SalaryDetailDrawer";

function getCountryFlag(country: string) {
  const flags: Record<string, string> = {
    "United States": "🇺🇸",
    "India": "🇮🇳",
    "United Kingdom": "🇬🇧",
    "Canada": "🇨🇦",
    "Germany": "🇩🇪",
    "Australia": "🇦🇺",
    "Singapore": "🇸🇬",
    "France": "🇫🇷",
    "Netherlands": "🇳🇱",
    "Switzerland": "🇨🇭",
  };
  return flags[country] || "🌍";
}

function formatRelativeTime(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffInMonths = (now.getFullYear() - date.getFullYear()) * 12 + now.getMonth() - date.getMonth();
  if (diffInMonths <= 0) return "This month";
  if (diffInMonths === 1) return "1 month ago";
  return `${diffInMonths} months ago`;
}

interface SalaryTableProps {
  data: CompensationRecord[];
  isLoading?: boolean;
}

export function SalaryTable({ data, isLoading }: SalaryTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [selectedRecord, setSelectedRecord] = React.useState<CompensationRecord | null>(null);
  const addToComparison = useComparisonStore((state) => state.addToComparison);


  const columns: ColumnDef<CompensationRecord>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "company",
      header: "Company",
      cell: ({ row }) => {
        const company = row.original.company;
        return (
          <div className="flex items-center gap-3">
            <Image 
              src={company.logo || "https://ui-avatars.com/api/?name=Company"} 
              alt={company.name || "Company"}
              width={32}
              height={32}
              className="h-8 w-8 rounded-md bg-muted object-cover" 
            />
            <div className="flex flex-col">
              <span className="font-semibold text-sm">{company.name}</span>
              {company.industry && (
                <span className="text-[11px] text-muted-foreground">{company.industry}</span>
              )}
            </div>
          </div>
        );
      },
      // Sticky styling will be applied in the render loop
    },
    {
      accessorKey: "role",
      header: "Role & Level",
      cell: ({ row }) => {
        const role = row.original.role;
        const rawTitle = row.original.rawTitle;
        const level = row.original.normalizedLevel;
        return (
          <div className="flex flex-col items-start gap-1">
            <span className="font-medium text-sm">{role}</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground truncate max-w-[120px]" title={rawTitle}>
                {rawTitle}
              </span>
              <Badge variant={getLevelBadgeVariant(level)} className={cn("text-[10px] px-1.5 py-0", getLevelColor(level))}>
                {level}
              </Badge>
            </div>
          </div>
        );
      },
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
    },
    {
      accessorKey: "baseSalary",
      header: ({ column }) => (
        <Button variant="ghost" size="sm" className="-ml-3 h-8 data-[state=open]:bg-accent" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Base
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      ),
      cell: ({ row }) => {
        const val = row.getValue("baseSalary") as number;
        return <span className="text-sm">{formatCurrency(val, row.original.currency, true)}</span>;
      },
    },
    {
      accessorKey: "stockPerYear",
      header: ({ column }) => (
        <Button variant="ghost" size="sm" className="-ml-3 h-8 data-[state=open]:bg-accent" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Stock / yr
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      ),
      cell: ({ row }) => {
        const val = row.getValue("stockPerYear") as number;
        return <span className="text-sm text-muted-foreground">{val > 0 ? formatCurrency(val, row.original.currency, true) : "-"}</span>;
      },
    },
    {
      accessorKey: "bonus",
      header: "Bonus",
      cell: ({ row }) => {
        const val = row.getValue("bonus") as number;
        return <span className="text-sm text-muted-foreground">{val > 0 ? formatCurrency(val, row.original.currency, true) : "-"}</span>;
      },
    },
    {
      accessorKey: "totalCompensation",
      header: ({ column }) => (
        <Button variant="ghost" size="sm" className="-ml-3 h-8 data-[state=open]:bg-accent" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Total Comp
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      ),
      cell: ({ row }) => {
        const val = row.getValue("totalCompensation") as number;
        return <span className="text-sm font-bold text-foreground">{formatCurrency(val, row.original.currency, true)}</span>;
      },
    },
    {
      accessorKey: "yearsOfExperience",
      header: "YoE",
      cell: ({ row }) => {
        const yoe = row.getValue("yearsOfExperience") as number;
        return <span className="text-sm text-muted-foreground">{formatYoE(yoe)}</span>;
      },
    },
    {
      accessorKey: "reportedAt",
      header: ({ column }) => (
        <Button variant="ghost" size="sm" className="-ml-3 h-8 data-[state=open]:bg-accent" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Reported
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      ),
      cell: ({ row }) => {
        const dateStr = row.getValue("reportedAt") as string;
        return <span className="text-xs text-muted-foreground">{formatRelativeTime(dateStr)}</span>;
      },
    },
    {
      accessorKey: "verified",
      header: "Status",
      cell: ({ row }) => {
        const verified = row.getValue("verified") as boolean;
        if (!verified) return <span className="text-xs text-muted-foreground">Unverified</span>;
        return (
          <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-500">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span className="text-xs font-medium">Verified</span>
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-end gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-muted-foreground hover:text-brand-primary"
              title="Add to compare"
              onClick={(e) => {
                e.stopPropagation();
                addToComparison({
                  companyId: row.original.company.slug,
                  level: row.original.normalizedLevel,
                  role: row.original.role
                });
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full space-y-4">
      {/* Table Toolbar */}
      <div className="flex items-center justify-between">
        <DropdownMenu>
          <DropdownMenuTrigger className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 px-3 ml-auto">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Columns
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize text-sm"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id.replace(/([A-Z])/g, ' $1').trim()}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table Wrapper */}
      <div className="rounded-md border border-border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="w-full min-w-[800px]">
            <TableHeader className="bg-muted/40">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header, idx) => {
                    // Sticky logic for company column (index 1)
                    const isSticky = idx === 1;
                    return (
                      <TableHead 
                        key={header.id}
                        className={cn(
                          "whitespace-nowrap h-10",
                          isSticky && "sticky left-0 bg-muted/40 z-20 shadow-[1px_0_0_0_theme(colors.border)]"
                        )}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <TableRow key={i}>
                    {columns.map((c, j) => (
                      <TableCell key={j} className={cn(j === 1 && "sticky left-0 bg-card z-10 shadow-[1px_0_0_0_theme(colors.border)]")}>
                        <Skeleton className="h-5 w-full max-w-[100px]" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={cn(
                      "cursor-pointer hover:bg-muted/50 transition-colors group relative",
                      row.getIsSelected() && "border-l-2 border-l-brand-primary"
                    )}
                    onClick={() => {
                      setSelectedRecord(row.original);
                    }}
                  >
                    {row.getVisibleCells().map((cell, idx) => {
                      const isSticky = idx === 1;
                      return (
                        <TableCell 
                          key={cell.id} 
                          className={cn(
                            "py-3",
                            isSticky && "sticky left-0 bg-card group-hover:bg-muted/50 transition-colors z-10 shadow-[1px_0_0_0_theme(colors.border)]"
                          )}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-64 text-center"
                  >
                    <div className="flex flex-col items-center justify-center text-muted-foreground space-y-3">
                      <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                        <Search className="h-8 w-8 text-muted-foreground/50" />
                      </div>
                      <p>No results match your filters.</p>
                      <Button variant="outline" size="sm" onClick={() => table.resetColumnFilters()}>
                        Clear filters
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between px-2">
        <div className="flex-1 text-sm text-muted-foreground">
          Showing {table.getPaginationRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} results.
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <select
              className="h-8 w-[70px] rounded-md border border-input bg-transparent px-2 py-1 text-sm outline-none ring-offset-background focus:ring-1 focus:ring-ring"
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[10, 25, 50, 100].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronDown className="h-4 w-4 rotate-90" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronDown className="h-4 w-4 -rotate-90" />
            </Button>
          </div>
        </div>
      </div>
      
      <SalaryDetailDrawer 
        record={selectedRecord} 
        isOpen={!!selectedRecord} 
        onClose={() => setSelectedRecord(null)} 
      />
    </div>
  );
}
