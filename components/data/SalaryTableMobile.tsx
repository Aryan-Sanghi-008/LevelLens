"use client";

import * as React from "react";
import { CompensationRecord } from "@/types";
import { CompanyLogo } from "@/components/shared/CompanyLogo";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/shared/EmptyState";
import {
  formatCurrency,
  getLevelBadgeVariant,
  getLevelColor,
} from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { Search, Loader2 } from "lucide-react";

interface SalaryTableMobileProps {
  data: CompensationRecord[];
  isLoading?: boolean;
  isPending?: boolean;
  onRecordClick: (record: CompensationRecord) => void;
  className?: string;
}

export function SalaryTableMobile({
  data,
  isLoading,
  isPending,
  onRecordClick,
  className,
}: SalaryTableMobileProps) {
  if (isLoading) {
    return (
      <div className={cn("space-y-3 p-3", className)}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-28 rounded-xl border border-border bg-card animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <EmptyState
        title="No results match your filters"
        description="Try adjusting your filters or search criteria."
        icon={Search}
        className="py-12"
      />
    );
  }

  return (
    <div className={cn("relative", className)}>
      {isPending && (
        <div className="absolute top-2 right-3 z-10" aria-label="Filtering">
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        </div>
      )}
      <ul className="divide-y divide-border">
        {data.map((record) => {
          const level = record.normalizedLevel;
          const isSelfReported = record.tags?.includes("self-reported");

          return (
            <li key={record.id}>
              <button
                type="button"
                onClick={() => onRecordClick(record)}
                className={cn(
                  "w-full text-left p-4 transition-colors hover:bg-muted/40 active:bg-muted/60",
                  isSelfReported && "bg-amber-50/40 dark:bg-amber-500/5"
                )}
              >
                <div className="flex items-start gap-3">
                  <CompanyLogo
                    src={record.company.logo}
                    name={record.company.name}
                    alt={record.company.name}
                    width={40}
                    height={40}
                    className="size-10 rounded-lg shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-semibold text-sm truncate">
                          {record.company.name}
                        </p>
                        <p className="text-sm text-muted-foreground truncate">
                          {record.role}
                        </p>
                      </div>
                      <Badge
                        variant={getLevelBadgeVariant(level)}
                        className={cn(
                          "text-[10px] px-1.5 py-0 shrink-0",
                          getLevelColor(level)
                        )}
                      >
                        {level}
                      </Badge>
                    </div>
                    <p className="mt-2 text-2xl font-bold tracking-tight">
                      {formatCurrency(
                        record.totalCompensation,
                        record.currency,
                        true
                      )}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <span>
                        Base{" "}
                        <span className="font-medium text-foreground">
                          {formatCurrency(record.baseSalary, record.currency, true)}
                        </span>
                      </span>
                      <span>
                        Stock{" "}
                        <span className="font-medium text-foreground">
                          {record.stockPerYear > 0
                            ? formatCurrency(
                                record.stockPerYear,
                                record.currency,
                                true
                              )
                            : "—"}
                        </span>
                      </span>
                      <span>
                        Bonus{" "}
                        <span className="font-medium text-foreground">
                          {record.bonus > 0
                            ? formatCurrency(record.bonus, record.currency, true)
                            : "—"}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
