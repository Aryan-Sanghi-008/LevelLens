import { useMemo, useTransition, useState, useEffect, useRef } from 'react';
import { CompensationRecord, FilterState, SortState } from '@/types';
import { MOCK_SALARIES } from '@/lib/data/mock/salaries';
import { convertCurrency } from '@/lib/formatters';
import { useSubmissionStore } from '@/lib/hooks/useSubmissionStore';

export interface UseFilteredSalariesResult {
  data: CompensationRecord[];
  totalCount: number;
  filteredCount: number;
  isFiltered: boolean;
  isPending: boolean;
}

/** Pure compute function — runs outside React render to keep useMemo fast */
function computeFilteredSalaries(
  all: CompensationRecord[],
  filters: Partial<FilterState>,
  sort: SortState
): { data: CompensationRecord[]; isFiltered: boolean } {
  const targetCurrency = filters.currency || 'USD';
  const needsConversion = all.some((r) => r.currency !== targetCurrency);

  const mapped = needsConversion
    ? all.map((r) => {
        if (r.currency === targetCurrency) return r;
        return {
          ...r,
          baseSalary: Math.round(convertCurrency(r.baseSalary, r.currency, targetCurrency)),
          stockPerYear: Math.round(convertCurrency(r.stockPerYear, r.currency, targetCurrency)),
          bonus: Math.round(convertCurrency(r.bonus, r.currency, targetCurrency)),
          totalCompensation: Math.round(
            convertCurrency(r.totalCompensation, r.currency, targetCurrency)
          ),
          currency: targetCurrency,
        };
      })
    : all;

  let filtered = mapped;
  let isFiltered = false;

  if (filters.roles?.length) {
    filtered = filtered.filter((r) => filters.roles!.includes(r.role));
    isFiltered = true;
  }
  if (filters.companies?.length) {
    filtered = filtered.filter((r) => filters.companies!.includes(r.company.slug));
    isFiltered = true;
  }
  if (filters.levels?.length) {
    filtered = filtered.filter((r) => filters.levels!.includes(r.normalizedLevel));
    isFiltered = true;
  }
  if (filters.locations?.length) {
    filtered = filtered.filter(
      (r) =>
        filters.locations!.includes(r.location.city) ||
        filters.locations!.includes(r.location.country) ||
        (r.location.region != null && filters.locations!.includes(r.location.region))
    );
    isFiltered = true;
  }
  if (filters.minComp != null) {
    filtered = filtered.filter((r) => r.totalCompensation >= filters.minComp!);
    isFiltered = true;
  }
  if (filters.maxComp != null) {
    filtered = filtered.filter((r) => r.totalCompensation <= filters.maxComp!);
    isFiltered = true;
  }
  if (filters.minYoe != null) {
    filtered = filtered.filter((r) => r.yearsOfExperience >= filters.minYoe!);
    isFiltered = true;
  }
  if (filters.maxYoe != null) {
    filtered = filtered.filter((r) => r.yearsOfExperience <= filters.maxYoe!);
    isFiltered = true;
  }
  if (filters.verified === true) {
    filtered = filtered.filter((r) => r.verified === true);
    isFiltered = true;
  }

  const sorted = [...filtered].sort((a, b) => {
    let aVal: number | string = a[sort.field] as number | string;
    let bVal: number | string = b[sort.field] as number | string;

    if (sort.field === 'reportedAt') {
      aVal = new Date(aVal as string).getTime();
      bVal = new Date(bVal as string).getTime();
    }

    if (aVal === undefined) aVal = 0;
    if (bVal === undefined) bVal = 0;

    if (aVal < bVal) return sort.direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return sort.direction === 'asc' ? 1 : -1;
    return 0;
  });

  return { data: sorted, isFiltered };
}

export function useFilteredSalaries(
  filters: Partial<FilterState>,
  sort: SortState
): UseFilteredSalariesResult {
  const submissions = useSubmissionStore((s) => s.submissions);
  const [isPending, startTransition] = useTransition();
  const isMount = useRef(true);

  const allSalaries = useMemo<CompensationRecord[]>(
    () => [...submissions, ...MOCK_SALARIES],
    [submissions]
  );

  const [appliedFilters, setAppliedFilters] = useState(filters);
  const [appliedSort, setAppliedSort] = useState(sort);

  useEffect(() => {
    if (isMount.current) {
      isMount.current = false;
      return;
    }

    startTransition(() => {
      setAppliedFilters(filters);
      setAppliedSort(sort);
    });
  }, [filters, sort]);

  const { data, isFiltered } = useMemo(
    () => computeFilteredSalaries(allSalaries, appliedFilters, appliedSort),
    [allSalaries, appliedFilters, appliedSort]
  );

  return {
    data,
    totalCount: allSalaries.length,
    filteredCount: data.length,
    isFiltered,
    isPending,
  };
}
