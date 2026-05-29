import { CompensationBreakdown, CompensationRecord, NormalizedLevel } from "@/types";
import { CURRENCIES } from "./constants";

export function formatCurrency(amount: number, currency: string, compact: boolean = false): string {
  if (amount === undefined || amount === null || amount < 0 || isNaN(amount)) {
    return "N/A";
  }
  const isINR = currency === "INR";
  
  if (compact) {
    if (isINR) {
      if (amount >= 10000000) {
        return `₹${(amount / 10000000).toFixed(1).replace(/\.0$/, '')}Cr`;
      }
      if (amount >= 100000) {
        return `₹${(amount / 100000).toFixed(1).replace(/\.0$/, '')}L`;
      }
      if (amount >= 1000) {
        return `₹${(amount / 1000).toFixed(1).replace(/\.0$/, '')}K`;
      }
      return `₹${amount}`;
    } else {
      const symbol = CURRENCIES.find((c) => c.code === currency)?.symbol || "$";
      if (amount >= 1000000) {
        return `${symbol}${(amount / 1000000).toFixed(1).replace(/\.0$/, '')}M`;
      }
      if (amount >= 1000) {
        return `${symbol}${(amount / 1000).toFixed(1).replace(/\.0$/, '')}K`;
      }
      return `${symbol}${amount}`;
    }
  }

  return new Intl.NumberFormat(isINR ? "en-IN" : "en-US", {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatCTC(record: CompensationRecord): CompensationBreakdown {
  return {
    base: record.baseSalary,
    stock: record.stockPerYear,
    bonus: record.bonus,
    total: record.totalCompensation,
    currency: record.currency,
    formatted: {
      base: formatCurrency(record.baseSalary, record.currency, true),
      stock: formatCurrency(record.stockPerYear, record.currency, true),
      bonus: formatCurrency(record.bonus, record.currency, true),
      total: formatCurrency(record.totalCompensation, record.currency, true),
    },
  };
}

export function convertCurrency(amount: number, from: string, to: string): number {
  if (from === to) return amount;
  
  const fromRate = CURRENCIES.find((c) => c.code === from)?.rateToUSD;
  const toRate = CURRENCIES.find((c) => c.code === to)?.rateToUSD;
  
  if (fromRate === undefined || toRate === undefined) {
    return -1;
  }
  
  // Convert to USD first, then to target currency
  const amountInUSD = amount * fromRate;
  return amountInUSD / toRate;
}

export function getPercentileBand(value: number, dataset: number[]): { p25: number; p50: number; p75: number; p90: number; userPercentile: number } {
  if (dataset.length === 0) {
    return { p25: 0, p50: 0, p75: 0, p90: 0, userPercentile: 0 };
  }

  const sorted = [...dataset].sort((a, b) => a - b);
  
  const getP = (pct: number) => {
    const idx = Math.max(0, Math.min(sorted.length - 1, Math.ceil((pct / 100) * sorted.length) - 1));
    return sorted[idx] || 0;
  };

  const p25 = getP(25);
  const p50 = getP(50);
  const p75 = getP(75);
  const p90 = getP(90);

  // Calculate user percentile
  let lessThanCount = 0;
  for (const val of sorted) {
    if (val < value) lessThanCount++;
    else break;
  }
  const userPercentile = Math.round((lessThanCount / sorted.length) * 100);

  return { p25, p50, p75, p90, userPercentile };
}

export function formatYoE(years: number): string {
  if (years === 0) return "< 1 yr";
  if (years === 1) return "1 yr";
  if (years >= 15) return "15+ yrs";
  return `${years} yrs`;
}

export function getLevelColor(level: NormalizedLevel): string {
  const colorMap: Record<NormalizedLevel, string> = {
    [NormalizedLevel.INTERN]: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    [NormalizedLevel.JUNIOR]: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
    [NormalizedLevel.MID]: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300",
    [NormalizedLevel.SENIOR]: "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300",
    [NormalizedLevel.STAFF]: "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300",
    [NormalizedLevel.PRINCIPAL]: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300",
    [NormalizedLevel.DIRECTOR]: "bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900/50 dark:text-fuchsia-300",
    [NormalizedLevel.VP]: "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300",
    [NormalizedLevel.EXEC]: "bg-slate-900 text-slate-100 dark:bg-slate-100 dark:text-slate-900",
  };
  return colorMap[level] || "bg-gray-100 text-gray-700";
}

export function getLevelBadgeVariant(level: NormalizedLevel): "default" | "secondary" | "outline" {
  switch (level) {
    case NormalizedLevel.INTERN:
    case NormalizedLevel.JUNIOR:
      return "outline";
    case NormalizedLevel.MID:
    case NormalizedLevel.SENIOR:
      return "secondary";
    default:
      return "default";
  }
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
