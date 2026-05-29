"use client";

import React, { useMemo } from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { XIcon, Share, Plus, AlertTriangle, CheckCircle2, MapPin, Calendar, LinkIcon } from "lucide-react";
import { CompensationRecord } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PercentileGauge } from "@/components/charts/PercentileGauge";
import { StackedBarBreakdown } from "@/components/charts/StackedBarBreakdown";
import { formatCurrency } from "@/lib/formatters";
import { getLevelBadgeVariant } from "@/lib/formatters";
import { MarketPositionBar } from "@/components/charts/MarketPositionBar";
import { MOCK_SALARIES } from "@/lib/data/mock/salaries";
import { useComparisonStore } from "@/lib/hooks/useComparisonStore";
import { CompanyLogo } from "@/components/shared/CompanyLogo";
import Link from "next/link";
import { toast } from "sonner";

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

interface SalaryDetailDrawerProps {
  record: CompensationRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

export function SalaryDetailDrawer({ record, isOpen, onClose }: SalaryDetailDrawerProps) {
  const addToComparison = useComparisonStore((state) => state.addToComparison);

  const { percentile, allLevelStats, companyLevelStats, similarRecords, allSameLevel, companySameLevel } = useMemo(() => {
    if (!record) return { percentile: 50, allLevelStats: null, companyLevelStats: null, similarRecords: [], allSameLevel: [], companySameLevel: [] };

    const allSameLevel = MOCK_SALARIES.filter(r => r.normalizedLevel === record.normalizedLevel);
    const sortedAll = [...allSameLevel].sort((a, b) => a.totalCompensation - b.totalCompensation);
    
    const getPercentiles = (arr: CompensationRecord[]) => {
      if (arr.length === 0) return null;
      return {
        p25: arr[Math.floor(arr.length * 0.25)].totalCompensation,
        median: arr[Math.floor(arr.length * 0.5)].totalCompensation,
        p75: arr[Math.floor(arr.length * 0.75)].totalCompensation,
        count: arr.length
      };
    };

    const companySameLevel = allSameLevel.filter(r => r.company.slug === record.company.slug);
    
    const similar = allSameLevel
      .filter(r => r.location.city === record.location.city && r.id !== record.id)
      .sort((a, b) => Math.abs(a.totalCompensation - record.totalCompensation) - Math.abs(b.totalCompensation - record.totalCompensation))
      .slice(0, 5);

    let pct = 50;
    if (sortedAll.length > 0) {
      const index = sortedAll.findIndex(r => r.totalCompensation >= record.totalCompensation);
      pct = index >= 0 ? Math.round((index / sortedAll.length) * 100) : 100;
    }

    return {
      percentile: pct,
      allLevelStats: getPercentiles(sortedAll),
      companyLevelStats: getPercentiles([...companySameLevel].sort((a, b) => a.totalCompensation - b.totalCompensation)),
      similarRecords: similar,
      allSameLevel,
      companySameLevel
    };
  }, [record]);

  if (!record) return null;

  const handleShare = () => {
    const url = new URL(window.location.origin);
    url.searchParams.set("roles", record.role);
    url.searchParams.set("companies", record.company.slug);
    url.searchParams.set("levels", record.normalizedLevel);
    url.searchParams.set("location", record.location.city);
    navigator.clipboard.writeText(url.toString());
    toast.success("Link copied to clipboard with applied filters");
  };

  const handleCompare = () => {
    addToComparison({
      companyId: record.company.slug,
      role: record.role,
      level: record.normalizedLevel
    });
    toast.success("Added to comparison tool", {
      action: {
        label: "View",
        onClick: () => window.location.href = "/compare"
      }
    });
  };

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0" />
        <DialogPrimitive.Popup className="fixed inset-y-0 right-0 z-50 w-full md:w-[450px] bg-background shadow-2xl outline-none data-open:animate-in data-closed:animate-out data-closed:slide-out-to-right data-open:slide-in-from-right duration-300 border-l overflow-hidden flex flex-col">
          
          <div className="flex items-center justify-between p-4 border-b bg-card shrink-0">
            <h2 className="font-semibold text-base">Compensation Record</h2>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon-sm" onClick={handleShare} title="Share">
                <Share className="size-4" />
              </Button>
              <DialogPrimitive.Close render={<Button variant="ghost" size="icon-sm" />}>
                <XIcon className="size-4" />
              </DialogPrimitive.Close>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-8 bg-muted/10">
            {/* Header Section */}
            <div className="flex gap-4 items-start">
              <CompanyLogo
                src={record.company.logo}
                name={record.company.name}
                alt={record.company.name}
                width={48}
                height={48}
                className="rounded-xl border bg-white shadow-sm"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-bold truncate">{record.company.name}</h3>
                  {record.verified && (
                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 py-0 text-[10px]">
                      <CheckCircle2 className="size-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                <p className="text-sm font-medium text-muted-foreground truncate">{record.rawTitle}</p>
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  <Badge variant={getLevelBadgeVariant(record.normalizedLevel)} className="uppercase text-[10px] tracking-wider">
                    {record.normalizedLevel}
                  </Badge>
                  <div className="flex items-center text-xs text-muted-foreground gap-1 font-medium bg-muted/50 px-2 py-1 rounded-md">
                    <MapPin className="size-3" />
                    {record.location.city}, {record.location.country}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground gap-1 font-medium bg-muted/50 px-2 py-1 rounded-md">
                    <Calendar className="size-3" />
                    {formatDate(record.reportedAt)}
                  </div>
                </div>
              </div>
            </div>

            {/* Total Comp Highlight */}
            <div className="rounded-2xl bg-card border shadow-sm overflow-hidden">
              <div className="p-5 flex items-center justify-between border-b bg-muted/30">
                <div>
                  <div className="text-sm font-semibold text-muted-foreground mb-1">Total Compensation (YoY)</div>
                  <div className="text-4xl font-extrabold tracking-tight text-brand-primary">
                    {formatCurrency(record.totalCompensation, record.currency)}
                  </div>
                </div>
                <PercentileGauge percentile={percentile} size="sm" label="vs Level" />
              </div>
              <div className="p-5 space-y-6">
                <StackedBarBreakdown 
                  base={record.baseSalary}
                  stock={record.stockPerYear}
                  bonus={record.bonus}
                  total={record.totalCompensation}
                  currency={record.currency}
                />
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Base</div>
                    <div className="text-base font-bold">{formatCurrency(record.baseSalary, record.currency, true)}</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Stock / yr</div>
                    <div className="text-base font-bold">{formatCurrency(record.stockPerYear, record.currency, true)}</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Bonus</div>
                    <div className="text-base font-bold">{formatCurrency(record.bonus, record.currency, true)}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Context Section */}
            <div className="space-y-4">
              <h4 className="font-bold text-sm">How does this compare?</h4>
              
              <div className="space-y-3">
                {allLevelStats && (
                  <div className="p-4 rounded-xl border bg-card text-sm">
                    <MarketPositionBar 
                      record={record} 
                      cohort={allSameLevel} 
                      cohortLabel={`all ${record.normalizedLevel}s`} 
                    />
                  </div>
                )}

                {companyLevelStats && (
                  <div className="p-4 rounded-xl border bg-card text-sm mt-3">
                    <MarketPositionBar 
                      record={record} 
                      cohort={companySameLevel} 
                      cohortLabel={`${record.company.name} ${record.normalizedLevel}s`} 
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Similar Records Section */}
            {similarRecords.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm">Similar in {record.location.city}</h4>
                  <Link href={`/?roles=${record.role}&levels=${record.normalizedLevel}&location=${record.location.city}`} className="text-xs font-semibold text-brand-primary hover:underline flex items-center gap-1">
                    View all <LinkIcon className="size-3" />
                  </Link>
                </div>
                <div className="bg-card border rounded-xl overflow-hidden divide-y">
                  {similarRecords.map(r => (
                    <div key={r.id} className="p-3 flex items-center justify-between hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-3 min-w-0">
                        <CompanyLogo
                          src={r.company.logo}
                          name={r.company.name}
                          alt={r.company.name}
                          width={24}
                          height={24}
                          className="rounded object-cover size-6 shadow-sm"
                        />
                        <div className="truncate">
                          <div className="font-semibold text-sm truncate">{r.company.name}</div>
                          <div className="text-[10px] text-muted-foreground font-medium">{r.yearsOfExperience} YoE</div>
                        </div>
                      </div>
                      <div className="font-bold text-sm">{formatCurrency(r.totalCompensation, r.currency, true)}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="h-4" /> {/* Bottom spacer */}
          </div>

          <div className="p-4 border-t bg-card shrink-0 grid grid-cols-2 gap-3">
            <Button variant="outline" className="w-full" onClick={() => {
              toast("Issue reported. We'll look into it!");
            }}>
              <AlertTriangle className="mr-2 size-4" />
              Report
            </Button>
            <Button className="w-full" onClick={handleCompare}>
              <Plus className="mr-2 size-4" />
              Compare
            </Button>
          </div>

        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
