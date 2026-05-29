import type { FilterState } from "@/types";

export function countActiveFilters(filters: Partial<FilterState>): number {
  let count = 0;
  if (filters.levels?.length) count += filters.levels.length;
  if (filters.roles?.length) count += filters.roles.length;
  if (filters.companies?.length) count += filters.companies.length;
  if (filters.location?.length) count += filters.location.length;
  if (filters.minComp != null) count += 1;
  if (filters.maxComp != null) count += 1;
  if (filters.minYoe != null) count += 1;
  if (filters.maxYoe != null) count += 1;
  if (filters.verified) count += 1;
  if (filters.currency && filters.currency !== "USD") count += 1;
  return count;
}
