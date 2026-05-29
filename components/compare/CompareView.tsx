"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useComparisonStore } from "@/lib/hooks/useComparisonStore";
import { MOCK_SALARIES } from "@/lib/data/mock/salaries";
import { MOCK_COMPANIES } from "@/lib/data/mock/companies";
import { getPercentileBand, formatCurrency } from "@/lib/formatters";
import { ComparisonSlot, NormalizedLevel } from "@/types";
import { PageShell } from "@/components/layout/PageShell";
import { EmptyState } from "@/components/shared/EmptyState";
import { CompanyLogo } from "@/components/shared/CompanyLogo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GitCompare, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQueryState } from "nuqs";
import { parseAsSlots } from "@/lib/searchParams";
import { ShareButton } from "@/components/shared/ShareButton";

interface SlotStats {
  slot: ComparisonSlot;
  companyName: string;
  logo?: string;
  role: string;
  level: NormalizedLevel;
  base: number;
  stock: number;
  bonus: number;
  total: number;
  count: number;
  currency: string;
}

function resolveSlotStats(slot: ComparisonSlot): SlotStats | null {
  if (!slot.companyId || !slot.level || !slot.role) return null;

  const company = MOCK_COMPANIES.find((c) => c.slug === slot.companyId);
  const records = MOCK_SALARIES.filter(
    (r) =>
      r.company.slug === slot.companyId &&
      r.normalizedLevel === slot.level &&
      r.role === slot.role
  );
  if (records.length === 0 || !company) return null;

  const base = getPercentileBand(0, records.map((r) => r.baseSalary)).p50;
  const stock = getPercentileBand(0, records.map((r) => r.stockPerYear)).p50;
  const bonus = getPercentileBand(0, records.map((r) => r.bonus)).p50;
  const total = getPercentileBand(0, records.map((r) => r.totalCompensation)).p50;

  return {
    slot,
    companyName: company.name,
    logo: company.logo,
    role: slot.role,
    level: slot.level,
    base,
    stock,
    bonus,
    total,
    count: records.length,
    currency: records[0].currency,
  };
}

const METRICS = [
  { key: "total" as const, label: "Total comp" },
  { key: "base" as const, label: "Base" },
  { key: "stock" as const, label: "Stock/yr" },
  { key: "bonus" as const, label: "Bonus" },
  { key: "count" as const, label: "Data points" },
];

export function CompareView() {
  const { slots: storeSlots } = useComparisonStore();
  const [urlSlots, setUrlSlots] = useQueryState("slots", parseAsSlots.withDefault([]));
  const [liveAnnouncement, setLiveAnnouncement] = useState("");

  // Bidirectional Synchronization between URL slots and Zustand store
  useEffect(() => {
    if (urlSlots.length > 0) {
      useComparisonStore.setState({ slots: urlSlots });
    } else if (storeSlots.length > 0 && urlSlots.length === 0) {
      setUrlSlots(
        storeSlots.filter(
          (s): s is { companyId: string; role: string; level: NormalizedLevel } =>
            !!s.companyId && !!s.role && !!s.level
        )
      );
    }
  }, [urlSlots, setUrlSlots, storeSlots]);

  const slots = React.useMemo(() => {
    const raw = urlSlots.length > 0 ? urlSlots : storeSlots;
    return raw.filter(
      (s): s is { companyId: string; role: string; level: NormalizedLevel } =>
        !!s.companyId && !!s.role && !!s.level
    );
  }, [urlSlots, storeSlots]);
  const prevSlotsRef = useRef(slots);

  const filled = slots
    .map(resolveSlotStats)
    .filter((s): s is SlotStats => s !== null);

  const emptySlots = 3 - slots.length;

  useEffect(() => {
    if (slots.length > prevSlotsRef.current.length) {
      const addedSlotIndex = slots.length - 1;
      const addedSlot = slots[addedSlotIndex];
      if (addedSlot) {
        const companyName = MOCK_COMPANIES.find((c) => c.slug === addedSlot.companyId)?.name || "Company";
        setLiveAnnouncement(`Added ${companyName} ${addedSlot.role} (${addedSlot.level}) to comparison. ${slots.length} of 3 slots filled.`);
      }
    } else if (slots.length < prevSlotsRef.current.length) {
      if (slots.length === 0) {
        setLiveAnnouncement("Cleared all comparison slots. 0 of 3 slots filled.");
      } else {
        setLiveAnnouncement(`Removed slot. ${slots.length} of 3 slots filled.`);
      }
    }
    prevSlotsRef.current = slots;
  }, [slots]);

  const handleRemove = (index: number) => {
    const next = slots.filter((_, i) => i !== index);
    setUrlSlots(next);
    useComparisonStore.setState({ slots: next });
  };

  const handleClearAll = () => {
    setUrlSlots([]);
    useComparisonStore.setState({ slots: [] });
  };

  return (
    <PageShell
      title="Compare Compensation"
      description="Compare up to three company / level / role combinations side by side."
      actions={
        slots.length > 0 ? (
          <div className="flex items-center gap-2 select-none">
            <ShareButton />
            <Button variant="outline" size="sm" onClick={handleClearAll}>
              Clear all
            </Button>
          </div>
        ) : undefined
      }
    >
      {/* Screen Reader Live Region for WCAG AA compliance */}
      <div className="sr-only" aria-live="polite">
        {liveAnnouncement}
      </div>

      {slots.length === 0 ? (
        <EmptyState
          title="No comparisons yet"
          description="Add roles from the salary table using the compare button on any row."
          icon={GitCompare}
          action={
            <Link
              href="/"
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 select-none"
            >
              <Plus className="mr-2 h-4 w-4" />
              Browse salaries
            </Link>
          }
          className="py-16"
        />
      ) : (
        <>
          {/* Mobile: stacked slot cards */}
          <div className="md:hidden space-y-4">
            {filled.map((s, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-card p-4 shadow-sm space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <CompanyLogo
                      src={s.logo}
                      name={s.companyName}
                      alt={s.companyName}
                      width={40}
                      height={40}
                      className="size-10 rounded-lg shrink-0 object-cover bg-muted"
                    />
                    <div className="min-w-0">
                      <p className="font-semibold truncate">{s.companyName}</p>
                      <p className="text-sm text-muted-foreground truncate">{s.role}</p>
                      <Badge variant="secondary" className="mt-1 text-[10px]">
                        {s.level}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => handleRemove(i)}
                    aria-label={`Remove ${s.companyName} ${s.role} (${s.level}) from comparison`}
                  >
                    <X className="size-4" />
                  </Button>
                </div>
                <p className="text-2xl font-bold">
                  {formatCurrency(s.total, s.currency, true)}
                </p>
                <dl className="space-y-2 text-sm">
                  {METRICS.filter((m) => m.key !== "total").map((m) => (
                    <div key={m.key} className="flex justify-between">
                      <dt className="text-muted-foreground">{m.label}</dt>
                      <dd className="font-medium">
                        {m.key === "count"
                          ? s.count
                          : formatCurrency(s[m.key], s.currency, true)}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
            {Array.from({ length: emptySlots }).map((_, i) => (
              <div
                key={`empty-${i}`}
                className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground select-none"
              >
                Empty slot — add from the salary table
              </div>
            ))}
          </div>

          {/* Desktop: comparison table */}
          <div className="hidden md:block overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground w-36 select-none">
                    Metric
                  </th>
                  {filled.map((s, i) => (
                    <th key={i} className="px-4 py-3 text-left min-w-[180px]">
                      <div className="flex items-center gap-2">
                        <CompanyLogo
                          src={s.logo}
                          name={s.companyName}
                          width={28}
                          height={28}
                          className="size-7 rounded-md object-cover bg-muted shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-semibold truncate">{s.companyName}</p>
                          <p className="text-xs text-muted-foreground font-normal truncate">
                            {s.role} · {s.level}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="ml-auto shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                          onClick={() => handleRemove(i)}
                          aria-label={`Remove ${s.companyName} ${s.role} (${s.level}) from comparison`}
                        >
                          <X className="size-3.5" />
                        </Button>
                      </div>
                    </th>
                  ))}
                  {Array.from({ length: emptySlots }).map((_, i) => (
                    <th
                      key={`e-${i}`}
                      className="px-4 py-3 text-muted-foreground font-normal min-w-[140px] select-none"
                    >
                      Empty slot
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {METRICS.map((m) => (
                  <tr key={m.key}>
                    <td className="px-4 py-3 text-muted-foreground select-none">{m.label}</td>
                    {filled.map((s, i) => (
                      <td key={i} className={cn("px-4 py-3", m.key === "total" && "font-bold")}>
                        {m.key === "count"
                          ? s.count
                          : formatCurrency(s[m.key], s.currency, true)}
                      </td>
                    ))}
                    {Array.from({ length: emptySlots }).map((_, i) => (
                      <td key={`e-${i}`} className="px-4 py-3 text-muted-foreground select-none">
                        —
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </PageShell>
  );
}
