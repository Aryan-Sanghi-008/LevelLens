import React from "react";
import { CompensationRecord } from "@/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getLevelColor, getLevelBadgeVariant } from "@/lib/formatters";
import { Building2, MapPin } from "lucide-react";
import { CompensationBreakdown } from "./CompensationBreakdown";
import { cn } from "@/lib/utils";

interface CompensationCardProps {
  record: CompensationRecord;
  className?: string;
  size?: "default" | "sm";
}

export function CompensationCard({ record, className, size = "default" }: CompensationCardProps) {
  const badgeVariant = getLevelBadgeVariant(record.normalizedLevel);
  const colorClass = getLevelColor(record.normalizedLevel);

  return (
    <Card size={size} className={cn("w-full transition-all hover:shadow-md", className)}>
      <CardHeader className="flex flex-row items-start gap-4 space-y-0 border-b pb-4">
        {/* Company Logo or Fallback */}
        <div className="flex size-12 shrink-0 items-center justify-center rounded-lg border bg-muted/50 p-2 shadow-sm">
          {record.company.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img 
              src={record.company.logo} 
              alt={`${record.company.name} logo`} 
              className="size-full object-contain"
            />
          ) : (
            <Building2 className="size-6 text-muted-foreground/50" />
          )}
        </div>

        {/* Info */}
        <div className="flex flex-1 flex-col gap-1.5">
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-1">
              <h3 className="font-heading text-lg font-semibold leading-none tracking-tight">
                {record.role}
              </h3>
              <p className="text-sm text-muted-foreground">{record.company.name}</p>
            </div>
            
            <Badge 
              variant={badgeVariant} 
              className={cn("whitespace-nowrap font-medium", colorClass)}
            >
              {record.normalizedLevel}
            </Badge>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="size-3.5" />
            <span>{record.location.city}, {record.location.country}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <CompensationBreakdown record={record} />
      </CardContent>
    </Card>
  );
}
