"use client";

import { NormalizedLevel } from "@/types";
import { formatCurrency, getLevelBadgeVariant, getLevelColor } from "@/lib/formatters";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface LevelCompRow {
  level: NormalizedLevel;
  base: number;
  stock: number;
  bonus: number;
  total: number;
  count: number;
}

interface CompanyCompensationCardsProps {
  rows: LevelCompRow[];
  globalMedians: Partial<Record<NormalizedLevel, number>>;
}

export function CompanyCompensationCards({
  rows,
  globalMedians,
}: CompanyCompensationCardsProps) {
  if (rows.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-8">No compensation data.</p>
    );
  }

  return (
    <div className="md:hidden divide-y divide-border">
      {rows.map((comp) => {
        const globalMedian = globalMedians[comp.level] || 1;
        const diffRatio = comp.total / globalMedian;

        let colorClass = "text-foreground";
        if (diffRatio > 1.2)
          colorClass = "text-emerald-600 dark:text-emerald-400 font-bold";
        else if (diffRatio > 1.05) colorClass = "text-emerald-500 font-medium";
        else if (diffRatio < 0.8) colorClass = "text-red-600 dark:text-red-400 font-bold";
        else if (diffRatio < 0.95) colorClass = "text-red-500 font-medium";

        return (
          <div key={comp.level} className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <Badge
                variant={getLevelBadgeVariant(comp.level)}
                className={cn("text-[10px]", getLevelColor(comp.level))}
              >
                {comp.level}
              </Badge>
              <span className="text-xs text-muted-foreground">{comp.count} records</span>
            </div>
            <p className={cn("text-xl font-bold", colorClass)}>
              {formatCurrency(comp.total, "INR", true)}
            </p>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <span className="text-muted-foreground block">Base</span>
                <span className="font-medium">{formatCurrency(comp.base, "INR", true)}</span>
              </div>
              <div>
                <span className="text-muted-foreground block">Stock</span>
                <span className="font-medium">
                  {comp.stock > 0 ? formatCurrency(comp.stock, "INR", true) : "—"}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground block">Bonus</span>
                <span className="font-medium">
                  {comp.bonus > 0 ? formatCurrency(comp.bonus, "INR", true) : "—"}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
