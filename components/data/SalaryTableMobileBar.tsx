"use client";

import { SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { OnChangeFn, SortingState } from "@tanstack/react-table";
import { cn } from "@/lib/utils";

interface SalaryTableMobileBarProps {
  activeFilterCount: number;
  onOpenFilters: () => void;
  sorting: SortingState;
  onSortingChange: OnChangeFn<SortingState>;
  className?: string;
}

const SORT_OPTIONS = [
  { id: "totalCompensation", label: "Total comp" },
  { id: "baseSalary", label: "Base salary" },
  { id: "reportedAt", label: "Reported date" },
] as const;

export function SalaryTableMobileBar({
  activeFilterCount,
  onOpenFilters,
  sorting,
  onSortingChange,
  className,
}: SalaryTableMobileBarProps) {
  const sortField = sorting[0]?.id ?? "totalCompensation";
  const sortDir = sorting[0]?.desc ? "desc" : "asc";

  const handleFieldChange = (field: string) => {
    onSortingChange([{ id: field, desc: sortDir === "desc" }]);
  };

  const handleDirChange = (dir: string) => {
    onSortingChange([{ id: sortField, desc: dir === "desc" }]);
  };

  return (
    <div
      className={cn(
        "sticky top-14 z-40 flex items-center gap-2 border-b border-border bg-background/95 px-3 py-2 backdrop-blur md:hidden",
        className
      )}
    >
      <Button
        variant="outline"
        size="sm"
        className="h-9 flex-1 gap-2 rounded-lg"
        onClick={onOpenFilters}
      >
        <SlidersHorizontal className="h-4 w-4 text-brand-primary" />
        <span className="font-medium">
          Filters{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
        </span>
        {activeFilterCount > 0 && (
          <Badge className="ml-auto h-5 min-w-5 rounded-full bg-brand-primary px-1.5 text-[10px]">
            {activeFilterCount}
          </Badge>
        )}
      </Button>

      <Select value={sortField} onValueChange={(v) => v && handleFieldChange(v)}>
        <SelectTrigger className="h-9 w-[130px] gap-1">
          <ArrowUpDown className="h-3.5 w-3.5 shrink-0 opacity-50" />
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((opt) => (
            <SelectItem key={opt.id} value={opt.id}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={sortDir} onValueChange={(v) => v && handleDirChange(v)}>
        <SelectTrigger className="h-9 w-[72px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="desc">Desc</SelectItem>
          <SelectItem value="asc">Asc</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
