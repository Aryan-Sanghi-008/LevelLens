import React from "react";
import Link from "next/link";
import { Building2, Users } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/formatters";
import { ExtendedCompanyProfile } from "@/lib/data/companyStats";
import { cn } from "@/lib/utils";

const INDUSTRY_COLORS: Record<string, string> = {
  Technology: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
  Finance: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300",
  Consulting: "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300",
  "E-commerce": "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300",
  "Media & Entertainment": "bg-pink-100 text-pink-700 dark:bg-pink-900/50 dark:text-pink-300",
  default: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
};

interface CompanyCardProps {
  profile: ExtendedCompanyProfile;
  className?: string;
}

export function CompanyCard({ profile, className }: CompanyCardProps) {
  const { meta, medianTotal, p25Total, p75Total, dataPointCount } = profile;
  
  const industryColor = INDUSTRY_COLORS[meta.industry || ""] || INDUSTRY_COLORS.default;

  // Calculate sparkline widths
  // We assume a reasonable max bound for rendering the bar, say p75 * 1.2
  const maxBound = p75Total * 1.2;
  const p25Pct = Math.max(0, (p25Total / maxBound) * 100);
  const p75Pct = Math.min(100, (p75Total / maxBound) * 100);
  const widthPct = Math.max(p75Pct - p25Pct, 1);

  return (
    <Link href={`/companies/${meta.slug}`}>
      <Card className={cn("group cursor-pointer hover:-translate-y-1 hover:shadow-lg transition-all duration-300 h-full flex flex-col", className)}>
        <CardHeader className="flex flex-row items-start justify-between pb-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border bg-muted/50 p-1 shadow-sm overflow-hidden">
              {meta.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={meta.logo} alt={meta.name} className="size-full object-cover rounded-md" />
              ) : (
                <Building2 className="size-5 text-muted-foreground/50" />
              )}
            </div>
            <div>
              <h3 className="font-heading font-semibold leading-tight line-clamp-1">{meta.name}</h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Users className="size-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{meta.size}</span>
              </div>
            </div>
          </div>
          <Badge variant="secondary" className={cn("text-[10px] px-1.5 py-0 font-medium whitespace-nowrap", industryColor)}>
            {meta.industry}
          </Badge>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col justify-center pb-2">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground font-medium">Median Total Comp</p>
            <div className="text-2xl font-bold tracking-tight text-foreground">
              {formatCurrency(medianTotal, "INR", true)}
            </div>
          </div>
          
          <div className="mt-4 space-y-1.5">
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>{formatCurrency(p25Total, "INR", true)} (25th)</span>
              <span>{formatCurrency(p75Total, "INR", true)} (75th)</span>
            </div>
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden relative">
              <div 
                className="absolute top-0 h-full bg-foreground/30 group-hover:bg-brand-primary/60 transition-colors rounded-full"
                style={{ left: `${p25Pct}%`, width: `${widthPct}%` }}
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-4 border-t text-xs text-muted-foreground flex justify-between items-center bg-muted/30">
          <span>{dataPointCount.toLocaleString()} verified data points</span>
          <span className="text-brand-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 transform duration-300">
            View Profile →
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
