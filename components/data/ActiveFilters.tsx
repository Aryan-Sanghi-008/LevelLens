"use client";

import { useQueryStates } from "nuqs";
import { filterParsers, defaultFilters } from "@/lib/searchParams";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { formatCurrency } from "@/lib/formatters";
import { MOCK_COMPANIES } from "@/lib/data/mock/companies";

export function ActiveFilters() {
  const [filters, setFilters] = useQueryStates(filterParsers);

  // Derive active filters into an array for easy rendering
  const activePills: { id: string; label: string; onRemove: () => void }[] = [];

  if (filters.levels.length > 0) {
    filters.levels.forEach((l) => {
      activePills.push({
        id: `level-${l}`,
        label: l,
        onRemove: () => setFilters({ levels: filters.levels.filter((x) => x !== l) }),
      });
    });
  }

  if (filters.roles.length > 0) {
    filters.roles.forEach((r) => {
      activePills.push({
        id: `role-${r}`,
        label: r,
        onRemove: () => setFilters({ roles: filters.roles.filter((x) => x !== r) }),
      });
    });
  }

  if (filters.companies.length > 0) {
    filters.companies.forEach((slug) => {
      const companyName = MOCK_COMPANIES.find(c => c.slug === slug)?.name || slug;
      activePills.push({
        id: `company-${slug}`,
        label: companyName,
        onRemove: () => setFilters({ companies: filters.companies.filter((x) => x !== slug) }),
      });
    });
  }

  if (filters.location.length > 0) {
    filters.location.forEach((loc) => {
      activePills.push({
        id: `loc-${loc}`,
        label: loc,
        onRemove: () => setFilters({ location: filters.location.filter((x) => x !== loc) }),
      });
    });
  }

  if (filters.minComp !== null || filters.maxComp !== null) {
    const min = filters.minComp ? formatCurrency(filters.minComp, filters.currency || "USD", true) : "0";
    const max = filters.maxComp ? formatCurrency(filters.maxComp, filters.currency || "USD", true) : "∞";
    activePills.push({
      id: "comp",
      label: `${min} - ${max}`,
      onRemove: () => setFilters({ minComp: null, maxComp: null }),
    });
  }

  if (filters.minYoe !== null || filters.maxYoe !== null) {
    const min = filters.minYoe ?? 0;
    const max = filters.maxYoe ?? 20;
    activePills.push({
      id: "yoe",
      label: `${min}-${max} Yrs`,
      onRemove: () => setFilters({ minYoe: null, maxYoe: null }),
    });
  }

  if (filters.verified) {
    activePills.push({
      id: "verified",
      label: "Verified Only",
      onRemove: () => setFilters({ verified: null }),
    });
  }

  if (filters.currency && filters.currency !== "USD") {
    activePills.push({
      id: "currency",
      label: `Currency: ${filters.currency}`,
      onRemove: () => setFilters({ currency: null }),
    });
  }

  if (activePills.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4 bg-muted/40 p-2 rounded-lg border border-border/60">
      <span className="text-xs font-semibold text-muted-foreground ml-1 mr-1">Active Filters:</span>
      <div className="flex flex-wrap items-center gap-1.5 flex-1">
        {activePills.map((pill) => (
          <Badge 
            key={pill.id} 
            variant="secondary" 
            className="pl-2.5 pr-1 py-1 rounded-full text-xs font-medium bg-background border border-border/80 text-foreground flex items-center gap-1 hover:border-brand-primary/40 transition-colors shadow-xs"
          >
            {pill.label}
            <button
              onClick={pill.onRemove}
              className="rounded-full hover:bg-muted p-0.5 focus:outline-none transition-colors text-muted-foreground hover:text-foreground"
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove {pill.label}</span>
            </button>
          </Badge>
        ))}
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="h-7 px-2.5 text-xs font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors rounded-md"
        onClick={() => setFilters(defaultFilters)}
      >
        Reset All
      </Button>
    </div>
  );
}
